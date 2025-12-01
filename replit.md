# Aditya Choudhry - Portfolio

## Overview
A clean, modular portfolio website. All content is configured in a single config file for easy updates.

## How to Update Content

**Edit `config.js` to change any content:**

### Personal Info
```javascript
personal: {
    name: "Your Name",
    title: "Your Title",
    bio: "Your bio...",
    email: "your@email.com",
    phone: "+1-234-567-8900",
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username"
}
```

### Add/Remove Stats
```javascript
stats: [
    { number: "5+", label: "Years Experience" },
    { number: "50+", label: "Projects" }
]
```

### Add/Remove Experience
```javascript
experience: [
    {
        title: "Job Title",
        date: "2020 – Present",
        company: "Company Name",
        responsibilities: [
            "Did this...",
            "Did that..."
        ]
    }
]
```

### Add/Remove Skills
```javascript
skills: {
    "Category Name": [
        { icon: "fab fa-react", name: "React" },
        { icon: "fab fa-node", name: "Node.js" }
    ]
}
```

### Add/Remove Projects
```javascript
projects: [
    {
        title: "Project Name",
        description: "What it does...",
        tags: ["React", "Node.js"]
    }
]
```

## Project Structure
```
.
├── index.html      # HTML structure (don't edit for content)
├── styles.css      # All styling
├── config.js       # ⭐ EDIT THIS to change content
├── app.js          # Renders config to HTML
└── server.py       # Python server (port 5000)
```

## Icons Reference
Use Font Awesome icons. Find icons at: https://fontawesome.com/icons
- fab fa-react, fab fa-node, fab fa-angular
- fas fa-database, fas fa-server, fas fa-code

## Contact Info
- Email: aditya.gardian@gmail.com
- Phone: +91-9729990899
- GitHub: github.com/kajal1322705
- LinkedIn: linkedin.com/in/aditya-choudhry
