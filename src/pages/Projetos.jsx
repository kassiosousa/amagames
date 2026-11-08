import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import editions from '../editions.json'
import EditionCard from '../components/EditionCard.jsx'
import FilterSelect from '../components/FilterSelect.jsx'
import Pagination from '../components/Pagination.jsx'
import { PageShell } from '../components/ui.jsx'

const PER_PAGE = 12
const byName = (a, b) => a.localeCompare(b, 'pt-BR')
const kinds = [...new Set(editions.map((e) => e.kind))].sort(byName)
const years = [...new Set(editions.map((e) => e.year).filter(Boolean))].sort((a, b) => b - a).map(String)

// editions.json já vem do mais recente para o mais antigo (RF-10).
export default function Projetos() {
  const [params, setParams] = useSearchParams()
  const tipo = params.get('tipo') || ''
  const ano = params.get('ano') || ''

  const filtered = useMemo(
    () => editions.filter((e) => (!tipo || e.kind === tipo) && (!ano || String(e.year) === ano)),
    [tipo, ano],
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
  const hasFilter = tipo || ano

  return (
    <PageShell kicker="Ações e eventos" title="Projetos">
      <div className="grid gap-4 sm:grid-cols-2">
        <FilterSelect label="Tipo de ação" value={tipo} onChange={setFilter('tipo')} options={kinds} />
        <FilterSelect label="Ano" value={ano} onChange={setFilter('ano')} options={years} />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-mute">
        <p aria-live="polite">{filtered.length} {filtered.length === 1 ? 'ação ou evento' : 'ações e eventos'}</p>
        {hasFilter && (
          <button onClick={() => setParams({})} className="text-brand-navy hover:underline">Limpar filtros</button>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-mute">Nenhuma ação ou evento encontrado com esses filtros.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {visible.map((e) => <EditionCard key={e.id} e={e} />)}
        </div>
      )}

      <Pagination page={page} total={total} onPage={goPage} />
    </PageShell>
  )
}
