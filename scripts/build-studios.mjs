// Gera src/studios.json a partir da planilha de estúdios (fonte de verdade) e de src/games.json.
// Uso: npm run studios   (roda automaticamente antes de `dev` e `build`, depois de `games`)
import ExcelJS from 'exceljs'
import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const src = resolve(root, 'dados/levantamento-estudios-maranhenses.xlsx')
const gamesPath = resolve(root, 'src/games.json')
const out = resolve(root, 'src/studios.json')

const FEATURED = 6 // RF-01

const text = (v) => {
  if (v == null) return ''
  if (typeof v === 'object') v = v.richText ? v.richText.map((r) => r.text).join('') : (v.text ?? v.hyperlink ?? v.result ?? '')
  return String(v).replace(/\s+/g, ' ').trim()
}
const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
const url = (s) => (/^https?:\/\//i.test(s) ? s : '')

// Sinônimos de área de atuação: a chave (sem acento, minúscula) vira o termo em inglês.
// Para unificar outro par, basta acrescentar uma linha.
const synonyms = new Map([['jogos serios', 'Serious games']])
const seen = new Map()
const areas = (s) => [
  ...new Set(
    s
      .split(/[/;]/)
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => {
        const k = fold(t)
        if (synonyms.has(k)) return synonyms.get(k)
        if (!seen.has(k)) seen.set(k, t.charAt(0).toUpperCase() + t.slice(1))
        return seen.get(k)
      }),
  ),
]

async function readRows() {
  if (!existsSync(src)) {
    console.warn(`studios.json: planilha não encontrada (${src}); gerando lista vazia.`)
    return []
  }
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile(src)
  const ws = wb.worksheets[0]
  if (!ws) return []
  const head = new Map()
  ws.getRow(1).eachCell((c, i) => head.set(fold(text(c.value)), i))
  const col = (row, name) => {
    const i = head.get(fold(name))
    return i ? text(row.getCell(i).value) : ''
  }
  const rows = []
  ws.eachRow((row, n) => {
    if (n === 1) return
    const name = col(row, 'Nome')
    if (!name) return
    rows.push({ row, n, col: (k) => col(row, k) })
  })
  return rows
}

const rows = await readRows()
const games = existsSync(gamesPath) ? JSON.parse(await readFile(gamesPath, 'utf8')) : []

// "Wired Dreams Studio / Statera Studio" conta para os dois estúdios.
const gameNames = (g) => g.studio.split('/').map(fold).filter(Boolean)

const studios = rows.map(({ n, col }) => {
  const name = col('Nome')
  const aliases = col('Nomes alternativos').split(';').map((a) => a.trim()).filter(Boolean)
  const names = new Set([name, ...aliases].map(fold))
  const mine = games.filter((g) => gameNames(g).some((x) => names.has(x)))
  const site = url(col('Site'))
  const instagram = url(col('Instagram'))
  const logo = col('Logo')
  const founded = Number(col('Ano de fundação')) || null
  const situation = col('Situação')
  return {
    id: `estudio-${n}`,
    name,
    aliases,
    city: col('Cidade'),
    founded,
    active: /^ativ/i.test(situation) ? true : /^inativ/i.test(situation) ? false : null,
    situation: /^ativ/i.test(situation) ? 'Ativo' : /^inativ/i.test(situation) ? 'Inativo' : '',
    formalization: col('Formalização'),
    areas: areas(col('Áreas de atuação')),
    summary: col('Descrição'),
    site,
    instagram,
    link: site || instagram,
    logo: logo.startsWith('./') ? logo : './brand/assinatura.png',
    hasLogo: logo.startsWith('./estudios/'),
    gamesCount: mine.length,
    steamCount: mine.filter((g) => g.steam).length,
    gameIds: mine.map((g) => g.id),
  }
})

// RF-01: mais jogos publicados na Steam; empate: mais jogos no total; depois, o mais antigo.
const byHighlight = (a, b) =>
  b.steamCount - a.steamCount ||
  b.gamesCount - a.gamesCount ||
  (a.founded ?? Infinity) - (b.founded ?? Infinity) ||
  a.name.localeCompare(b.name, 'pt-BR')
const featured = new Set([...studios].sort(byHighlight).slice(0, FEATURED).map((s) => s.id))
for (const s of studios) s.featured = featured.has(s.id)

// RF-04: ano de fundação decrescente (sem ano, por último).
studios.sort((a, b) => (b.founded ?? -Infinity) - (a.founded ?? -Infinity) || a.name.localeCompare(b.name, 'pt-BR'))

await writeFile(out, JSON.stringify(studios, null, 1) + '\n')
console.log(`studios.json: ${studios.length} estúdios, ${featured.size} em destaque`)
