// Ubuntu Portfolio - OS-style Interface

document.addEventListener('DOMContentLoaded', function() {
    initDateTime();
    initLogin();
    initDesktop();
});

// Date/Time Display
function initDateTime() {
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const formatted = now.toLocaleDateString('en-US', options);
        
        const loginDT = document.getElementById('loginDateTime');
        const panelDT = document.getElementById('panelDateTime');
        
        if (loginDT) loginDT.textContent = formatted;
        if (panelDT) panelDT.textContent = formatted;
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

// Login Screen
function initLogin() {
    const loginScreen = document.getElementById('loginScreen');
    const desktop = document.getElementById('desktop');
    const loginBtn = document.getElementById('loginBtn');
    const passwordInput = document.getElementById('passwordInput');
    const loginUserName = document.getElementById('loginUserName');
    
    // Set user name from config
    loginUserName.textContent = CONFIG.personal.name;
    
    function doLogin() {
        loginScreen.classList.add('hidden');
        desktop.classList.add('active');
    }
    
    loginBtn.addEventListener('click', doLogin);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') doLogin();
    });
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        desktop.classList.remove('active');
        loginScreen.classList.remove('hidden');
        passwordInput.value = '';
        closeAllWindows();
    });
}

// Desktop Icons & Windows
const desktopSections = [
    { id: 'home', icon: 'fas fa-home', label: 'Home', iconClass: 'home' },
    { id: 'about', icon: 'fas fa-user', label: 'About', iconClass: 'about' },
    { id: 'experience', icon: 'fas fa-briefcase', label: 'Experience', iconClass: 'experience' },
    { id: 'skills', icon: 'fas fa-code', label: 'Skills', iconClass: 'skills' },
    { id: 'projects', icon: 'fas fa-folder-open', label: 'Projects', iconClass: 'projects' },
    { id: 'contact', icon: 'fas fa-envelope', label: 'Contact', iconClass: 'contact' }
];

let openWindows = {};
let windowZIndex = 10;

function initDesktop() {
    renderDesktopIcons();
    renderDock();
}

function renderDesktopIcons() {
    const container = document.getElementById('desktopIcons');
    container.innerHTML = desktopSections.map(section => `
        <div class="desktop-icon" data-section="${section.id}" ondblclick="openWindow('${section.id}')">
            <div class="icon ${section.iconClass}">
                <i class="${section.icon}"></i>
            </div>
            <span>${section.label}</span>
        </div>
    `).join('');
}

function renderDock() {
    const dock = document.getElementById('dock');
    dock.innerHTML = desktopSections.map(section => `
        <div class="dock-item" style="background: linear-gradient(135deg, ${getDockColor(section.id)});" 
             onclick="openWindow('${section.id}')" title="${section.label}">
            <i class="${section.icon}"></i>
        </div>
    `).join('');
}

function getDockColor(id) {
    const colors = {
        home: '#22c55e, #16a34a',
        about: '#3b82f6, #2563eb',
        experience: '#8b5cf6, #7c3aed',
        skills: '#ec4899, #db2777',
        projects: '#06b6d4, #0891b2',
        contact: '#f43f5e, #e11d48'
    };
    return colors[id] || '#E95420, #d4470f';
}

