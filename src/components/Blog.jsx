import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Tag, ArrowRight, BookOpen } from 'lucide-react'

const posts = [
  {
    title: 'How I Built My First Portfolio Website',
    excerpt: "A look back at my very first attempt at building a personal portfolio — the mistakes I made, what I learned, and how far I've come since.",
    date: 'March 2026', readTime: '4 min read',
    tag: 'Personal', tagColor: 'text-purple-300 bg-purple-600/10 border-purple-500/20',
    bar: 'linear-gradient(to right,rgba(168,85,247,0.6),rgba(236,72,153,0.6))',
  },
  {
    title: 'Getting Started with Tailwind CSS',
    excerpt: "Tailwind completely changed how I write CSS. Here's a beginner-friendly breakdown of utility-first styling and why it's worth learning.",
    date: 'February 2026', readTime: '5 min read',
    tag: 'Tutorial', tagColor: 'text-blue-300 bg-blue-600/10 border-blue-500/20',
    bar: 'linear-gradient(to right,rgba(59,130,246,0.6),rgba(99,102,241,0.6))',
  },
  {
    title: 'Using AI Tools to Speed Up Development',
    excerpt: "From GitHub Copilot to Claude AI, here's how I've been using AI assistants to write better code faster — and where they still fall short.",
    date: 'January 2026', readTime: '6 min read',
    tag: 'AI', tagColor: 'text-cyan-300 bg-cyan-600/10 border-cyan-500/20',
    bar: 'linear-gradient(to right,rgba(6,182,212,0.6),rgba(59,130,246,0.6))',
  },
  {
    title: 'My Journey Learning Node.js as a Frontend Dev',
    excerpt: "Switching from purely frontend work to building backend APIs with Node.js and Express was a turning point. Here's what surprised me most.",
    date: 'December 2025', readTime: '7 min read',
    tag: 'Backend', tagColor: 'text-green-300 bg-green-600/10 border-green-500/20',
    bar: 'linear-gradient(to right,rgba(16,185,129,0.6),rgba(20,184,166,0.6))',
  },
  {
    title: 'Why I Started Learning Figma as a Developer',
    excerpt: "Most developers skip design tools — but learning Figma made me a significantly better developer. Here's the case for developers learning design.",
    date: 'November 2025', readTime: '4 min read',
    tag: 'Design', tagColor: 'text-orange-300 bg-orange-600/10 border-orange-500/20',
    bar: 'linear-gradient(to right,rgba(249,115,22,0.6),rgba(236,72,153,0.6))',
  },
  {
    title: 'Being a Hearing-Impaired Developer: My Story',
    excerpt: "A personal reflection on navigating the tech world as a hearing-impaired person — the challenges, the advantages, and the mindset that keeps me going.",
    date: 'October 2025', readTime: '8 min read',
    tag: 'Personal', tagColor: 'text-purple-300 bg-purple-600/10 border-purple-500/20',
    bar: 'linear-gradient(to right,rgba(168,85,247,0.6),rgba(99,102,241,0.6))',
  },
]

export default function Blog() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="blog" className="py-32 relative overflow-hidden" style={{ background: 'rgba(5,5,8,0.5)' }}>
      <div className="absolute bottom-0 right-0 pointer-events-none rounded-full"
        style={{ width: '500px', height: '400px', background: 'rgba(236,72,153,0.06)', filter: 'blur(120px)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-end justify-between flex-wrap gap-6"
        >
          <div>
            <span className="text-purple-400 font-medium tracking-widest uppercase text-sm mb-4 block">My Thoughts</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Blog</h2>
            <div className="h-1 w-20 rounded-full" style={{ background: 'linear-gradient(to right,#a855f7,#ec4899)' }} />
            <p className="text-gray-400 text-lg mt-6 max-w-2xl">
              Sharing what I learn — tutorials, personal stories, and thoughts on web development and tech.
            </p>
          </div>
          <a href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors">
            <BookOpen className="w-4 h-4" /> View all posts <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.a
              key={post.title}
              href="#"
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group block"
            >
              <div className="glass-card rounded-2xl overflow-hidden h-full hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1">
                <div className="h-1 w-full" style={{ background: post.bar }} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border flex items-center gap-1 ${post.tagColor}`}>
                      <Tag className="w-3 h-3" />{post.tag}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />{post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 leading-snug group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{post.date}</span>
                    <span className={`flex items-center gap-1 text-xs font-medium transition-all duration-300 ${hovered === i ? 'text-purple-400 gap-2' : 'text-gray-500'}`}>
                      Read more <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
