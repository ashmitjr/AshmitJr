import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const DECOS = [
  { src: 'https://framerusercontent.com/images/eworU6xoE2plzVUmMOPx9rIp7pY.jpg', style: { width: '22%', bottom: 60, left: 15 }, delay: 3.6 },
  { src: 'https://framerusercontent.com/images/nNLGLKBaN3TMBNgUnAFjyxbtQ.jpg', style: { width: '17%', top: 60, left: 61 }, delay: 3.5 },
  { src: 'https://framerusercontent.com/images/ScU99IyOsTtb1lxML9872VIoxU.jpg', style: { width: '23%', top: 65, right: 13 }, delay: 4.0 },
  { src: 'https://framerusercontent.com/images/bssDxEIkplBAwpalnxd7jncvrpA.jpg', style: { width: '14%', bottom: 21, right: 104 }, delay: 3.9 },
  { src: 'https://framerusercontent.com/images/KStWazohrKWwui4n8wNsyKNqet0.jpg', style: { width: '15%', top: '45%', right: 32 }, delay: 3.7, isY: true },
]

export default function Hero() {
  const videoRef = useRef(null)
  const decoRefs = useRef([])

  useEffect(() => {
    const tl = gsap.timeline()

    // 🎬 Video fade in
    tl.to(videoRef.current, {
      opacity: 1,
      duration: 1,
      delay: 0.3,
      ease: "power2.out"
    })

    // ✨ Deco animations (individual timing like original)
    decoRefs.current.forEach((el, i) => {
      const d = DECOS[i]

      gsap.to(el, {
        opacity: 1,
        scale: 1,
        y: d.isY ? 0 : undefined,
        duration: 0.5,
        delay: d.delay,
        ease: "back.out(1.7)"
      })
    })

  }, [])

  return (
    <section
      id="hero"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        overflow: 'hidden',
        position: 'relative',
      }}
    >

      {/* 🎥 VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="https://framerusercontent.com/images/jOQ3WSvHY482zYegmuEP1iYjc.gif"
        style={{
          width: '90vw',
          maxWidth: 1200,
          height: '85vh',
          objectFit: 'contain',
          opacity: 0,
        }}
      >
        <source src="https://framerusercontent.com/assets/gBnGPgPfxrpMohWVGu5AhJomPc.mp4" />
      </video>

      {/* 🎨 DECOR ELEMENTS */}
      {DECOS.map((d, i) => (
        <div
          key={i}
          ref={el => decoRefs.current[i] = el}
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            mixBlendMode: 'multiply',
            opacity: 0,
            transform: d.isY ? 'translateY(-50%) scale(0)' : 'scale(0)',
            ...d.style,
          }}
        >
          <img
            src={d.src}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      ))}

    </section>
  )
}