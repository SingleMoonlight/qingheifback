<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['click'])
const props = defineProps({
    checked: Boolean,
})

const lineBtnMidRef = ref(null)
const lineBtnBtmRef = ref(null)
const checked = ref(false)

function changeButtonState(checked) {
    if (checked) {
        lineBtnMidRef.value.style.transform = 'translateX(6px)'
        lineBtnBtmRef.value.style.transform = 'translateX(3px)'
    } else {
        lineBtnMidRef.value.style.transform = 'translateX(0)'
        lineBtnBtmRef.value.style.transform = 'translateX(0)'
    }
}

function handleButtonClick() {
    emit('click')
}

watch(() => props.checked, (newVal) => {
    checked.value = newVal
    changeButtonState(checked.value)
})
</script>

<template>
    <div class="line-button" @click="handleButtonClick">
        <div class="line-button-top"></div>
        <div class="line-button-mid" ref="lineBtnMidRef"></div>
        <div class="line-button-btm" ref="lineBtnBtmRef"></div>
    </div>
</template>

<style scoped>
.line-button {
    padding: 8px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
}

.line-button-top,
.line-button-mid,
.line-button-btm {
    border-radius: 1px;
    height: 1.5px;
    background-color: var(--text-primary);
    transition: transform 0.2s ease-out;
}

.line-button-top {
    width: 18px;
}

.line-button-mid {
    width: 10px;
    margin: 3.5px 0;
}

.line-button-btm {
    width: 14px;
}
</style>
