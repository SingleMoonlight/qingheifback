<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    texts: {
        type: Array,
        required: true,
    },
    typeSpeed: {
        type: Number,
        default: 80,
    },
    deleteSpeed: {
        type: Number,
        default: 40,
    },
    pauseDuration: {
        type: Number,
        default: 2000,
    },
})

const displayedText = ref('')
const cursorVisible = ref(true)
let timer = null
let cursorTimer = null

function sleep(ms) {
    return new Promise((resolve) => { setTimeout(resolve, ms) })
}

async function typeLoop() {
    let currentIndex = 0
    while (true) {
        const target = props.texts[currentIndex]
        // Type
        for (let i = 0; i < target.length; i++) {
            displayedText.value = target.slice(0, i + 1)
            await sleep(props.typeSpeed)
        }
        // Pause
        await sleep(props.pauseDuration)
        // Delete
        for (let i = target.length; i >= 0; i--) {
            displayedText.value = target.slice(0, i)
            await sleep(props.deleteSpeed)
        }
        // Next text
        currentIndex = (currentIndex + 1) % props.texts.length
        await sleep(300)
    }
}

onMounted(() => {
    typeLoop()
    cursorTimer = setInterval(() => {
        cursorVisible.value = !cursorVisible.value
    }, 530)
})

onBeforeUnmount(() => {
    if (timer) clearTimeout(timer)
    if (cursorTimer) clearInterval(cursorTimer)
})
</script>

<template>
    <span class="typewriter">
        <span class="typewriter-text">{{ displayedText }}</span>
        <span class="typewriter-cursor" :class="{ blink: cursorVisible }">|</span>
    </span>
</template>

<style scoped>
.typewriter {
    display: inline-block;
}

.typewriter-text {
    color: var(--text-secondary);
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.02em;
}

.typewriter-cursor {
    color: var(--accent);
    font-size: 20px;
    font-weight: 300;
    margin-left: 1px;
    transition: opacity 0.15s ease;
    opacity: 0;
}

.typewriter-cursor.blink {
    opacity: 1;
}
</style>
