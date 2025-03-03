
const resumeData = {
    summary: `
        <p>Innovative and passionate AI and automation developer with experience in bot development, AI-driven solutions, and automation. Active contributor to open-source projects, with multiple hackathon participations and bounty work. Strong problem-solving skills and a deep interest in decentralized AI, blockchain, and superintelligence.</p>
    `,
    experience: `
        <div class="experience-item">
            <h3>AI & Automation Developer | Open Source Contributor</h3>
            <p class="duration">2024 - Present</p>
            <ul>
                <li>Actively working on DeepSeek Love Hackathon, developing AI-enhanced solutions</li>
                <li>Engaged in multiple bounties, including Apple Watch integration for BasedHardware/omi</li>
                <li>Developing and deploying AI-driven automation and bots for various applications</li>
                <li>Exploring AI integration in network resilience for underserved areas</li>
            </ul>
        </div>
        <div class="experience-item">
            <h3>Full Stack Developer at Guby Rogers</h3>
            <p class="duration">12/2023 - 04/2024</p>
            <ul>
                <li>Designed and implemented both backend and frontend solutions</li>
                <li>Developed and maintained scalable databases</li>
                <li>Managed cloud services on Azure and AWS</li>
                <li>Ensured performance optimization and smooth user experience</li>
            </ul>
        </div>
    `,
    education: `
        <div class="education-item">
            <h3>Master of Computer Applications (MCA)</h3>
            <p>MMICTBM, Ambala, Haryana (2022 - 2024)</p>
            <p>Maintained 8+ CGPA</p>
        </div>
        <div class="education-item">
            <h3>Bachelor of Technology (B.Tech) - Civil Engineering</h3>
            <p>DIT University, Dehradun, Uttarakhand (2015 - 2019)</p>
            <p>Strong analytical and problem-solving foundation</p>
        </div>
    `,
    skills: `
        <div class="skills-section">
            <h3>Programming & Backend</h3>
            <p>JavaScript, GoLang, Rust, Python, Java, Node.js, Express.js, GoFiber</p>
            
            <h3>Databases & Messaging</h3>
            <p>PostgreSQL, Redis, Kafka</p>
            
            <h3>AI & Blockchain</h3>
            <p>OpenAI, Deep Learning, NLP, RAG-based chatbots, Zero-Knowledge Proofs (ZKP), Smart Contracts</p>
            
            <h3>Cloud & DevOps</h3>
            <p>AWS, Azure, Docker, Kubernetes, CI/CD</p>
            
            <h3>Tools & Automation</h3>
            <p>Git, GitHub, Web Scraping</p>
        </div>
    `
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize wave background
    new WaveBackground();
    
    // Display projects
    displayProjects();
    
    const cards = document.querySelectorAll('.card');
    const popup = document.querySelector('.popup-overlay');
    const popupTitle = popup.querySelector('.popup-header h2');
    const popupBody = popup.querySelector('.popup-body');
    const closeBtn = popup.querySelector('.close-btn');

    // Contact form functionality
    const contactBtn = document.getElementById('contact-btn');
    const contactForm = document.getElementById('contact-form');
    const closeContactBtn = document.querySelector('.close-contact-btn');
    const emailForm = document.getElementById('email-form');

    contactBtn.addEventListener('click', () => {
        contactForm.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeContactBtn.addEventListener('click', () => {
        contactForm.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    contactForm.addEventListener('click', (e) => {
        if (e.target === contactForm) {
            contactForm.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send this data to a server
        // For now, we'll open the default mail client
        window.location.href = `mailto:aditya.gardian@gmail.com?subject=Contact from ${name}&body=${message}%0A%0AFrom: ${name} (${email})`;
        
        // Reset form
        emailForm.reset();
        
        // Close the form
        contactForm.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const section = card.dataset.section;
            popupTitle.textContent = card.querySelector('h2').textContent;
            popupBody.innerHTML = resumeData[section];
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
