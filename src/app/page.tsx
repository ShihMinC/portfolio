import { getPage, HOME_PAGE_ID } from '@/lib/notion'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import NotionPage from '@/components/NotionPage'
import Contact from '@/components/Contact'

export const revalidate = 60

const SKILLS = ['UX Research', 'UI Design', 'Figma', 'Prototyping', 'Design Systems', 'Motion', 'Usability Testing', 'HTML / CSS']

export default async function Home() {
  const recordMap = await getPage(HOME_PAGE_ID)

  return (
    <>
      <Nav />
      <Hero />

      {/* Work */}
      <section id="work" style={{ padding: '0 3.5rem 6rem', borderTop: '2px solid var(--ink)' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '3rem 1fr',
          alignItems: 'baseline', gap: '1.5rem',
          padding: '3.5rem 0 2.5rem', borderBottom: '1px solid var(--rule)',
        }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: '0.7rem', color: 'var(--muted)' }}>01</span>
          <h2 style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300,
            letterSpacing: '-0.01em', lineHeight: 1,
          }}>Selected Work</h2>
        </div>
        <NotionPage recordMap={recordMap} />
      </section>

      {/* About */}
      <section id="about" style={{
        display: 'grid', gridTemplateColumns: '1fr 1px 1fr',
        margin: '0 3.5rem', borderTop: '2px solid var(--ink)',
      }}>
        <div style={{ padding: '4rem 4rem 4rem 0' }}>
          <div style={{ fontFamily: 'var(--serif-sc)', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--muted)', marginBottom: '2.5rem' }}>
            02 — About
          </div>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 300, lineHeight: 1.4, marginBottom: '2rem' }}>
            &ldquo;Good design is{' '}
            <span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>invisible</span>
            {' '}— until it&rsquo;s missing.&rdquo;
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.9 }}>
            UI/UX designer based in Taiwan, focused on crafting digital experiences that feel effortless and purposeful.
          </p>
        </div>

        <div style={{ background: 'var(--rule)' }} />

        <div style={{ padding: '4rem 0 4rem 4rem' }}>
          <div style={{ fontFamily: 'var(--serif-sc)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--rule)' }}>
            Disciplines &amp; Tools
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {SKILLS.map((skill, i) => (
              <div key={skill} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.65rem 0', borderBottom: '1px solid var(--rule)',
                fontSize: '0.75rem', color: 'var(--ink-mid)',
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

      {/* Contact — client component for hover effects */}
      <Contact />

      <footer style={{ margin: '0 3.5rem', padding: '1.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '0.75rem', color: 'var(--muted)' }}>
          © 2025 Shih-Min Chen
        </span>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--rule)', fontFamily: 'var(--sans)' }}>
          Powered by Notion
        </span>
      </footer>
    </>
  )
}
