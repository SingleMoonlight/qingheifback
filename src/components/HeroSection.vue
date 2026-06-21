<script setup>
import TypewriterText from '@/components/TypewriterText.vue'
import { slogan, typewriterTexts } from '@/utils/constant'
</script>

<template>
    <section class="hero">
        <div class="hero-grid"></div>
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
}

.hero-subtitle {
    min-height: 28px;
}

.hero-scroll {
    position: absolute;
    bottom: 40px;
    z-index: 1;
    opacity: 0.6;
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
