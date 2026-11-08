// "2026-08-27" -> "27 de agosto de 2026" (sem fuso, para a data não recuar um dia)
const fmt = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' })
const dateLabel = (iso) => (iso ? fmt.format(new Date(`${iso}T00:00:00Z`)) : '')

// Matéria da imprensa: data, veículo, tema, título (link para a fonte), resumo próprio e etiqueta (RF-03, RF-06).
export default function PressCard({ p }) {
  return (
    <article className="border border-line bg-paper p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        {p.date && <time dateTime={p.date} className="font-medium text-brand-navy">{dateLabel(p.date)}</time>}
        {p.outlet && <span className="font-medium uppercase tracking-wider text-mute">{p.outlet}</span>}
        {p.topic && <span className="border border-line px-2 py-0.5 text-mute">{p.topic}</span>}
        {p.unconfirmed && <span className="border border-line px-2 py-0.5 text-mute">Dado a confirmar</span>}
      </div>
      <h3 className="mt-3 text-lg font-bold leading-snug">
        <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand-navy hover:underline">
          {p.title}<span aria-hidden="true" className="ml-1 text-sm text-mute">↗</span>
          <span className="sr-only"> (abre em nova aba, em {p.outlet})</span>
        </a>
      </h3>
      {p.summary && <p className="mt-2 text-sm text-mute">{p.summary}</p>}
    </article>
  )
}
