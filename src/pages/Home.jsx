import Carousel from '../components/Carousel.jsx'
import GamesCarousel from '../components/GamesCarousel.jsx'
import { ProjectCard, Section, StudioCard, accent } from '../components/ui.jsx'
import { about, partners, projects, stats, studios } from '../data.js'

export default function Home() {
  return (
    <>
      <Carousel />

      <Section id="quem-somos" kicker="Quem somos" title="Unindo quem faz jogos no Maranhão" link={['/diretoria', 'Conheça a diretoria']}>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-xl font-light leading-relaxed">{about.resumo}</p>
            <p className="text-mute">{about.historia}</p>
            <p className="text-mute"><strong className="font-medium text-ink">Missão.</strong> {about.missao}</p>
          </div>
          <dl className="grid grid-cols-2 gap-px bg-line">
            {stats.map((s) => (
              <div key={s.label} className="bg-paper p-6">
                <dt className="font-display text-4xl font-black text-brand-navy">{s.value}</dt>
                <dd className="mt-2 text-sm text-mute">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {about.pilares.map(([t, d], k) => (
            <div key={t}>
              <span className={`block h-1 w-8 ${accent(k)}`} />
              <h3 className="mt-4 font-bold">{t}</h3>
              <p className="mt-2 text-sm text-mute">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="estudios" alt kicker="Estúdios associados" title="Estúdios do Maranhão" link={['/estudios', 'Lista de estúdios']}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {studios.map((s, k) => <StudioCard key={k} s={s} k={k} />)}
        </div>
      </Section>

      <Section id="jogos" kicker="Jogos da comunidade" title="Feitos em terras maranhenses" link={['/jogos', 'Lista de jogos']}>
        <GamesCarousel />
      </Section>

      <Section id="acoes" alt kicker="Projetos e ações realizadas" title="O que a AMAGAMES faz" link={['/projetos', 'Todos os projetos']}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((p, k) => <ProjectCard key={p.name} p={p} k={k} />)}
        </div>
        <p className="mt-8 text-sm text-mute">
          Veja os números do <a href="#/mapeamento" className="text-brand-navy underline">mapeamento do ecossistema</a>.
        </p>
      </Section>

      <Section id="parceiros" kicker="Parceiros" title="Quem caminha com a gente">
        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((p) => (
            <li key={p.name} className="flex h-32 items-center justify-center bg-paper p-6 text-center text-sm text-mute">
              {p.image ? (
                <img src={p.image} alt={p.name} title={p.name} loading="lazy" className="max-h-full max-w-full object-contain" />
              ) : (
                p.name
              )}
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
