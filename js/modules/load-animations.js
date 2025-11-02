/**
 * Load Animations Module
 * Handles initial page load animations
 */
export class LoadAnimationsModule {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('section').forEach((section, index) => {
            section.style.opacity = '0';
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transition = 'opacity 0.6s ease';
            }, index * 100);
        });
    }
}
