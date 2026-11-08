// Seção de indicadores de um ano: números em destaque ou, em "Participação em eventos", barras percentuais (RF-02).
const fmt = (v) => (typeof v === 'number' ? v.toLocaleString('pt-BR') : v)

export default function IndicatorSection({ section }) {
  const { title, items, bar } = section
  if (!items?.length) return null
  const max = bar ? Math.max(...items.map((i) => Number(i.value) || 0), 1) : 1

  return (
    <section aria-labelledby={`sec-${section.key}`} className="mt-10 first:mt-0">
      <h3 id={`sec-${section.key}`} className="text-sm font-medium uppercase tracking-[.15em] text-mute">{title}</h3>
      {bar ? (
        <ul className="mt-4 space-y-3">
          {items.map((i) => (
            <li key={i.label} className="flex items-center gap-3 text-sm">
              <span className="w-40 shrink-0 sm:w-56">{i.label}</span>
              <span className="h-3 flex-1 bg-soft" aria-hidden="true">
                <span className="block h-3 bg-brand-blue" style={{ width: `${(Number(i.value) / max) * 100}%` }} />
              </span>
              <span className="w-12 shrink-0 text-right font-medium">{fmt(i.value)}{i.unit}</span>
            </li>
          ))}
        </ul>
      ) : (
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((i) => (
            <div key={i.label} className={`border border-line bg-paper p-5 ${i.highlight || (typeof i.value === 'string' && i.value.length > 14) ? 'col-span-2 sm:col-span-3' : ''}`}>
              <dd className={`font-display font-black ${i.highlight ? 'text-4xl text-brand-red' : 'text-3xl text-brand-navy'}`}>
                {fmt(i.value)}
                {i.unit === '%' && <span>%</span>}
              </dd>
              <dt className="mt-1 text-sm text-mute">
                {i.label}
                {i.unit && i.unit !== '%' && typeof i.value === 'number' && !i.label.toLowerCase().includes(i.unit.toLowerCase().replace(/s$/, '')) && (
                  <span className="text-mute/70"> ({i.unit})</span>
                )}
              </dt>
              {i.note && <p className="mt-1 text-xs text-mute/80">{i.note}</p>}
            </div>
          ))}
        </dl>
      )}
    </section>
  )
}
