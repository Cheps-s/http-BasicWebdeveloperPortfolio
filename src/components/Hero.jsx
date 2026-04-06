import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Hero3D from './Hero3D'
import './Hero.css'

export default function Hero({ scrollToSection }) {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20" id="home">
      <div className="hero-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="hero max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="space-y-8 text-center lg:text-left"
          >
            <span className="hero-badge">
              <span className="badge-dot" />
              Available for work
            </span>

            <h1 className="hero-title">
              <span className="line line-1">Building</span>
              <span className="line line-2">Digital</span>
              <span className="line line-3">Experiences That Matter</span>
            </h1>

            <p className="hero-sub">
              Full-stack developer crafting performant, beautiful web applications with a passion for clean code and thoughtful UX.
            </p>

            <div className="hero-cta justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('#projects')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cyan-400 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-transform"
              >
                View My Work
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
              >
                Let's Talk
              </button>
            </div>

            <div className="hero-stats justify-center lg:justify-start">
              <div className="stat">
                <div className="stat-num" data-target="3">0</div>
                <span className="stat-plus">+</span>
                <span className="stat-label">Years Exp.</span>
              </div>
              <div className="stat">
                <div className="stat-num" data-target="24">0</div>
                <span className="stat-plus">+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat">
                <div className="stat-num" data-target="12">0</div>
                <span className="stat-plus">+</span>
                <span className="stat-label">Clients</span>
              </div>
            </div>
          </motion.div>

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