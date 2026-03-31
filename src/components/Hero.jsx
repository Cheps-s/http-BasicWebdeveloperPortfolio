import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Hero3D from './Hero3D'

export default function Hero() {
  const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated orb background */}
      <div className="hero-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <p className="text-gray-400 font-medium mb-4 tracking-widest uppercase text-sm">
            Full Stack Developer
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
            Andrei Nyl<br />
            <span className="gradient-text">Manliclic</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-4 font-light leading-relaxed">
            Building modern web experiences with clean design and scalable code.
          </p>
          <p className="text-gray-500 max-w-xl mx-auto mb-12 leading-relaxed">
            I build responsive websites and web apps using HTML, CSS, JavaScript, and Node.js —
            focused on clean UI, performance, and user experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button onClick={() => go('#projects')}
              className="group px-8 py-4 bg-white text-black rounded-full font-semibold hover:shadow-2xl hover:shadow-gray-500/50 hover:scale-105 transition-all flex items-center justify-center gap-2">
              View Projects
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
            <button onClick={() => go('#contact')}
              className="px-8 py-4 border border-white/20 rounded-full font-semibold hover:bg-white/5 transition-all">
              Get in Touch
            </button>
          </div>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, ease: 'easeOut' }}
           className="w-full flex justify-center"
        >
          <Hero3D />
        </motion.div>
      </div>

      {/* Bounce arrow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-gray-500" />
      </div>
    </section>
  )
}