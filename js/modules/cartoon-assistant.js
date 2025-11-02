/**
 * Cartoon Assistant Module
 * Interactive assistant with contextual messages
 */
export class CartoonAssistantModule {
    constructor() {
        this.assistant = document.getElementById('cartoonAssistant');
        this.speechBubble = document.getElementById('speechBubble');
        if (!this.assistant || !this.speechBubble) return;
        
        this.messages = {
            home: "Welcome! I'm your AI assistant. Feel free to look around.",
            about: "Aditya seems like a skilled engineer, doesn't he?",
            experience: "Wow, that's some impressive work experience!",
            projects: "These projects look fun! Click on one to see the code.",
            skills: "So many skills! He's like a digital Swiss Army knife.",
            education: "Looks like he's a lifelong learner.",
            contact: "Don't be shy, say hello! He'd love to connect.",
        };
        
        this.messageTimeout = null;
        this.init();
    }

    init() {
        setTimeout(() => this.showMessage(this.messages.home), 2500);
        this.setupObserver();
    }

    showMessage(text) {
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
        }
        
        this.speechBubble.textContent = text;
        this.speechBubble.classList.add('visible');

        this.messageTimeout = setTimeout(() => {
            this.speechBubble.classList.remove('visible');
        }, 5000);
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (this.messages[sectionId]) {
                        this.showMessage(this.messages[sectionId]);
                    }
                }
            });
        }, { threshold: 0.6 });

        document.querySelectorAll('section').forEach(section => observer.observe(section));
    }
}
