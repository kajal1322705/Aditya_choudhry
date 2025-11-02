document.addEventListener('DOMContentLoaded', () => {
    initParticleAnimation();
    initThemeToggle();
    initTypingEffect();
    initNavbar();
    initScrollAnimations();
    initProjectFiltering();
    initSmoothScrolling();
    initBackToTopButton();
    initLoadAnimations();
    initCommandPalette();
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


function initParticleAnimation() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let nodes = [];

    class TechNode {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 3 + 2;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulse = 0;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.pulse += this.pulseSpeed;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            const isLightMode = document.body.classList.contains('light-mode');
            const baseColor = isLightMode ? '79, 70, 229' : '99, 102, 241';
            const opacity = 0.3 + Math.sin(this.pulse) * 0.2;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${baseColor}, ${opacity})`;
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + 3, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${baseColor}, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    function initTechBackground() {
        nodes = [];
        const nodeCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
        for (let i = 0; i < nodeCount; i++) {
            nodes.push(new TechNode());
        }
    }

    function drawPipelines() {
        const isLightMode = document.body.classList.contains('light-mode');
        const baseColor = isLightMode ? '79, 70, 229' : '99, 102, 241';
        
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const opacity = 0.15 * (1 - distance / 150);
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(${baseColor}, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    
                    const midX = (nodes[i].x + nodes[j].x) / 2;
                    const midY = (nodes[i].y + nodes[j].y) / 2;
                    ctx.beginPath();
                    ctx.arc(midX, midY, 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${baseColor}, ${opacity * 2})`;
                    ctx.fill();
                }
            }
        }
    }

    function animateTechBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPipelines();
        
        for (let node of nodes) {
            node.update();
            node.draw();
        }

        requestAnimationFrame(animateTechBackground);
    }

    const debouncedResize = debounce(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initTechBackground();
    }, 250);

    initTechBackground();
    animateTechBackground();
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

function initTypingEffect() {
    const typedText = document.getElementById('typed-text');
    if (!typedText) return;

    const textArray = [
        'Full Stack Developer',
        'AI Software Engineer',
        'Security Enthusiast',
        'Open Source Contributor',
        'Problem Solver'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typedText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500;
        }

        setTimeout(typeText, typeSpeed);
    }

    setTimeout(typeText, 1000);
}

function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - navbar.offsetHeight - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the current section's id
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function initBackToTopButton() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
}

function initCommandPalette() {
    const overlay = document.getElementById('commandPaletteOverlay');
    const input = document.getElementById('commandInput');
    const resultsContainer = document.getElementById('commandResults');

    const commands = [
        { name: 'Home: Go to top', action: () => document.querySelector('a[href="#home"]').click() },
        { name: 'About: Go to section', action: () => document.querySelector('a[href="#about"]').click() },
        { name: 'Experience: Go to section', action: () => document.querySelector('a[href="#experience"]').click() },
        { name: 'Projects: Go to section', action: () => document.querySelector('a[href="#projects"]').click() },
        { name: 'Skills: Go to section', action: () => document.querySelector('a[href="#skills"]').click() },
        { name: 'Education: Go to section', action: () => document.querySelector('a[href="#education"]').click() },
        { name: 'Contact: Go to section', action: () => document.querySelector('a[href="#contact"]').click() },
        { name: 'Theme: Toggle Light/Dark Mode', action: () => document.getElementById('themeToggle').click() },
        { name: 'GitHub: Open profile', action: () => window.open('https://github.com/kajal1322705', '_blank') },
        { name: 'LinkedIn: Open profile', action: () => window.open('https://www.linkedin.com/in/aditya-choudhry/', '_blank') },
        { name: 'Blog: View Articles', action: () => window.location.href = 'blog.html' },
    ];

    function renderResults(filteredCommands) {
        resultsContainer.innerHTML = '';
        filteredCommands.forEach((command, index) => {
            const li = document.createElement('li');
            li.textContent = command.name;
            if (index === 0) {
                li.classList.add('selected');
            }
            li.addEventListener('click', () => {
                command.action();
                closePalette();
            });
            resultsContainer.appendChild(li);
        });
    }

    function openPalette() {
        overlay.classList.add('visible');
        input.focus();
        renderResults(commands);
    }

    function closePalette() {
        overlay.classList.remove('visible');
        input.value = '';
    }

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (overlay.classList.contains('visible')) {
                closePalette();
            } else {
                openPalette();
            }
        }
        if (e.key === 'Escape' && overlay.classList.contains('visible')) {
            closePalette();
        }
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closePalette();
        }
    });

    input.addEventListener('input', () => {
        const query = input.value.toLowerCase();
        const filteredCommands = commands.filter(command => command.name.toLowerCase().includes(query));
        renderResults(filteredCommands);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const selected = resultsContainer.querySelector('.selected');
            if (selected) {
                selected.click();
            }
        }
    });
}


function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.about-text, .about-image, .skill-category, .timeline-item, .education-card, .certification-card').forEach(el => {
        observer.observe(el);
    });

    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
}

function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projects.forEach(project => {
                project.classList.remove('show', 'hide');
                
                if (filter === 'all' || project.getAttribute('data-category') === filter) {
                    setTimeout(() => {
                        project.classList.add('show');
                    }, 100);
                } else {
                    project.classList.add('hide');
                }
            });
        });
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length <= 1) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initLoadAnimations() {
    window.addEventListener('load', () => {
        document.querySelectorAll('.project-card').forEach((project, index) => {
            setTimeout(() => {
                project.classList.add('show');
            }, index * 100);
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('section').forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
            }, index * 100);
        });
    });
}