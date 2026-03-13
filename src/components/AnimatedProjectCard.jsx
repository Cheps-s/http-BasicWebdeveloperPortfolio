import { motion } from 'framer-motion'
import { ExternalLink, Code2 } from 'lucide-react'

const AnimatedProjectCard = ({ project, index }) => {
  const getColorClasses = (category) => {
    const colors = {
      'Social Website': 'bg-purple-600/20 border-purple-500/30 text-purple-300',
      'Portfolio': 'bg-blue-600/20 border-blue-500/30 text-blue-300',
      'Full Stack': 'bg-emerald-600/20 border-emerald-500/30 text-emerald-300',
      'Game': 'bg-orange-600/20 border-orange-500/30 text-orange-300'
    }
    return colors[category] || 'bg-gray-600/20 border-gray-500/30 text-gray-300'
  }

  return (
    <motion.a
      href={project.live_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{
        y: -10,
        transition: { duration: 0.2 }
      }}
      className="group block h-full"
    >
      <div className="glass-card rounded-2xl overflow-hidden h-full">
        <div className="h-64 relative overflow-hidden">
          <motion.img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          <motion.div
            className="absolute bottom-4 left-4"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <span className={`px-3 py-1 rounded-full text-xs ${getColorClasses(project.category)}`}>
              {project.category}
            </span>
          </motion.div>

          <motion.div
            className="absolute top-4 right-4"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="p-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex gap-2 flex-wrap">
            {project.tags?.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.4 + i * 0.05 }}
                className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded flex items-center gap-1"
              >
                <Code2 className="w-3 h-3" />
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.a>
  )
}

export default AnimatedProjectCard
