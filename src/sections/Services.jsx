import ServiceCol from '../components/ServiceCol'
import useReveal from '../hooks/useReveal'
import SERVICES from '../data/services'

export default function Services() {
  const headRef = useReveal()

  return (
    <section id="services" style={{ background: '#ff6200', padding: '120px 0 0' }}>
      <div ref={headRef} className="reveal" style={{ padding: '0 35px 50px', maxWidth: 1480 }}>
        <div style={{
          fontSize: 'clamp(48px, 12vw, 166px)',
          fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1, color: '#000',
        }}>
          what i do<span style={{ color: '#0b1dff' }}>*</span>
        </div>
        <div style={{
          fontSize: 13, fontWeight: 500, maxWidth: 430,
          marginTop: 16, paddingLeft: 'clamp(0px, 14vw, 200px)', color: '#000',
        }}>
          <span style={{ fontWeight: 900, color: '#0b1dff' }}>*</span>
          {' '}I approach design through brand strategy and experience storytelling,
          using visuals, motion, and interaction to create work that is not only
          visually strong but also purposeful and narrative-driven.
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 'clamp(24px, 6vw, 80px)', flexWrap: 'wrap',
        padding: '0 clamp(24px, 4vw, 60px) 100px clamp(24px, 16vw, 235px)',
        maxWidth: 1480,
      }}>
        {SERVICES.map((s) => <ServiceCol key={s.id} service={s} />)}
      </div>
    </section>
  )
}