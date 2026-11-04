import { useEffect, useState } from 'react'
import { slides } from '../data.js'

// Slide com `image` (em public/slides/): foto à direita, com a borda esquerda esmaecendo
// gradualmente para a cor do fundo. Sem `image`, aparece o símbolo da marca com opacidade.
const fade = {
  maskImage: 'linear-gradient(to right, transparent 0%, #000 45%)',
  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 45%)',
}
export default function Carousel() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = slides.length

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI((v) => (v + 1) % n), 5000)
    return () => clearInterval(t)
  }, [paused, n])

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Fotos e destaques"
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${i * 100}%)` }}>
        {slides.map((s, k) => (
          <figure
            key={s.title}
            aria-hidden={k !== i}
            className={`relative flex h-[380px] w-full shrink-0 items-center sm:h-[460px] ${s.tone}`}
          >
            {s.image ? (
              <img
                src={s.image}
                alt=""
                className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-30 sm:w-3/5 sm:opacity-100"
                style={fade}
              />
            ) : (
              <img src="./brand/simbolo.webp" alt="" className="absolute -right-10 top-1/2 hidden h-[130%] -translate-y-1/2 opacity-[.12] mix-blend-luminosity sm:block" />
            )}
            <figcaption className="relative mx-auto w-full max-w-6xl px-4">
              <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-6xl">{s.title}</h1>
              <p className="mt-5 max-w-xl text-lg font-light opacity-90">{s.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <button aria-label="Slide anterior" onClick={() => setI((i - 1 + n) % n)} className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2 text-3xl opacity-70 hover:opacity-100">‹</button>
      <button aria-label="Próximo slide" onClick={() => setI((i + 1) % n)} className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 text-3xl opacity-70 hover:opacity-100">›</button>
      <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
        {slides.map((s, k) => (
          <button
            key={s.title}
            aria-label={`Ir para ${s.title}`}
            onClick={() => setI(k)}
            className={`h-1.5 transition-all ${k === i ? 'w-8 bg-current' : 'w-4 bg-current opacity-40'}`}
          />
        ))}
      </div>
    </section>
  )
}
