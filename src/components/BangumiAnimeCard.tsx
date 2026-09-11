import CoverArt from './CoverArt'
import type { AnimeWithMetadata } from '../hooks/useLibraryData'

export default function BangumiAnimeCard({ entry }: { entry: AnimeWithMetadata }) {
  return (
    <article className="library-card anime-card">
      <div className="library-cover">
        <CoverArt seed={entry.id} title={entry.title} image={entry.cover} />
        <span className="rating-badge">{entry.personalRating || entry.tier}</span>
      </div>
      <div className="library-card-body">
        <p className="library-meta">{entry.season} · {entry.genre || 'Animation'}</p>
        <h3>{entry.title}</h3>
        <p className="library-comment">{entry.shortReview}</p>
        {entry.detail && <p className="library-summary">{entry.detail}</p>}
        <div className="library-card-footer">
          <span className="personal-rating">{entry.personalRating || entry.tier}</span>
          <div className="card-links">
            {entry.analysisUrl && <a href={entry.analysisUrl} target="_blank" rel="noreferrer">阅读完整分析 →</a>}
          </div>
        </div>
      </div>
    </article>
  )
}
