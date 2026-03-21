export default function Footer() {
  return (
    <footer id="footer" style={{
      background: '#000', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '100px 24px', overflow: 'hidden',
    }}>
      <div style={{
        fontSize: 'clamp(60px, 18vw, 200px)',
        fontWeight: 900, lineHeight: 0.9,
        textAlign: 'center', letterSpacing: '-0.02em',
        userSelect: 'none',
      }}>
        Ashmit*<br />/26
      </div>
    </footer>
  )
}