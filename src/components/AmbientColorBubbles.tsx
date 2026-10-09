import React, { useEffect, useRef } from 'react';
import { ScreenId, ThemeMode } from '../types';

interface AmbientColorBubblesProps {
  currentScreen?: ScreenId;
  isPlayingMusic?: boolean;
  theme?: ThemeMode;
}

interface MovingBubble {
  x: number;
  y: number;
  z: number; // 0.25 (far) to 1.0 (near foreground)
  size: number;
  vx: number;
  vy: number;
  phase: number;
  phaseSpeed: number;
  swayAmp: number;
  color: string;
  glow: string;
  opacity: number;
  parallax: number;
}

const INITIAL_BUBBLES: MovingBubble[] = [
  // Electric Blue (#00d4ff)
  { x: 8, y: 14, z: 0.92, size: 22, vx: 0.018, vy: -0.026, phase: 0.2, phaseSpeed: 0.025, swayAmp: 26, color: '#00d4ff', glow: 'rgba(0, 212, 255, 0.75)', opacity: 0.68, parallax: 0.35 },
  { x: 86, y: 20, z: 0.55, size: 26, vx: -0.022, vy: 0.019, phase: 1.4, phaseSpeed: 0.02, swayAmp: 34, color: '#00d4ff', glow: 'rgba(0, 212, 255, 0.55)', opacity: 0.46, parallax: 0.22 },
  { x: 26, y: 46, z: 0.85, size: 15, vx: 0.025, vy: -0.022, phase: 2.8, phaseSpeed: 0.03, swayAmp: 22, color: '#00d4ff', glow: 'rgba(0, 212, 255, 0.7)', opacity: 0.62, parallax: 0.32 },
  { x: 72, y: 68, z: 0.38, size: 32, vx: -0.016, vy: -0.024, phase: 4.1, phaseSpeed: 0.018, swayAmp: 38, color: '#00d4ff', glow: 'rgba(0, 212, 255, 0.5)', opacity: 0.38, parallax: 0.16 },
  { x: 44, y: 84, z: 0.78, size: 18, vx: 0.021, vy: -0.029, phase: 5.0, phaseSpeed: 0.027, swayAmp: 28, color: '#00d4ff', glow: 'rgba(0, 212, 255, 0.65)', opacity: 0.56, parallax: 0.28 },

  // Pink (#ec4899)
  { x: 16, y: 30, z: 0.96, size: 24, vx: 0.02, vy: 0.023, phase: 0.9, phaseSpeed: 0.022, swayAmp: 30, color: '#ec4899', glow: 'rgba(236, 72, 153, 0.72)', opacity: 0.64, parallax: 0.38 },
  { x: 62, y: 12, z: 0.62, size: 15, vx: -0.024, vy: 0.025, phase: 2.1, phaseSpeed: 0.028, swayAmp: 24, color: '#ec4899', glow: 'rgba(236, 72, 153, 0.65)', opacity: 0.52, parallax: 0.24 },
  { x: 12, y: 74, z: 0.42, size: 28, vx: 0.017, vy: -0.021, phase: 3.5, phaseSpeed: 0.019, swayAmp: 36, color: '#ec4899', glow: 'rgba(236, 72, 153, 0.5)', opacity: 0.4, parallax: 0.18 },
  { x: 91, y: 52, z: 0.88, size: 19, vx: -0.023, vy: -0.02, phase: 4.7, phaseSpeed: 0.026, swayAmp: 28, color: '#ec4899', glow: 'rgba(236, 72, 153, 0.68)', opacity: 0.58, parallax: 0.34 },

  // Lilac (#a855f7)
  { x: 35, y: 18, z: 0.48, size: 25, vx: -0.019, vy: 0.024, phase: 1.7, phaseSpeed: 0.021, swayAmp: 32, color: '#a855f7', glow: 'rgba(168, 85, 247, 0.6)', opacity: 0.44, parallax: 0.2 },
  { x: 79, y: 38, z: 0.94, size: 16, vx: -0.026, vy: -0.023, phase: 3.1, phaseSpeed: 0.029, swayAmp: 25, color: '#a855f7', glow: 'rgba(168, 85, 247, 0.75)', opacity: 0.65, parallax: 0.36 },
  { x: 53, y: 60, z: 0.35, size: 30, vx: 0.018, vy: 0.02, phase: 0.5, phaseSpeed: 0.017, swayAmp: 35, color: '#a855f7', glow: 'rgba(168, 85, 247, 0.52)', opacity: 0.36, parallax: 0.15 },
  { x: 21, y: 90, z: 0.82, size: 18, vx: 0.022, vy: -0.027, phase: 5.6, phaseSpeed: 0.024, swayAmp: 27, color: '#a855f7', glow: 'rgba(168, 85, 247, 0.64)', opacity: 0.55, parallax: 0.3 },

  // Crimson Red (#e11d48)
  { x: 48, y: 28, z: 0.74, size: 20, vx: -0.021, vy: -0.019, phase: 2.4, phaseSpeed: 0.023, swayAmp: 29, color: '#e11d48', glow: 'rgba(225, 29, 72, 0.62)', opacity: 0.52, parallax: 0.27 },
  { x: 6, y: 56, z: 0.9, size: 14, vx: 0.027, vy: 0.022, phase: 3.9, phaseSpeed: 0.031, swayAmp: 23, color: '#e11d48', glow: 'rgba(225, 29, 72, 0.7)', opacity: 0.6, parallax: 0.34 },
  { x: 84, y: 82, z: 0.52, size: 22, vx: -0.019, vy: -0.025, phase: 1.1, phaseSpeed: 0.022, swayAmp: 31, color: '#e11d48', glow: 'rgba(225, 29, 72, 0.54)', opacity: 0.44, parallax: 0.21 },
];

