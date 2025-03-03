
class MultiverseBackground {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.prepend(this.canvas);

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Initialize dimension colors for UI integration
    this.dimensionColors = [
      { h: 270, s: 80, l: 65 }, // Purple (TVA)
      { h: 190, s: 90, l: 60 }, // Blue (sacred timeline)
      { h: 130, s: 90, l: 50 }, // Green (variants)
      { h: 30, s: 100, l: 60 }, // Orange (kang variants)
      { h: 340, s: 80, l: 60 }  // Red (danger)
    ];

    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';
    
    // Add these event listeners with passive option for better performance
    window.addEventListener('resize', () => this.onResize(), { passive: true });
    window.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });
    
    // Setup multiverse
    this.setupMultiverse();
    this.animate();
  }

  setupMultiverse() {
    // Multiverse timelines
    this.timelines = [];
    this.timelineCount = 12;
    this.initTimelines();

    // Sacred timeline (main branch)
    this.sacredTimeline = {
      points: [],
      width: 10,
      color: { h: 190, s: 90, l: 60 },
      offset: this.height * 0.5,
      frequency: 0.005,
      amplitude: this.height * 0.1,
      speed: 0.5
    };
    this.initSacredTimeline();

    // Nexus events (branching points)
    this.nexusEvents = [];
    this.maxNexusEvents = 5;
    this.initNexusEvents();

    // Dimension portals
    this.portals = [];
    this.portalCount = 3;
    this.initPortals();

    // Stars/particles
    this.particles = [];
    this.particleCount = 300;
    this.initParticles();

    // Mouse position and influence
    this.mouseX = this.width / 2;
    this.mouseY = this.height / 2;
    this.mouseRadius = 150;
    this.mouseInfluence = 0.1;

    // Time variables
    this.time = 0;
    this.timeSpeed = 0.002;
    this.pruningCounter = 0;
    this.nextPruning = Math.random() * 1000 + 500;
  }

  initTimelines() {
    this.timelines = [];
    const centerY = this.height * 0.5;

    for (let i = 0; i < this.timelineCount; i++) {
      // Distribute timelines vertically around center
      const baseOffset = centerY + (Math.random() * 2 - 1) * this.height * 0.3;
      const colorIndex = Math.floor(Math.random() * this.dimensionColors.length);

      this.timelines.push({
        points: [],
        width: Math.random() * 3 + 2,
        color: { ...this.dimensionColors[colorIndex] },
        offset: baseOffset,
        frequency: Math.random() * 0.01 + 0.002,
        amplitude: Math.random() * this.height * 0.1 + 20,
        speed: Math.random() * 0.8 + 0.2,
        phase: Math.random() * Math.PI * 2,
        active: true,
        branchFrom: i < 3 ? null : Math.floor(Math.random() * i)
      });
    }

    // Generate points for each timeline
    for (let i = 0; i < this.timelines.length; i++) {
      const timeline = this.timelines[i];

      for (let x = 0; x < this.width + 100; x += 5) {
        const y = timeline.offset + 
                 Math.sin(x * timeline.frequency + timeline.phase) * timeline.amplitude;

        timeline.points.push({ x, y });
      }
    }
  }

  initSacredTimeline() {
    this.sacredTimeline.points = [];

    for (let x = 0; x < this.width + 100; x += 5) {
      const y = this.sacredTimeline.offset + 
               Math.sin(x * this.sacredTimeline.frequency) * this.sacredTimeline.amplitude;

      this.sacredTimeline.points.push({ x, y });
    }
  }

  initNexusEvents() {
    this.nexusEvents = [];

    for (let i = 0; i < this.maxNexusEvents / 2; i++) {
      this.createRandomNexusEvent();
    }
  }

  createRandomNexusEvent() {
    const timelineIndex = Math.floor(Math.random() * this.timelines.length);
    const timeline = this.timelines[timelineIndex];

    if (!timeline.active) return;

    const pointIndex = Math.floor(Math.random() * timeline.points.length);
    const point = timeline.points[pointIndex];

    this.createNexusEvent(point.x, point.y, timelineIndex);
  }

  createNexusEvent(x, y, sourceTimelineIndex = null) {
    // Find closest timeline if source not specified
    if (sourceTimelineIndex === null) {
      let closestDist = Infinity;
      let closestIndex = 0;

      for (let i = 0; i < this.timelines.length; i++) {
        if (!this.timelines[i].active) continue;

        for (const point of this.timelines[i].points) {
          const dist = Math.hypot(point.x - x, point.y - y);
          if (dist < closestDist) {
            closestDist = dist;
            closestIndex = i;
          }
        }
      }

      if (closestDist > 50) return;
      sourceTimelineIndex = closestIndex;
    }

    if (this.nexusEvents.length >= this.maxNexusEvents) {
      this.nexusEvents.shift();
    }

    // Create a new nexus event
    this.nexusEvents.push({
      x, y,
      size: 0,
      maxSize: Math.random() * 40 + 30,
      growth: Math.random() * 0.5 + 0.3,
      sourceTimeline: sourceTimelineIndex,
      color: { ...this.dimensionColors[Math.floor(Math.random() * this.dimensionColors.length)] },
      branches: [],
      branchCount: Math.floor(Math.random() * 3) + 1,
      age: 0,
      lifespan: Math.random() * 200 + 100
    });

    // Create portal at nexus location
    if (Math.random() > 0.5) {
      this.createPortal(x, y);
    }

    // Add new branch timeline at nexus event
    if (this.timelines.length < 20 && Math.random() > 0.3) {
      const sourceTimeline = this.timelines[sourceTimelineIndex];

      const newTimeline = {
        points: [],
        width: Math.random() * 3 + 1,
        color: { 
          h: (sourceTimeline.color.h + Math.random() * 40 - 20) % 360,
          s: sourceTimeline.color.s,
          l: sourceTimeline.color.l
        },
        offset: y,
        frequency: sourceTimeline.frequency * (Math.random() * 0.5 + 0.8),
        amplitude: sourceTimeline.amplitude * (Math.random() * 0.5 + 0.8),
        speed: sourceTimeline.speed * (Math.random() * 0.5 + 0.8),
        phase: Math.random() * Math.PI * 2,
        active: true,
        branchFrom: sourceTimelineIndex,
        branchX: x
      };

      // Generate points for new branch
      for (let x = 0; x < this.width + 100; x += 5) {
        let y;
        if (x < newTimeline.branchX) {
          // Before branch point, follow source timeline
          const sourcePoint = sourceTimeline.points[Math.floor(x / 5)];
          y = sourcePoint ? sourcePoint.y : newTimeline.offset;
        } else {
          // After branch point, create new path
          y = newTimeline.offset + 
              Math.sin(x * newTimeline.frequency + newTimeline.phase) * newTimeline.amplitude;
        }

        newTimeline.points.push({ x, y });
      }

      this.timelines.push(newTimeline);
    }
  }

  initPortals() {
    this.portals = [];

    for (let i = 0; i < this.portalCount; i++) {
      this.createRandomPortal();
    }
  }

  createRandomPortal() {
    const x = Math.random() * this.width;
    const y = Math.random() * this.height;

    this.createPortal(x, y);
  }

  createPortal(x, y) {
    if (this.portals.length >= 8) {
      // Remove oldest portal
      this.portals.shift();
    }

    const colorIndex1 = Math.floor(Math.random() * this.dimensionColors.length);
    let colorIndex2 = Math.floor(Math.random() * this.dimensionColors.length);

    // Ensure different colors
    while (colorIndex2 === colorIndex1) {
      colorIndex2 = Math.floor(Math.random() * this.dimensionColors.length);
    }

    this.portals.push({
      x, y,
      outerRadius: Math.random() * 60 + 40,
      innerRadius: Math.random() * 25 + 15,
      outerColor: { ...this.dimensionColors[colorIndex1] },
      innerColor: { ...this.dimensionColors[colorIndex2] },
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() * 2 - 1) * 0.01,
      pulseSpeed: Math.random() * 0.05 + 0.02,
      pulsePhase: Math.random() * Math.PI * 2,
      age: 0,
      lifespan: Math.random() * 500 + 300
    });
  }

  initParticles() {
    this.particles = [];

    for (let i = 0; i < this.particleCount; i++) {
      this.createParticle(
        Math.random() * this.width,
        Math.random() * this.height
      );
    }
  }

  createParticle(x, y, colorIndex = null) {
    if (colorIndex === null) {
      colorIndex = Math.floor(Math.random() * this.dimensionColors.length);
    }

    this.particles.push({
      x, y,
      size: Math.random() * 2 + 1,
      color: { ...this.dimensionColors[colorIndex] },
      vx: (Math.random() * 2 - 1) * 0.5,
      vy: (Math.random() * 2 - 1) * 0.5,
      alpha: Math.random() * 0.5 + 0.5,
      fadeSpeed: Math.random() * 0.01 + 0.005
    });
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Reinitialize all elements
    this.setupMultiverse();
  }

  onMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  pruneRandomTimeline() {
    // Find active timelines
    const activeIndices = this.timelines.map((t, i) => t.active ? i : -1).filter(i => i >= 0);

    if (activeIndices.length <= 2) return; // Keep at least 2 timelines

    const pruneIndex = activeIndices[Math.floor(Math.random() * activeIndices.length)];
    const timeline = this.timelines[pruneIndex];

    // Create pruning effect
    for (const point of timeline.points) {
      if (Math.random() > 0.8) {
        this.createParticle(
          point.x, 
          point.y, 
          4 // Red color index
        );
      }
    }

    // Mark as inactive
    timeline.active = false;

    // Create new timeline to replace it
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const sourceIndex = activeIndices[Math.floor(Math.random() * activeIndices.length)];
        if (sourceIndex === undefined) return;

        const sourceTimeline = this.timelines[sourceIndex];
        const pointIndex = Math.floor(Math.random() * sourceTimeline.points.length);
        const point = sourceTimeline.points[pointIndex];

        this.createNexusEvent(point.x, point.y, sourceIndex);
      }, Math.random() * 2000 + 1000);
    }
  }

  updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];

      // Move particle
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Fade out
      particle.alpha -= particle.fadeSpeed;

      // Mouse influence
      const dx = particle.x - this.mouseX;
      const dy = particle.y - this.mouseY;
      const dist = Math.hypot(dx, dy);

      if (dist < this.mouseRadius) {
        const force = (this.mouseRadius - dist) / this.mouseRadius * this.mouseInfluence;
        particle.vx += dx / dist * force;
        particle.vy += dy / dist * force;
      }

      // Stay within bounds with wrapping
      if (particle.x < 0) particle.x = this.width;
      if (particle.x > this.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.height;
      if (particle.y > this.height) particle.y = 0;

      // Remove if faded out
      if (particle.alpha <= 0) {
        this.particles.splice(i, 1);

        // Replace with new particle
        if (Math.random() > 0.3) {
          this.createParticle(
            Math.random() * this.width,
            Math.random() * this.height
          );
        }
      }
    }
  }

  updateTimelines() {
    // Update sacred timeline
    for (let i = 0; i < this.sacredTimeline.points.length; i++) {
      const point = this.sacredTimeline.points[i];
      point.x -= this.sacredTimeline.speed;

      if (point.x < -100) {
        point.x = this.width;
        point.y = this.sacredTimeline.offset + 
                 Math.sin(point.x * this.sacredTimeline.frequency + this.time) * 
                 this.sacredTimeline.amplitude;
      }
    }

    // Update other timelines
    for (const timeline of this.timelines) {
      if (!timeline.active) continue;

      for (let i = 0; i < timeline.points.length; i++) {
        const point = timeline.points[i];
        point.x -= timeline.speed;

        if (point.x < -100) {
          point.x = this.width;

          if (timeline.branchFrom !== null && timeline.branchX > 0) {
            // If this is a branched timeline
            if (point.x < timeline.branchX) {
              // Before branch point, follow parent timeline
              const parentTimeline = this.timelines[timeline.branchFrom];
              if (parentTimeline && parentTimeline.active) {
                const parentPoint = parentTimeline.points[i];
                point.y = parentPoint ? parentPoint.y : timeline.offset;
              }
            } else {
              // After branch point, use own parameters
              point.y = timeline.offset + 
                      Math.sin(point.x * timeline.frequency + timeline.phase + this.time) * 
                      timeline.amplitude;
            }
          } else {
            // Independent timeline
            point.y = timeline.offset + 
                     Math.sin(point.x * timeline.frequency + timeline.phase + this.time) * 
                     timeline.amplitude;
          }
        }

        // Mouse interaction with timelines
        const dx = point.x - this.mouseX;
        const dy = point.y - this.mouseY;
        const dist = Math.hypot(dx, dy);

        if (dist < this.mouseRadius) {
          const force = (this.mouseRadius - dist) / this.mouseRadius * 0.2;
          point.y += dy * force * -0.1; // Gentle repulsion
        }
      }
    }
  }

  updateNexusEvents() {
    for (let i = this.nexusEvents.length - 1; i >= 0; i--) {
      const event = this.nexusEvents[i];

      // Grow nexus event
      if (event.size < event.maxSize) {
        event.size += event.growth;
      }

      // Age the event
      event.age++;

      // Remove old events
      if (event.age > event.lifespan) {
        this.nexusEvents.splice(i, 1);
        continue;
      }

      // Create particles from nexus events
      if (Math.random() > 0.9) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * event.size;
        const x = event.x + Math.cos(angle) * distance;
        const y = event.y + Math.sin(angle) * distance;

        this.createParticle(x, y, Math.floor(Math.random() * this.dimensionColors.length));
      }
    }
  }

  updatePortals() {
    for (let i = this.portals.length - 1; i >= 0; i--) {
      const portal = this.portals[i];

      // Update rotation
      portal.rotation += portal.rotationSpeed;

      // Age portal
      portal.age++;

      // Remove old portals
      if (portal.age > portal.lifespan) {
        this.portals.splice(i, 1);
        continue;
      }

      // Create particles from portals
      if (Math.random() > 0.8) {
        const angle = Math.random() * Math.PI * 2;
        const distance = portal.innerRadius + Math.random() * 10;
        const x = portal.x + Math.cos(angle) * distance;
        const y = portal.y + Math.sin(angle) * distance;

        // Use inner portal color for particles
        const colorIndex = this.dimensionColors.findIndex(
          c => c.h === portal.innerColor.h && c.s === portal.innerColor.s
        );

        this.createParticle(x, y, colorIndex !== -1 ? colorIndex : null);
      }
    }
  }

  drawTimelines() {
    // Draw sacred timeline
    this.ctx.lineWidth = this.sacredTimeline.width;
    this.ctx.strokeStyle = `hsla(${this.sacredTimeline.color.h}, ${this.sacredTimeline.color.s}%, ${this.sacredTimeline.color.l}%, 0.8)`;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    this.ctx.beginPath();
    for (let i = 0; i < this.sacredTimeline.points.length; i++) {
      const point = this.sacredTimeline.points[i];
      if (i === 0) {
        this.ctx.moveTo(point.x, point.y);
      } else {
        this.ctx.lineTo(point.x, point.y);
      }
    }
    this.ctx.stroke();

    // Draw other timelines
    for (const timeline of this.timelines) {
      if (!timeline.active) continue;

      this.ctx.lineWidth = timeline.width;
      this.ctx.strokeStyle = `hsla(${timeline.color.h}, ${timeline.color.s}%, ${timeline.color.l}%, 0.8)`;

      this.ctx.beginPath();
      for (let i = 0; i < timeline.points.length; i++) {
        const point = timeline.points[i];
        if (i === 0) {
          this.ctx.moveTo(point.x, point.y);
        } else {
          this.ctx.lineTo(point.x, point.y);
        }
      }
      this.ctx.stroke();
    }
  }

  drawNexusEvents() {
    for (const event of this.nexusEvents) {
      // Draw outer glow
      const gradient = this.ctx.createRadialGradient(
        event.x, event.y, 0,
        event.x, event.y, event.size
      );

      gradient.addColorStop(0, `hsla(${event.color.h}, ${event.color.s}%, ${event.color.l}%, 0.8)`);
      gradient.addColorStop(0.7, `hsla(${event.color.h}, ${event.color.s}%, ${event.color.l}%, 0.3)`);
      gradient.addColorStop(1, `hsla(${event.color.h}, ${event.color.s}%, ${event.color.l}%, 0)`);

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(event.x, event.y, event.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Draw inner core
      this.ctx.fillStyle = `hsla(${event.color.h}, ${event.color.s}%, ${event.color.l + 20}%, 0.9)`;
      this.ctx.beginPath();
      this.ctx.arc(event.x, event.y, event.size * 0.3, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  drawPortals() {
    for (const portal of this.portals) {
      // Apply pulsing effect
      const pulseScale = 1 + Math.sin(this.time * 5 + portal.pulsePhase) * 0.1;
      const outerRadius = portal.outerRadius * pulseScale;
      const innerRadius = portal.innerRadius * pulseScale;

      // Draw outer ring
      this.ctx.save();
      this.ctx.translate(portal.x, portal.y);
      this.ctx.rotate(portal.rotation);

      // Outer glow
      const outerGradient = this.ctx.createRadialGradient(
        0, 0, innerRadius,
        0, 0, outerRadius
      );

      outerGradient.addColorStop(0, `hsla(${portal.outerColor.h}, ${portal.outerColor.s}%, ${portal.outerColor.l}%, 0.9)`);
      outerGradient.addColorStop(0.7, `hsla(${portal.outerColor.h}, ${portal.outerColor.s}%, ${portal.outerColor.l}%, 0.5)`);
      outerGradient.addColorStop(1, `hsla(${portal.outerColor.h}, ${portal.outerColor.s}%, ${portal.outerColor.l}%, 0)`);

      this.ctx.fillStyle = outerGradient;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, outerRadius, 0, Math.PI * 2);
      this.ctx.fill();

      // Inner portal
      const innerGradient = this.ctx.createRadialGradient(
        0, 0, 0,
        0, 0, innerRadius
      );

      innerGradient.addColorStop(0, `hsla(${portal.innerColor.h}, ${portal.innerColor.s}%, ${portal.innerColor.l + 20}%, 1)`);
      innerGradient.addColorStop(0.8, `hsla(${portal.innerColor.h}, ${portal.innerColor.s}%, ${portal.innerColor.l}%, 0.8)`);
      innerGradient.addColorStop(1, `hsla(${portal.innerColor.h}, ${portal.innerColor.s}%, ${portal.innerColor.l}%, 0.6)`);

      this.ctx.fillStyle = innerGradient;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, innerRadius, 0, Math.PI * 2);
      this.ctx.fill();

      // Portal rings
      this.ctx.strokeStyle = `hsla(${portal.outerColor.h}, ${portal.outerColor.s}%, ${portal.outerColor.l + 20}%, 0.8)`;
      this.ctx.lineWidth = 2;

      for (let i = 0; i < 3; i++) {
        const ringRadius = innerRadius + (outerRadius - innerRadius) * (i / 4);
        this.ctx.beginPath();
        this.ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
        this.ctx.stroke();
      }

      // TVA-like symbols or runes around the portal
      this.ctx.fillStyle = `hsla(${portal.innerColor.h}, ${portal.innerColor.s}%, ${portal.innerColor.l + 30}%, 0.8)`;
      const symbolCount = 8;
      const symbolRadius = (innerRadius + outerRadius) / 2;

      for (let i = 0; i < symbolCount; i++) {
        const angle = (i / symbolCount) * Math.PI * 2;
        const x = Math.cos(angle) * symbolRadius;
        const y = Math.sin(angle) * symbolRadius;

        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle + Math.PI / 2);

        // Draw random TVA-like symbol
        if (i % 3 === 0) {
          // Circle symbol
          this.ctx.beginPath();
          this.ctx.arc(0, 0, 5, 0, Math.PI * 2);
          this.ctx.fill();
        } else if (i % 3 === 1) {
          // Triangle symbol
          this.ctx.beginPath();
          this.ctx.moveTo(0, -5);
          this.ctx.lineTo(5, 5);
          this.ctx.lineTo(-5, 5);
          this.ctx.closePath();
          this.ctx.fill();
        } else {
          // Line symbol
          this.ctx.lineWidth = 2;
          this.ctx.beginPath();
          this.ctx.moveTo(-5, -5);
          this.ctx.lineTo(5, 5);
          this.ctx.stroke();

          this.ctx.beginPath();
          this.ctx.moveTo(5, -5);
          this.ctx.lineTo(-5, 5);
          this.ctx.stroke();
        }

        this.ctx.restore();
      }

      this.ctx.restore();
    }
  }

  drawParticles() {
    for (const particle of this.particles) {
      this.ctx.fillStyle = `hsla(${particle.color.h}, ${particle.color.s}%, ${particle.color.l}%, ${particle.alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  animate() {
    // Update time
    this.time += this.timeSpeed;
    this.pruningCounter++;

    // Check for timeline pruning (like TVA does)
    if (this.pruningCounter > this.nextPruning) {
      this.pruningCounter = 0;
      this.nextPruning = Math.random() * 1000 + 500;
      this.pruneRandomTimeline();
    }

    // Clear canvas with fade effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Update and draw all elements
    this.updateParticles();
    this.updateTimelines();
    this.updateNexusEvents();
    this.updatePortals();

    this.drawTimelines();
    this.drawNexusEvents();
    this.drawPortals();
    this.drawParticles();

    // Create occasional new nexus events
    if (Math.random() > 0.995) {
      this.createRandomNexusEvent();
    }

    // Create occasional new portal
    if (Math.random() > 0.998) {
      this.createRandomPortal();
    }

    // Continue animation loop
    requestAnimationFrame(() => this.animate());
  }
}

// Create aliases for backward compatibility
window.WaveBackground = MultiverseBackground;
window.GalaxyBackground = MultiverseBackground;
