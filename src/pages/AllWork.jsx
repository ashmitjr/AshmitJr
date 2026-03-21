import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'
import useCursor from '../hooks/useCursor'
import PROJECTS from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

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
  const rowRef = useRef(null)
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
        delay: index * 0.08,
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
    setHovered(true); expand()
    if (titleRef.current) gsap.to(titleRef.current, { x: 14, duration: 0.4, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    setHovered(false); contract()
    if (thumbRef.current) gsap.to(thumbRef.current, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' })
    if (titleRef.current) gsap.to(titleRef.current, { x: 0, duration: 0.4, ease: 'power2.out' })
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
        transition: 'background .3s', position: 'relative', flexWrap: 'wrap', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', bottom: 0, left: 0, height: 2,
        width: hovered ? '100%' : '0%', background: '#fe3c01',
        transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }} />

      <div style={{
        flex: '0 0 clamp(240px,55%,55%)', borderRadius: 16,
        overflow: 'hidden', background: '#111', aspectRatio: '16/9', position: 'relative',
      }}>
        <div ref={thumbRef} style={{ width: '100%', height: '100%' }}>
          <img src={project.src} alt={project.title} style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 16,
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform .8s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: hovered ? 'brightness(1.1)' : 'brightness(0.75)',
          }} />
        </div>
        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: project.badgeColor, color: badgeTextColor,
          fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 100,
          opacity: hovered ? 1 : 0.9, transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.3s',
        }}>
          {project.badge}
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'stretch' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#666', letterSpacing: 3, marginBottom: 10, textTransform: 'uppercase' }}>
            {project.client}
          </div>
          <div ref={titleRef} style={{ fontSize: 'clamp(22px,3vw,40px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1.5px' }}>
            {project.title}
          </div>
          <div style={{ fontSize: 14, color: '#888', marginTop: 10, lineHeight: 1.6 }}>
            {project.desc}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', marginTop: 30, gap: 12 }}>
          <div style={{ flex: 1 }}>
            {project.tags.split('·').map((t, i) => (
              <span key={i} style={{
                display: 'inline-block', marginRight: 6, marginBottom: 6, padding: '3px 10px',
                border: `1px solid ${hovered ? '#444' : '#222'}`, borderRadius: 100,
                fontSize: 11, fontWeight: 500, color: '#666', transition: 'border-color 0.3s',
              }}>
                {t.trim()}
              </span>
            ))}
          </div>

          <div style={{
            width: hovered ? 120 : 44, height: 44, borderRadius: hovered ? 22 : '50%',
            background: hovered ? '#fe3c01' : '#000',
            display: 'flex', alignItems: 'center', justifyContent: hovered ? 'space-between' : 'center',
            flexShrink: 0, padding: hovered ? '0 14px' : '0',
            transition: 'all .4s cubic-bezier(0.34, 1.56, 0.64, 1)', overflow: 'hidden',
          }}>
            {hovered && (
              <span style={{ fontSize: 10, fontWeight: 800, color: '#fff', letterSpacing: 1.5, textTransform: 'uppercase', animation: 'slideIn 0.25s ease forwards' }}>
                Visit
              </span>
            )}
            <ArrowIcon hovered={hovered} />
          </div>
        </div>

        <a
          href={project.github} target="_blank" rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            marginTop: 14, fontSize: 10, color: hovered ? '#fe3c01' : '#444',
            textDecoration: 'none', letterSpacing: 2.5, textTransform: 'uppercase',
            fontWeight: 700, transition: 'color 0.3s',
          }}
        >
          ↗ Source Code
        </a>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </a>
  )
}

export default function AllWork() {
  const navigate = useNavigate()
  const headingRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const el = headingRef.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    )
    return () => ScrollTrigger.killAll()
  }, [])

  const divider = (
    <div style={{ height: 1, background: '#e0e0e0', margin: '0 clamp(16px,7vw,100px)' }} />
  )

  return (
    <section style={{ background: '#fff', paddingTop: 80, paddingBottom: 120 }}>

      {/* Back button */}
      <div style={{ padding: '0 clamp(16px,7vw,100px)', marginBottom: 40 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 11, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: '#999',
            display: 'flex', alignItems: 'center', gap: 8,
            padding: 0, transition: 'color 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#000'}
          onMouseLeave={e => e.currentTarget.style.color = '#999'}
        >
          ← Back
        </button>
      </div>

      {/* Heading */}
      <div ref={headingRef} style={{
        padding: '0 clamp(16px,7vw,100px)',
        maxWidth: 1480, margin: '0 auto 60px',
        opacity: 0,
      }}>
        <h1 style={{
          fontSize: 'clamp(48px,12vw,166px)',
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: '#000',
          margin: 0,
        }}>
          all work<span style={{ color: '#fe3c01' }}>*</span>
        </h1>
        <p style={{ fontSize: 13, fontWeight: 500, maxWidth: 540, marginTop: 24, color: '#666' }}>
          <span style={{ fontWeight: 900, color: '#fe3c01' }}>*</span>
          {' '}Every product, challenge, and experiment. Built end-to-end.
        </p>
      </div>

      {/* All projects */}
      <div style={{ maxWidth: 1480, margin: '0 auto' }}>
        {PROJECTS.map((project, index) => (
          <div key={project.id}>
            {divider}
            <ProjectRow project={project} index={index} />
          </div>
        ))}
        {divider}
      </div>
    </section>
  )
}