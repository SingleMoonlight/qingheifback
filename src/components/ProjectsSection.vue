<script setup>
import ProjectCard from './ProjectCard.vue'
import { projectList, projectIntro } from '@/utils/constant'
</script>

<template>
    <div class="projects">
        <p class="projects-intro">{{ projectIntro }}</p>
        <div class="projects-grid">
            <ProjectCard
                v-for="(item, index) in projectList"
                :key="index"
                :title="item.title"
                :description="item.description"
                :url="item.url"
                :github="item.github"
                :stars="item.stars ?? null"
                :language="item.language ?? null"
            />
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

@media (max-width: 768px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }

    .projects-grid > :last-child:nth-child(odd) {
        width: 100%;
    }
}
</style>
