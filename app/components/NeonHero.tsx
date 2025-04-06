'use client'

import { useEffect, useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'

// Create a separate component for the 3D scene
const Scene = dynamic(() => import('./Scene'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />
})

export default function CosmicExperience() {
  const heroRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Text reveal animation
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        duration: 1.2,
        y: 100,
        opacity: 0,
        ease: 'power4.out',
        delay: 0.2,
      })
      
      gsap.from('.hero-subtitle', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'power4.out',
        delay: 0.5,
      })
      
      gsap.from('.hero-cta', {
        duration: 1,
        opacity: 0,
        y: 30,
        ease: 'power3.out',
        delay: 0.8,
      })
    }, heroRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} 
      ></div>
      
      <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
        <Scene />
      </Suspense>

      <div className="absolute inset-0 flex items-center z-10 pointer-events-none">
        <div className="max-w-4xl px-6 md:px-12">
          <h1 className="hero-title text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Cosmic Explorer
            </span>
            <span className="text-white">Journey Through Space</span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mt-4">
            Witness the beauty of our solar system with interactive celestial exploration.
          </p>

          <div className="hero-cta flex gap-4 mt-4">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30">
              Start Journey
            </button>
            <button className="px-8 py-3 rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 text-white">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 