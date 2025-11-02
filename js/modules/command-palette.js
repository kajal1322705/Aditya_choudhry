/**
 * Command Palette Module
 * Handles Ctrl+K command palette functionality
 */
export class CommandPaletteModule {
    constructor() {
        this.overlay = document.getElementById('commandPaletteOverlay');
        this.input = document.getElementById('commandInput');
        this.resultsContainer = document.getElementById('commandResults');
        
        if (!this.overlay || !this.input || !this.resultsContainer) return;
        
        this.selectedIndex = 0;
        this.commands = [
            { name: 'Home: Go to top', action: () => document.querySelector('a[href="#home"]')?.click() },
            { name: 'About: Go to section', action: () => document.querySelector('a[href="#about"]')?.click() },
            { name: 'Experience: Go to section', action: () => document.querySelector('a[href="#experience"]')?.click() },
            { name: 'Projects: Go to section', action: () => document.querySelector('a[href="#projects"]')?.click() },
            { name: 'Skills: Go to section', action: () => document.querySelector('a[href="#skills"]')?.click() },
            { name: 'Education: Go to section', action: () => document.querySelector('a[href="#education"]')?.click() },
            { name: 'Contact: Go to section', action: () => document.querySelector('a[href="#contact"]')?.click() },
            { name: 'Theme: Toggle Light/Dark Mode', action: () => document.getElementById('themeToggle')?.click() },
            { name: 'GitHub: Open profile', action: () => window.open('https://github.com/kajal1322705', '_blank') },
            { name: 'LinkedIn: Open profile', action: () => window.open('https://www.linkedin.com/in/aditya-choudhry/', '_blank') },
            { name: 'Blog: View Articles', action: () => window.location.href = 'blog.html' },
            { name: 'Back to Top: Scroll to top', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        ];
        
        this.init();
    }

    init() {
        this.setupKeyboard();
        this.setupInput();
    }

    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (this.overlay.classList.contains('visible')) {
                    this.close();
                } else {
                    this.open();
                }
            }
            if (e.key === 'Escape' && this.overlay.classList.contains('visible')) {
                this.close();
            }
        });

        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
    }

    setupInput() {
        this.input.addEventListener('input', () => {
            const query = this.input.value.toLowerCase();
            const filteredCommands = this.commands.filter(command => 
                command.name.toLowerCase().includes(query)
            );
            
            this.selectedIndex = 0;
            this.resultsContainer.style.opacity = '0';
            setTimeout(() => {
                this.renderResults(filteredCommands);
                this.resultsContainer.style.opacity = '1';
            }, 150);
        });

        this.input.addEventListener('keydown', (e) => {
            const items = this.resultsContainer.querySelectorAll('li');
            const total = items.length;
            
            if (e.key === 'Enter') {
                e.preventDefault();
                const selected = this.resultsContainer.querySelector('.selected');
                if (selected) {
                    selected.click();
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.selectedIndex = (this.selectedIndex + 1) % total;
                this.updateSelection(this.selectedIndex, total);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.selectedIndex = (this.selectedIndex - 1 + total) % total;
                this.updateSelection(this.selectedIndex, total);
            }
        });
    }

    open() {
        this.overlay.classList.add('visible');
        this.input.focus();
        this.input.value = '';
        this.selectedIndex = 0;
        this.renderResults(this.commands);
    }

    close() {
        this.overlay.classList.remove('visible');
        this.input.value = '';
    }

    renderResults(filteredCommands) {
        this.resultsContainer.innerHTML = '';
        filteredCommands.forEach((command, index) => {
            const li = document.createElement('li');
            li.textContent = command.name;
            if (index === 0) {
                li.classList.add('selected');
                this.selectedIndex = 0;
            }
            li.addEventListener('click', () => {
                command.action();
                this.close();
            });
            this.resultsContainer.appendChild(li);
        });
    }

    updateSelection(index, total) {
        const items = this.resultsContainer.querySelectorAll('li');
        items.forEach((item, i) => {
            item.classList.toggle('selected', i === index);
        });
        if (items[index]) {
            items[index].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }
}
