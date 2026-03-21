import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SERVICES from "../data/services"

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const containerRef = useRef(null)
  const videoWrapperRef = useRef(null)
  const sectionsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. VIDEO PARALLAX (Subtle movement inside the sticky box)
      gsap.to(videoWrapperRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      })

      // 2. STAGGERED SECTION ENTRANCE
      sectionsRef.current.forEach((el, i) => {
        if (!el) return;

        // Create a unique offset for each based on index (staggered look)
        const xOffset = i % 2 === 0 ? 50 : -50;

        gsap.fromTo(el,
          { 
            opacity: 0, 
            y: 60, 
            x: xOffset 
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%", // Starts when the element is near the bottom
              toggleActions: "play none none reverse", // Smoother than scrubbing for text
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      style={{
        background: "#ff6200",
        display: "flex",
        flexDirection: "row",
        padding: "0 5%",
        position: "relative", // Required for sticky children
        minHeight: "200vh",   // Gives the video "room" to stay sticky
      }}
    >
      {/* LEFT SIDE: STICKY VIDEO */}
      <div
        style={{
          width: "40%",
          height: "100vh",
          position: "sticky",
          top: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <div
          ref={videoWrapperRef}
          style={{
            width: "100%",
            aspectRatio: "1/1",
            borderRadius: "24px",
            overflow: "hidden",
            background: "#fff",
            boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
          }}
        >
          <video
            src="https://video.gumlet.io/69a9abbd06a15537d02701a5/69aea19d6fd61f7e4bb530de/main.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      {/* RIGHT SIDE: SCROLLING CONTENT */}
      <div 
        style={{ 
          width: "60%", 
          padding: "15vh 0 20vh 10%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        
        {/* HEADING */}
        <header style={{ marginBottom: "20vh" }}>
          <h1
            style={{
              fontSize: "clamp(60px, 8vw, 120px)",
              fontWeight: 600,
              lineHeight: 0.85,
              letterSpacing: "-0.03em",
            }}
          >
            what i do
            <span style={{ color: "#0b1dff" }}>*</span>
          </h1>

          <p style={{ marginTop: "2rem", maxWidth: "350px", fontSize: "14px", lineHeight: 1.5 }}>
            <span style={{ color: "#0b1dff", fontWeight: 900 }}>*</span>{" "}
            I approach design through brand strategy and experience storytelling,
            using visuals, motion, and interaction to create meaningful work.
          </p>
        </header>

        {/* SERVICES LIST */}
        {SERVICES.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => (sectionsRef.current[i] = el)}
            style={{
              marginBottom: "25vh", // Spacing out sections for better scroll feel
            }}
          >
            {/* TITLE BLOCK */}
            <div
              style={{
                fontSize: "clamp(32px, 4vw, 54px)",
                fontWeight: 500,
                lineHeight: 1.1,
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                {s.title[0]}
                {s.icon && <img src={s.icon} alt="" style={{ width: "0.8em", height: "0.8em" }} />}
                {s.title[1]}
              </div>
              <div>{s.titleBot}</div>
            </div>

            {/* DESCRIPTION BLOCK */}
            <div style={{ maxWidth: "380px" }}>
              <p style={{ fontSize: "15px", marginBottom: "1.5rem" }}>
                <strong style={{ color: "#0b1dff", marginRight: "8px" }}>({s.id})</strong> 
                {s.intro}
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {s.items.map((item, idx) => (
                  <li 
                    key={idx} 
                    style={{ 
                      fontSize: "13px", 
                      opacity: 0.8, 
                      padding: "4px 0",
                      borderTop: "1px solid rgba(0,0,0,0.1)" 
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}