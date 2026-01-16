import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF,  } from "@react-three/drei"
import type { GLTF } from "three-stdlib"


type GLTFResult = GLTF & {
    nodes: {
        jupiter1_A_jupiter1_A_0: THREE.Mesh
        jupiter2_B001_jupiter2_B_0: THREE.Mesh
        jupiter2_B001_jupiter2_A_0: THREE.Mesh
    }
    materials: {
        jupiter1_A: THREE.MeshStandardMaterial
        jupiter2_B: THREE.MeshStandardMaterial
        jupiter2_A: THREE.MeshStandardMaterial
    }
    animations: THREE.AnimationClip[]
}

function Model(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/3D/jupiter-transformed.glb') as GLTFResult
    return (
        <group {...props} dispose={null}>
            <mesh position={[0, 1, 0]}  geometry={nodes.jupiter1_A_jupiter1_A_0.geometry} material={materials.jupiter1_A} rotation={[-1.718, -0.288, -0.943]} scale={0.002} />
            <mesh position={[0, 1, 0]}  geometry={nodes.jupiter2_B001_jupiter2_B_0.geometry} material={materials.jupiter2_B} rotation={[-1.718, -0.288, -0.943]} scale={0} />
            <mesh position={[0,  1, 0]}  geometry={nodes.jupiter2_B001_jupiter2_A_0.geometry} material={materials.jupiter2_A} rotation={[-1.718, -0.288, -0.943]} scale={0} />
        </group>
    )
}

useGLTF.preload('/3D/jupiter-transformed.glb')

export default function Jupiter() {
  return (
      <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
      >
          {/* Lights */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 3, 3]} intensity={1.2} />

          {/* Model */}
          <Model />

          {/* Controls */}
          <OrbitControls
              autoRotate
              autoRotateSpeed={3}
              enableZoom={true}
              enablePan={false}
              rotateSpeed={1}
          />
      </Canvas>
  )
}
