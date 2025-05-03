<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref(null)
const particles = ref([])
const particleCount = 200
let animationFrameId = null

class Particle {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.reset();
        this.velocity = Math.random() * 0.5 + 0.2;
    }

    reset() {
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.size = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.y -= this.velocity;
        if (this.y < -10) {
            this.reset();
        }
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(169, 177, 188, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const initParticles = () => {
    const { width, height } = canvas.value;
    particles.value = Array.from({ length: particleCount }, () =>
        new Particle(width, height)
    )
}

const resizeCanvas = () => {
    if (canvas.value) {
        canvas.value.width = window.innerWidth;
        canvas.value.height = window.innerHeight;
        initParticles();
    }
}

const animate = () => {
    const ctx = canvas.value?.getContext('2d');

    if (!ctx) {
        return;
    }

    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

    particles.value.forEach(particle => {
        particle.update();
        particle.draw(ctx);
    })

    animationFrameId = requestAnimationFrame(animate);
}

onMounted(() => {
    resizeCanvas();
    initParticles();
    animate();
    window.addEventListener('resize', resizeCanvas);
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeCanvas);

    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
})
</script>

<template>
    <canvas ref="canvas" class="particles-canvas"></canvas>
</template>

<style scoped>
.particles-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
}
</style>