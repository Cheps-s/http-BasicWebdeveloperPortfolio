import { GraduationCap, Briefcase } from 'lucide-react'

const experiences = [
  {
    icon: GraduationCap,
    title: 'School Software Projects',
    role: 'Academic Development',
    desc: 'Web applications and academic coding projects developed during coursework, focusing on software engineering principles and modern web technologies.',
    borderColor: 'border-purple-500',
    iconColor: 'text-purple-400'
  },
  {
    icon: Briefcase,
    title: 'Freelance Practice Projects',
    role: 'Personal Development',
    desc: 'Personal development and practice websites built to improve real-world skills, experiment with new technologies, and build a diverse portfolio.',
    borderColor: 'border-pink-500',
    iconColor: 'text-pink-400'
  }
]

const Experience = () => {
  return (
    <section id="experience" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="reveal mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Projects & Collaborations</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">My journey through academic and personal projects</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <div 
              key={exp.title}
              className={`reveal glass-card p-8 rounded-2xl border-l-4 ${exp.borderColor} relative overflow-hidden group`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <exp.icon className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-display font-bold mb-2 text-white">{exp.title}</h3>
                <p className={`${exp.iconColor} text-sm mb-3`}>{exp.role}</p>
                <p className="text-gray-400 leading-relaxed">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience