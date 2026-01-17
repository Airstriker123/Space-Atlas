import * as THREE from 'three'
import React, { useEffect } from 'react'
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei'
import { Canvas } from "@react-three/fiber"
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import type { GLTF } from 'three-stdlib'

type ActionName = 'SphereAction'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: { Sphere: THREE.Mesh }
  materials: { ['Material.002']: THREE.MeshBasicMaterial }
  animations: GLTFAction[]
}

function Model(props: JSX.IntrinsicElements['group']) {
  const group = React.useRef<THREE.Group>(null!)
  const { nodes, materials, animations } = useGLTF('/3D/neutronstar-transformed.glb') as GLTFResult
  const { actions } = useAnimations(animations, group)

  // Autoplay the animation
  useEffect(() => {
    if (actions['SphereAction']) {
      actions['SphereAction'].play()
    }
  }, [actions])

  return (
      <group
          position={[0, -2 , 0]}
          ref={group} {...props} dispose={null}>
        <group name="Scene">
          <mesh
              name="Sphere"
              geometry={nodes.Sphere.geometry}
              rotation={[2.945, -0.837, 2.879]}
          >
            {/* We override the material here to make it glow intensely */}
            <meshBasicMaterial
                map={materials['Material.002'].map} // Keep your texture
                color={[0.5, 1, 10]} // Red: 0.5, Green: 1, Blue: 10
                toneMapped={false}   // Crucial: allows the blue to "over-brighten"
            />
          </mesh>
        </group>
      </group>
  )
}

export default function NeutronStar(){
  return (
      <Canvas
          camera={{ position: [0, 0, 14], fov: 300 }}
          style={{ width: "100%", height: "100%", background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} />

        <Model />
        {/* Post-processing for the Glow */}
        <EffectComposer>
          <Bloom
              intensity={5.0} // Strength of the glow
              luminanceThreshold={0.5} // Only glow things that are "over-bright"
              mipmapBlur
          />
        </EffectComposer>

        <OrbitControls
            autoRotate
            autoRotateSpeed={3}
            enableZoom={true}
            enablePan={false}
        />
      </Canvas>
  )
}


useGLTF.preload('/3D/neutronstar-transformed.glb')