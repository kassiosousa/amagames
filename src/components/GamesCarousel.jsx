import { useEffect, useState } from 'react'
import games from '../games.json'
import GameCard from './GameCard.jsx'

// games.json já vem ordenado do mais recente ao mais antigo
const recent = games.filter((g) => g.steam).slice(0, 9)
const query = '(min-width: 1024px)'

// RF-01: 9 jogos de destaque (publicados na Steam), 3 por vez (1 por vez em telas pequenas), troca a cada 5 s.
export default function GamesCarousel() {
  const [size, setSize] = useState(() => (window.matchMedia(query).matches ? 3 : 1))
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => { setSize(mq.matches ? 3 : 1); setPage(0) }
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const pages = Math.ceil(recent.length / size)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setPage((p) => (p + 1) % pages), 5000)
    return () => clearInterval(t)
  }, [paused, pages])

  const shown = recent.slice(page * size, page * size + size)
  const go = (p) => setPage((p + pages) % pages)

  return (
    <div
      aria-roledescription="carrossel"
      aria-label="Jogos mais recentes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div key={page} className={`grid gap-4 ${size === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
        {shown.map((g) => <GameCard key={g.id} g={g} />)}
      </div>
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
    </div>
  )
}
