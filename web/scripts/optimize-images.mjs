/**
 * One-shot image optimizer for Octagen public assets.
 * Resizes + recompresses heavy photos in place (keeps same filenames where possible).
 * Run: node scripts/optimize-images.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve('public/assets/images')

/** @type {{ file: string, maxW: number, quality: number, toJpeg?: boolean }[]} */
const JOBS = [
  { file: 'tim-mossholder-atgIjoAJdWg-unsplash.jpg', maxW: 1920, quality: 72 },
  { file: 'kc-shum-hwZq2xkf3mM-unsplash.jpg', maxW: 1920, quality: 72 },
  { file: 'michael-lock-7QjAXs55AuY-unsplash.jpg', maxW: 1600, quality: 74 },
  { file: 'oil-pour.png', maxW: 1400, quality: 74, toJpeg: true },
  { file: 'tire-smoke.png', maxW: 1600, quality: 74, toJpeg: true },
  { file: 'hero-car.png', maxW: 1600, quality: 74, toJpeg: true },
  { file: 'performance-car.png', maxW: 1600, quality: 74, toJpeg: true },
  { file: 'racing-night.png', maxW: 1600, quality: 74, toJpeg: true },
  { file: 'engine-oil.png', maxW: 1200, quality: 76, toJpeg: true },
  { file: 'products/product-bottle.png', maxW: 800, quality: 80, toJpeg: true },
  { file: 'products/top-tec-4200.png', maxW: 800, quality: 82 },
  { file: 'products/molygen-new-generation.png', maxW: 800, quality: 82 },
  { file: 'lm/for-the-drivers-hero.jpg', maxW: 1600, quality: 74 },
  { file: 'lm/for-the-drivers.jpg', maxW: 1200, quality: 74 },
  { file: 'lm/for-the-drivers-large.jpg', maxW: 1400, quality: 74 },
  { file: 'lm/black-falcon-lg.jpg', maxW: 1400, quality: 74 },
  { file: 'lm/btcc-lg.jpg', maxW: 1400, quality: 74 },
  { file: 'lm/turner-lg.jpg', maxW: 1400, quality: 74 },
  { file: 'lm/engstler-lg.jpg', maxW: 1400, quality: 74 },
]

async function optimizeOne(job) {
  const input = path.join(ROOT, job.file)
  if (!fs.existsSync(input)) {
    console.log('skip missing', job.file)
    return null
  }

  const before = fs.statSync(input).size
  const ext = path.extname(input).toLowerCase()
  const wantJpeg = job.toJpeg || ext === '.jpg' || ext === '.jpeg'
  const outPath = wantJpeg && ext === '.png' ? input.replace(/\.png$/i, '.jpg') : input
  const tmp = `${outPath}.tmp`

  let pipeline = sharp(input, { failOn: 'none' }).rotate()
  const meta = await pipeline.metadata()
  if ((meta.width || 0) > job.maxW) {
    pipeline = pipeline.resize({ width: job.maxW, withoutEnlargement: true })
  }

  if (wantJpeg) {
    await pipeline.jpeg({ quality: job.quality, mozjpeg: true }).toFile(tmp)
  } else if (ext === '.png') {
    await pipeline.png({ quality: job.quality, compressionLevel: 9 }).toFile(tmp)
  } else {
    await pipeline.toFile(tmp)
  }

  // Replace original; if we created a .jpg from .png, remove the heavy png after
  if (fs.existsSync(outPath) && outPath !== input) {
    // writing new jpg alongside png
  }
  fs.renameSync(tmp, outPath)
  if (outPath !== input && fs.existsSync(input)) {
    fs.unlinkSync(input)
  }

  const after = fs.statSync(outPath).size
  const relOut = path.relative(ROOT, outPath)
  console.log(
    `${job.file} → ${relOut}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`,
  )
  return { from: job.file, to: relOut, before, after }
}

const results = []
for (const job of JOBS) {
  results.push(await optimizeOne(job))
}

const ok = results.filter(Boolean)
const saved = ok.reduce((n, r) => n + (r.before - r.after), 0)
console.log(`\nOptimized ${ok.length} files, saved ${(saved / 1024 / 1024).toFixed(1)} MB`)
