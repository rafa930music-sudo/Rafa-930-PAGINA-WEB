import React, { useEffect, useRef } from 'react';
import { ScreenId, ThemeMode } from '../types';

interface AmbientColorBubblesProps {
  currentScreen?: ScreenId;
  isPlayingMusic?: boolean;
  theme?: ThemeMode;
}

interface GalaxyStar {
  x: number;
  y: number;
  z: number; // 0.15 (deep background) to 1.0 (foreground)
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  hasFlare: boolean;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  life: number;
  maxLife: number;
  color: string;
}

// 180 Astronomical Star Seeds across varied spectral classes (white, ice-blue, pale gold, violet-tinted)
const STAR_PALETTE = ['#ffffff', '#e0f2fe', '#ede9fe', '#fef08a', '#fbcfe8', '#bae6fd'];

function createStarfield(count = 180): GalaxyStar[] {
  const stars: GalaxyStar[] = [];
  for (let i = 0; i < count; i++) {
    const z = 0.15 + Math.random() * 0.85;
    const isMajor = Math.random() < 0.08; // ~8% bright stars with diffraction flares
    stars.push({
      x: Math.random(),
      y: Math.random(),
      z,
      size: isMajor ? 1.8 + Math.random() * 1.4 : 0.6 + Math.random() * 1.3,
      baseAlpha: isMajor ? 0.85 + Math.random() * 0.15 : 0.25 + Math.random() * 0.6,
      twinkleSpeed: 1.2 + Math.random() * 3.2,
      twinklePhase: Math.random() * Math.PI * 2,
      color: STAR_PALETTE[Math.floor(Math.random() * STAR_PALETTE.length)],
      hasFlare: isMajor,
    });
  }
  return stars;
}

