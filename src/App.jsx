import { useState, useEffect } from 'react'
<<<<<<< HEAD
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, ChevronDown, ArrowDown,
  Mail, Github, Globe, Code2, Zap, Smartphone, Palette,
  GraduationCap, Briefcase, Phone, MessageCircle
} from 'lucide-react'
import './App.css'
import { useVisitorTracking } from './hooks/useVisitorTracking'
import { useProjects } from './hooks/useProjects'
import AnimatedSection from './components/AnimatedSection'
import AnimatedProjectCard from './components/AnimatedProjectCard'
import ContactForm from './components/ContactForm'
=======
import Navbar     from './components/Navbar'
import Hero       from './components/Hero'
import About      from './components/About'
import Projects   from './components/Project'
import Skills     from './components/Skills'
import Services   from './components/Services'
import Blog       from './components/Blog'
import Experience from './components/Experience'
import Contact    from './components/Contact'
import Footer     from './components/Footer'
>>>>>>> 9c898fb (update)

function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [mouseDown, setMouseDown] = useState(false)
<<<<<<< HEAD
  const { visitorCount } = useVisitorTracking()
  const { projects, loading } = useProjects()

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    const handleMouseDown = () => setMouseDown(true)
    const handleMouseUp = () => setMouseDown(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

=======

  // Custom cursor tracking
  useEffect(() => {
    const onMove  = (e) => setCursorPos({ x: e.clientX, y: e.clientY })
    const onDown  = ()  => setMouseDown(true)
    const onUp    = ()  => setMouseDown(false)
    window.addEventListener('mousemove',  onMove)
    window.addEventListener('mousedown',  onDown)
    window.addEventListener('mouseup',    onUp)
>>>>>>> 9c898fb (update)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [])

<<<<<<< HEAD
  const scrollToSection = (id) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="antialiased selection:bg-purple-500 selection:text-white bg-[#0a0a0f] text-white overflow-x-hidden">
      <motion.div
        className="custom-cursor hidden md:block fixed w-5 h-5 border-2 border-purple-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          left: cursorPos.x - 10,
          top: cursorPos.y - 10,
          scale: mouseDown ? 0.8 : 1
=======
  // Scroll-reveal — runs once after mount
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active')
      }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="antialiased" style={{ userSelect: 'none' }}>

      {/* Custom cursor — hidden on mobile via CSS */}
      <div
        className="custom-cursor"
        style={{
          left:      cursorPos.x - 10,
          top:       cursorPos.y - 10,
          transform: mouseDown ? 'scale(0.7)' : 'scale(1)',
>>>>>>> 9c898fb (update)
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

<<<<<<< HEAD
      <motion.nav
        className="fixed w-full z-50 nav-blur border-b border-white/5 transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.a
              href="#"
              className="text-2xl font-display font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ANM
            </motion.a>

            <div className="hidden md:flex space-x-8 items-center">
              {['projects', 'skills', 'experience'].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(`#${item}`)}
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.button>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#050508] border-t border-white/5"
            >
              <div className="px-6 py-4 space-y-4">
                {['projects', 'skills', 'experience', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(`#${item}`)}
                    className="block text-gray-300 hover:text-white transition-colors w-full text-left"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="hero-bg">
          <motion.div
            className="orb orb-1"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="orb orb-2"
            animate={{
              y: [0, 20, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="orb orb-3"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <AnimatedSection>
            <motion.p
              className="text-purple-400 font-medium mb-4 tracking-widest uppercase text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Full Stack Developer
            </motion.p>
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Andrei Nyl<br />
              <span className="gradient-text">Manliclic</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8 font-light leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Building modern web experiences with clean design and scalable code.
            </motion.p>
            <motion.p
              className="text-gray-500 max-w-xl mx-auto mb-12 text-base leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              I build modern, responsive websites and web applications using HTML, CSS, JavaScript, and Node.js.
              I focus on clean UI, performance, and user experience.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                onClick={() => scrollToSection('#projects')}
                className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold overflow-hidden transition-all hover:shadow-2xl hover:shadow-purple-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </motion.div>
                </span>
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="px-8 py-4 border border-white/20 rounded-full font-semibold hover:bg-white/5 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </AnimatedSection>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-gray-500" />
        </motion.div>
      </section>

      <section id="about" className="py-32 relative bg-[#0a0a0f] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection delay={0.2}>
              <div className="relative group">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 blur-sm"
                  animate={{ opacity: [0.2, 0.3, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative rounded-2xl overflow-hidden border border-purple-500/20">
                  <img
                    src="/src/img/Profile.png"
                    alt="Andrei Nyl Manliclic"
                    className="w-full h-auto object-cover transition duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent" />
                  <motion.div
                    className="absolute bottom-6 left-6 right-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="bg-[#13131f]/80 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-3 h-3 bg-green-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm text-gray-300">Available for work</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  className="absolute -top-4 -right-4 bg-[#13131f] border border-purple-500/30 rounded-2xl p-4 shadow-xl"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', delay: 0.3 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">2+</div>
                    <div className="text-xs text-gray-400">Years Exp.</div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="mb-6">
                <span className="text-purple-400 font-medium tracking-widest uppercase text-sm">About Me</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Basic Web Developer &<br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Coding Enthusiast
                </span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed mb-8">
                <p>
                  Hi, I'm <strong className="text-white">Andrei Nyl Manliclic</strong>, an aspiring full-stack developer completing my Bachelor of Science in Information Technology. I create modern, user-friendly websites using cutting-edge technologies.
                </p>
                <p>
                  My journey started with curiosity about how websites work, which led me to fall in love with HTML, CSS, JavaScript, and Node.js. I also enjoy creating pixel art and designing intuitive user interfaces that blend aesthetics with functionality.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Location', value: 'Philippines' },
                  { label: 'Education', value: 'BS Information Technology' },
                  { label: 'Focus', value: 'Full Stack Development' },
                  { label: 'Visitors', value: visitorCount.toLocaleString() }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="bg-[#13131f]/60 backdrop-blur border border-purple-500/10 rounded-xl p-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-purple-400 text-sm mb-1">{item.label}</div>
                    <div className="text-white font-medium">{item.value}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={() => scrollToSection('#contact')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white hover:scale-105 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let's Talk
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection('#projects')}
                  className="px-8 py-4 border border-purple-500/30 rounded-full font-semibold text-white hover:bg-purple-500/10 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Work
                </motion.button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="projects" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Featured Projects</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-16" />
          </AnimatedSection>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="glass-card rounded-2xl overflow-hidden h-96"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <AnimatedProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="skills" className="py-32 relative bg-[#050508]/50">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Behind the Code</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                I am an aspiring Full Stack Developer currently studying web and software development.
                I enjoy creating modern websites, exploring new technologies, and building small projects
                that help me practice real-world skills.
              </p>
              <div className="flex flex-wrap gap-3">
                {['HTML', 'CSS', 'JavaScript', 'Node.js', 'React', 'Git', 'Responsive Design'].map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="skill-tag px-6 py-3 rounded-full text-sm font-medium text-purple-300 cursor-default"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Code2, title: 'Clean Code', desc: 'Maintainable & scalable', color: 'text-purple-400' },
                { icon: Zap, title: 'Performance', desc: 'Optimized & fast', color: 'text-pink-400' },
                { icon: Smartphone, title: 'Responsive', desc: 'Mobile-first approach', color: 'text-purple-400' },
                { icon: Palette, title: 'UI/UX Design', desc: 'User-centered design', color: 'text-pink-400' }
              ].map((item, index) => (
                <AnimatedSection key={item.title} delay={index * 0.1}>
                  <motion.div
                    className={`glass-card p-6 rounded-2xl text-center group hover:border-purple-500/30 transition-all ${index % 2 === 1 ? 'mt-8' : ''}`}
                    whileHover={{ y: -10 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
                    </motion.div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Web Development</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Developing web applications using both frontend and backend technologies.
              </p>
            </div>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                icon: GraduationCap,
                title: 'BS Information Technology | Full Stack Development',
                role: 'College Course',
                desc: 'My chosen degree program focused on programming, databases, networking, and modern software development technologies.',
                color: 'border-purple-500'
              },
              {
                icon: Briefcase,
                title: 'Freelance Student | Web Development',
                role: 'Personal Development',
                desc: 'Personal development and practice websites built to improve real-world skills, experiment with new technologies, and build a diverse portfolio.',
                color: 'border-pink-500'
              }
            ].map((exp, index) => (
              <AnimatedSection key={exp.title} delay={index * 0.2}>
                <motion.div
                  className={`glass-card p-8 rounded-2xl border-l-4 ${exp.color} relative overflow-hidden group`}
                  whileHover={{ x: 10 }}
                >
                  <motion.div
                    className="absolute top-0 right-0 p-4 opacity-10"
                    whileHover={{ opacity: 0.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <exp.icon className="w-24 h-24" />
                  </motion.div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-display font-bold mb-2 text-white">{exp.title}</h3>
                    <p className="text-purple-400 text-sm mb-3">{exp.role}</p>
                    <p className="text-gray-400 leading-relaxed">{exp.desc}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 relative bg-[#050508]">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <AnimatedSection>
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">Let's Work Together</h2>
            <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">Have a project in mind? Let's create something amazing together.</p>

            <ContactForm />

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 flex-wrap">
              {[
                { icon: Mail, label: 'Email', href: 'mailto:manliclicandrei58@gmail.com' },
                { icon: Github, label: 'GitHub', href: 'https://github.com/Cheps-s' },
                { icon: Globe, label: 'OnlineJobs.ph', href: 'https://www.onlinejobs.ph/jobseekers/info/manliclicandrei58' },
                { icon: Phone, label: '+63 976 161 9135', href: 'tel:+639761619135' },
                { icon: MessageCircle, label: 'Discord', href: 'https://discord.com/users/997752848714567700' }
              ].map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener' : undefined}
                  className="group flex items-center gap-3 px-8 py-4 glass-card rounded-full hover:border-purple-500/50 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <link.icon className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <footer className="py-8 border-t border-white/5 bg-[#050508]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2024 Andrei Nyl Manliclic. All rights reserved.</p>
          <div className="flex gap-6">
            {[
              { icon: Github, href: 'https://github.com/Cheps-s' },
              { icon: Mail, href: 'mailto:manliclicandrei58@gmail.com' }
            ].map((social) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener"
                className="text-gray-500 hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
=======
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Services />
        <Blog />
        <Experience />
        <Contact />
      </main>
      <Footer />
>>>>>>> 9c898fb (update)
    </div>
  )
}

export default App
