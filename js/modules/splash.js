let animationId = null;
let particles = [];
let canvas, ctx;
let isExiting = false;
let logoImage = null;
let logoLoaded = false;
let startTime = null;
let exitProgress = 0;
const DURATION = 2800;
const EXIT_DURATION = 1000;

function createParticles() {
  particles = [];
  const colors = ['#a855f7', '#c084fc', '#fbbf24', '#fcd34d', '#ffffff', '#e9d5ff'];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3.5 + 1.5,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.3,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.02,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * Math.PI * 2,
      spin: 0.005 + Math.random() * 0.015
    });
  }
}

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawBackground() {
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, '#050510');
  grad.addColorStop(0.5, '#080818');
  grad.addColorStop(1, '#000000');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 0.12;
  const centerGrad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width/2);
  centerGrad.addColorStop(0, '#a855f7');
  centerGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = centerGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;
}

function drawParticles() {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.speedX;
    p.y += p.speedY;
    p.pulse += p.pulseSpeed;
    p.angle += p.spin;
    if (p.x < -100) p.x = canvas.width + 100;
    if (p.x > canvas.width + 100) p.x = -100;
    if (p.y < -100) p.y = canvas.height + 100;
    if (p.y > canvas.height + 100) p.y = -100;
    const pulseScale = 0.6 + Math.sin(p.pulse) * 0.4;
    const size = p.size * pulseScale;
    const opacity = p.alpha + Math.sin(p.pulse) * 0.15;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.shadowBlur = size * 2;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    for (let s = 0; s < 4; s++) {
      const angle = (s * Math.PI * 2) / 4;
      const x1 = Math.cos(angle) * size;
      const y1 = Math.sin(angle) * size;
      const x2 = Math.cos(angle + Math.PI / 4) * size * 0.4;
      const y2 = Math.sin(angle + Math.PI / 4) * size * 0.4;
      if (s === 0) ctx.moveTo(x1, y1);
      else ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
    }
    ctx.closePath();
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.min(opacity, 0.7) * (1 - exitProgress);
    ctx.fill();
    ctx.restore();
  }
  ctx.globalAlpha = 1;
}

function drawLogo() {
  if (!logoLoaded || !logoImage) return;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const logoSize = 250;
  const elapsed = performance.now() - startTime;
  let progress = Math.min(elapsed / DURATION, 1);
  const blurAmount = Math.max(0, 20 * (1 - progress));
  const opacity = Math.min(progress * 1.2, 1);
  const scale = 0.9 + (progress * 0.1);
  const scaledSize = logoSize * scale;
  let finalOpacity = opacity * (1 - exitProgress);
  ctx.save();
  ctx.shadowBlur = blurAmount;
  ctx.shadowColor = '#ffffff';
  ctx.globalAlpha = finalOpacity;
  ctx.drawImage(logoImage, centerX - scaledSize/2, centerY - scaledSize/2, scaledSize, scaledSize);
  ctx.restore();
}

let exitStartTime = 0;
let exitAnimationRunning = false;

function startExit() {
  if (exitAnimationRunning) return;
  exitAnimationRunning = true;
  exitStartTime = performance.now();
  exitProgress = 0;

  const mainContent = document.getElementById('main-content');
  const header = document.getElementById('header');
  const footer = document.querySelector('.footer');

  if (mainContent) mainContent.style.transition = `opacity ${EXIT_DURATION}ms ease`;
  if (header) header.style.transition = `opacity ${EXIT_DURATION}ms ease`;
  if (footer) footer.style.transition = `opacity ${EXIT_DURATION}ms ease`;

  const exitInterval = setInterval(() => {
    const elapsed = performance.now() - exitStartTime;
    exitProgress = Math.min(elapsed / EXIT_DURATION, 1);
    const webOpacity = exitProgress;

    if (mainContent) mainContent.style.opacity = webOpacity;
    if (header) header.style.opacity = webOpacity;
    if (footer) footer.style.opacity = webOpacity;

    if (exitProgress >= 1) {
      clearInterval(exitInterval);
      const splash = document.getElementById('splash');
      if (splash) splash.style.display = 'none';
      document.body.style.overflow = 'auto';
      if (animationId) cancelAnimationFrame(animationId);

      // ✅ ELIMINAR LA CLASE splash-active DEL BODY para mostrar el contenido
      document.body.classList.remove('splash-active');
    }
  }, 16);
}

function exitSplash() {
  if (isExiting) return;
  isExiting = true;
  startExit();
}

function animate() {
  if (!ctx) return;
  drawBackground();
  drawParticles();
  drawLogo();
  animationId = requestAnimationFrame(animate);
}

export function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;
  canvas = document.getElementById('galaxyCanvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');

  // Añadir clase para ocultar el contenido principal
  document.body.classList.add('splash-active');

  // Forzar opacidad 0 al contenido principal por si acaso (no necesario con la clase)
  const mainContent = document.getElementById('main-content');
  const header = document.getElementById('header');
  const footer = document.querySelector('.footer');
  if (mainContent) mainContent.style.opacity = '0';
  if (header) header.style.opacity = '0';
  if (footer) footer.style.opacity = '0';

  logoImage = new Image();
  logoImage.onload = () => { logoLoaded = true; };
  logoImage.src = 'images/logo-white.webp';

  resizeCanvas();
  createParticles();
  startTime = performance.now();
  animate();

  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });

  document.body.style.overflow = 'hidden';
  splash.addEventListener('click', () => exitSplash());
  setTimeout(() => exitSplash(), DURATION + 500);
}