// Páginas visíveis: 1, atual±1 e última, com reticências.
function pageList(page, total) {
  const set = new Set([1, total, page - 1, page, page + 1].filter((p) => p >= 1 && p <= total))
  const list = []
  let prev = 0
  for (const p of [...set].sort((a, b) => a - b)) {
    if (p - prev > 1) list.push('…')
    list.push(p)
    prev = p
  }
  return list
}

export default function Pagination({ page, total, onPage }) {
  if (total < 2) return null
  return (
    <nav aria-label="Paginação" className="mt-12 flex flex-wrap items-center justify-center gap-1">
      <button aria-label="Página anterior" disabled={page === 1} onClick={() => onPage(page - 1)} className="px-3 py-2 text-xl text-mute enabled:hover:text-ink disabled:opacity-30">‹</button>
      {pageList(page, total).map((p, i) =>
        p === '…' ? (
          <span key={`e${i}`} className="px-2 text-mute">…</span>
        ) : (
          <button
            key={p}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onPage(p)}
            className={`min-w-9 border-b-2 px-2 py-1.5 text-sm ${p === page ? 'border-brand-red font-bold' : 'border-transparent text-mute hover:text-ink'}`}
          >
            {p}
          </button>
        ),
      )}
      <button aria-label="Próxima página" disabled={page === total} onClick={() => onPage(page + 1)} className="px-3 py-2 text-xl text-mute enabled:hover:text-ink disabled:opacity-30">›</button>
    </nav>
  )
}
