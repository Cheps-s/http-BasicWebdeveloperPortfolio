import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Zap, Smartphone, Palette, Terminal, Brush, BrainCircuit, Globe } from 'lucide-react'
import { i } from 'framer-motion/client'
import './Skills.css'
const skillCategories = [
  { 
    title:'Frontend',
    icon:Code2,
    gradient:'linear-gradient(135deg,#a855f7,#c084fc)',
    skills:['HTML5','CSS3','JavaScript','React.js','Tailwind CSS','Responsive Design']
  },
  { 
    title:'Design Tools',
    icon:Brush,
    gradient:'linear-gradient(135deg,#f97316,#ec4899)',
    skills:['Figma','Adobe XD','Wireframing','Prototyping']
  },
  { 
    title:'AI Tools',
    icon:BrainCircuit,
    gradient:'linear-gradient(135deg,#06b6d4,#3b82f6)',
    skills:['ChatGPT','GitHub Copilot','Claude AI','AI-Assisted Dev']
  },
  { 
    title:'Tools & DevOps',
    icon:Terminal,
    gradient:'linear-gradient(135deg,#6366f1,#818cf8)',
    skills:['Git','GitHub','VS Code','Postman','Vercel','npm']
  },
]

const features = [
  { icon:Code2,        title:'Clean Code',   desc:'Maintainable & scalable', color:'text-purple-400' },
  { icon:Zap,          title:'Performance',  desc:'Optimized & fast',        color:'text-pink-400'   },
  { icon:Smartphone,   title:'Responsive',   desc:'Mobile-first approach',   color:'text-purple-400' },
  { icon:Palette,      title:'UI/UX Design', desc:'User-centered design',    color:'text-pink-400'   },
  { icon:BrainCircuit, title:'AI-Assisted',  desc:'Smart development',       color:'text-cyan-400'   },
  { icon:Globe,        title:'Web Projects', desc:'Interactive websites',    color:'text-indigo-400' },
]

const Skills = () => (
  <section id="skills" className="py-32 relative" style={{ background:'rgba(5,5,8,0.5)' }}>
    <div className="absolute inset-0 pointer-events-none"
      style={{ background:'linear-gradient(to bottom,transparent,rgba(168,85,247,0.04),transparent)' }} />

    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
        className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Technical Skills</h2>
        <div className="h-1 w-20 rounded-full mx-auto mb-6" style={{ background:'linear-gradient(to right,#a855f7,#ec4899)' }} />
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Focused on frontend development, design tools, and modern web technologies.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Skill category cards */}
        <div className="space-y-5">
          {skillCategories.map((cat, i) => (
            <motion.div key={cat.title}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: cat.gradient }}>
                  <cat.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(s => (
                  <span key={s} className="skill-tag px-4 py-2 rounded-full text-sm text-gray-300">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature cards */}
        <motion.div initial={{ opacity:0, x:50 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
          className="grid grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay: i * 0.1 }}
              className={`glass-card p-6 rounded-2xl text-center group hover:border-purple-500/30 transition-all ${i % 2 === 1 ? 'mt-8' : ''}`}
            >
              <f.icon className={`w-8 h-8 ${f.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
              <h4 className="font-semibold mb-1">{f.title}</h4>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
)

export default Skills
