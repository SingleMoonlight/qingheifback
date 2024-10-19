<script setup>
import CopyrightStatement from '@/components/CopyrightStatement.vue'
import DynStars from '@/components/DynStars.vue'
import LineButton from '@/components/LineButton.vue'
import PresentSection from '@/components/PresentSection.vue'
import AboutMeSection from '@/components/AboutMeSection.vue'
import WebsiteSection from '@/components/WebsiteSection.vue'
import { copyrightInfo, navList, slogan } from '@/utils/constant'
import { onMounted, ref } from 'vue'

const headerRef = ref(null)
const navListRef = ref([null])
const showNavMenu = ref(false)

function handleLogoClick() {
    location.reload();
}

function handleNavClick(index) {
    showNavMenu.value = false;

    let offsetTop = 0;
    if (index !== 0) {
        offsetTop = navListRef.value[index].value.section.offsetTop - 60;
    }

    window.scrollTo({ behavior: 'smooth', top: offsetTop });
}

function handleNavButtonClick() {
    let headerDom = headerRef.value;

    if (headerDom === null) {
        return;
    }
    showNavMenu.value = !showNavMenu.value;

    if (showNavMenu.value) {
        headerDom.classList.add('header-transition');
    } else {
        if (window.scrollY <= headerDom.offsetHeight) {
            headerDom.classList.remove('header-transition');
        }
    }
}

function setHeaderFixed() {
    let headerDom = headerRef.value;

    if (headerDom === null || showNavMenu.value) {
        return;
    }

    if (window.scrollY > headerDom.offsetHeight) {
        headerDom.classList.add('header-transition');
    } else {
        headerDom.classList.remove('header-transition');
    }
}

onMounted(() => {
    window.addEventListener('scroll', () => {
        setHeaderFixed();
    });

    for (let i = 0; i < navList.length; i++) {
        navListRef.value.push(ref(null))
    }
})

</script>

<template>
    <div class="banner">
        <div class="banner-bg">
            <DynStars></DynStars>
        </div>
        <div class="banner-slogan">{{ slogan }}</div>
    </div>
    <div class="header" ref="headerRef">
        <div class="logo-container">
            <img class="logo-img" src="@/assets/imgs/logo.png" @click="handleLogoClick" />
            <div class="logo-text">
                <span style="font-weight: bolder;">QING</span>
                <span style="font-weight: normal;">HE</span>
            </div>
        </div>
        <div class="padding-container"></div>
        <div class="nav-container">
            <div class="nav-item" v-for="(item, index) in navList" :key="index" @click="handleNavClick(index)">
                <div class="nav-item-text">{{ item }}</div>
            </div>
        </div>
        <div class="nav-button-container">
            <LineButton :checked="showNavMenu" @click="handleNavButtonClick"></LineButton>
        </div>
    </div>
    <div class="body">
        <PresentSection :title="navList[1]" :ref="navListRef[1]">
            <AboutMeSection></AboutMeSection>
        </PresentSection>
        <PresentSection :title="navList[2]" :ref="navListRef[2]">
            <WebsiteSection></WebsiteSection>
        </PresentSection>
    </div>
    <div class="footer">
        <div class="copyright-container">
            <CopyrightStatement :show-copyright="true" :copyright-info="copyrightInfo"></CopyrightStatement>
        </div>
    </div>
    <Transition name="fade" mode="out-in">        
        <div class="nav-menu-container" v-show="showNavMenu">
            <div class="nav-menu">
                <div class="nav-menu-item" v-for="(item, index) in navList" :key="index" @click="handleNavClick(index)">
                    <div class="nav-item-text">{{ item }}</div>
                    <div class="nav-menu-divide-line"></div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.banner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.banner-bg {
    width: 100%;
    height: 100%;
}

.banner-slogan {
    position: absolute;
    color: var(--primary-text-color);
    font-weight: 600;
    font-size: 86px;
    padding: 0 200px;
    text-align: center;
}

.header {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    backdrop-filter: none;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0);
    transition: all 0.25s ease;
    z-index: 999;
}

.header-transition {
    backdrop-filter: blur(30px);
    border-bottom: var(--nav-border);
}

.logo-container {
    display: flex;
    align-items: center;
    height: 60px;
    padding-left: 200px;
}

.logo-img {
    cursor: pointer;
    height: 40px;
    width: 40px;
}

.logo-text {
    margin-left: 10px;
    color: var(--primary-text-color);
}

.padding-container {
    height: 60px;
    flex: 1;
}

.nav-container {
    cursor: pointer;
    height: 60px;
    width: 600px;
    padding-right: 200px;
    display: flex;
    justify-content: end;
    align-items: center;
}

.nav-item {
    height: 40px;
    width: 70px;
    margin: 0 15px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.25s ease;
}

.nav-item:hover {
    background-color: var(--menu-item-hover-background-color);
}

.nav-item-text {
    color: var(--primary-text-color);
    position: relative;
    text-decoration: none;
    display: inline-block;
}

.nav-item-text::before {
    content: "";
    position: absolute;
    width: 0;
    height: 3px;
    border-radius: 3px;
    background-color: var(--under-line-color);
    left: 50%;
    bottom: -6px;
    transform: translateX(-50%);
    transition: width 0.2s ease-in-out;
}

.nav-item:hover .nav-item-text::before {
    width: 100%;
}

.nav-button-container {
    display: none;
    align-items: center;
    height: 60px;
    padding-right: 100px;
    transition: all 0.25s ease;
}

.body {
    width: 100%;
}

.footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
}

.copyright-container {
    color: var(--secondary-text-color);
}

.nav-menu-container {
    position: fixed;
    display: flex;
    justify-content: center;
    top: 60px;
    height: 100%;
    width: 100%;
    backdrop-filter: blur(30px);
    z-index: 999;
}

.nav-menu {
    width: 400px;
    color: var(--primary-text-color);
}

.nav-menu-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 40px;
    margin: 10px;
    padding: 0 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.25s ease;
}

.nav-menu-item:hover {
    background-color: var(--menu-item-hover-background-color);
}

.nav-menu-item:hover .nav-item-text::before {
    width: 100%;
}

.nav-menu-divide-line {
    width: 100%;
    height: 1px;
    border-radius: 1px;
    background-color: var(--menu-item-hover-background-color);
    position: relative;
    top: 8px;
}

@media (max-width: 1000px) {
    .logo-container {
        padding-left: 20px;
    }

    .nav-container {
        display: none;
    }

    .nav-button-container {
        display: flex;
        padding-right: 20px;
    }
}

@media (max-width: 500px) {
    .banner-slogan {
        padding: 0 20px;
        font-size: 56px;
    }

    .nav-menu {
        width: 100%;
    }
}
</style>