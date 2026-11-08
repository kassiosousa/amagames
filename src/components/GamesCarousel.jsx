import games from '../games.json'
import GameCard from './GameCard.jsx'
import GroupCarousel from './GroupCarousel.jsx'

// games.json já vem ordenado do mais recente ao mais antigo.
// RF-01 (spec 002): 9 jogos de destaque, apenas os publicados na Steam.
const featured = games.filter((g) => g.steam).slice(0, 9)

export default function GamesCarousel() {
  return <GroupCarousel items={featured} label="Jogos de destaque" renderItem={(g) => <GameCard key={g.id} g={g} />} />
}
