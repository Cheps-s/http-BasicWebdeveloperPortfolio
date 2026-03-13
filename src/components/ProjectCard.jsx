import React from "react"

export default function ProjectCard({ project }) {
  return (
    <a href={project.link} target="_blank" rel="noopener">
      <div className="reveal glass-card rounded-2xl overflow-hidden group cursor-pointer">

        <div className="h-64 relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm mb-4">
            {project.description}
          </p>

          <div className="flex gap-2 flex-wrap">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </a>
  )
}
