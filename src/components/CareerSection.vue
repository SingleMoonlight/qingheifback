<script setup>
import { ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { careerTimeline, careerIntro } from '@/utils/constant'

const activeIndex = ref(0)
const total = careerTimeline.length

function prev() { activeIndex.value = (activeIndex.value - 1 + total) % total }
function next() { activeIndex.value = (activeIndex.value + 1) % total }

function cardClass(index) {
    const diff = index - activeIndex.value
    if (diff === 0) return 'carousel-card--center'
    if (diff === -1 || diff === total - 1) return 'carousel-card--left'
    if (diff === 1 || diff === -(total - 1)) return 'carousel-card--right'
    return 'carousel-card--hidden'
}
</script>

<template>
    <div class="career">
        <p class="career-intro">{{ careerIntro }}</p>

        <div class="carousel">
            <div class="carousel-stage">
                <button class="carousel-arrow" @click="prev" aria-label="上一项">
                    <ChevronLeft :size="20" />
                </button>

                <div class="carousel-track">
                    <div
                        v-for="(item, index) in careerTimeline"
                        :key="item.phase"
                        class="carousel-card"
                        :class="cardClass(index)"
                    >
                        <div class="carousel-phase">{{ item.phase }}</div>
                        <h4 class="carousel-title">{{ item.title }}</h4>
                        <p class="carousel-description">{{ item.description }}</p>
                    </div>
                </div>

                <button class="carousel-arrow" @click="next" aria-label="下一项">
                    <ChevronRight :size="20" />
                </button>
            </div>

            <div class="carousel-dots">
                <button
                    v-for="(item, index) in careerTimeline"
                    :key="item.phase"
                    class="carousel-dot"
                    :class="{ 'carousel-dot--active': index === activeIndex }"
                    @click="activeIndex = index"
                    :aria-label="`第 ${index + 1} 项`"
                ></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.career {
    padding: 20px 0;
}

.career-intro {
    font-size: 15px;
    line-height: 1.9;
    color: var(--text-secondary);
    margin-bottom: 48px;
}

.carousel {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.carousel-stage {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 72px;
    width: 100%;
    max-width: 960px;
}

.carousel-track {
    position: relative;
    min-height: 270px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.carousel-card {
    position: absolute;
    width: 100%;
    max-width: 480px;
    padding: 36px 40px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 10px;
    text-align: left;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
}

.carousel-card--center {
    position: relative;
    z-index: 2;
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.25);
    pointer-events: auto;
}

.carousel-card--left {
    z-index: 1;
    opacity: 0.25;
    transform: translateX(-35%) scale(0.88);
}

.carousel-card--right {
    z-index: 1;
    opacity: 0.25;
    transform: translateX(35%) scale(0.88);
}

.carousel-card--hidden {
    z-index: 0;
    opacity: 0;
    transform: scale(0.9);
}

.carousel-phase {
    font-size: 13px;
    font-weight: 600;
    color: var(--accent);
    letter-spacing: 0.08em;
    margin-bottom: 12px;
    font-variant-numeric: tabular-nums;
}

.carousel-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 10px;
}

.carousel-description {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.7;
}

/* ---- Arrows ---- */

.carousel-arrow {
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    color: var(--text-secondary);
    cursor: pointer;
    transition: border-color 0.15s ease, color 0.15s ease;
    flex-shrink: 0;
}

.carousel-arrow:hover {
    border-color: var(--border-hover);
    color: var(--text-primary);
}

/* ---- Dots ---- */

.carousel-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 32px;
}

.carousel-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    background: var(--border-hover);
    cursor: pointer;
    transition: background 0.2s ease;
    padding: 0;
}

.carousel-dot--active {
    background: var(--accent);
}

@media (max-width: 768px) {
    .carousel-stage {
        max-width: 100%;
        column-gap: 16px;
    }

    .carousel-card--left {
        transform: translateX(-40%) scale(0.88);
    }

    .carousel-card--right {
        transform: translateX(40%) scale(0.88);
    }
}
</style>
