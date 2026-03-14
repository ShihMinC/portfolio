'use client'

export default function Contact() {
  return (
    <section id="contact" style={{
      margin: '0 3.5rem',
      borderTop: '2px solid var(--ink)',
      borderBottom: '1px solid var(--rule)',
      padding: '5rem 0 6rem',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end' }}>
        <h2 style={{
          fontFamily: 'var(--serif)', fontWeight: 300,
          fontSize: 'clamp(3.5rem, 7vw, 6rem)',
          lineHeight: 0.95, letterSpacing: '-0.02em',
        }}>
          Let&rsquo;s<br />
          <em style={{ color: 'var(--accent)' }}>work</em><br />
          together.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <a
            href="mailto:oosammioo@gmail.com"
            style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--ink)', borderBottom: '1px solid var(--rule)', paddingBottom: '0.5rem', display: 'block', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink)')}
          >
            oosammioo@gmail.com
          </a>
          <div style={{ display: 'flex', gap: '2.5rem' }}>
            <a
              href="https://www.linkedin.com/in/shih-min-chen/"
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--sans)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
