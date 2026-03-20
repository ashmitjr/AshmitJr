import useReveal from '../hooks/useReveal'

export default function ServiceCol({ service }) {
  const ref = useReveal(0.2)

  return (
    <div ref={ref} className="reveal" style={{ flex: 1, minWidth: 220 }}>
      <div style={{
        fontSize: 'clamp(28px, 4vw, 50px)',
        fontWeight: 500, lineHeight: 0.9, whiteSpace: 'pre-line',
      }}>
        {service.title[0]}{'\n'}{service.title[1]}
      </div>
      <p style={{ fontSize: 13, fontWeight: 500, marginTop: 16, lineHeight: 1.6 }}>
        <span style={{ fontWeight: 900, color: '#0b1dff' }}>({service.id})</span>
        {' '}{service.intro}
      </p>
      <div style={{ marginTop: 16 }}>
        {service.items.map((item) => (
          <p key={item} style={{ fontSize: 13, lineHeight: 1.8 }}>{item}</p>
        ))}
      </div>
    </div>
  )
}