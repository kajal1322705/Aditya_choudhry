
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
    
    // Add project card to main container
    addProjectCard();
    
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

// Function to add project card to main container
function addProjectCard() {
    const cardContainer = document.querySelector('.card-container');
    
    // Create projects card
    const projectsCard = document.createElement('div');
    projectsCard.className = 'card';
    projectsCard.innerHTML = `
        <div class="card-inner">
            <h2>Projects</h2>
            <div class="icon">💼</div>
        </div>
    `;
    
    projectsCard.addEventListener('click', () => {
        showProjectsPopup();
    });
    
    cardContainer.appendChild(projectsCard);
    
    // Create projects popup content
    createProjectsPopup();
}

// Function to create projects popup
function createProjectsPopup() {
    const projectsPopup = document.createElement('div');
    projectsPopup.className = 'popup-overlay';
    projectsPopup.id = 'projects-popup';
    
    projectsPopup.innerHTML = `
        <div class="popup-content">
            <div class="popup-header">
                <h2>Projects</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="popup-body">
                <div class="projects-container" id="projects-container"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(projectsPopup);
    
    // Add projects to container
    const projectsContainer = projectsPopup.querySelector('#projects-container');
    
    projectData.forEach((project, index) => {
        const delay = index * 0.15;
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${delay}s`;
        
        projectCard.innerHTML = `
            <div class="project-icon">${project.icon}</div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.url}" target="_blank" class="project-link">View Project</a>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
    
    // Add close button functionality
    const closeBtn = projectsPopup.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        projectsPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close on outside click
    projectsPopup.addEventListener('click', (e) => {
        if (e.target === projectsPopup) {
            projectsPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Function to show projects popup
function showProjectsPopup() {
    const projectsPopup = document.getElementById('projects-popup');
    projectsPopup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
