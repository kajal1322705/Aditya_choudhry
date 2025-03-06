
// Project data
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

// Function to create a project card element
function createProjectCard(project, index) {
    const delay = index * 0.15;
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.style.animationDelay = `${delay}s`;

    // Create HTML for project card
    projectCard.innerHTML = `
        <div class="project-icon">${project.icon}</div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-stack">
            ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
        <a href="#" class="project-link">View Project</a>
    `;

    return projectCard;
}

// Function to add project card to main container
function addProjectCard() {
    const cardContainer = document.querySelector('.card-container');
    if (!cardContainer) return;

    // Create projects card if it doesn't exist already
    if (!document.querySelector('.card[data-section="projects"]')) {
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
    
    // Create projects popup if it doesn't exist
    if (!document.getElementById('projects-popup')) {
        createProjectsPopup();
    }
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
}

// Function to show projects popup
function showProjectsPopup() {
    const projectsPopup = document.getElementById('projects-popup');
    if (projectsPopup) {
        projectsPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        createProjectsPopup();
    }
}

// Initialize projects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        addProjectCard();
    }, 500); // Small delay to ensure other elements are loaded
});
