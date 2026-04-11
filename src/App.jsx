import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import { useVisitorTracking } from './hooks/useVisitorTracking'
import { useProjects } from './hooks/useProjects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Project'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [mouseDown, setMouseDown] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { visitorCount } = useVisitorTracking()
  const { projects, loading } = useProjects()

  // Custom cursor tracking
  useEffect(() => {
    const onMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY })
    const onDown = () => setMouseDown(true)
    const onUp = () => setMouseDown(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  // Theme effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.body.classList.remove('light-mode')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.add('light-mode')
    }
  }, [theme])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="antialiased selection:bg-purple-500 selection:text-white bg-white text-black dark:bg-[#0a0a0f] dark:text-white overflow-x-hidden">

      {/* Custom cursor — hidden on mobile via CSS */}
      <motion.div
        className="custom-cursor hidden md:block fixed w-5 h-5 border-2 border-purple-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          left: cursorPos.x - 10,
          top: cursorPos.y - 10,
          scale: mouseDown ? 0.8 : 1
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      <Navbar
        scrollToSection={scrollToSection}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main>
        <Hero scrollToSection={scrollToSection} />
        <About visitorCount={visitorCount} scrollToSection={scrollToSection} />
        <Projects projects={projects} loading={loading} />
        <Skills />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App