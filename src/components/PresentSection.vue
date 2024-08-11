<script setup>
import { ref } from 'vue'

const props = defineProps({
    title: String
})
const section = ref(null)

defineExpose({section})
</script>
        
<template>
    <div class="present-section" ref="section">
        <div class="present-section-title">{{ props.title }}</div>
        <div class="title-light"></div>
        <slot></slot>
    </div>
</template>


<style scoped>
.present-section {
    width: 100%;
    padding: 20px 200px;
}

.present-section-title {
    font-size: 24px;
    text-align: center;
    color: var(--primary-text-color);
}

.title-light {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    filter: blur(18px);
    margin-left: 50%;
    transform: translate(-50%, -100%);
    background-color: var(--section-title-light-color);
}

@media (max-width: 1000px) {
    .present-section {
        padding: 20px 20px;
    }
}
</style>