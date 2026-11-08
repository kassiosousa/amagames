import { Link } from 'react-router-dom'

// Card de ação: ícone, tipo, nome (link opcional) e descrição (RF-02, RF-03, RF-07).
export default function ActionCard({ a }) {
  const title = a.link ? (
    a.external ? (
      <a href={a.link} target="_blank" rel="noopener noreferrer" className="hover:text-brand-navy hover:underline">
        {a.name}<span aria-hidden="true" className="ml-1 text-sm text-mute">↗</span>
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    ) : (
      <Link to={a.link} className="hover:text-brand-navy hover:underline">{a.name}</Link>
    )
  ) : (
    a.name
  )

  return (
    <article className="h-full border border-line bg-paper p-6">
      <img src={a.icon} alt="" width="48" height="48" loading="lazy" className="h-12 w-12" />
      {a.kind && <p className="mt-5 text-xs font-medium uppercase tracking-wider text-mute">{a.kind}</p>}
      <h3 className={`${a.kind ? 'mt-1' : 'mt-5'} text-lg font-bold`}>{title}</h3>
      {a.description && <p className="mt-2 text-sm text-mute">{a.description}</p>}
    </article>
  )
}
