'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import CyberpunkText from './CyberpunkText'

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [activeField, setActiveField] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const section = sectionRef.current
    
    if (section) {
      gsap.fromTo(
        '.contact-title',
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          scrollTrigger: {
            trigger: section,
            start: 'top bottom-=100',
          }
        }
      )
      
      gsap.fromTo(
        '.contact-form',
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom-=100',
          }
        }
      )
    }
  }, [])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the form submission
    console.log('Form submitted:', formState)
    alert('Form submitted! (This is just a demo)')
  }
  
  const inputClasses = "w-full bg-black/30 border border-white/20 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
  
  return (
    <section ref={sectionRef} id="contact" className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute w-full h-full" style={{ 
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(100, 120, 255, 0.2) 0%, transparent 30%),
                            radial-gradient(circle at 80% 70%, rgba(120, 100, 255, 0.2) 0%, transparent 30%)` 
        }}></div>
      </div>
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} 
      ></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="contact-title text-4xl md:text-5xl font-bold mb-4">
              <CyberpunkText text="Get In Touch" className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600" />
            </h2>
            <p className="text-gray-400 text-lg">
              Ready to build your futuristic digital presence? Let's make it happen.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="contact-form space-y-6">
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={inputClasses}
                value={formState.name}
                onChange={handleChange}
                onFocus={() => setActiveField('name')}
                onBlur={() => setActiveField(null)}
              />
              {activeField === 'name' && (
                <div className="absolute inset-0 pointer-events-none border border-blue-500 rounded-md opacity-50"></div>
              )}
            </div>
            
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={inputClasses}
                value={formState.email}
                onChange={handleChange}
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField(null)}
              />
              {activeField === 'email' && (
                <div className="absolute inset-0 pointer-events-none border border-blue-500 rounded-md opacity-50"></div>
              )}
            </div>
            
            <div className="relative">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className={inputClasses}
                value={formState.message}
                onChange={handleChange}
                onFocus={() => setActiveField('message')}
                onBlur={() => setActiveField(null)}
              />
              {activeField === 'message' && (
                <div className="absolute inset-0 pointer-events-none border border-blue-500 rounded-md opacity-50"></div>
              )}
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Send Message</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}