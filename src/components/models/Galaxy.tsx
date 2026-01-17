import * as THREE from 'three'
import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei"

interface GalaxyProps {
  count?: number
}

const ProceduralGalaxy: React.FC<GalaxyProps> = ({ count = 60000 }) => {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const scl = new Float32Array(count)

    const radius = 10 // Slightly larger for subtleness
    const branches = 3
    const spin = 1.2

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const r = Math.random() * radius
      const branchAngle = ((i % branches) / branches) * Math.PI * 2
      const spinAngle = r * spin

      // Smoother randomness for a "misty" feel
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.6 * r
      const randomY = Math.pow(Math.random(), 4) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * r
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.6 * r

      pos[i3] = Math.cos(branchAngle + spinAngle) * r + randomX
      pos[i3 + 1] = randomY
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ

      col[i3] = Math.random()
      col[i3 + 1] = Math.random()
      col[i3 + 2] = Math.random()
      scl[i] = Math.random()
    }

    return [pos, col, scl]
  }, [count])

  useFrame((_state, delta) => {
    pointsRef.current.rotation.y += delta * 0.03 // Slower rotation
  })

  return (
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
          <bufferAttribute attach="attributes-aScale" count={count} array={scales} itemSize={1} />
        </bufferGeometry>
        <shaderMaterial
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            vertexColors
            transparent
            uniforms={{
              uTime: { value: 0 }
            }}
            vertexShader={`
          attribute float aScale;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            // Smaller size for subtlety
            gl_PointSize = aScale * 25.0 * (1.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
            fragmentShader={`
          varying vec3 vColor;
          void main() {
            float strength = distance(gl_PointCoord, vec2(0.5));
            strength = 1.0 - strength;
            // Lower power (2.0-4.0) = wider, softer glow. 
            // Higher power (10.0+) = tiny sharp sparks.
            strength = pow(strength, 4.0); 
            
            // Multiply by a low alpha (0.4) for extreme transparency
            gl_FragColor = vec4(vColor, strength * 0.4);
          }
        `}
        />
      </points>
  )
}

function Quasar() {
  const jetRef = useRef<THREE.Group>(null!)
  const coreRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Faster, tighter pulsing for a "highly energetic" look
    const s = 1 + Math.sin(t * 10) * 0.03
    coreRef.current.scale.set(s, s, s)
    if (jetRef.current) jetRef.current.rotation.y += 0.005
  })

  return (
      <group>
        {/* 1. The Event Horizon (The tiny black center) */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* 2. The High-Intensity Inner Glow (The 'hot' part) */}
        <mesh>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.9}
              blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* 3. The Soft Outer Halo (The 'bleed' part) */}
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshBasicMaterial
              color="#44aaff"
              transparent
              opacity={0.2}
              blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* 4. Concentrated Point Light */}
        {/* Cranked up intensity but lowered distance to keep it "small" but bright */}
        <pointLight intensity={100} distance={4} color="#00f2ff" />
        <pointLight intensity={40} distance={10} color="#ffffff" />

        <group ref={jetRef}>
          {/* You can re-add your subtle jets here if needed */}
        </group>
      </group>
  )
}

export default function Galaxy() {
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
          <ProceduralGalaxy count={100000} />
          <ProceduralGalaxy count={100000} />
          <ProceduralGalaxy count={100000} />
          <ProceduralGalaxy count={100000} />
          <Quasar />
          <ProceduralGalaxy count={100000} />
          <ProceduralGalaxy count={100000} /><ProceduralGalaxy count={100000} /><ProceduralGalaxy count={100000} />

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