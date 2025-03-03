
class GalaxyBackground {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.prepend(this.canvas);

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';

    // Stars properties
    this.stars = [];
    this.numStars = 200;
    this.initStars();

    // Galaxy properties
    this.galaxies = [];
    this.numGalaxies = 3;
    this.initGalaxies();

    // Mouse position
    this.mouseX = this.width / 2;
    this.mouseY = this.height / 2;

    // Colors
    this.baseColors = [
      { h: 210, s: 70, l: 60 },
      { h: 240, s: 70, l: 60 },
      { h: 290, s: 70, l: 60 }
    ];

    // Event listeners
    window.addEventListener('resize', () => this.onResize(), { passive: true });
    window.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });

    this.animate();
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
        brightness: Math.random() * 0.5 + 0.5
      });
    }
  }

  initGalaxies() {
    this.galaxies = [];
    for (let i = 0; i < this.numGalaxies; i++) {
      this.galaxies.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 150 + 100,
        particles: [],
        rotation: Math.random() * 0.02 - 0.01,
        colorIndex: i % 3,
        speed: Math.random() * 0.5 + 0.1
      });

      // Create galaxy particles
      const numParticles = 100;
      for (let j = 0; j < numParticles; j++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * this.galaxies[i].size;
        this.galaxies[i].particles.push({
          distance: distance,
          angle: angle,
          size: Math.random() * 2 + 1,
          speed: 0.01 + Math.random() * 0.01,
          opacity: Math.random() * 0.7 + 0.3
        });
      }
    }
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    this.initStars();
    this.initGalaxies();
  }

  onMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    // Update galaxy color based on mouse position
    const hueChange = (this.mouseX / this.width) * 60;
    this.baseColors[0].h = (210 + hueChange) % 360;
    this.baseColors[1].h = (240 + hueChange) % 360;
    this.baseColors[2].h = (290 + hueChange) % 360;

    // Attract nearest galaxy to mouse
    let nearestGalaxy = 0;
    let minDistance = Infinity;
    
    this.galaxies.forEach((galaxy, index) => {
      const dx = galaxy.x - this.mouseX;
      const dy = galaxy.y - this.mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestGalaxy = index;
      }
    });
    
    if (minDistance < 300) {
      const dx = this.mouseX - this.galaxies[nearestGalaxy].x;
      const dy = this.mouseY - this.galaxies[nearestGalaxy].y;
      this.galaxies[nearestGalaxy].x += dx * 0.01;
      this.galaxies[nearestGalaxy].y += dy * 0.01;
    }
  }

  drawStars() {
    this.stars.forEach(star => {
      // Update position
      star.y += star.speed;
      if (star.y > this.height) {
        star.y = 0;
        star.x = Math.random() * this.width;
      }

      // Draw star
      const brightness = star.brightness * 255;
      this.ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${star.brightness})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawGalaxies() {
    this.galaxies.forEach(galaxy => {
      // Slowly move galaxy
      galaxy.x += (Math.sin(Date.now() * 0.001) * galaxy.speed);
      galaxy.y += (Math.cos(Date.now() * 0.001) * galaxy.speed);
      
      // Keep galaxy in bounds
      if (galaxy.x < -galaxy.size) galaxy.x = this.width + galaxy.size;
      if (galaxy.x > this.width + galaxy.size) galaxy.x = -galaxy.size;
      if (galaxy.y < -galaxy.size) galaxy.y = this.height + galaxy.size;
      if (galaxy.y > this.height + galaxy.size) galaxy.y = -galaxy.size;
      
      // Create gradient for galaxy
      const baseColor = this.baseColors[galaxy.colorIndex];
      const gradient = this.ctx.createRadialGradient(
        galaxy.x, galaxy.y, 0,
        galaxy.x, galaxy.y, galaxy.size
      );
      
      gradient.addColorStop(0, `hsla(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%, 0.4)`);
      gradient.addColorStop(1, `hsla(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%, 0)`);
      
      // Draw galaxy particles
      galaxy.particles.forEach(particle => {
        // Update angle
        particle.angle += particle.speed;
        
        // Calculate particle position
        const x = galaxy.x + Math.cos(particle.angle) * particle.distance;
        const y = galaxy.y + Math.sin(particle.angle) * particle.distance;
        
        // Calculate distance from center for brightness
        const distanceRatio = particle.distance / galaxy.size;
        const opacity = particle.opacity * (1 - distanceRatio * 0.5);
        
        // Draw particle
        this.ctx.fillStyle = `hsla(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%, ${opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
      });
      
      // Draw galaxy center glow
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(galaxy.x, galaxy.y, galaxy.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  animate() {
    // Apply a semi-transparent black overlay for trail effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Draw stars and galaxies
    this.drawStars();
    this.drawGalaxies();
    
    // Continue animation
    requestAnimationFrame(() => this.animate());
  }
}

// Alias for backward compatibility
window.WaveBackground = GalaxyBackground;
