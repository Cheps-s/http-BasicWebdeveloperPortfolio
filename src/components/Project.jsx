import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Code2 } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: 'Chepsbook',
      description: 'A social-style website with modern layout and responsive interface. Features user profiles, posts, and interactive elements.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
      tags: ['HTML', 'CSS', 'JavaScript'],
      category: 'Social Website',
      color: 'purple',
      link: 'https://cheps-s.github.io/Chepsbook.com/#home',
    },
    {
      title: 'Andrei Nyl Portfolio',
      description: 'Personal developer portfolio showcasing projects, skills, and UI animations with modern design principles.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      tags: ['HTML', 'CSS', 'JavaScript'],
      category: 'Portfolio',
      color: 'blue',
      link: 'https://cheps-s.github.io/Andreinyl.com',
    },
    {
      title: 'PixelHub',
      description: 'Upcoming full-stack project showcasing React.js and Node.js integration with database management.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      tags: ['React', 'Node.js', 'MongoDB'],
      category: 'Full Stack',
      color: 'emerald',
      link: '#',
    },
  ]

  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group block"
            >
              <div className="glass-card rounded-2xl overflow-hidden h-full">
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 bg-${project.color}-600/20 border border-${project.color}-500/30 rounded-full text-xs text-${project.color}-300`}>
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded flex items-center gap-1"
                      >
                        <Code2 className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects