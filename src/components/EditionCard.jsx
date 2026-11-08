import { Link } from 'react-router-dom'

// Enquanto a associação completa os dados, só o ano de realização aparece (decisão de 2026-11-07).
// Para voltar a mostrar data e local, basta trocar para true.
const SHOW_DATE_AND_PLACE = false

// Item da lista de Projetos: ícone, rótulo, nome (link opcional), edição, ano, descrição, parceiros e fonte (RF-09, RF-11, RF-12).
export default function EditionCard({ e }) {
  const title = e.link ? (
    e.external ? (
      <a href={e.link} target="_blank" rel="noopener noreferrer" className="hover:text-brand-navy hover:underline">
        {e.name}<span aria-hidden="true" className="ml-1 text-sm text-mute">↗</span>
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    ) : (
      <Link to={e.link} className="hover:text-brand-navy hover:underline">{e.name}</Link>
    )
  ) : (
    e.name
  )
  const when = SHOW_DATE_AND_PLACE ? [e.date, e.place].filter(Boolean).join(' · ') : ''

  return (
    <article className="flex gap-5 border border-line bg-paper p-5 sm:p-6">
      <img src={e.icon} alt="" width="48" height="48" loading="lazy" className="h-12 w-12 shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-mute">{e.label}</p>
          {e.unconfirmed && <span className="border border-line px-2 py-0.5 text-xs text-mute">Dado a confirmar</span>}
        </div>
        <h3 className="mt-1 text-lg font-bold leading-snug">{title}</h3>
        <p className="mt-1 text-sm text-brand-navy">
          {[e.edition, e.year && !e.edition.includes(String(e.year)) ? e.year : ''].filter(Boolean).join(' · ')}
          {when && <span className="text-mute"> · {when}</span>}
        </p>
        {e.description && <p className="mt-2 text-sm text-mute">{e.description}</p>}
        {e.partners && <p className="mt-2 text-xs text-mute"><span className="font-medium text-ink">Parceiros e apoio:</span> {e.partners}</p>}
        {e.source && (
          <p className="mt-2 text-xs text-mute">
            Fonte:{' '}
            {e.sourceUrl ? (
              <a href={e.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-brand-navy underline">{e.source}</a>
            ) : (
              e.source
            )}
          </p>
        )}
      </div>
    </article>
  )
}
