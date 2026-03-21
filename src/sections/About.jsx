import { useState, useEffect, useRef } from 'react'
import RevealWord from '../components/RevealWord'
import ABOUT_WORDS from '../data/about'

// ── index = the word AFTER which the image appears
// "builder"      → index 10  → image at 11
// "experiences." → index 20  → image at 21
// "end-to-end"   → index 23  → image at 24
// "layer,"       → index 34  → image at 35
const INLINE_IMAGES = {
  11: { src: 'https://framerusercontent.com/images/Z0oPD4aqeRrqmX19aQu0j7wCDiA.gif', w: 90, h: 45 },
  21: { src: 'https://framerusercontent.com/images/z7iqm9BwewMwg1PC3K9MnyaC7JE.png', w: 56, h: 45 },
  24: { src: 'https://framerusercontent.com/images/eyywHU5EahGjcyhpTfFeFWC2m20.gif', w: 75, h: 45 },
  35: { src: 'https://framerusercontent.com/images/n3VTfiXUGql3C0TJIFvXgs8Ko.png',   w: 46, h: 45 },
}

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

  const inlineImgStyle = (i) => ({
    display: 'inline-flex',
    alignItems: 'center',
    opacity: visible ? 1 : 0.2,
    filter: visible ? 'blur(0)' : 'blur(8px)',
    transform: visible ? 'translateY(0)' : 'translateY(16px)',
    transition: 'opacity .5s ease, filter .5s ease, transform .5s ease',
    transitionDelay: visible ? `${i * 0.04}s` : '0s',
    zoom: 1.2,
  })

  return (
    <section
      id="about"
      style={{
        background: '#fff',
        padding: 'clamp(60px, 10vw, 120px) 40px 100px',
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
            lineHeight: 1.25,
            color: '#000',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.25em',
          }}
        >
          {ABOUT_WORDS.map((word, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25em' }}>
              <RevealWord word={word} delayIndex={i} visible={visible} />
              {INLINE_IMAGES[i + 1] && (
                <span style={inlineImgStyle(i)}>
                  <img
                    src={INLINE_IMAGES[i + 1].src}
                    alt=""
                    style={{
                      width: INLINE_IMAGES[i + 1].w,
                      height: INLINE_IMAGES[i + 1].h,
                      objectFit: 'cover',
                      display: 'block',
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