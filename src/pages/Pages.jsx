import { PageShell, ProjectCard, StudioCard, accent } from '../components/ui.jsx'
import { board, faturamento, mapeamento, projects, studios } from '../data.js'

export function Diretoria() {
  return (
    <PageShell kicker="Institucional" title="Diretoria">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {board.map((b, k) => (
          <div key={b.role} className="border border-line p-6">
            <span className={`block h-1 w-8 ${accent(k)}`} />
            <h3 className="mt-5 font-bold">{b.name}</h3>
            <p className="text-sm text-mute">{b.role}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-brand-red">Os nomes da diretoria atual não são públicos nas fontes pesquisadas: preencher em src/data.js.</p>
    </PageShell>
  )
}

export function ListaEstudios() {
  return (
    <PageShell kicker="Associados" title="Lista de estúdios">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {studios.map((s, k) => <StudioCard key={k} s={s} k={k} />)}
      </div>
    </PageShell>
  )
}

export function Projetos() {
  return (
    <PageShell kicker="Ações" title="Projetos">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, k) => <ProjectCard key={p.name} p={p} k={k} />)}
      </div>
    </PageShell>
  )
}

const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export function Mapeamento() {
  const max = Math.max(...faturamento.map((f) => f.value))
  return (
    <PageShell kicker="Dados do ecossistema" title="Mapeamento 2023">
      <p className="max-w-2xl text-lg font-light text-mute">
        Levantamento anual da AMAGAMES, com formulário padronizado entre associações regionais.
        Publicado nos anais da SBGames 2024 (Cael Borges et al.).
      </p>
      <dl className="mt-10 grid grid-cols-2 gap-px bg-line lg:grid-cols-3">
        {mapeamento.map(([v, l]) => (
          <div key={l} className="bg-paper p-6">
            <dt className="font-display text-3xl font-black text-brand-navy">{v}</dt>
            <dd className="mt-2 text-sm text-mute">{l}</dd>
          </div>
        ))}
      </dl>
      <h2 className="mt-16 text-2xl font-extrabold">Faturamento declarado</h2>
      <div className="mt-6 space-y-3">
        {faturamento.map((f, k) => (
          <div key={f.year} className="flex items-center gap-3">
            <span className="w-12 text-sm text-mute">{f.year}</span>
            <div className="h-5 flex-1 bg-soft">
              <div className={`h-5 ${accent(k)}`} style={{ width: `${(f.value / max) * 100}%` }} />
            </div>
            <span className="w-28 text-right text-sm">{brl(f.value)}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-mute">2023: +23,58% sobre 2022. O valor de 2022 é derivado da queda de ~38% sobre 2021 relatada no estudo.</p>
      <p className="mt-6 text-sm text-mute">
        Em 2023, 16 dos 20 jogos em produção eram para PC, 6 mobile e 1 VR; 4 foram lançados na Steam.
      </p>
    </PageShell>
  )
}
