import React from 'react'
import { motion } from 'framer-motion'
import { 
  Code2, 
  Zap, 
  Smartphone, 
  Palette, 
  Server, 
  Database, 
  GitBranch, 
  Terminal 
} from 'lucide-react'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: Code2,
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS', 'Responsive Design'],
      color: 'from-primary to-purple-400',
    },
    {
      title: 'Backend',
      icon: Server,
      skills: ['Node.js', 'Express.js', 'REST API', 'MongoDB', 'Authentication', 'JWT'],
      color: 'from-secondary to-pink-400',
    },
    {
      title: 'Tools',
      icon: Terminal,
      skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'npm'],
      color: 'from-indigo-500 to-indigo-400',
    },
  ]

  const features = [
    { icon: Code2, title: 'Clean Code', desc: 'Maintainable & scalable', color: 'text-primary' },
    { icon: Zap, title: 'Performance', desc: 'Optimized & fast', color: 'text-secondary' },
    { icon: Smartphone, title: 'Responsive', desc: 'Mobile-first approach', color: 'text-primary' },
    { icon: Palette, title: 'UI/UX Design', desc: 'User-centered design', color: 'text-secondary' },
  ]

  return (
    <section id="skills" className="py-32 relative bg-darker/50">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Technical Skills
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              I specialize in the MERN stack (MongoDB, Express, React, Node.js) and modern 
              web development practices. Constantly learning and adapting to new technologies 
              to build better applications.
            </p>

            <div className="space-y-6">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="skill-tag px-4 py-2 text-sm text-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card p-6 text-center group hover:border-primary/30 transition-all ${index % 2 === 1 ? 'mt-8' : ''}`}
              >
                <feature.icon className={`w-8 h-8 ${feature.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                <h4 className="font-semibold mb-1">{feature.title}</h4>
                <p className="text-xs text-gray-500">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills