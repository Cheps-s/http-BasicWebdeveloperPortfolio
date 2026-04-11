import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Code2 } from 'lucide-react'
import './Projects.css'

const fallbackProjects = [
  {
    title: 'Chepsbook',
    description: 'A social-style website with modern layout and responsive interface.',
    image: '/src/img/Screenshot 2026-03-12 145728.png',
    category: 'Social Website',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://cheps-s.github.io/Chepsbook.com/#home',
  },
  {
    title: 'Andrei Nyl Portfolio',
    description: 'Personal developer portfolio showcasing projects, skills, and UI animations.',
    image: '/src/img/Screenshot 2026-03-12 150045.png',
    category: 'Portfolio',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://cheps-s.github.io/Andreinyl.com',
  },
  {
    title: 'Parallax Portfolio',
    description: 'My first portfolio website with parallax scrolling and interactive elements.',
    image: '/src/img/Screenshot 2026-03-12 220038.png',
    category: 'Portfolio',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '/src/parallax website/index.html',
  },
]

const formatProject = (project) => ({
  title: project.title,
  description: project.description || project.desc || 'A polished portfolio project showcasing modern web development.',
  image: project.image_url || project.image || '/src/img/Screenshot 2026-03-12 150045.png',
  category: project.category || 'Portfolio',
  tags: project.tags || project.tags || ['HTML', 'CSS', 'JavaScript'],
  link: project.live_url || project.link || '#',
  comingSoon: !(project.live_url || project.link),
})

export default function Projects({ projects = [], loading }) {
  const data = useMemo(
    () => (projects.length ? projects.map(formatProject) : fallbackProjects),
    [projects]
  )

  const [filter, setFilter] = useState('All')

  const categories = useMemo(
    () => ['All', ...new Set(data.map((project) => project.category))],
    [data]
  )

  const filteredProjects = useMemo(
    () => (filter === 'All' ? data : data.filter((project) => project.category === filter)),
    [data, filter]
  )

  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Featured Projects</h2>
          <div className="h-1 w-20 rounded-full" style={{ background: 'linear-gradient(to right,#a855f7,#ec4899)' }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === category ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent' : 'bg-transparent text-gray-400 border border-white/10'}`}
              style={filter === category ? {} : { borderColor: 'rgba(255,255,255,0.1)' }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.a
                key={`${project.title}-${index}`}
                href={project.link}
                target={project.link !== '#' ? '_blank' : undefined}
                rel={project.link !== '#' ? 'noopener noreferrer' : undefined}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.04 }}
                className="group block"
              >
                <div className="project-card">
                  {project.comingSoon && (
                    <div className="project-coming-soon">Coming Soon</div>
                  )}
                  <div className="project-img-wrap">
                    <img src={project.image} alt={project.title} />
                    <div className="project-img-overlay" />
                    <div className="project-category-badge" style={{ background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.3)', color: '#d8b4fe' }}>
                      {project.category}
                    </div>
                    <div className="project-ext-icon">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="project-body">
                    <h3 className="project-name">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">
                          <Code2 className="w-3 h-3" /> {tag}
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
