import CoverArt from './CoverArt'
import type { AnimeWithMetadata } from '../hooks/useLibraryData'

export default function BangumiAnimeCard({ entry }: { entry: AnimeWithMetadata }) {
  const title = entry.metadata?.title || entry.title
  const cover = entry.metadata?.cover || entry.cover
  const year = entry.metadata?.year || entry.season

  return (
    <article className="library-card anime-card">
      <div className="library-cover">
        <CoverArt seed={entry.id} title={title} image={cover} />
        <span className="rating-badge">{entry.personalRating || entry.tier}</span>
      </div>
      <div className="library-card-body">
        <p className="library-meta">{year} · {entry.genre || 'Animation'}</p>
        <h3>{title}</h3>
        <p className="library-comment">{entry.shortReview}</p>
        {entry.metadata?.summary && <p className="library-summary">{entry.metadata.summary}</p>}
        <div className="library-card-footer">
          <span className="personal-rating">{entry.personalRating || entry.tier}</span>
          <div className="card-links">
            {entry.analysisUrl && <a href={entry.analysisUrl} target="_blank" rel="noreferrer">阅读完整分析 →</a>}
            {entry.metadata?.url && <a href={entry.metadata.url} target="_blank" rel="noreferrer">Bangumi ↗</a>}
          </div>
        </div>
      </div>
    </article>
  )
}
