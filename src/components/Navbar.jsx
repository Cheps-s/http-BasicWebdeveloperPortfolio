import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { i } from 'framer-motion/client'
import './Navbar.css'
const links = [
  { name: 'About',      href: '#about'      },
  { name: 'Projects',   href: '#projects'   },
  { name: 'Skills',     href: '#skills'     },
  { name: 'Services',   href: '#services'   },
  { name: 'Blog',       href: '#blog'       },
  { name: 'Experience', href: '#experience' },
]

export default function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'nav-blur border-b border-white/5 shadow-lg shadow-purple-900/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-display font-bold gradient-text">ANM</button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <button key={l.name} onClick={() => go(l.href)}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                {l.name}
              </button>
            ))}
            <button onClick={() => go('#contact')}
              className="px-6 py-2 rounded-full text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#a855f7,#ec4899)' }}>
              Hire Me
            </button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5" style={{ background: '#050508' }}>
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map(l => (
                <button key={l.name} onClick={() => go(l.href)}
                  className="text-left text-gray-300 hover:text-white transition-colors py-1">
                  {l.name}
                </button>
              ))}
              <button onClick={() => go('#contact')} className="text-left text-purple-400 font-semibold py-1">
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}