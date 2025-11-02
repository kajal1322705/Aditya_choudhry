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
        // Initialize all registered modules
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
        // Register and initialize all modules
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
