import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import Hero3D from './Hero3D'

export default function Hero({ scrollToSection }) {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-20">
      {/* Background orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="min-h-screen flex items-center">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center w-full py-20">

            {/* Left: Text content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="space-y-8 text-center lg:text-left"
            >
              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold font-mono"
                style={{
                  background: 'rgba(56,189,248,0.08)',
                  border: '1px solid rgba(56,189,248,0.25)',
                  color: '#38bdf8',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                Available for work
              </motion.span>

              {/* Title */}
              <h1
                className="font-display font-extrabold leading-tight"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', letterSpacing: '-0.04em' }}
              >
                <span className="block text-white dark:text-white" style={{ color: 'var(--text-h, #fff)' }}>Nylz</span>
                <span className="block text-white dark:text-white">Software</span>
                <span className="block gradient-text">Developer</span>
              </h1>

              {/* Sub */}
              <p className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                software developer crafting performant, beautiful web applications
                with a passion for clean code and thoughtful UX.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('#projects')}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-slate-950 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                  style={{ background: '#38bdf8' }}
                >
                  View My Work
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border text-white transition-all hover:bg-white/5"
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  Let's Talk
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 justify-center lg:justify-start pt-2">
                {[
                  { num: '3+', label: 'Years Exp.' },
                  { num: '10+', label: 'Projects' },
                  { num: '1+', label: 'Clients' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-mono text-3xl font-bold" style={{ color: '#38bdf8' }}>{s.num}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: 3D Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="flex justify-center lg:justify-end"
            >
              <Hero3D />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll</span>
        </div>
      </div>
    </section>
  )
}
