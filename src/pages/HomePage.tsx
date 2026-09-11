import BentoCard from '../components/BentoCard'
import { about, animeEntries, musicEntries, siteMeta } from '../data/siteData'
import { resumeUrl } from '../data/siteConfig'
import { paperEntries } from '../data/paperData'
import type { AnimeWithMetadata, MusicWithMetadata } from '../hooks/useLibraryData'

interface Props {
  anime: AnimeWithMetadata[]
  music: MusicWithMetadata[]
  loading: boolean
  error: string | null
}

export default function HomePage({ anime, music, loading, error }: Props) {
  const featuredAnime = anime[0] ?? animeEntries[0]
  const featuredMusic = music[0] ?? musicEntries[0]

  return (
    <main className="page-section home-page" id="home">
      <div className="page-width">
        <section className="home-intro" aria-labelledby="home-title">
          <div>
            <p className="section-kicker">Personal homepage · Finance / Research / Culture</p>
            <h1 id="home-title">{siteMeta.name}</h1>
            <p className="home-lead">{siteMeta.taglineEn}</p>
          </div>
          <p className="home-intro-copy">{siteMeta.intro}</p>
        </section>

        <section className="bento-grid" aria-label="Highlights">
          <BentoCard eyebrow="01 · Profile" title="A finance mind with a curious life." className="bento-profile">
            <p>{about.bio}</p>
            <div className="mini-facts">
              <span><strong>3.68</strong> GPA</span>
              <span><strong>24/162</strong> Rank</span>
              <span><strong>7.5</strong> IELTS</span>
            </div>
          </BentoCard>

          <BentoCard eyebrow="02 · Resume" title="The professional side" className="bento-resume">
            <p>Internship experience in industry research, credit analysis, fixed income, investment banking, and data analytics.</p>
            <a className="button-link" href={resumeUrl} target="_blank" rel="noreferrer">View resume ↗</a>
            <span className="card-note">Replace the temporary URL in src/data/siteConfig.ts after deployment.</span>
          </BentoCard>

          <BentoCard eyebrow="03 · Academic work" title={paperEntries[0].title} className="bento-paper">
            <p>{paperEntries[0].summary}</p>
            <a className="inline-link" href="#papers">Explore papers →</a>
          </BentoCard>

          <BentoCard eyebrow="04 · Latest from the library" title="Small things I am into" className="bento-library">
            <div className="home-slice-grid">
              <div className="home-slice">
                <span className="slice-label">Watching</span>
                <strong>{featuredAnime.title}</strong>
                <span>{featuredAnime.shortReview || 'A new note is on its way.'}</span>
              </div>
              <div className="home-slice">
                <span className="slice-label">Listening</span>
                <strong>{featuredMusic.title}</strong>
                <span>{featuredMusic.artist}</span>
              </div>
            </div>
            <a className="inline-link" href="#library">Visit the library →</a>
            {loading && <span className="card-note">Refreshing selected metadata…</span>}
            {error && <span className="card-note">Saved notes are shown while live data is unavailable.</span>}
          </BentoCard>
        </section>
      </div>
    </main>
  )
}
