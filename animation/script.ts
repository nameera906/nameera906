
class AnimatedBackground {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    colors: string[];
    numParticles: number;
    particles: Particle[];
  
    constructor(canvas: HTMLCanvasElement, colors: string[], numParticles: number) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.colors = colors;
      this.numParticles = numParticles;
      this.particles = [];
  
      this.init();
    }
  
    init() {
      for (let i = 0; i < this.numParticles; i++) {
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const particle = new Particle(this.canvas, color);
        this.particles.push(particle);
      }
    }
  
    animate() {
      if (!this.ctx) return; // Add null check
  
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      for (let i = 0; i < this.particles.length; i++) {
        const particle = this.particles[i];
        particle.update();
        particle.draw(this.ctx);
      }
  
      requestAnimationFrame(() => this.animate());
    }
  }
  
  class Particle {
    x: number;
    y: number;
    size: number;
    color: string;
    speed: number;
    direction: number;
    canvas: HTMLCanvasElement;
  
    constructor(canvas: HTMLCanvasElement, color: string) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 50;
      this.color = color;
      this.speed = Math.random() * 3;
      this.direction = Math.random() * 360;
      this.canvas = canvas;
    }
  
    update() {
      const radians = this.direction * (Math.PI / 180);
      this.x += this.speed * Math.cos(radians);
      this.y += this.speed * Math.sin(radians);
  
      if (this.x < 0 || this.x > this.canvas.width) {
        this.direction = 180 - this.direction;
      }
  
      if (this.y < 0 || this.y > this.canvas.height) {
        this.direction = 360 - this.direction;
      }
    }
  
    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
  
  // Wait for the DOM to fully load before running the code
  window.addEventListener("load", () => {
    // Get the canvas element from the DOM
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  
    // Set the canvas width and height to fill the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    // Create an instance of the AnimatedBackground class
    const animatedBackground = new AnimatedBackground(canvas, ["#ff9c5b", "#ff3d2e", "#00cecb", "#f3ffbd", "#E6E6FA"], 100);
  
    // Start the animation
    animatedBackground.animate();
  });
  
