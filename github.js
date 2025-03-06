
// GitHub username
const githubUsername = 'aditya-sphereoutsourcing';

// Function to fetch GitHub repositories
async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        return [];
    }
}

// Create GitHub popup
function createGitHubPopup() {
    // Check if popup already exists
    if (document.getElementById('github-popup')) {
        return;
    }

    const popupHTML = `
    <div id="github-popup" class="popup-overlay" style="display: none;">
        <div class="popup-content">
            <div class="popup-header">
                <h2>GitHub Projects</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="popup-body">
                <div id="repositories-container" class="repos-container">
                    <div class="loading">Loading repositories...</div>
                </div>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Add event listener to close button
    const closeBtn = document.querySelector('#github-popup .close-btn');
    closeBtn.addEventListener('click', () => {
        document.getElementById('github-popup').style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close on outside click
    const popup = document.getElementById('github-popup');
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Show GitHub repos in popup
async function showGitHubRepos() {
    const popup = document.getElementById('github-popup');
    const reposContainer = document.getElementById('repositories-container');
    
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    reposContainer.innerHTML = '<div class="loading">Loading repositories...</div>';
    
    const repos = await fetchGitHubRepos();
    
    if (repos.length === 0) {
        reposContainer.innerHTML = '<p>No repositories found or error loading repositories.</p>';
        return;
    }
    
    let reposHTML = `
        <div class="github-profile">
            <img src="https://github.com/${githubUsername}.png" alt="${githubUsername}" class="github-avatar">
            <h3><a href="https://github.com/${githubUsername}" target="_blank">@${githubUsername}</a></h3>
        </div>
        <div class="repos-grid">
    `;
    
    repos.forEach(repo => {
        const description = repo.description || 'No description available';
        const language = repo.language || 'Not specified';
        const stars = repo.stargazers_count;
        const forks = repo.forks_count;
        
        reposHTML += `
            <div class="repo-card">
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p class="repo-description">${description}</p>
                <div class="repo-details">
                    <span class="repo-language"><i class="fas fa-code"></i> ${language}</span>
                    <span class="repo-stars"><i class="fas fa-star"></i> ${stars}</span>
                    <span class="repo-forks"><i class="fas fa-code-branch"></i> ${forks}</span>
                </div>
            </div>
        `;
    });
    
    reposHTML += '</div>';
    reposContainer.innerHTML = reposHTML;
}

// Add event listener to GitHub card
document.addEventListener('DOMContentLoaded', () => {
    createGitHubPopup();
    
    const githubCard = document.querySelector('.card[data-section="github"]');
    if (githubCard) {
        githubCard.addEventListener('click', showGitHubRepos);
    }
});
