import { useState, useEffect } from 'react'
import useCursor from '../hooks/useCursor'

export default function Navbar() {
  const { expand, contract } = useCursor()
  const [hovered, setHovered] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false) // Toggle for mobile menu

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) setIsOpen(false) // Close menu if screen scales up
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0,
    height: isMobile ? 60 : 64,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: isMobile ? '0 20px' : '0 40px',
    zIndex: 100,
    mixBlendMode: isOpen ? 'normal' : 'difference', // Switch blend mode when menu is open
  }

  const menuOverlayStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
    background: '#000', // Solid black for the mobile menu
    display: isOpen ? 'flex' : 'none',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    zIndex: 99,
  }

  const burgerButtonStyle = {
    background: 'none', border: 'none', cursor: 'pointer',
    display: isMobile ? 'flex' : 'none',
    flexDirection: 'column', gap: 6, padding: 10, zIndex: 101
  }

  const lineStyle = {
    width: 24, height: 2, background: '#fff',
    transition: '0.3s'
  }

  return (
    <>
      <nav style={navStyle}>
        <a href="#hero" style={{ fontSize: 22, fontWeight: 800, color: '#fff', textDecoration: 'none' }}>
          Ashmit<span style={{ fontSize: 14, marginLeft: 4 }}>✳</span>
        </a>

        {/* Desktop Links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: 32 }}>
            {['work', 'about', 'lab'].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                style={{ fontSize: 22, fontWeight: 700, color: hovered === link ? '#ffe815' : '#fff', textDecoration: 'none', transition: '.2s' }}
                onMouseEnter={() => { setHovered(link); expand() }}
                onMouseLeave={() => { setHovered(null); contract() }}
              >
                {link}
              </a>
            ))}
          </div>
        )}

        {/* Mobile Toggle Button */}
        <button style={burgerButtonStyle} onClick={() => setIsOpen(!isOpen)}>
          <div style={{ ...lineStyle, transform: isOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }} />
          <div style={{ ...lineStyle, opacity: isOpen ? 0 : 1 }} />
          <div style={{ ...lineStyle, transform: isOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }} />
        </button>
      </nav>

      {/* Fullscreen Mobile Menu */}
      <div style={menuOverlayStyle}>
        {['work', 'about', 'lab'].map((link) => (
          <a
            key={link}
            href={`#${link}`}
            onClick={() => setIsOpen(false)}
            style={{ fontSize: 42, fontWeight: 800, color: '#fff', textDecoration: 'none' }}
          >
            {link}
          </a>
        ))}
      </div>
    </>
  )
}