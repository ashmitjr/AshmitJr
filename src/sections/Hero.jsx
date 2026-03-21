import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Desktop positions — direct from Framer source
const DECOS_DESKTOP = [
  {
    src: 'https://framerusercontent.com/images/eworU6xoE2plzVUmMOPx9rIp7pY.jpg',
    style: { width: '22%', bottom: 60, left: 15 },
    objectPosition: 'center',
    delay: 3.6,
  },
  {
    src: 'https://framerusercontent.com/images/nNLGLKBaN3TMBNgUnAFjyxbtQ.jpg',
    style: { width: '17%', top: 60, left: 61 },
    objectPosition: 'center',
    delay: 3.5,
  },
  {
    src: 'https://framerusercontent.com/images/ScU99IyOsTtb1lxML9872VIoxU.jpg',
    style: { width: '23%', top: 65, right: 13 },
    objectPosition: 'center top',
    delay: 4.0,
  },
  {
    src: 'https://framerusercontent.com/images/bssDxEIkplBAwpalnxd7jncvrpA.jpg',
    style: { width: '14%', bottom: 21, right: 104 },
    objectPosition: 'right center',
    delay: 3.9,
  },
  {
    src: 'https://framerusercontent.com/images/KStWazohrKWwui4n8wNsyKNqet0.jpg',
    style: { width: '15%', top: '45%', right: 32 },
    objectPosition: 'center',
    isY: true,
    delay: 3.7,
  },
]

// Tablet positions — scaled down + pulled in
const DECOS_TABLET = [
  {
    src: 'https://framerusercontent.com/images/eworU6xoE2plzVUmMOPx9rIp7pY.jpg',
    style: { width: '27%', bottom: 40, left: 10 },
    objectPosition: 'center',
    delay: 3.6,
  },
  {
    src: 'https://framerusercontent.com/images/nNLGLKBaN3TMBNgUnAFjyxbtQ.jpg',
    style: { width: '22%', top: 50, left: 30 },
    objectPosition: 'center',
    delay: 3.5,
  },
  {
    src: 'https://framerusercontent.com/images/ScU99IyOsTtb1lxML9872VIoxU.jpg',
    style: { width: '26%', top: 50, right: 10 },
    objectPosition: 'center top',
    delay: 4.0,
  },
  {
    src: 'https://framerusercontent.com/images/bssDxEIkplBAwpalnxd7jncvrpA.jpg',
    style: { width: '19%', bottom: 40, right: 50 },
    objectPosition: 'right center',
    delay: 3.9,
  },
  {
    src: 'https://framerusercontent.com/images/KStWazohrKWwui4n8wNsyKNqet0.jpg',
    style: { width: '18%', top: '45%', right: 10 },
    objectPosition: 'center',
    isY: true,
    delay: 3.7,
  },
]

// Mobile — only 2 decos, small corners
const DECOS_MOBILE = [
  {
    src: 'https://framerusercontent.com/images/nNLGLKBaN3TMBNgUnAFjyxbtQ.jpg',
    style: { width: '32%', top: 80, left: 0 },
    objectPosition: 'center',
    delay: 3.5,
  },
  {
    src: 'https://framerusercontent.com/images/ScU99IyOsTtb1lxML9872VIoxU.jpg',
    style: { width: '32%', bottom: 80, right: 0 },
    objectPosition: 'center top',
    delay: 3.7,
  },
]

export default function Hero() {
  const videoRef   = useRef(null)
  const sectionRef = useRef(null)
  const decoRefs   = useRef([])
  const [bp, setBp] = useState('desktop') // 'desktop' | 'tablet' | 'mobile'

  // detect breakpoint
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth
      if (w < 600)       setBp('mobile')
      else if (w < 1024) setBp('tablet')
      else               setBp('desktop')
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const DECOS = bp === 'mobile' ? DECOS_MOBILE
              : bp === 'tablet' ? DECOS_TABLET
              : DECOS_DESKTOP

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // play once, pause on last frame
    video.loop = false
    const onEnd = () => video.pause()
    video.addEventListener('ended', onEnd)

    // kill any previous animations
    ScrollTrigger.killAll()
    gsap.killTweensOf(video)
    decoRefs.current.forEach(el => el && gsap.killTweensOf(el))

    // video fades in
    gsap.fromTo(video,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
    )

    // decos pop in
    decoRefs.current.forEach((el, i) => {
      if (!el || !DECOS[i]) return
      gsap.fromTo(el,
        { opacity: 0, scale: 0, y: DECOS[i].isY ? '-50%' : 0 },
        {
          opacity: 1, scale: 1,
          y: DECOS[i].isY ? '-50%' : 0,
          duration: 0.5,
          delay: DECOS[i].delay,
          ease: "back.out(1.7)",
        }
      )
    })

    // video shrinks on scroll
    gsap.to(video, {
      scale: bp === 'mobile' ? 0.85 : 0.75,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })

    return () => {
      video.removeEventListener('ended', onEnd)
      ScrollTrigger.killAll()
    }
  }, [bp])

  // video dimensions per breakpoint
  const videoSize = {
    desktop: { width: '90%', maxWidth: 1100, height: '90vh' },
    tablet:  { width: '90%', maxWidth: 800,  height: '80vh' },
    mobile:  { width: '95%', maxWidth: '100%', height: '60vh' },
  }[bp]

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero — YanXin Zhang"
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

      {/* ── VIDEO ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        style={{
          ...videoSize,
          objectFit: 'contain',
          objectPosition: '50% 50%',
          backgroundColor: 'transparent',
          display: 'block',
          opacity: 0,
          position: 'relative',
          zIndex: 1,
          transformOrigin: 'center center',
        }}
      >
        <source src="https://framerusercontent.com/assets/gBnGPgPfxrpMohWVGu5AhJomPc.mp4" type="video/mp4" />
      </video>

      {/* ── DECO IMAGES ── */}
      {DECOS.map((d, i) => (
        <div
          key={`${bp}-${i}`}
          ref={el => decoRefs.current[i] = el}
          style={{
            position: 'absolute',
            opacity: 0,
            transform: d.isY ? 'translateY(-50%) scale(0)' : 'scale(0)',
            transformOrigin: 'center center',
            zIndex: 2,
            ...d.style,
          }}
        >
          <img
            src={d.src}
            alt=""
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: d.objectPosition,
              display: 'block',
            }}
          />
        </div>
      ))}

    </section>
  )
}