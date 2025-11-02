/**
 * Particle Animation Module
 * Independent module for canvas particle background
 */
export class ParticleAnimation {
    constructor(canvasId = 'particleCanvas') {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.animationId = null;
        this.init();
    }

    init() {
        this.resize();
        this.createNodes();
        this.start();
        this.setupResize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createNodes() {
        this.nodes = [];
        const nodeCount = Math.min(60, Math.floor((this.canvas.width * this.canvas.height) / 20000));
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push(new TechNode(this.canvas.width, this.canvas.height));
        }
    }

    start() {
        this.animate();
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    animate() {
        const isLightMode = document.body.classList.contains('light-mode');
        const fadeColor = isLightMode ? '241, 245, 249' : '2, 6, 23';
        this.ctx.fillStyle = `rgba(${fadeColor}, 0.08)`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawPipelines();
        
        for (let node of this.nodes) {
            node.update(this.canvas.width, this.canvas.height);
            node.draw(this.ctx);
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawPipelines() {
        const isLightMode = document.body.classList.contains('light-mode');
        const baseColor = isLightMode ? '79, 70, 229' : '99, 102, 241';
        const secondaryColor = isLightMode ? '124, 58, 237' : '139, 92, 246';
        
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const opacity = 0.2 * (1 - distance / 150);
                    const gradient = this.ctx.createLinearGradient(
                        this.nodes[i].x, this.nodes[i].y, 
                        this.nodes[j].x, this.nodes[j].y
                    );
                    gradient.addColorStop(0, `rgba(${baseColor}, ${opacity})`);
                    gradient.addColorStop(0.5, `rgba(${secondaryColor}, ${opacity * 1.2})`);
                    gradient.addColorStop(1, `rgba(${baseColor}, ${opacity})`);
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                    this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                    this.ctx.strokeStyle = gradient;
                    this.ctx.lineWidth = 1.5;
                    this.ctx.stroke();
                    
                    const midX = (this.nodes[i].x + this.nodes[j].x) / 2;
                    const midY = (this.nodes[i].y + this.nodes[j].y) / 2;
                    const pulse = (Math.sin(Date.now() * 0.003) + 1) * 0.5;
                    
                    // Enhanced midpoint with glow effect
                    this.ctx.beginPath();
                    this.ctx.arc(midX, midY, 3 + pulse * 2, 0, Math.PI * 2);
                    this.ctx.fillStyle = `rgba(${secondaryColor}, ${opacity * 2.5 * (0.5 + pulse)})`;
                    this.ctx.fill();
                    
                    // Outer glow
                    this.ctx.beginPath();
                    this.ctx.arc(midX, midY, 5 + pulse * 3, 0, Math.PI * 2);
                    this.ctx.fillStyle = `rgba(${secondaryColor}, ${opacity * 0.5 * pulse})`;
                    this.ctx.fill();
                }
            }
        }
    }

    setupResize() {
        let timeout;
        window.addEventListener('resize', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.resize();
                this.createNodes();
            }, 250);
        });
    }
}

class TechNode {
    constructor(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulse = 0;
    }

    update(width, height) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;

        if (this.x > width || this.x < 0) this.speedX *= -1;
        if (this.y > height || this.y < 0) this.speedY *= -1;
    }

    draw(ctx) {
        const isLightMode = document.body.classList.contains('light-mode');
        const baseColor = isLightMode ? '79, 70, 229' : '99, 102, 241';
        const secondaryColor = isLightMode ? '124, 58, 237' : '139, 92, 246';
        const pulseOpacity = 0.4 + Math.sin(this.pulse) * 0.3;
        
        for (let i = 3; i > 0; i--) {
            const glowRadius = this.radius + i * 2;
            const glowOpacity = pulseOpacity * 0.2 * (i / 3);
            ctx.beginPath();
            ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${secondaryColor}, ${glowOpacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, `rgba(${baseColor}, ${pulseOpacity})`);
        gradient.addColorStop(0.7, `rgba(${secondaryColor}, ${pulseOpacity * 0.8})`);
        gradient.addColorStop(1, `rgba(${baseColor}, ${pulseOpacity * 0.5})`);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity * 0.3})`;
        ctx.fill();
    }
}
