import { motion } from 'framer-motion'
import { GraduationCap, Briefcase } from 'lucide-react'

const items = [
  {
    icon: GraduationCap,
    title: 'Bachelor of Science in Information Technology',
    role: 'Major in Full Stack Development — College Course',
    desc: 'My chosen degree program focused on programming, databases, networking, and modern software development technologies.',
    borderColor: '#a855f7',
    iconColor: 'text-purple-400',
  },
  {
    icon: Briefcase,
    title: 'Freelance Student | Web Development',
    role: 'Personal Development',
    desc: 'Personal development and practice websites built to improve real-world skills, experiment with new technologies, and build a diverse portfolio.',
    borderColor: '#ec4899',
    iconColor: 'text-pink-400',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden" style={{ backgroundColor: '#0a0a0f' }}>
      {/* Glows */}
      <div className="absolute pointer-events-none rounded-full"
        style={{ top: '20%', left: '-10%', width: '400px', height: '400px', background: '#a855f7', filter: 'blur(120px)', opacity: 0.07 }} />
      <div className="absolute pointer-events-none rounded-full"
        style={{ bottom: 0, right: '-10%', width: '500px', height: '500px', background: '#ec4899', filter: 'blur(120px)', opacity: 0.07 }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 font-medium tracking-widest uppercase text-sm mb-4 block">Background</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">My Experience</h2>
          <div className="h-1 w-20 rounded-full mx-auto mb-6"
            style={{ background: 'linear-gradient(to right,#a855f7,#ec4899)' }} />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Developing web applications using both frontend and backend technologies.
            Experience with HTML, CSS, JavaScript, and modern web tools to build
            responsive and functional websites.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-8 rounded-2xl relative overflow-hidden group"
              style={{ borderLeft: `4px solid ${item.borderColor}` }}
            >
              {/* Watermark icon */}
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <item.icon className="w-24 h-24" />
              </div>

              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.borderColor}20` }}>
                    <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-white mb-1">{item.title}</h3>
                    <p className={`${item.iconColor} text-sm font-medium`}>{item.role}</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed pl-16">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
