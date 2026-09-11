import { animeEntries, musicEntries, type AnimeEntry, type MusicEntry } from '../data/siteData'

export interface AnimeWithMetadata extends AnimeEntry {
  personalRating?: string
  analysisUrl?: string
}

export interface MusicWithMetadata extends MusicEntry {}

interface LibraryState {
  anime: AnimeWithMetadata[]
  music: MusicWithMetadata[]
  loading: boolean
  error: string | null
}

/**
 * External API fallback: Bangumi and iTunes are queried client-side but have
 * proven unreliable from GitHub Pages (CORS / availability issues). We now
 * return the full local dataset directly so the library is fast, stable, and
 * uses the covers / reviews stored in siteData.ts.
 */
export function useLibraryData(): LibraryState {
  return {
    anime: animeEntries,
    music: musicEntries,
    loading: false,
    error: null,
  }
}
