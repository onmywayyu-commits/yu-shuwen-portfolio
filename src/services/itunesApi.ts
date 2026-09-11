export interface ITunesTrack {
  trackId?: number
  trackName?: string
  artistName?: string
  collectionName?: string
  artworkUrl100?: string
  previewUrl?: string
  trackViewUrl?: string
}

export interface ITunesMetadata {
  title: string
  artist: string
  album: string
  artwork?: string
  previewUrl?: string
  url?: string
}

interface ITunesResponse {
  resultCount?: number
  results?: ITunesTrack[]
}

function isITunesResponse(value: unknown): value is ITunesResponse {
  return typeof value === 'object' && value !== null && 'results' in value
}

export async function fetchITunesTrack(
  songName: string,
  artist?: string,
  signal?: AbortSignal,
): Promise<ITunesMetadata> {
  const term = [songName, artist].filter(Boolean).join(' ')
  const params = new URLSearchParams({ term, media: 'music', entity: 'song', limit: '1' })
  const response = await fetch(`https://itunes.apple.com/search?${params.toString()}`, { signal })
  if (!response.ok) throw new Error(`iTunes request failed (${response.status})`)
  const raw: unknown = await response.json()
  if (!isITunesResponse(raw) || !raw.results?.length) throw new Error('No iTunes result found')
  const track = raw.results[0]

  return {
    title: track.trackName || songName,
    artist: track.artistName || artist || 'Unknown artist',
    album: track.collectionName || 'Single',
    artwork: track.artworkUrl100?.replace('100x100', '600x600'),
    previewUrl: track.previewUrl,
    url: track.trackViewUrl,
  }
}
