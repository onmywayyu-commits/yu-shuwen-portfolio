export interface BangumiSubject {
  id: number
  name?: string
  name_cn?: string
  date?: string
  summary?: string
  images?: { large?: string; common?: string }
  url?: string
}

export interface BangumiMetadata {
  id: number
  title: string
  year: string
  summary: string
  cover?: string
  url: string
}

function isBangumiSubject(value: unknown): value is BangumiSubject {
  return typeof value === 'object' && value !== null && 'id' in value && typeof value.id === 'number'
}

export async function fetchBangumiSubject(id: string, signal?: AbortSignal): Promise<BangumiMetadata> {
  const response = await fetch(`https://api.bgm.tv/v0/subjects/${encodeURIComponent(id)}`, {
    headers: { Accept: 'application/json' },
    signal,
  })
  if (!response.ok) throw new Error(`Bangumi request failed (${response.status})`)
  const raw: unknown = await response.json()
  if (!isBangumiSubject(raw)) throw new Error('Bangumi returned an unexpected response')

  return {
    id: raw.id,
    title: raw.name_cn || raw.name || `Bangumi subject ${id}`,
    year: raw.date?.slice(0, 4) || 'Year unavailable',
    summary: raw.summary || 'No summary available from Bangumi yet.',
    cover: raw.images?.large || raw.images?.common,
    url: raw.url || `https://bgm.tv/subject/${raw.id}`,
  }
}
