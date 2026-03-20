import { LOGO_STRIP } from '../data/clients'

const LOGOS = [...LOGO_STRIP, ...LOGO_STRIP]

export default function LogoTicker() {
  return (
    <div style={{
      overflow: 'hidden',
      WebkitMask: 'linear-gradient(90deg,#0000 3%,#000 25% 75%,#0000 97%)',
      mask: 'linear-gradient(90deg,#0000 3%,#000 25% 75%,#0000 97%)',
      paddingBottom: 50,
    }}>
      <div style={{
        display: 'flex', gap: 60, alignItems: 'center',
        width: 'max-content',
        animation: 'ticker 30s linear infinite',
      }}>
        {LOGOS.map((src, i) => (
          <img
            key={i} src={src} alt=""
            style={{
              width: 180, height: 70,
              objectFit: 'contain', flexShrink: 0,
              filter: 'brightness(0) invert(1)',
              opacity: 0.85,
            }}
          />
        ))}
      </div>
    </div>
  )
}