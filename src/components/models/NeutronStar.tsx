import { useRef } from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import * as THREE from 'three'
import {OrbitControls} from "@react-three/drei";

function Model() {
    const mainRef = useRef<THREE.Group>(null!)
    const coreRef = useRef<THREE.Mesh>(null!)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const pulseLight = useRef<THREE.PointLight>(null!)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        // 1. Extreme Spin: Pulsars rotate at incredible speeds
        mainRef.current.rotation.y = t * 15
        mainRef.current.rotation.z = Math.sin(t * 0.2) * 0.2 // Slight "wobble"

        // 2. High-Frequency Pulsing
        const pulse = Math.sin(t * 20) * 0.5 + 0.5
        if (pulseLight.current) {
            pulseLight.current.intensity = 40 + pulse * 60
        }

        // 3. Core "Vibration"
        const s = 1 + Math.sin(t * 50) * 0.02
        coreRef.current.scale.set(s, s, s)
    })

    return (
        <group ref={mainRef}>
            {/* The Core: Very small, very bright */}
            <mesh ref={coreRef}>
                <sphereGeometry args={[0.08, 32, 32]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Inner Glow (Blue/Violet) */}
            <mesh>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshBasicMaterial
                    color="#88ccff"
                    transparent
                    opacity={0.8}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Extreme Point Light */}
            <pointLight ref={pulseLight} distance={6} color="#00ffff" />

            {/* Pulsar Jets: Thin, bright needles of light */}
            <group>
                {/* Top Jet */}
                <mesh position={[0, 3, 0]}>
                    <cylinderGeometry args={[0.005, 0.15, 6, 16, 1, true]} />
                    <meshBasicMaterial
                        color="#00ffff"
                        transparent
                        opacity={0.6}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
                {/* Bottom Jet */}
                <mesh position={[0, -3, 0]}>
                    <cylinderGeometry args={[0.15, 0.005, 6, 16, 1, true]} />
                    <meshBasicMaterial
                        color="#00ffff"
                        transparent
                        opacity={0.6}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            </group>

            {/* Magnetic Field "Halo" */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.3, 0.01, 16, 100]} />
                <meshBasicMaterial color="#4488ff" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
            </mesh>
        </group>
    )
}

export default function NeutronStar()
{
    return (
        <div style={{ width: "100%", height: "100vh", position: 'relative' }}>
            <Canvas
                // 1. Setup for transparent background
                gl={{ antialias: true, alpha: true }}
                camera={{ position: [0, 10, 20], fov: 45 }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0); // Set alpha to 0
                }}
            >
                {/* Removed <color attach="background" /> */}
                <ambientLight intensity={1} />
                {/* Using fewer instances for better performance and subtlety */}
                <Model/>
                <OrbitControls
                    autoRotate
                    autoRotateSpeed={0.2}
                    enableZoom={true}
                    enablePan={false}
                />
            </Canvas>
        </div>
    )
}