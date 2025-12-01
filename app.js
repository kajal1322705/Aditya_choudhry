/**
 * Modern Portfolio Application
 * Complete interactive experience with themes, popups, and animations
 */

// ============================================
// PRELOADER
// ============================================
class Preloader {
    constructor() {
        this.preloader = document.getElementById('preloader');
        this.init();
    }

    init() {
        const hidePreloader = () => {
            setTimeout(() => {
                this.preloader.classList.add('hidden');
                document.body.style.overflow = '';
                this.initAnimations();
            }, 300);
        };
        
        if (document.readyState === 'complete') {
            hidePreloader();
        } else {
            window.addEventListener('load', hidePreloader);
        }
    }

    initAnimations() {
        this.animateStats();
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 30);
        });
    }
}

// ============================================
// THEME MANAGER
// ============================================
class ThemeManager {
    constructor() {
        this.panel = document.getElementById('themePanel');
        this.toggle = document.getElementById('themePanelToggle');
        this.options = document.querySelectorAll('.theme-option');
        this.currentTheme = localStorage.getItem('portfolio-theme') || 'midnight';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.toggle.addEventListener('click', () => this.togglePanel());
        this.options.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                this.setTheme(theme);
            });
        });

        document.addEventListener('click', (e) => {
            if (!this.panel.contains(e.target)) {
                this.panel.classList.remove('active');
            }
        });
    }

    togglePanel() {
        this.panel.classList.toggle('active');
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        this.currentTheme = theme;
        
        this.options.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });

        this.panel.classList.remove('active');
    }
}

// ============================================
// NAVIGATION
// ============================================
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.mobileOverlay = document.getElementById('mobileMenuOverlay');
        this.mobileClose = document.getElementById('mobileClose');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileLinks = document.querySelectorAll('.mobile-nav-link');
        this.isOpen = false;
        this.init();
    }

    init() {
        this.setupScroll();
        this.setupMobileMenu();
        this.setupActiveLinks();
    }

    setupScroll() {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            
            if (currentScroll > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }

    setupMobileMenu() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        this.mobileClose.addEventListener('click', () => this.closeMenu());
        
        this.mobileLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.hamburger.classList.toggle('active', this.isOpen);
        this.mobileOverlay.classList.toggle('active', this.isOpen);
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }

    closeMenu() {
        this.isOpen = false;
        this.hamburger.classList.remove('active');
        this.mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    setupActiveLinks() {
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }, { passive: true });
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    const navHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ============================================
// TYPING EFFECT
// ============================================
class TypingEffect {
    constructor() {
        this.element = document.getElementById('typingText');
        this.words = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentWord = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? 50 : 100;

        if (!this.isDeleting && this.charIndex === currentWord.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ============================================
// PARTICLES
// ============================================
class Particles {
    constructor() {
        this.canvas = document.getElementById('heroParticles');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    getThemeColor() {
        const style = getComputedStyle(document.documentElement);
        return style.getPropertyValue('--primary').trim() || '#6366f1';
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 99, g: 102, b: 241 };
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const themeColor = this.getThemeColor();
        const rgb = this.hexToRgb(themeColor);
        
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity})`;
            this.ctx.fill();
        });

        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.1 * (1 - distance / 100)})`;
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// SKILLS FILTER
// ============================================
class SkillsFilter {
    constructor() {
        this.tabs = document.querySelectorAll('.skill-tab');
        this.cards = document.querySelectorAll('.skill-card');
        this.init();
    }

    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.category;
                this.filter(category);
                this.setActiveTab(tab);
            });
        });

        this.animateSkillLevels();
    }

    filter(category) {
        this.cards.forEach(card => {
            const cardCategory = card.dataset.category;
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    }

    setActiveTab(activeTab) {
        this.tabs.forEach(tab => tab.classList.remove('active'));
        activeTab.classList.add('active');
    }

    animateSkillLevels() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const level = entry.target.querySelector('.skill-level');
                    if (level) {
                        const percentage = level.dataset.level;
                        level.style.setProperty('--skill-width', `${percentage}%`);
                        level.querySelector('::after') && (level.style.width = `${percentage}%`);
                        entry.target.classList.add('animated');
                    }
                }
            });
        }, { threshold: 0.5 });

        this.cards.forEach(card => observer.observe(card));
    }
}

