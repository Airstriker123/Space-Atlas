import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function RotatingCube() {
    const meshRef = useRef<THREE.Mesh>(null!)

    // Auto rotation
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005
            meshRef.current.rotation.y += 0.01
        }
    })

    return (
        <mesh ref={meshRef} scale={1.6}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color="#7c3aed"
                metalness={0.6}
                roughness={0.2}
            />
        </mesh>
    )
}

export default function Logo3D() {
    return (
        <Canvas
            camera={{ position: [0, 0, 4], fov: 50 }}
            style={{ height: 400 }}
        >
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[3, 3, 3]} intensity={1.2} />

            {/* Cube */}
            <RotatingCube />

            {/* Mouse interaction */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.8}
            />
        </Canvas>
    )
}
