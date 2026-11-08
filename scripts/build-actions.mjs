// Gera src/actions.json (aba "Ações") e src/editions.json (aba "Edições") a partir da planilha oficial.
// Uso: npm run actions   (roda automaticamente antes de `dev` e `build`)
import ExcelJS from 'exceljs'
import { existsSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const src = resolve(root, 'dados/levantamento-acoes-realizadas-com-edicoes.xlsx')
const outActions = resolve(root, 'src/actions.json')
const outEditions = resolve(root, 'src/editions.json')
const GENERIC = './acoes/generico.svg' // RF-03: nunca a marca da AMAGAMES
const GENERIC_KIND = 'Evento' // tipo e rótulo dos itens sem ação vinculada

const text = (v) => {
  if (v == null) return ''
  if (typeof v === 'object') v = v.richText ? v.richText.map((r) => r.text).join('') : (v.text ?? v.hyperlink ?? v.result ?? '')
  return String(v).replace(/\s+/g, ' ').trim()
}
const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
// A coluna "Descrição" da aba Edições às vezes traz anotações de pesquisa ("não foram encontrados...",
// "deduzida..."). Essas frases não são texto para o público: ficam na planilha e saem da lista do site.
const INTERNAL = /(n[aã]o (foram |foi )?(encontrad|localizad)|dedu[zç]|a mat[eé]ria s[oó] cita|outra not[ií]cia|site antigo|a edi[cç][aã]o aconteceu)/i
const publicText = (s) => s.split(/(?<=\.)\s+/).filter((p) => !INTERNAL.test(p)).join(' ').trim()
const linkOf = (s) => ({ link: /^(https?:\/\/|\/)/.test(s) ? s : '', external: /^https?:\/\//.test(s) })

// Lê uma aba pelo nome (sem acento nem caixa) e devolve as linhas com acesso às colunas pelo cabeçalho.
function rowsOf(wb, name) {
  const ws = wb.worksheets.find((w) => fold(w.name) === fold(name))
  if (!ws) return []
  const head = new Map()
  ws.getRow(1).eachCell((c, i) => head.set(fold(text(c.value)), i))
  const rows = []
  ws.eachRow((row, n) => {
    if (n === 1) return
    rows.push({ n, col: (k) => (head.has(fold(k)) ? text(row.getCell(head.get(fold(k))).value) : '') })
  })
  return rows
}

async function build() {
  if (!existsSync(src)) {
    console.warn(`actions.json: planilha não encontrada (${src}); gerando listas vazias.`)
    return { actions: [], editions: [] }
  }
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile(src)

  // ---- Aba "Ações": cards da home
  const actions = []
  for (const { n, col } of rowsOf(wb, 'Ações')) {
    const name = col('Nome')
    if (!name) continue
    const icon = col('Ícone')
    const hasIcon = icon.startsWith('./') && existsSync(resolve(root, 'public', icon.slice(2)))
    if (icon && !hasIcon) console.warn(`actions.json: ícone "${icon}" de "${name}" não existe; usando o genérico.`)
    actions.push({
      id: `acao-${n}`,
      order: Number(col('Ordem')) || n,
      line: n,
      name,
      kind: col('Tipo'),
      description: col('Descrição'),
      ...linkOf(col('Link')),
      icon: hasIcon ? icon : GENERIC,
      hasIcon,
    })
  }
  // Ordem da coluna "Ordem"; empate pela ordem das linhas.
  actions.sort((a, b) => a.order - b.order || a.line - b.line)

  // ---- Aba "Edições": lista paginada da página Projetos (RF-05, RF-09 a RF-14)
  const byName = new Map(actions.map((a) => [fold(a.name), a]))
  const editions = []
  for (const { n, col } of rowsOf(wb, 'Edições')) {
    const name = col('Evento ou ação')
    if (!name) continue
    const linkedName = col('Ação vinculada')
    const linked = linkedName ? byName.get(fold(linkedName)) : null
    if (linkedName && !linked) console.warn(`actions.json: ação vinculada "${linkedName}" (linha ${n} de Edições) não existe na aba Ações; usando o ícone genérico.`)
    const sourceUrl = col('Link da fonte')
    const situation = col('Situação do dado')
    editions.push({
      id: `edicao-${n}`,
      line: n,
      action: linked ? linked.name : '',
      label: linked ? linked.name : GENERIC_KIND,
      kind: linked?.kind || GENERIC_KIND,
      name,
      edition: col('Edição'),
      year: Number(col('Ano')) || null,
      date: col('Data'), // fica no JSON, mas a página não exibe por enquanto
      place: col('Local'), // idem
      description: publicText(col('Descrição')),
      partners: col('Parceiros e apoio'),
      ...linkOf(col('Link')),
      source: col('Fonte'),
      sourceUrl: /^https?:\/\//.test(sourceUrl) ? sourceUrl : '',
      status: situation,
      // "Parcial" e "A confirmar" ganham a etiqueta "Dado a confirmar"
      unconfirmed: /^(parcial|a confirmar)$/i.test(situation),
      icon: linked ? linked.icon : GENERIC,
    })
  }
  // RF-10: ano decrescente; no mesmo ano, a ordem da planilha; sem ano, no fim.
  editions.sort((a, b) => (b.year ?? -Infinity) - (a.year ?? -Infinity) || a.line - b.line)

  return { actions, editions }
}

const { actions, editions } = await build()
await writeFile(outActions, JSON.stringify(actions, null, 1) + '\n')
await writeFile(outEditions, JSON.stringify(editions, null, 1) + '\n')
console.log(`actions.json: ${actions.length} ações; editions.json: ${editions.length} edições`)
