/**
 * Skills Module
 * Handles skill bubbles positioning and bouncing animations
 */
export class SkillsModule {
    constructor() {
        this.skillContainers = document.querySelectorAll('.skill-items');
        this.init();
        this.setupResize();
    }

    init() {
        if (this.skillContainers.length === 0) return;
        
        // Wait for next frame to ensure dimensions are calculated
        requestAnimationFrame(() => {
            this.positionSkills();
            // Wait another frame for positions to settle
            requestAnimationFrame(() => {
                this.setupBounceAnimations();
            });
        });
    }

    positionSkills() {
        this.skillContainers.forEach(container => {
            const skills = container.querySelectorAll('.skill-tag');
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;

            skills.forEach((skill, index) => {
                const skillWidth = skill.offsetWidth || 100;
                const skillHeight = skill.offsetHeight || 40;
                
                // Ensure skills are positioned within bounds
                const maxX = Math.max(0, containerWidth - skillWidth);
                const maxY = Math.max(0, containerHeight - skillHeight);
                
                const startX = Math.random() * maxX;
                const startY = Math.random() * maxY;
                
                skill.style.left = `${startX}px`;
                skill.style.top = `${startY}px`;
                
                // Store initial position for boundary calculations
                skill.dataset.startX = startX;
                skill.dataset.startY = startY;
                skill.dataset.containerWidth = containerWidth;
                skill.dataset.containerHeight = containerHeight;
                skill.dataset.skillWidth = skillWidth;
                skill.dataset.skillHeight = skillHeight;
                
                // Set animation delay for staggered effect
                skill.style.setProperty('--delay', `${(index * 0.3) + (Math.random() * 2)}s`);
            });
        });
    }

    setupBounceAnimations() {
        this.skillContainers.forEach(container => {
            const skills = container.querySelectorAll('.skill-tag');
            
            skills.forEach(skill => {
                const containerWidth = parseFloat(skill.dataset.containerWidth);
                const containerHeight = parseFloat(skill.dataset.containerHeight);
                const skillWidth = parseFloat(skill.dataset.skillWidth);
                const skillHeight = parseFloat(skill.dataset.skillHeight);
                const startX = parseFloat(skill.dataset.startX);
                const startY = parseFloat(skill.dataset.startY);
                
                // Calculate safe movement range (keeping skill within container)
                // Allow up to 50px movement but stay within bounds
                const availableRight = containerWidth - skillWidth - startX;
                const availableBottom = containerHeight - skillHeight - startY;
                const maxMoveX = Math.min(50, availableRight * 0.6, startX * 0.6) || 20;
                const maxMoveY = Math.min(40, availableBottom * 0.6, startY * 0.6) || 20;
                
                // Generate random diagonal movement values for each skill
                const moveX1 = (Math.random() - 0.5) * maxMoveX * 2;
                const moveY1 = (Math.random() - 0.5) * maxMoveY * 2;
                const moveX2 = (Math.random() - 0.5) * maxMoveX * 1.5;
                const moveY2 = (Math.random() - 0.5) * maxMoveY * 1.5;
                const moveX3 = (Math.random() - 0.5) * maxMoveX * 1.3;
                const moveY3 = (Math.random() - 0.5) * maxMoveY * 1.3;
                
                // Set CSS custom properties for animation
                skill.style.setProperty('--move-x', `${moveX1}px`);
                skill.style.setProperty('--move-y', `${moveY1}px`);
                skill.style.setProperty('--move-x-end', `${moveX2}px`);
                skill.style.setProperty('--move-y-end', `${moveY2}px`);
                skill.style.setProperty('--move-x-back', `${moveX3}px`);
                skill.style.setProperty('--move-y-back', `${moveY3}px`);
                
                // Add variation to animation duration for more natural movement
                const duration = 7 + (Math.random() * 3); // 7-10 seconds
                skill.style.animationDuration = `${duration}s`;
            });
        });
    }

    setupResize() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.positionSkills();
                this.setupBounceAnimations();
            }, 300);
        });
    }
}
