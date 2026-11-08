import { useSearchParams } from 'react-router-dom'
import mapping from '../mapping.json'
import IndicatorSection from '../components/IndicatorSection.jsx'
import RevenueChart from '../components/RevenueChart.jsx'
import { PageShell } from '../components/ui.jsx'

const { years, latest, revenue, byYear } = mapping

export default function Mapeamento() {
  const [params, setParams] = useSearchParams()

  if (!years.length) {
    return (
      <PageShell kicker="Dados do ecossistema" title="Mapeamento">
        <p className="text-mute">Os dados do mapeamento ainda não foram publicados.</p>
      </PageShell>
    )
  }

  // RF-04: ano inexistente na URL volta ao mais recente.
  const asked = Number(params.get('ano'))
  const year = years.includes(asked) ? asked : latest
  const data = byYear[year]
  const select = (y) => setParams(y === latest ? {} : { ano: String(y) }, { replace: true })

  return (
    <PageShell kicker="Dados do ecossistema" title={`Mapeamento ${year}`}>
      <p className="max-w-2xl text-lg font-light text-mute">
        Levantamento anual da AMAGAMES sobre estúdios, jogos, mercado e diversidade do ecossistema maranhense de desenvolvimento de jogos.
      </p>

      {/* RF-01 e RF-04: detalhes do ano à esquerda; aba de anos à direita (fileira acima em telas pequenas) */}
      <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:gap-12">
        <div role="tabpanel" id="detalhes-ano" aria-labelledby={`aba-${year}`} className="min-w-0 flex-1 lg:order-1">
          {data.sections.map((s) => <IndicatorSection key={s.key} section={s} />)}
          <p className="mt-10 text-xs text-mute">
            Fonte: Mapeamento do ecossistema de desenvolvimento de jogos do Maranhão ({year}).
            {data.credits && ` ${data.credits}.`}
            {data.article && (
              <>
                {' '}Publicado também nos anais do SBGames 2024:{' '}
                <a href={data.article.url} target="_blank" rel="noopener noreferrer" className="text-brand-navy underline">artigo completo</a>.
              </>
            )}
          </p>
        </div>

        <nav aria-label="Ano do mapeamento" className="order-first lg:order-2 lg:w-40 lg:shrink-0">
          <p className="mb-3 text-xs font-medium uppercase tracking-[.15em] text-mute">Ano</p>
          <div role="tablist" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-line lg:pb-0">
            {years.map((y) => (
              <button
                key={y}
                id={`aba-${y}`}
                role="tab"
                aria-selected={y === year}
                aria-controls="detalhes-ano"
                onClick={() => select(y)}
                className={`shrink-0 border px-4 py-2 text-left text-sm transition lg:-ml-px lg:border-0 lg:border-l-2 lg:px-4 ${
                  y === year
                    ? 'border-brand-red font-bold text-ink lg:border-brand-red'
                    : 'border-line text-mute hover:text-ink lg:border-transparent'
                }`}
              >
                {y}
                {y === latest && <span className="ml-2 text-xs font-normal text-mute">mais recente</span>}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <h2 className="mt-20 text-2xl font-extrabold">Faturamento declarado</h2>
      <div className="mt-6">
        <RevenueChart data={revenue} current={year} />
      </div>

      {/* RF-05: abaixo de todos os dados */}
      {data.pdf && (
        <p className="mt-16 border-t border-line pt-8">
          <a
            href={data.pdf.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-brand-navy hover:underline"
          >
            Visualizar Infográfico {year} <span aria-hidden="true">↗</span>
            <span className="sr-only"> (PDF, abre em nova aba)</span>
          </a>
          <span className="ml-3 text-sm text-mute">PDF · {data.pdf.size}</span>
        </p>
      )}
    </PageShell>
  )
}
