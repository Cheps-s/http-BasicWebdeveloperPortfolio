import React from 'react'
import { motion } from 'framer-motion'
import { Globe, Smartphone, Palette, BrainCircuit, Wrench, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    desc: 'Building responsive, modern websites from landing pages to interactive web apps using HTML, CSS, JavaScript, and React.',
    tags: ['HTML/CSS', 'JavaScript', 'React'],
    gradient: 'linear-gradient(135deg,#a855f7,#c084fc)',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    desc: 'Designing clean, intuitive user interfaces with Figma and Canva, focused on usability and modern aesthetics.',
    tags: ['Figma', 'Canva', 'Prototyping'],
    gradient: 'linear-gradient(135deg,#f97316,#ec4899)',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    desc: 'Ensuring websites work perfectly on all screen sizes from desktop to tablet to mobile.',
    tags: ['Mobile-first', 'Tailwind CSS', 'Flexbox/Grid'],
    gradient: 'linear-gradient(135deg,#6366f1,#3b82f6)',
  },
  {
    icon: BrainCircuit,
    title: 'AI-Assisted Development',
    desc: 'Using modern AI tools to speed up development, improve code quality, and enhance productivity.',
    tags: ['GitHub Copilot', 'Claude AI', 'ChatGPT'],
    gradient: 'linear-gradient(135deg,#06b6d4,#3b82f6)',
  },
  {
    icon: Wrench,
    title: 'Website Maintenance',
    desc: 'Fixing bugs, improving performance, and updating existing websites with new features.',
    tags: ['Bug Fixes', 'Optimization', 'Updates'],
    gradient: 'linear-gradient(135deg,#10b981,#14b8a6)',
  },
]

const Services = () => (
  <section id="services" className="py-32 relative overflow-hidden" style={{ backgroundColor: '#0a0a0f' }}>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
      style={{ width:'600px', height:'300px', background:'rgba(168,85,247,0.08)', borderRadius:'50%', filter:'blur(120px)' }} />

    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
      <motion.div
        initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
        className="mb-16 text-center"
      >
        <span className="text-purple-400 font-medium tracking-widest uppercase text-sm mb-4 block">What I Offer</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Services</h2>
        <div className="h-1 w-20 rounded-full mx-auto mb-6" style={{ background:'linear-gradient(to right,#a855f7,#ec4899)' }} />
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          From design to deployment — here's how I can help bring your project to life.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div key={s.title}
            initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay: i * 0.1 }}
            className="glass-card p-8 rounded-2xl group"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
              style={{ background: s.gradient }}>
              <s.icon className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
              {s.title}
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">{s.desc}</p>

            <div className="flex flex-wrap gap-2">
              {s.tags.map(t => (
                <span key={t}
                  className="text-xs text-gray-400 px-3 py-1 rounded-full"
                  style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
        className="mt-16 text-center">
        <p className="text-gray-400 mb-6">Need something custom? Let's talk about your project.</p>

        <a href="#contact"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-white hover:scale-105 transition-all hover:shadow-2xl hover:shadow-purple-500/25"
          style={{ background:'linear-gradient(135deg,#a855f7,#ec4899)' }}>
          Get a Free Quote <ArrowRight className="w-5 h-5" />
        </a>
      </motion.div>
    </div>
  </section>
)

export default Services
