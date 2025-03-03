
class WaveBackground {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.lastX = this.width / 2;
    this.lastY = this.height / 2;
    this.stepsX = new Array(3).fill(0);
    this.stepsY = new Array(3).fill(0);
    this.wavesNumber = 3;
    this.hue = 210; // Initial blue hue
    this.hueDirection = 1;
    this.baseColors = [
      { h: 210, s: 70, l: 40 }, // Base blue
      { h: 210, s: 60, l: 50 }, // Lighter blue
      { h: 210, s: 80, l: 30 }  // Darker blue
    ];
    
    this.initialize();
  }
  
  initialize() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    document.body.appendChild(this.canvas);
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';
    
    window.addEventListener('resize', () => this.onResize());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    
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
    
    // Change hue based on mouse position
    const hueChange = Math.floor((mouseX / this.width) * 60);
    const saturationChange = Math.floor((mouseY / this.height) * 30);
    
    // Update colors based on mouse position
    this.baseColors.forEach((color, i) => {
      color.h = (210 + hueChange) % 360;
      color.s = Math.min(100, Math.max(50, 60 + saturationChange));
    });
    
    this.lastX = mouseX;
    this.lastY = mouseY;
  }
  
  drawWave(index) {
    const ctx = this.ctx;
    const width = this.width;
    const height = this.height;
    
    this.stepsX[index] += 0.03 * (index + 1);
    this.stepsY[index] += 0.04 * (index + 1);
    
    const color = this.baseColors[index];
    const alpha = 0.15 - (index * 0.05);
    
    ctx.fillStyle = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${alpha})`;
    ctx.beginPath();
    
    let x = 0;
    let y = height * 0.5;
    let amplitude = height * 0.1 * (index + 1);
    let frequency = 0.005;
    
    // Influence of mouse position on waves
    const mouseInfluenceX = (this.lastX / width) * 2 - 1;
    const mouseInfluenceY = (this.lastY / height) * 2 - 1;
    
    amplitude += mouseInfluenceY * height * 0.05;
    frequency += mouseInfluenceX * 0.002;
    
    ctx.moveTo(x, y);
    
    while (x < width) {
      y = height * 0.5 + Math.sin(x * frequency + this.stepsX[index]) * amplitude + 
          Math.cos(x * frequency * 0.8 + this.stepsY[index]) * amplitude * 0.5;
      ctx.lineTo(x, y);
      x += 5;
    }
    
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Update theme color
    this.hue += 0.1 * this.hueDirection;
    if (this.hue > 240 || this.hue < 190) {
      this.hueDirection *= -1;
    }
    
    // Draw waves
    for (let i = 0; i < this.wavesNumber; i++) {
      this.drawWave(i);
    }
    
    // Create subtle visual ambiance through gradient overlay
    const gradient = this.ctx.createRadialGradient(
      this.lastX, this.lastY, 0,
      this.lastX, this.lastY, this.width * 0.7
    );
    
    gradient.addColorStop(0, `hsla(${this.hue + 20}, 70%, 60%, 0.03)`);
    gradient.addColorStop(1, 'hsla(210, 70%, 30%, 0.01)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    requestAnimationFrame(() => this.animate());
  }
}
