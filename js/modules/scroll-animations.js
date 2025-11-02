/**
 * Scroll Animations Module
 * Handles scroll-triggered animations for all sections
 */
export class ScrollAnimationsModule {
    constructor() {
        this.init();
    }

    init() {
        this.setupObserver();
    }

    setupObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll(
            '.about-text, .about-image, .skill-category, .timeline-item, .education-card, .certification-card'
        ).forEach(el => {
            observer.observe(el);
        });
    }
}
