import { onMounted, onBeforeUnmount, ref } from 'vue'

/**
 * Scroll-triggered reveal animation via Intersection Observer.
 * Elements get class `reveal-visible` when they enter the viewport.
 *
 * @param {string} selector  - CSS selector for observed elements
 * @param {object} options   - IntersectionObserver options
 * @returns {{ revealRoot: Ref<HTMLElement|null> }}
 */
export function useScrollReveal(selector = '.reveal', options = {}) {
    const revealRoot = ref(null)
    let observer = null

    const defaults = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
    }

    onMounted(() => {
        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible')
                    observer.unobserve(entry.target)
                }
            })
        }, { ...defaults, ...options })

        const root = revealRoot.value ?? document
        const targets = root.querySelectorAll(selector) || []
        targets.forEach((el) => observer.observe(el))
    })

    onBeforeUnmount(() => {
        if (observer) {
            observer.disconnect()
        }
    })

    return { revealRoot }
}
