<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
    showCopyright: Boolean,
    copyrightInfo: Object,
})
const year = ref(0)

onMounted(() => {
    year.value = new Date().getFullYear()
})
</script>

<template>
    <div class="copyright" v-show="props.showCopyright">
        <span>© {{ props.copyrightInfo.startYear }} — {{ year }}</span>
        <a :href="props.copyrightInfo.ownerUrl" target="_blank">{{ props.copyrightInfo.ownerInfo }}</a>
    </div>
</template>

<style scoped>
.copyright {
    font-size: 13px;
    color: var(--text-tertiary);
    display: flex;
    align-items: center;
    gap: 8px;
}

.copyright a {
    color: var(--text-tertiary);
    transition: color 0.15s ease;
}

.copyright a:hover {
    color: var(--text-secondary);
}
</style>
