import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })

      if (error) throw error

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })

      setTimeout(() => setStatus(''), 5000)
    } catch (error) {
      console.error('Error sending message:', error)
      setStatus('error')
      setTimeout(() => setStatus(''), 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mb-12 text-left space-y-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        whileFocus={{ scale: 1.02 }}
        className="w-full px-6 py-4 bg-[#13131f] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
      />

      <motion.input
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        whileFocus={{ scale: 1.02 }}
        className="w-full px-6 py-4 bg-[#13131f] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
      />

      <motion.textarea
        placeholder="Your Message"
        rows="4"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
        whileFocus={{ scale: 1.02 }}
        className="w-full px-6 py-4 bg-[#13131f] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
      />

      {status && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-2 p-4 rounded-xl text-sm ${
            status === 'success'
              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}
        >
          {status === 'success' ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Message sent successfully!
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5" />
              Failed to send. Please try again.
            </>
          )}
        </motion.div>
      )}

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-purple-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="w-5 h-5" />
          </>
        )}
      </motion.button>
    </motion.form>
  )
}

export default ContactForm
