import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import useCursor from '../hooks/useCursor'

export default function Contact() {
  const ref = useReveal()
  const { expand, contract } = useCursor()
  const [hovered, setHovered] = useState(false)

  return (
    <section id="contact" style={{ background: '#000', color: '#fff', padding: '60px 20px 5px' }}>
      <div
        ref={ref}
        className="reveal"
        style={{
          fontSize: 'clamp(22px, 4vw, 50px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          maxWidth: 1480,
          margin: '0 auto',
          padding: '0 20px',
        }}
      >
        got a project in mind?<br />
        {"let's talk "}

        <a
          href="mailto:hello@yanxinzhang.com"
          onMouseEnter={() => { setHovered(true); expand() }}
          onMouseLeave={() => { setHovered(false); contract() }}
          style={{
            color: hovered ? '#ffe815' : '#fe3c01',
            borderBottom: `2px solid ${hovered ? '#ffe815' : '#fe3c01'}`,
            transition: 'color .2s, border-color .2s',
          }}
        >
          hello@yanxinzhang.com
        </a>

      </div>
    </section>
  )
}