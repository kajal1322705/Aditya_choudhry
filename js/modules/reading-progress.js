/**
 * Reading Progress Bar Module
 * Shows reading progress for blog posts
 */
export class ReadingProgressModule {
    constructor() {
        this.progressBar = null;
        this.init();
    }

    init() {
        this.createProgressBar();
        this.bindEvents();
    }

    createProgressBar() {
        // Only create on blog post pages
        if (!document.querySelector('.post-content')) return;

        this.progressBar = document.createElement('div');
        this.progressBar.className = 'reading-progress-bar';
        this.progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
        document.body.appendChild(this.progressBar);
    }

    bindEvents() {
        if (!this.progressBar) return;

        window.addEventListener('scroll', () => {
            this.updateProgress();
        });
    }

    updateProgress() {
        const postContent = document.querySelector('.post-content');
        if (!postContent) return;

        const contentTop = postContent.offsetTop;
        const contentHeight = postContent.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        // Calculate how much of the article has been read
        const scrollableDistance = contentHeight - windowHeight + contentTop;
        const progress = Math.min(100, Math.max(0, ((scrollTop - contentTop + windowHeight) / scrollableDistance) * 100));

        const fill = this.progressBar.querySelector('.reading-progress-fill');
        if (fill) {
            fill.style.width = `${progress}%`;
        }
    }
}
