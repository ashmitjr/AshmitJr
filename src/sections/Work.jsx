import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useCursor from '../hooks/useCursor'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: 1,
    title: 'KyrenOS',
    client: 'Personal Product',
    href: 'https://kyrenos.vercel.app',
    github: 'https://github.com/ashmitjr/KyrenOS',
    src: 'https://iili.io/qejuB9a.png',
    tags: 'React · GSAP · Framer Motion · Tailwind',
    desc: 'A browser-based OS. Built just to see if I could.',
    badge: '#1 on Google Search',
    badgeColor: '#00ff88',
  },
  {
    id: 2,
    title: 'BrutalTalks',
    client: 'Personal Product',
    href: 'https://brutaltalks.tech',
    github: 'https://github.com/ashmitjr/Brutaltalks',
    src: 'https://iili.io/qejE2YQ.png',
    tags: 'WebRTC · TypeScript · Node.js · WebSockets',
    desc: 'P2P video chat. No accounts. No data. No trace.',
    badge: 'Live WebRTC Product',
    badgeColor: '#ff2255',
  },
  {
    id: 3,
    title: 'Sofa.AI',
    client: 'Frontend Challenge',
    href: 'https://sofaai-ashmitjr.vercel.app',
    github: 'https://github.com/ashmitjr/Sofa-AI',
    src: 'https://iili.io/qejRrua.png',
    tags: 'React · GSAP ScrollTrigger · Framer Motion',
    desc: 'Rebuilt a Framer template pixel perfect in React.',
    badge: 'Pixel Perfect',
    badgeColor: '#ffffff',
  },
  {
    id: 4,
    title: 'CinemaTrial',
    client: 'Fullstack Product',
    href: 'https://cinema-hall-neon.vercel.app',
    github: 'https://github.com/ashmitjr/CinemaHall',
    src: 'https://iili.io/qej0zog.png',
    tags: 'React · PostgreSQL · Drizzle ORM · JWT · Redux',
    desc: 'Full stack movie discovery platform. Built for a selection task.',
    badge: 'Top 3 / 73',
    badgeColor: '#ffaa00',
  },
]

const ArrowIcon = ({ hovered }) => (
  <svg
    width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{
      transform: hovered ? 'rotate(45deg) scale(1.2)' : 'rotate(0deg) scale(1)',
      transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    }}
  >
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
)

function ProjectRow({ project, index }) {
  const rowRef   = useRef(null)
  const thumbRef = useRef(null)
  const titleRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const { expand, contract } = useCursor()

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, y: 80, skewY: 2 },
      {
        opacity: 1, y: 0, skewY: 0,
        duration: 1, ease: 'power4.out',
        delay: index * 0.1,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      }
    )
  }, [])

  const handleMouseMove = (e) => {
    const rect = rowRef.current?.getBoundingClientRect()
    if (!rect || !thumbRef.current) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14
    gsap.to(thumbRef.current, { x, y, duration: 0.5, ease: 'power2.out' })
  }

  const handleMouseEnter = () => {
    setHovered(true)
    expand()
    if (titleRef.current)
      gsap.to(titleRef.current, { x: 14, duration: 0.4, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    contract()
    if (thumbRef.current)
      gsap.to(thumbRef.current, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' })
    if (titleRef.current)
      gsap.to(titleRef.current, { x: 0, duration: 0.4, ease: 'power2.out' })
  }

  const handleSourceClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (project.github) window.open(project.github, '_blank', 'noopener noreferrer')
  }

  const badgeTextColor = ['#ffffff', '#ffaa00', '#00ff88'].includes(project.badgeColor) ? '#000' : '#fff'

  return (
    <a
      ref={rowRef}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 25,
        padding: 'clamp(16px,3vw,30px) clamp(16px,7vw,100px) clamp(12px,2vw,15px)',
        textDecoration: 'none', color: 'inherit',
        background: hovered ? 'rgba(254,60,1,0.015)' : 'transparent',
        transition: 'background .3s',
        position: 'relative', flexWrap: 'wrap', overflow: 'hidden',
      }}
    >
      {/* bottom line animation */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, height: 2,
        width: hovered ? '100%' : '0%', background: '#fe3c01',
        transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }} />

      {/* Thumbnail */}
      <div style={{
        flex: '0 0 clamp(240px,55%,55%)', borderRadius: 16,
        overflow: 'hidden', background: '#111', aspectRatio: '16/9', position: 'relative',
      }}>
        <div ref={thumbRef} style={{ width: '100%', height: '100%' }}>
          <img
            src={project.src} alt={project.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              borderRadius: 16,
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform .8s cubic-bezier(0.4, 0, 0.2, 1)',
              filter: hovered ? 'brightness(1.1)' : 'brightness(0.75)',
            }}
          />
        </div>
        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: project.badgeColor,
          color: badgeTextColor,
          fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 100,
          letterSpacing: '0.5px',
          opacity: hovered ? 1 : 0.9,
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.3s',
        }}>
          {project.badge}
        </div>
      </div>

      {/* Info */}
      <div style={{
        flex: 1, minWidth: 160, display: 'flex',
        flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'stretch',
      }}>
        <div>
          <div style={{
            fontSize: 10, fontWeight: 700, color: '#666',
            letterSpacing: 3, marginBottom: 10, textTransform: 'uppercase',
          }}>
            {project.client}
          </div>
          <div ref={titleRef} style={{
            fontSize: 'clamp(22px,3vw,40px)', fontWeight: 700,
            lineHeight: 1.1, letterSpacing: '-1.5px',
          }}>
            {project.title}
          </div>
          <div style={{ fontSize: 14, color: '#888', marginTop: 10, lineHeight: 1.6 }}>
            {project.desc}
          </div>
        </div>

        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          width: '100%', marginTop: 30, gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            {project.tags.split('·').map((t, i) => (
              <span key={i} style={{
                display: 'inline-block', marginRight: 6, marginBottom: 6,
                padding: '3px 10px',
                border: `1px solid ${hovered ? '#444' : '#222'}`,
                borderRadius: 100, fontSize: 11, fontWeight: 500, color: '#666',
                transition: 'border-color 0.3s',
              }}>
                {t.trim()}
              </span>
            ))}
          </div>

          <div style={{
            width: hovered ? 120 : 44, height: 44,
            borderRadius: hovered ? 22 : '50%',
            background: hovered ? '#fe3c01' : '#000',
            display: 'flex', alignItems: 'center',
            justifyContent: hovered ? 'space-between' : 'center',
            flexShrink: 0, padding: hovered ? '0 14px' : '0',
            transition: 'all .4s cubic-bezier(0.34, 1.56, 0.64, 1)', overflow: 'hidden',
          }}>
            {hovered && (
              <span style={{
                fontSize: 10, fontWeight: 800, color: '#fff', letterSpacing: 1.5,
                textTransform: 'uppercase', animation: 'slideIn 0.25s ease forwards',
              }}>
                Visit
              </span>
            )}
            <ArrowIcon hovered={hovered} />
          </div>
        </div>

        <span
          onClick={handleSourceClick}
          style={{
            marginTop: 14, fontSize: 10,
            color: hovered ? '#fe3c01' : '#444',
            letterSpacing: 2.5, textTransform: 'uppercase',
            fontWeight: 700, transition: 'color 0.3s',
            cursor: 'pointer', display: 'inline-block',
          }}
        >
          ↗ Source Code
        </span>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </a>
  )
}

