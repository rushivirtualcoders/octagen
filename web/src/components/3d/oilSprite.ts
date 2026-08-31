import * as THREE from 'three'

let cached: THREE.Texture | null = null

/** Soft radial glow sprite so oil particles render as round droplets, not squares. */
export function getOilSprite(): THREE.Texture {
  if (cached) return cached
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.6)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  cached = new THREE.CanvasTexture(canvas)
  return cached
}
