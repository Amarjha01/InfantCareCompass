import { useState, useEffect } from "react"
import { ChevronDown } from 'lucide-react'

const FloatingScrollToBottom = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Show button when user is not already at the bottom
  const handleScroll = () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100

    setScrollProgress(scrollPercent)
    setIsVisible(scrollTop < docHeight - 300) 
  }

  // Scroll to bottom smoothly
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-8 left-8 z-50 group"
          aria-label="Scroll to bottom"
        >
          {/* Progress Ring */}
          <div className="relative">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 56 56">
              {/* Background Circle */}
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="3"
              />
              {/* Progress Circle */}
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="url(#gradientDown)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 24}`}
                strokeDashoffset={`${2 * Math.PI * 24 * (scrollProgress / 100)}`} 
                className="transition-all duration-300 ease-out"
              />
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="gradientDown" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Button Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 ease-out">
                <ChevronDown className="w-5 h-5 text-white group-hover:animate-bounce" />
              </div>
            </div>
          </div>
        </button>
      )}
    </>
  )
}

export default FloatingScrollToBottom
