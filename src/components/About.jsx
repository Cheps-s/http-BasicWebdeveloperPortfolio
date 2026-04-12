import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Code, Sparkles, Users } from 'lucide-react'

const baseInfo = [
  { icon: MapPin,        label: 'Location',  value: 'Philippines',           color: 'text-purple-400' },
  { icon: GraduationCap, label: 'Education', value: 'BS Info Tech',          color: 'text-pink-400'   },
  { icon: Code,          label: 'Focus',     value: 'Full Stack Dev',         color: 'text-purple-400' },
  { icon: Sparkles,      label: 'Status',    value: 'Available for work',    color: 'text-green-400'  },
]

export default function About({ visitorCount = 0 }) {
  const info = [
    ...baseInfo,
    { icon: Users, label: 'Visitors', value: visitorCount.toLocaleString(), color: 'text-blue-400' },
  ]

  return (
    <section id="about" className="relative py-32 overflow-hidden" style={{ backgroundColor: '#0a0a0f' }}>
      {/* Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'rgba(168,85,247,0.07)', filter: 'blur(120px)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'rgba(236,72,153,0.07)', filter: 'blur(100px)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image / Avatar side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group max-w-sm mx-auto">
              {/* Glow */}
              <div className="absolute -inset-4 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-500"
                style={{ background: 'linear-gradient(135deg,#a855f7,#ec4899)' }} />

              {/* Card with avatar placeholder */}
              <div className="relative rounded-2xl overflow-hidden border border-purple-500/20">
                {/* Try to load image, fallback to gradient avatar */}
                <div className="relative w-full bg-gradient-to-br from-purple-900/60 via-pink-900/40 to-purple-900/60 flex items-center justify-center" style={{ height: '520px' }}>
                <img
                src="/src/img/Nyl.jpg"
                alt="Andrei Nyl Manliclic"
                className="w-full h-full object-cover object-top"
                onError={(e) => { e.target.style.display = 'none'; }}
                />
                  {/* Fallback initials avatar shown behind image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 via-transparent to-transparent pointer-events-none" />

                {/* Status badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div
                    className="rounded-xl p-3 flex items-center gap-3"
                    style={{ background: 'rgba(19,19,31,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(168,85,247,0.2)' }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                    <span className="text-sm text-gray-300">Available for work</span>
                  </div>
                </div>
              </div>

              {/* Years badge */}
              <div
                className="absolute -top-4 -right-4 rounded-2xl p-4 text-center shadow-xl"
                style={{ background: '#13131f', border: '1px solid rgba(168,85,247,0.3)' }}
              >
                <div className="text-2xl font-bold text-purple-400">3+</div>
                <div className="text-xs text-gray-400">Years Exp.</div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-purple-400 font-medium tracking-widest uppercase text-sm mb-6 block">About Me</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
               Front-End Developer &amp; <br />
              <span className="gradient-text">Vibe Coding</span>
            </h2>

            <div className="space-y-4 text-gray-400 leading-relaxed mb-8">
              <p>
                Hi, I'm <strong className="text-white">Andrei Nyl Manliclic</strong>, an aspiring front-end developer
                completing my Bachelor of Science in Information Technology. I love creating modern, user-friendly
                websites using the latest technologies.
              </p>
              <p>
                My journey started with curiosity about how websites work, which led me to fall in love with HTML,
                CSS, JavaScript, and Node.js. I also enjoy designing intuitive UIs that blend aesthetics with functionality.
              </p>
              <p>
                As a hearing-impaired developer, I've built strong patience, focus, and attention to detail — skills
                that make me a better programmer every day.
              </p>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {info.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card p-4 flex flex-col gap-1 rounded-xl"
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-gray-500 text-xs">{item.label}</span>
                  <span className="text-white text-sm font-medium">{item.value}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="px-8 py-4 rounded-full font-semibold text-white hover:scale-105 transition-all"
                style={{ background: 'linear-gradient(135deg,#a855f7,#ec4899)' }}
              >
                Let's Talk
              </a>
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="px-8 py-4 border border-purple-500/30 rounded-full font-semibold text-white hover:bg-purple-500/10 transition-all"
              >
                View Work
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
