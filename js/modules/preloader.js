/**
 * Preloader Module
 * Handles page loading animation
 */
export class PreloaderModule {
    constructor() {
        this.preloader = document.querySelector('.preloader');
        if (!this.preloader) return;
        
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            this.preloader.classList.add('hidden');
            document.body.classList.remove('loading');
        });
    }

    show() {
        if (this.preloader) {
            this.preloader.classList.remove('hidden');
            document.body.classList.add('loading');
        }
    }

    hide() {
        if (this.preloader) {
            this.preloader.classList.add('hidden');
            document.body.classList.remove('loading');
        }
    }
}
