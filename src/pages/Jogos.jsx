import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import games from '../games.json'
import GameCard from '../components/GameCard.jsx'
import { PageShell } from '../components/ui.jsx'

const PER_PAGE = 10
const byName = (a, b) => a.localeCompare(b, 'pt-BR')
const years = [...new Set(games.map((g) => g.year))].sort((a, b) => b - a)
const styles = [...new Set(games.flatMap((g) => g.tags))].sort(byName)
// Jogos de game jam ficam todos na categoria "Game Jam", sempre a primeira da lista.
const studios = [...new Set(games.map((g) => g.studioFilter).filter(Boolean))].sort(
  (a, b) => (b === 'Game Jam') - (a === 'Game Jam') || byName(a, b),
)

function Filter({ label, value, onChange, options }) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-xs font-medium uppercase tracking-wider text-mute">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-w-0 border border-line bg-paper px-3 py-2 text-sm font-normal normal-case tracking-normal text-ink"
      >
        <option value="">Todos</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  )
}

// Páginas visíveis: 1, atual±1 e última, com reticências.
function pageList(page, total) {
  const set = new Set([1, total, page - 1, page, page + 1].filter((p) => p >= 1 && p <= total))
  const list = []
  let prev = 0
  for (const p of [...set].sort((a, b) => a - b)) {
    if (p - prev > 1) list.push('…')
    list.push(p)
    prev = p
  }
  return list
}

export default function Jogos() {
  const [params, setParams] = useSearchParams()
  const ano = params.get('ano') || ''
  const estilo = params.get('estilo') || ''
  const estudio = params.get('estudio') || ''

  const filtered = useMemo(
    () =>
      games.filter(
        (g) =>
          (!ano || String(g.year) === ano) &&
          (!estilo || g.tags.includes(estilo)) &&
          (!estudio || g.studioFilter === estudio),
      ),
    [ano, estilo, estudio],
  )

  const total = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const page = Math.min(Math.max(1, Number(params.get('pagina')) || 1), total)
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const update = (patch) => {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v)
      else next.delete(k)
    }
    setParams(next)
  }
  const setFilter = (k) => (v) => update({ [k]: v, pagina: '' })
  const goPage = (p) => {
    update({ pagina: p > 1 ? String(p) : '' })
    window.scrollTo({ top: 0 })
  }
  const hasFilter = ano || estilo || estudio

  return (
    <PageShell kicker="Comunidade" title="Lista de jogos">
      <div className="grid gap-4 sm:grid-cols-3">
        <Filter label="Ano de publicação" value={ano} onChange={setFilter('ano')} options={years.map(String)} />
        <Filter label="Estilo" value={estilo} onChange={setFilter('estilo')} options={styles} />
        <Filter label="Estúdio" value={estudio} onChange={setFilter('estudio')} options={studios} />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-mute">
        <p aria-live="polite">{filtered.length} {filtered.length === 1 ? 'jogo' : 'jogos'}</p>
        {hasFilter && (
          <button onClick={() => setParams({})} className="text-brand-navy hover:underline">Limpar filtros</button>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-mute">Nenhum jogo encontrado com esses filtros.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((g) => <GameCard key={g.id} g={g} />)}
        </div>
      )}

      {total > 1 && (
        <nav aria-label="Paginação" className="mt-12 flex flex-wrap items-center justify-center gap-1">
          <button aria-label="Página anterior" disabled={page === 1} onClick={() => goPage(page - 1)} className="px-3 py-2 text-xl text-mute enabled:hover:text-ink disabled:opacity-30">‹</button>
          {pageList(page, total).map((p, i) =>
            p === '…' ? (
              <span key={`e${i}`} className="px-2 text-mute">…</span>
            ) : (
              <button
                key={p}
                aria-current={p === page ? 'page' : undefined}
                onClick={() => goPage(p)}
                className={`min-w-9 border-b-2 px-2 py-1.5 text-sm ${p === page ? 'border-brand-red font-bold' : 'border-transparent text-mute hover:text-ink'}`}
              >
                {p}
              </button>
            ),
          )}
          <button aria-label="Próxima página" disabled={page === total} onClick={() => goPage(page + 1)} className="px-3 py-2 text-xl text-mute enabled:hover:text-ink disabled:opacity-30">›</button>
        </nav>
      )}
    </PageShell>
  )
}
