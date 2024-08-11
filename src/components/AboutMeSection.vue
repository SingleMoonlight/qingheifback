<script setup>
import { aboutMeDes } from '@/utils/constant'

</script>

<template>
    <div class="about-me-des">
        {{ aboutMeDes }}
    </div>
</template>

<style scoped>
.about-me-des {
    white-space: pre-wrap;
    line-height: 40px;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    padding: 120px 0;
    color: var(--primary-text-color);
}
</style>