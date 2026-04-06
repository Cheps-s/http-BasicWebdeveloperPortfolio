import { motion } from 'framer-motion'
import { GraduationCap, Briefcase } from 'lucide-react'
import '.Footer.css'  
const items = [
  {
    icon: GraduationCap,
    title: 'Bachelor of Science in Information Technology',
    role: 'Major in Full Stack Development — College Course',
    desc: 'My chosen degree program focused on programming, databases, networking, and modern software development technologies.',
    border: 'border-purple-500',
    color: 'text-purple-400',
  },
  {
    icon: Briefcase,
    title: 'Freelance Student | Web Development',
    role: 'Personal Development',
    desc: 'Personal development and practice websites built to improve real-world skills, experiment with new technologies, and build a diverse portfolio.',
    border: 'border-pink-500',
    color: 'text-pink-400',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-32 relative" style={{ backgroundColor: '#0a0a0f' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Web Development</h2>
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
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className={`glass-card p-8 rounded-2xl border-l-4 ${item.border} relative overflow-hidden group`}>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <item.icon className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-display font-bold mb-2 text-white">{item.title}</h3>
                <p className={`${item.color} text-sm mb-3`}>{item.role}</p>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}