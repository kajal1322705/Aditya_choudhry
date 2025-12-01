/**
 * Navigation Module
 * Handles navbar, mobile menu, and active link highlighting
 * With improved accessibility features
 */
export class NavigationModule {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.stepperDots = document.querySelectorAll('.stepper-dot');
        this.navbar = document.querySelector('.navbar');
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        if (!this.hamburger || !this.navMenu || !this.navbar) return;
        
        this.setupAccessibility();
        this.setupMobileMenu();
        this.setupScrollHandler();
        this.setupKeyboardNavigation();
    }
    
    setupAccessibility() {
        this.hamburger.setAttribute('aria-expanded', 'false');
        this.hamburger.setAttribute('aria-controls', 'navMenu');
        this.hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        this.navMenu.setAttribute('aria-hidden', 'true');
    }

    setupMobileMenu() {
        this.hamburger.addEventListener('click', () => {
            this.toggleMenu();
        });

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.hamburger.offsetParent !== null && this.isMenuOpen) {
                    this.closeMenu();
                }
            });
        });
        
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && 
                !this.navMenu.contains(e.target) && 
                !this.hamburger.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.hamburger.classList.toggle('active', this.isMenuOpen);
        this.navMenu.classList.toggle('active', this.isMenuOpen);
        this.hamburger.setAttribute('aria-expanded', this.isMenuOpen.toString());
        this.navMenu.setAttribute('aria-hidden', (!this.isMenuOpen).toString());
        
        if (this.isMenuOpen) {
            const firstLink = this.navMenu.querySelector('.nav-link');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        }
    }
    
    closeMenu() {
        this.isMenuOpen = false;
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.hamburger.setAttribute('aria-expanded', 'false');
        this.navMenu.setAttribute('aria-hidden', 'true');
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
                this.hamburger.focus();
            }
        });
        
        this.navMenu.addEventListener('keydown', (e) => {
            if (!this.isMenuOpen) return;
            
            const focusableElements = this.navMenu.querySelectorAll('.nav-link');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    setupScrollHandler() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 100) {
                        this.navbar.classList.add('scrolled');
                    } else {
                        this.navbar.classList.remove('scrolled');
                    }

                    let current = '';
                    const sections = document.querySelectorAll('section');
                    
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop;
                        if (window.scrollY >= sectionTop - this.navbar.offsetHeight - 100) {
                            current = section.getAttribute('id');
                        }
                    });

                    this.updateActiveLinks(current);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    updateActiveLinks(current) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        this.stepperDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    }
}
