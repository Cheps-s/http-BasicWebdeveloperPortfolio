import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Code2 } from 'lucide-react'

const fallbackProjects = [
  {
    title: 'Chepsbook',
    description: 'A social-style website with modern layout and responsive interface.',
    image: '/src/img/chepbook.png',
    category: 'Social Website',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://cheps-s.github.io/Chepsbook.com/#home',
  },
  {
    title: 'Andrei Nyl Portfolio',
    description: 'Personal developer portfolio showcasing projects, skills, and UI animations.',
    image: '/src/img/1.png',
    category: 'Portfolio',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://cheps-s.github.io/Andreinyl.com',
  },
  {
    title: 'AI Business Website',
    description: 'A modern business website design with AI-generated content and sleek UI.',
    image: '/src/img/AIchat.png',
    category: 'Business',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '#',
  },
  {
    title: 'Parallax Portfolio',
    description: 'My first portfolio website with parallax scrolling and interactive elements.',
    image: '/src/img/Parallax.png',
    category: 'Portfolio',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '#',
  },
  {
    title: 'Snake Game (C#)',
    description: 'A C# console-based snake game showcasing early programming and logic skills.',
    image: '/src/img/snakeg.jpg',
    category: 'Game',
    tags: ['C#', 'Console', 'Game Dev'],
    link: '#',
  },
  {
    title: 'Copy of YouTube',
    description: 'A static YouTube clone built purely with HTML and CSS to practice layout skills.',
    image: '/src/img/Copu youtubw.png',
    category: 'UI Clone',
    tags: ['HTML', 'CSS'],
    link: '#',
  },
  {
    title: 'First Try Code',
    description: 'My very first web application, showcasing initial skills in HTML, CSS, and JavaScript.',
    image: '/src/img/First try code.png',
    category: 'Practice',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '#',
  },
  {
    title: 'Second try Portfolio',
    description: 'A second attempt at a personal portfolio, demonstrating improved design and coding skills.',
    image: '/src/img/second.png',
    category: 'Animation',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '#',
  },
  {
    title: 'PixelHub',
    description: 'Upcoming full-stack project showcasing React.js and Node.js with MongoDB.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    category: 'Full Stack',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '#',
    comingSoon: true,
  },
]

const categoryColors = {
  'Social Website': { bg: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.3)', color: '#d8b4fe' },
  'Portfolio':      { bg: 'rgba(59,130,246,0.2)',  border: '1px solid rgba(59,130,246,0.3)',  color: '#93c5fd' },
  'Business':       { bg: 'rgba(236,72,153,0.2)',  border: '1px solid rgba(236,72,153,0.3)',  color: '#f9a8d4' },
  'Game':           { bg: 'rgba(16,185,129,0.2)',  border: '1px solid rgba(16,185,129,0.3)',  color: '#6ee7b7' },
  'UI Clone':       { bg: 'rgba(239,68,68,0.2)',   border: '1px solid rgba(239,68,68,0.3)',   color: '#fca5a5' },
  'Practice':       { bg: 'rgba(234,179,8,0.2)',   border: '1px solid rgba(234,179,8,0.3)',   color: '#fde68a' },
  'Animation':      { bg: 'rgba(16,185,129,0.2)',  border: '1px solid rgba(16,185,129,0.3)',  color: '#6ee7b7' },
  'Full Stack':     { bg: 'rgba(6,182,212,0.2)',   border: '1px solid rgba(6,182,212,0.3)',   color: '#67e8f9' },
}
const defaultBadge = { bg: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.3)', color: '#d8b4fe' }

function getBadge(category) { return categoryColors[category] || defaultBadge }

export default function Projects({ projects = [], loading }) {
  const data = useMemo(() => (projects.length ? projects : fallbackProjects), [projects])
  const [filter, setFilter] = useState('All')
  const categories = useMemo(() => ['All', ...new Set(data.map((p) => p.category))], [data])
  const filtered = useMemo(() => (filter === 'All' ? data : data.filter((p) => p.category === filter)), [data, filter])

  return (
    <section id="projects" className="py-32 relative" style={{ backgroundColor: '#0a0a0f' }}>
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: '600px', height: '300px', background: 'rgba(168,85,247,0.05)', borderRadius: '50%', filter: 'blur(120px)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <span className="text-purple-400 font-medium tracking-widest uppercase text-sm mb-4 block">My Work</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Featured Projects</h2>
          <div className="h-1 w-20 rounded-full" style={{ background: 'linear-gradient(to right,#a855f7,#ec4899)' }} />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all border"
              style={
                filter === cat
                  ? { background: 'linear-gradient(135deg,#a855f7,#ec4899)', color: '#fff', borderColor: 'transparent' }
                  : { background: 'transparent', color: '#9ca3af', borderColor: 'rgba(255,255,255,0.1)' }
              }
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const badge = getBadge(p.category)
              return (
                <motion.a
                  key={p.title}
                  href={p.link !== '#' ? p.link : undefined}
                  target={p.link !== '#' ? '_blank' : undefined}
                  rel={p.link !== '#' ? 'noopener noreferrer' : undefined}
                  onClick={p.link === '#' ? (e) => e.preventDefault() : undefined}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04 }}
                  className="group block"
                  style={{ cursor: p.link === '#' ? 'default' : 'pointer' }}
                >
                  <div className="glass-card rounded-2xl overflow-hidden h-full relative">
                    {p.comingSoon && (
                      <div className="absolute top-4 right-4 z-20">
                        <span
                          className="px-3 py-1 rounded-full text-xs text-gray-300"
                          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                          Coming Soon
                        </span>
                      </div>
                    )}
                    <div className="h-56 relative overflow-hidden bg-gradient-to-br from-purple-900/30 to-pink-900/20">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs"
                          style={{ background: badge.bg, border: badge.border, color: badge.color }}>
                          {p.category}
                        </span>
                      </div>
                      {p.link !== '#' && (
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
                          >
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{p.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{p.description}</p>
                      <div className="flex gap-2 flex-wrap">
                        {p.tags.map((t) => (
                          <span key={t} className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded flex items-center gap-1">
                            <Code2 className="w-3 h-3" />{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.a>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}