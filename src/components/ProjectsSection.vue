<script setup>
import { onMounted, ref } from 'vue'
import ProjectCard from './ProjectCard.vue'
import { projectList, projectIntro } from '@/utils/constant'

// Fetch GitHub stars & language at runtime, cached locally for a day.
// Cache keeps requests at ~3 per visitor per day, far below the
// anonymous API limit (60 requests/hour/IP). Failures degrade silently.
const CACHE_KEY = 'qinghe:gh-repos'
const CACHE_TTL = 24 * 60 * 60 * 1000

const projects = ref(projectList.map((p) => ({ ...p })))

function repoPath(url) {
    const m = String(url || '').match(/github\.com\/([^/]+\/[^/]+?)\/?$/)
    return m ? m[1] : null
}

function readCache() {
    try {
        const raw = localStorage.getItem(CACHE_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw)
        if (!parsed || typeof parsed.ts !== 'number' || Date.now() - parsed.ts > CACHE_TTL) return null
        return parsed.data || {}
    } catch {
        return null
    }
}

function writeCache(data) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }))
    } catch {
        // Storage unavailable (private mode / full) — fetch again next visit
    }
}

async function fetchRepoMeta() {
    const paths = [...new Set(projects.value.map((p) => repoPath(p.github)).filter(Boolean))]
    if (paths.length === 0) return

    const cache = readCache() ?? {}
    const missing = paths.filter((path) => cache[path] === undefined)
    let fresh = {}

    if (missing.length > 0) {
        const results = await Promise.allSettled(
            missing.map(async (path) => {
                const res = await fetch(`https://api.github.com/repos/${path}`, {
                    headers: { Accept: 'application/vnd.github+json' },
                })
                if (!res.ok) throw new Error(`GitHub API ${res.status}`)
                const data = await res.json()
                return { path, stars: data.stargazers_count, language: data.language }
            })
        )
        results.forEach((r) => {
            if (r.status === 'fulfilled') {
                fresh[r.value.path] = { stars: r.value.stars ?? null, language: r.value.language ?? null }
            }
        })
        if (Object.keys(fresh).length > 0) writeCache({ ...cache, ...fresh })
    }

    const meta = { ...cache, ...fresh }
    projects.value.forEach((p) => {
        const path = repoPath(p.github)
        const m = meta[path]
        if (m) {
            p.stars = m.stars
            p.language = m.language
        }
    })
}

onMounted(fetchRepoMeta)
</script>

<template>
    <div class="projects">
        <p class="projects-intro">{{ projectIntro }}</p>
        <div class="projects-grid">
            <div
                v-for="(item, index) in projects"
                :key="index"
                class="projects-grid-item reveal"
                :style="{ transitionDelay: `${index * 60}ms` }"
            >
                <ProjectCard
                    :title="item.title"
                    :description="item.description"
                    :url="item.url"
                    :github="item.github"
                    :stars="item.stars ?? null"
                    :language="item.language ?? null"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.projects {
    padding: 20px 0;
}

.projects-intro {
    font-size: 15px;
    line-height: 1.9;
    color: var(--text-secondary);
    margin-bottom: 48px;
}

.projects-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}

/* Odd count: last card spans both columns and centers itself */
.projects-grid > :last-child:nth-child(odd) {
    grid-column: 1 / -1;
    justify-self: center;
    width: calc(50% - 12px);
}

/* Scroll reveal with stagger (per-index delay set inline) */
.projects-grid-item {
    opacity: 0;
    transform: translateY(20px);
    transition:
        opacity 0.6s ease-out,
        transform 0.6s ease-out;
}

.projects-grid-item.reveal-visible {
    opacity: 1;
    transform: translateY(0);
}

/* Cards stretch to fill the wrapper so a row keeps equal heights */
.projects-grid-item .project-card {
    height: 100%;
}

@media (max-width: 768px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }

    .projects-grid > :last-child:nth-child(odd) {
        width: 100%;
    }
}
</style>
