import { getPage } from '@/lib/notion'
import Nav from '@/components/Nav'
import NotionPage from '@/components/NotionPage'
import Link from 'next/link'

export const revalidate = 60

export default async function WorkPage({ params }: { params: { pageId: string } }) {
  const recordMap = await getPage(params.pageId)

  return (
    <>
      <Nav />
      <main style={{ marginTop: '56px', padding: '4rem 3.5rem 6rem' }}>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--sans)',
          fontSize: '0.62rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '3rem',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
        >
          ← Back
        </Link>

        <div style={{ maxWidth: '800px' }}>
          <NotionPage recordMap={recordMap} />
        </div>
      </main>
    </>
  )
}
