import { useState } from 'react'

// Card de jogo: imagem, título (link para a página pública), tags, resumo e, abaixo, o estúdio (RF-02, RF-07).
// Imagens muito largas (cápsulas em faixa, como 616 x 80) aparecem inteiras, sem recorte.
export default function GameCard({ g }) {
  const [wide, setWide] = useState(false)
  const fit = !g.hasCover ? 'object-contain p-4' : wide ? 'object-contain p-2' : 'object-cover'
  return (
    <article className="flex h-full flex-col border border-line bg-paper">
      <div className="aspect-video overflow-hidden bg-soft">
        <img
          src={g.image}
          alt={g.hasCover ? `Imagem do jogo ${g.title}` : ''}
          loading="lazy"
          onLoad={(e) => setWide(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight > 2.5)}
          className={`h-full w-full ${fit}`}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-extrabold leading-tight">
          {g.access ? (
            <a href={g.access} target="_blank" rel="noopener noreferrer" className="hover:text-brand-navy hover:underline">
              {g.title}<span aria-hidden="true" className="ml-1 text-sm text-mute">↗</span>
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          ) : (
            g.title
          )}
        </h3>
        {g.tags.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {g.tags.map((t) => (
              <li key={t} className="border border-line px-2 py-0.5 text-xs text-mute">{t}</li>
            ))}
          </ul>
        )}
        {g.summary && <p className="mt-3 line-clamp-4 text-sm text-mute">{g.summary}</p>}
        <p className="mt-auto line-clamp-2 pt-4 text-xs font-medium text-brand-navy" title={g.studio}>
          <span className="text-mute">{g.year} · </span>{g.studio || 'Estúdio não informado'}
        </p>
      </div>
    </article>
  )
}
