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
const asideRef = ref(null)
const navListRef = ref([null])
const navBtnRef = ref(null)
const showAside = ref(false)

function handleLogoClick() {
    location.reload();
}

function handleNavClick(index) {
    let asideDom = asideRef.value;
    let navBtnDom = navBtnRef.value;

    showAside.value = false;

    asideDom.classList.remove('aside-open');
    navBtnDom.classList.remove('nav-button-container-transition');

    let offsetTop = 0;
    if (index !== 0) {
        offsetTop = navListRef.value[index].value.section.offsetTop - 60;
    }
    window.scrollTo({ behavior: 'smooth' , top: offsetTop });
}

function handleNavButtonClick() {
    let asideDom = asideRef.value;
    let navBtnDom = navBtnRef.value;

    if (asideRef === null || navBtnRef === null) {
        return;
    }

    showAside.value = !showAside.value;

    if (showAside.value) {
        asideDom.classList.add('aside-open');
        navBtnDom.classList.add('nav-button-container-transition');
    } else {
        asideDom.classList.remove('aside-open');
        navBtnDom.classList.remove('nav-button-container-transition');
    }
}

function setHeaderFixed() {
    let headerDom = headerRef.value;

    if (headerDom === null) {
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
        <div class="nav-button-container" ref="navBtnRef">
            <LineButton :checked="showAside" @click="handleNavButtonClick"></LineButton>
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
    <div class="aside" ref="asideRef">
        <div class="aside-menu">
            <div class="aside-menu-item" v-for="(item, index) in navList" :key="index" @click="handleNavClick(index)">
                <div class="nav-item-text">{{ item }}</div>
            </div>
        </div>
    </div>
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

.nav-button-container-transition {
    transform: translateX(-260px);
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

.aside {
    position: fixed;
    top: 0;
    right: -260px;
    height: 100%;
    width: 260px;
    border-left: var(--nav-border);
    opacity: 0;
    backdrop-filter: blur(30px);
    transition: opacity 0.25s ease, right 0.25s ease;
    z-index: 999;
}

.aside-open {
    right: 0;
    opacity: 1
}

.aside-menu {
    color: var(--primary-text-color);
}

.aside-menu-item {
    display: flex;
    align-items: center;
    height: 40px;
    margin: 10px;
    padding: 0 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.25s ease;
}

.aside-menu-item:hover {
    background-color: var(--menu-item-hover-background-color);
}

.aside-menu-item:hover .nav-item-text::before {
    width: 100%;
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
    .aside {
        width: 200px;
    }

    .nav-button-container-transition {
        transform: translateX(-200px);
    }

    .banner-slogan {
        padding: 0 20px;
    }
}

@media (max-width: 500px) {
    .banner-slogan {
        font-size: 56px;
    }
}
</style>