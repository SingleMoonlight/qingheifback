<script setup>
import CopyrightStatement from '@/components/CopyrightStatement.vue'
import LineButton from '@/components/LineButton.vue'
import { copyrightInfo, navList } from '@/utils/constant'

function handleNavButtonClick() {
    console.log('click');
}

</script>

<template>
    <div class="banner"></div>
    <div class="header">
        <div class="logo-container">
            <img class="logo-img" src="@/assets/imgs/logo.png"/>
            <div class="logo-text">
                QINGHE
            </div>
        </div>
        <div class="padding-container"></div>
        <div class="nav-container">
            <div class="nav-item" v-for="(item, index) in navList" :key="index">
                <div class="nav-item-text">{{item}}</div>
            </div>
        </div>
        <div class="nav-button-container">
            <LineButton @click="handleNavButtonClick"></LineButton>
        </div>
    </div>
    <div class="body">
        <div style="height: 500px; width: 100%; background-color: aquamarine;"></div>
        <div style="height: 600px; width: 100%; background-color: aqua;"></div>
        <div style="height: 400px; width: 100%; background-color: aquamarine;"></div>
        <div style="height: 500px; width: 100%; background-color: aqua;"></div>
    </div>
    <div class="footer">
        <div class="copyright-container">
            <CopyrightStatement :show-copyright="true" :copyright-info="copyrightInfo"></CopyrightStatement>
        </div>
    </div>
</template>

<style scoped>
.banner {
    width: 100%;
    min-height: 100%;
}

.header {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    align-items: center;
}

.logo-container {
    display: flex;
    align-items: center;
    height: 60px;
    padding-left: 200px;
}

.logo-img {
    height: 40px;
    width: 40px;
}

.logo-text {
    margin-left: 10px;
    font-weight: bold;
    color: var(--primary-text-color);
}

.padding-container {
    height: 60px;
    flex: 1;
}

.nav-container {
    height: 60px;
    width: 480px;
    padding-right: 200px;
    display: flex;
    justify-content: end;
    align-items: center;
}

.nav-item {
    height: 40px;
    width: 40px;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav-item-text {
    color: var(--primary-text-color);
}

.nav-button-container {
    display: none;
    align-items: center;
    height: 60px;
    padding-right: 100px;
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

@media (max-width: 1000px) {
    .logo-container {
        padding-left: 100px;
    }
    .nav-container {
        display: none;
    }
    .nav-button-container {
        display: flex;
    }
}

@media (max-width: 420px) {
    .logo-container {
        padding-left: 20px;
    }
    .nav-container {
        display: none;
    }
    .nav-button-container {
        display: flex;
        padding-right: 20px
    }
}
</style>