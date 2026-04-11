import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './index.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Services from './components/Services'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Simple fallback hooks (no Supabase dependency)
function useVisitorTracking() {
  const [visitorCount, setVisitorCount] = useState(() => {
    const stored = localStorage.getItem('visitorCount')
    if (!stored) {
      const count = Math.floor(Math.random() * 900) + 100
      localStorage.setItem('visitorCount', count)
      return count
    }
    return parseInt(stored, 10)
  })
  return { visitorCount }
}

function useProjects() {
  return { projects: [], loading: false }
}

function App() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [mouseDown, setMouseDown] = useState(false)
  const [theme, setTheme] = useState('dark')
  const { visitorCount } = useVisitorTracking()
  const { projects, loading } = useProjects()

  // Custom cursor
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

  // Theme
  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    if (theme === 'dark') {
      root.classList.add('dark')
      body.classList.remove('light-mode')
    } else {
      root.classList.remove('dark')
      body.classList.add('light-mode')
    }
  }, [theme])

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('show') }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <div className="antialiased selection:bg-purple-500 selection:text-white overflow-x-hidden">
      {/* Custom cursor */}
      <motion.div
        className="custom-cursor w-5 h-5 border-2 border-purple-500 rounded-full"
        animate={{ left: cursorPos.x - 10, top: cursorPos.y - 10, scale: mouseDown ? 0.7 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      <Navbar scrollToSection={scrollToSection} theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero scrollToSection={scrollToSection} />
        <About visitorCount={visitorCount} />
        <Projects projects={projects} loading={loading} />
        <Skills />
        <Experience />
        <Services />
        <Blog />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
