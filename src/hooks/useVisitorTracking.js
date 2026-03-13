import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export const useVisitorTracking = () => {
  const [visitorCount, setVisitorCount] = useState(0)

  useEffect(() => {
    trackVisit()
    fetchVisitorCount()
  }, [])

  const trackVisit = async () => {
    try {
      const { error } = await supabase
        .from('visitors')
        .insert({
          ip_address: 'unknown',
          user_agent: navigator.userAgent
        })

      if (error) console.error('Error tracking visit:', error)
    } catch (err) {
      console.error('Failed to track visit:', err)
    }
  }

  const fetchVisitorCount = async () => {
    try {
      const { count, error } = await supabase
        .from('visitors')
        .select('*', { count: 'exact', head: true })

      if (error) {
        console.error('Error fetching visitor count:', error)
        return
      }

      setVisitorCount(count || 0)
    } catch (err) {
      console.error('Failed to fetch visitor count:', err)
    }
  }

  return { visitorCount }
}
