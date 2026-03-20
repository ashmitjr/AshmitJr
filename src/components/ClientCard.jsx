import { useState } from 'react'
import useCursor from '../hooks/useCursor'

export default function ClientCard({ client }) {
  const [hovered, setHovered] = useState(false)
  const { expand, contract } = useCursor()

  const mediaStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: hovered ? 'brightness(0.9)' : 'brightness(0.65)',
    transition: 'filter .4s ease',
  }

  return (
    <a
      href={client.href}
      onMouseEnter={() => { setHovered(true); expand() }}
      onMouseLeave={() => { setHovered(false); contract() }}
      style={{
        flexShrink: 0,
        width: 320,
        height: 215,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        scrollSnapAlign: 'start',
        display: 'block',
        textDecoration: 'none',
      }}
    >
      {client.type === 'video' ? (
        <video
          src={client.bg}
          poster={client.poster}
          autoPlay
          muted
          loop
          playsInline
          style={mediaStyle}
        />
      ) : (
        <img
          src={client.bg}
          alt={client.name}
          style={mediaStyle}
        />
      )}

      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img
          src={client.logo}
          alt={client.name}
          style={{ width: 110, height: 'auto', objectFit: 'contain' }}
        />
      </div>
    </a>
  )
}