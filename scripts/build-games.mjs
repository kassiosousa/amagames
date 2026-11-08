// Gera src/games.json a partir da planilha (fonte de verdade dos jogos).
// Uso: npm run games   (roda automaticamente antes de `dev` e `build`)
import ExcelJS from 'exceljs'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const src = resolve(root, 'public/jogos/levantamento-jogos-maranhenses.xlsx')
const out = resolve(root, 'src/games.json')

const text = (v) => {
  if (v == null) return ''
  if (typeof v === 'object') v = v.richText ? v.richText.map((r) => r.text).join('') : (v.text ?? v.result ?? '')
  return String(v).replace(/\s+/g, ' ').trim()
}
const isEmpty = (s) => !s || /^indispon[ií]vel$/i.test(s)
const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// Traduções do mesmo estilo: a chave (sem acento, minúscula) vira o nome em inglês.
// Para unificar outro par, basta acrescentar uma linha.
const synonyms = new Map([['quebra-cabeca', 'Puzzle']])

// "Runner /Aventura" -> ["Runner", "Aventura"]; unifica variações de caixa/acento e sinônimos.
const seen = new Map()
const tags = (s) => [
  ...new Set(
    s
      .split(/[/,]/)
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

const GAME_JAM = 'Game Jam'

const wb = new ExcelJS.Workbook()
await wb.xlsx.readFile(src)

const games = []
wb.eachSheet((ws) => {
  const year = Number(ws.name)
  if (!Number.isInteger(year)) return
  ws.eachRow((row, n) => {
    if (n === 1) return
    const title = text(row.getCell(1).value)
    if (!title) return
    const c = (i) => text(row.getCell(i).value)
    const image = c(12)
    const jam = /game jam/i.test(c(8)) // coluna Contexto
    // Página pública do jogo; arquivos .zip (download direto) não contam.
    const access = /^https?:/.test(c(11)) && !/\.zip(\?|$)/i.test(c(11)) ? c(11) : ''
    games.push({
      id: `${year}-${n}`,
      year,
      order: n,
      title,
      studio: c(2),
      studioFilter: jam ? GAME_JAM : c(2),
      jam,
      status: c(15), // coluna Situação (vazio = lançado; "Em desenvolvimento")
      // Destaque da Steam só vale para jogo já publicado na loja.
      steam: /store\.steampowered\.com\//.test(access) && !/desenvolvimento/i.test(c(15)),
      tags: tags(c(3)),
      platform: c(4),
      engine: c(5),
      summary: isEmpty(c(10)) ? '' : c(10),
      access,
      image: image.startsWith('./') ? image : './brand/assinatura.png',
      hasCover: image.startsWith('./jogos/'),
    })
  })
})

// Mais recentes primeiro: ano desc e, dentro do ano, ordem da planilha desc.
games.sort((a, b) => b.year - a.year || b.order - a.order)

await mkdir(dirname(out), { recursive: true })
await writeFile(out, JSON.stringify(games, null, 1) + '\n')
console.log(`games.json: ${games.length} jogos de ${new Set(games.map((g) => g.year)).size} anos`)
