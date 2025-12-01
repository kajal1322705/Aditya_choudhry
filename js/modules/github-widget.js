/**
 * GitHub Activity Widget Module
 * Displays GitHub contribution graph and recent activity
 */
export class GitHubWidgetModule {
    constructor(username = 'kajal1322705') {
        this.username = username;
        this.init();
    }

    init() {
        this.createWidget();
    }

    createWidget() {
        const container = document.getElementById('githubWidget');
        if (!container) return;

        // Create the contribution calendar using GitHub's contribution graph
        container.innerHTML = `
            <div class="github-widget-header">
                <i class="fab fa-github"></i>
                <h3 data-i18n="github.title">GitHub Activity</h3>
                <a href="https://github.com/${this.username}" target="_blank" class="github-profile-link">
                    @${this.username} <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
            <div class="github-stats">
                <div class="github-stat">
                    <i class="fas fa-code-branch"></i>
                    <span class="stat-value" id="repoCount">12+</span>
                    <span class="stat-label">Repositories</span>
                </div>
                <div class="github-stat">
                    <i class="fas fa-star"></i>
                    <span class="stat-value" id="starCount">50+</span>
                    <span class="stat-label">Stars</span>
                </div>
                <div class="github-stat">
                    <i class="fas fa-code-commit"></i>
                    <span class="stat-value" id="commitCount">500+</span>
                    <span class="stat-label">Commits</span>
                </div>
                <div class="github-stat">
                    <i class="fas fa-users"></i>
                    <span class="stat-value" id="followerCount">Growing</span>
                    <span class="stat-label">Followers</span>
                </div>
            </div>
            <div class="github-contributions">
                <h4 data-i18n="github.contributions">Contribution Graph</h4>
                <div class="contribution-graph">
                    <img src="https://ghchart.rshah.org/6366f1/${this.username}" alt="GitHub Contribution Graph" loading="lazy" />
                </div>
            </div>
            <div class="github-languages">
                <h4>Top Languages</h4>
                <div class="language-bars">
                    <div class="language-bar">
                        <span class="lang-name">TypeScript</span>
                        <div class="lang-progress">
                            <div class="lang-fill" style="width: 45%; background: #3178c6;"></div>
                        </div>
                        <span class="lang-percent">45%</span>
                    </div>
                    <div class="language-bar">
                        <span class="lang-name">JavaScript</span>
                        <div class="lang-progress">
                            <div class="lang-fill" style="width: 30%; background: #f7df1e;"></div>
                        </div>
                        <span class="lang-percent">30%</span>
                    </div>
                    <div class="language-bar">
                        <span class="lang-name">Java</span>
                        <div class="lang-progress">
                            <div class="lang-fill" style="width: 15%; background: #b07219;"></div>
                        </div>
                        <span class="lang-percent">15%</span>
                    </div>
                    <div class="language-bar">
                        <span class="lang-name">HTML/CSS</span>
                        <div class="lang-progress">
                            <div class="lang-fill" style="width: 10%; background: #e34c26;"></div>
                        </div>
                        <span class="lang-percent">10%</span>
                    </div>
                </div>
            </div>
        `;
    }
}
