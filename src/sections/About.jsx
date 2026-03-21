import { useState, useEffect, useRef } from 'react'
import RevealWord from '../components/RevealWord'
import ABOUT_WORDS from '../data/about'

const INLINE_IMAGES = {
  11: { src: 'https://framerusercontent.com/images/Z0oPD4aqeRrqmX19aQu0j7wCDiA.gif', aspect: 90 / 45 },
  21: { src: 'https://framerusercontent.com/images/z7iqm9BwewMwg1PC3K9MnyaC7JE.png', aspect: 56 / 45 },
  24: { src: 'https://framerusercontent.com/images/eyywHU5EahGjcyhpTfFeFWC2m20.gif', aspect: 75 / 45 },
  35: { src: 'https://framerusercontent.com/images/n3VTfiXUGql3C0TJIFvXgs8Ko.png',   aspect: 46 / 45 },
}

export default function About() {
  const [visible, setVisible] = useState(false)
  const [fontSize, setFontSize] = useState(36)
  const ref = useRef(null)

  // track actual font size so images scale with text
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 480)       setFontSize(20)
      else if (w < 768)  setFontSize(24)
      else if (w < 1024) setFontSize(28)
      else               setFontSize(36)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // intersection observer
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const imgHeight = fontSize * 1.25   // scales with font
  const inlineImgStyle = (i) => ({
    display: 'inline-flex',
    alignItems: 'center',
    verticalAlign: 'middle',
    flexShrink: 0,
    opacity: visible ? 1 : 0.2,
    filter: visible ? 'blur(0)' : 'blur(8px)',
    transform: visible ? 'translateY(0)' : 'translateY(16px)',
    transition: 'opacity .5s ease, filter .5s ease, transform .5s ease',
    transitionDelay: visible ? `${i * 0.04}s` : '0s',
  })

  return (
    <section
      id="about"
      style={{
        background: '#fff',
        padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 40px) clamp(60px, 8vw, 100px)',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: 1200, width: '100%' }}>
        <p
          ref={ref}
          style={{
            fontSize: 'clamp(20px, 3vw, 36px)',
            fontWeight: 400,
            lineHeight: 1.3,
            color: '#000',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.3em',
            margin: 0,
          }}
        >
          {ABOUT_WORDS.map((word, i) => (
            <span
              key={i}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3em' }}
            >
              <RevealWord word={word} delayIndex={i} visible={visible} />

              {INLINE_IMAGES[i + 1] && (
                <span style={inlineImgStyle(i)}>
                  <img
                    src={INLINE_IMAGES[i + 1].src}
                    alt=""
                    style={{
                      height: imgHeight,
                      width: imgHeight * INLINE_IMAGES[i + 1].aspect,
                      objectFit: 'cover',
                      display: 'block',
                      borderRadius: 4,
                    }}
                  />
                </span>
              )}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}