import { useEffect, useRef } from 'react'

export default function Hero3D() {
  const wrapperRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const card = cardRef.current
    if (!wrapper || !card) return

    const handleMove = (e) => {
      const rect = wrapper.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)

      card.style.transform = `rotateX(${ -dy * 14 }deg) rotateY(${ dx * 18 }deg) translateZ(20px)`
    }

    const handleLeave = () => {
      card.style.transform = 'rotateX(8deg) rotateY(-15deg) translateZ(20px)'
    }

    wrapper.addEventListener('mousemove', handleMove)
    wrapper.addEventListener('mouseleave', handleLeave)

    return () => {
      wrapper.removeEventListener('mousemove', handleMove)
      wrapper.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div ref={wrapperRef} className="hero-3d-wrapper" id="hero-card-wrapper">
      <div ref={cardRef} className="hero-3d-card" id="hero-3d-card">
        <div className="card-face card-front">
          <div className="card-screen">
            <div className="code-lines">
              <div className="code-line"><span className="c-keyword">const</span> <span className="c-var">dev</span> = {'{'}</div>
              <div className="code-line pl-2"><span className="c-key">name</span>: <span className="c-str">"Andrei Nyl"</span>,</div>
              <div className="code-line pl-2"><span className="c-key">role</span>: <span className="c-str">"Full-Stack Dev"</span>,</div>
              <div className="code-line pl-2"><span className="c-key">stack</span>: [<span className="c-str">"React"</span>, <span className="c-str">"Node"</span>],</div>
              <div className="code-line pl-2"><span className="c-key">coffee</span>: <span className="c-num">Infinity</span></div>
              <div className="code-line">{'};'}</div>
              <div className="code-line mt-2"><span className="c-keyword">export default</span> dev<span className="cursor-blink">|</span></div>
            </div>
          </div>
          <div className="card-status">
            <span className="status-dot" />
            <span>Online & Building</span>
          </div>
        </div>
        <div className="ring ring-1" />
        <div className="ring ring-2" />
      </div>
    </div>
  )
}

