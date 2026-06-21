<script setup>
import { ref } from 'vue'
import { Github, Mail, BookOpen } from 'lucide-vue-next'
import { contactLinks, contactIntro } from '@/utils/constant'

const sectionEl = ref(null)
defineExpose({ sectionEl })

const iconMap = { github: Github, email: Mail, blog: BookOpen }
</script>

<template>
    <div class="contact" ref="sectionEl">
        <h2 class="contact-title">联系</h2>
        <p class="contact-subtitle">{{ contactIntro }}</p>
        <div class="contact-links">
            <a
                v-for="link in contactLinks"
                :key="link.name"
                :href="link.url"
                target="_blank"
                class="contact-link"
                :aria-label="link.name"
            >
                <component :is="iconMap[link.icon]" :size="20" class="contact-link-icon" />
                <span class="contact-link-label">{{ link.name }}</span>
            </a>
        </div>
    </div>
</template>

<style scoped>
.contact {
    text-align: center;
    padding: 120px 20px;
}

.contact-title {
    font-size: 28px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 12px;
}

.contact-subtitle {
    font-size: 16px;
    color: var(--text-secondary);
    margin-bottom: 48px;
}

.contact-links {
    display: flex;
    justify-content: center;
    gap: 32px;
    flex-wrap: wrap;
}

.contact-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px 24px;
    border-radius: 8px;
    border: 1px solid var(--border);
    color: var(--text-secondary);
    transition:
        transform 0.2s ease-out,
        border-color 0.2s ease-out,
        color 0.2s ease-out,
        background 0.2s ease-out;
}

.contact-link:hover {
    transform: translateY(-2px);
    border-color: var(--border-hover);
    color: var(--text-primary);
    background: var(--bg-secondary);
}

.contact-link-icon {
    display: flex;
    align-items: center;
    justify-content: center;
}

.contact-link-label {
    font-size: 13px;
    font-weight: 500;
}
</style>