// ============================================
// PROJECTS FILTER
// ============================================
class ProjectsFilter {
    constructor() {
        this.filters = document.querySelectorAll('.filter-btn');
        this.projects = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.filters.forEach(filter => {
            filter.addEventListener('click', () => {
                const category = filter.dataset.filter;
                this.filter(category);
                this.setActiveFilter(filter);
            });
        });
    }

    filter(category) {
        this.projects.forEach(project => {
            const projectCategory = project.dataset.category;
            if (category === 'all' || projectCategory === category) {
                project.classList.remove('hidden');
                project.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                project.classList.add('hidden');
            }
        });
    }

    setActiveFilter(activeFilter) {
        this.filters.forEach(filter => filter.classList.remove('active'));
        activeFilter.classList.add('active');
    }
}

// ============================================
// EXPERIENCE TABS
// ============================================
class ExperienceTabs {
    constructor() {
        this.tabs = document.querySelectorAll('.exp-tab');
        this.workTimeline = document.getElementById('workTimeline');
        this.educationTimeline = document.getElementById('educationTimeline');
        this.certificationsGrid = document.getElementById('certificationsGrid');
        this.init();
    }

    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;
                this.showContent(target);
                this.setActiveTab(tab);
            });
        });
    }

    showContent(target) {
        this.workTimeline.classList.add('hidden');
        this.educationTimeline.classList.add('hidden');
        this.certificationsGrid.classList.add('hidden');

        switch(target) {
            case 'work':
                this.workTimeline.classList.remove('hidden');
                break;
            case 'education':
                this.educationTimeline.classList.remove('hidden');
                break;
            case 'certifications':
                this.certificationsGrid.classList.remove('hidden');
                break;
        }
    }

    setActiveTab(activeTab) {
        this.tabs.forEach(tab => tab.classList.remove('active'));
        activeTab.classList.add('active');
    }
}

// ============================================
// MODALS
// ============================================
class ModalManager {
    constructor() {
        this.searchModal = document.getElementById('searchModal');
        this.projectModal = document.getElementById('projectModal');
        this.aboutModal = document.getElementById('aboutModal');
        this.searchBtn = document.getElementById('searchBtn');
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');
        this.aboutMoreBtn = document.getElementById('aboutMoreBtn');
        this.projectCards = document.querySelectorAll('.project-card');
        
        this.projects = {
            codeCompanion: {
                title: 'CodeCompanion',
                description: 'An AI-powered coding assistant that helps developers write better code faster. Features include intelligent code completion, bug detection, and code explanation capabilities.',
                tech: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
                link: '#'
            },
            medicalDashboard: {
                title: 'Medical Dashboard',
                description: 'A comprehensive healthcare analytics platform for hospitals and clinics. Provides real-time patient monitoring, appointment scheduling, and medical record management.',
                tech: ['TypeScript', 'React', 'PostgreSQL', 'Chart.js'],
                link: '#'
            },
            cryptoIntelligence: {
                title: 'Crypto Intelligence',
                description: 'Real-time cryptocurrency market analysis tool with advanced charting, portfolio tracking, and price alerts. Supports 100+ cryptocurrencies.',
                tech: ['TypeScript', 'Vue.js', 'Chart.js', 'WebSocket'],
                link: '#'
            },
            chessRealm: {
                title: 'Chess Realm',
                description: 'Interactive multiplayer chess game with real-time gameplay, player matchmaking, and ELO rating system. Features beautiful animations and sound effects.',
                tech: ['JavaScript', 'Canvas API', 'Socket.io', 'Express'],
                link: '#'
            },
            webScanner: {
                title: 'Web Security Scanner',
                description: 'Automated vulnerability detection tool for web applications. Scans for common security issues like XSS, SQL injection, and CSRF vulnerabilities.',
                tech: ['Node.js', 'Python', 'Security APIs'],
                link: '#'
            },
            apiHub: {
                title: 'API Hub Connect',
                description: 'Centralized API management platform for developers. Features API documentation, testing, monitoring, and analytics in one place.',
                tech: ['React', 'Node.js', 'Redis', 'Docker'],
                link: '#'
            }
        };
        
        this.searchableItems = [
            { type: 'project', name: 'CodeCompanion', icon: 'fa-code', href: '#projects' },
            { type: 'project', name: 'Medical Dashboard', icon: 'fa-heartbeat', href: '#projects' },
            { type: 'project', name: 'Crypto Intelligence', icon: 'fa-bitcoin', href: '#projects' },
            { type: 'project', name: 'Chess Realm', icon: 'fa-chess', href: '#projects' },
            { type: 'skill', name: 'JavaScript', icon: 'fa-js', href: '#skills' },
            { type: 'skill', name: 'React', icon: 'fa-react', href: '#skills' },
            { type: 'skill', name: 'Node.js', icon: 'fa-node-js', href: '#skills' },
            { type: 'section', name: 'About Me', icon: 'fa-user', href: '#about' },
            { type: 'section', name: 'Experience', icon: 'fa-briefcase', href: '#experience' },
            { type: 'section', name: 'Contact', icon: 'fa-envelope', href: '#contact' }
        ];
        
        this.init();
    }

