import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import './Footer.css'

const socialLinks = [
  { icon: Github, href: 'https://github.com/Cheps-s', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:manliclicandrei58@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer>
      <div className="footer-top-line" />
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">ANM</div>
            <p className="footer-brand-desc">
              Crafting user-friendly web experiences with modern design, clean code, and responsive interfaces.
            </p>
          </div>

          <div>
            <div className="footer-col-title">Quick links</div>
            <nav className="footer-nav-list">
              <button className="footer-nav-link" type="button" onClick={() => document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' })}>
                Home
              </button>
              <button className="footer-nav-link" type="button" onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}>
                About
              </button>
              <button className="footer-nav-link" type="button" onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}>
                Projects
              </button>
            </nav>
          </div>

          <div>
            <div className="footer-col-title">Connect</div>
            <div className="footer-socials">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label={link.label}>
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
            <p className="footer-avail">Available for freelance and collaboration.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Andrei Nyl Manliclic. All rights reserved.</span>
          <span className="footer-heart">Built with React & Tailwind.</span>
        </div>
      </div>
    </footer>
  )
}
