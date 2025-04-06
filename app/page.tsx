'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import NeonNav from './components/NeonNav'
import SmoothScroll from './components/SmoothScroll'
import NeonHero from './components/NeonHero';
import NeonFeatures from './components/NeonFeatures';
import NeonFooter from './components/NeonFooter';
import ContactSection from './components/ContactSection'
import ParticleBackground from './components/ParticleBackground'
import TechStack from './components/TechStack'


export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize page animations
    const ctx = gsap.context(() => {
      gsap.from('.fade-in', {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <SmoothScroll>
      <div ref={mainRef} className="min-h-screen bg-black text-white">
      <ParticleBackground />
        <NeonNav />
        <main>
          <NeonHero/>
          <NeonFeatures/>
          <TechStack />
          <ContactSection />
        </main>
        <NeonFooter />  <ParticleBackground />
      </div>
    </SmoothScroll>
  )
}