<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import TypewriterText from '@/components/TypewriterText.vue'
import { slogan, typewriterTexts } from '@/utils/constant'

// ---- Click "laser" wave on the dot grid ----
const canvasRef = ref(null)

const GRID_SPACING = 28      // matches the CSS dot grid tile size
const WAVE_SIGMA = 130       // gaussian σ (ms) — how fast each dot fades after lighting
const WAVE_MODE = 'ripple'   // 'rays' (cross laser) | 'ripple' (circular wave)
const WAVE_INTERVAL = 35     // rays mode: ms between consecutive dots along a ray
const WAVE_SPEED = 0.8       // ripple mode: px per ms the ring expands

let ctx = null
let rafId = null
let waves = []               // active waves: { cx, cy, t0 } in CSS px
let prefersReducedMotion = false
let sprite = null            // pre-rendered glowing dot, drawn via drawImage (fast path)

function setupCanvas() {
    const canvas = canvasRef.value
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

// Render the glowing dot (halo + bright core) once into an offscreen canvas.
// Per-frame drawing then only needs a drawImage instead of creating
// radial gradients for every dot — gradients were the perf killer.
function buildSprite() {
    const size = 32
    const c = document.createElement('canvas')
    c.width = size
    c.height = size
    const s = c.getContext('2d')
    const mid = size / 2

    const halo = s.createRadialGradient(mid, mid, 0, mid, mid, 10)
    halo.addColorStop(0, 'rgba(123, 131, 229, 0.55)')
    halo.addColorStop(1, 'rgba(123, 131, 229, 0)')
    s.fillStyle = halo
    s.beginPath()
    s.arc(mid, mid, 10, 0, Math.PI * 2)
    s.fill()

    s.fillStyle = 'rgba(236, 237, 238, 0.95)'
    s.beginPath()
    s.arc(mid, mid, 2.2, 0, Math.PI * 2)
    s.fill()

    sprite = c
}

function handleBackgroundClick(e) {
    if (prefersReducedMotion) return
    const canvas = canvasRef.value
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    // Snap to the nearest lattice point of the dot grid.
    // CSS radial-gradient dots sit at the CENTER of each 28px tile,
    // so the grid is offset by half a tile from the origin.
    const offset = GRID_SPACING / 2
    const cx = Math.round((x - offset) / GRID_SPACING) * GRID_SPACING + offset
    const cy = Math.round((y - offset) / GRID_SPACING) * GRID_SPACING + offset
    waves.push({ cx, cy, t0: performance.now() })
    // Cap concurrent waves so pathological clicking stays cheap.
    // Generous on purpose: evicting an old wave mid-flight cuts its
    // circle short, so the cap must be well above realistic click rates.
    if (waves.length > 16) waves.shift()
    if (rafId === null) rafId = requestAnimationFrame(drawWave)
}

function drawWave() {
    const canvas = canvasRef.value
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    ctx.clearRect(0, 0, w, h)

    const now = performance.now()
    const totalMs = WAVE_MODE === 'rays'
        ? (Math.ceil(Math.max(w, h) / GRID_SPACING) + 1) * WAVE_INTERVAL + WAVE_SIGMA * 4
        : Math.hypot(w, h) / WAVE_SPEED + WAVE_SIGMA * 4
    // Drop finished waves; all survivors are drawn together each frame
    waves = waves.filter((wv) => now - wv.t0 <= totalMs)

    if (WAVE_MODE === 'rays') {
        drawRays(now, w, h)
    } else {
        drawRipple(now, w, h)
    }

    if (waves.length > 0) {
        rafId = requestAnimationFrame(drawWave)
    } else {
        rafId = null
    }
}

// Four perpendicular rays from each wave origin (cross "laser")
function drawRays(now, w, h) {
    const maxK = Math.ceil(Math.max(w, h) / GRID_SPACING) + 1
    const rays = [[0, -1], [0, 1], [-1, 0], [1, 0]]

    for (const wv of waves) {
        const elapsed = now - wv.t0
        for (let r = 0; r < rays.length; r++) {
            const [dx, dy] = rays[r]
            // The origin dot is drawn once, by the first ray
            for (let k = r === 0 ? 0 : 1; k < maxK; k++) {
                const t = elapsed - k * WAVE_INTERVAL
                if (t < 0) break
                const px = wv.cx + dx * k * GRID_SPACING
                const py = wv.cy + dy * k * GRID_SPACING
                if (px < -20 || px > w + 20 || py < -20 || py > h + 20) continue

                const intensity = Math.exp(-(t * t) / (2 * WAVE_SIGMA * WAVE_SIGMA))
                if (intensity < 0.01) continue
                drawDot(px, py, intensity, w, h)
            }
        }
    }
}

// Circular ripple: every dot lights when the ring reaches its distance from the origin
function drawRipple(now, w, h) {
    const offset = GRID_SPACING / 2

    for (const wv of waves) {
        const elapsed = now - wv.t0
        const litRadius = elapsed * WAVE_SPEED + WAVE_SIGMA * 0.8 + 10
        // Bounding box of lattice points that could currently be lit
        const minGX = Math.max(0, Math.floor((wv.cx - litRadius - offset) / GRID_SPACING))
        const maxGX = Math.min(Math.ceil(w / GRID_SPACING), Math.ceil((wv.cx + litRadius + offset) / GRID_SPACING))
        const minGY = Math.max(0, Math.floor((wv.cy - litRadius - offset) / GRID_SPACING))
        const maxGY = Math.min(Math.ceil(h / GRID_SPACING), Math.ceil((wv.cy + litRadius + offset) / GRID_SPACING))

        for (let gy = minGY; gy < maxGY; gy++) {
            for (let gx = minGX; gx < maxGX; gx++) {
                const px = gx * GRID_SPACING + offset
                const py = gy * GRID_SPACING + offset
                const dx = px - wv.cx
                const dy = py - wv.cy
                const dist = Math.sqrt(dx * dx + dy * dy)
                // Dot lights when the ring passes its distance, then gaussian fade
                const t = elapsed - dist / WAVE_SPEED
                if (t < 0 || t > WAVE_SIGMA * 3.5) continue

                const intensity = Math.exp(-(t * t) / (2 * WAVE_SIGMA * WAVE_SIGMA))
                drawDot(px, py, intensity, w, h)
            }
        }
    }
}

function drawDot(px, py, intensity, w, h) {
    // Match the CSS mask: dots fade out toward the hero edges (ellipse at 50%/45%)
    const nx = (px - w * 0.5) / (w * 0.7)
    const ny = (py - h * 0.45) / (h * 0.7)
    const r = Math.sqrt(nx * nx + ny * ny)
    const falloff = r <= 0.3 ? 1 : Math.max(0, 1 - (r - 0.3) / 0.7)
    const alpha = intensity * falloff
    if (alpha <= 0.03) return

    // Stamped sprite — one drawImage instead of gradients per dot
    ctx.globalAlpha = alpha
    ctx.drawImage(sprite, px - 16, py - 16, 32, 32)
    ctx.globalAlpha = 1
}

onMounted(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setupCanvas()
    buildSprite()
    window.addEventListener('resize', setupCanvas)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', setupCanvas)
    if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>

<template>
    <section class="hero">
        <div class="hero-grid"></div>
        <div class="hero-glow"></div>
        <canvas
            ref="canvasRef"
            class="hero-canvas"
            aria-hidden="true"
            @click="handleBackgroundClick"
        ></canvas>
        <div class="hero-content">
            <h1 class="hero-title">{{ slogan }}</h1>
            <div class="hero-subtitle">
                <TypewriterText :texts="typewriterTexts" :type-speed="80" :delete-speed="40" :pause-duration="2500" />
            </div>
        </div>
        <div class="hero-scroll">
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                <rect x="1.5" y="1.5" width="13" height="21" rx="6.5" stroke="var(--text-tertiary)" stroke-width="1.5" />
                <circle cx="8" cy="8" r="2.5" fill="var(--text-tertiary)">
                    <animate attributeName="cy" values="8;14;8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    </section>
</template>

<style scoped>
.hero {
    position: relative;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.hero-grid {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: radial-gradient(rgba(255, 255, 255, 0.06) 2px, transparent 2px);
    background-size: 28px 28px;
    mask-image: radial-gradient(ellipse 70% 70% at 50% 45%, black 30%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 45%, black 30%, transparent 70%);
}

/* Soft accent glow behind the title */
.hero-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: min(640px, 92vw);
    height: min(640px, 92vw);
    transform: translate(-50%, -62%);
    background: radial-gradient(circle, rgba(94, 106, 210, 0.16) 0%, transparent 62%);
    border-radius: 50%;
    pointer-events: none;
}

/* Transparent canvas layer — receives background clicks, draws the laser wave */
.hero-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.hero-content {
    text-align: center;
    z-index: 1;
}

.hero-title {
    font-size: 72px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.03em;
    margin-bottom: 24px;
    line-height: 1;
    animation: hero-enter 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
}

.hero-subtitle {
    min-height: 28px;
    animation: hero-enter 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
}

.hero-scroll {
    position: absolute;
    bottom: 40px;
    z-index: 1;
    opacity: 0.6;
    animation: hero-enter 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.45s backwards;
}

/* Entrance animation (staggered via animation-delay above) */
@keyframes hero-enter {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 48px;
    }
}

@media (max-width: 480px) {
    .hero-title {
        font-size: 36px;
    }
}
</style>
