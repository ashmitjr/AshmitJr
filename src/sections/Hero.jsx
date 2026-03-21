import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// exact positions from the Framer CSS
const DECOS = [
  {
    // KeycapArt — bottom left
    src: 'https://framerusercontent.com/images/eworU6xoE2plzVUmMOPx9rIp7pY.jpg',
    style: { width: '22%', bottom: 60, left: 15 },
    objectPosition: 'center',
    delay: 3.6,
  },
  {
    // BlueArt — top left
    src: 'https://framerusercontent.com/images/nNLGLKBaN3TMBNgUnAFjyxbtQ.jpg',
    style: { width: '17%', top: 60, left: 61 },
    objectPosition: 'center',
    delay: 3.5,
  },
  {
    // LogoArt — top right
    src: 'https://framerusercontent.com/images/ScU99IyOsTtb1lxML9872VIoxU.jpg',
    style: { width: '23%', top: 65, right: 13 },
    objectPosition: 'center top',
    delay: 4.0,
  },
  {
    // CoffeeArt — bottom right
    src: 'https://framerusercontent.com/images/bssDxEIkplBAwpalnxd7jncvrpA.jpg',
    style: { width: '14%', bottom: 21, right: 104 },
    objectPosition: 'right center',
    delay: 3.9,
  },
  {
    // ModuleArt — mid right
    src: 'https://framerusercontent.com/images/KStWazohrKWwui4n8wNsyKNqet0.jpg',
    style: { width: '15%', top: '45%', right: 32 },
    objectPosition: 'center',
    isY: true,
    delay: 3.7,
  },
]

export default function Hero() {
  const videoRef   = useRef(null)
  const sectionRef = useRef(null)
  const decoRefs   = useRef([])

  useEffect(() => {
    const video = videoRef.current

    // play once then pause on last frame
    video.loop = false
    video.addEventListener('ended', () => video.pause())

    // video fades in
    gsap.fromTo(video,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
    )

    // decos pop in with stagger
    decoRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(el,
        {
          opacity: 0,
          scale: 0,
          y: DECOS[i].isY ? '-50%' : 0,
        },
        {
          opacity: 1,
          scale: 1,
          y: DECOS[i].isY ? '-50%' : 0,
          duration: 0.5,
          delay: DECOS[i].delay,
          ease: "back.out(1.7)",
        }
      )
    })

    // video shrinks on scroll
    gsap.to(video, {
      scale: 0.75,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    })

    return () => ScrollTrigger.killAll()
  }, [])

  return (
    <section
      ref={sectionRef}
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

      {/* ── CENTER VIDEO ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="metadata"
        style={{
          width: '90%',
          maxWidth: 1100,
          height: '90vh',
          objectFit: 'contain',
          objectPosition: '50% 50%',
          backgroundColor: 'transparent',
          borderRadius: 0,
          display: 'block',
          opacity: 0,
          position: 'relative',
          zIndex: 1,
          transformOrigin: 'center center',
        }}
      >
        <source src="https://framerusercontent.com/assets/gBnGPgPfxrpMohWVGu5AhJomPc.mp4" />
      </video>

      {/* ── DECO IMAGES — absolutely positioned exactly like Framer ── */}
      {DECOS.map((d, i) => (
        <div
          key={i}
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