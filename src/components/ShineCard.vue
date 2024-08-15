<script setup>
import { onMounted, ref } from 'vue'

const cardRef = ref(null)
const cardLightRef = ref(null)

function transformElement(e, x, y) {
    let box = e.getBoundingClientRect();
    let tmpX = x - box.x;   //鼠标距离元素左边框距离
    let tmpY = y - box.y;   //鼠标距离元素上边框距离

    let calcX = (tmpY / (box.height / 2)) - 1;
    let calcY = -((tmpX / (box.width / 2)) - 1) * 1.5;

    let shineX = tmpX - 300;
    let shineY = tmpY - 300;

    e.style.transform = "perspective(700px) " + "rotateX(" + calcX + "deg) rotateY(" + calcY + "deg)";

    e.lastChild.style.transform = "translate(" + shineX + "px, " + shineY + "px)";
}

onMounted(() => {
    let cardDom = cardRef.value;

    cardDom.addEventListener("mousemove", (e) => {
        transformElement(cardDom, e.clientX, e.clientY);
    });
    cardDom.addEventListener("mouseleave", () => {
        cardDom.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
    })
})

</script>

<template>
    <div class="shine-card-container" ref="cardRef">
        <slot></slot>
        <div class="shine-card-border"></div>
        <div class="shine-card-light" ref="cardLightRef"></div>
    </div>
</template>

<style scoped>
.shine-card-container {
    position: relative;
    background: var(--card-background-color);
    border-radius: 10px;
    border: none;
    transform-style: preserve-3d;
    transform: perspective(700px) rotateX(0deg) rotateY(0deg);
    transition: .25s all;
    overflow: hidden;
}

.shine-card-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: var(--card-border-color);
    z-index: -1;
}

.shine-card-light {
    position: absolute;
    top: 0;
    left: 0;
    width: 600px;
    height: 600px;
    border-radius: 350px;
    opacity: 0;
    filter: blur(180px);
    background-color: var(--card-light-color);
    mix-blend-mode: soft-light;
    will-change: transform;
    transform: translate(0, 0);
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: -1;
}

.shine-card-container:hover .shine-card-light {
    opacity: 0.85;
}
</style>