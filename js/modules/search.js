/**
 * Search Module
 * Global search functionality for projects and articles
 */
export class SearchModule {
    constructor() {
        this.searchData = [];
        this.init();
    }

    init() {
        this.collectSearchData();
        this.enhanceCommandPalette();
    }

    collectSearchData() {
        // Collect projects
        document.querySelectorAll('.project-card').forEach(card => {
            this.searchData.push({
                type: 'project',
                title: card.querySelector('h3')?.textContent || '',
                description: card.querySelector('p')?.textContent || '',
                category: card.dataset.category || '',
                element: card,
                href: card.querySelector('a')?.href || '#projects'
            });
        });

        // Collect articles
        document.querySelectorAll('.article-card').forEach(card => {
            this.searchData.push({
                type: 'article',
                title: card.querySelector('h3')?.textContent || '',
                description: card.querySelector('p')?.textContent || '',
                tags: Array.from(card.querySelectorAll('.tech-badge')).map(t => t.textContent),
                element: card,
                href: card.href || '#'
            });
        });

        // Collect sections
        const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'certifications', 'contact'];
        sections.forEach(section => {
            const el = document.getElementById(section);
            if (el) {
                this.searchData.push({
                    type: 'section',
                    title: section.charAt(0).toUpperCase() + section.slice(1),
                    description: `Go to ${section} section`,
                    href: `#${section}`
                });
            }
        });
    }

    search(query) {
        if (!query) return [];
        const q = query.toLowerCase();
        return this.searchData.filter(item => {
            return (
                item.title.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q) ||
                (item.category && item.category.toLowerCase().includes(q)) ||
                (item.tags && item.tags.some(tag => tag.toLowerCase().includes(q)))
            );
        }).slice(0, 10);
    }

    enhanceCommandPalette() {
        const input = document.getElementById('commandInput');
        const results = document.getElementById('commandResults');
        
        if (!input || !results) return;

        input.addEventListener('input', (e) => {
            const query = e.target.value;
            const searchResults = this.search(query);
            
            if (searchResults.length > 0) {
                results.innerHTML = searchResults.map(item => `
                    <li data-href="${item.href}" class="search-result-item">
                        <i class="fas ${this.getIcon(item.type)}"></i>
                        <div>
                            <strong>${item.title}</strong>
                            <span class="search-type">${item.type}</span>
                        </div>
                    </li>
                `).join('');

                results.querySelectorAll('li').forEach(li => {
                    li.addEventListener('click', () => {
                        const href = li.dataset.href;
                        if (href.startsWith('http')) {
                            window.open(href, '_blank');
                        } else {
                            window.location.href = href;
                        }
                        document.getElementById('commandPaletteOverlay').classList.remove('visible');
                    });
                });
            }
        });
    }

    getIcon(type) {
        switch(type) {
            case 'project': return 'fa-code';
            case 'article': return 'fa-newspaper';
            case 'section': return 'fa-link';
            default: return 'fa-search';
        }
    }
}
