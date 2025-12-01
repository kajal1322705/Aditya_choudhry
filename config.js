const CONFIG = {
    // Personal Info
    personal: {
        name: "Aditya Choudhry",
        title: "Full Stack Developer",
        bio: "Results-driven Full-Stack Engineer with 3+ years of remote-first experience building scalable web apps and production-grade APIs using Node.js, React and TypeScript.",
        email: "aditya.gardian@gmail.com",
        phone: "+91-9729990899",
        github: "https://github.com/kajal1322705",
        linkedin: "https://www.linkedin.com/in/aditya-choudhry/",
        availabilityText: "Available for Remote, Full-time positions"
    },

    // Stats displayed in About section
    stats: [
        { number: "3+", label: "Years Experience" },
        { number: "200K+", label: "Users Served" },
        { number: "10+", label: "Projects" }
    ],

    // Areas of Expertise
    expertise: [
        {
            icon: "fas fa-shield-alt",
            title: "Project Security",
            description: "Implementing secure coding practices, JWT-based authentication, role-based access control (RBAC), and building security-first applications with encryption protocols."
        },
        {
            icon: "fas fa-atom",
            title: "Quantum Computing",
            description: "Exploring quantum algorithms, quantum circuit simulation, and quantum-safe cryptography for next-generation secure communication systems."
        },
        {
            icon: "fas fa-cubes",
            title: "Microservices Architecture",
            description: "Designing scalable microservices using Docker containerization, API gateways, CI/CD pipelines with GitHub Actions and Azure Pipelines."
        },
        {
            icon: "fas fa-project-diagram",
            title: "End-to-End Architecture",
            description: "Building complete system solutions from frontend to backend, including database design (MySQL, PostgreSQL, MongoDB), API development, and cloud deployment."
        }
    ],

    // Work Experience
    experience: [
        {
            title: "Full Stack Engineer",
            date: "Sep 2024 – Present",
            company: "Hawk Sense Business Solutions Pvt Ltd — Hybrid, Full-time",
            responsibilities: [
                "Architected and implemented Spring Boot REST APIs for core enterprise features; enforced secure, token-based authentication (JWT) and RBAC",
                "Replaced monolithic SOAP integrations with microservices, simplifying deployments and enabling independent scaling",
                "Developed Angular 15 frontend modules with reusable components and state management for responsive admin and user dashboards",
                "Built and maintained CI/CD pipelines (Azure DevOps) with Docker images and Kubernetes deployments",
                "Improved data reliability by refining PostgreSQL queries and MongoDB data modeling; resolved performance bottlenecks",
                "Led automated testing efforts (Selenium, Postman) and mentored junior devs through code reviews and pairing sessions"
            ]
        },
        {
            title: "Full Stack Engineer (Contract)",
            date: "Nov 2019 – Dec 2024",
            company: "Edu Startup — Delhi, India · Hybrid",
            responsibilities: [
                "Designed and developed Spring Boot microservices powering platform features; delivered stable services used by large user bases",
                "Implemented secure authentication using JWT and enforced role-based access control across services and clients",
                "Automated container builds and deployment pipelines using Docker, Jenkins, and GitHub Actions—reducing manual release steps",
                "Optimized backend throughput and availability; participated in on-call rotations and incident postmortems to improve system resilience",
                "Mentored junior developers and enforced engineering best practices through code reviews and knowledge-sharing sessions"
            ]
        }
    ],

    // Education
    education: [
        {
            icon: "fas fa-graduation-cap",
            degree: "Master of Computer Applications (MCA)",
            school: "MMU University, Ambala",
            date: "2022 – 2024"
        },
        {
            icon: "fas fa-university",
            degree: "Bachelor of Technology (BTech), Civil Engineering",
            school: "DIT University, Dehradun",
            date: "2015 – 2019"
        }
    ],

    // Skills by category
    skills: {
        Backend: [
            { icon: "fab fa-java", name: "Java Spring Boot" },
            { icon: "fab fa-node", name: "Node.js" },
            { icon: "fas fa-plug", name: "REST APIs" },
            { icon: "fas fa-key", name: "JWT / RBAC" }
        ],
        Frontend: [
            { icon: "fab fa-angular", name: "Angular 15" },
            { icon: "fab fa-react", name: "React" },
            { icon: "fab fa-js", name: "TypeScript" },
            { icon: "fas fa-wind", name: "TailwindCSS" }
        ],
        Database: [
            { icon: "fas fa-database", name: "MySQL" },
            { icon: "fas fa-database", name: "PostgreSQL" },
            { icon: "fas fa-leaf", name: "MongoDB" }
        ],
        "DevOps & Tools": [
            { icon: "fab fa-docker", name: "Docker" },
            { icon: "fas fa-dharmachakra", name: "Kubernetes" },
            { icon: "fab fa-microsoft", name: "Azure DevOps" },
            { icon: "fab fa-jenkins", name: "Jenkins" }
        ]
    },

    // Projects
    projects: [
        {
            title: "Clinical Dashboard",
            description: "Responsive provider dashboard displaying real-time patient data via secure APIs. Built with focus on performance and UX for clinical workflows in healthcare domain.",
            tags: ["React", "TypeScript", "REST API"]
        },
        {
            title: "Inventory API",
            description: "REST API for inventory and audit trail management. Handles 10K+ SKUs with query optimizations and pagination for large datasets.",
            tags: ["Node.js", "MySQL", "Express"]
        },
        {
            title: "AI-Powered Search POC",
            description: "Prototype for LLM-integrated search with intelligent ranking and experimental LLM prompts for enhanced search results.",
            tags: ["JavaScript", "LLM", "AI"]
        },
        {
            title: "Task Tracker App",
            description: "Full-stack role-based task manager with login/registration, CRUD operations, and JWT authentication for secure access control.",
            tags: ["React", "Node.js", "JWT"]
        },
        {
            title: "Web Security Scanner",
            description: "Tool for identifying web vulnerabilities and security issues. Implements penetration testing methodologies for web applications.",
            tags: ["TypeScript", "Node.js", "Security"]
        },
        {
            title: "Crypto Intelligence",
            description: "Cryptocurrency tracking and analysis platform with real-time data visualization and market analytics.",
            tags: ["TypeScript", "API", "React"]
        }
    ],

    // Certifications
    certifications: [
        { icon: "fas fa-certificate", name: "Responsive Web Design - freeCodeCamp" },
        { icon: "fas fa-award", name: "Software Engineer Certificate - HackerRank" }
    ]
};
