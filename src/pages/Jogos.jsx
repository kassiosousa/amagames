import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import games from '../games.json'
import studios from '../studios.json'
import FilterSelect from '../components/FilterSelect.jsx'
import GameCard from '../components/GameCard.jsx'
import Pagination from '../components/Pagination.jsx'
import { PageShell } from '../components/ui.jsx'

const PER_PAGE = 10
const GAME_JAM = 'Game Jam'
const byName = (a, b) => a.localeCompare(b, 'pt-BR')
const years = [...new Set(games.map((g) => g.year))].sort((a, b) => b - a)
const styles = [...new Set(games.flatMap((g) => g.tags))].sort(byName)

// Estúdios cadastrados filtram pelos jogos que o script associou a eles (nome, nomes
// alternativos e parcerias); os demais usam o nome escrito na planilha de jogos.
const registered = new Map(studios.map((s) => [s.name, new Set(s.gameIds)]))
const linked = new Set(studios.flatMap((s) => s.gameIds))
const others = [...new Set(games.filter((g) => !g.jam && !linked.has(g.id) && g.studio).map((g) => g.studio))]
// "Game Jam" sempre primeiro, depois os estúdios cadastrados, depois os demais.
const studioOptions = [GAME_JAM, ...[...registered.keys()].sort(byName), ...others.sort(byName)]

const matchStudio = (g, estudio) => {
  if (estudio === GAME_JAM) return g.jam
  const ids = registered.get(estudio)
  return ids ? ids.has(g.id) : g.studio === estudio
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
          (!estudio || matchStudio(g, estudio)),
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
  // Estúdio vindo de um link (card de estúdio) que não está na lista continua visível no filtro.
  const options = estudio && !studioOptions.includes(estudio) ? [...studioOptions, estudio] : studioOptions

  return (
    <PageShell kicker="Comunidade" title="Lista de jogos">
      <div className="grid gap-4 sm:grid-cols-3">
        <FilterSelect label="Ano de publicação" value={ano} onChange={setFilter('ano')} options={years.map(String)} />
        <FilterSelect label="Estilo" value={estilo} onChange={setFilter('estilo')} options={styles} />
        <FilterSelect label="Estúdio" value={estudio} onChange={setFilter('estudio')} options={options} />
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

      <Pagination page={page} total={total} onPage={goPage} />
    </PageShell>
  )
}
