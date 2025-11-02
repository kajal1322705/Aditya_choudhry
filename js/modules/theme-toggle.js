/**
 * Theme Toggle Module
 * Handles light/dark mode switching and persistence
 */
export class ThemeToggleModule {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        if (!this.themeToggle) return;
        
        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }

        this.themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    getCurrentTheme() {
        return document.body.classList.contains('light-mode') ? 'light' : 'dark';
    }

    setTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        localStorage.setItem('theme', theme);
    }
}
