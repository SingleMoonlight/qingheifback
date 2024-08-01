<script setup>
import { watch, ref } from 'vue'

const emit = defineEmits(['click'])
const props = defineProps({
    checked: Boolean,
})

const lineBtnTopRef = ref(null)
const lineBtnMidRef = ref(null)
const lineBtnBtmRef = ref(null)
const checked = ref(false)

function changeButtonState(checked) {
    if (checked) {
        lineBtnTopRef.value.style.transform = 'rotate(45deg)';
        lineBtnMidRef.value.style.opacity = '0';
        lineBtnMidRef.value.style.margin = '-2px 0'
        lineBtnBtmRef.value.style.transform = 'rotate(-45deg)';
    } else {
        lineBtnTopRef.value.style.transform = 'rotate(0deg)';
        lineBtnMidRef.value.style.opacity = '1';
        lineBtnMidRef.value.style.margin = '4px 0'
        lineBtnBtmRef.value.style.transform = 'rotate(0deg)';
    }
}

function handleButtonClick() {
    emit('click');
}

watch(() => props.checked, (newVal) => {
    checked.value = newVal;
    changeButtonState(checked.value);
});
</script>

<template>
    <div class="line-button" @click="handleButtonClick">
        <div class="line-button-top" ref="lineBtnTopRef"></div>
        <div class="line-button-mid" ref="lineBtnMidRef"></div>
        <div class="line-button-btm" ref="lineBtnBtmRef"></div>
    </div>
</template>


<style scoped>
.line-button {
    padding: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
}

.line-button-top {
    border-radius: 2px;
    transform-origin: center;
    height: 2px;
    width: 20px;
    background-color: var(--primary-text-color);
    transition: all 0.2s ease-in-out;
}

.line-button-mid {
    border-radius: 2px;
    opacity: 1;
    height: 2px;
    width: 20px;
    margin: 4px 0;
    background-color: var(--primary-text-color);
    transition: all 0.2s ease-in-out;
}

.line-button-btm {
    border-radius: 2px;
    transform-origin: center;
    height: 2px;
    width: 20px;
    background-color: var(--primary-text-color);
    transition: all 0.2s ease-in-out;
}
</style>