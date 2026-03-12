import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Code, Sparkles } from 'lucide-react'

const About = () => {
  const infoCards = [
    { icon: MapPin, label: 'Location', value: 'Philippines', color: 'text-primary' },
    { icon: GraduationCap, label: 'Education', value: 'BS Information Technology', color: 'text-secondary' },
    { icon: Code, label: 'Focus', value: 'Full Stack Development', color: 'text-primary' },
    { icon: Sparkles, label: 'Status', value: 'Available for work', color: 'text-green-400' },
  ]

  return (
    <section id="about" className="py-32 relative bg-dark overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-20 group-hover:opacity-30 blur-sm transition duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-surface aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">AN</span>
                  </div>
                  <p className="text-gray-400">Andrei Nyl Manliclic</p>
                </div>
              </div>
              
              {/* Experience Badge */}
              <div className="absolute -top-4 -right-4 bg-surface border border-primary/30 rounded-2xl p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2+</div>
                  <div className="text-xs text-gray-400">Years Exp.</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium tracking-widest uppercase text-sm mb-6 block">
              About Me
            </span>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white leading-tight">
              Full Stack Developer &
              <br />
              <span className="gradient-text">Coding Enthusiast</span>
            </h2>

            <div className="space-y-4 text-gray-400 leading-relaxed mb-8">
              <p>
                Hi, I'm <strong className="text-white">Andrei Nyl Manliclic</strong>, an aspiring full-stack developer 
                currently completing my Bachelor of Science in Information Technology. I'm passionate about creating 
                modern, user-friendly websites using cutting-edge technologies.
              </p>
              <p>
                My journey started with curiosity about how websites work, which led me to fall in love with 
                HTML, CSS, JavaScript, and Node.js. I also enjoy creating pixel art and designing intuitive 
                user interfaces that blend aesthetics with functionality.
              </p>
              <p>
                As a hearing-impaired developer, I've developed strong patience, observational skills, and 
                written communication abilities that help me stay focused and detail-oriented in my work.
              </p>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {infoCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-4"
                >
                  <card.icon className={`w-5 h-5 ${card.color} mb-2`} />
                  <div className="text-gray-400 text-sm mb-1">{card.label}</div>
                  <div className="text-white font-medium text-sm">{card.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-semibold text-white hover:scale-105 transition"
              >
                Let's Talk
              </a>
              <a
                href="#projects"
                className="px-8 py-4 border border-primary/30 rounded-full font-semibold text-white hover:bg-primary/10 transition"
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

export default About