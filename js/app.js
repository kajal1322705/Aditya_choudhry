/**
 * Main Application Entry Point
 * Micro Frontend Architecture - Module Loader
 */
import { ParticleAnimation } from './modules/particle-animation.js';
import { NavigationModule } from './modules/navigation.js';
import { ThemeToggleModule } from './modules/theme-toggle.js';
import { TypingEffectModule } from './modules/typing-effect.js';
import { PreloaderModule } from './modules/preloader.js';
import { ProjectsModule } from './modules/projects.js';
import { SkillsModule } from './modules/skills.js';
import { ScrollAnimationsModule } from './modules/scroll-animations.js';
import { SmoothScrollModule } from './modules/smooth-scroll.js';
import { BackToTopModule } from './modules/back-to-top.js';
import { CommandPaletteModule } from './modules/command-palette.js';
import { CartoonAssistantModule } from './modules/cartoon-assistant.js';
import { LoadAnimationsModule } from './modules/load-animations.js';
import { SearchModule } from './modules/search.js';
import { ReadingProgressModule } from './modules/reading-progress.js';
import { KeyboardShortcutsModule } from './modules/keyboard-shortcuts.js';
import { LanguageSwitcherModule } from './modules/language-switcher.js';
import { LazyLoadingModule } from './modules/lazy-loading.js';
import { AnalyticsModule } from './modules/analytics.js';
import { GitHubWidgetModule } from './modules/github-widget.js';
import { ContactFormModule } from './modules/contact-form.js';

/**
 * Application Registry
 * All modules registered here for easy management
 */
class AppRegistry {
    constructor() {
        this.modules = new Map();
    }

    register(name, module) {
        this.modules.set(name, module);
        return module;
    }

    get(name) {
        return this.modules.get(name);
    }

    initAll() {
        this.modules.forEach((module, name) => {
            try {
                console.log(`Initializing module: ${name}`);
            } catch (error) {
                console.error(`Error initializing module ${name}:`, error);
            }
        });
    }
}

/**
 * Main Application Class
 */
class PortfolioApp {
    constructor() {
        this.registry = new AppRegistry();
        this.modules = {};
    }

    /**
     * Initialize all modules
     */
    init() {
        // Core modules
        this.modules.particleAnimation = this.registry.register(
            'particleAnimation',
            new ParticleAnimation()
        );

        this.modules.preloader = this.registry.register(
            'preloader',
            new PreloaderModule()
        );

        this.modules.themeToggle = this.registry.register(
            'themeToggle',
            new ThemeToggleModule()
        );

        this.modules.typingEffect = this.registry.register(
            'typingEffect',
            new TypingEffectModule()
        );

        this.modules.navigation = this.registry.register(
            'navigation',
            new NavigationModule()
        );

        this.modules.scrollAnimations = this.registry.register(
            'scrollAnimations',
            new ScrollAnimationsModule()
        );

        this.modules.projects = this.registry.register(
            'projects',
            new ProjectsModule()
        );

        this.modules.smoothScroll = this.registry.register(
            'smoothScroll',
            new SmoothScrollModule()
        );

        this.modules.backToTop = this.registry.register(
            'backToTop',
            new BackToTopModule()
        );

        this.modules.loadAnimations = this.registry.register(
            'loadAnimations',
            new LoadAnimationsModule()
        );

        this.modules.commandPalette = this.registry.register(
            'commandPalette',
            new CommandPaletteModule()
        );

        this.modules.cartoonAssistant = this.registry.register(
            'cartoonAssistant',
            new CartoonAssistantModule()
        );

        this.modules.skills = this.registry.register(
            'skills',
            new SkillsModule()
        );

        // New enhanced modules
        this.modules.search = this.registry.register(
            'search',
            new SearchModule()
        );

        this.modules.readingProgress = this.registry.register(
            'readingProgress',
            new ReadingProgressModule()
        );

        this.modules.keyboardShortcuts = this.registry.register(
            'keyboardShortcuts',
            new KeyboardShortcutsModule()
        );

        this.modules.languageSwitcher = this.registry.register(
            'languageSwitcher',
            new LanguageSwitcherModule()
        );

        this.modules.lazyLoading = this.registry.register(
            'lazyLoading',
            new LazyLoadingModule()
        );

        this.modules.analytics = this.registry.register(
            'analytics',
            new AnalyticsModule()
        );

        this.modules.githubWidget = this.registry.register(
            'githubWidget',
            new GitHubWidgetModule('kajal1322705')
        );

        this.modules.contactForm = this.registry.register(
            'contactForm',
            new ContactFormModule()
        );

        console.log('Portfolio App initialized successfully');
        return this.modules;
    }
}

// Initialize app when DOM is ready
let portfolioApp;
document.addEventListener('DOMContentLoaded', () => {
    portfolioApp = new PortfolioApp();
    portfolioApp.init();
    window.app = portfolioApp;
});

// Export for potential external use
export { PortfolioApp, AppRegistry };
