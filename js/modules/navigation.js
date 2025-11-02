/**
 * Navigation Module
 * Handles navbar, mobile menu, and active link highlighting
 */
export class NavigationModule {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.stepperDots = document.querySelectorAll('.stepper-dot');
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        if (!this.hamburger || !this.navMenu || !this.navbar) return;
        
        this.setupMobileMenu();
        this.setupScrollHandler();
    }

    setupMobileMenu() {
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.hamburger.offsetParent !== null) {
                    this.hamburger.classList.remove('active');
                    this.navMenu.classList.remove('active');
                }
            });
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
