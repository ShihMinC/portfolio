'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: '56px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 3.5rem',
      background: 'var(--cream)',
      borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
      transition: 'border-color 0.3s',
    }}>
      <Link href="/" style={{
        fontFamily: 'var(--serif-sc)',
        fontSize: '0.9rem',
        letterSpacing: '0.2em',
        color: 'var(--ink)',
      }}>
        Shih-Min Chen
      </Link>

      <span style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'var(--serif)',
        fontStyle: 'italic',
        fontSize: '0.75rem',
        color: 'var(--muted)',
      }}>
        UI/UX Designer
      </span>

      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {['Work', 'About', 'Contact'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} style={{
            fontSize: '0.62rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            transition: 'color 0.2s',
            fontFamily: 'var(--sans)',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  )
}
