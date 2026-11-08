import studios from '../studios.json'
import GroupCarousel from './GroupCarousel.jsx'
import StudioCard from './StudioCard.jsx'

// RF-01 (spec 003): estúdios de destaque, já marcados e ordenados pelo script.
const featured = studios
  .filter((s) => s.featured)
  .sort((a, b) => b.steamCount - a.steamCount || b.gamesCount - a.gamesCount || (a.founded ?? Infinity) - (b.founded ?? Infinity))

export default function StudiosCarousel() {
  return <GroupCarousel items={featured} label="Estúdios de destaque" renderItem={(s) => <StudioCard key={s.id} s={s} />} />
}
