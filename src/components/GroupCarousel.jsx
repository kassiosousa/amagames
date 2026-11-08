import { useEffect, useState } from 'react'

const query = '(min-width: 1024px)'

// Carrossel em grupos: 3 itens por vez a partir de 1024 px e 1 por vez abaixo disso;
// troca a cada 5 s e fica parado com o mouse ou o foco em cima (RNF-01, RNF-02).
export default function GroupCarousel({ items, label, renderItem }) {
  const [size, setSize] = useState(() => (window.matchMedia(query).matches ? 3 : 1))
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => { setSize(mq.matches ? 3 : 1); setPage(0) }
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const pages = Math.max(1, Math.ceil(items.length / size))

  useEffect(() => {
    if (paused || pages < 2) return
    const t = setInterval(() => setPage((p) => (p + 1) % pages), 5000)
    return () => clearInterval(t)
  }, [paused, pages])

  const shown = items.slice(page * size, page * size + size)
  const go = (p) => setPage((p + pages) % pages)

  return (
    <div
      aria-roledescription="carrossel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div key={page} className={`grid gap-4 ${size === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
        {shown.map(renderItem)}
      </div>
      {pages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button aria-label="Anteriores" onClick={() => go(page - 1)} className="px-2 text-2xl text-mute hover:text-ink">‹</button>
          <div className="flex gap-2">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                aria-label={`Ir para o grupo ${i + 1}`}
                aria-current={i === page}
                onClick={() => go(i)}
                className={`h-1.5 transition-all ${i === page ? 'w-8 bg-brand-red' : 'w-4 bg-line'}`}
              />
            ))}
          </div>
          <button aria-label="Próximos" onClick={() => go(page + 1)} className="px-2 text-2xl text-mute hover:text-ink">›</button>
        </div>
      )}
    </div>
  )
}