function openWindow(sectionId) {
    // If window already open, bring to front
    if (openWindows[sectionId]) {
        bringToFront(sectionId);
        return;
    }
    
    const section = desktopSections.find(s => s.id === sectionId);
    if (!section) return;
    
    const container = document.getElementById('windowsContainer');
    const windowId = `window-${sectionId}`;
    
    // Calculate position with offset for multiple windows
    const offset = Object.keys(openWindows).length * 30;
    const left = 150 + offset;
    const top = 20 + offset;
    
    const windowEl = document.createElement('div');
    windowEl.className = 'window';
    windowEl.id = windowId;
    windowEl.style.width = '700px';
    windowEl.style.height = '500px';
    windowEl.style.left = left + 'px';
    windowEl.style.top = top + 'px';
    windowEl.style.zIndex = ++windowZIndex;
    
    windowEl.innerHTML = `
        <div class="window-header" onmousedown="startDrag(event, '${windowId}')">
            <div class="window-controls">
                <button class="window-control close" onclick="closeWindow('${sectionId}')"></button>
                <button class="window-control minimize" onclick="minimizeWindow('${sectionId}')"></button>
                <button class="window-control maximize" onclick="maximizeWindow('${windowId}')"></button>
            </div>
            <div class="window-title">
                <i class="${section.icon}"></i>
                ${section.label}
            </div>
        </div>
        <div class="window-body">
            ${getWindowContent(sectionId)}
        </div>
    `;
    
    container.appendChild(windowEl);
    openWindows[sectionId] = windowEl;
    
    // Update dock
    updateDockActive();
    
    // Click to bring to front
    windowEl.addEventListener('mousedown', () => bringToFront(sectionId));
}

function getWindowContent(sectionId) {
    switch(sectionId) {
        case 'home': return getHomeContent();
        case 'about': return getAboutContent();
        case 'experience': return getExperienceContent();
        case 'skills': return getSkillsContent();
        case 'projects': return getProjectsContent();
        case 'contact': return getContactContent();
        default: return '<p>Content not found</p>';
    }
}

function getHomeContent() {
    const { name, title, bio, github, linkedin } = CONFIG.personal;
    return `
        <div class="content-section">
            <h2>Welcome!</h2>
            <p style="font-size: 28px; color: #fff; margin-bottom: 10px;">${name}</p>
            <p style="font-size: 18px; color: var(--ubuntu-orange); margin-bottom: 20px;">${title}</p>
            <p>${bio}</p>
            <div class="stat-grid">
                ${CONFIG.stats.map(s => `
                    <div class="stat-card">
                        <div class="number">${s.number}</div>
                        <div class="label">${s.label}</div>
                    </div>
                `).join('')}
            </div>
            <div style="margin-top: 20px;">
                <a href="${github}" target="_blank" class="contact-item" style="display: inline-flex; margin-right: 10px;">
                    <i class="fab fa-github"></i>
                    <span>GitHub</span>
                </a>
                <a href="${linkedin}" target="_blank" class="contact-item" style="display: inline-flex;">
                    <i class="fab fa-linkedin"></i>
                    <span>LinkedIn</span>
                </a>
            </div>
        </div>
    `;
}

