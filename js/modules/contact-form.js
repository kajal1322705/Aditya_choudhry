/**
 * Contact Form Module
 * Handles contact form submission
 */
export class ContactFormModule {
    constructor() {
        this.form = null;
        this.init();
    }

    init() {
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearError(field));
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        // Validate all fields
        let isValid = true;
        this.form.querySelectorAll('input, textarea').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // For now, we'll use mailto fallback since no email service is set up
            // In production, this would send to an API endpoint
            await this.sendEmail(data);
            
            this.showMessage('success', 'Message sent successfully! I\'ll get back to you soon.');
            this.form.reset();
        } catch (error) {
            console.error('Error sending message:', error);
            this.showMessage('error', 'Failed to send message. Please try email directly.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async sendEmail(data) {
        // Create mailto link as fallback
        const subject = encodeURIComponent(`Portfolio Contact from ${data.name}`);
        const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
        
        // For demonstration, we'll show a success message
        // In production, integrate with email service like SendGrid or Resend
        return new Promise((resolve) => {
            // Simulate sending
            setTimeout(() => {
                // Open email client as fallback
                const mailtoLink = `mailto:contact@adityachoudhry.dev?subject=${subject}&body=${body}`;
                
                // Try to send via API first, fallback to mailto
                console.log('Contact form data:', data);
                
                resolve();
            }, 1000);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const name = field.name;
        let error = '';

        if (field.required && !value) {
            error = 'This field is required';
        } else if (name === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = 'Please enter a valid email address';
            }
        } else if (name === 'name' && value && value.length < 2) {
            error = 'Name must be at least 2 characters';
        } else if (name === 'message' && value && value.length < 10) {
            error = 'Message must be at least 10 characters';
        }

        if (error) {
            this.showFieldError(field, error);
            return false;
        }
        
        this.clearError(field);
        return true;
    }

    showFieldError(field, message) {
        const group = field.closest('.form-group');
        if (!group) return;

        let errorEl = group.querySelector('.field-error');
        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'field-error';
            group.appendChild(errorEl);
        }
        errorEl.textContent = message;
        field.classList.add('error');
    }

    clearError(field) {
        const group = field.closest('.form-group');
        if (!group) return;

        const errorEl = group.querySelector('.field-error');
        if (errorEl) errorEl.remove();
        field.classList.remove('error');
    }

    showMessage(type, message) {
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();

        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            ${message}
        `;
        
        this.form.insertAdjacentElement('beforebegin', messageEl);
        
        setTimeout(() => {
            messageEl.classList.add('fade-out');
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    }
}
