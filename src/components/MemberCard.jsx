import { useState } from 'react'
import { accent } from './ui.jsx'

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

// Cartão de membro da diretoria: foto quadrada (rosto na metade de cima), nome e função (RF-03, RF-04).
export default function MemberCard({ m, k = 0 }) {
  const [failed, setFailed] = useState(false)
  const showPhoto = m.photo && !failed

  return (
    <article className="border border-line bg-paper">
      <span className={`block h-1 w-full ${accent(k)}`} />
      <div className="aspect-square overflow-hidden bg-soft">
        {showPhoto ? (
          <img
            src={m.photo}
            alt={`Foto de ${m.name}`}
            width="600"
            height="600"
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-[50%_25%]"
          />
        ) : (
          <div aria-hidden="true" className="flex h-full w-full items-center justify-center font-display text-5xl font-black text-brand-navy">
            {initials(m.name)}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-extrabold leading-tight">{m.name}</h3>
        <p className="mt-1 text-sm text-mute">{m.role}</p>
      </div>
    </article>
  )
}
