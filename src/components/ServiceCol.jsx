export default function ServiceCol({ service }) {
  return (
    <div style={{ display: "flex", gap: "40px" }}>
      
      {/* LEFT TITLE */}
      <div style={{ minWidth: "300px" }}>
        <div style={{ fontSize: 50, fontWeight: 500, lineHeight: "0.9em" }}>
          {service.title[0]}
          <img
            src={service.icon}
            style={{ width: 50, margin: "0 6px" }}
          />
          {service.title[1]}
        </div>

        <div style={{ fontSize: 50, fontWeight: 500 }}>
          {service.titleBot}
        </div>
      </div>

      {/* RIGHT TEXT */}
      <div style={{ maxWidth: 400 }}>
        <p>
          <span style={{ color: "#0b1dff", fontWeight: 900 }}>
            ({service.id})
          </span>{" "}
          {service.intro}
        </p>

        <br />

        {service.items.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
    </div>
  )
}