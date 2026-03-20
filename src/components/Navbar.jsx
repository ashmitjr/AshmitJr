import { useState } from 'react'
import useCursor from '../hooks/useCursor'

const navStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, height: 64,
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '0 40px', zIndex: 100,
  mixBlendMode: 'difference',
}

const logoStyle = {
  fontSize: 22, fontWeight: 800, color: '#fff',
  textDecoration: 'none', position: 'relative', letterSpacing: 0,
}

const asteriskStyle = {
  fontSize: 14, color: '#fff',
  position: 'absolute', top: 2, left: 26,
  display: 'inline-block', transform: 'rotate(-17deg)',
}

const linksStyle = { display: 'flex', gap: 32 }

export default function Navbar() {
  const { expand, contract } = useCursor()
  const [hovered, setHovered] = useState(null)

  const linkBase = {
    fontSize: 22, fontWeight: 700, color: '#fff',
    textDecoration: 'none', letterSpacing: 0,
    transition: 'color .2s',
  }

  return (
    <nav style={navStyle}>
      <a
        href="#hero"
        style={logoStyle}
        onMouseEnter={expand}
        onMouseLeave={contract}
      >
        yx<span style={asteriskStyle}>✳</span>
      </a>

      <div style={linksStyle}>
        {['work', 'about', 'lab'].map((link) => (
          <a
            key={link}
            href={`#${link === 'about' ? 'about' : link}`}
            style={{ ...linkBase, color: hovered === link ? '#ffe815' : '#fff' }}
            onMouseEnter={() => { setHovered(link); expand() }}
            onMouseLeave={() => { setHovered(null); contract() }}
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  )
}