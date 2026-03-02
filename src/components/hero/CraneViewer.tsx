"use client"

import React, { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

export type CraneConfig = "standard" | "heavy" | "dual-hoist"

interface Props {
  selectedConfig: CraneConfig
  onSelectConfig?: (cfg: CraneConfig) => void
}

function CraneModel({ selectedConfig, onSelectConfig }: Props) {
  const group = useRef<THREE.Group>(null)
  const trolley = useRef<THREE.Group>(null)
  const cable = useRef<THREE.Mesh>(null)

  const movement = useMemo(() => {
    switch (selectedConfig) {
      case "heavy":
        return { speed: 0.6, span: 1.5, cable: 1.6 }
      case "dual-hoist":
        return { speed: 1, span: 2, cable: 1.3 }
      default:
        return { speed: 0.8, span: 1.8, cable: 1.4 }
    }
  }, [selectedConfig])

  const color = selectedConfig === "heavy" ? "#e11d48" : selectedConfig === "dual-hoist" ? "#06b6d4" : "#fb923c"

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.2) * 0.05
    }

    if (trolley.current) {
      trolley.current.position.x = Math.sin(t * movement.speed) * movement.span
    }

    if (cable.current) {
      const dynamicCable = movement.cable + Math.sin(t * movement.speed + 1.2) * 0.25
      cable.current.scale.y = Math.max(0.7, dynamicCable)
      cable.current.position.y = 0.6 - cable.current.scale.y * 0.6
    }
  })

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      <mesh position={[0, -0.95, 0]} receiveShadow>
        <boxGeometry args={[7.8, 0.35, 3.2]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      <mesh position={[-3.1, 1.1, 0]} castShadow onClick={() => onSelectConfig?.("standard")}>
        <boxGeometry args={[0.35, 4, 0.35]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position={[3.1, 1.1, 0]} castShadow onClick={() => onSelectConfig?.("standard")}>
        <boxGeometry args={[0.35, 4, 0.35]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position={[0, 3.1, 0]} castShadow onClick={() => onSelectConfig?.("heavy")}>
        <boxGeometry args={[6.7, 0.28, 0.28]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <group ref={trolley} position={[0, 2.7, 0]} onClick={() => onSelectConfig?.("dual-hoist")}>
        <mesh castShadow>
          <boxGeometry args={[0.65, 0.38, 0.38]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>

        <mesh ref={cable} position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 1.2, 12]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>

        <mesh position={[0, -1.2, 0]} castShadow>
          <torusKnotGeometry args={[0.15, 0.04, 64, 10]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.6} roughness={0.3} />
        </mesh>

        {selectedConfig === "dual-hoist" ? (
          <mesh position={[0.4, -1.2, 0]} castShadow>
            <sphereGeometry args={[0.1, 18, 18]} />
            <meshStandardMaterial color="#67e8f9" emissive="#155e75" emissiveIntensity={0.5} />
          </mesh>
        ) : null}
      </group>

      <mesh position={[0, -1.07, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[2.5, 2.6, 64]} />
        <meshStandardMaterial color={color} transparent opacity={0.32} />
      </mesh>

      <mesh position={[0, -1.15, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.1, 64]} />
        <meshStandardMaterial color="#020617" />
      </mesh>
    </group>
  )
}

function SceneLights() {
  return (
    <>
      <hemisphereLight intensity={0.45} color="#f8fafc" groundColor="#0f172a" />
      <directionalLight
        position={[5, 7, 6]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-5, 2, -3]} intensity={0.5} color="#f97316" />
      <pointLight position={[3, 3, 4]} intensity={0.4} color="#22d3ee" />
    </>
  )
}

function SceneBackdrop() {
  return (
    <group>
      <mesh position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#0b1220" />
      </mesh>

      <mesh position={[0, 4, -7]}>
        <planeGeometry args={[24, 10]} />
        <meshBasicMaterial color="#09111e" />
      </mesh>

      {Array.from({ length: 16 }).map((_, index) => {
        const x = -7 + (index % 8) * 2
        const y = 0.8 + Math.floor(index / 8) * 2
        return (
          <mesh key={`dot-${x}-${y}`} position={[x, y, -6.5]}>
            <sphereGeometry args={[0.06, 10, 10]} />
            <meshBasicMaterial color="#1e293b" />
          </mesh>
        )
      })}
    </group>
  )
}

export default function CraneViewer({ selectedConfig, onSelectConfig }: Props) {
  return (
    <div className="w-full h-[24rem] md:h-[27rem] rounded-2xl overflow-hidden bg-slate-900/80 border border-white/10 shadow-[0_24px_80px_rgba(2,6,23,0.65)]">
      <Canvas
        shadows
        camera={{ position: [7.5, 4.2, 6.5], fov: 42 }}
        dpr={[1, 1.7]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#0a1220"]} />
        <fog attach="fog" args={["#0a1220", 8, 22]} />
        <SceneLights />
        <SceneBackdrop />
        <React.Suspense fallback={null}>
          <CraneModel selectedConfig={selectedConfig} onSelectConfig={onSelectConfig} />
        </React.Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 3.5}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}
