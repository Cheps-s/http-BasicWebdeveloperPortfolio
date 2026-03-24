import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Globe, Phone, MessageCircle, Facebook, Send, CheckCircle } from 'lucide-react'

const links = [
  { icon: Mail,          label: 'Email',        value: 'manliclicandrei58@gmail.com',    href: 'mailto:manliclicandrei58@gmail.com' },
  { icon: Github,        label: 'GitHub',        value: 'github.com/Cheps-s',             href: 'https://github.com/Cheps-s' },
  { icon: Globe,         label: 'OnlineJobs.ph', value: 'View Profile',                   href: 'https://www.onlinejobs.ph/jobseekers/info/4776562' },
  { icon: Phone,         label: 'Phone',         value: '+63 976 161 9135',               href: 'tel:+639761619135' },
  { icon: MessageCircle, label: 'Discord',       value: 'Cheps-s',                        href: 'https://discord.com/users/997752848714567700' },
  { icon: Facebook,      label: 'Facebook',      value: 'facebook.com/Nyloys',            href: 'https://www.facebook.com/Nyloys' },
]

export default function Contact() {
  // Fixed: Empty form state for user input (placeholders show your info instead)
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    message: '' 
  })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:manliclicandrei58@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="py-32 relative" style={{ backgroundColor: '#050508' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top,rgba(168,85,247,0.07),transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">Let's Work Together</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Have a project in mind? Let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">

          {/* Contact links */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              I'm available for freelance work and open to new opportunities.
              Whether you have a project or just want to say hi — I'd love to hear from you!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {links.map((l, i) => (
                <motion.a key={l.label} href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:border-purple-500/50 transition-all group border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: 'rgba(168,85,247,0.12)' }}>
                    <l.icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500">{l.label}</div>
                    <div className="text-white text-sm font-medium truncate">{l.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                <input id="name" name="name" type="text" required
                  value={form.name} onChange={handleChange} placeholder="Andrei Nyl Manliclic"
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
                  style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.07)' }} />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Your Email</label>
                <input id="email" name="email" type="email" required
                  value={form.email} onChange={handleChange} placeholder="manliclicandrei58@gmail.com"
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
                  style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.07)' }} />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea id="message" name="message" required rows={5}
                  value={form.message} onChange={handleChange}
                  placeholder="Tell me about your project…"
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                  style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.07)' }} />
              </div>

              {sent && (
                <div className="flex items-center gap-2 p-4 rounded-xl text-green-400 text-sm border border-green-500/20 bg-green-500/10">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  Your email client is opening with the message pre-filled!
                </div>
              )}

              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-purple-500/25"
                style={{ background: 'linear-gradient(135deg,#a855f7,#ec4899)' }}>
                Send Message <Send className="w-5 h-5" />
              </motion.button>

              <p className="text-xs text-gray-600 text-center">
                This will open your email client with the message pre-filled.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}