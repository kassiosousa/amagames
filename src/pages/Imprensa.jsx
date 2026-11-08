import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import press from '../press.json'
import FilterSelect from '../components/FilterSelect.jsx'
import Pagination from '../components/Pagination.jsx'
import PressCard from '../components/PressCard.jsx'
import { PageShell } from '../components/ui.jsx'

const PER_PAGE = 12
const byName = (a, b) => a.localeCompare(b, 'pt-BR')
const topics = [...new Set(press.map((p) => p.topic).filter(Boolean))].sort(byName)
const years = [...new Set(press.map((p) => p.year).filter(Boolean))].sort((a, b) => b - a).map(String)

// press.json já vem da mais recente para a mais antiga (RF-02).
export default function Imprensa() {
  const [params, setParams] = useSearchParams()
  const tema = params.get('tema') || ''
  const ano = params.get('ano') || ''

  const filtered = useMemo(
    () => press.filter((p) => (!tema || p.topic === tema) && (!ano || String(p.year) === ano)),
    [tema, ano],
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
  const hasFilter = tema || ano

  return (
    <PageShell kicker="Na mídia" title="Imprensa">
      <p className="max-w-2xl text-lg font-light text-mute">
        Matérias e notícias da imprensa sobre a AMAGAMES e sobre os jogos feitos no Maranhão. Cada título leva à reportagem no site do veículo.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <FilterSelect label="Tema" value={tema} onChange={setFilter('tema')} options={topics} />
        <FilterSelect label="Ano" value={ano} onChange={setFilter('ano')} options={years} />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-mute">
        <p aria-live="polite">{filtered.length} {filtered.length === 1 ? 'matéria' : 'matérias'}</p>
        {hasFilter && (
          <button onClick={() => setParams({})} className="text-brand-navy hover:underline">Limpar filtros</button>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-mute">Nenhuma matéria encontrada com esses filtros.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {visible.map((p) => <PressCard key={p.id} p={p} />)}
        </div>
      )}

      <Pagination page={page} total={total} onPage={goPage} />
    </PageShell>
  )
}
