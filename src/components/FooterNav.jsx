import useCursor from '../hooks/useCursor'

export default function FooterNav() {
  const { expand, contract } = useCursor()

  const wrapStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '60px', // Standard height for the thin bar
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2vw', // Using vw for responsive spacing
    zIndex: 100,
    mixBlendMode: 'difference', // Keeps it visible over any background
    pointerEvents: 'none', // Allows clicking through the bar itself
  }

  const textStyle = {
    fontSize: '10px', // Original is very small/sharp
    fontWeight: 500,
    color: '#fff',
    textTransform: 'lowercase', // Matches the "yx" aesthetic
    letterSpacing: '0.02em',
    pointerEvents: 'auto', // Re-enables clicking for the links/text
  }

  return (
    <footer style={wrapStyle}>
      {/* Copyright/Name */}
      <div style={textStyle}>
        © 2026 ASHMIT T.
      </div>

      {/* Email - Centered or Second Column */}
      <a 
        href="mailto:ashmit4works@gmail.com" 
        style={{ ...textStyle, textDecoration: 'none' }}
        onMouseEnter={expand}
        onMouseLeave={contract}
      >
        ashmit4works@gmail.com
      </a>

      {/* Phone - Third Column */}
      <div style={textStyle}>
        (+65) 9220 3435
      </div>

      {/* Back to Top */}
      <a
        href="#hero"
        style={{ ...textStyle, textDecoration: 'none' }}
        onMouseEnter={expand}
        onMouseLeave={contract}
      >
        back to top
      </a>
    </footer>
  )
}