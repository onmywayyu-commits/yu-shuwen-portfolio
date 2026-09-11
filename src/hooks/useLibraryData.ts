import { useEffect, useState } from 'react'
import { animeEntries, musicEntries, type AnimeEntry, type MusicEntry } from '../data/siteData'
import libraryConfig from '../data/libraryData.json'
import { fetchBangumiSubject, type BangumiMetadata } from '../services/bangumiApi'
import { fetchITunesTrack, type ITunesMetadata } from '../services/itunesApi'

export interface AnimeWithMetadata extends AnimeEntry {
  personalRating?: string
  analysisUrl?: string
  metadata?: BangumiMetadata
}

export interface MusicWithMetadata extends MusicEntry {
  metadata?: ITunesMetadata
}

interface LibraryState {
  anime: AnimeWithMetadata[]
  music: MusicWithMetadata[]
  loading: boolean
  error: string | null
}

export function useLibraryData(): LibraryState {
  const [state, setState] = useState<LibraryState>({
    anime: animeEntries.slice(0, 8),
    music: musicEntries,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()
    const configuredAnime = new Map(libraryConfig.animes.map((entry) => [entry.bgmId, entry]))
    const configuredMusic = libraryConfig.musics

    async function load() {
      const errors: string[] = []
      const animeResults: Array<AnimeWithMetadata | null> = await Promise.all(
        Array.from(configuredAnime.entries()).map(async ([bgmId, config]): Promise<AnimeWithMetadata | null> => {
          try {
            const metadata = await fetchBangumiSubject(bgmId, controller.signal)
            const fallback = animeEntries.find((entry) => entry.title === metadata.title) ?? animeEntries[0]
            return {
              ...fallback,
              shortReview: config.comment || fallback.shortReview,
              personalRating: config.rating,
              analysisUrl: config.xhsUrl || undefined,
              metadata,
            }
          } catch (error) {
            if (!(error instanceof DOMException && error.name === 'AbortError')) errors.push('Bangumi')
            return null
          }
        }),
      )

      const musicResults: Array<MusicWithMetadata | null> = await Promise.all(
        configuredMusic.map(async (config): Promise<MusicWithMetadata | null> => {
          try {
            const metadata = await fetchITunesTrack(config.songName, config.artist, controller.signal)
            const fallback = musicEntries.find((entry) => entry.title.includes(config.songName)) ?? musicEntries[0]
            return { ...fallback, title: metadata.title, artist: metadata.artist, metadata }
          } catch (error) {
            if (!(error instanceof DOMException && error.name === 'AbortError')) errors.push('iTunes')
            return null
          }
        }),
      )

      if (controller.signal.aborted) return
      setState({
        anime: animeResults.filter((entry): entry is AnimeWithMetadata => entry !== null).length
          ? animeResults.filter((entry): entry is AnimeWithMetadata => entry !== null)
          : animeEntries.slice(0, 8),
        music: musicResults.filter((entry): entry is MusicWithMetadata => entry !== null).length
          ? musicResults.filter((entry): entry is MusicWithMetadata => entry !== null)
          : musicEntries,
        loading: false,
        error: errors.length ? `${errors.join(' and ')} data unavailable; showing saved entries.` : null,
      })
    }

    void load()
    return () => controller.abort()
  }, [])

  return state
}
