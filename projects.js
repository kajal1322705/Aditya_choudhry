const projectData = [
    {
        title: "Word Wizard Challenge",
        description: "An interactive word game application with unique challenges and vocabulary building features.",
        url: "https://github.com/aditya-sphereoutsourcing/WordWizardChallenge",
        icon: "🎮"
    },
    {
        title: "MeshNetViz",
        description: "Network visualization tool for mesh networks with interactive graphing capabilities.",
        url: "https://github.com/aditya-sphereoutsourcing/MeshNetViz",
        icon: "🌐"
    },
    {
        title: "Clinical AI Assistant",
        description: "AI-powered assistant for clinical workflows and healthcare management.",
        url: "https://github.com/aditya-sphereoutsourcing/ClinicalAiAssistant",
        icon: "🏥"
    },
    {
        title: "Trend Finder",
        description: "Data analysis tool for identifying trends in large datasets and market movements.",
        url: "https://github.com/aditya-sphereoutsourcing/trendFinder",
        icon: "📊"
    }
];

// Function to add project cards to the container
function addProjectCard() {
    const cardContainer = document.querySelector('.card-container');

    // Create project card and add to container
    const projectCard = document.createElement('div');
    projectCard.className = 'card';
    projectCard.setAttribute('data-section', 'projects');

    projectCard.innerHTML = `
        <div class="card-inner">
            <h2>Projects</h2>
            <div class="icon">💻</div>
        </div>
    `;

    cardContainer.appendChild(projectCard);

    // Add event listener for project card
    projectCard.addEventListener('click', () => {
        showPopup('Projects', generateProjectsContent());
    });
}

// Function to generate projects content for popup
function generateProjectsContent() {
    let content = '<div class="projects-container">';

    projectData.forEach(project => {
        content += `
            <div class="project-card">
                <div class="project-icon">${project.icon}</div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.url}" target="_blank" class="project-link">View Project</a>
            </div>
        `;
    });

    content += '</div>';
    return content;
}
// Project data with improved visual elements
const projectData = [
    {
        icon: '🤖',
        title: 'AI Assistant',
        description: 'Built an AI assistant using LLM technology to provide context-aware responses and task automation.',
        technologies: ['Python', 'OpenAI API', 'NLP'],
        color: 'linear-gradient(135deg, #6e48aa, #9d50bb)'
    },
    {
        icon: '🔐',
        title: 'Secure Authentication',
        description: 'Implemented a secure authentication system with biometric verification and two-factor authentication.',
        technologies: ['JavaScript', 'Node.js', 'Biometrics API'],
        color: 'linear-gradient(135deg, #834d9b, #d04ed6)'
    },
    {
        icon: '🌐',
        title: 'Blockchain Explorer',
        description: 'Developed a blockchain explorer for visualizing transaction data and smart contract interactions.',
        technologies: ['React', 'Web3.js', 'GraphQL'],
        color: 'linear-gradient(135deg, #4b6cb7, #182848)'
    },
    {
        icon: '📊',
        title: 'Data Visualization Dashboard',
        description: 'Created an interactive dashboard for visualizing complex datasets with real-time updates.',
        technologies: ['D3.js', 'React', 'Socket.io'],
        color: 'linear-gradient(135deg, #5e54a4, #7a6ad8)'
    }
];

// Function to create project cards
function createProjectCard(project, index) {
    const delay = index * 0.15;
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${delay}s`;
    
    const techBadges = project.technologies.map(tech => 
        `<span class="tech-badge">${tech}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="project-header" style="background: ${project.color}">
            <div class="project-icon">${project.icon}</div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-stack">
                ${techBadges}
            </div>
            <a href="#" class="project-link">View Details</a>
        </div>
    `;
    
    return card;
}

// Function to display projects in the popup
function showProjectsPopup() {
    const projectsPopup = document.getElementById('projects-popup');
    if (!projectsPopup) {
        createProjectsPopup();
        return;
    }
    
    projectsPopup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add animation class to project cards
    const cards = projectsPopup.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 150);
    });
}

// Function to create the projects popup
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
        const projectCard = createProjectCard(project, index);
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
    
    // Display the popup
    showProjectsPopup();
}

// Function to add project card to main container
function addProjectCard() {
    const cardContainer = document.querySelector('.card-container');
    if (!cardContainer) return;

    // Create projects card
    const projectsCard = document.createElement('div');
    projectsCard.className = 'card';
    projectsCard.setAttribute('data-section', 'projects');
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
}
