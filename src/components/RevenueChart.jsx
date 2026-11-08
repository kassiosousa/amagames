import { accent } from './ui.jsx'

const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
const pct = (g) => `${g > 0 ? '+' : g < 0 ? '−' : ''}${Math.abs(g)}%`

// Faturamento declarado por ano: barras proporcionais, valor e variação sobre o ano mapeado anterior (RF-03, RF-09).
export default function RevenueChart({ data, current }) {
  if (!data.length) return null
  const max = Math.max(...data.map((d) => d.value))
  const skipped = data.some((d, i) => i > 0 && d.year - data[i - 1].year > 1)

  return (
    <div>
      <ul className="space-y-3">
        {data.map((d, k) => (
          <li key={d.year} className="flex items-center gap-3">
            <span className={`w-12 shrink-0 text-sm ${d.year === current ? 'font-bold' : 'text-mute'}`}>{d.year}</span>
            <span className="h-5 flex-1 bg-soft" aria-hidden="true">
              <span className={`block h-5 ${accent(k)}`} style={{ width: `${(d.value / max) * 100}%` }} />
            </span>
            <span className="w-28 shrink-0 text-right text-sm sm:w-40">
              {brl(d.value)}
              {d.growth !== null && (
                <span className={`ml-2 hidden text-xs sm:inline ${d.growth < 0 ? 'text-brand-red' : 'text-mute'}`}>{pct(d.growth)}</span>
              )}
            </span>
            {d.growth !== null && <span className="sr-only">variação de {pct(d.growth)} sobre {d.growthFrom}</span>}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-mute">
        A variação compara cada ano com o mapeamento anterior.
        {skipped && ' Não houve mapeamento em 2020: o mapeamento foi feito em 2019 e depois de 2021 em diante, por isso 2021 é comparado com 2019.'}
      </p>
    </div>
  )
}
