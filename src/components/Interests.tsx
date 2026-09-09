import { useState } from 'react'
import Section from './Section'
import AnimeJournal from './AnimeJournal'
import MusicNotes from './MusicNotes'
import GameDiary from './GameDiary'
import CreativeCorner from './CreativeCorner'

const tabs = [
  { id: 'anime', label: '动画与剧评' },
  { id: 'music', label: '音乐推荐' },
  { id: 'game', label: '游戏手记' },
  { id: 'creative', label: '手作 · 吉他 · 唱歌' },
] as const

type TabId = (typeof tabs)[number]['id']

export default function Interests() {
  const [active, setActive] = useState<TabId>('anime')

  return (
    <Section
      id="interests"
      title="兴趣角落"
      subtitle="工作之外的我：每季度认真写新番评价，也弹琴、唱歌、做手工。"
    >
      {/* Tabs 导航 */}
      <div role="tablist" aria-label="兴趣分类" className="mb-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              active === t.id
                ? 'border-accent bg-accent text-white shadow-sm'
                : 'border-line bg-surface text-muted hover:border-accent hover:text-accent'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {active === 'anime' && <AnimeJournal />}
        {active === 'music' && <MusicNotes />}
        {active === 'game' && <GameDiary />}
        {active === 'creative' && <CreativeCorner />}
      </div>
    </Section>
  )
}
