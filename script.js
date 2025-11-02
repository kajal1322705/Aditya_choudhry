/**
 * Main JavaScript file for the portfolio website.
 * Handles all dynamic functionality including animations, theme toggling,
 * navigation, and interactive components.
 */

// Main entry point. Fires when the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => { 
    initParticleAnimation();
    initPreloader();
    initThemeToggle();
    initTypingEffect();
    initNavbar();
    initScrollAnimations();
    initProjectFiltering();
    initSmoothScrolling();
    initBackToTopButton();
    initLoadAnimations();
    initCommandPalette();
    initCartoonAssistant();
    initSkillBubbles();
});


/**
 * Debounce function to limit the rate at which a function gets called.
 * Useful for performance-intensive events like window resizing.
 * @param {Function} func The function to debounce.
 * @param {number} wait The delay in milliseconds.
 * @returns {Function} The debounced function.
 */
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


/**
 * Initializes and animates the particle background effect on the canvas.
 * Creates a network of nodes that move and connect to each other.
 */
function initParticleAnimation() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return; // Exit if canvas is not on the page
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let nodes = [];

    /**
     * Represents a single node in the particle animation.
     */
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

        /**
         * Updates the node's position and pulse effect.
         */
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.pulse += this.pulseSpeed;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        /**
         * Draws the node and its outer glow on the canvas.
         */
        draw() {
            const isLightMode = document.body.classList.contains('light-mode');
            const baseColor = isLightMode ? '79, 70, 229' : '99, 102, 241';
            const secondaryColor = isLightMode ? '124, 58, 237' : '139, 92, 246';
            const pulseOpacity = 0.4 + Math.sin(this.pulse) * 0.3;
            
            // Outer glow rings
            for (let i = 3; i > 0; i--) {
                const glowRadius = this.radius + i * 2;
                const glowOpacity = pulseOpacity * 0.2 * (i / 3);
                ctx.beginPath();
                ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${secondaryColor}, ${glowOpacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            
            // Main node with gradient
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            gradient.addColorStop(0, `rgba(${baseColor}, ${pulseOpacity})`);
            gradient.addColorStop(0.7, `rgba(${secondaryColor}, ${pulseOpacity * 0.8})`);
            gradient.addColorStop(1, `rgba(${baseColor}, ${pulseOpacity * 0.5})`);
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Inner highlight
            ctx.beginPath();
            ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity * 0.3})`;
            ctx.fill();
        }
    }

    /**
     * Creates the initial set of nodes based on canvas size.
     */
    function initTechBackground() {
        nodes = [];
        const nodeCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
        for (let i = 0; i < nodeCount; i++) {
            nodes.push(new TechNode());
        }
    }

    /**
     * Draws lines between nearby nodes to create a network effect.
     */
    function drawPipelines() {
        const isLightMode = document.body.classList.contains('light-mode');
        const baseColor = isLightMode ? '79, 70, 229' : '99, 102, 241';
        const secondaryColor = isLightMode ? '124, 58, 237' : '139, 92, 246';
        
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const opacity = 0.2 * (1 - distance / 150);
                    const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                    gradient.addColorStop(0, `rgba(${baseColor}, ${opacity})`);
                    gradient.addColorStop(0.5, `rgba(${secondaryColor}, ${opacity * 1.2})`);
                    gradient.addColorStop(1, `rgba(${baseColor}, ${opacity})`);
                    
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                    
                    // Enhanced midpoint with glow effect
                    const midX = (nodes[i].x + nodes[j].x) / 2;
                    const midY = (nodes[i].y + nodes[j].y) / 2;
                    const pulse = (Math.sin(Date.now() * 0.003) + 1) * 0.5;
                    
                    ctx.beginPath();
                    ctx.arc(midX, midY, 3 + pulse * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${secondaryColor}, ${opacity * 2.5 * (0.5 + pulse)})`;
                    ctx.fill();
                    
                    // Outer glow
                    ctx.beginPath();
                    ctx.arc(midX, midY, 5 + pulse * 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${secondaryColor}, ${opacity * 0.5 * pulse})`;
                    ctx.fill();
                }
            }
        }
    }

    /**
     * The main animation loop. Clears the canvas and redraws all elements.
     */
    function animateTechBackground() {
        // Create a trailing effect instead of clearing completely
        const isLightMode = document.body.classList.contains('light-mode');
        const fadeColor = isLightMode ? '241, 245, 249' : '2, 6, 23';
        ctx.fillStyle = `rgba(${fadeColor}, 0.08)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        drawPipelines();
        
        for (let node of nodes) {
            node.update();
            node.draw();
        }

        requestAnimationFrame(animateTechBackground);
    }

    /**
     * Handles window resize events to make the canvas responsive.
     */
    const debouncedResize = debounce(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initTechBackground();
    }, 250);

    initTechBackground();
    animateTechBackground();
}

