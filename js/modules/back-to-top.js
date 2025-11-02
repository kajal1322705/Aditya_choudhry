/**
 * Back to Top Module
 * Handles back-to-top button visibility and functionality
 */
export class BackToTopModule {
    constructor() {
        this.button = document.querySelector('.back-to-top');
        if (!this.button) return;
        
        this.init();
    }

    init() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 300) {
                        this.button.classList.add('visible');
                    } else {
                        this.button.classList.remove('visible');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
}
