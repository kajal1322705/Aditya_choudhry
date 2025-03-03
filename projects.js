
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
        icon: "📊"📊"
    }
];

function displayProjects() {
    const projectsSection = document.createElement('div');
    projectsSection.className = 'projects-section';
    projectsSection.innerHTML = `
        <h2 class="projects-heading">Projects</h2>
        <div class="projects-container" id="projects-container"></div>
    `;
    
    document.body.insertBefore(projectsSection, document.querySelector('.popup-overlay'));
    
    const projectsContainer = document.getElementById('projects-container');
    
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
}
