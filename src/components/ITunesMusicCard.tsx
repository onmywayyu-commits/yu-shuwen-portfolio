import CoverArt from './CoverArt'
import type { MusicWithMetadata } from '../hooks/useLibraryData'

export default function ITunesMusicCard({ entry }: { entry: MusicWithMetadata }) {
  return (
    <article className="library-card music-card">
      <div className="library-cover library-cover--square">
        <CoverArt seed={entry.id} title={entry.title} image={entry.cover} />
      </div>
      <div className="library-card-body">
        <p className="library-meta">{entry.tags.join(' · ')}</p>
        <h3>{entry.title}</h3>
        <p className="music-artist">{entry.artist}</p>
        {entry.favoritePart && <p className="library-summary">{entry.favoritePart}</p>}
        <p className="library-comment">{entry.comment}</p>
        <div className="library-card-footer">
          <span>{entry.monthlyPick ? 'Monthly pick' : 'Personal selection'}</span>
        </div>
      </div>
    </article>
  )
}
