'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = nameRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(30px)'
    setTimeout(() => {
      el.style.transition = 'opacity 1s ease, transform 1s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, 100)
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1px 1fr',
      borderBottom: '1px solid var(--rule)',
      marginTop: '56px',
    }}>
      {/* Left */}
      <div style={{
        padding: '5rem 4rem 5rem 3.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div style={{
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          fontFamily: 'var(--sans)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          Selected Works
          <span style={{ flex: 1, maxWidth: '3rem', height: '1px', background: 'var(--rule)', display: 'block' }} />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 0' }}>
          <div style={{
            fontFamily: 'var(--serif-sc)',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            color: 'var(--accent)',
            marginBottom: '1.5rem',
          }}>
            UI · UX · PRODUCT DESIGN
          </div>

          <h1 ref={nameRef} style={{
            fontFamily: 'var(--serif)',
            fontWeight: 300,
            fontSize: 'clamp(4rem, 8vw, 7.5rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
          }}>
            Shih-Min
            <span style={{
              display: 'block',
              borderTop: '1px solid var(--rule)',
              margin: '0.6rem 0',
            }} />
            <span style={{ fontStyle: 'italic' }}>Chen</span>
          </h1>

          <p style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: '1.25rem',
            color: 'var(--muted)',
            marginBottom: '1.5rem',
          }}>
            UI/UX Designer
          </p>

          <p style={{
            fontSize: '0.8rem',
            lineHeight: 1.9,
            color: 'var(--muted)',
            maxWidth: '380px',
          }}>
            Designing thoughtful digital experiences that connect people and products.
          </p>
        </div>

        <a href="#work" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          fontFamily: 'var(--sans)',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
        >
          <span style={{
            width: '28px', height: '28px',
            border: '1px solid var(--rule)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>↓</span>
          View Work
        </a>
      </div>

      {/* Divider */}
      <div style={{ background: 'var(--rule)' }} />

      {/* Right — decorative large type */}
      <div style={{
        padding: '5rem 3.5rem 5rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          bottom: '-1rem',
          right: '-2rem',
          fontFamily: 'var(--serif)',
          fontStyle: 'italic',
          fontSize: '22vw',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1px var(--rule)',
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}>
          Work
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'var(--serif-sc)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'var(--muted)',
            marginBottom: '1rem',
          }}>
            Based in Taiwan
          </div>
          <a
            href="https://www.linkedin.com/in/shih-min-chen/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontSize: '1rem',
              color: 'var(--muted)',
              borderBottom: '1px solid var(--rule)',
              paddingBottom: '0.25rem',
              transition: 'color 0.2s, borderColor 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            LinkedIn →
          </a>
        </div>
      </div>
    </section>
  )
}
