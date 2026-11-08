import MemberCard from '../components/MemberCard.jsx'
import { PageShell } from '../components/ui.jsx'
import { board } from '../data.js'

// A ordem de `board` em src/data.js é a ordem exibida (lista oficial da associação).
// `offset` mantém o rodízio de cores do traço contínuo entre os grupos.
const offsets = board.map((_, i) => board.slice(0, i).reduce((n, g) => n + g.members.length, 0))

export default function Diretoria() {
  return (
    <PageShell kicker="Institucional" title="Diretoria">
      {board.map((g, gi) => (
        <section key={g.group} aria-labelledby={`dir-${gi}`} className="mt-12 first:mt-0">
          <h2 id={`dir-${gi}`} className="text-sm font-medium uppercase tracking-[.15em] text-mute">{g.group}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.members.map((m, mi) => <MemberCard key={m.name} m={m} k={offsets[gi] + mi} />)}
          </div>
        </section>
      ))}
    </PageShell>
  )
}
