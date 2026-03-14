import { getPage, HOME_PAGE_ID } from '@/lib/notion'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import NotionPage from '@/components/NotionPage'

// Revalidate every 60 seconds — Notion updates appear within a minute
export const revalidate = 60

export default async function Home() {
  const recordMap = await getPage(HOME_PAGE_ID)

  return (
    <>
      <Nav />
      <Hero />

      {/* Work Section */}
      <section id="work" style={{
        padding: '0 3.5rem 6rem',
        borderTop: '2px solid var(--ink)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '3rem 1fr',
          alignItems: 'baseline',
          gap: '1.5rem',
          padding: '3.5rem 0 2.5rem',
          borderBottom: '1px solid var(--rule)',
          marginBottom: '0',
        }}>
          <span style={{
            fontFamily: 'var(--serif)',
            fontSize: '0.7rem',
            color: 'var(--muted)',
          }}>01</span>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}>
            Selected Work
          </h2>
        </div>

        {/* Notion content renders here — gallery, text, etc */}
        <NotionPage recordMap={recordMap} />
      </section>

      {/* About */}
      <section id="about" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1px 1fr',
        margin: '0 3.5rem',
        borderTop: '2px solid var(--ink)',
      }}>
        <div style={{ padding: '4rem 4rem 4rem 0' }}>
          <div style={{
            fontFamily: 'var(--serif-sc)',
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            color: 'var(--muted)',
            marginBottom: '2.5rem',
          }}>
            02 — About
          </div>
          <p style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
            fontWeight: 300,
            lineHeight: 1.4,
            marginBottom: '2rem',
          }}>
            &ldquo;Good design is <span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>invisible</span> — until it&rsquo;s missing.&rdquo;
          </p>
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--muted)',
            lineHeight: 1.9,
          }}>
            UI/UX designer based in Taiwan, focused on crafting digital experiences that feel effortless and purposeful.
          </p>
        </div>

        <div style={{ background: 'var(--rule)' }} />

        <div style={{ padding: '4rem 0 4rem 4rem' }}>
          <div style={{
            fontFamily: 'var(--serif-sc)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'var(--muted)',
            marginBottom: '1.5rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid var(--rule)',
          }}>
            Disciplines & Tools
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {['UX Research', 'UI Design', 'Figma', 'Prototyping', 'Design Systems', 'Motion', 'Usability Testing', 'HTML / CSS'].map((skill, i) => (
              <div key={skill} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0',
                borderBottom: '1px solid var(--rule)',
                fontSize: '0.75rem',
                color: 'var(--ink-mid)',
                paddingRight: i % 2 === 0 ? '1.5rem' : '0',
                paddingLeft: i % 2 === 1 ? '1.5rem' : '0',
                borderLeft: i % 2 === 1 ? '1px solid var(--rule)' : 'none',
              }}>
                {skill}
                <span style={{ width: '5px', height: '5px', background: 'var(--accent)', borderRadius: '50%', flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{
        margin: '0 3.5rem',
        borderTop: '2px solid var(--ink)',
        borderBottom: '1px solid var(--rule)',
        padding: '5rem 0 6rem',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'flex-end',
        }}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 300,
            fontSize: 'clamp(3.5rem, 7vw, 6rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
          }}>
            Let&rsquo;s<br />
            <em style={{ color: 'var(--accent)' }}>work</em><br />
            together.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <a
              href="mailto:oosammioo@gmail.com"
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontSize: '1.4rem',
                color: 'var(--ink)',
                borderBottom: '1px solid var(--rule)',
                paddingBottom: '0.5rem',
                display: 'block',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink)')}
            >
              oosammioo@gmail.com
            </a>

            <div style={{ display: 'flex', gap: '2.5rem' }}>
              {[
                { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shih-min-chen/' },
              ].map(({ label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.62rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    fontFamily: 'var(--sans)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer style={{
        margin: '0 3.5rem',
        padding: '1.5rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--serif)',
          fontStyle: 'italic',
          fontSize: '0.75rem',
          color: 'var(--muted)',
        }}>
          © 2025 Shih-Min Chen
        </span>
        <span style={{
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--rule)',
          fontFamily: 'var(--sans)',
        }}>
          Powered by Notion
        </span>
      </footer>
    </>
  )
}
