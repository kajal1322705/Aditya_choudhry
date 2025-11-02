/**
 * Projects Module
 * Handles project filtering and animations
 */
export class ProjectsModule {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projects = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.setupFilters();
        this.setupAnimations();
    }

    setupFilters() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');
                this.applyFilter(filter);
            });
        });
    }

    applyFilter(filter) {
        this.projects.forEach(project => {
            project.classList.remove('show', 'hide');
            
            if (filter === 'all' || project.getAttribute('data-category') === filter) {
                setTimeout(() => {
                    project.classList.add('show');
                }, 100);
            } else {
                project.classList.add('hide');
            }
        });
    }

    setupAnimations() {
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    setTimeout(() => {
                        card.classList.add('show');
                    }, index * 100);
                    projectObserver.unobserve(card);
                }
            });
        }, { threshold: 0.1 });

        this.projects.forEach(card => {
            projectObserver.observe(card);
        });
    }
}