    init() {
        this.searchBtn?.addEventListener('click', () => this.openModal(this.searchModal));
        this.aboutMoreBtn?.addEventListener('click', () => this.openModal(this.aboutModal));
        
        document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
            backdrop.addEventListener('click', () => this.closeAllModals());
        });
        
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.closeAllModals());
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeAllModals();
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openModal(this.searchModal);
            }
        });

        this.searchInput?.addEventListener('input', (e) => this.handleSearch(e.target.value));

        this.projectCards.forEach(card => {
            const viewBtn = card.querySelector('.project-view-btn');
            viewBtn?.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectId = card.dataset.project;
                this.showProjectModal(projectId);
            });
        });
    }

    openModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        if (modal === this.searchModal) {
            setTimeout(() => this.searchInput?.focus(), 100);
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.searchResults.innerHTML = '<p class="search-hint">Start typing to search...</p>';
            return;
        }

        const results = this.searchableItems.filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase())
        );

        if (results.length === 0) {
            this.searchResults.innerHTML = '<p class="search-hint">No results found</p>';
            return;
        }

        this.searchResults.innerHTML = results.map(item => `
            <div class="search-result-item" data-href="${item.href}">
                <i class="fas ${item.icon}"></i>
                <span>${item.name}</span>
            </div>
        `).join('');

        this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const href = item.dataset.href;
                this.closeAllModals();
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    showProjectModal(projectId) {
        const project = this.projects[projectId];
        if (!project) return;

        const modalBody = document.getElementById('projectModalBody');
        modalBody.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <div class="project-modal-tech">
                <h4>Technologies Used:</h4>
                <div class="project-tags">
                    ${project.tech.map(t => `<span class="project-tag">${t}</span>`).join('')}
                </div>
            </div>
            <div class="project-modal-actions">
                <a href="${project.link}" class="btn btn-primary" target="_blank">
                    <span>View Live</span>
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        `;

        this.openModal(this.projectModal);
    }
}

// ============================================
// CONTACT FORM
// ============================================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.successPopup = document.getElementById('successPopup');
        this.init();
    }

    init() {
        this.form?.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        const mailtoLink = `mailto:aditya@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
        window.location.href = mailtoLink;
        
        this.showSuccess();
        this.form.reset();
    }

    showSuccess() {
        this.successPopup.classList.add('active');
        setTimeout(() => {
            this.successPopup.classList.remove('active');
        }, 3000);
    }
}

// ============================================
// BACK TO TOP
// ============================================
class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        }, { passive: true });

        this.button?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ============================================
// CURSOR EFFECT
// ============================================
class CursorEffect {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.follower = document.getElementById('cursorFollower');
        
        if (window.matchMedia('(hover: hover)').matches) {
            this.init();
        }
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                this.follower.style.left = e.clientX + 'px';
                this.follower.style.top = e.clientY + 'px';
            }, 50);
        });

        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                this.follower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section-header, .about-content, .skill-card, .project-card, .timeline-item, .cert-card, .contact-method').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
class ToastManager {
    constructor() {
        this.container = document.getElementById('toastContainer');
    }

    show(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        this.container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// ============================================
// INITIALIZE APP
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    new Preloader();
    new ThemeManager();
    new Navigation();
    new SmoothScroll();
    new TypingEffect();
    new Particles();
    new SkillsFilter();
    new ProjectsFilter();
    new ExperienceTabs();
    new ModalManager();
    new ContactForm();
    new BackToTop();
    new CursorEffect();
    new ScrollAnimations();
    
    window.toast = new ToastManager();
    
    console.log('Portfolio App initialized successfully');
});
