import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Code2 } from 'lucide-react'

const projects = [
  { title:'Chepsbook',          desc:'A social-style website with modern layout and responsive interface.',                              image:'/src/img/Screenshot 2026-03-12 145728.png', tags:['HTML','CSS','JavaScript'], category:'Social Website', badgeStyle:{background:'rgba(168,85,247,0.2)',border:'1px solid rgba(168,85,247,0.3)',color:'#d8b4fe'}, link:'https://cheps-s.github.io/Chepsbook.com/#home' },
  { title:'Andrei Nyl Portfolio',desc:'Personal developer portfolio showcasing projects, skills, and UI animations.',                    image:'/src/img/Screenshot 2026-03-12 150045.png', tags:['HTML','CSS','JavaScript'], category:'Portfolio',     badgeStyle:{background:'rgba(59,130,246,0.2)', border:'1px solid rgba(59,130,246,0.3)', color:'#93c5fd'},    link:'https://cheps-s.github.io/Andreinyl.com' },
  { title:'AI Business Website', desc:'A modern business website design with AI-generated content and sleek UI.',                        image:'/src/img/Screenshot 2026-03-13 162017.png', tags:['HTML','CSS','JavaScript'], category:'Business',       badgeStyle:{background:'rgba(236,72,153,0.2)',border:'1px solid rgba(236,72,153,0.3)',color:'#f9a8d4'},    link:'#' },
  { title:'Parallax Portfolio',  desc:'My first portfolio website with parallax scrolling and interactive elements.',                    image:'/src/img/Screenshot 2026-03-12 220038.png', tags:['HTML','CSS','JavaScript'], category:'Portfolio',     badgeStyle:{background:'rgba(99,102,241,0.2)', border:'1px solid rgba(99,102,241,0.3)', color:'#a5b4fc'},    link:'/src/parallax website/index.html' },
  { title:'Snake Game (C#)',     desc:'A C# console-based snake game showcasing early programming and logic skills.',                    image:'/src/img/snakeg.jpg',                        tags:['C#','Console','Game Dev'],  category:'Game',          badgeStyle:{background:'rgba(16,185,129,0.2)', border:'1px solid rgba(16,185,129,0.3)', color:'#6ee7b7'},    link:'#' },
  { title:'Copy of YouTube',     desc:'A static YouTube clone built purely with HTML and CSS to practice layout skills.',               image:'/src/img/Copu youtubw.png',                  tags:['HTML','CSS'],              category:'UI Clone',       badgeStyle:{background:'rgba(239,68,68,0.2)',  border:'1px solid rgba(239,68,68,0.3)',  color:'#fca5a5'},    link:'#' },
  { title:'First Try Code',      desc:'My very first web application, showcasing initial skills in HTML, CSS, and JavaScript.',          image:'/src/img/First try code.png',                tags:['HTML','CSS','JavaScript'], category:'Practice',      badgeStyle:{background:'rgba(234,179,8,0.2)',  border:'1px solid rgba(234,179,8,0.3)',  color:'#fde68a'},    link:'#' },
  { title:'Second Portfolio',    desc:'A simple yet elegant second portfolio iteration showcasing improved layout skills.',              image:'/src/img/second portfolio.png',              tags:['HTML','CSS'],              category:'Portfolio',     badgeStyle:{background:'rgba(59,130,246,0.2)', border:'1px solid rgba(59,130,246,0.3)', color:'#93c5fd'},    link:'#' },
  { title:'Animation Website',   desc:'A creative animation-focused website experimenting with CSS keyframes and JavaScript motion.',    image:'/src/img/Screenshot 2026-03-12 164933.png', tags:['HTML','CSS','JavaScript'], category:'Animation',     badgeStyle:{background:'rgba(16,185,129,0.2)', border:'1px solid rgba(16,185,129,0.3)', color:'#6ee7b7'},    link:'/src/Animation website/html/css/index.html' },
  { title:'PixelHub',            desc:'Upcoming full-stack project showcasing React.js and Node.js with MongoDB.',                       image:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', tags:['React','Node.js','MongoDB'], category:'Full Stack', badgeStyle:{background:'rgba(6,182,212,0.2)', border:'1px solid rgba(6,182,212,0.3)', color:'#67e8f9'}, link:'#', comingSoon:true },
]

const categories = ['All', ...new Set(projects.map(p => p.category))]

const Projects = () => {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mb-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Featured Projects</h2>
          <div className="h-1 w-20 rounded-full" style={{ background:'linear-gradient(to right,#a855f7,#ec4899)' }} />
        </motion.div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="flex flex-wrap gap-2 mb-12">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all border"
              style={filter === cat
                ? { background:'linear-gradient(135deg,#a855f7,#ec4899)', color:'#fff', border:'1px solid transparent' }
                : { background:'transparent', color:'#9ca3af', border:'1px solid rgba(255,255,255,0.1)' }}>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.a key={p.title}
                href={p.link}
                target={p.link !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                layout
                initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, scale:0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group block"
              >
                <div className="glass-card rounded-2xl overflow-hidden h-full relative">
                  {p.comingSoon && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 rounded-full text-xs text-gray-300"
                        style={{ background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.1)' }}>
                        Coming Soon
                      </span>
                    </div>
                  )}
                  <div className="h-56 relative overflow-hidden">
                    <img src={p.image} alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs" style={p.badgeStyle}>{p.category}</span>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(8px)' }}>
                        <ExternalLink className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{p.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{p.desc}</p>
                    <div className="flex gap-2 flex-wrap">
                      {p.tags.map(t => (
                        <span key={t} className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded flex items-center gap-1">
                          <Code2 className="w-3 h-3" />{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects