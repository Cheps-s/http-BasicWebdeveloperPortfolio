import { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  Menu, X, ChevronDown, ArrowDown, ArrowRight, 
  Mail, Github, Globe, Code2, Zap, Smartphone, Palette, 
  GraduationCap, Briefcase, Linkedin, Twitter 
} from 'lucide-react'
import './App.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [mouseDown, setMouseDown] = useState(false)
  const [visitorCount, setVisitorCount] = useState(0)
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('')

  // Connect to Node.js backend
  useEffect(() => {
    // Fetch visitor count from Node.js server
    fetchVisitorCount()
    
    // Track visit
    trackVisit()
  }, [])

  const fetchVisitorCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/visitors')
      setVisitorCount(response.data.count)
    } catch (error) {
      console.log('Backend not connected yet')
    }
  }

  const trackVisit = async () => {
    try {
      await axios.post('http://localhost:5000/api/visit')
    } catch (error) {
      console.log('Visit tracking failed')
    }
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('sending')
    
    try {
      const response = await axios.post('http://localhost:5000/api/contact', contactForm)
      setFormStatus('success')
      setContactForm({ name: '', email: '', message: '' })
      setTimeout(() => setFormStatus(''), 3000)
    } catch (error) {
      setFormStatus('error')
      setTimeout(() => setFormStatus(''), 3000)
    }
  }

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    const handleMouseDown = () => setMouseDown(true)
    const handleMouseUp = () => setMouseDown(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Smooth scroll
  const scrollToSection = (id) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="antialiased selection:bg-purple-500 selection:text-white bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <div 
        className="custom-cursor hidden md:block fixed w-5 h-5 border-2 border-purple-500 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform"
        style={{ 
          left: cursorPos.x - 10, 
          top: cursorPos.y - 10,
          transform: mouseDown ? 'scale(0.8)' : 'scale(1)'
        }}
      />

      {/* Navigation */}
      <nav className="fixed w-full z-50 nav-blur border-b border-white/5 transition-all duration-300" id="navbar">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#" className="text-2xl font-display font-bold gradient-text">ANM</a>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <button onClick={() => scrollToSection('#projects')} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Projects</button>
              <button onClick={() => scrollToSection('#skills')} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Skills</button>
              <button onClick={() => scrollToSection('#experience')} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Experience</button>
              <button onClick={() => scrollToSection('#contact')} className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all">Contact</button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#050508] border-t border-white/5">
            <div className="px-6 py-4 space-y-4">
              <button onClick={() => scrollToSection('#projects')} className="block text-gray-300 hover:text-white transition-colors w-full text-left">Projects</button>
              <button onClick={() => scrollToSection('#skills')} className="block text-gray-300 hover:text-white transition-colors w-full text-left">Skills</button>
              <button onClick={() => scrollToSection('#experience')} className="block text-gray-300 hover:text-white transition-colors w-full text-left">Experience</button>
              <button onClick={() => scrollToSection('#contact')} className="block text-purple-400 font-medium w-full text-left">Contact Me</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="hero-bg">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <div className="reveal active">
            <p className="text-purple-400 font-medium mb-4 tracking-widest uppercase text-sm">Full Stack Developer</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
              Andrei Nyl<br />
              <span className="gradient-text">Manliclic</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Building modern web experiences with clean design and scalable code.
            </p>
            <p className="text-gray-500 max-w-xl mx-auto mb-12 text-base leading-relaxed">
              I build modern, responsive websites and web applications using HTML, CSS, JavaScript, and Node.js. 
              I focus on clean UI, performance, and user experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => scrollToSection('#projects')}
                className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold overflow-hidden transition-all hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </span>
              </button>
              <button 
                onClick={() => scrollToSection('#contact')}
                className="px-8 py-4 border border-white/20 rounded-full font-semibold hover:bg-white/5 transition-all"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-500" />
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-32 relative bg-[#0a0a0f] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="reveal opacity-0 translate-y-[30px] transition-all duration-700 ease-out">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 group-hover:opacity-30 blur-sm transition"></div>
                <div className="relative rounded-2xl overflow-hidden border border-purple-500/20">
                  <img
                    src="/src/img/Profile.png"
                    alt="Andrei Nyl Manliclic"
                    className="w-full h-auto object-cover transition duration-700 hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      document.getElementById('fallback-avatar').style.display = 'flex'
                    }}
                  />
                  <div id="fallback-avatar" className="hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-purple-900 to-pink-900">
                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-[#13131f]/80 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-300">Available for work</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-[#13131f] border border-purple-500/30 rounded-2xl p-4 shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">2+</div>
                    <div className="text-xs text-gray-400">Years Exp.</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Side */}
            <div className="reveal opacity-0 translate-y-[30px] transition-all duration-700 ease-out">
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
                  Hi, I'm <strong className="text-white">Andrei Nyl Manliclic</strong>, and I am an aspiring full-stack developer who is about to complete my Bachelor of Science in Information Technology. I am interested in creating modern web sites that are user-friendly and utilize new technology to assist me in improving my skills as an aspiring full-stack developer.
                </p>
                <p>
                  I am interested in web sites because of my curiosity about them. From my curiosity about web sites, I fell in love with creating web sites using HTML, CSS, JavaScript, and learning more about programming using Node.js. I also fell in love with creating pixel art and designing user interfaces that are artistic and functional.
                </p>
                <p>
                  I am a person who is hearing-impaired. From being hearing-impaired, I learned that being patient and observant and being a good writer really helps me focus more on programming because it helps me avoid distractions while working online.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#13131f]/60 backdrop-blur border border-purple-500/10 rounded-xl p-4">
                  <div className="text-purple-400 text-sm mb-1">Location</div>
                  <div className="text-white font-medium">Philippines</div>
                </div>
                <div className="bg-[#13131f]/60 backdrop-blur border border-purple-500/10 rounded-xl p-4">
                  <div className="text-purple-400 text-sm mb-1">Education</div>
                  <div className="text-white font-medium">BS Information Technology</div>
                </div>
                <div className="bg-[#13131f]/60 backdrop-blur border border-purple-500/10 rounded-xl p-4">
                  <div className="text-purple-400 text-sm mb-1">Focus</div>
                  <div className="text-white font-medium">Full Stack Development</div>
                </div>
                <div className="bg-[#13131f]/60 backdrop-blur border border-purple-500/10 rounded-xl p-4">
                  <div className="text-purple-400 text-sm mb-1">Visitors</div>
                  <div className="text-white font-medium">{visitorCount.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button onClick={() => scrollToSection('#contact')} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white hover:scale-105 transition">
                  Let's Talk
                </button>
                <button onClick={() => scrollToSection('#projects')} className="px-8 py-4 border border-purple-500/30 rounded-full font-semibold text-white hover:bg-purple-500/10 transition">
                  View Work
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Featured Projects</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <a href="https://cheps-s.github.io/Chepsbook.com/#home" target="_blank" rel="noopener" className="reveal">
              <div className="glass-card rounded-2xl overflow-hidden group cursor-pointer h-full">
                <div className="h-64 relative overflow-hidden">
                  <img src="/src/img/Screenshot 2026-03-12 145728.png" alt="Chepsbook" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-xs text-purple-300">Social Website</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">Chepsbook</h3>
                  <p className="text-gray-400 text-sm mb-4">A social-style website with modern layout and responsive interface.</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">HTML</span>
                    <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">CSS</span>
                    <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">JavaScript</span>
                  </div>
                </div>
              </div>
            </a>

            {/* Project 2 */}
            <a href="https://cheps-s.github.io/Andreinyl.com" target="_blank" rel="noopener" className="reveal">
              <div className="glass-card rounded-2xl overflow-hidden group cursor-pointer h-full">
                <div className="h-64 relative overflow-hidden">
                  <img src="/src/img/Screenshot 2026-03-12 150045.png" alt="Portfolio" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-xs text-blue-300">Portfolio</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">Andrei Nyl Portfolio</h3>
                  <p className="text-gray-400 text-sm mb-4">A personal developer portfolio showcasing projects and skills.</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">HTML</span>
                    <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">CSS</span>
                    <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">JavaScript</span>
                  </div>
                </div>
              </div>
            </a>

            {/* Project 3 */}
            <a href="/src/parallax website/index.html" target="_blank" rel="noopener" className="reveal">
              <div className="glass-card rounded-2xl overflow-hidden group cursor-pointer h-full">
                <div className="h-64 relative overflow-hidden">
                  <img src="/src/img/Screenshot 2026-03-12 220038.png" alt="Parallax" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-xs text-blue-300">Parallax</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">Parallax Portfolio</h3>
                  <p className="text-gray-400 text-sm mb-4">My first portfolio with parallax scrolling and interactive elements.</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">HTML</span>
                    <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">CSS</span>
                    <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">JavaScript</span>
                  </div>
                </div>
              </div>
            </a>

            {/* Project 4 */}
            <a href="/src/Animation website/html/css/index.html" target="_blank" rel="noopener" className="reveal">
              <div className="glass-card rounded-2xl overflow-hidden group cursor-pointer h-full">
                <div className="h-64 relative overflow-hidden bg-gradient-to-br from-emerald-900/50 to-teal-900/50 flex items-center justify-center">
                  <span className="text-emerald-300 text-lg font-semibold">PixelHub</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">Animation Website</h3>
                  <p className="text-gray-400 text-sm mb-4">Interactive animations and modern web effects showcase.</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">HTML</span>
                    <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">CSS</span>
                    <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">Animation</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 relative bg-[#050508]/50">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Behind the Code</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                I am an aspiring Full Stack Developer currently studying web and software development. 
                I enjoy creating modern websites, exploring new technologies, and building small projects 
                that help me practice real-world skills.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="skill-tag px-6 py-3 rounded-full text-sm font-medium text-purple-300 cursor-default">HTML</span>
                <span className="skill-tag px-6 py-3 rounded-full text-sm font-medium text-purple-300 cursor-default">CSS</span>
                <span className="skill-tag px-6 py-3 rounded-full text-sm font-medium text-purple-300 cursor-default">JavaScript</span>
                <span className="skill-tag px-6 py-3 rounded-full text-sm font-medium text-pink-300 cursor-default">Node.js</span>
                <span className="skill-tag px-6 py-3 rounded-full text-sm font-medium text-pink-300 cursor-default">React</span>
                <span className="skill-tag px-6 py-3 rounded-full text-sm font-medium text-purple-300 cursor-default">Git</span>
                <span className="skill-tag px-6 py-3 rounded-full text-sm font-medium text-purple-300 cursor-default">Responsive Design</span>
              </div>
            </div>
            <div className="reveal grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-2xl text-center group hover:border-purple-500/30 transition-all">
                <Code2 className="w-8 h-8 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold mb-1">Clean Code</h4>
                <p className="text-xs text-gray-500">Maintainable & scalable</p>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center group hover:border-purple-500/30 transition-all mt-8">
                <Zap className="w-8 h-8 text-pink-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold mb-1">Performance</h4>
                <p className="text-xs text-gray-500">Optimized & fast</p>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center group hover:border-purple-500/30 transition-all">
                <Smartphone className="w-8 h-8 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold mb-1">Responsive</h4>
                <p className="text-xs text-gray-500">Mobile-first approach</p>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center group hover:border-purple-500/30 transition-all mt-8">
                <Palette className="w-8 h-8 text-pink-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold mb-1">UI/UX Design</h4>
                <p className="text-xs text-gray-500">User-centered design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Web Development</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Developing web applications using both frontend and backend technologies. 
              Experience working with HTML, CSS, JavaScript, and modern web tools.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="reveal glass-card p-8 rounded-2xl border-l-4 border-purple-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <GraduationCap className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-display font-bold mb-2 text-white">BS Information Technology | Full Stack Development</h3>
                <p className="text-purple-400 text-sm mb-3">College Course</p>
                <p className="text-gray-400 leading-relaxed">
                  My chosen degree program focused on programming, databases, networking, 
                  and modern software development technologies.
                </p>
              </div>
            </div>
            <div className="reveal glass-card p-8 rounded-2xl border-l-4 border-pink-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Briefcase className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-display font-bold mb-2 text-white">Freelance Student | Web Development</h3>
                <p className="text-pink-400 text-sm mb-3">Personal Development</p>
                <p className="text-gray-400 leading-relaxed">
                  Personal development and practice websites built to improve real-world skills, 
                  experiment with new technologies, and build a diverse portfolio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative bg-[#050508]">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <div className="reveal">
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">Let's Work Together</h2>
            <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">Have a project in mind? Let's create something amazing together.</p>
            
            {/* Contact Form */}
            <form onSubmit={handleContactSubmit} className="max-w-lg mx-auto mb-12 text-left space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                className="w-full px-6 py-4 bg-[#13131f] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                className="w-full px-6 py-4 bg-[#13131f] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                required
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                className="w-full px-6 py-4 bg-[#13131f] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                required
              ></textarea>
              <button 
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {formStatus === 'success' && <p className="text-green-400 text-center">Message sent successfully!</p>}
              {formStatus === 'error' && <p className="text-red-400 text-center">Failed to send. Please try again.</p>}
            </form>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a href="mailto:andreinmanliclic@gmail.com" className="group flex items-center gap-3 px-8 py-4 glass-card rounded-full hover:border-purple-500/50 transition-all">
                <Mail className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300 group-hover:text-white transition-colors">Email</span>
              </a>
              <a href="https://github.com/Cheps-s" target="_blank" rel="noopener" className="group flex items-center gap-3 px-8 py-4 glass-card rounded-full hover:border-purple-500/50 transition-all">
                <Github className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300 group-hover:text-white transition-colors">GitHub</span>
              </a>
              <a href="https://www.onlinejobs.ph/jobseekers/info/andreinmanliclic" target="_blank" rel="noopener" className="group flex items-center gap-3 px-8 py-4 glass-card rounded-full hover:border-purple-500/50 transition-all">
                <Globe className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300 group-hover:text-white transition-colors">OnlineJobs.ph</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-[#050508]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2024 Andrei Nyl Manliclic. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://github.com/Cheps-s" target="_blank" rel="noopener" className="text-gray-500 hover:text-purple-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App