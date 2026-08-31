import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getOilSprite } from './oilSprite'

type SceneProps = { progressRef: React.MutableRefObject<number> }

const CYLINDER_X = [-1.65, -0.55, 0.55, 1.65]
const METAL = { color: '#5c5e64', metalness: 0.72, roughness: 0.32 }

function makeTube(points: THREE.Vector3[], radius: number) {
  const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.35)
  return { curve, geometry: new THREE.TubeGeometry(curve, 64, radius, 10, false) }
}

function Crankshaft({ progressRef }: SceneProps) {
  const group = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    g.rotation.x += delta * (1.8 + progressRef.current * 5)
  })

  return (
    <group ref={group} position={[0, -0.9, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.16, 4.6, 24]} />
        <meshStandardMaterial {...METAL} />
      </mesh>
      {CYLINDER_X.map((x, i) => (
        <group key={x} position={[x, 0, 0]} rotation={[(i % 2) * Math.PI, 0, 0]}>
          <mesh position={[0, 0.26, 0]}>
            <boxGeometry args={[0.24, 0.55, 0.42]} />
            <meshStandardMaterial {...METAL} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Pistons() {
  const pistons = useRef<(THREE.Mesh | null)[]>([])

  useFrame((state) => {
    const t = state.clock.elapsedTime * 3.2
    pistons.current.forEach((piston, i) => {
      if (!piston) return
      piston.position.y = 0.85 + Math.sin(t + (i % 2 === 0 ? 0 : Math.PI)) * 0.28
    })
  })

  return (
    <group>
      {CYLINDER_X.map((x, i) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 0.9, 0]}>
            <cylinderGeometry args={[0.44, 0.44, 1.7, 28, 1, true]} />
            <meshStandardMaterial
              color="#8a8d94"
              metalness={0.85}
              roughness={0.28}
              transparent
              opacity={0.55}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh ref={(el) => void (pistons.current[i] = el)} position={[0, 0.85, 0]}>
            <cylinderGeometry args={[0.36, 0.36, 0.42, 28]} />
            <meshStandardMaterial color="#9aa0a8" metalness={0.9} roughness={0.22} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 1.95, 0]}>
        <boxGeometry args={[4.6, 0.28, 1.1]} />
        <meshStandardMaterial color="#6a6d74" metalness={0.7} roughness={0.34} />
      </mesh>
      <mesh position={[2.7, 1.4, -0.4]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.36, 0.15, 16, 48]} />
        <meshStandardMaterial color="#7a7e86" metalness={0.92} roughness={0.24} />
      </mesh>
    </group>
  )
}

function OilCircuit({ progressRef }: SceneProps) {
  const droplets = useRef<THREE.Points>(null)
  const COUNT = 220

  const { gallery, risers, positions, offsets, curves } = useMemo(() => {
    const gallery = makeTube(
      [
        new THREE.Vector3(-3.15, -1.05, 0.18),
        new THREE.Vector3(-1.65, -0.98, 0.18),
        new THREE.Vector3(0, -0.98, 0.18),
        new THREE.Vector3(1.65, -0.98, 0.18),
        new THREE.Vector3(2.55, -0.2, 0),
        new THREE.Vector3(2.85, 1.35, -0.38),
      ],
      0.055,
    )

    const risers = CYLINDER_X.map((x) =>
      makeTube(
        [
          new THREE.Vector3(x, -0.98, 0.18),
          new THREE.Vector3(x, 0.05, 0.12),
          new THREE.Vector3(x, 1.15, 0.08),
        ],
        0.032,
      ),
    )

    const curves = [gallery.curve, ...risers.map((r) => r.curve)]
    const positions = new Float32Array(COUNT * 3)
    const offsets = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) offsets[i] = i / COUNT
    return { gallery, risers, positions, offsets, curves }
  }, [])

  const lanes = useMemo(() => {
    const arr = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) arr[i] = i % 5
    return arr
  }, [])

  useFrame((state) => {
    const pts = droplets.current
    if (!pts) return
    const attr = pts.geometry.getAttribute('position') as THREE.BufferAttribute
    const arr = attr.array as Float32Array
    const t = state.clock.elapsedTime
    const speed = 0.08 + progressRef.current * 0.12
    const vec = new THREE.Vector3()
    for (let i = 0; i < COUNT; i++) {
      const curve = curves[lanes[i]]
      const u = (offsets[i] + t * speed) % 1
      curve.getPointAt(u, vec)
      arr[i * 3] = vec.x
      arr[i * 3 + 1] = vec.y
      arr[i * 3 + 2] = vec.z
    }
    attr.needsUpdate = true
  })

  const oilMat = {
    color: '#e2b34a',
    metalness: 0.35,
    roughness: 0.18,
    emissive: '#8a6410',
    emissiveIntensity: 0.35,
  }

  return (
    <group>
      <mesh geometry={gallery.geometry}>
        <meshStandardMaterial {...oilMat} />
      </mesh>
      {risers.map((riser, i) => (
        <mesh key={i} geometry={riser.geometry}>
          <meshStandardMaterial {...oilMat} />
        </mesh>
      ))}
      <points ref={droplets}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={getOilSprite()}
          color="#f2c14e"
          size={0.09}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

function CameraRig({ progressRef }: SceneProps) {
  const A = useMemo(() => new THREE.Vector3(0, 1.5, 7.6), [])
  const B = useMemo(() => new THREE.Vector3(2.2, 1.2, 5.2), [])
  const C = useMemo(() => new THREE.Vector3(0.4, 0.9, 3.4), [])
  const target = useMemo(() => new THREE.Vector3(0, 0.45, 0), [])

  useFrame((state) => {
    const p = THREE.MathUtils.clamp(progressRef.current, 0, 1)
    const cam = state.camera
    if (p < 0.5) {
      cam.position.lerpVectors(A, B, p * 2)
    } else {
      cam.position.lerpVectors(B, C, (p - 0.5) * 2)
    }
    cam.lookAt(target)
  })

  return null
}

export default function EngineScene({ progressRef }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.5, 7.6], fov: 42 }}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
      onCreated={({ gl }) => gl.setClearColor('#0B1215', 1)}
      style={{ pointerEvents: 'none' }}
      aria-hidden
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 6, 5]} intensity={2.8} color="#ffffff" />
      <directionalLight position={[-4, 2, 3]} intensity={1.1} color="#9ec4ff" />
      <pointLight position={[0, 1.2, 2.4]} intensity={18} distance={9} color="#ffd27a" />
      <CameraRig progressRef={progressRef} />
      <group position={[0, -0.25, 0]}>
        <Crankshaft progressRef={progressRef} />
        <Pistons />
        <OilCircuit progressRef={progressRef} />
      </group>
    </Canvas>
  )
}
