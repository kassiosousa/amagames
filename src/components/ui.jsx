import { Link } from 'react-router-dom'

const accents = ['bg-brand-red', 'bg-brand-yellow', 'bg-brand-blue', 'bg-brand-navy']
export const accent = (k) => accents[k % accents.length]

export function Section({ id, title, kicker, children, link, alt }) {
  return (
    <section id={id} className={`scroll-mt-16 py-20 ${alt ? 'bg-soft' : ''}`}>
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-medium uppercase tracking-[.2em] text-brand-red">{kicker}</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
          {link && (
            <Link to={link[0]} className="text-sm font-medium text-brand-navy hover:underline">
              {link[1]} →
            </Link>
          )}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}

export function PageShell({ title, kicker, children }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Link to="/" className="text-sm text-brand-navy hover:underline">← Início</Link>
      <p className="mt-8 text-xs font-medium uppercase tracking-[.2em] text-brand-red">{kicker}</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
      <div className="mt-12">{children}</div>
    </div>
  )
}

const card = 'border border-line bg-paper p-6'

export function StudioCard({ s, k = 0 }) {
  return (
    <article className={card}>
      <span className={`block h-1 w-8 ${accent(k)}`} />
      <h3 className="mt-5 text-lg font-bold">{s.name}</h3>
      <p className="text-sm text-mute">{s.city}{s.since ? ` · desde ${s.since}` : ''}</p>
      <p className="mt-3 text-sm">{s.focus}</p>
      {s.note && <p className="mt-2 text-xs text-mute">{s.note}</p>}
      {s.confirmar && <p className="mt-3 text-xs text-brand-red">A confirmar</p>}
    </article>
  )
}

export function ProjectCard({ p, k = 0 }) {
  return (
    <article className={card}>
      <span className={`block h-1 w-8 ${accent(k)}`} />
      <p className="mt-5 text-xs font-medium uppercase tracking-wider text-mute">{p.kind}</p>
      <h3 className="mt-1 text-lg font-bold">{p.name}</h3>
      <p className="mt-2 text-sm text-mute">{p.desc}</p>
    </article>
  )
}
