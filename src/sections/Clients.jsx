import ClientCard from '../components/ClientCard'
import LogoTicker from '../components/LogoTicker'
import useReveal from '../hooks/useReveal'
import { CLIENT_CARDS } from '../data/clients'

export default function Clients() {
  const headRef = useReveal()

  return (
    <section id="clients" style={{ background: '#000', color: '#fff', padding: '180px 0 0' }}>
      <div ref={headRef} className="reveal" style={{ padding: '0 24px', maxWidth: 870 }}>
        <div style={{
          fontSize: 'clamp(48px, 12vw, 166px)',
          fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1,
          color: '#fff', mixBlendMode: 'difference',
        }}>
          clients<span style={{ color: '#fe3c01' }}>*</span>
        </div>
        <div style={{
          fontSize: 13, fontWeight: 500, maxWidth: 540,
          marginTop: 20, paddingLeft: 'clamp(0px, 14vw, 200px)', color: '#fff',
        }}>
          <span style={{ fontWeight: 900, color: '#fe3c01' }}>*</span>
          {' '}Teams, brands and people who trusted the process.
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 24, padding: '60px 35px',
        overflowX: 'auto', scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none',
      }}>
        {CLIENT_CARDS.map((c) => <ClientCard key={c.id} client={c} />)}
      </div>

      <LogoTicker />
    </section>
  )
}