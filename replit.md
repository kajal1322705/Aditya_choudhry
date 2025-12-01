# Aditya Choudhry - Ubuntu OS Portfolio

## Overview
An Ubuntu OS-style portfolio website with login screen, desktop icons, and file explorer-like windows for each section.

## Features
- **Login Screen**: Ubuntu-themed login with user avatar and password field
- **Desktop Interface**: Desktop icons for Home, About, Experience, Skills, Projects, Contact
- **Window System**: Each section opens as a draggable, closeable window (like file explorer)
- **Dock**: Bottom dock bar for quick access to sections
- **Top Panel**: Ubuntu-style panel with date/time and logout

## How to Update Content

**Edit `config.js` to change ALL content:**

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

### Add/Remove Experience
```javascript
experience: [
    {
        title: "Job Title",
        date: "2020 – Present",
        company: "Company Name",
        responsibilities: ["Task 1", "Task 2"]
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
├── index.html      # HTML structure (login + desktop)
├── styles.css      # Ubuntu theme styling
├── config.js       # ⭐ EDIT THIS to change content
└── app.js          # OS interface logic (login, windows, drag)
```

## Usage
1. Open the site - see Ubuntu login screen
2. Press Enter or click arrow to login
3. Double-click desktop icons to open windows
4. Drag windows by title bar
5. Close/minimize/maximize with window controls
6. Click dock icons for quick access
7. Click power icon to logout

## Icons Reference
Use Font Awesome icons: https://fontawesome.com/icons

## Contact Info
- Email: aditya.gardian@gmail.com
- Phone: +91-9729990899
- GitHub: github.com/kajal1322705
- LinkedIn: linkedin.com/in/aditya-choudhry