/**
 * Handles the preloader functionality.
 * Hides the preloader and reveals the page content once the window has fully loaded.
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
        document.body.classList.remove('loading');
    });
}


/**
 * Initializes the light/dark mode theme toggle.
 * Checks for a saved theme in localStorage and applies it.
 * Adds a click event listener to the toggle button.
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');

    // Apply saved theme on page load
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        // Save the user's preference in localStorage
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

/**
 * Initializes the typing animation effect in the hero section.
 * Cycles through an array of strings, typing and deleting them.
 */
function initTypingEffect() {
    const typedText = document.getElementById('typed-text');
    // Exit if the element doesn't exist on the page
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

    /**
     * The core typing logic.
     */
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

        // If word is fully typed, pause and then start deleting
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) { // If word is fully deleted, move to the next word
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500;
        }

        setTimeout(typeText, typeSpeed);
    }

    // Start the typing effect after a short delay
    setTimeout(typeText, 1000);
}

/**
 * Initializes all navigation-related functionality.
 * Handles the mobile hamburger menu, sticky navbar on scroll,
 * and active link highlighting for both the navbar and the side stepper.
 */
function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const stepperDots = document.querySelectorAll('.stepper-dot');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu on hamburger click
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Only close the menu if the hamburger is visible (i.e., on mobile)
            if (hamburger.offsetParent !== null) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Handle scroll-based events for the navbar
    window.addEventListener('scroll', () => {
        // Add 'scrolled' class to navbar for styling
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Determine the current section in view
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - navbar.offsetHeight - 100) {
                current = section.getAttribute('id');
            }
        });

        // Update active state for navbar links
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the current section's id
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Update active state for side stepper dots
        stepperDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    });
}

/**
 * Initializes the interactive cartoon assistant.
 * The assistant provides contextual messages based on the visible section.
 */
function initCartoonAssistant() {
    const assistant = document.getElementById('cartoonAssistant');
    const speechBubble = document.getElementById('speechBubble');
    if (!assistant || !speechBubble) return;

    const messages = {
        home: "Welcome! I'm your AI assistant. Feel free to look around.",
        about: "Aditya seems like a skilled engineer, doesn't he?",
        experience: "Wow, that's some impressive work experience!",
        projects: "These projects look fun! Click on one to see the code.",
        skills: "So many skills! He's like a digital Swiss Army knife.",
        education: "Looks like he's a lifelong learner.",
        contact: "Don't be shy, say hello! He'd love to connect.",
    };

    let messageTimeout;

    function showMessage(text) {
        clearTimeout(messageTimeout);
        speechBubble.textContent = text;
        speechBubble.classList.add('visible');

        messageTimeout = setTimeout(() => {
            speechBubble.classList.remove('visible');
        }, 5000); // Message disappears after 5 seconds
    }

    // Show welcome message on load
    setTimeout(() => showMessage(messages.home), 2500);

    // Show contextual messages on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (messages[sectionId]) {
                    showMessage(messages[sectionId]);
                }
            }
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
}

