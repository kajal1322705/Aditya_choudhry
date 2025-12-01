/**
 * Multi-language Support Module
 * Supports English and Hindi translations
 */
export class LanguageSwitcherModule {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.translations = {
            en: {
                // Navigation
                'nav.home': 'Home',
                'nav.about': 'About',
                'nav.experience': 'Experience',
                'nav.projects': 'Projects',
                'nav.skills': 'Skills',
                'nav.education': 'Education',
                'nav.contact': 'Contact',
                'nav.articles': 'Articles',
                
                // Hero
                'hero.greeting': "Hi, I'm",
                'hero.viewProjects': 'View Projects',
                'hero.getInTouch': 'Get in Touch',
                'hero.scrollDown': 'Scroll Down',
                'hero.downloadResume': 'Download Resume',
                
                // About
                'about.title': 'About Me',
                'about.role': 'Full Stack & AI Software Engineer',
                'about.achievements': 'Key Achievements:',
                'about.readArticles': 'Read My Articles',
                
                // Experience
                'experience.title': 'Work Experience',
                
                // Projects
                'projects.title': 'Featured Projects',
                'projects.all': 'All',
                'projects.viewCode': 'View Code',
                
                // Skills
                'skills.title': 'Skills & Technologies',
                'skills.frontend': 'Frontend Development',
                'skills.backend': 'Backend Development',
                'skills.devops': 'DevOps & Cloud',
                'skills.languages': 'Programming Languages',
                'skills.testing': 'Testing & Security',
                'skills.specializations': 'Specializations',
                'skills.services': 'Services Offered',
                'skills.practices': 'Development Practices',
                
                // Education
                'education.title': 'Education & Certifications',
                'education.certifications': 'Professional Certifications',
                'education.viewCredential': 'View Credential',
                
                // Contact
                'contact.title': 'Get In Touch',
                'contact.description': "I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!",
                'contact.send': 'Send Message',
                'contact.name': 'Your Name',
                'contact.email': 'Your Email',
                'contact.message': 'Your Message',
                
                // GitHub
                'github.title': 'GitHub Activity',
                'github.contributions': 'Contribution Graph',
                
                // Footer
                'footer.rights': 'All rights reserved.',
                'footer.built': 'Built with HTML, CSS, and JavaScript'
            },
            hi: {
                // Navigation
                'nav.home': 'होम',
                'nav.about': 'परिचय',
                'nav.experience': 'अनुभव',
                'nav.projects': 'परियोजनाएं',
                'nav.skills': 'कौशल',
                'nav.education': 'शिक्षा',
                'nav.contact': 'संपर्क',
                'nav.articles': 'लेख',
                
                // Hero
                'hero.greeting': 'नमस्ते, मैं हूं',
                'hero.viewProjects': 'प्रोजेक्ट देखें',
                'hero.getInTouch': 'संपर्क करें',
                'hero.scrollDown': 'नीचे स्क्रॉल करें',
                'hero.downloadResume': 'रिज्यूमे डाउनलोड करें',
                
                // About
                'about.title': 'मेरे बारे में',
                'about.role': 'फुल स्टैक और AI सॉफ्टवेयर इंजीनियर',
                'about.achievements': 'मुख्य उपलब्धियां:',
                'about.readArticles': 'मेरे लेख पढ़ें',
                
                // Experience
                'experience.title': 'कार्य अनुभव',
                
                // Projects
                'projects.title': 'विशेष परियोजनाएं',
                'projects.all': 'सभी',
                'projects.viewCode': 'कोड देखें',
                
                // Skills
                'skills.title': 'कौशल और प्रौद्योगिकियां',
                'skills.frontend': 'फ्रंटएंड डेवलपमेंट',
                'skills.backend': 'बैकएंड डेवलपमेंट',
                'skills.devops': 'DevOps और क्लाउड',
                'skills.languages': 'प्रोग्रामिंग भाषाएं',
                'skills.testing': 'परीक्षण और सुरक्षा',
                'skills.specializations': 'विशेषज्ञता',
                'skills.services': 'सेवाएं',
                'skills.practices': 'विकास प्रथाएं',
                
                // Education
                'education.title': 'शिक्षा और प्रमाणपत्र',
                'education.certifications': 'पेशेवर प्रमाणपत्र',
                'education.viewCredential': 'प्रमाणपत्र देखें',
                
                // Contact
                'contact.title': 'संपर्क करें',
                'contact.description': 'मुझे नई परियोजनाओं और अवसरों के बारे में सुनने में हमेशा रुचि है। चाहे आपका कोई प्रश्न हो या बस नमस्ते कहना चाहते हों, बेझिझक संपर्क करें!',
                'contact.send': 'संदेश भेजें',
                'contact.name': 'आपका नाम',
                'contact.email': 'आपका ईमेल',
                'contact.message': 'आपका संदेश',
                
                // GitHub
                'github.title': 'GitHub गतिविधि',
                'github.contributions': 'योगदान ग्राफ',
                
                // Footer
                'footer.rights': 'सर्वाधिकार सुरक्षित।',
                'footer.built': 'HTML, CSS और JavaScript से बनाया गया'
            }
        };
        this.init();
    }

    init() {
        this.createLanguageButton();
        this.applyLanguage(this.currentLang);
    }

    createLanguageButton() {
        const langBtn = document.createElement('button');
        langBtn.className = 'language-btn';
        langBtn.id = 'languageBtn';
        langBtn.innerHTML = `<i class="fas fa-globe"></i> <span>${this.currentLang.toUpperCase()}</span>`;
        langBtn.title = 'Change Language';
        
        // Create dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'language-dropdown';
        dropdown.id = 'languageDropdown';
        dropdown.innerHTML = `
            <button data-lang="en" class="${this.currentLang === 'en' ? 'active' : ''}">
                <span class="lang-flag">🇺🇸</span> English
            </button>
            <button data-lang="hi" class="${this.currentLang === 'hi' ? 'active' : ''}">
                <span class="lang-flag">🇮🇳</span> हिंदी
            </button>
        `;

        // Insert into nav
        const navRight = document.querySelector('.nav-right');
        if (navRight) {
            const container = document.createElement('div');
            container.className = 'language-container';
            container.appendChild(langBtn);
            container.appendChild(dropdown);
            navRight.insertBefore(container, navRight.firstChild);
        }

        // Event listeners
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('visible');
        });

        dropdown.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.setLanguage(lang);
                dropdown.classList.remove('visible');
            });
        });

        document.addEventListener('click', () => {
            dropdown.classList.remove('visible');
        });
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.applyLanguage(lang);
        
        // Update button text
        const langSpan = document.querySelector('#languageBtn span');
        if (langSpan) langSpan.textContent = lang.toUpperCase();
        
        // Update active state
        document.querySelectorAll('.language-dropdown button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    applyLanguage(lang) {
        const translations = this.translations[lang];
        if (!translations) return;

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (translations[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[key];
                } else {
                    el.textContent = translations[key];
                }
            }
        });

        // Update document language
        document.documentElement.lang = lang;
    }

    t(key) {
        return this.translations[this.currentLang]?.[key] || key;
    }
}
