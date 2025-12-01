/**
 * Keyboard Shortcuts Module
 * Provides keyboard navigation throughout the site
 */
export class KeyboardShortcutsModule {
    constructor() {
        this.shortcuts = new Map();
        this.helpVisible = false;
        this.init();
    }

    init() {
        this.registerDefaultShortcuts();
        this.bindEvents();
        this.createShortcutsHelp();
    }

    registerDefaultShortcuts() {
        // Navigation shortcuts
        this.register('g h', () => this.navigateTo('#home'), 'Go to Home');
        this.register('g a', () => this.navigateTo('#about'), 'Go to About');
        this.register('g e', () => this.navigateTo('#experience'), 'Go to Experience');
        this.register('g p', () => this.navigateTo('#projects'), 'Go to Projects');
        this.register('g s', () => this.navigateTo('#skills'), 'Go to Skills');
        this.register('g c', () => this.navigateTo('#contact'), 'Go to Contact');
        
        // Action shortcuts
        this.register('/', () => this.openSearch(), 'Open Search');
        this.register('t', () => this.toggleTheme(), 'Toggle Theme');
        this.register('?', () => this.toggleHelp(), 'Show Keyboard Shortcuts');
        this.register('Escape', () => this.closeAll(), 'Close Dialogs');
        this.register('r', () => this.downloadResume(), 'Download Resume');
    }

    register(keys, callback, description) {
        this.shortcuts.set(keys, { callback, description });
    }

    bindEvents() {
        let keySequence = [];
        let keyTimeout = null;

        document.addEventListener('keydown', (e) => {
            // Don't trigger shortcuts when typing in input fields
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                if (e.key === 'Escape') {
                    e.target.blur();
                    this.closeAll();
                }
                return;
            }

            clearTimeout(keyTimeout);
            
            const key = e.key.toLowerCase();
            
            // Handle single key shortcuts
            if (this.shortcuts.has(key)) {
                e.preventDefault();
                this.shortcuts.get(key).callback();
                keySequence = [];
                return;
            }

            // Handle multi-key shortcuts (like 'g h')
            keySequence.push(key);
            const combo = keySequence.join(' ');
            
            if (this.shortcuts.has(combo)) {
                e.preventDefault();
                this.shortcuts.get(combo).callback();
                keySequence = [];
                return;
            }

            // Clear sequence after 1 second of no input
            keyTimeout = setTimeout(() => {
                keySequence = [];
            }, 1000);
        });

        // Ctrl+K for search
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
        });
    }

    navigateTo(hash) {
        window.location.hash = hash;
    }

    openSearch() {
        const overlay = document.getElementById('commandPaletteOverlay');
        if (overlay) {
            overlay.classList.add('visible');
            const input = document.getElementById('commandInput');
            if (input) input.focus();
        }
    }

    toggleTheme() {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    }

    closeAll() {
        document.getElementById('commandPaletteOverlay')?.classList.remove('visible');
        document.getElementById('shortcutsHelp')?.classList.remove('visible');
        document.getElementById('languageSwitcher')?.classList.remove('visible');
        this.helpVisible = false;
    }

    downloadResume() {
        const link = document.querySelector('a[download*="resume"], a[download*="cv"]');
        if (link) {
            link.click();
        } else {
            const resumeBtn = document.querySelector('.resume-download-btn');
            if (resumeBtn) resumeBtn.click();
        }
    }

    toggleHelp() {
        const help = document.getElementById('shortcutsHelp');
        if (help) {
            this.helpVisible = !this.helpVisible;
            help.classList.toggle('visible', this.helpVisible);
        }
    }

    createShortcutsHelp() {
        const help = document.createElement('div');
        help.id = 'shortcutsHelp';
        help.className = 'shortcuts-help';
        
        const shortcuts = Array.from(this.shortcuts.entries())
            .map(([key, { description }]) => `
                <div class="shortcut-item">
                    <kbd>${key}</kbd>
                    <span>${description}</span>
                </div>
            `).join('');

        help.innerHTML = `
            <div class="shortcuts-help-content">
                <div class="shortcuts-help-header">
                    <h3><i class="fas fa-keyboard"></i> Keyboard Shortcuts</h3>
                    <button class="close-shortcuts" aria-label="Close">&times;</button>
                </div>
                <div class="shortcuts-list">
                    ${shortcuts}
                </div>
                <p class="shortcuts-tip">Press <kbd>Ctrl</kbd> + <kbd>K</kbd> for quick search</p>
            </div>
        `;

        document.body.appendChild(help);

        help.querySelector('.close-shortcuts').addEventListener('click', () => {
            this.toggleHelp();
        });
    }
}
