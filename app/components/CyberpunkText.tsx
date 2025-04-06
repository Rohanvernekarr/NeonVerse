'use client'

import { useState, useEffect, useRef } from 'react'

interface CyberpunkTextProps {
  text: string
  className?: string
  glitchIntensity?: 'low' | 'medium' | 'high'
}

export default function CyberpunkText({ 
  text, 
  className = "", 
  glitchIntensity = 'medium' 
}: CyberpunkTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)
  
  // Glitch effect configuration
  const glitchConfig = {
    low: { chance: 0.01, duration: [50, 150] },
    medium: { chance: 0.03, duration: [50, 250] },
    high: { chance: 0.05, duration: [100, 350] }
  }
  
  // Random glitch characters
  const glitchChars = ''
  
  useEffect(() => {
    let intervalId: NodeJS.Timeout
    let timeoutId: NodeJS.Timeout
    
    // Function to randomly trigger glitch effect
    const checkGlitch = () => {
      if (Math.random() < glitchConfig[glitchIntensity].chance && !isGlitching) {
        setIsGlitching(true)
        
        // Set timeout to stop glitching
        const duration = Math.floor(
          Math.random() * 
          (glitchConfig[glitchIntensity].duration[1] - glitchConfig[glitchIntensity].duration[0]) + 
          glitchConfig[glitchIntensity].duration[0]
        )
        
        timeoutId = setTimeout(() => {
          setIsGlitching(false)
        }, duration)
      }
    }
    
    // Set interval to check for glitch trigger
    intervalId = setInterval(checkGlitch, 500)
    
    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [isGlitching, glitchIntensity])
  
  // Function to generate glitched text
  const getGlitchedText = () => {
    if (!isGlitching) return text
    
    return text.split('').map((char, index) => {
      // 30% chance to glitch a character
      if (Math.random() < 0.3) {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)]
      }
      return char
    }).join('')
  }
  
  return (
    <div 
      ref={textRef}
      className={`relative inline-block ${className}`}
      data-text={text}
    >
      <span className={`relative z-10 ${isGlitching ? 'opacity-90' : ''}`}>
        {isGlitching ? getGlitchedText() : text}
      </span>
      
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-0 text-red-500 opacity-70"
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)', 
              transform: `translate(${Math.random() * 3 - 1.5}px, ${Math.random() * 3 - 1.5}px)`,
              zIndex: 5
            }}
          >
            {getGlitchedText()}
          </span>
          <span 
            className="absolute top-0 left-0 text-cyan-500 opacity-70"
            style={{ 
              clipPath: 'polygon(0 45%, 100% 45%, 100% 100%, 0 100%)',
              transform: `translate(${Math.random() * 3 - 1.5}px, ${Math.random() * 3 - 1.5}px)`,
              zIndex: 5
            }}
          >
            {getGlitchedText()}
          </span>
        </>
      )}
    </div>
  )
}