const DECOS = [
  { src: 'https://framerusercontent.com/images/eworU6xoE2plzVUmMOPx9rIp7pY.jpg',
    style: { width: '22%', bottom: 60, left: 15, animation: 'popIn .4s cubic-bezier(.34,1.56,.64,1) 3.6s forwards' } },
  { src: 'https://framerusercontent.com/images/nNLGLKBaN3TMBNgUnAFjyxbtQ.jpg',
    style: { width: '17%', top: 60, left: 61, animation: 'popIn .4s cubic-bezier(.34,1.56,.64,1) 3.5s forwards' } },
  { src: 'https://framerusercontent.com/images/ScU99IyOsTtb1lxML9872VIoxU.jpg',
    style: { width: '23%', top: 65, right: 13, animation: 'popIn .4s cubic-bezier(.34,1.56,.64,1) 4.0s forwards' } },
  { src: 'https://framerusercontent.com/images/bssDxEIkplBAwpalnxd7jncvrpA.jpg',
    style: { width: '14%', bottom: 21, right: 104, animation: 'popIn .4s cubic-bezier(.34,1.56,.64,1) 3.9s forwards' } },
  { src: 'https://framerusercontent.com/images/KStWazohrKWwui4n8wNsyKNqet0.jpg',
    style: { width: '15%', top: '45%', right: 32, animation: 'popInY .4s cubic-bezier(.34,1.56,.64,1) 3.7s forwards' } },
]

export default function Hero() {
  return (
    <section id="hero" style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#fff', overflow: 'hidden', position: 'relative',
    }}>
      <video
        autoPlay muted loop playsInline
        poster="https://framerusercontent.com/images/jOQ3WSvHY482zYegmuEP1iYjc.gif"
        style={{
          width: '90vw', maxWidth: 1200, height: '85vh', objectFit: 'contain',
          opacity: 0, animation: 'fadeIn 1s ease 0.3s forwards',
        }}
      >
        <source src="https://framerusercontent.com/assets/gBnGPgPfxrpMohWVGu5AhJomPc.mp4" type="video/mp4" />
      </video>

      {DECOS.map((d, i) => (
        <div key={i} style={{
          position: 'absolute', pointerEvents: 'none',
          mixBlendMode: 'multiply', opacity: 0, transform: 'scale(0)',
          ...d.style,
        }}>
          <img src={d.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ))}
    </section>
  )
}