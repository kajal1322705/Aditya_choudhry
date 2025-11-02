const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initTechBackground();
});

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

let nodes = [];
let pipelines = [];

function initTechBackground() {
    nodes = [];
    pipelines = [];
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

initTechBackground();
animateTechBackground();

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

const typedText = document.getElementById('typed-text');
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
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

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

window.addEventListener('load', () => {
    projects.forEach((project, index) => {
        setTimeout(() => {
            project.classList.add('show');
        }, index * 100);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
        }, index * 100);
    });
});
