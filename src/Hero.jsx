import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, FileText } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-primary/40 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-[-50px] left-[-50px] w-[300px] h-[300px] bg-secondary/40 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-indigo-500/30 rounded-full blur-[100px] animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary font-medium mb-4 tracking-widest uppercase text-sm">
            Full Stack Developer
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
            Andrei Nyl
            <br />
            <span className="gradient-text">Manliclic</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Building modern web experiences with React.js, Node.js, and clean code.
          </p>
          <p className="text-gray-500 max-w-xl mx-auto mb-12 text-base leading-relaxed">
            Junior Full Stack Developer from the Philippines specializing in creating 
            responsive, user-friendly web applications with modern technologies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-8 py-4 bg-white text-dark rounded-full font-semibold hover:shadow-2xl hover:shadow-primary/25 transition-all"
            >
              View Projects
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/20 rounded-full font-semibold hover:bg-white/5 transition-all"
            >
              Get in Touch
            </motion.a>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <a
              href="https://github.com/Cheps-s"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 glass-card text-sm hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <button className="flex items-center gap-2 px-4 py-2 glass-card text-sm hover:text-primary transition-colors">
              <FileText className="w-4 h-4" />
              Download CV
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <ArrowDown className="w-6 h-6 text-gray-500" />
      </motion.div>
    </section>
  )
}

export default Hero