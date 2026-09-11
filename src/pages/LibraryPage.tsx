import { useState } from 'react'
import BangumiAnimeCard from '../components/BangumiAnimeCard'
import ITunesMusicCard from '../components/ITunesMusicCard'
import type { AnimeWithMetadata, MusicWithMetadata } from '../hooks/useLibraryData'

interface Props {
  anime: AnimeWithMetadata[]
  music: MusicWithMetadata[]
  loading: boolean
  error: string | null
}

type LibraryTab = 'anime' | 'music'

export default function LibraryPage({ anime, music, loading, error }: Props) {
  const [activeTab, setActiveTab] = useState<LibraryTab>('anime')

  return (
    <main id="library" className="page-section library-page">
      <div className="page-width">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">03 · Library</p>
            <h1>Interest corner</h1>
          </div>
          <p className="section-description">A living shelf for animation, music, games, and the small details that make a week feel personal.</p>
        </div>

        <div className="library-tabs" role="tablist" aria-label="Library categories">
          <button type="button" role="tab" aria-selected={activeTab === 'anime'} onClick={() => setActiveTab('anime')}>Animation & reviews</button>
          <button type="button" role="tab" aria-selected={activeTab === 'music'} onClick={() => setActiveTab('music')}>Music recommendations</button>
        </div>

        {loading && <p className="api-status">Loading selected metadata from Bangumi and iTunes…</p>}
        {error && <p className="api-status api-status--soft">{error}</p>}

        {activeTab === 'anime' ? (
          <section className="library-section" aria-label="Animation and reviews">
            <div className="library-intro">
              <p>Personal ratings and short reviews stay local; Bangumi supplies optional cover, title, year, and synopsis metadata.</p>
            </div>
            <div className="library-grid">
              {anime.map((entry) => <BangumiAnimeCard key={entry.id} entry={entry} />)}
            </div>
          </section>
        ) : (
          <section className="library-section" aria-label="Music recommendations">
            <div className="library-intro">
              <p>Saved recommendations are enriched with iTunes album artwork and 30-second previews when available.</p>
            </div>
            <div className="library-grid">
              {music.map((entry) => <ITunesMusicCard key={entry.id} entry={entry} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
