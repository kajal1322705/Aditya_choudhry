// Portfolio App - Renders content from config.js

document.addEventListener('DOMContentLoaded', function() {
    renderHero();
    renderAbout();
    renderExpertise();
    renderExperience();
    renderEducation();
    renderSkills();
    renderProjects();
    renderContact();
    renderFooter();
    initMobileMenu();
    initSmoothScroll();
});

// Render Hero Section
function renderHero() {
    const { name, title, bio, github, linkedin, email } = CONFIG.personal;
    document.getElementById('heroContent').innerHTML = `
        <p class="greeting">Hello, I'm</p>
        <h1>${name}</h1>
        <p class="tagline">${title}</p>
        <p class="bio">${bio}</p>
        <div class="hero-buttons">
            <a href="#contact" class="btn btn-primary">Get In Touch</a>
            <a href="#projects" class="btn btn-secondary">View Projects</a>
        </div>
        <div class="social-links">
            <a href="${github}" target="_blank"><i class="fab fa-github"></i></a>
            <a href="${linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="mailto:${email}"><i class="fas fa-envelope"></i></a>
        </div>
    `;
    document.title = `${name} - ${title}`;
}

// Render About Section
function renderAbout() {
    const { availabilityText } = CONFIG.personal;
    const statsHtml = CONFIG.stats.map(stat => `
        <div class="stat">
            <span class="stat-number">${stat.number}</span>
            <span class="stat-label">${stat.label}</span>
        </div>
    `).join('');

    document.getElementById('aboutContent').innerHTML = `
        <div class="about-text">
            <p>I'm a passionate Full Stack Developer specializing in <strong>Project Security</strong>, <strong>Quantum Computing</strong>, <strong>Microservices Architecture</strong>, and <strong>End-to-End System Design</strong>. I build secure, scalable applications that solve real-world problems.</p>
            <p>Experienced in healthcare/AI integrations, DevOps automation, and RBAC/JWT security. I focus on developing robust security solutions and exploring cutting-edge technologies.</p>
            <div class="availability-badge">
                <i class="fas fa-circle"></i> ${availabilityText}
            </div>
        </div>
        <div class="about-stats">${statsHtml}</div>
    `;
}

// Render Expertise Cards
function renderExpertise() {
    const html = CONFIG.expertise.map(item => `
        <div class="expertise-card">
            <i class="${item.icon}"></i>
            <h4>${item.title}</h4>
            <p>${item.description}</p>
        </div>
    `).join('');
    document.getElementById('expertiseGrid').innerHTML = html;
}

// Render Experience Timeline
function renderExperience() {
    const html = CONFIG.experience.map(job => `
        <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <h3>${job.title}</h3>
                    <span class="timeline-date">${job.date}</span>
                </div>
                <p class="timeline-company">${job.company}</p>
                <ul class="timeline-list">
                    ${job.responsibilities.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
    document.getElementById('experienceTimeline').innerHTML = html;
}

// Render Education
function renderEducation() {
    const html = CONFIG.education.map(edu => `
        <div class="education-card">
            <div class="education-icon">
                <i class="${edu.icon}"></i>
            </div>
            <div class="education-info">
                <h4>${edu.degree}</h4>
                <p>${edu.school}</p>
                <span class="education-date">${edu.date}</span>
            </div>
        </div>
    `).join('');
    document.getElementById('educationGrid').innerHTML = html;
}

// Render Skills by Category
function renderSkills() {
    let html = '';
    for (const [category, skills] of Object.entries(CONFIG.skills)) {
        const skillsHtml = skills.map(skill => `
            <div class="skill-card">
                <i class="${skill.icon}"></i>
                <h4>${skill.name}</h4>
            </div>
        `).join('');

        html += `
            <div class="skills-category">
                <h3>${category}</h3>
                <div class="skills-grid">${skillsHtml}</div>
            </div>
        `;
    }
    document.getElementById('skillsContainer').innerHTML = html;
}

// Render Projects
function renderProjects() {
    const html = CONFIG.projects.map(project => `
        <div class="project-card">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    document.getElementById('projectsGrid').innerHTML = html;
}

// Render Contact Section
function renderContact() {
    const { email, phone, github, linkedin } = CONFIG.personal;
    const certsHtml = CONFIG.certifications.map(cert => `
        <div class="cert-badge">
            <i class="${cert.icon}"></i>
            <span>${cert.name}</span>
        </div>
    `).join('');

    document.getElementById('contactContent').innerHTML = `
        <h2>Get In Touch</h2>
        <p class="contact-text">I'm currently available for freelance work and open to new opportunities. Feel free to reach out!</p>
        <div class="contact-info">
            <a href="mailto:${email}" class="contact-item">
                <i class="fas fa-envelope"></i>
                <span>${email}</span>
            </a>
            <a href="tel:${phone.replace(/-/g, '')}" class="contact-item">
                <i class="fas fa-phone"></i>
                <span>${phone}</span>
            </a>
            <a href="${github}" target="_blank" class="contact-item">
                <i class="fab fa-github"></i>
                <span>GitHub</span>
            </a>
            <a href="${linkedin}" target="_blank" class="contact-item">
                <i class="fab fa-linkedin"></i>
                <span>LinkedIn</span>
            </a>
        </div>
        <div class="certifications">
            <h3>Certifications</h3>
            <div class="cert-badges">${certsHtml}</div>
        </div>
    `;
}

// Render Footer
function renderFooter() {
    document.getElementById('footerName').textContent = CONFIG.personal.name;
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');

    mobileToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
