// Card de jogo: imagem, título (link para a página pública), tags, resumo e, abaixo, o estúdio (RF-02, RF-07).
export default function GameCard({ g }) {
  return (
    <article className="flex h-full flex-col border border-line bg-paper">
      <div className="aspect-video overflow-hidden bg-soft">
        <img
          src={g.image}
          alt={g.hasCover ? `Imagem do jogo ${g.title}` : ''}
          loading="lazy"
          className={`h-full w-full ${g.hasCover ? 'object-cover' : 'object-contain p-4'}`}
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
