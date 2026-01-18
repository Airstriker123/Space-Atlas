import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import type { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh
  }
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial
  }
}

function Planet() {
  const { nodes, materials } = useGLTF(
      "./3D/planet_earth-transformed.glb"
  ) as GLTFResult

  return (
      <mesh
          geometry={nodes.Object_2.geometry}
          material={materials["Material.001"]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.6}
          position={[0, -0.5, 0]} // x y z
      />
  )
}

useGLTF.preload("./3D/planet_earth-transformed.glb")

interface PlanetProp
{
  control: boolean;
}
export default function HeroPlanet({control}: PlanetProp)
{
  if (control) {
    return (
        <Canvas
            camera={{ position: [0, 0, 4], fov: 50 }}
            style={{ width: "100%", height: "100%" }}
        >
          {/* Lights */}
          <ambientLight intensity={1} />
          <directionalLight position={[3, 3, 3]} intensity={1.2} />

          {/* Model */}
          <Planet />

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
  else {
    return (
        <Canvas
            camera={{ position: [0, 0, 4], fov: 50 }}
            style={{ width: "100%", height: "100%" }}
        >
          {/* Lights */}
          <ambientLight intensity={1} />
          <directionalLight position={[3, 3, 3]} intensity={1.2} />

          {/* Model */}
          <Planet />

          {/* Controls */}
          <OrbitControls
              autoRotate
              autoRotateSpeed={3}
              enableZoom={false}
              enablePan={false}
              rotateSpeed={1}
          />
        </Canvas>
    )
  }
}