/**
 * Initializes the floating bubble effect for the skills section.
 * Positions skill tags randomly within their container.
 */
function initSkillBubbles() {
    const skillContainers = document.querySelectorAll('.skill-items');
    // Exit if there are no skill containers on the current page
    if (skillContainers.length === 0) return;

    skillContainers.forEach(container => {
        const skills = container.querySelectorAll('.skill-tag');
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        skills.forEach(skill => {
            const skillWidth = skill.offsetWidth;
            const skillHeight = skill.offsetHeight;
            
            skill.style.left = `${Math.random() * (containerWidth - skillWidth)}px`;
            skill.style.top = `${Math.random() * (containerHeight - skillHeight)}px`;
            skill.style.setProperty('--delay', `${Math.random() * 5}s`);
        });
    });
}

/**
 * Initializes the "Back to Top" button.
 * Makes the button visible when the user scrolls down the page.
 */
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

/**
 * Initializes the command palette feature (Ctrl+K).
 * Allows users to quickly navigate the site, toggle themes, and open links.
 */
function initCommandPalette() {
    const overlay = document.getElementById('commandPaletteOverlay');
    const input = document.getElementById('commandInput');
    const resultsContainer = document.getElementById('commandResults');

    // Define all available commands
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

    /**
     * Renders the list of commands based on the filter.
     */
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

    /**
     * Opens the command palette.
     */
    function openPalette() {
        overlay.classList.add('visible');
        input.focus();
        renderResults(commands);
    }

    /**
     * Closes the command palette.
     */
    function closePalette() {
        overlay.classList.remove('visible');
        input.value = '';
    }

    // Add keyboard shortcuts to open (Ctrl+K) and close (Esc) the palette
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

    // Close palette when clicking on the overlay background
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closePalette();
        }
    });

    // Filter commands as the user types with smooth animation
    input.addEventListener('input', () => {
        const query = input.value.toLowerCase();
        const filteredCommands = commands.filter(command => command.name.toLowerCase().includes(query));
        
        // Add fade effect
        resultsContainer.style.opacity = '0';
        setTimeout(() => {
            renderResults(filteredCommands);
            resultsContainer.style.opacity = '1';
        }, 150);
    });

    // Execute the selected command on 'Enter' key press
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const selected = resultsContainer.querySelector('.selected');
            if (selected) {
                selected.click();
            }
        }
    });
}


/**
 * Initializes scroll-triggered animations for various elements.
 * Uses IntersectionObserver for performance.
 */
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

    // Observe elements that fade/slide in
    document.querySelectorAll('.about-text, .about-image, .skill-category, .timeline-item, .education-card, .certification-card').forEach(el => {
        observer.observe(el);
    });

    // Observe project cards with a separate observer for their specific animation
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const card = entry.target;
                // Stagger animation for visual appeal
                setTimeout(() => {
                    card.classList.add('show');
                }, index * 100);
                projectObserver.unobserve(card); // Animate only once
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
    
    // Add subtle parallax effect to project cards on scroll
    window.addEventListener('scroll', debounce(() => {
        const currentScrollY = window.scrollY;
        
        projectCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && card.classList.contains('show')) {
                const offset = Math.sin((currentScrollY * 0.005) + (index * 0.5)) * 3;
                card.style.transform = `translateY(${offset}px) scale(1)`;
            }
        });
    }, 16), { passive: true });
}

/**
 * Initializes the filtering functionality for the projects section.
 */
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Show or hide projects based on the selected filter
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

/**
 * Initializes smooth scrolling for anchor links.
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Add click listener to all anchor links starting with '#'
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
            // Scroll to the target element with an offset for the fixed navbar
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

/**
 * Initializes animations that trigger on page load.
 */
function initLoadAnimations() {
    // Fade in sections as the DOM loads
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('section').forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
            }, index * 100);
        });
    });
}