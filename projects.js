
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
