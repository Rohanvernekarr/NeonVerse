'use client'

/** @jsxImportSource @react-three/fiber */

import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Animated Sun component
function AnimatedSun() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { invalidate } = useThree()
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.015
      invalidate()
    }
  })
  
  return (
    <Sphere args={[5, 100, 200]} ref={meshRef}>
      <MeshDistortMaterial 
        color="#ffd700"
        distort={0.3}
        speed={1.2}
        roughness={0.1}
        metalness={0.9}
        emissive="#ffd700"
        emissiveIntensity={0.5}
      />
    </Sphere>
  )
}

// Planet component
function Planet({ size, color, distance, speed }: { size: number, color: string, distance: number, speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const angleRef = useRef(0)
  const { invalidate } = useThree()

  useFrame(() => {
    if (meshRef.current) {
      angleRef.current += speed
      meshRef.current.position.x = Math.cos(angleRef.current) * distance
      meshRef.current.position.z = Math.sin(angleRef.current) * distance
      invalidate()
    }
  })

  return (
    <React.Fragment>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.1, distance + 0.1, 64]} />
        <meshBasicMaterial color="white" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      <Sphere ref={meshRef} args={[size, 32, 32]}>
        <meshStandardMaterial color={color} />
      </Sphere>
    </React.Fragment>
  )
}

export default function Scene() {
  return (
    <Canvas 
      camera={{ position: [0, 50, 150] }} 
      className="absolute inset-0"
      gl={{ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      }}
      dpr={[1, 2]}
      shadows
    >
      <color attach="background" args={['#000']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8860ff" />
      
      <AnimatedSun />
      
      <Planet size={1} color="gray" distance={10} speed={0.02} />
      <Planet size={1.5} color="orange" distance={15} speed={0.015} />
      <Planet size={2} color="blue" distance={22} speed={0.01} />
      <Planet size={1.8} color="red" distance={30} speed={0.008} />
      <Planet size={4} color="brown" distance={45} speed={0.005} />
      <Planet size={3.5} color="goldenrod" distance={60} speed={0.004} />
      <Planet size={2.8} color="lightblue" distance={75} speed={0.003} />
      <Planet size={2.5} color="blue" distance={90} speed={0.002} />

      {[...Array(200)].map((_, i) => (
        <Sphere key={i} args={[0.2, 16, 16]} position={[
          (Math.random() - 0.5) * 300,
          (Math.random() - 0.5) * 300,
          (Math.random() - 0.5) * 300
        ]}>
          <meshBasicMaterial color="white" />
        </Sphere>
      ))}

      <OrbitControls enableZoom={true} />
    </Canvas>
  )
} 