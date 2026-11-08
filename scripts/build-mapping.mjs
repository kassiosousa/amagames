// Gera src/mapping.json a partir da planilha do mapeamento (fonte de verdade).
// Uso: npm run mapping   (roda automaticamente antes de `dev` e `build`)
import ExcelJS from 'exceljs'
import { existsSync, statSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dir = resolve(root, 'public/mapeamento') // só os PDFs dos infográficos (públicos)
const src = resolve(root, 'dados/levantamento-mapeamento-ecossistema.xlsx')
const out = resolve(root, 'src/mapping.json')

const text = (v) => {
  if (v == null) return ''
  if (typeof v === 'object') v = v.richText ? v.richText.map((r) => r.text).join('') : (v.text ?? v.result ?? '')
  return String(v).replace(/\s+/g, ' ').trim()
}
const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()

// Ordem das seções na página (RF-02); seções desconhecidas vão para o fim.
const ORDER = ['Produção', 'Editais', 'Serviços', 'Participação em eventos', 'Festivais', 'Perfil da comunidade', 'Contratos', 'Diversidade']
const TITLES = { Produção: 'Faturamento e produção' }
const BARS = new Set(['Participação em eventos'])

const sizeLabel = (file) => {
  const mb = statSync(file).size / 1048576
  return `${mb.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} MB`
}
const fileInfo = (name) => {
  if (!name) return null
  if (/^https?:\/\//.test(name)) return { url: name, size: '', external: true }
  const f = resolve(dir, name)
  return existsSync(f) ? { url: `./mapeamento/${name}`, size: sizeLabel(f) } : null
}

function sheet(wb, name) {
  const ws = wb.worksheets.find((w) => fold(w.name) === fold(name))
  if (!ws) return []
  const head = new Map()
  ws.getRow(1).eachCell((c, i) => head.set(fold(text(c.value)), i))
  const rows = []
  ws.eachRow((row, n) => {
    if (n === 1) return
    const get = (k) => {
      const i = head.get(fold(k))
      return i ? row.getCell(i).value : null
    }
    rows.push({ n, get, str: (k) => text(get(k)) })
  })
  return rows
}

async function build() {
  const empty = { years: [], latest: null, revenue: [], byYear: {} }
  if (!existsSync(src)) {
    console.warn(`mapping.json: planilha não encontrada (${src}); gerando dados vazios.`)
    return empty
  }
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile(src)

  // ---- Faturamento (RF-03): ordem cronológica, variação sobre o ano mapeado anterior
  const revenue = sheet(wb, 'Faturamento')
    .map((r) => ({
      year: Number(r.str('Ano')),
      value: Number(r.get('Faturamento (R$)')) || 0,
      label: r.str('Rótulo no infográfico'),
      source: r.str('Fonte'),
      note: r.str('Observação'),
    }))
    .filter((r) => r.year && r.value)
    .sort((a, b) => a.year - b.year)
    .map((r, i, all) => ({
      ...r,
      growth: i > 0 ? Math.round((r.value / all[i - 1].value - 1) * 100) : null,
      growthFrom: i > 0 ? all[i - 1].year : null,
    }))

  // ---- Fontes
  const sources = new Map(sheet(wb, 'Fontes').map((r) => [Number(r.str('Ano')), r]))

  // ---- Indicadores por ano e seção
  const byYear = {}
  for (const r of sheet(wb, 'Indicadores')) {
    const year = Number(r.str('Ano'))
    const secao = r.str('Seção')
    const label = r.str('Indicador')
    if (!year || !secao || !label) continue
    const raw = r.get('Valor')
    const num = typeof raw === 'number' ? raw : Number(String(raw ?? '').replace(',', '.'))
    const value = raw === null || raw === '' ? null : Number.isFinite(num) && String(raw).trim() !== '' ? num : text(raw)
    if (value === null) continue
    const y = (byYear[year] ??= { sections: new Map() })
    if (!y.sections.has(secao)) y.sections.set(secao, [])
    y.sections.get(secao).push({ label, value, unit: r.str('Unidade'), note: r.str('Observação') })
  }

  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a)
  for (const year of years) {
    const y = byYear[year]
    const names = [...y.sections.keys()].sort((a, b) => {
      const ia = ORDER.indexOf(a), ib = ORDER.indexOf(b)
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib)
    })
    const rev = revenue.find((r) => r.year === year)
    y.sections = names.map((name) => {
      let items = y.sections.get(name)
      const bar = BARS.has(name)
      if (bar) items = [...items].sort((a, b) => b.value - a.value)
      // O faturamento do ano abre a primeira seção.
      if (name === 'Produção' && rev) {
        const label = rev.label.replace(/^mais de\s+/i, '')
        items = [{ label: 'Faturamento', value: `R$ ${label}`, unit: '', note: '', highlight: true }, ...items]
      }
      return { key: name, title: TITLES[name] ?? name, bar, items }
    })
    const s = sources.get(year)
    y.pdf = s ? fileInfo(s.str('Arquivo')) : null
    y.credits = s ? s.str('Créditos') : ''
    y.article = s ? fileInfo(s.str('Artigo relacionado')) : null
  }

  return { years, latest: years[0] ?? null, revenue, byYear }
}

const data = await build()
await writeFile(out, JSON.stringify(data, null, 1) + '\n')
const n = Object.values(data.byYear).reduce((t, y) => t + y.sections.reduce((a, s) => a + s.items.length, 0), 0)
console.log(`mapping.json: anos ${data.years.join(', ')}; ${n} indicadores; ${data.revenue.length} valores de faturamento`)
