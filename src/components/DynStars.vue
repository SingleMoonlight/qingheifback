<script setup>
import { onMounted, ref } from 'vue'

const starLayer1Ref = ref(null)
const starLayer2Ref = ref(null)
const starLayer3Ref = ref(null)

function phraseStyle(style) {
    let keys = Object.keys(style);
    let keyValue = keys.map(key => {
        let kebabCaseKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        let value = `${style[key]}${typeof style[key] === "number" ? "px" : ""}`;
        return `${kebabCaseKey}:${value};`;
    });
    return `{${keyValue.join("")}}`;
}

function createClass(name, style) {
    let styleSheet;
    for (let i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].CSSInJS) {
            styleSheet = document.styleSheets[i];
            break;
        }
    }
    if (!styleSheet) {
        let style = document.createElement("style");
        document.head.appendChild(style);
        styleSheet = style.sheet;
        styleSheet.CSSInJS = true;
    }

    styleSheet.insertRule(`.${name}${phraseStyle(style)}`);
    return name;
}

function generateStarBoxShadowStyle(starNum) {
    let boxShadow = '';

    for (let i = 0; i < starNum; i++) {
        let randomX = Math.floor(Math.random() * 100);
        let randomY = Math.floor(Math.random() * 100);

        let randomBoxShadow = `${randomX}vw ${randomY}vh #FFF,`;
        boxShadow += randomBoxShadow;
    }

    return boxShadow.slice(0, -1);
}

onMounted(() => {
    let starLayer1Dom = starLayer1Ref.value;
    let starLayer2Dom = starLayer2Ref.value;
    let starLayer3Dom = starLayer3Ref.value;
    let density = (document.documentElement.clientHeight / window.screen.height) * (document.documentElement.clientWidth / window.screen.width);

    let starLayer1Class = createClass(
        "star-layer1", {
            width: 1,
            height: 1,
            background: 'transparent',
            boxShadow: generateStarBoxShadowStyle(450 * density),
        });
    let starLayer2Class = createClass(
        "star-layer2", {
            width: 2,
            height: 2,
            background: 'transparent',
            boxShadow: generateStarBoxShadowStyle(150 * density),
        });
    let starLayer3Class = createClass(
        "star-layer3", {
            width: 3,
            height: 3,
            background: 'transparent',
            boxShadow: generateStarBoxShadowStyle(50 * density),
        });
    starLayer1Dom.classList.add(starLayer1Class);
    starLayer2Dom.classList.add(starLayer2Class);
    starLayer3Dom.classList.add(starLayer3Class);
})

</script>

<template>
    <div class="stars-container">
        <div class="star-layer1-anim" ref="starLayer1Ref"></div>
        <div class="star-layer2-anim" ref="starLayer2Ref"></div>
        <div class="star-layer3-anim" ref="starLayer3Ref"></div>
    </div>
</template>

<style scoped>
.stars-container {
    --star-move-time: 100s;
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.star-layer1-anim {
    animation: animStar calc(var(--star-move-time) * 1) linear infinite;
}

.star-layer1:after {
    content: " ";
    position: absolute;
    width: inherit;
    height: inherit;
    top: 100vh;
    background: inherit;
    box-shadow: inherit;
}

.star-layer2-anim {
    animation: animStar calc(var(--star-move-time) * 1.5) linear infinite;
}

.star-layer2:after {
    content: " ";
    position: absolute;
    width: inherit;
    height: inherit;
    top: 100vh;
    background: inherit;
    box-shadow: inherit;
}

.star-layer3-anim {
    animation: animStar calc(var(--star-move-time) * 2) linear infinite;
}

.star-layer3:after {
    content: " ";
    position: absolute;
    width: inherit;
    height: inherit;
    top: 100vh;
    background: inherit;
    box-shadow: inherit;
}

@keyframes animStar {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(-100vh);
    }
}
</style>