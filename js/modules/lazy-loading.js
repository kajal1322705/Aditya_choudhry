/**
 * Lazy Loading Module
 * Implements lazy loading for images and iframes
 */
export class LazyLoadingModule {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // Check for native lazy loading support
        if ('loading' in HTMLImageElement.prototype) {
            this.useNativeLazyLoading();
        } else {
            this.useIntersectionObserver();
        }

        // Also handle dynamically added content
        this.observeMutations();
    }

    useNativeLazyLoading() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.loading = 'lazy';
            img.classList.add('lazy-loaded');
        });

        document.querySelectorAll('iframe[data-src]').forEach(iframe => {
            iframe.src = iframe.dataset.src;
            iframe.loading = 'lazy';
        });
    }

    useIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadElement(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe all lazy elements
        document.querySelectorAll('[data-src], [data-background]').forEach(el => {
            this.observer.observe(el);
        });
    }

    loadElement(el) {
        if (el.dataset.src) {
            if (el.tagName === 'IMG') {
                el.src = el.dataset.src;
                el.addEventListener('load', () => {
                    el.classList.add('lazy-loaded');
                });
            } else if (el.tagName === 'IFRAME') {
                el.src = el.dataset.src;
            }
        }

        if (el.dataset.background) {
            el.style.backgroundImage = `url(${el.dataset.background})`;
            el.classList.add('lazy-loaded');
        }
    }

    observeMutations() {
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        // Check if the node itself is lazy
                        if (node.dataset?.src || node.dataset?.background) {
                            if (this.observer) {
                                this.observer.observe(node);
                            } else {
                                this.loadElement(node);
                            }
                        }
                        // Check children
                        node.querySelectorAll?.('[data-src], [data-background]').forEach(el => {
                            if (this.observer) {
                                this.observer.observe(el);
                            } else {
                                this.loadElement(el);
                            }
                        });
                    }
                });
            });
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}
