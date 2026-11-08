// Gera src/press.json a partir da planilha de imprensa (fonte de verdade).
// Uso: npm run press   (roda automaticamente antes de `dev` e `build`)
import ExcelJS from 'exceljs'
import { existsSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const src = resolve(root, 'dados/levantamento-imprensa.xlsx')
const out = resolve(root, 'src/press.json')

const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
const text = (v) => {
  if (v == null) return ''
  if (v instanceof Date) return v.toISOString().slice(0, 10)
  if (typeof v === 'object') v = v.richText ? v.richText.map((r) => r.text).join('') : (v.text ?? v.hyperlink ?? v.result ?? '')
  return String(v).replace(/\s+/g, ' ').trim()
}

async function build() {
  if (!existsSync(src)) {
    console.warn(`press.json: planilha não encontrada (${src}); gerando lista vazia.`)
    return []
  }
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile(src)
  const ws = wb.worksheets.find((w) => fold(w.name) === 'materias') ?? wb.worksheets[0]
  if (!ws) return []
  const head = new Map()
  ws.getRow(1).eachCell((c, i) => head.set(fold(text(c.value)), i))
  const col = (row, name) => (head.has(fold(name)) ? text(row.getCell(head.get(fold(name))).value) : '')

  const items = []
  ws.eachRow((row, n) => {
    if (n === 1) return
    const title = col(row, 'Título')
    const url = col(row, 'Link')
    if (!title) return
    if (!/^https?:\/\//.test(url)) {
      console.warn(`press.json: "${title}" (linha ${n}) sem link válido; ignorada.`)
      return
    }
    const date = /^\d{4}-\d{2}-\d{2}/.test(col(row, 'Data')) ? col(row, 'Data').slice(0, 10) : ''
    const status = col(row, 'Situação do dado')
    items.push({
      id: `materia-${n}`,
      line: n,
      date,
      year: date ? Number(date.slice(0, 4)) : null,
      title,
      outlet: col(row, 'Veículo'),
      topic: col(row, 'Tema'),
      summary: col(row, 'Resumo'),
      url,
      status,
      // "Parcial" e "A confirmar" ganham a etiqueta "Dado a confirmar"
      unconfirmed: /^(parcial|a confirmar)$/i.test(status),
    })
  })
  // RF-02: da mais recente para a mais antiga; sem data, no fim; mesmo dia, ordem da planilha.
  items.sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.line - b.line)
  return items
}

const items = await build()
await writeFile(out, JSON.stringify(items, null, 1) + '\n')
console.log(`press.json: ${items.length} matérias`)
