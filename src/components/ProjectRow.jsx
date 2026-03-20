import { useState } from 'react'
import useCursor from '../hooks/useCursor'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
)

export default function ProjectRow({ project }) {
  const [hovered, setHovered] = useState(false)
  const { expand, contract } = useCursor()

  return (
    <a
      href={project.href}
      className="reveal"
      onMouseEnter={() => { setHovered(true); expand() }}
      onMouseLeave={() => { setHovered(false); contract() }}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 25,
        padding: '30px clamp(16px, 7vw, 100px) 15px',
        color: 'inherit',
        position: 'relative',
        background: hovered ? 'rgba(0,0,0,.02)' : 'transparent',
        transition: 'background .2s',
        textDecoration: 'none',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        width: '60%',
        borderRadius: 20,
        overflow: 'hidden',
        background: '#e0e0e0',
        aspectRatio: '5/3',
        flexShrink: 0,
      }}>
        {project.type === 'video' ? (
          <video
            src={project.src}
            poster={project.poster}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 20,
              transform: hovered ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform .6s ease',
            }}
          />
        ) : (
          <img
            src={project.src}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 20,
              transform: hovered ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform .6s ease',
            }}
          />
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 600, lineHeight: 1 }}>{project.title}</div>
          <div style={{ fontSize: 13, fontWeight: 500, marginTop: 5 }}>{project.client}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#ababab', paddingTop: 20 }}>{project.tags}</div>
          <div style={{
            width: hovered ? 94 : 40,
            height: 40,
            borderRadius: hovered ? 20 : '50%',
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: 'auto',
            transition: 'width .3s ease, border-radius .3s ease',
          }}>
            <Arrow />
          </div>
        </div>
      </div>

      {/* Case Study tag */}
      {project.caseStudy && (
        <span style={{
          position: 'absolute',
          top: 49,
          left: 120,
          background: '#fe3c01',
          color: '#fff',
          fontSize: 13,
          fontWeight: 500,
          padding: '12px 10px',
          borderRadius: 20,
          opacity: 0.8,
        }}>
          Case Study
        </span>
      )}
    </a>
  )
}