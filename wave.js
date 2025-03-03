class WaveBackground {
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

    // Wave properties
    this.wavesNumber = 3;
    this.stepsX = Array(this.wavesNumber).fill(0);
    this.stepsY = Array(this.wavesNumber).fill(0);

    // Default colors
    this.baseColors = [
      { h: 210, s: 70, l: 60 },
      { h: 240, s: 70, l: 60 },
      { h: 180, s: 70, l: 60 }
    ];

    // Mouse position
    this.lastX = this.width / 2;
    this.lastY = this.height / 2;

    // Event listeners
    window.addEventListener('resize', () => this.onResize(), { passive: true });
    window.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });

    this.animate();
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  onMouseMove(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate the hue change based on mouse position
    const hueChange = (mouseX / this.width) * 60;

    // Update the base colors based on mouse position
    this.baseColors[0].h = (210 + hueChange) % 360;
    this.baseColors[1].h = (210 + hueChange + 30) % 360;
    this.baseColors[2].h = (210 + hueChange - 30) % 360;

    // Update last position for smoother mouse movement
    this.lastX = mouseX;
    this.lastY = mouseY;
  }

  animate() {
    // Clear canvas with semi-transparent background for trail effect
    this.ctx.fillStyle = 'rgba(26, 26, 26, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw waves
    for (let i = 0; i < this.wavesNumber; i++) {
      // Create dynamic wave motion
      this.stepsX[i] += 0.01 + (i * 0.005);
      this.stepsY[i] += 0.01 + (i * 0.005);

      // Calculate wave positions
      const xOffset = Math.sin(this.stepsX[i]) * 100;
      const yOffset = Math.cos(this.stepsY[i]) * 100;

      // Draw gradient wave
      const gradient = this.ctx.createRadialGradient(
        this.lastX + xOffset, this.lastY + yOffset, 0,
        this.lastX + xOffset, this.lastY + yOffset, this.width / (3 - i)
      );

      const baseColor = this.baseColors[i];
      gradient.addColorStop(0, `hsla(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%, 0.8)`);
      gradient.addColorStop(1, `hsla(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%, 0)`);

      this.ctx.beginPath();
      this.ctx.arc(
        this.lastX + xOffset, 
        this.lastY + yOffset, 
        this.width / (4 - i), 
        0, 
        Math.PI * 2
      );
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    }

    // Request next animation frame
    requestAnimationFrame(() => this.animate());
  }
}