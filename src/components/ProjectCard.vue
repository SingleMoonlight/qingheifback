<script setup>
import { ExternalLink } from 'lucide-vue-next'

defineProps({
    title: String,
    description: String,
    url: {
        type: String,
        default: null,
    },
    github: {
        type: String,
        default: null,
    },
    stars: {
        type: Number,
        default: null,
    },
    language: {
        type: String,
        default: null,
    },
})

// GitHub-style language colors (dark-theme friendly); orange as fallback
const LANG_COLORS = {
    C: '#8a94a6',
    'C++': '#f34b7d',
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572a5',
    Go: '#00add8',
    Rust: '#dea584',
    Shell: '#89e051',
    Java: '#b07219',
    Vue: '#41b883',
}

function langColor(language) {
    return LANG_COLORS[language] || 'var(--tag-text-orange)'
}

function handleClick(url) {
    if (url) {
        window.open(url, '_blank')
    }
}
</script>

<template>
    <div class="project-card" @click="handleClick(url || github)">
        <div class="card-glow"></div>

        <div class="card-body">
            <div class="card-header">
                <h3 class="card-title">{{ title }}</h3>
                <!-- Website link is special: sits alone in the top-right corner -->
                <a
                    v-if="url"
                    :href="url"
                    target="_blank"
                    class="card-site"
                    aria-label="访问网站"
                    title="访问网站"
                    @click.stop
                >
                    <ExternalLink :size="15" />
                </a>
            </div>
            <p class="card-description">{{ description }}</p>
        </div>

        <!-- Unified GitHub strip: source link, stars and language -->
        <div v-if="github" class="card-footer">
            <a
                :href="github"
                target="_blank"
                class="card-link"
                @click.stop
            >
                查看源码
                <span class="card-link-arrow">→</span>
            </a>

            <div class="card-meta">
                <span v-if="stars !== null" class="card-meta-item">
                    ★ {{ stars }}
                </span>
                <span v-if="language" class="card-meta-item">
                    <span class="lang-dot" :style="{ background: langColor(language) }"></span>
                    {{ language }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.project-card {
    position: relative;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 32px;
    cursor: pointer;
    overflow: hidden;
    text-align: left;
    transition:
        transform 0.2s ease-out,
        border-color 0.2s ease-out,
        box-shadow 0.2s ease-out;
}

.project-card:hover {
    transform: translateY(-2px);
    border-color: var(--border-hover);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}

/* Subtle fixed glow — upper left corner, much softer than old ShineCard */
.card-glow {
    top: -80px;
    left: -80px;
    width: 200px;
    height: 200px;
}

.project-card:hover .card-glow {
    opacity: 0.5;
}

.card-body {
    position: relative;
    z-index: 1;
}

.card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
}

.card-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
}

/* Corner site link — subtle icon button */
.card-site {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    color: var(--text-tertiary);
    flex-shrink: 0;
    transition: color 0.15s ease, background 0.15s ease;
}

.card-site:hover {
    color: var(--text-primary);
    background: var(--bg-tertiary);
}

.card-description {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 32px;
}

.card-footer {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
}

.card-link {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: color 0.15s ease;
}

.card-link:hover {
    color: var(--text-primary);
}

.card-link-arrow {
    display: inline-block;
    transition: transform 0.15s ease;
}

.card-link:hover .card-link-arrow {
    transform: translateX(4px);
}

.card-meta {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 13px;
    color: var(--text-tertiary);
}

.card-meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
}

.lang-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}
</style>