export const AmbientColorBubbles: React.FC<AmbientColorBubblesProps> = ({
  currentScreen = 'revista',
  isPlayingMusic = false,
  theme = 'dark',
}) => {
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

  // Global mouse tracking for 3D camera parallax across cosmic layers
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

  // Multi-Scene 3D Canvas Engine (Portada: Galaxy Cosmos · Other screens: Thematic 3D environments)
  useEffect(() => {
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

    // Galaxy Starfield & Meteor Pool for Portada
    const galaxyStars = createStarfield(180);
    const activeMeteors: Meteor[] = [];
    let meteorCooldown = 40;

    // Dust particles for other screen environments
    const dustParticles = Array.from({ length: 48 }, (_, idx) => ({
      x: ((idx * 97) % 100) / 100,
      y: ((idx * 53) % 100) / 100,
      z: 0.2 + ((idx * 31) % 80) / 100,
      r: 1.5 + (idx % 4) * 1.5,
      vx: (idx % 2 === 0 ? 1 : -1) * (0.00018 + (idx % 5) * 0.00006),
      vy: -0.00025 - (idx % 4) * 0.00008,
      color: idx % 3 === 0 ? '#00d4ff' : idx % 3 === 1 ? '#ec4899' : '#a855f7',
      phase: idx * 0.7,
    }));

    let rafId: number;
    let t = 0;

    const renderScene = () => {
      t += 0.016;
      const scr = screenRef.current;
      const isPlaying = playingRef.current;
      const isLight = themeRef.current === 'light';
      const alphaMul = isLight ? 0.65 : 1.0;
      const scrollY = window.scrollY || 0;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, width, height);

      // =======================================================================
      // SCENE 1: PORTADA (REVISTA) -> CINEMATIC 3D GALAXY COSMOS 🌌✨
      // Galactic Core, Deep Space Nebula Clouds, Multi-layer Starfield & Meteors
      // =======================================================================
      if (scr === 'revista') {
        const coreX = width * 0.52 + mx * 35;
        const coreY = height * 0.44 + my * 25 - Math.min(60, scrollY * 0.04);
        const maxDim = Math.max(width, height);

        // 1.1 Galactic Core Spiral Dust Disc (Soft rotating cosmic haze)
        ctx.save();
        ctx.translate(coreX, coreY);
        ctx.rotate(-0.35 + Math.sin(t * 0.08) * 0.04);

        // Galactic Center Nebula (Cosmic Violet & Indigo)
        const coreGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, maxDim * 0.55);
        if (isLight) {
          coreGrad.addColorStop(0, 'rgba(168, 85, 247, 0.16)');
          coreGrad.addColorStop(0.35, 'rgba(99, 102, 241, 0.10)');
          coreGrad.addColorStop(0.65, 'rgba(0, 212, 255, 0.06)');
          coreGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        } else {
          coreGrad.addColorStop(0, 'rgba(168, 85, 247, 0.22)');
          coreGrad.addColorStop(0.32, 'rgba(99, 102, 241, 0.14)');
          coreGrad.addColorStop(0.62, 'rgba(236, 72, 153, 0.08)');
          coreGrad.addColorStop(1, 'rgba(5, 5, 7, 0)');
        }
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.ellipse(0, 0, maxDim * 0.55, maxDim * 0.28, 0, 0, Math.PI * 2);
        ctx.fill();

        // Secondary Starlight Cyan Nebula Arm
        const cyanGrad = ctx.createRadialGradient(maxDim * 0.14, -maxDim * 0.06, 5, maxDim * 0.14, -maxDim * 0.06, maxDim * 0.38);
        cyanGrad.addColorStop(0, isLight ? 'rgba(0, 212, 255, 0.12)' : 'rgba(0, 212, 255, 0.16)');
        cyanGrad.addColorStop(0.55, isLight ? 'rgba(192, 132, 252, 0.06)' : 'rgba(168, 85, 247, 0.08)');
        cyanGrad.addColorStop(1, 'rgba(5, 5, 7, 0)');
        ctx.fillStyle = cyanGrad;
        ctx.beginPath();
        ctx.ellipse(maxDim * 0.14, -maxDim * 0.06, maxDim * 0.38, maxDim * 0.18, 0.25, 0, Math.PI * 2);
        ctx.fill();

        // Tertiary Astral Magenta Core Dust Pocket
        const pinkGrad = ctx.createRadialGradient(-maxDim * 0.16, maxDim * 0.08, 5, -maxDim * 0.16, maxDim * 0.08, maxDim * 0.32);
        pinkGrad.addColorStop(0, isLight ? 'rgba(236, 72, 153, 0.10)' : 'rgba(236, 72, 153, 0.14)');
        pinkGrad.addColorStop(0.6, 'rgba(225, 29, 72, 0)');
        ctx.fillStyle = pinkGrad;
        ctx.beginPath();
        ctx.ellipse(-maxDim * 0.16, maxDim * 0.08, maxDim * 0.32, maxDim * 0.15, -0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // 1.2 Multi-Layer 3D Twinkling Starfield
        for (let i = 0; i < galaxyStars.length; i++) {
          const star = galaxyStars[i];
          const px = star.x * width + mx * (star.z * 48);
          const py =
            ((star.y * height - scrollY * (star.z * 0.15)) % height + height) % height +
            my * (star.z * 36);

          const twinkle = 0.5 + 0.5 * Math.sin(t * star.twinkleSpeed + star.twinklePhase);
          const currentAlpha = star.baseAlpha * twinkle * alphaMul;

          ctx.save();
          ctx.fillStyle = star.color;
          ctx.globalAlpha = Math.max(0.12, Math.min(1, currentAlpha));

          const r = star.size * (0.75 + star.z * 0.45);
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();

          // Delicate 4-Point Diffraction Spike Flare on prominent stars
          if (star.hasFlare && currentAlpha > 0.55) {
            const flareLen = r * 4.5 + 2.5;
            ctx.strokeStyle = star.color;
            ctx.lineWidth = 0.65;
            ctx.globalAlpha = currentAlpha * 0.6;
            ctx.beginPath();
            ctx.moveTo(px - flareLen, py);
            ctx.lineTo(px + flareLen, py);
            ctx.moveTo(px, py - flareLen);
            ctx.lineTo(px, py + flareLen);
            ctx.stroke();

            // Soft star halo
            const haloGrad = ctx.createRadialGradient(px, py, 0, px, py, flareLen * 0.7);
            haloGrad.addColorStop(0, star.color);
            haloGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = haloGrad;
            ctx.globalAlpha = currentAlpha * 0.35;
            ctx.beginPath();
            ctx.arc(px, py, flareLen * 0.7, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }

        // 1.3 Shooting Stars / Meteors (Estrellas Fugaces)
        meteorCooldown--;
        if (meteorCooldown <= 0 && activeMeteors.length < 2) {
          // Spawn new meteor crossing the sky diagonally
          const startX = Math.random() * width * 0.85;
          const startY = Math.random() * height * 0.4;
          const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.35; // ~45 deg down-right
          activeMeteors.push({
            x: startX,
            y: startY,
            length: 100 + Math.random() * 90,
            speed: 15 + Math.random() * 9,
            angle,
            life: 0,
            maxLife: 32 + Math.floor(Math.random() * 20),
            color: Math.random() < 0.6 ? '#ffffff' : Math.random() < 0.5 ? '#00d4ff' : '#f472b6',
          });
          meteorCooldown = 180 + Math.floor(Math.random() * 180); // Spawn every 3-6 seconds
        }

        for (let m = activeMeteors.length - 1; m >= 0; m--) {
          const meteor = activeMeteors[m];
          meteor.life++;
          meteor.x += Math.cos(meteor.angle) * meteor.speed;
          meteor.y += Math.sin(meteor.angle) * meteor.speed;

          const progress = meteor.life / meteor.maxLife;
          const meteorAlpha = (progress < 0.25 ? progress / 0.25 : 1 - (progress - 0.25) / 0.75) * alphaMul;

          if (progress >= 1 || meteor.x > width + 100 || meteor.y > height + 100) {
            activeMeteors.splice(m, 1);
            continue;
          }

          const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
          const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

          const lineGrad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
          lineGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          lineGrad.addColorStop(0.7, meteor.color === '#ffffff' ? 'rgba(0, 212, 255, 0.45)' : meteor.color);
          lineGrad.addColorStop(1, '#ffffff');

          ctx.save();
          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 1.6;
          ctx.globalAlpha = meteorAlpha;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(meteor.x, meteor.y);
          ctx.stroke();

          // Blazing star head
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = meteor.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(meteor.x, meteor.y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // =======================================================================
      // SCENE 2: DISCOGRAFÍA -> PURE 3D SONIC OCEAN MESH
      // =======================================================================
      else if (scr === 'discografia') {
        const boost = isPlaying ? 1.55 : 1.0;
        const speed = isPlaying ? t * 1.65 : t * 0.92;

        const vanishX = width * 0.5 + mx * 75;
        const horizonY = height * 0.34 + my * 28 - Math.min(80, scrollY * 0.05);

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

        const rows = 30;
        const cols = 46;
        const fov = 420;
        const camHeight = 165 + my * 22;
        const zNear = 85;
        const zFar = 1250;

        const grid: { px: number; py: number; elev: number; depth: number }[][] = [];

        for (let r = 0; r < rows; r++) {
          const depth = r / (rows - 1);
          const z = zFar - Math.pow(depth, 0.72) * (zFar - zNear);
          const scale = fov / (fov + z);

          const rowPoints: { px: number; py: number; elev: number; depth: number }[] = [];
          const worldWidth = width * 2.9;

          for (let c = 0; c <= cols; c++) {
            const u = (c / cols) * 2 - 1;
            const worldX = u * (worldWidth * 0.5);

            const w1 = Math.sin(c * 0.32 + speed * 1.4 + depth * 5.2) * 24 * boost;
            const w2 = Math.cos(depth * 7.5 - speed * 1.1) * 16 * boost;
            const w3 = Math.sin(c * 0.16 - depth * 3.8 + speed * 0.8) * 14 * boost;
            const elev = (w1 + w2 + w3) * (0.3 + depth * 0.95);

            const px = vanishX + worldX * scale;
            const py = horizonY + (camHeight - elev) * scale;
            rowPoints.push({ px, py, elev, depth });
          }
          grid.push(rowPoints);
        }

        // Longitudinal wave ridges
        for (let r = 0; r < rows; r++) {
          const d = r / (rows - 1);
          const strokeA = (0.04 + d * 0.36) * alphaMul;
          ctx.strokeStyle =
            r % 3 === 0
              ? `rgba(0, 212, 255, ${strokeA})`
              : r % 3 === 1
              ? `rgba(168, 85, 247, ${strokeA * 0.85})`
              : `rgba(236, 72, 153, ${strokeA * 0.75})`;
          ctx.lineWidth = 0.7 + d * 1.5;

          ctx.beginPath();
          for (let c = 0; c <= cols; c++) {
            const pt = grid[r][c];
            if (c === 0) ctx.moveTo(pt.px, pt.py);
            else ctx.lineTo(pt.px, pt.py);
          }
          ctx.stroke();
        }
      }

      // =======================================================================
      // SCENE 3: GALERIA -> 3D VOLUMETRIC STUDIO LIGHT BEAMS & PRISM FLARES
      // =======================================================================
      else if (scr === 'galeria') {
        const sourceX = width * 0.82 + mx * 55;
        const sourceY = -40 + my * 25;

        for (let i = 0; i < 7; i++) {
          const beamPhase = t * 0.35 + i * 0.85;
          const beamWidth = width * (0.35 + Math.sin(beamPhase) * 0.14);
          const targetX = width * 0.15 + i * (width * 0.14) + Math.sin(beamPhase) * 45;

          const beamGrad = ctx.createLinearGradient(sourceX, sourceY, targetX, height + 80);
          const beamAlpha = (0.06 + Math.sin(beamPhase * 1.2) * 0.035) * alphaMul;

          if (i % 2 === 0) {
            beamGrad.addColorStop(0, `rgba(0, 212, 255, ${beamAlpha * 1.5})`);
            beamGrad.addColorStop(0.45, `rgba(168, 85, 247, ${beamAlpha * 0.8})`);
            beamGrad.addColorStop(1, 'rgba(5, 5, 7, 0)');
          } else {
            beamGrad.addColorStop(0, `rgba(236, 72, 153, ${beamAlpha * 1.3})`);
            beamGrad.addColorStop(0.5, `rgba(0, 212, 255, ${beamAlpha * 0.7})`);
            beamGrad.addColorStop(1, 'rgba(5, 5, 7, 0)');
          }

          ctx.fillStyle = beamGrad;
          ctx.beginPath();
          ctx.moveTo(sourceX - 25, sourceY);
          ctx.lineTo(sourceX + 25, sourceY);
          ctx.lineTo(targetX + beamWidth * 0.5, height + 80);
          ctx.lineTo(targetX - beamWidth * 0.5, height + 80);
          ctx.closePath();
          ctx.fill();
        }
      }

      // =======================================================================
      // SCENE 4: SERVEIS -> 3D DUAL-PLANE CYBER-GRID
      // =======================================================================
      else if (scr === 'serveis') {
        const vanishX = width * 0.5 + mx * 65;
        const horizonY = height * 0.5 + my * 35;

        const grad = ctx.createRadialGradient(
          vanishX,
          horizonY,
          5,
          vanishX,
          horizonY,
          Math.max(width, height) * 0.65
        );
        grad.addColorStop(0, `rgba(0, 212, 255, ${0.16 * alphaMul})`);
        grad.addColorStop(0.4, `rgba(168, 85, 247, ${0.11 * alphaMul})`);
        grad.addColorStop(1, 'rgba(5, 5, 7, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        const lines = 18;
        for (let i = -lines; i <= lines; i++) {
          const xFactor = i / lines;
          const botX = vanishX + xFactor * width * 1.7;
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.14 * alphaMul})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(vanishX, horizonY);
          ctx.lineTo(botX, height + 50);
          ctx.stroke();
        }

        const rings = 14;
        const gridSpeed = (t * 0.45) % 1;
        for (let r = 1; r <= rings; r++) {
          const depth = (r + gridSpeed) / rings;
          const y = horizonY + Math.pow(depth, 1.8) * (height - horizonY + 50);
          const spread = Math.pow(depth, 1.8) * width * 1.7;
          ctx.strokeStyle = `rgba(0, 212, 255, ${(depth * 0.22) * alphaMul})`;
          ctx.lineWidth = 0.6 + depth * 1.2;
          ctx.beginPath();
          ctx.moveTo(vanishX - spread, y);
          ctx.lineTo(vanishX + spread, y);
          ctx.stroke();
        }
      }

      // =======================================================================
      // SCENE 5: PRESSKIT -> 3D STAGE ARENA CONCERT LASER CONES
      // =======================================================================
      else if (scr === 'presskit') {
        const stageX = width * 0.5 + mx * 45;
        const stageY = height + 30;

        for (let i = 0; i < 8; i++) {
          const sweep = Math.sin(t * 0.8 + i * 0.75) * (width * 0.48);
          const targetX = width * 0.5 + sweep + (i - 3.5) * 60;
          const targetY = -40;

          const laserGrad = ctx.createLinearGradient(stageX, stageY, targetX, targetY);
          const laserA = (0.16 + Math.sin(t * 1.5 + i) * 0.08) * alphaMul;
          laserGrad.addColorStop(0, `rgba(236, 72, 153, ${laserA * 1.6})`);
          laserGrad.addColorStop(0.6, `rgba(0, 212, 255, ${laserA * 0.9})`);
          laserGrad.addColorStop(1, 'rgba(5, 5, 7, 0)');

          ctx.strokeStyle = laserGrad;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(stageX + (i - 3.5) * 18, stageY);
          ctx.lineTo(targetX, targetY);
          ctx.stroke();
        }
      }

      // =======================================================================
      // SCENE 6: CONTACTE -> 3D RADAR SPHERE & CONSTELLATION NODES
      // =======================================================================
      else if (scr === 'contacte') {
        const radarX = width * 0.26 + mx * 45;
        const radarY = height * 0.46 + my * 35;

        for (let i = 0; i < 6; i++) {
          const prog = (t * 0.22 + i / 6) % 1;
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
      }

      // =======================================================================
      // SCENE 7: LEGAL -> 3D GYROSCOPIC ARCHIVAL SEAL RINGS
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
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block will-change-transform"
      />
    </div>
  );
};

export const SectionColorBubbles: React.FC<{
  variant?: 'music' | 'editorial' | 'electric' | 'rays';
}> = ({ variant = 'editorial' }) => {
  if (variant === 'music') {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none opacity-45">
        <div className="absolute -bottom-10 left-0 right-0 h-44 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,212,255,0.16),rgba(236,72,153,0.1)_50%,transparent_80%)]" />
      </div>
    );
  }

  if (variant === 'rays') {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none opacity-55">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[conic-gradient(from_140deg_at_50%_0%,rgba(0,212,255,0.16)_0deg,rgba(236,72,153,0.14)_60deg,transparent_120deg)] blur-2xl" />
      </div>
    );
  }

  if (variant === 'electric') {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none opacity-45">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-[#00d4ff]/10 blur-[100px]" />
      </div>
    );
  }

  // Pure Galactic Dust Shimmer (No toy balls)
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none opacity-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.12),rgba(0,212,255,0.06)_40%,transparent_75%)]" />
    </div>
  );
};
