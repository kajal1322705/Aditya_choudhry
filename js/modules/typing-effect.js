/**
 * Typing Effect Module
 * Creates animated typing effect for hero section
 */
export class TypingEffectModule {
    constructor(elementId = 'typed-text') {
        this.typedText = document.getElementById(elementId);
        if (!this.typedText) return;
        
        this.textArray = [
            'Full Stack Developer',
            'AI Software Engineer',
            'Security Enthusiast',
            'Open Source Contributor',
            'Problem Solver'
        ];
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        setTimeout(() => this.typeText(), 1000);
    }

    typeText() {
        const currentText = this.textArray[this.textIndex];
        
        if (this.isDeleting) {
            this.typedText.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.typedText.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? 50 : 100;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.textArray.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.typeText(), typeSpeed);
    }
}
