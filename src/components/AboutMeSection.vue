<script setup>
import { MapPin, Briefcase, GraduationCap } from 'lucide-vue-next'
import { aboutMeParagraph, personalInfo } from '@/utils/constant'

const iconMap = { MapPin, Briefcase, GraduationCap }
function getIcon(name) { return iconMap[name] ?? null }
</script>

<template>
    <div class="about">
        <div class="about-intro">
            <p v-for="(p, i) in aboutMeParagraph" :key="i" class="about-paragraph">{{ p }}</p>
        </div>

        <div class="about-info-grid">
            <div v-for="info in personalInfo" :key="info.label" class="about-info-item">
                <div class="card-glow"></div>
                <component :is="getIcon(info.icon)" class="info-icon" :size="20" />
                <div class="info-text">
                    <span class="info-label">{{ info.label }}</span>
                    <span class="info-value">{{ info.value }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.about {
    padding: 20px 0;
}

.about-intro {
    margin-bottom: 40px;
}

.about-paragraph {
    font-size: 15px;
    line-height: 1.9;
    color: var(--text-secondary);
    margin-bottom: 12px;
}

.about-info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}

.about-info-item {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 20px 24px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 8px;
    text-align: left;
    overflow: hidden;
    transition:
        border-color 0.2s ease-out,
        transform 0.2s ease-out;
}

.about-info-item:hover {
    border-color: var(--border-hover);
    transform: translateY(-2px);
}

.card-glow {
    top: -60px;
    left: -60px;
    width: 140px;
    height: 140px;
}

.about-info-item:hover .card-glow {
    opacity: 0.5;
}

.info-icon {
    flex-shrink: 0;
    color: var(--text-tertiary);
    margin-top: 1px;
}

.info-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.info-label {
    font-size: 12px;
    color: var(--text-tertiary);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.info-value {
    font-size: 14px;
    color: var(--text-primary);
    font-weight: 500;
}

@media (max-width: 768px) {
    .about-info-grid {
        grid-template-columns: 1fr;
    }
}
</style>