function getAboutContent() {
    return `
        <div class="content-section">
            <h2>About Me</h2>
            <p>I'm a passionate Full Stack Developer specializing in <strong style="color: var(--ubuntu-orange);">Project Security</strong>, <strong style="color: var(--ubuntu-orange);">Quantum Computing</strong>, <strong style="color: var(--ubuntu-orange);">Microservices Architecture</strong>, and <strong style="color: var(--ubuntu-orange);">End-to-End System Design</strong>.</p>
            <p>Experienced in healthcare/AI integrations, DevOps automation, and RBAC/JWT security. I focus on developing robust security solutions and exploring cutting-edge technologies.</p>
            
            <h3 style="margin-top: 25px;">Areas of Expertise</h3>
            <div class="expertise-grid">
                ${CONFIG.expertise.map(e => `
                    <div class="expertise-card">
                        <i class="${e.icon}"></i>
                        <h4>${e.title}</h4>
                        <p>${e.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getExperienceContent() {
    return `
        <div class="content-section">
            <h2>Work Experience</h2>
            <div class="timeline">
                ${CONFIG.experience.map(job => `
                    <div class="timeline-item">
                        <h4>${job.title}</h4>
                        <div class="date">${job.date}</div>
                        <div class="company">${job.company}</div>
                        <ul>
                            ${job.responsibilities.map(r => `<li>${r}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            
            <h3 style="margin-top: 30px;">Education</h3>
            <div class="education-grid">
                ${CONFIG.education.map(edu => `
                    <div class="education-card">
                        <i class="${edu.icon}"></i>
                        <div>
                            <h4>${edu.degree}</h4>
                            <p>${edu.school}</p>
                            <span class="date">${edu.date}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getSkillsContent() {
    let html = '<div class="content-section"><h2>Technical Skills</h2>';
    
    for (const [category, skills] of Object.entries(CONFIG.skills)) {
        html += `
            <div class="skills-category">
                <h4>${category}</h4>
                <div class="skills-grid">
                    ${skills.map(skill => `
                        <div class="skill-item">
                            <i class="${skill.icon}"></i>
                            <span>${skill.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

function getProjectsContent() {
    return `
        <div class="content-section">
            <h2>Projects</h2>
            <div class="project-grid">
                ${CONFIG.projects.map(project => `
                    <div class="project-card">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getContactContent() {
    const { email, phone, github, linkedin } = CONFIG.personal;
    return `
        <div class="content-section">
            <h2>Get In Touch</h2>
            <p>I'm currently available for freelance work and open to new opportunities. Feel free to reach out!</p>
            
            <div class="contact-grid">
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
            
            <h3 style="margin-top: 25px;">Certifications</h3>
            <div class="cert-grid">
                ${CONFIG.certifications.map(cert => `
                    <div class="cert-item">
                        <i class="${cert.icon}"></i>
                        <span>${cert.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Window Management
function closeWindow(sectionId) {
    const windowEl = openWindows[sectionId];
    if (windowEl) {
        windowEl.remove();
        delete openWindows[sectionId];
        updateDockActive();
    }
}

function closeAllWindows() {
    Object.keys(openWindows).forEach(id => closeWindow(id));
}

function minimizeWindow(sectionId) {
    const windowEl = openWindows[sectionId];
    if (windowEl) {
        windowEl.classList.toggle('minimized');
    }
}

function maximizeWindow(windowId) {
    const windowEl = document.getElementById(windowId);
    if (!windowEl) return;
    
    if (windowEl.dataset.maximized === 'true') {
        windowEl.style.width = windowEl.dataset.prevWidth;
        windowEl.style.height = windowEl.dataset.prevHeight;
        windowEl.style.left = windowEl.dataset.prevLeft;
        windowEl.style.top = windowEl.dataset.prevTop;
        windowEl.dataset.maximized = 'false';
    } else {
        windowEl.dataset.prevWidth = windowEl.style.width;
        windowEl.dataset.prevHeight = windowEl.style.height;
        windowEl.dataset.prevLeft = windowEl.style.left;
        windowEl.dataset.prevTop = windowEl.style.top;
        
        windowEl.style.width = '100%';
        windowEl.style.height = 'calc(100vh - 88px)';
        windowEl.style.left = '0';
        windowEl.style.top = '0';
        windowEl.dataset.maximized = 'true';
    }
}

function bringToFront(sectionId) {
    const windowEl = openWindows[sectionId];
    if (windowEl) {
        windowEl.style.zIndex = ++windowZIndex;
        windowEl.classList.remove('minimized');
    }
}

function updateDockActive() {
    document.querySelectorAll('.dock-item').forEach((item, index) => {
        const sectionId = desktopSections[index].id;
        if (openWindows[sectionId]) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Dragging Windows
let dragData = null;

function startDrag(e, windowId) {
    const windowEl = document.getElementById(windowId);
    if (!windowEl || windowEl.dataset.maximized === 'true') return;
    
    dragData = {
        windowId,
        startX: e.clientX,
        startY: e.clientY,
        startLeft: parseInt(windowEl.style.left) || 0,
        startTop: parseInt(windowEl.style.top) || 0
    };
    
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
}

function onDrag(e) {
    if (!dragData) return;
    
    const windowEl = document.getElementById(dragData.windowId);
    if (!windowEl) return;
    
    const dx = e.clientX - dragData.startX;
    const dy = e.clientY - dragData.startY;
    
    windowEl.style.left = (dragData.startLeft + dx) + 'px';
    windowEl.style.top = (dragData.startTop + dy) + 'px';
}

function stopDrag() {
    dragData = null;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
}
