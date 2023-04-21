"use strict";
var AnimatedBackground = /** @class */ (function () {
    function AnimatedBackground(canvas, colors, numParticles) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.colors = colors;
        this.numParticles = numParticles;
        this.particles = [];
        this.init();
    }
    AnimatedBackground.prototype.init = function () {
        for (var i = 0; i < this.numParticles; i++) {
            var color = this.colors[Math.floor(Math.random() * this.colors.length)];
            var particle = new Particle(this.canvas, color);
            this.particles.push(particle);
        }
    };
    AnimatedBackground.prototype.animate = function () {
        var _this = this;
        if (!this.ctx)
            return; // Add null check
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.particles.length; i++) {
            var particle = this.particles[i];
            particle.update();
            particle.draw(this.ctx);
        }
        requestAnimationFrame(function () { return _this.animate(); });
    };
    return AnimatedBackground;
}());
var Particle = /** @class */ (function () {
    function Particle(canvas, color) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 50;
        this.color = color;
        this.speed = Math.random() * 3;
        this.direction = Math.random() * 360;
        this.canvas = canvas;
    }
    Particle.prototype.update = function () {
        var radians = this.direction * (Math.PI / 180);
        this.x += this.speed * Math.cos(radians);
        this.y += this.speed * Math.sin(radians);
        if (this.x < 0 || this.x > this.canvas.width) {
            this.direction = 180 - this.direction;
        }
        if (this.y < 0 || this.y > this.canvas.height) {
            this.direction = 360 - this.direction;
        }
    };
    Particle.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    return Particle;
}());
// Wait for the DOM to fully load before running the code
window.addEventListener("load", function () {
    // Get the canvas element from the DOM
    var canvas = document.getElementById("canvas");
    // Set the canvas width and height to fill the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Create an instance of the AnimatedBackground class
    var animatedBackground = new AnimatedBackground(canvas, ["#ff9c5b", "#ff3d2e", "#00cecb", "#f3ffbd", "#E6E6FA"], 100);
    // Start the animation
    animatedBackground.animate();
});
