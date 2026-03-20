import useCursor from '../hooks/useCursor'

export default function FooterNav() {
  const { expand, contract } = useCursor()

  const wrapStyle = {
    position: 'fixed', bottom: 0, left: 0, right: 0, height: 64,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 40px', zIndex: 100,
    mixBlendMode: 'difference',
  }

  const textStyle = {
    fontSize: 11, fontWeight: 500, color: '#fff', lineHeight: 2,
  }

  return (
    <div style={wrapStyle}>
      <div style={textStyle}>
        <span>© 2026 Ashmit T.</span><br />
        <span>ashmit4works@gmail.com</span><br />
        <span>(+65) 9220 3435</span>
      </div>
      <a
        href="#hero"
        style={{ ...textStyle, textDecoration: 'none' }}
        onMouseEnter={expand}
        onMouseLeave={contract}
      >
        back to top ↑
      </a>
    </div>
  )
}