import React from 'react'
import { Github, Linkedin, Twitter, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Cheps-s', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ]

  return (
    <footer className="py-8 border-t border-white/5 bg-darker">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-bold gradient-text">ANM</span>
            <span className="text-gray-500 text-sm">
              © {currentYear} Andrei Nyl Manliclic. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-gray-600 flex items-center justify-center gap-1">
          Made with <Heart className="w-3 h-3 text-secondary fill-secondary" /> using React & Node.js
        </div>
      </div>
    </footer>
  )
}

export default Footer