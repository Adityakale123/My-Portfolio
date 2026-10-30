import { useEffect, useRef, useState } from 'react'
import { data as d } from './data.js'

const nav = ['about', 'skills', 'experience', 'projects', 'education', 'achievements', 'contact']
const cap = (s) => s[0].toUpperCase() + s.slice(1)

function Typing({ words }) {
  const [i, setI] = useState(0), [t, setT] = useState(''), [del, setDel] = useState(false)
  useEffect(() => {
    const w = words[i % words.length], full = !del && t === w
    const id = setTimeout(() => {
      if (full) return setDel(true)
      if (del && t === '') { setDel(false); return setI(i + 1) }
      setT(del ? w.slice(0, t.length - 1) : w.slice(0, t.length + 1))
    }, full ? 1300 : del ? 35 : 70)
    return () => clearTimeout(id)
  }, [t, del, i, words])
  return <span className="typed">{t}<i className="caret" /></span>
}

function Count({ to, suffix = '' }) {
  const ref = useRef(null), [n, setN] = useState(0)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      let s = null
      const step = (ts) => {
        s = s || ts
        const p = Math.min((ts - s) / 1400, 1)
        setN(Math.round(to * p * 10) / 10)
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{n}{suffix}</span>
}

function Tilt({ children, className = '' }) {
  const move = (e) => {
    const el = e.currentTarget, r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`
  }
  return <div className={`tilt rv ${className}`} onMouseMove={move} onMouseLeave={(e) => (e.currentTarget.style.transform = '')}>{children}</div>
}

function Sparkles() {
  const ref = useRef(null)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cv = ref.current, ctx = cv.getContext('2d')
    const cols = ['#6ea8ff', '#a78bfa', '#34d3c0', '#ffffff', '#ffd86b']
    // draw each glowing star ONCE; later we only stamp these cheap sprites
    const sprites = cols.map((c) => {
      const sc = document.createElement('canvas'); sc.width = sc.height = 32
      const g = sc.getContext('2d'); g.translate(16, 16); g.fillStyle = c; g.shadowColor = c; g.shadowBlur = 6
      g.beginPath()
      for (let i = 0; i < 8; i++) { const r = i % 2 ? 4 : 13, a = (i * Math.PI) / 4; g.lineTo(Math.cos(a) * r, Math.sin(a) * r) }
      g.closePath(); g.fill()
      return sc
    })
    let w = 0, h = 0, raf = 0, ps = [], last = 0
    const size = () => { w = window.innerWidth; h = window.innerHeight; cv.width = w; cv.height = h }
    size()
    const add = (x, y, n, burst) => {
      for (let i = 0; i < n && ps.length < 150; i++) {
        const a = Math.random() * Math.PI * 2, sp = burst ? 1 + Math.random() * 4.5 : Math.random() * 1.3
        ps.push({
          x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (burst ? 0 : 0.3), life: 1, decay: 0.014 + Math.random() * 0.02,
          r: burst ? 3 + Math.random() * 5 : 2 + Math.random() * 3.5, k: (Math.random() * cols.length) | 0, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.2
        })
      }
    }
    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      ps = ps.filter((p) => p.life > 0)
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.025; p.vx *= 0.985; p.life -= p.decay; p.rot += p.vr
        const sz = p.r * 2.6 * (0.4 + p.life * 0.6)
        ctx.globalAlpha = Math.max(p.life, 0)
        ctx.setTransform(1, 0, 0, 1, p.x, p.y); ctx.rotate(p.rot)
        ctx.drawImage(sprites[p.k], -sz / 2, -sz / 2, sz, sz)
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1
      raf = ps.length ? requestAnimationFrame(tick) : 0 // loop stops by itself when idle
    }
    const start = () => { if (!raf) raf = requestAnimationFrame(tick) }
    const move = (e) => { const t = performance.now(); if (t - last < 30) return; last = t; add(e.clientX, e.clientY, 2, false); start() }
    const click = (e) => { add(e.clientX, e.clientY, 22, true); start() }
    window.addEventListener('mousemove', move, { passive: true }); window.addEventListener('mousedown', click, { passive: true }); window.addEventListener('resize', size)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move); window.removeEventListener('mousedown', click); window.removeEventListener('resize', size)
    }
  }, [])
  return <canvas ref={ref} className="sparkle" aria-hidden="true" />
}

function Quotes() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % d.quotes.length), 6000)
    return () => clearInterval(id)
  }, [])
  const q = d.quotes[i]
  return (
    <div className="quote rv">
      <span className="qm" aria-hidden="true">“</span>
      <p className="qt" key={i}>{q.text}</p>
      <p className="qa">— {q.by}</p>
      <div className="qd">{d.quotes.map((_, k) => <button key={k} aria-label={`Quote ${k + 1}`} className={k === i ? 'on' : ''} onClick={() => setI(k)} />)}</div>
    </div>
  )
}

function Section({ id, tag, title, children }) {
  return (
    <section id={id}>
      <div className="wrap">
        <p className="tag rv">{tag}</p>
        <h2 className="t rv">{title}</h2>
        {children}
      </div>
    </section>
  )
}

export default function App() {
  const [ok, setOk] = useState(true), [menu, setMenu] = useState(false), [active, setActive] = useState('')
  const barRef = useRef(null), topRef = useRef(null)
  const initials = d.name.split(' ').map((x) => x[0]).join('')
  const marquee = d.skills.flatMap((g) => g.items)

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { threshold: 0.12 })
    document.querySelectorAll('.rv').forEach((el) => io.observe(el))
    let ticking = false
    const update = () => {
      ticking = false
      const h = document.documentElement
      const pr = h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1)
      if (barRef.current) barRef.current.style.transform = `scaleX(${pr})`
      if (topRef.current) topRef.current.style.opacity = pr > 0.15 ? 1 : 0
      let cur = ''
      for (const id of nav) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < 140) cur = id }
      setActive(cur)
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <>
      <div className="bg" aria-hidden="true"><i /><i /><i /></div>
      <Sparkles />
      <div className="progress" ref={barRef} />
      <header>
        <div className="bar">
          <a className="logo" href="#home" aria-label={d.name}>
            <span className="mono">{initials}</span>
          </a>
          <button className="burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}><i /><i /><i /></button>
          <nav aria-label="Sections" className={menu ? 'open' : ''} onClick={() => setMenu(false)}>
            {nav.map((s) => <a key={s} href={`#${s}`} className={active === s ? 'on' : ''}>{cap(s)}</a>)}
          </nav>
        </div>
      </header>

      <div className="hero" id="home">
        <div className="wrap hero-grid">
          <div className="hero-text">
            <p className="hello"><span className="dot" /> Open to work · {d.contact.location.split(',')[0]}</p>
            <h1>Hi, I’m <span className="grad">{d.name}</span></h1>
            <h2><Typing words={d.roles} /></h2>
            <p className="sum">{d.summary}</p>
            <div className="btns">
              <a className="btn primary" href="#projects">View projects</a>
              <a className="btn ghost" href={d.resume} download>Download resume</a>
            </div>
            <div className="links">
              <a href={d.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={d.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={`mailto:${d.contact.email}`}>Email</a>
            </div>
          </div>

          <div className="visual">
            <div className="orbit">
              <div className="photo">
                {ok ? <img src={d.photo} alt={d.name} onError={() => setOk(false)} /> : <span>{initials}</span>}
              </div>
              {d.topSkills.map((s, i) => <span key={s} className={`float f${i}`}>{s}</span>)}
            </div>
          </div>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="track">{[...marquee, ...marquee].map((m, i) => <span key={i}>{m}</span>)}</div>
      </div>

      <Section id="about" tag="About me" title="What I do and what I care about">
        <p className="about rv">{d.about}</p>
        <div className="stats">
          {d.stats.map((s) => (
            <div className="stat rv" key={s.l}><b><Count to={s.n} suffix={s.s} /></b><span>{s.l}</span></div>
          ))}
        </div>
      </Section>

      <Section id="skills" tag="Technical skills" title="My toolbox">
        <div className="sk">
          {d.skills.map((g) => (
            <Tilt key={g.group} className="box">
              <b>{g.group}</b>
              <div className="pills">{g.items.map((i) => <span key={i}>{i}</span>)}</div>
            </Tilt>
          ))}
        </div>
      </Section>

      <Section id="experience" tag="Experience" title="Where I’ve worked">
        <div className="timeline">
          {d.experience.map((j) => (
            <div className="job rv" key={j.role + j.period}>
              <span className="when">{j.period}</span>
              <h3>{j.role}{j.company ? ` · ${j.company}` : ''}</h3>
              {j.projects.map((p) => (
                <div key={p.name} className="subproj">
                  <p className="pname">{p.name}</p>
                  <ul>{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects" tag="Projects" title="Things I’ve built">
        <div className="grid">
          {d.projects.map((p, i) => (
            <Tilt key={p.name} className="proj">
              <div className="thumb" style={{ '--h': i * 55 + 215 }}>
                <span className="dots" /><span className="ico">{p.icon || '💡'}</span><span className="bar1" /><span className="bar2" />
              </div>
              <h3>{p.name}</h3>
              <p className="meta">{p.description}</p>
              {p.tools && <div className="pills">{p.tools.map((t) => <span key={t}>{t}</span>)}</div>}
              {p.points && <ul>{p.points.map((x) => <li key={x}>{x}</li>)}</ul>}
              {p.link && <a className="plink" href={p.link} target="_blank" rel="noreferrer">View on GitHub →</a>}
            </Tilt>
          ))}
        </div>
      </Section>

      <Section id="education" tag="Education" title="Academic background">
        <div className="edu">
          {d.education.map((e) => <Tilt key={e.title} className="box"><b>{e.title}</b><span>{e.place}</span></Tilt>)}
        </div>
      </Section>

      <Section id="achievements" tag="Achievements & certifications" title="Recognition and learning">
        <div className="two rv">
          <div><h3>Achievements</h3><ul>{d.achievements.map((a) => <li key={a}>{a}</li>)}</ul></div>
          <div><h3>Certifications</h3><div className="pills">{d.certifications.map((c) => <span key={c}>{c}</span>)}</div></div>
        </div>
      </Section>

      <Section id="quotes" tag="Philosophy" title="Words I code by">
        <Quotes />
      </Section>

      <Section id="contact" tag="Contact" title="Let’s work together">
        <p className="about rv">{d.contact.text}</p>
        <div className="cards">
          <a className="cc rv" href={`mailto:${d.contact.email}`}><span>Email</span>{d.contact.email}</a>
          <a className="cc rv" href={`tel:${d.contact.phone.replace(/\s/g, '')}`}><span>Phone</span>{d.contact.phone}</a>
          <a className="cc rv" href={d.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span>{d.linkedin.replace('https://', '')}</a>
          <a className="cc rv" href={d.github} target="_blank" rel="noreferrer"><span>GitHub</span>{d.github.replace('https://', '')}</a>
        </div>
      </Section>

      <section className="thanks">
        <div className="wrap">
          <div className="tcard rv">
            <span className="wave" aria-hidden="true">👋</span>
            <h2>{d.thanks.title}</h2>
            <p>{d.thanks.text}</p>
            <a className="btn primary" href={`mailto:${d.contact.email}`}>Say hello</a>
          </div>
        </div>
      </section>

      <footer>© {new Date().getFullYear()} {d.name} · Built with React & ♥ · Thanks for visiting</footer>
      <a className="top" href="#home" aria-label="Back to top" ref={topRef}>↑</a>
    </>
  )
}