<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import PresentSection from '@/components/PresentSection.vue'
import AboutMeSection from '@/components/AboutMeSection.vue'
import CareerSection from '@/components/CareerSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import CopyrightStatement from '@/components/CopyrightStatement.vue'
import LineButton from '@/components/LineButton.vue'
import { navList, copyrightInfo } from '@/utils/constant'

const headerRef = ref(null)
const aboutSectionRef = ref(null)
const careerSectionRef = ref(null)
const projectsSectionRef = ref(null)
const contactSectionRef = ref(null)
const showNavMenu = ref(false)
const activeNavIndex = ref(0)

// ---- Navigation ----

function handleNavClick(index) {
    showNavMenu.value = false

    const sections = [aboutSectionRef, careerSectionRef, projectsSectionRef, contactSectionRef]
    let scrollTarget = 0

    if (index > 0) {
        const target = sections[index - 1]?.value
        if (target?.sectionEl) {
            const rect = target.sectionEl.getBoundingClientRect()
            scrollTarget = window.scrollY + rect.top - 60
        }
    }

    window.scrollTo({ behavior: 'smooth', top: scrollTarget })
}

function handleNavButtonClick() {
    const headerDom = headerRef.value
    if (headerDom === null) return

    showNavMenu.value = !showNavMenu.value

    if (showNavMenu.value) {
        headerDom.classList.add('header-glass')
    } else {
        if (window.scrollY <= headerDom.offsetHeight) {
            headerDom.classList.remove('header-glass')
        }
    }
}

function onHeaderScroll() {
    const headerDom = headerRef.value
    if (headerDom === null || showNavMenu.value) return

    if (window.scrollY > 60) {
        headerDom.classList.add('header-glass')
    } else {
        headerDom.classList.remove('header-glass')
    }
}

// ---- Active section tracking ----

function updateActiveSection() {
    const scrollY = window.scrollY + 150
    const sections = [aboutSectionRef, careerSectionRef, projectsSectionRef, contactSectionRef]
    let active = 0
    for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i]?.value?.sectionEl
        if (el) {
            const rect = el.getBoundingClientRect()
            if (scrollY >= window.scrollY + rect.top) {
                active = i + 1
                break
            }
        }
    }
    activeNavIndex.value = active
}

onMounted(() => {
    window.addEventListener('scroll', () => {
        onHeaderScroll()
        updateActiveSection()
    })
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onHeaderScroll)
    window.removeEventListener('scroll', updateActiveSection)
})

// ---- Theme ----
document.documentElement.setAttribute('data-theme', 'dark')
</script>

<template>
    <div class="page">
        <!-- ====== Nav ====== -->
        <header class="header" ref="headerRef">
            <div class="header-inner">
                <div class="logo" @click="handleNavClick(0)">
                    <img class="logo-img" src="@/assets/imgs/logo.png" alt="青何" />
                    <span class="logo-text">QINGHE</span>
                </div>

                <nav class="nav">
                    <button
                        v-for="(item, index) in navList"
                        :key="item"
                        class="nav-item"
                        :class="{ 'nav-item--active': activeNavIndex === index }"
                        @click="handleNavClick(index)"
                    >{{ item }}</button>
                </nav>

                <div class="nav-toggle">
                    <LineButton :checked="showNavMenu" @click="handleNavButtonClick"></LineButton>
                </div>
            </div>
        </header>

        <!-- ====== Mobile Nav Overlay ====== -->
        <Transition name="menu-fade">
            <div v-if="showNavMenu" class="nav-overlay">
                <div class="nav-overlay-inner">
                    <button
                        v-for="(item, index) in navList"
                        :key="item"
                        class="nav-overlay-item"
                        :class="{ 'nav-overlay-item--active': activeNavIndex === index }"
                        @click="handleNavClick(index)"
                    >{{ item }}</button>
                </div>
            </div>
        </Transition>

        <!-- ====== Hero ====== -->
        <HeroSection />

        <!-- ====== Content ====== -->
        <main class="main">
            <PresentSection ref="aboutSectionRef" title="关于">
                <AboutMeSection></AboutMeSection>
            </PresentSection>

            <PresentSection ref="careerSectionRef" title="经历">
                <CareerSection></CareerSection>
            </PresentSection>

            <PresentSection ref="projectsSectionRef" title="项目">
                <ProjectsSection></ProjectsSection>
            </PresentSection>

            <ContactSection ref="contactSectionRef"></ContactSection>
        </main>

        <!-- ====== Footer ====== -->
        <footer class="footer">
            <CopyrightStatement :show-copyright="true" :copyright-info="copyrightInfo"></CopyrightStatement>
        </footer>
    </div>
</template>

<style scoped>
.page {
    min-height: 100dvh;
    background: var(--bg-primary);
}

/* ---- Header ---- */
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
    z-index: 100;
    border-bottom: 1px solid transparent;
    transition: background 0.3s ease, border-color 0.3s ease;
}

.header-glass {
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--glass-border);
}

.header-inner {
    max-width: 960px;
    margin: 0 auto;
    height: 56px;
    display: flex;
    align-items: center;
    padding: 0 40px;
    gap: 32px;
}

/* ---- Logo ---- */
.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    flex-shrink: 0;
}

.logo-img {
    height: 28px;
    width: 28px;
}

.logo-text {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: 0.06em;
}

/* ---- Nav ---- */
.nav {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: auto;
}

.nav-item {
    padding: 6px 14px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    background: none;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: color 0.15s ease, background 0.15s ease;
    font-family: inherit;
}

.nav-item:hover {
    color: var(--text-primary);
    background: var(--bg-tertiary);
}

.nav-item--active {
    color: var(--text-primary);
}

.nav-toggle {
    display: none;
    flex-shrink: 0;
}

/* ---- Mobile Nav Overlay ---- */
.nav-overlay {
    position: fixed;
    inset: 0;
    top: 56px;
    z-index: 99;
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    justify-content: center;
}

.nav-overlay-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding-top: 40px;
    width: 100%;
}

.nav-overlay-item {
    width: 240px;
    padding: 12px 24px;
    font-size: 18px;
    font-weight: 500;
    color: var(--text-secondary);
    background: none;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: color 0.15s ease, background 0.15s ease;
    text-align: center;
    font-family: inherit;
}

.nav-overlay-item:hover {
    color: var(--text-primary);
    background: var(--bg-tertiary);
}

.nav-overlay-item--active {
    color: var(--text-primary);
}

.menu-fade-enter-active,
.menu-fade-leave-active {
    transition: opacity 0.2s ease;
}
.menu-fade-enter-from,
.menu-fade-leave-to {
    opacity: 0;
}

/* ---- Main ---- */
.main {
    max-width: 960px;
    margin: 0 auto;
}

/* ---- Footer ---- */
.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    border-top: 1px solid var(--border);
}

/* ---- Responsive ---- */
@media (max-width: 768px) {
    .header-inner {
        padding: 0 20px;
        gap: 16px;
    }

    .nav {
        display: none;
    }

    .nav-toggle {
        display: flex;
        margin-left: auto;
    }

    .main {
        padding: 0;
    }
}
</style>
