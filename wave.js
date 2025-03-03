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

    this.dimensions = [];
    this.dimensionColors = [];
    this.particleCount = 150;

    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.initDimensions();
    this.initDimensionColors();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initDimensions() {
    this.dimensions = [];
    for (let i = 0; i < 3; i++) {
      const dimensionParticles = [];
      for (let j = 0; j < this.particleCount; j++) {
        dimensionParticles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          opacity: Math.random() * 0.7 + 0.3
        });
      }
      this.dimensions.push(dimensionParticles);
    }
  }

  initDimensionColors() {
    this.dimensionColors = [
      { h: 210, s: 90, l: 60 }, // Blue dimension
      { h: 270, s: 90, l: 60 }, // Purple dimension
      { h: 330, s: 90, l: 60 }  // Pink dimension
    ];
  }

  drawParticle(particle, color) {
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${particle.opacity})`;
    this.ctx.fill();
  }

  drawConnections(particles, color) {
    const maxDistance = 150;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.4;
          this.ctx.beginPath();
          this.ctx.moveTo(particles[i].x, particles[i].y);
          this.ctx.lineTo(particles[j].x, particles[j].y);
          this.ctx.strokeStyle = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }

  updateParticles() {
    for (let i = 0; i < this.dimensions.length; i++) {
      const particles = this.dimensions[i];

      for (let j = 0; j < particles.length; j++) {
        const p = particles[j];

        p.x += p.speedX;
        p.y += p.speedY;

        // Boundary check and bounce
        if (p.x < 0 || p.x > this.canvas.width) {
          p.speedX *= -1;
        }

        if (p.y < 0 || p.y > this.canvas.height) {
          p.speedY *= -1;
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw a gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gradient.addColorStop(0, '#050A20');
    gradient.addColorStop(1, '#0A1030');

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw multiverse dimensions
    for (let i = 0; i < this.dimensions.length; i++) {
      const particles = this.dimensions[i];
      const color = this.dimensionColors[i];

      for (let j = 0; j < particles.length; j++) {
        this.drawParticle(particles[j], color);
      }

      this.drawConnections(particles, color);
    }

    this.updateParticles();

    // Continue animation loop
    requestAnimationFrame(() => this.animate());
  }
}

// Create aliases for backward compatibility with older code references
window.MultiverseBackground = MultiverseBackground;
window.WaveBackground = MultiverseBackground;
window.GalaxyBackground = MultiverseBackground;

// Create aliases for backward compatibility
window.WaveBackground = MultiverseBackground;
window.GalaxyBackground = MultiverseBackground;