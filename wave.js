
// Wave animation script
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
    
    this.lastX = mouseX;
    this.lastY = mouseY;
  }
  
  drawWave(index) {
    const ctx = this.ctx;
    const width = this.width;
    const height = this.height;
    
    this.stepsX[index] += 0.03 * (index + 1);
    this.stepsY[index] += 0.04 * (index + 1);
    
    const xOffset = Math.sin(this.stepsX[index]) * 20 + (this.lastX - width/2) * 0.05 * (index + 1);
    const yOffset = Math.cos(this.stepsY[index]) * 20 + (this.lastY - height/2) * 0.05 * (index + 1);
    
    ctx.beginPath();
    
    const alpha = 0.1 - (index * 0.02);
    const color = index === 0 ? '68,144,226' : '74,174,226';
    ctx.fillStyle = `rgba(${color},${alpha})`;
    
    let x = 0;
    let y = height / 2 + yOffset;
    ctx.moveTo(x, y);
    
    while (x < width) {
      y = height / 2 + Math.sin(x / 200 + this.stepsX[index]) * 50 + yOffset;
      ctx.lineTo(x, y);
      x += 10;
    }
    
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    for (let i = this.wavesNumber - 1; i >= 0; i--) {
      this.drawWave(i);
    }
    
    requestAnimationFrame(() => this.animate());
  }
}
