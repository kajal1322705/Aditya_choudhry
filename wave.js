
class MultiverseBackground {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';

    this.dimensions = [];
    this.dimensionColors = [];
    this.stars = [];
    this.particleCount = 180;
    this.starCount = 100;
    this.mouseX = 0;
    this.mouseY = 0;
    this.interactionStrength = 100;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    this.initDimensions();
    this.initStars();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initDimensions() {
    this.dimensions = [];
    this.dimensionColors = [
      { r: 110, g: 72, b: 170, a: 0.5 },  // Purple
      { r: 157, g: 80, b: 187, a: 0.4 },  // Magenta
      { r: 122, g: 103, b: 217, a: 0.3 }  // Lavender
    ];

    for (let i = 0; i < 3; i++) {
      const dimensionParticles = [];
      for (let j = 0; j < this.particleCount; j++) {
        dimensionParticles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5,
          opacity: Math.random() * 0.7 + 0.3,
          growthRate: Math.random() * 0.02 + 0.01,
          maxRadius: Math.random() * 5 + 3,
          minRadius: Math.random() * 1 + 0.5,
          growing: true
        });
      }
      this.dimensions.push(dimensionParticles);
    }
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < this.starCount; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1.5 + 0.2,
        opacity: Math.random() * 0.8 + 0.2,
        blinkRate: Math.random() * 0.05,
        blinkDirection: Math.random() > 0.5 ? 1 : -1
      });
    }
  }

  drawStars() {
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      
      // Update star blinking
      star.opacity += star.blinkRate * star.blinkDirection;
      
      if (star.opacity > 1) {
        star.opacity = 1;
        star.blinkDirection = -1;
      } else if (star.opacity < 0.2) {
        star.opacity = 0.2;
        star.blinkDirection = 1;
      }
      
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      this.ctx.fill();
    }
  }

  drawParticles() {
    for (let d = 0; d < this.dimensions.length; d++) {
      const color = this.dimensionColors[d];
      const particles = this.dimensions[d];
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update particle size
        if (p.growing) {
          p.radius += p.growthRate;
          if (p.radius >= p.maxRadius) {
            p.growing = false;
          }
        } else {
          p.radius -= p.growthRate;
          if (p.radius <= p.minRadius) {
            p.growing = true;
          }
        }
        
        // Calculate distance from mouse
        const dx = p.x - this.mouseX;
        const dy = p.y - this.mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply mouse interaction if within range
        if (distance < this.interactionStrength) {
          const angle = Math.atan2(dy, dx);
          const force = (this.interactionStrength - distance) / this.interactionStrength;
          p.x += Math.cos(angle) * force * 2;
          p.y += Math.sin(angle) * force * 2;
        }
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off edges
        if (p.x < 0 || p.x > this.canvas.width) {
          p.speedX = -p.speedX;
        }
        if (p.y < 0 || p.y > this.canvas.height) {
          p.speedY = -p.speedY;
        }
        
        // Draw particle
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${p.opacity * color.a})`;
        this.ctx.fill();
        
        // Connect nearby particles with lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            const lineOpacity = 0.1 * (1 - distance / 100);
            this.ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${lineOpacity})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
          }
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Create a subtle gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gradient.addColorStop(0, 'rgba(18, 18, 18, 1)');
    gradient.addColorStop(1, 'rgba(30, 30, 30, 1)');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawStars();
    this.drawParticles();
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize the background when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Create a small delay to ensure all DOM elements are ready
  setTimeout(() => {
    try {
      new MultiverseBackground();
    } catch (err) {
      console.error("Background initialization error:", err);
      // Fallback to CSS background if canvas fails
      document.body.style.background = 'linear-gradient(135deg, #121212, #1e1e1e)';
    }
  }, 100);
});
