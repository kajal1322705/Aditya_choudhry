
const resumeData = {
    summary: `
        <p>Innovative and passionate AI and automation developer with experience in bot development, AI-driven solutions, and automation. Active contributor to open-source projects, with multiple hackathon participations and bounty work. Strong problem-solving skills and a deep interest in decentralized AI, blockchain, and superintelligence.</p>
    `,
    experience: `
        <div class="experience-item">
            <h3>AI & Automation Developer | Open Source Contributor</h3>
            <p class="duration">2024 - Present</p>
            <ul>
                <li>Actively working on DeepSeek Love Hackathon, developing AI-enhanced solutions</li>
                <li>Engaged in multiple bounties, including Apple Watch integration for BasedHardware/omi</li>
                <li>Developing and deploying AI-driven automation and bots for various applications</li>
                <li>Exploring AI integration in network resilience for underserved areas</li>
            </ul>
        </div>
        <div class="experience-item">
            <h3>Full Stack Developer at Guby Rogers</h3>
            <p class="duration">12/2023 - 04/2024</p>
            <ul>
                <li>Designed and implemented both backend and frontend solutions</li>
                <li>Developed and maintained scalable databases</li>
                <li>Managed cloud services on Azure and AWS</li>
                <li>Ensured performance optimization and smooth user experience</li>
            </ul>
        </div>
    `,
    education: `
        <div class="education-item">
            <h3>Master of Computer Applications (MCA)</h3>
            <p>MMICTBM, Ambala, Haryana (2022 - 2024)</p>
            <p>Maintained 8+ CGPA</p>
        </div>
        <div class="education-item">
            <h3>Bachelor of Technology (B.Tech) - Civil Engineering</h3>
            <p>DIT University, Dehradun, Uttarakhand (2015 - 2019)</p>
            <p>Strong analytical and problem-solving foundation</p>
        </div>
    `,
    skills: `
        <div class="skills-section">
            <h3>Programming & Backend</h3>
            <p>JavaScript, GoLang, Rust, Python, Java, Node.js, Express.js, GoFiber</p>
            
            <h3>Databases & Messaging</h3>
            <p>PostgreSQL, Redis, Kafka</p>
            
            <h3>AI & Blockchain</h3>
            <p>OpenAI, Deep Learning, NLP, RAG-based chatbots, Zero-Knowledge Proofs (ZKP), Smart Contracts</p>
            
            <h3>Cloud & DevOps</h3>
            <p>AWS, Azure, Docker, Kubernetes, CI/CD</p>
            
            <h3>Tools & Automation</h3>
            <p>Git, GitHub, Web Scraping</p>
        </div>
    `
};

document.addEventListener('DOMContentLoaded', () => {
    // Show loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingScreen);

    // Initialize wave background
    const waveBackground = new WaveBackground();
    
    // Create dock menu
    createDock();
    
    // Hide loading screen after everything is loaded
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
    
    // Update UI colors based on wave background
    setInterval(() => {
        const primaryColor = `hsl(${waveBackground.baseColors[0].h}, ${waveBackground.baseColors[0].s}%, ${waveBackground.baseColors[0].l}%)`;
        const accentColor = `hsl(${waveBackground.baseColors[1].h}, ${waveBackground.baseColors[1].s}%, ${waveBackground.baseColors[1].l + 10}%)`;
        
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--accent-color', accentColor);
    }, 100);
    
    const cards = document.querySelectorAll('.card');
    const popup = document.querySelector('.popup-overlay');
    const popupTitle = popup.querySelector('.popup-header h2');
    const popupBody = popup.querySelector('.popup-body');
    const closeBtn = popup.querySelector('.close-btn');

    // Contact form functionality
    const contactBtn = document.getElementById('contact-btn');
    const contactForm = document.getElementById('contact-form');
    const closeContactBtn = document.querySelector('.close-contact-btn');
    const emailForm = document.getElementById('email-form');

    contactBtn.addEventListener('click', () => {
        contactForm.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeContactBtn.addEventListener('click', () => {
        contactForm.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    contactForm.addEventListener('click', (e) => {
        if (e.target === contactForm) {
            contactForm.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send this data to a server
        // For now, we'll open the default mail client
        window.location.href = `mailto:aditya.gardian@gmail.com?subject=Contact from ${name}&body=${message}%0A%0AFrom: ${name} (${email})`;
        
        // Reset form
        emailForm.reset();
        
        // Close the form
        contactForm.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const section = card.dataset.section;
            popupTitle.textContent = card.querySelector('h2').textContent;
            popupBody.innerHTML = resumeData[section];
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Function to create the dock menu
function createDock() {
    const dockContainer = document.createElement('div');
    dockContainer.className = 'dock-container';
    
    // Array of dock items
    const dockItems = [
        { icon: '📋', label: 'Resume', action: () => showResume() },
        { icon: '💼', label: 'Projects', action: () => toggleProjects() },
        { icon: '📞', label: 'Contact', action: () => showContact() }
    ];
    
    // Create dock items
    dockItems.forEach((item, index) => {
        const dockItem = document.createElement('div');
        dockItem.className = 'dock-item';
        dockItem.setAttribute('data-index', index);
        dockItem.innerHTML = `
            <div class="dock-item-icon">${item.icon}</div>
            <div class="dock-item-label">${item.label}</div>
        `;
        
        dockItem.addEventListener('click', () => {
            // Remove active class from all items
            document.querySelectorAll('.dock-item').forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            dockItem.classList.add('active');
            // Execute the action
            item.action();
        });
        
        // Add dock hover effect
        dockItem.addEventListener('mouseover', () => updateDockHoverEffect(index));
        dockItem.addEventListener('mouseout', () => resetDockHoverEffect());
        
        dockContainer.appendChild(dockItem);
    });
    
    document.body.appendChild(dockContainer);
    
    // Create projects section (hidden by default)
    displayProjects();
}

// Function to update dock hover effect
function updateDockHoverEffect(hoveredIndex) {
    const dockItems = document.querySelectorAll('.dock-item');
    
    dockItems.forEach((item, index) => {
        item.classList.remove('dock-neighbors-1', 'dock-neighbors-2');
        
        const distance = Math.abs(index - hoveredIndex);
        
        if (distance === 1) {
            item.classList.add('dock-neighbors-1');
        } else if (distance === 2) {
            item.classList.add('dock-neighbors-2');
        }
    });
}

// Function to reset dock hover effect
function resetDockHoverEffect() {
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach(item => {
        item.classList.remove('dock-neighbors-1', 'dock-neighbors-2');
    });
}

// Function to show resume (opens resume cards)
function showResume() {
    // Hide projects section if visible
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
        projectsSection.classList.remove('active');
    }
}

// Function to toggle projects visibility
function toggleProjects() {
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
        projectsSection.classList.toggle('active');
    }
}

// Function to show contact form
function showContact() {
    // Hide projects section if visible
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
        projectsSection.classList.remove('active');
    }
    
    // Show contact form
    const contactForm = document.getElementById('contact-form');
    contactForm.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
