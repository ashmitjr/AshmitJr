import projects from '../data/projects'
import ProjectRow from '../components/ProjectRow'

export default function Work() {
  return (
    <section id="work">
      
      <div className="section-heading">
        featured work<span className="accent">*</span>
      </div>

      <div className="section-sub">
        <p>
          <span className="accent-mark">*</span>
          Ideas that survived the jump from the brain to the screen.
          Multi-disciplinary work carried from concept to completion.
        </p>
      </div>

      <div className="work-container">
        {projects.map((project, i) => (
          <div key={i}>
            <div className="divider" />
            <ProjectRow project={project} />
          </div>
        ))}
        <div className="divider" />
      </div>

      <div className="view-all-wrap">
        <a href="#" className="btn-outline">view all work</a>
      </div>

    </section>
  )
}