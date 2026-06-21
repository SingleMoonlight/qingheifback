<script setup>
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
            <h3 class="card-title">{{ title }}</h3>
            <p class="card-description">{{ description }}</p>
        </div>

        <div class="card-footer">
            <!-- Website link -->
            <a
                v-if="url"
                :href="url"
                target="_blank"
                class="card-link"
                @click.stop
            >
                访问网站
                <span class="card-link-arrow">→</span>
            </a>

            <!-- GitHub metadata -->
            <div v-if="github || stars !== null" class="card-meta">
                <span v-if="stars !== null" class="card-meta-item">
                    ★ {{ stars }}
                </span>
                <span v-if="language" class="card-meta-item">
                    <span class="lang-dot"></span>
                    {{ language }}
                </span>
                <a
                    v-if="github"
                    :href="github"
                    target="_blank"
                    class="card-link card-meta-item"
                    @click.stop
                >
                    查看源码
                    <span class="card-link-arrow">→</span>
                </a>
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

.card-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 12px;
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
    background: var(--tag-text-orange);
}
</style>
