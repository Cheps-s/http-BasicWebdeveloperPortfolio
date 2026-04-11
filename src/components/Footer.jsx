import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const socialLinks = [
  { icon: Github,   href: 'https://github.com/Cheps-s',              label: 'GitHub'   },
  { icon: Linkedin, href: 'https://www.linkedin.com',                 label: 'LinkedIn' },
  { icon: Twitter,  href: 'https://twitter.com',                      label: 'Twitter'  },
  { icon: Mail,     href: 'mailto:manliclicandrei58@gmail.com',        label: 'Email'    },
]

const navLinks = ['Home', 'About', 'Projects', 'Skills', 'Experience', 'Services', 'Blog', 'Contact']

export default function Footer() {
  const scrollTo = (id) => {
    if (id === 'Home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    document.querySelector(`#${id.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t" style={{ backgroundColor: '#050508', borderTopColor: 'rgba(255,255,255,0.05)' }}>
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: '500px', height: '1px', background: 'linear-gradient(to right,transparent,rgba(168,85,247,0.4),transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div
              className="text-2xl font-display font-bold mb-4 inline-block gradient-text"
              style={{ cursor: 'default' }}
            >
              ANM
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Crafting user-friendly web experiences with modern design, clean code, and responsive interfaces.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Quick Links</div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((name) => (
                <button
                  key={name}
                  onClick={() => scrollTo(name)}
                  className="text-left text-sm text-gray-500 hover:text-purple-400 transition-colors w-fit"
                >
                  {name}
                </button>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Connect</div>
            <div className="flex flex-wrap gap-3 mb-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 hover:scale-110 transition-all border"
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-600">Available for freelance and collaboration.</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <span>© {new Date().getFullYear()} Andrei Nyl Manliclic. All rights reserved.</span>
          <span>Built with React &amp; Tailwind CSS</span>
        </div>
      </div>
    </footer>
  )
}
