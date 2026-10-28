import { data } from './data.js'

const sections = ['about', 'skills', 'experience', 'projects', 'education', 'contact']
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

function Section({ id, tag, title, children }) {
  return (
    <section id={id}>
      <div className="wrap">
        <p className="tag">{tag}</p>
        <h2 className="t">{title}</h2>
        {children}
      </div>
    </section>
  )
}

export default function App() {
  const d = data
  return (
    <>
      <header>
        <div className="bar">
          <a className="logo" href="#home">{d.name.split(' ')[0]}.</a>
          <nav aria-label="Sections">
            {sections.map((s) => (
              <a key={s} href={`#${s}`}>{cap(s)}</a>
            ))}
          </nav>
        </div>
      </header>

      <div className="hero" id="home">
        <div className="wrap hero-grid">
          <div>
            <p className="hello">Welcome to my portfolio</p>
            <h1>Hi, I’m {d.name}</h1>
            <h2>{d.title}</h2>
            <p className="sum">{d.summary}</p>
            <div className="btns">
              <a className="btn primary" href="#projects">View projects</a>
              <a className="btn ghost" href={d.resume} download>Download resume</a>
            </div>
            <div className="links">
              <a href={d.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={d.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
          <div className="chips" aria-label="Top skills">
            {d.topSkills.map((s) => <div key={s}>{s}</div>)}
          </div>
        </div>
      </div>

      <Section id="about" tag="About me" title="What I do and what I care about">
        <p className="about">{d.about}</p>
      </Section>

      <Section id="skills" tag="Technical skills" title="My skills">
        <div className="sk">
          {d.skills.map((s) => (
            <div className="box" key={s.name}><b>{s.name}</b><span>{s.type}</span></div>
          ))}
        </div>
      </Section>

      <Section id="experience" tag="Experience" title="Where I’ve worked">
        {d.experience.map((j) => (
          <div className="job" key={j.role}>
            <h3>{j.role}</h3>
            <p className="meta">{j.period}</p>
            <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        ))}
      </Section>

      <Section id="projects" tag="Projects" title="Featured projects">
        {d.projects.map((p) => (
          <div className="proj" key={p.name}>
            <h3>{p.name}</h3>
            <p className="meta">{p.description}</p>
            <div className="pills">{p.tools.map((t) => <span key={t}>{t}</span>)}</div>
            <ul>{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
            <p><a className="plink" href={p.link} target="_blank" rel="noreferrer">View on GitHub</a></p>
          </div>
        ))}
      </Section>

      <Section id="education" tag="Education" title="Academic background">
        <div className="edu">
          {d.education.map((e) => (
            <div className="box" key={e.title}><b>{e.title}</b><span>{e.place}</span></div>
          ))}
        </div>
      </Section>

      <section id="contact" className="contact">
        <div className="wrap">
          <p className="tag">Contact</p>
          <h2 className="t">Let’s connect</h2>
          <p>{d.contact.text}</p>
          <div className="cl">
            <span>Phone: {d.contact.phone}</span>
            <span>Email: <a href={`mailto:${d.contact.email}`}>{d.contact.email}</a></span>
            <span>GitHub: <a href={d.github} target="_blank" rel="noreferrer">{d.github.replace('https://', '')}</a></span>
            <span>LinkedIn: <a href={d.linkedin} target="_blank" rel="noreferrer">{d.linkedin.replace('https://', '')}</a></span>
          </div>
        </div>
      </section>

      <footer>© {new Date().getFullYear()} {d.name}. All rights reserved.</footer>
    </>
  )
}
