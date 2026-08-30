<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const props = defineProps({
    title: String,
    eyebrow: String,
})
const sectionEl = ref(null)
const { revealRoot } = useScrollReveal()

defineExpose({ sectionEl })
</script>

<template>
    <section class="section" ref="revealRoot">
        <div ref="sectionEl" class="section-anchor"></div>
        <div class="section-header reveal">
            <span class="section-eyebrow">{{ props.eyebrow }}</span>
            <h2 class="section-title">{{ props.title }}</h2>
        </div>
        <div class="section-body reveal">
            <slot></slot>
        </div>
    </section>
</template>

<style scoped>
.section {
    max-width: 960px;
    margin: 0 auto;
    padding: 100px 40px;
    text-align: center;
}

.section-anchor {
    height: 0;
    visibility: hidden;
    pointer-events: none;
}

.section-header {
    margin-bottom: 48px;
}

/* Eyebrow — small uppercase English label above the title */
.section-eyebrow {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 10px;
}

.section-title {
    font-size: 28px;
    font-weight: 600;
    color: var(--text-primary);
}

/* Scroll reveal */
.reveal {
    opacity: 0;
    transform: translateY(20px);
    transition:
        opacity 0.6s ease-out,
        transform 0.6s ease-out;
}

.reveal-visible {
    opacity: 1;
    transform: translateY(0);
}

@media (max-width: 768px) {
    .section {
        padding: 60px 24px;
    }
}
</style>
