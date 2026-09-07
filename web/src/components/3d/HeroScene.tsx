import { useMemo, useRef, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getOilSprite } from './oilSprite'

/**
 * Cinematic hero atmosphere: golden oil particles drifting through darkness
 * with a mouse-parallax rig. Rendered behind the hero car plate.
 */

function OilParticles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5
      speeds[i] = 0.15 + Math.random() * 0.85
    }
    return { positions, speeds }
  }, [count])

  useFrame((state, delta) => {
    const points = ref.current
    if (!points) return
    const attr = points.geometry.getAttribute('position') as THREE.BufferAttribute
    const arr = attr.array as Float32Array
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      arr[i * 3] += speeds[i] * delta * 0.55
      arr[i * 3 + 1] += Math.sin(t * 0.6 * speeds[i] + i) * delta * 0.06
      if (arr[i * 3] > 8) arr[i * 3] = -8
    }
    attr.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={getOilSprite()}
        color="#e8770a"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.28}
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  )
}

function LightStreaks() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    g.children.forEach((child, i) => {
      child.position.x = ((t * (0.6 + i * 0.25) + i * 6) % 20) - 10
    })
  })

  return (
    <group ref={group}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, -1.5 + i * 1.6, -1.5 - i]} rotation={[0, 0, -0.04]}>
          <planeGeometry args={[5.5, 0.012]} />
          <meshBasicMaterial
            color={i === 1 ? '#E2001A' : '#e8770a'}
            transparent
            opacity={0.22}
            blending={THREE.NormalBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

function ParallaxRig({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    const g = ref.current
    if (!g) return
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.14, 2.2, delta)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.07, 2.2, delta)
  })

  return <group ref={ref}>{children}</group>
}

export default function HeroScene({ quality }: { quality: 'low' | 'high' }) {
  const count = quality === 'high' ? 420 : 140

  return (
    <Canvas
      dpr={quality === 'high' ? [1, 1.75] : [1, 1.25]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      style={{ pointerEvents: 'none' }}
      aria-hidden
    >
      <ParallaxRig>
        <OilParticles count={count} />
        {quality === 'high' && <LightStreaks />}
      </ParallaxRig>
    </Canvas>
  )
}
