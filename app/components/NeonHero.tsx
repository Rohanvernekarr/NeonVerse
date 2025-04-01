
'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import gsap from 'gsap'

// Animated sphere component
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })
  
  return (
    <Sphere args={[1, 100, 200]} ref={meshRef}>
      <MeshDistortMaterial 
        color="#4060ff" 
        attach="material" 
        distort={0.4} 
        speed={1.5} 
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  )
}

export default function FuturisticHero() {
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
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black"></div>
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} 
      ></div>
      
      {/* 3D Animation */}
      <div className="absolute right-0 w-full md:w-1/2 h-full">
        <Canvas>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8860ff" />
          <AnimatedSphere />
          <OrbitControls enableZoom={false} autoRotate />
        </Canvas>
      </div>
      
      {/* Hero content */}
      <div className="container mx-auto px-6 md:px-12 z-10">
        <div className="flex flex-col md:w-1/2 gap-6">
          <h1 className="hero-title text-5xl md:text-7xl font-bold">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              The Future
            </span>
            <span>Is Now</span>
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 max-w-md">
            Experience tomorrow's technology with our futuristic digital solutions.
          </p>
          
          <div className="hero-cta flex gap-4 mt-4">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30">
              Explore
            </button>
            <button className="px-8 py-3 rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}