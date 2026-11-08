import { Link } from 'react-router-dom'

// Card de estúdio: logo, nome (link), tags, resumo e, abaixo, cidade, ano e nº de jogos (RF-02, RF-07, RF-08).
export default function StudioCard({ s }) {
  const meta = [s.city, s.founded && `desde ${s.founded}`].filter(Boolean).join(' · ')
  return (
    <article className="flex h-full flex-col border border-line bg-paper">
      <div className="aspect-video overflow-hidden bg-soft">
        <img
          src={s.logo}
          alt={s.hasLogo ? `Logo do estúdio ${s.name}` : ''}
          loading="lazy"
          className="h-full w-full object-contain p-4"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-extrabold leading-tight">
          {s.link ? (
            <a href={s.link} target="_blank" rel="noopener noreferrer" className="hover:text-brand-navy hover:underline">
              {s.name}<span aria-hidden="true" className="ml-1 text-sm text-mute">↗</span>
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          ) : (
            s.name
          )}
        </h3>
        {s.areas.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {s.areas.map((a) => (
              <li key={a} className="border border-line px-2 py-0.5 text-xs text-mute">{a}</li>
            ))}
          </ul>
        )}
        {s.summary && <p className="mt-3 line-clamp-4 text-sm text-mute">{s.summary}</p>}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-4 text-xs">
          <span className="text-mute">{meta}</span>
          {s.gamesCount > 0 && (
            <Link to={`/jogos?estudio=${encodeURIComponent(s.name)}`} className="font-medium text-brand-navy hover:underline">
              {s.gamesCount} {s.gamesCount === 1 ? 'jogo' : 'jogos'}
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
