import { useState, useEffect, useRef } from 'react'
import RevealWord from '../components/RevealWord'
import ABOUT_WORDS from '../data/about'

export default function About() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="about" style={{
      background: '#fff',
      padding: 'clamp(60px, 10vw, 120px) 40px 100px',
      display: 'flex', justifyContent: 'center',
    }}>
      <div style={{ maxWidth: 1200, width: '100%' }}>
        <p ref={ref} style={{
          fontSize: 'clamp(20px, 3vw, 36px)',
          fontWeight: 400, lineHeight: 1.25, color: '#000',
        }}>
          {ABOUT_WORDS.map((word, i) => (
            <RevealWord key={i} word={word} delayIndex={i} visible={visible} />
          ))}
        </p>
      </div>
    </section>
  )
}