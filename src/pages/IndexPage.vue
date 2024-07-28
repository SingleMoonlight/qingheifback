<script setup>
import CopyrightStatement from '@/components/CopyrightStatement.vue'
import { copyrightInfo } from '@/utils/constant'

</script>

<template>
    <div class="banner"></div>
    <div class="header">
        <div class="logo-container">

        </div>
        <div class="nav-container">

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
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
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
    color: var(--text-color);
}
</style>