export const AmbientColorBubbles: React.FC<AmbientColorBubblesProps> = ({
  currentScreen = 'revista',
  isPlayingMusic = false,
  theme = 'dark',
}) => {
  const bubbleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const screenRef = useRef<ScreenId>(currentScreen);
  const playingRef = useRef<boolean>(isPlayingMusic);
  const themeRef = useRef<ThemeMode>(theme);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    screenRef.current = currentScreen;
  }, [currentScreen]);

  useEffect(() => {
    playingRef.current = isPlayingMusic;
  }, [isPlayingMusic]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Global mouse tracking for 3D camera parallax across all backgrounds
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / (window.innerWidth || 1)) * 2 - 1;
      const ny = (e.clientY / (window.innerHeight || 1)) * 2 - 1;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // 1. PORTADA (REVISTA): 3D Depth-of-Field Roaming Luminous Spheres Engine
  useEffect(() => {
    if (currentScreen !== 'revista') return;

    const state = INITIAL_BUBBLES.map((b) => ({ ...b }));
    let rafId: number;
    let time = 0;

    const animateBubbles = () => {
      time += 0.016;
      const scrollY = window.scrollY || 0;
      const vh = window.innerHeight || 900;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      if (orbRefs.current[0]) {
        const ox = Math.sin(time * 0.45) * 90 + Math.cos(time * 0.25) * 40 - mx * 35;
        const oy = Math.cos(time * 0.38) * 75 - (scrollY * 0.15) % vh - my * 35;
        orbRefs.current[0].style.transform = `translate3d(${ox.toFixed(1)}px, ${oy.toFixed(1)}px, -80px)`;
      }
      if (orbRefs.current[1]) {
        const ox = Math.cos(time * 0.4) * -105 + Math.sin(time * 0.22) * 45 + mx * 45;
        const oy = Math.sin(time * 0.34) * 85 - (scrollY * 0.22) % vh + my * 45;
        orbRefs.current[1].style.transform = `translate3d(${ox.toFixed(1)}px, ${oy.toFixed(1)}px, -40px)`;
      }
      if (orbRefs.current[2]) {
        const ox = Math.sin(time * 0.5 + 1.5) * 95 - mx * 55;
        const oy = Math.cos(time * 0.42 + 1.1) * -80 - (scrollY * 0.18) % vh - my * 55;
        orbRefs.current[2].style.transform = `translate3d(${ox.toFixed(1)}px, ${oy.toFixed(1)}px, 20px)`;
      }

      for (let i = 0; i < state.length; i++) {
        const b = state[i];
        b.x += b.vx * (1.6 + b.z * 1.4);
        b.y += b.vy * (1.6 + b.z * 1.4);
        b.phase += b.phaseSpeed * 1.8;

        if (b.x > 98) b.x = 2;
        if (b.x < 2) b.x = 98;
        if (b.y > 98) b.y = 2;
        if (b.y < 2) b.y = 98;

        const el = bubbleRefs.current[i];
        if (el) {
          const swayX = Math.sin(b.phase) * b.swayAmp + mx * (b.z * 48);
          const swayY = Math.cos(b.phase * 0.85) * (b.swayAmp * 0.75) + my * (b.z * 38);
          const scrollShiftY = -((scrollY * b.parallax) % vh);
          let effectiveY = ((b.y / 100) * vh + swayY + scrollShiftY) % vh;
          if (effectiveY < -40) effectiveY += vh + 40;

          const zOsc = Math.sin(b.phase * 1.1) * 45;
          const zDepth = (b.z - 0.5) * 180 + zOsc;
          const scale = (0.65 + b.z * 0.65) + Math.sin(b.phase * 1.3) * 0.16;

          el.style.left = `${b.x.toFixed(2)}%`;
          el.style.top = `${effectiveY.toFixed(1)}px`;
          el.style.transform = `translate3d(${swayX.toFixed(1)}px, 0px, ${zDepth.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        }
      }

      rafId = requestAnimationFrame(animateBubbles);
    };

    rafId = requestAnimationFrame(animateBubbles);
    return () => cancelAnimationFrame(rafId);
  }, [currentScreen]);

  // 2. MULTI-SCENE 3D VOLUMETRIC CANVAS ENGINE FOR ALL OTHER SCREENS:
  // - discografia: Pure 3D Sonic Ocean Mesh (No top equalizer bars) + 3D Crest Particles
  // - galeria: 3D Volumetric Studio Light Rays + Depth-of-Field Prism Bokeh
  // - serveis: 3D Perspective Cyber-Grid Floor & Ceiling + Traveling Data Nodes
  // - presskit: 3D Stage Concert Laser Cones + Tilted 3D Acoustic Rings
  // - contacte: 3D Orbital Gyro-Radar Sphere + Volumetric Signal Pulses
  // - legal: 3D Gyroscopic Archival Astrolabe Rings
  useEffect(() => {
    if (currentScreen === 'revista') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const dustParticles = Array.from({ length: 48 }, (_, idx) => ({
      x: ((idx * 97) % 100) / 100,
      y: ((idx * 53) % 100) / 100,
      z: 0.2 + ((idx * 31) % 80) / 100, // 3D depth factor
      r: 1.5 + (idx % 4) * 1.5,
      vx: (idx % 2 === 0 ? 1 : -1) * (0.00018 + (idx % 5) * 0.00006),
      vy: -0.00025 - (idx % 4) * 0.00008,
      color: idx % 3 === 0 ? '#00d4ff' : idx % 3 === 1 ? '#ec4899' : '#a855f7',
      phase: idx * 0.7,
    }));

    let rafId: number;
    let t = 0;

    const renderScene = () => {
      t += 0.018;
      const scr = screenRef.current;
      const isPlaying = playingRef.current;
      const isLight = themeRef.current === 'light';
      const alphaMul = isLight ? 0.58 : 1;
      const scrollY = window.scrollY || 0;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, width, height);

      // =======================================================================
      // SCENE A: DISCOGRAFÍA -> PURE 3D SONIC OCEAN (NO TOP AUDIO BARS)
      // Full 3D perspective mesh with longitudinal & transversal waves + crest glow
      // =======================================================================
      if (scr === 'discografia') {
        const boost = isPlaying ? 1.55 : 1.0;
        const speed = isPlaying ? t * 1.65 : t * 0.92;

        const vanishX = width * 0.5 + mx * 75;
        const horizonY = height * 0.34 + my * 28 - Math.min(80, scrollY * 0.05);

        // Deep 3D Horizon Atmospheric Glow
        const grad = ctx.createRadialGradient(
          vanishX,
          horizonY,
          10,
          vanishX,
          horizonY,
          Math.max(width, height) * 0.75
        );
        grad.addColorStop(0, `rgba(0, 212, 255, ${0.22 * alphaMul})`);
        grad.addColorStop(0.32, `rgba(168, 85, 247, ${0.16 * alphaMul})`);
        grad.addColorStop(0.65, `rgba(236, 72, 153, ${0.09 * alphaMul})`);
        grad.addColorStop(1, 'rgba(5, 5, 7, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // 3D Perspective Camera Projection Parameters for Sonic Ocean
        const rows = 30;
        const cols = 46;
        const fov = 420;
        const camHeight = 165 + my * 22;
        const zNear = 85;
        const zFar = 1250;

        // Compute 3D projected vertex matrix [r][c]
        const grid: { px: number; py: number; elev: number; depth: number }[][] = [];

        for (let r = 0; r < rows; r++) {
          const depth = r / (rows - 1); // 0 = far horizon, 1 = close foreground
          // Non-linear Z distribution so foreground has rich detail and horizon is dense
          const z = zFar - Math.pow(depth, 0.72) * (zFar - zNear);
          const scale = fov / (fov + z);

          const rowPoints: { px: number; py: number; elev: number; depth: number }[] = [];
          const worldWidth = width * 2.9;

          for (let c = 0; c <= cols; c++) {
            const u = (c / cols) * 2 - 1; // -1 to 1
            const worldX = u * worldWidth + mx * 90 * (1 - depth);

            // Multi-layered 3D Sonic Ocean Swell + Acoustic Harmonic Ripples
            const swell1 = Math.sin(u * 5.5 + speed * 1.35 - z * 0.0085) * 42;
            const swell2 = Math.cos(u * 9.5 - speed * 1.05 + z * 0.012) * 26;
            const ripple = Math.sin(Math.hypot(u * 4, z * 0.006) * 3.2 - speed * 2.1) * 18;
            const elev = (swell1 + swell2 + ripple) * boost;

            const px = vanishX + worldX * scale;
            const py = horizonY + (camHeight - elev) * scale;

            rowPoints.push({ px, py, elev, depth });
          }
          grid.push(rowPoints);
        }

        // 1) Draw Longitudinal 3D Perspective Lines (Receding into the horizon)
        for (let c = 0; c <= cols; c += 2) {
          ctx.beginPath();
          for (let r = 0; r < rows; r++) {
            const pt = grid[r][c];
            if (r === 0) ctx.moveTo(pt.px, pt.py);
            else ctx.lineTo(pt.px, pt.py);
          }
          const colColor =
            c % 4 === 0
              ? `rgba(0, 212, 255, ${0.15 * alphaMul})`
              : `rgba(168, 85, 247, ${0.13 * alphaMul})`;
          ctx.strokeStyle = colColor;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }

        // 2) Draw Transversal 3D Wave Ribbons + Volumetric Water Fill
        for (let r = 0; r < rows; r++) {
          const rowPts = grid[r];
          const depth = rowPts[0].depth;

          ctx.beginPath();
          for (let c = 0; c <= cols; c++) {
            const pt = rowPts[c];
            if (c === 0) ctx.moveTo(pt.px, pt.py);
            else ctx.lineTo(pt.px, pt.py);
          }

          const lineAlpha = (0.1 + Math.pow(depth, 1.3) * 0.55) * alphaMul;
          const strokeRGB =
            r % 3 === 0
              ? '0, 212, 255'
              : r % 3 === 1
              ? '236, 72, 153'
              : '168, 85, 247';

          ctx.strokeStyle = `rgba(${strokeRGB}, ${lineAlpha})`;
          ctx.lineWidth = 0.9 + depth * 1.9;
          ctx.stroke();

          // Luminous 3D Crest Nodes on Foreground Waves
          if (r > 10 && r % 2 === 0) {
            for (let c = 0; c <= cols; c += 3) {
              const pt = rowPts[c];
              if (pt.elev > 22 * boost) {
                const nodeRadius = (1.2 + depth * 2.6) * (pt.elev / (65 * boost));
                ctx.fillStyle = `rgba(255, 255, 255, ${(0.35 + depth * 0.45) * alphaMul})`;
                ctx.beginPath();
                ctx.arc(pt.px, pt.py, nodeRadius, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        }
      }

      // =======================================================================
      // SCENE B: GALERÍA (FOTOS) -> 3D VOLUMETRIC LIGHT RAYS + DEPTH BOKEH
      // =======================================================================
      else if (scr === 'galeria') {
        ctx.save();
        const rays = [
          { srcX: width * 0.14, angle: 0.42, sway: 0.12, spread: 0.22, color: '0, 212, 255', speed: 0.55, z: 0.9 },
          { srcX: width * 0.36, angle: 0.25, sway: -0.1, spread: 0.26, color: '168, 85, 247', speed: 0.42, z: 0.6 },
          { srcX: width * 0.64, angle: -0.22, sway: 0.11, spread: 0.25, color: '236, 72, 153', speed: 0.48, z: 0.8 },
          { srcX: width * 0.88, angle: -0.4, sway: -0.13, spread: 0.2, color: '225, 29, 72', speed: 0.62, z: 0.95 },
          { srcX: width * 0.5, angle: 0.02, sway: 0.15, spread: 0.3, color: '255, 255, 255', speed: 0.35, z: 0.5 },
        ];

        const rayLength = Math.hypot(width, height) * 1.3;

        rays.forEach((ray, i) => {
          const currentAngle =
            Math.PI / 2 + ray.angle + Math.sin(t * ray.speed + i * 1.3) * ray.sway + mx * 0.08 * ray.z;
          const x0 = ray.srcX + Math.sin(t * 0.3 + i) * 50 - mx * 35 * ray.z;
          const y0 = -60;

          const x1 = x0 + Math.cos(currentAngle - ray.spread) * rayLength;
          const y1 = y0 + Math.sin(currentAngle - ray.spread) * rayLength;
          const x2 = x0 + Math.cos(currentAngle + ray.spread) * rayLength;
          const y2 = y0 + Math.sin(currentAngle + ray.spread) * rayLength;

          const grad = ctx.createLinearGradient(x0, y0, (x1 + x2) * 0.5, height * 0.95);
          const baseAlpha = (i === 4 ? 0.16 : 0.25) * alphaMul;
          grad.addColorStop(0, `rgba(${ray.color}, ${baseAlpha})`);
          grad.addColorStop(0.5, `rgba(${ray.color}, ${baseAlpha * 0.48})`);
          grad.addColorStop(1, `rgba(${ray.color}, 0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(x0 - 30, y0);
          ctx.lineTo(x0 + 30, y0);
          ctx.lineTo(x2, y2);
          ctx.lineTo(x1, y1);
          ctx.closePath();
          ctx.fill();
        });

        // 3D Depth-of-Field Optical Bokeh & Studio Dust
        dustParticles.forEach((p, idx) => {
          p.x = (p.x + p.vx * (0.6 + p.z) + 1) % 1;
          p.y = (p.y + p.vy * (0.6 + p.z) + 1) % 1;
          const px = p.x * width + Math.sin(t * 0.8 + p.phase) * 28 + mx * 55 * p.z;
          const py = ((p.y * height - scrollY * (0.1 + p.z * 0.18) + my * 40 * p.z) % height + height) % height;
          const pulse = 0.5 + 0.5 * Math.sin(t * 1.6 + p.phase);
          const bokehRadius = (idx % 5 === 0 ? p.r * 6.5 * p.z : p.r * 2.2 * p.z) * (0.85 + pulse * 0.3);

          const bGrad = ctx.createRadialGradient(px, py, 0, px, py, bokehRadius);
          const rgb =
            p.color === '#00d4ff'
              ? '0, 212, 255'
              : p.color === '#ec4899'
              ? '236, 72, 153'
              : '168, 85, 247';
          const a = (idx % 5 === 0 ? 0.24 : 0.5) * pulse * alphaMul;
          bGrad.addColorStop(0, `rgba(255, 255, 255, ${a})`);
          bGrad.addColorStop(0.4, `rgba(${rgb}, ${a * 0.82})`);
          bGrad.addColorStop(1, `rgba(${rgb}, 0)`);

          ctx.fillStyle = bGrad;
          ctx.beginPath();
          ctx.arc(px, py, bokehRadius, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      }

      // =======================================================================
      // SCENE C: SERVICIOS -> 3D PERSPECTIVE ARCHITECTURAL HORIZON GRID
      // =======================================================================
      else if (scr === 'serveis') {
        const vx = width * 0.5 + mx * 65;
        const vy = height * 0.42 + my * 35;

        // Horizon core glow
        const hGrad = ctx.createRadialGradient(vx, vy, 5, vx, vy, width * 0.55);
        hGrad.addColorStop(0, `rgba(0, 212, 255, ${0.18 * alphaMul})`);
        hGrad.addColorStop(0.5, `rgba(168, 85, 247, ${0.08 * alphaMul})`);
        hGrad.addColorStop(1, 'rgba(5, 5, 7, 0)');
        ctx.fillStyle = hGrad;
        ctx.fillRect(0, 0, width, height);

        // 3D Floor & Ceiling Perspective Radial Beams
        const rayCount = 24;
        ctx.lineWidth = 1;
        for (let i = 0; i < rayCount; i++) {
          const angle = (i / rayCount) * Math.PI * 2;
          const dist = Math.hypot(width, height);
          const tx = vx + Math.cos(angle) * dist;
          const ty = vy + Math.sin(angle) * dist;

          const grad = ctx.createLinearGradient(vx, vy, tx, ty);
          grad.addColorStop(0, `rgba(0, 212, 255, 0)`);
          grad.addColorStop(0.3, `rgba(0, 212, 255, ${0.14 * alphaMul})`);
          grad.addColorStop(1, `rgba(168, 85, 247, ${0.22 * alphaMul})`);
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(vx, vy);
          ctx.lineTo(tx, ty);
          ctx.stroke();
        }

        // Expanding 3D Perspective Depth Frames (Tunnel / Matrix Planes)
        const planes = 10;
        for (let p = 0; p < planes; p++) {
          const prog = ((t * 0.16 + p / planes) % 1);
          const persp = Math.pow(prog, 2.1);
          const pw = width * 1.35 * persp;
          const ph = height * 1.35 * persp;
          const px = vx - pw * 0.5;
          const py = vy - ph * 0.5;

          const alpha = Math.sin(prog * Math.PI) * 0.28 * alphaMul;
          ctx.strokeStyle = p % 2 === 0 ? `rgba(0, 212, 255, ${alpha})` : `rgba(236, 72, 153, ${alpha})`;
          ctx.lineWidth = 0.8 + persp * 1.6;
          ctx.strokeRect(px, py, pw, ph);
        }
      }

      // =======================================================================
      // SCENE D: PRESSKIT -> 3D STAGE CONCERT LASERS & TILTED 3D RESONANCE RINGS
      // =======================================================================
      else if (scr === 'presskit') {
        const cx = width * 0.5 + mx * 50;
        const cy = height * 0.12 + my * 20;

        // 3D Volumetric Stage Laser Cones
        const laserCount = 9;
        for (let i = 0; i < laserCount; i++) {
          const norm = (i / (laserCount - 1)) * 2 - 1;
          const angle = Math.PI * 0.5 + norm * 0.65 + Math.sin(t * 0.65 + i * 0.8) * 0.16;
          const len = Math.hypot(width, height) * 1.1;
          const tx = cx + Math.cos(angle) * len;
          const ty = cy + Math.sin(angle) * len;

          const color =
            i % 3 === 0 ? '168, 85, 247' : i % 3 === 1 ? '236, 72, 153' : '0, 212, 255';
          const grad = ctx.createLinearGradient(cx, cy, tx, ty);
          grad.addColorStop(0, `rgba(${color}, ${0.46 * alphaMul})`);
          grad.addColorStop(0.5, `rgba(${color}, ${0.18 * alphaMul})`);
          grad.addColorStop(1, `rgba(${color}, 0)`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(tx, ty);
          ctx.stroke();
        }

        // 3D Tilted Elliptical Stage Rings (Perspective Floor Projection)
        for (let r = 0; r < 6; r++) {
          const prog = ((t * 0.24 + r / 6) % 1);
          const rx = prog * Math.max(width, height) * 0.68;
          const ry = rx * 0.36; // 3D foreshortening
          const ringY = height * 0.62 + prog * 110;
          const alpha = (1 - prog) * 0.34 * alphaMul;
          ctx.strokeStyle = r % 2 === 0 ? `rgba(0, 212, 255, ${alpha})` : `rgba(236, 72, 153, ${alpha})`;
          ctx.lineWidth = 1.2 + prog * 1.5;
          ctx.beginPath();
          ctx.ellipse(cx, ringY, rx, ry, mx * 0.08, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // =======================================================================
      // SCENE E: CONTACTO -> 3D ORBITAL SATELLITE SPHERE & CONSTELLATION NODES
      // =======================================================================
      else if (scr === 'contacte') {
        const radarX = width * 0.26 + mx * 45;
        const radarY = height * 0.46 + my * 35;

        // 3DTilted Gyroscopic Signal Rings
        for (let i = 0; i < 6; i++) {
          const prog = ((t * 0.22 + i / 6) % 1);
          const rad = prog * Math.max(width, height) * 0.72;
          const alpha = Math.pow(1 - prog, 1.4) * 0.36 * alphaMul;
          ctx.strokeStyle =
            i % 2 === 0 ? `rgba(0, 212, 255, ${alpha})` : `rgba(236, 72, 153, ${alpha})`;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.ellipse(
            radarX,
            radarY,
            rad,
            rad * (0.48 + 0.15 * Math.sin(t * 0.4 + i)),
            t * 0.15 + i * 0.4,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }

        // 3D Depth Constellation Network Nodes
        const nodes = dustParticles.slice(0, 26);
        const coords = nodes.map((n, idx) => {
          const nx = ((n.x + Math.sin(t * 0.35 + idx) * 0.08 + 1) % 1) * width + mx * 45 * n.z;
          const ny = ((n.y + Math.cos(t * 0.3 + idx) * 0.08 + 1) % 1) * height + my * 45 * n.z;
          return { x: nx, y: ny, z: n.z, color: n.color };
        });

        for (let i = 0; i < coords.length; i++) {
          for (let j = i + 1; j < coords.length; j++) {
            const dx = coords[i].x - coords[j].x;
            const dy = coords[i].y - coords[j].y;
            const dist = Math.hypot(dx, dy);
            if (dist < 250) {
              const lineA = (1 - dist / 250) * 0.26 * alphaMul;
              ctx.strokeStyle = `rgba(0, 212, 255, ${lineA})`;
              ctx.lineWidth = 0.8 + (coords[i].z + coords[j].z) * 0.5;
              ctx.beginPath();
              ctx.moveTo(coords[i].x, coords[i].y);
              ctx.lineTo(coords[j].x, coords[j].y);
              ctx.stroke();
            }
          }
        }

        coords.forEach((pt) => {
          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.8 + pt.z * 2.4, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // =======================================================================
      // SCENE F: LEGAL -> 3D GYROSCOPIC ARCHIVAL SEAL RINGS
      // =======================================================================
      else if (scr === 'legal') {
        const cx = width * 0.8 + mx * 35;
        const cy = height * 0.5 + my * 35;
        for (let i = 1; i <= 6; i++) {
          const radius = i * 85 + Math.sin(t * 0.5 + i) * 8;
          ctx.strokeStyle =
            i % 2 === 0
              ? `rgba(168, 85, 247, ${0.18 * alphaMul})`
              : `rgba(0, 212, 255, ${0.16 * alphaMul})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.ellipse(
            cx,
            cy,
            radius,
            radius * (0.45 + 0.25 * Math.cos(t * 0.35 + i)),
            t * 0.12 * (i % 2 === 0 ? 1 : -1) + i * 0.5,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(renderScene);
    };

    rafId = requestAnimationFrame(renderScene);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentScreen]);

  return (
    <div
      aria-hidden="true"
      style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {currentScreen === 'revista' ? (
        <>
          {/* Moving atmospheric radial orbs */}
          <div
            ref={(el) => {
              orbRefs.current[0] = el;
            }}
            className="absolute top-[10%] left-[12%] w-72 h-72 rounded-full bg-[#a855f7]/12 blur-[105px] will-change-transform"
          />
          <div
            ref={(el) => {
              orbRefs.current[1] = el;
            }}
            className="absolute top-[40%] right-[10%] w-80 h-80 rounded-full bg-[#00d4ff]/12 blur-[115px] will-change-transform"
          />
          <div
            ref={(el) => {
              orbRefs.current[2] = el;
            }}
            className="absolute bottom-[14%] left-[24%] w-72 h-72 rounded-full bg-[#ec4899]/12 blur-[110px] will-change-transform"
          />

          {/* 3D Volumetric Spheres for Portada (Revista) */}
          {INITIAL_BUBBLES.map((b, idx) => (
            <span
              key={idx}
              ref={(el) => {
                bubbleRefs.current[idx] = el;
              }}
              className="absolute rounded-full will-change-transform"
              style={{
                width: `${b.size}px`,
                height: `${b.size}px`,
                left: `${b.x}%`,
                top: `${b.y}%`,
                opacity: b.opacity,
                filter: b.z < 0.48 ? 'blur(1.2px)' : 'none',
                background: `radial-gradient(circle at 28% 28%, #ffffff 0%, ${b.color} 48%, rgba(5,5,7,0.85) 92%, transparent 100%)`,
                boxShadow: `0 10px 24px -4px rgba(0,0,0,0.65), 0 0 ${Math.round(b.size * 1.45)}px ${b.glow}, inset -3px -4px 8px rgba(0,0,0,0.55), inset 2px 2px 5px rgba(255,255,255,0.85)`,
                border: `1px solid ${b.color}`,
              }}
            />
          ))}
        </>
      ) : (
        <canvas
          ref={canvasRef}
          className="w-full h-full block will-change-transform"
        />
      )}
    </div>
  );
};

interface SectionBubbleItem {
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  color: string;
  glow: string;
  animClass: string;
  duration: string;
  delay: string;
}

export const SectionColorBubbles: React.FC<{
  variant?: 'music' | 'editorial' | 'electric' | 'rays';
}> = ({ variant = 'editorial' }) => {
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const cluster: SectionBubbleItem[] =
    variant === 'music'
      ? [
          { size: 18, x: 6, y: 20, vx: 0.045, vy: -0.038, phase: 0.3, color: '#00d4ff', glow: 'rgba(0,212,255,0.65)', animClass: 'rafa-roam-a', duration: '6.5s', delay: '0s' },
          { size: 26, x: 88, y: 24, vx: -0.04, vy: 0.035, phase: 1.5, color: '#ec4899', glow: 'rgba(236,72,153,0.6)', animClass: 'rafa-roam-b', duration: '7.5s', delay: '0.6s' },
          { size: 14, x: 82, y: 74, vx: -0.05, vy: -0.042, phase: 2.7, color: '#a855f7', glow: 'rgba(168,85,247,0.65)', animClass: 'rafa-roam-c', duration: '6s', delay: '1.2s' },
          { size: 21, x: 14, y: 78, vx: 0.038, vy: -0.046, phase: 3.9, color: '#e11d48', glow: 'rgba(225,29,72,0.58)', animClass: 'rafa-roam-a', duration: '7.2s', delay: '0.4s' },
          { size: 13, x: 48, y: 16, vx: 0.048, vy: 0.04, phase: 5.1, color: '#00d4ff', glow: 'rgba(0,212,255,0.7)', animClass: 'rafa-roam-b', duration: '5.8s', delay: '0.9s' },
          { size: 16, x: 62, y: 84, vx: -0.042, vy: -0.036, phase: 4.3, color: '#ec4899', glow: 'rgba(236,72,153,0.6)', animClass: 'rafa-roam-c', duration: '6.8s', delay: '1.5s' },
        ]
      : variant === 'electric'
      ? [
          { size: 24, x: 8, y: 18, vx: 0.042, vy: 0.036, phase: 0.6, color: '#00d4ff', glow: 'rgba(0,212,255,0.68)', animClass: 'rafa-roam-b', duration: '6.8s', delay: '0.2s' },
          { size: 15, x: 90, y: 32, vx: -0.048, vy: -0.038, phase: 1.9, color: '#00d4ff', glow: 'rgba(0,212,255,0.68)', animClass: 'rafa-roam-a', duration: '5.9s', delay: '0.8s' },
          { size: 20, x: 84, y: 78, vx: -0.038, vy: -0.044, phase: 3.2, color: '#ec4899', glow: 'rgba(236,72,153,0.58)', animClass: 'rafa-roam-c', duration: '7.1s', delay: '1.1s' },
          { size: 13, x: 18, y: 72, vx: 0.05, vy: -0.04, phase: 4.4, color: '#a855f7', glow: 'rgba(168,85,247,0.62)', animClass: 'rafa-roam-a', duration: '6.2s', delay: '0.5s' },
          { size: 17, x: 52, y: 42, vx: -0.044, vy: 0.042, phase: 2.3, color: '#e11d48', glow: 'rgba(225,29,72,0.58)', animClass: 'rafa-roam-b', duration: '6.6s', delay: '1.4s' },
        ]
      : [
          { size: 20, x: 7, y: 24, vx: 0.044, vy: -0.036, phase: 0.4, color: '#a855f7', glow: 'rgba(168,85,247,0.62)', animClass: 'rafa-roam-a', duration: '6.4s', delay: '0.2s' },
          { size: 15, x: 90, y: 18, vx: -0.046, vy: 0.04, phase: 1.8, color: '#00d4ff', glow: 'rgba(0,212,255,0.68)', animClass: 'rafa-roam-b', duration: '5.8s', delay: '0.7s' },
          { size: 24, x: 86, y: 70, vx: -0.038, vy: -0.042, phase: 3.0, color: '#ec4899', glow: 'rgba(236,72,153,0.58)', animClass: 'rafa-roam-c', duration: '7.3s', delay: '1.1s' },
          { size: 13, x: 11, y: 76, vx: 0.048, vy: -0.038, phase: 4.2, color: '#00d4ff', glow: 'rgba(0,212,255,0.68)', animClass: 'rafa-roam-b', duration: '6.1s', delay: '1.6s' },
          { size: 17, x: 54, y: 84, vx: -0.042, vy: -0.045, phase: 5.4, color: '#e11d48', glow: 'rgba(225,29,72,0.58)', animClass: 'rafa-roam-a', duration: '6.7s', delay: '0.9s' },
        ];

  useEffect(() => {
    if (variant !== 'editorial') return;
    const localState = cluster.map((c) => ({ ...c }));
    let rafId: number;

    const tick = () => {
      for (let i = 0; i < localState.length; i++) {
        const item = localState[i];
        item.x += item.vx * 1.8;
        item.y += item.vy * 1.8;
        item.phase += 0.035;

        if (item.x > 95 || item.x < 4) item.vx *= -1;
        if (item.y > 92 || item.y < 6) item.vy *= -1;

        const el = itemRefs.current[i];
        if (el) {
          el.style.left = `${item.x.toFixed(2)}%`;
          el.style.top = `${item.y.toFixed(2)}%`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [variant]);

  // Music variant: subtle local audio wave ribbons instead of bubbles
  if (variant === 'music') {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none opacity-45">
        <div className="absolute -bottom-10 left-0 right-0 h-44 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,212,255,0.16),rgba(236,72,153,0.1)_50%,transparent_80%)]" />
      </div>
    );
  }

  // Rays variant for Galeria: subtle studio prism glow
  if (variant === 'rays') {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none opacity-55">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[conic-gradient(from_140deg_at_50%_0%,rgba(0,212,255,0.16)_0deg,rgba(236,72,153,0.14)_60deg,transparent_120deg)] blur-2xl" />
      </div>
    );
  }

  // Electric variant for Services / Contact: subtle cyber glow
  if (variant === 'electric') {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none opacity-45">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-[#00d4ff]/10 blur-[100px]" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none">
      {cluster.map((b, i) => (
        <span
          key={i}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className={`${b.animClass} absolute rounded-full will-change-transform`}
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.x}%`,
            top: `${b.y}%`,
            opacity: 0.56,
            background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${b.color} 55%, transparent 100%)`,
            boxShadow: `0 0 ${Math.round(b.size * 1.3)}px ${b.glow}, inset 0 0 4px rgba(255,255,255,0.7)`,
            border: `1px solid ${b.color}`,
            animationDuration: b.duration,
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  );
};

