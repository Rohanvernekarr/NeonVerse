import * as THREE from 'three'
import { ReactThreeFiber, Object3DNode } from '@react-three/fiber'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Core Three.js elements
      group: Object3DNode<THREE.Group, typeof THREE.Group>
      mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>
      primitive: ReactThreeFiber.Object3DNode<THREE.Object3D, typeof THREE.Object3D>
      
      // Geometries
      ringGeometry: Object3DNode<THREE.RingGeometry, typeof THREE.RingGeometry>
      sphereGeometry: ReactThreeFiber.BufferGeometryNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>
      
      // Materials
      meshBasicMaterial: Object3DNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>
      meshStandardMaterial: Object3DNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>
      meshDistortMaterial: ReactThreeFiber.MaterialNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>
      
      // Lights
      ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>
      directionalLight: Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>
      pointLight: Object3DNode<THREE.PointLight, typeof THREE.PointLight>
      
      // Other
      color: Object3DNode<THREE.Color, typeof THREE.Color>
      orbitControls: ReactThreeFiber.Object3DNode<THREE.Object3D, typeof THREE.Object3D>
    }
  }
} 