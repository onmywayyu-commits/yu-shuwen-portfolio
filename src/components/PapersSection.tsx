import { paperEntries } from '../data/paperData'
import BentoCard from './BentoCard'

export default function PapersSection() {
  return (
    <section id="papers" className="page-section">
      <div className="page-width">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">02 · Academic work</p>
            <h1>Academic papers</h1>
          </div>
          <p className="section-description">A growing archive of research, analytical writing, and questions I am still learning how to ask.</p>
        </div>
        <div className="paper-grid">
          {paperEntries.map((paper) => (
            <BentoCard key={paper.id} eyebrow={paper.context} title={paper.title} className="paper-card">
              <p className="paper-summary">{paper.summary}</p>
              <div className="paper-footer">
                <span className="status-label">{paper.status}</span>
                <div className="tag-row">{paper.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              {paper.link && (
                <a
                  className="inline-link"
                  href={paper.link}
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  Download paper →
                </a>
              )}
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  )
}