function Ticker() {
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div style={{
        display: 'flex', animation: 'workTicker 18s linear infinite', width: 'max-content',
      }}>
        {[...Array(6)].map((_, i) => (
          <span key={i} style={{
            fontSize: 'clamp(48px,12vw,166px)', fontWeight: 600,
            letterSpacing: '-0.04em', lineHeight: 1, color: '#000',
            paddingRight: '0.5em', whiteSpace: 'nowrap',
          }}>
            featured work<span style={{ color: '#fe3c01' }}>*</span>{'   '}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes workTicker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

function ViewAllBtn() {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const { expand, contract } = useCursor()

  const texts = [
    "yes yes there's more →",
    "go on, keep scrolling",
    "you won't regret it",
    "seriously, there's more",
    "ok fine, go see →",
  ]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, y: 65, scale: 0 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: el, start: 'top 95%', once: true },
      }
    )
  }, [])

  useEffect(() => {
    if (!hovered) return
    const interval = setInterval(() => {
      setTextIndex(i => (i + 1) % texts.length)
    }, 700)
    return () => clearInterval(interval)
  }, [hovered])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
      <a
        ref={ref}
        href="https://github.com/ashmitjr"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => { setHovered(true); expand() }}
        onMouseLeave={() => { setHovered(false); setTextIndex(0); contract() }}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          border: `2.5px solid ${hovered ? '#fe3c01' : '#000'}`,
          borderRadius: 100, padding: '0 32px',
          fontSize: 'clamp(15px,1.8vw,20px)', fontWeight: 600, lineHeight: '54px',
          color: hovered ? '#fff' : '#000',
          position: 'relative', overflow: 'hidden',
          transition: 'color .3s, border-color .3s, min-width .5s ease',
          textDecoration: 'none', opacity: 0,
          minWidth: hovered ? 280 : 200,
          letterSpacing: '-0.3px', whiteSpace: 'nowrap',
        }}
      >
        <span style={{
          position: 'absolute', inset: '0 0 auto 0',
          height: hovered ? 200 : 0, background: '#fe3c01', zIndex: -1,
          transition: 'height .35s cubic-bezier(0.4, 0, 0.2, 1)',
        }} />
        <span key={textIndex} style={{ animation: hovered ? 'textFlip 0.25s ease forwards' : 'none' }}>
          {hovered ? texts[textIndex] : 'view all work'}
        </span>
        <style>{`
          @keyframes textFlip {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </a>
    </div>
  )
}

export default function Work() {
  const subRef = useRef(null)

  useEffect(() => {
    const el = subRef.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      }
    )
    return () => ScrollTrigger.killAll()
  }, [])

  const divider = (
    <div style={{ height: 1, background: '#e0e0e0', margin: '0 clamp(16px,7vw,100px)' }} />
  )

  return (
    <section id="work" style={{ background: '#fff', padding: '0 0 80px' }}>
      <Ticker />
      <div ref={subRef} style={{
        padding: 'clamp(20px,2vw,30px) clamp(24px,14vw,200px) 0',
        maxWidth: 1480, margin: '0 auto', opacity: 0,
      }}>
        <p style={{ fontSize: 13, fontWeight: 500, maxWidth: 540 }}>
          <span style={{ fontWeight: 900, color: '#fe3c01' }}>*</span>
          {' '}Real products shipped. Not school assignments.
          Built end-to-end — concept, code, and deployment.
        </p>
      </div>
      <div style={{ maxWidth: 1480, margin: '50px auto 0' }}>
        {PROJECTS.map((project, index) => (
          <div key={project.id}>
            {divider}
            <ProjectRow project={project} index={index} />
          </div>
        ))}
        {divider}
      </div>
      <ViewAllBtn />
    </section>
  )
}