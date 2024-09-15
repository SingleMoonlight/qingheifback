<script setup>
const props = defineProps({
    title: String,
    des: String,
    url: String,
    linkText: String,
})

</script>

<template>
    <div class="website-intro">
        <div class="website-intro-title">
            {{ props.title }}
        </div>
        <div class="website-intro-des">
            {{ props.des }}
        </div>
        <div class="website-intro-link">
            <a class="website-intro-link-text" :underline="false" :href="props.url"
                target="_blank">{{ props.linkText }}</a>
            <div class="website-intro-link-icon"></div>
        </div>
    </div>
</template>


<style scoped>
.website-intro {
    width: 100%;
    height: auto;
    padding: 40px;
    border-radius: 10px
}

.website-intro-title {
    color: var(--primary-text-color)
}

.website-intro-des {
    color: var(--secondary-text-color);
    margin: 30px 0
}

.website-intro-link {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center
}

.website-intro-link a {
    text-decoration: none
}

.website-intro-link-text {
    position: relative;
    display: inline-block;
    cursor: pointer;
    color: var(--primary-text-color)
}

.website-intro-link-text:before {
    position: absolute;
    content: "";
    background: var(--primary-text-color);
    height: 2px;
    width: 0;
    border-radius: 1px;
    margin-top: 30px;
    left: 0;
    transition: width .2s ease-in-out
}

.website-intro-link-icon {
    position: relative;
    margin-left: 10px;
    background: var(--primary-text-color);
    border-radius: 1px;
    height: 2px;
    width: 0;
    transition: .25s all;
    transform-origin: right
}

.website-intro-link-icon:before {
    position: absolute;
    content: "";
    background: var(--primary-text-color);
    border-radius: 1px;
    top: 2px;
    left: -4px;
    height: 2px;
    width: 8px;
    transform: rotate(-45deg);
    transition: .25s all
}

.website-intro-link-icon:after {
    position: absolute;
    content: "";
    background: var(--primary-text-color);
    border-radius: 1px;
    top: -2px;
    left: -4px;
    height: 2px;
    width: 8px;
    transform: rotate(45deg);
    transition: .25s all
}

.website-intro-link:hover .website-intro-link-text:before {
    width: 100%
}

.website-intro-link:hover .website-intro-link-icon {
    width: 8px
}

.website-intro-link:hover .website-intro-link-icon:before {
    left: 4px
}

.website-intro-link:hover .website-intro-link-icon:after {
    left: 4px
}
</style>