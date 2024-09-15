<script setup>
import ShineCard from './ShineCard.vue'
import WebsiteIntro from './WebsiteIntro.vue'
import { websiteIntroList } from '../utils/constant.js'

</script>

<template>
    <div class="website-section-container">
        <ShineCard v-for="(item, index) in websiteIntroList" :key="index">
            <WebsiteIntro :title="item.title" :des="item.des" :url="item.url" :link-text="item.linkText"></WebsiteIntro>
        </ShineCard>
    </div>
</template>

<style scoped>
.website-section-container {
    width: 100%;
    height: 100%;
    padding: 120px 0;
    display: grid;
    grid-column-gap: 40px;
    grid-row-gap: 40px;
    grid-template-columns: repeat(2, calc(50% - 15px));
}

@media (max-width: 1000px) {
    .website-section-container {
        grid-template-columns: 100%;
    }
}
</style>