let canvas, ctx;
let particles = [];
let animationId;
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
function createParticles() {
  particles = [];
  const count = window.innerWidth < 768 ? 40 : 70;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 0.5,
      speedY: -(Math.random() * 0.4 + 0.1),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.1,
      sparkle: Math.random() * Math.PI * 2,
      sparkleSpeed: 0.02 + Math.random() * 0.05,
      color: Math.random() > 0.7 ? `rgba(168, 85, 247, 0.3)` : `rgba(251, 191, 36, 0.4)`
    });
  }
}
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    p.x += p.speedX + Math.sin(p.sparkle) * 0.2;
    p.y += p.speedY;
    p.sparkle += p.sparkleSpeed;
    if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    const alpha = Math.min(p.opacity + Math.sin(p.sparkle) * 0.2, 0.7);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`);
    ctx.fill();
    if (Math.sin(p.sparkle) > 0.7) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = p.color.replace(/[\d.]+\)$/, '0.15)');
      ctx.fill();
    }
  }
}
function animate() {
  drawParticles();
  animationId = requestAnimationFrame(animate);
}
export function initParticles() {
  canvas = document.getElementById('particlesBg');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  resize();
  createParticles();
  animate();
  window.addEventListener('resize', () => { resize(); createParticles(); });
}