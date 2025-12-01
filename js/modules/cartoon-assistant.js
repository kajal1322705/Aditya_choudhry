/**
 * Cartoon Assistant / Chatbot Module
 * Interactive assistant with contextual messages and click interactions
 */
export class CartoonAssistantModule {
    constructor() {
        this.assistant = document.getElementById('cartoonAssistant');
        this.speechBubble = document.getElementById('speechBubble');
        
        if (!this.assistant || !this.speechBubble) {
            console.log('Cartoon assistant elements not found');
            return;
        }
        
        this.characterBody = this.assistant.querySelector('.character-body');
        this.messageSpan = null;
        
        this.messages = {
            home: "Hi there! I'm your friendly guide. Feel free to explore!",
            about: "Aditya is a passionate developer with amazing skills!",
            experience: "Check out this impressive work history!",
            projects: "These projects showcase real-world skills. Click to explore!",
            skills: "So many technologies! A true full-stack developer.",
            education: "Education + continuous learning = success!",
            certifications: "Verified skills from top platforms!",
            github: "Check out the GitHub contributions!",
            contact: "Want to connect? Don't be shy, reach out!",
        };
        
        this.clickMessages = [
            "Need help? Press Ctrl+K to search!",
            "Try switching the theme with the moon icon!",
            "You can use keyboard shortcuts - press ?",
            "Check out the projects section!",
            "Want to connect? Visit the contact section!",
            "I can speak Hindi too! Click the language button!",
            "Scroll down to discover more!",
        ];
        
        this.messageTimeout = null;
        this.clickMessageIndex = 0;
        this.isVisible = true;
        
        this.init();
    }

    init() {
        this.setupMessageSpan();
        this.addCloseButton();
        this.bindEvents();
        setTimeout(() => this.showMessage(this.messages.home), 2500);
        this.setupObserver();
    }
    
    setupMessageSpan() {
        this.messageSpan = document.createElement('span');
        this.messageSpan.className = 'message-text';
        this.speechBubble.appendChild(this.messageSpan);
    }
    
    addCloseButton() {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'speech-bubble-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.setAttribute('aria-label', 'Close message');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideMessage();
        });
        this.speechBubble.appendChild(closeBtn);
    }
    
    bindEvents() {
        if (this.characterBody) {
            this.characterBody.addEventListener('click', () => this.handleClick());
            
            this.characterBody.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleClick();
                }
            });
            
            this.characterBody.setAttribute('tabindex', '0');
            this.characterBody.setAttribute('role', 'button');
            this.characterBody.setAttribute('aria-label', 'Chat assistant - click for tips');
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.speechBubble.classList.contains('visible')) {
                this.hideMessage();
            }
        });
    }
    
    handleClick() {
        const message = this.clickMessages[this.clickMessageIndex];
        this.showMessage(message);
        this.clickMessageIndex = (this.clickMessageIndex + 1) % this.clickMessages.length;
    }

    showMessage(text) {
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
        }
        
        if (this.messageSpan) {
            this.messageSpan.textContent = text;
        }
        
        this.speechBubble.classList.add('visible');
        this.speechBubble.setAttribute('aria-live', 'polite');

        this.messageTimeout = setTimeout(() => {
            this.hideMessage();
        }, 6000);
    }
    
    hideMessage() {
        this.speechBubble.classList.remove('visible');
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
            this.messageTimeout = null;
        }
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (this.messages[sectionId]) {
                        setTimeout(() => {
                            this.showMessage(this.messages[sectionId]);
                        }, 500);
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
    
    toggleVisibility() {
        this.isVisible = !this.isVisible;
        this.assistant.style.display = this.isVisible ? 'flex' : 'none';
    }
}
