<script setup>
import ShineCard from './ShineCard.vue'


</script>

<template>
    <div class="website-section-container">
        <ShineCard>
            <div class="website-intr">
                <div class="website-intr-title">
                    青何导航
                </div>
                <div class="website-intr-des">
                    一个可以随便搜搜的导航网站，简约、美观、实用。开始自定义您的设置，然后开始纯粹的搜索之旅吧。
                </div>
                <div class="website-intr-link">
                    <a class="website-intr-link-text" :underline="false" href="https://guide.ifback.com/"
                        target="_blank">去试试</a>
                    <div class="website-intr-link-icon"></div>
                </div>
            </div>
        </ShineCard>
        <ShineCard>
            <div class="website-intr">
                <div class="website-intr-title">
                    青何博客
                </div>
                <div class="website-intr-des">
                    一个用来记录个人生活和学习经历的个人网站，算是展示学习成果的一种方式。
                </div>
                <div class="website-intr-link">
                    <a class="website-intr-link-text" :underline="false" href="https://blog.ifback.com/"
                        target="_blank">感兴趣</a>
                    <div class="website-intr-link-icon"></div>
                </div>
            </div>
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

.website-intr {
    width: 100%;
    height: auto;
    padding: 40px;
    border-radius: 10px;
    box-sizing: border-box;
}

.website-intr-title {
    color: var(--primary-text-color);
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 40px;
}

.website-intr-des {
    color: var(--secondary-text-color);
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 40px;
}

.website-intr-link {
    cursor: pointer;
    width: auto;
    height: 40px;
}

.website-intr-link a {
    text-decoration: none;
}

.website-intr-link-text {
    cursor: pointer;
    color: var(--primary-text-color);
    font-size: 20px;
    font-weight: normal;
    float: left;
}

.website-intr-link-text:after {
    position: absolute;
    content: "";
    background: var(--primary-text-color);
    border-radius: 1px;
    margin-top: 40px;
    left: 40px;
    height: 2px;
    width: 0;
    transition: .25s all;
}

.website-intr-link-icon {
    position: relative;
    float: left;
    margin-left: 10px;
    background: var(--primary-text-color);
    border-radius: 1px;
    height: 2px;
    width: 0;
    top: 14px;
    left: 2px;
    transition: .25s all;
    transform-origin: right;
}

.website-intr-link-icon:before {
    position: absolute;
    content: "";
    background: var(--primary-text-color);
    border-radius: 1px;
    top: 2px;
    left: -4px;
    height: 2px;
    width: 8px;
    transform: rotate(-45deg);
    transition: .25s all;
}

.website-intr-link-icon:after {
    position: absolute;
    content: "";
    background: var(--primary-text-color);
    border-radius: 1px;
    top: -2px;
    left: -4px;
    height: 2px;
    width: 8px;
    transform: rotate(45deg);
    transition: .25s all;
}

.website-intr-link:hover .website-intr-link-text:after {
    width: 60px;
}

.website-intr-link:hover .website-intr-link-icon {
    width: 8px;
}

.website-intr-link:hover .website-intr-link-icon:before {
    left: 4px;
}

.website-intr-link:hover .website-intr-link-icon:after {
    left: 4px;
}

@media (max-width: 1000px) {
    .website-section-container {
        grid-template-columns: 100%;
    }
}
</style>