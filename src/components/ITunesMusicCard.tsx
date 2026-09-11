import CoverArt from './CoverArt'
import type { MusicWithMetadata } from '../hooks/useLibraryData'

export default function ITunesMusicCard({ entry }: { entry: MusicWithMetadata }) {
  const title = entry.metadata?.title || entry.title
  const artist = entry.metadata?.artist || entry.artist
  const album = entry.metadata?.album || 'Album details coming soon'
  const cover = entry.metadata?.artwork || entry.cover

  return (
    <article className="library-card music-card">
      <div className="library-cover library-cover--square">
        <CoverArt seed={entry.id} title={title} image={cover} />
      </div>
      <div className="library-card-body">
        <p className="library-meta">{entry.tags.join(' · ')}</p>
        <h3>{title}</h3>
        <p className="music-artist">{artist}</p>
        <p className="library-summary">{album}</p>
        <p className="library-comment">{entry.comment}</p>
        {entry.metadata?.previewUrl && (
          <audio className="preview-player" controls preload="none" src={entry.metadata.previewUrl}>
            Your browser does not support audio preview.
          </audio>
        )}
        <div className="library-card-footer">
          <span>{entry.monthlyPick ? 'Monthly pick' : 'Personal selection'}</span>
          {entry.metadata?.url && <a href={entry.metadata.url} target="_blank" rel="noreferrer">Open in iTunes ↗</a>}
        </div>
      </div>
    </article>
  )
}
