import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import studios from '../studios.json'
import FilterSelect from '../components/FilterSelect.jsx'
import Pagination from '../components/Pagination.jsx'
import StudioCard from '../components/StudioCard.jsx'
import { PageShell } from '../components/ui.jsx'

const PER_PAGE = 10
const byName = (a, b) => a.localeCompare(b, 'pt-BR')
const cities = [...new Set(studios.map((s) => s.city).filter(Boolean))].sort(byName)
const areas = [...new Set(studios.flatMap((s) => s.areas))].sort(byName)
const situations = [...new Set(studios.map((s) => s.situation).filter(Boolean))].sort(byName)

// studios.json já vem ordenado por ano de fundação decrescente.
export default function Estudios() {
  const [params, setParams] = useSearchParams()
  const cidade = params.get('cidade') || ''
  const area = params.get('area') || ''
  const situacao = params.get('situacao') || ''

  const filtered = useMemo(
    () =>
      studios.filter(
        (s) =>
          (!cidade || s.city === cidade) &&
          (!area || s.areas.includes(area)) &&
          (!situacao || s.situation === situacao),
      ),
    [cidade, area, situacao],
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
  const hasFilter = cidade || area || situacao

  return (
    <PageShell kicker="Associados" title="Lista de estúdios">
      <div className="grid gap-4 sm:grid-cols-3">
        <FilterSelect label="Cidade" value={cidade} onChange={setFilter('cidade')} options={cities} />
        <FilterSelect label="Área de atuação" value={area} onChange={setFilter('area')} options={areas} />
        <FilterSelect label="Situação" value={situacao} onChange={setFilter('situacao')} options={situations} />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-mute">
        <p aria-live="polite">{filtered.length} {filtered.length === 1 ? 'estúdio' : 'estúdios'}</p>
        {hasFilter && (
          <button onClick={() => setParams({})} className="text-brand-navy hover:underline">Limpar filtros</button>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-mute">Nenhum estúdio encontrado com esses filtros.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => <StudioCard key={s.id} s={s} />)}
        </div>
      )}

      <Pagination page={page} total={total} onPage={goPage} />
    </PageShell>
  )
}
