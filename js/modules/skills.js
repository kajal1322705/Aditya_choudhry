/**
 * Skills Module
 * Handles skill bubbles positioning and animations
 */
export class SkillsModule {
    constructor() {
        this.skillContainers = document.querySelectorAll('.skill-items');
        this.init();
    }

    init() {
        if (this.skillContainers.length === 0) return;
        this.positionSkills();
    }

    positionSkills() {
        this.skillContainers.forEach(container => {
            const skills = container.querySelectorAll('.skill-tag');
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;

            skills.forEach(skill => {
                const skillWidth = skill.offsetWidth;
                const skillHeight = skill.offsetHeight;
                
                skill.style.left = `${Math.random() * (containerWidth - skillWidth)}px`;
                skill.style.top = `${Math.random() * (containerHeight - skillHeight)}px`;
                skill.style.setProperty('--delay', `${Math.random() * 5}s`);
            });
        });
    }
}
