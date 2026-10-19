import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import {
  Globe,
  Terminal,
  Play,
  Share2,
  Check,
  ArrowUpRight,
  Download,
  ExternalLink,
  Volume2,
} from 'lucide-react';
import {
  SpotifyLogo,
  YouTubeLogo,
  DeezerLogo,
  AppleMusicLogo,
  AmazonMusicLogo,
  TidalLogo,
  InstagramLogo,
} from './PlatformLogos';

export interface LinktreeItem {
  id: string;
  label: string;
  sub?: string;
  url: string;
  highlight?: boolean;
  icon: React.FC<{ className?: string }>;
}

const PORTRAIT_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBiB5ndFO8BKZk16GSPdBRO6I4fqt3tcLuOZolfcdsWzR3wA5wBTpmdzXs41uwoExtegnt12b6_BoB1uy-SPZXQC1ROa-81zxV7Y_gsXQHFKNRSiyZszuVbDNqndxbfMJKhwifawiB8O16QJVZjZlXabHQh90wezknMFuxvqiA-rm3pfAMv73L8OKBvkjDGaIk9eWL8XFDczqF4YdTAIbXwCQ8RFiDA96uV2Aq7RehzV6ExpB0NSAVDDuVdG3h0ZG4Z6Q';

export const DE_VUELTA_YOUTUBE_URL = 'https://youtu.be/RVuiWbT_mNk';
export const DE_VUELTA_VIDEO_ID = 'RVuiWbT_mNk';

export const RAFA_LINKTREE_ITEMS: LinktreeItem[] = [
  {
    id: 'web',
    label: 'Web Oficial',
    sub: 'RAFA 930',
    url: 'https://rafa930music-sudo.github.io/Rafa-930-PAGINA-WEB/',
    highlight: true,
    icon: Globe,
  },
  {
    id: 'spotify',
    label: 'Spotify',
    sub: 'RAFA 930',
    url: 'https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng',
    icon: SpotifyLogo,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    sub: '@rafa_930',
    url: 'https://youtube.com/@rafa_930',
    icon: YouTubeLogo,
  },
  {
    id: 'deezer',
    label: 'Deezer',
    sub: 'RAFA 930',
    url: 'https://www.deezer.com/mx/artist/224265995',
    icon: DeezerLogo,
  },
  {
    id: 'apple',
    label: 'Apple Music',
    sub: 'RAFA 930',
    url: 'https://music.apple.com/es/artist/rafa-930/1724193275',
    icon: AppleMusicLogo,
  },
  {
    id: 'amazon',
    label: 'Amazon Music',
    sub: 'RAFA 930',
    url: 'https://music.amazon.in/artists/B0CJM7BWF1/rafa-930',
    icon: AmazonMusicLogo,
  },
  {
    id: 'tidal',
    label: 'Tidal',
    sub: 'RAFA 930',
    url: 'https://tidal.com/artist/41128230',
    icon: TidalLogo,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    sub: '@rafa930_oficial',
    url: 'https://instagram.com/rafa930_oficial',
    icon: InstagramLogo,
  },
  {
    id: '930-digital',
    label: '930 Digital',
    sub: 'Estudio Web',
    url: 'https://rafa930music-sudo.github.io/930-Digital/',
    icon: Terminal,
  },
];

interface SocialLinksProps {
  language?: Language;
  showDownloadButtons?: boolean;
  onClose?: () => void;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  showDownloadButtons = true,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [splashExiting, setSplashExiting] = useState(false);
  const [playVideoInline, setPlayVideoInline] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setSplashExiting(true);
    }, 1500);

    const completeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2050);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  // Interactive 3D Galaxy Cosmos Canvas (Starfield, Nebula Clouds & Shooting Stars)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const starPalette = ['#ffffff', '#e0f2fe', '#ede9fe', '#fef08a', '#fbcfe8'];
    const stars = Array.from({ length: 140 }, () => {
      const z = 0.15 + Math.random() * 0.85;
      const isMajor = Math.random() < 0.09;
      return {
        x: Math.random(),
        y: Math.random(),
        z,
        r: isMajor ? 1.8 + Math.random() * 1.2 : 0.6 + Math.random() * 1.2,
        baseAlpha: isMajor ? 0.85 + Math.random() * 0.15 : 0.25 + Math.random() * 0.6,
        twinkleSpeed: 1.2 + Math.random() * 3.0,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starPalette[Math.floor(Math.random() * starPalette.length)],
        hasFlare: isMajor,
      };
    });

    const meteors: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      life: number;
      maxLife: number;
      color: string;
    }> = [];
    let meteorCooldown = 30;

    let tick = 0;
    const render = () => {
      tick += 0.016;
      ctx.clearRect(0, 0, width, height);

      const maxDim = Math.max(width, height);
      const coreX = width * 0.5;
      const coreY = height * 0.42;

      // 1. Cosmic Galactic Nebula Core
      ctx.save();
      ctx.translate(coreX, coreY);
      ctx.rotate(-0.35 + Math.sin(tick * 0.06) * 0.03);

      const coreGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, maxDim * 0.6);
      coreGrad.addColorStop(0, 'rgba(168, 85, 247, 0.22)');
      coreGrad.addColorStop(0.35, 'rgba(99, 102, 241, 0.14)');
      coreGrad.addColorStop(0.65, 'rgba(236, 72, 153, 0.08)');
      coreGrad.addColorStop(1, 'rgba(5, 5, 7, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, maxDim * 0.6, maxDim * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();

      const cyanGrad = ctx.createRadialGradient(maxDim * 0.15, -maxDim * 0.08, 5, maxDim * 0.15, -maxDim * 0.08, maxDim * 0.4);
      cyanGrad.addColorStop(0, 'rgba(0, 212, 255, 0.16)');
      cyanGrad.addColorStop(0.55, 'rgba(168, 85, 247, 0.07)');
      cyanGrad.addColorStop(1, 'rgba(5, 5, 7, 0)');
      ctx.fillStyle = cyanGrad;
      ctx.beginPath();
      ctx.ellipse(maxDim * 0.15, -maxDim * 0.08, maxDim * 0.4, maxDim * 0.2, 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Multi-Layer Starfield
      for (const s of stars) {
        const px = s.x * width;
        const py = s.y * height;
        const twinkle = 0.5 + 0.5 * Math.sin(tick * s.twinkleSpeed + s.twinklePhase);
        const alpha = s.baseAlpha * twinkle;

        ctx.save();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0.12, Math.min(1, alpha));
        ctx.beginPath();
        ctx.arc(px, py, s.r * (0.8 + s.z * 0.4), 0, Math.PI * 2);
        ctx.fill();

        if (s.hasFlare && alpha > 0.6) {
          const flareLen = s.r * 4.5 + 2;
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.65;
          ctx.globalAlpha = alpha * 0.6;
          ctx.beginPath();
          ctx.moveTo(px - flareLen, py);
          ctx.lineTo(px + flareLen, py);
          ctx.moveTo(px, py - flareLen);
          ctx.lineTo(px, py + flareLen);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 3. Shooting Stars / Meteors
      meteorCooldown--;
      if (meteorCooldown <= 0 && meteors.length < 2) {
        meteors.push({
          x: Math.random() * width * 0.9,
          y: Math.random() * height * 0.35,
          length: 90 + Math.random() * 80,
          speed: 15 + Math.random() * 8,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.35,
          life: 0,
          maxLife: 32 + Math.floor(Math.random() * 18),
          color: Math.random() < 0.6 ? '#ffffff' : Math.random() < 0.5 ? '#00d4ff' : '#f472b6',
        });
        meteorCooldown = 160 + Math.floor(Math.random() * 180);
      }

      for (let m = meteors.length - 1; m >= 0; m--) {
        const meteor = meteors[m];
        meteor.life++;
        meteor.x += Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;

        const progress = meteor.life / meteor.maxLife;
        const alpha = progress < 0.25 ? progress / 0.25 : 1 - (progress - 0.25) / 0.75;

        if (progress >= 1 || meteor.x > width + 100 || meteor.y > height + 100) {
          meteors.splice(m, 1);
          continue;
        }

        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

        const lineGrad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
        lineGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        lineGrad.addColorStop(0.75, meteor.color === '#ffffff' ? 'rgba(0, 212, 255, 0.45)' : meteor.color);
        lineGrad.addColorStop(1, '#ffffff');

        ctx.save();
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(meteor.x, meteor.y);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = meteor.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDismissSplash = () => {
    if (splashExiting) return;
    setSplashExiting(true);
    setTimeout(() => {
      setShowSplash(false);
    }, 450);
  };

  const handleShare = async () => {
    const shareUrl = 'https://rafa930music-sudo.github.io/Rafa-930-PAGINA-WEB/links.html';
    if (navigator.share) {
      try {
        await navigator.share({ title: 'RAFA 930', url: shareUrl });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="relative w-full min-h-[100dvh] bg-[#050507] flex flex-col items-center justify-between px-4 sm:px-6 py-6 sm:py-8 text-[#ffffff] select-none overflow-x-hidden">
      {/* Interactive 3D Canvas Background */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 w-full h-full z-0"
      />

      {/* Top Neon Line */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#a855f7] via-[#00d4ff] to-[#ec4899] shadow-[0_0_14px_rgba(0,212,255,0.75)] z-[110]"
      />

      {/* Fullscreen Splash Screen with Signature Emblem */}
      {showSplash && (
        <div
          role="dialog"
          aria-label="Firma Oficial RAFA 930"
          onClick={handleDismissSplash}
          className={`fixed inset-0 z-[105] bg-[#050507] flex items-center justify-center p-6 select-none cursor-pointer overflow-hidden transition-all duration-500 ${
            splashExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          <div className="pointer-events-none absolute -top-28 left-1/4 w-[26rem] h-[26rem] rounded-full bg-[#a855f7]/22 blur-[140px]" />
          <div className="pointer-events-none absolute top-1/2 right-1/4 w-[24rem] h-[24rem] rounded-full bg-[#ec4899]/20 blur-[140px]" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 w-[22rem] h-[22rem] rounded-full bg-[#e11d48]/18 blur-[130px]" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] rounded-full bg-[#00d4ff]/14 blur-[125px]" />

          <div className="relative z-10 w-full max-w-sm flex flex-col items-center justify-center">
            {/* Signature Emblem Frame */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-[#00d4ff]/25 shadow-[0_0_25px_rgba(0,212,255,0.15)] animate-[spin_24s_linear_infinite]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-3 rounded-full border border-[#ec4899]/20 shadow-[inset_0_0_30px_rgba(236,72,153,0.08)]"
              />
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#ec4899] shadow-[0_0_8px_#ec4899]" />
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#a855f7] shadow-[0_0_8px_#a855f7]" />
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />

              <svg
                className="w-56 h-44 relative z-10 drop-shadow-[0_0_18px_rgba(0,212,255,0.4)]"
                viewBox="0 0 320 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="sigGradLinks" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="50%" stopColor="#00d4ff" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
                <path
                  d="M 35 125 C 42 75, 55 42, 68 38 C 82 34, 102 42, 106 62 C 109 78, 96 98, 72 104 C 55 108, 48 118, 44 148 M 68 104 C 85 106, 100 128, 114 154"
                  stroke="url(#sigGradLinks)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ strokeDasharray: 380, strokeDashoffset: 0, animation: 'sigDraw 1.4s cubic-bezier(0.25, 1, 0.5, 1) forwards' }}
                />
                <path
                  d="M 112 142 C 118 132, 126 122, 136 122 C 146 122, 144 135, 140 144 C 136 150, 126 150, 124 142 C 122 134, 132 126, 144 126 C 150 126, 158 136, 160 148 M 158 142 C 166 112, 172 82, 174 74 C 176 66, 168 68, 164 78 C 158 96, 154 138, 152 170 M 150 134 C 158 132, 174 132, 180 144 C 184 152, 180 162, 172 162 C 166 162, 164 152, 172 142 C 178 134, 188 126, 196 126 C 204 126, 206 138, 204 148"
                  stroke="url(#sigGradLinks)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ strokeDasharray: 420, strokeDashoffset: 0, animation: 'sigDraw 1.5s cubic-bezier(0.25, 1, 0.5, 1) 0.15s forwards' }}
                />
                <path
                  d="M 204 144 C 218 138, 234 115, 244 115 C 254 115, 252 130, 244 138 C 236 144, 226 136, 232 124 C 238 114, 252 112, 256 128 C 258 142, 252 165, 246 178 M 256 124 C 266 120, 276 120, 278 132 C 280 140, 270 146, 264 146 C 274 146, 282 152, 280 164 C 278 174, 264 176, 254 172 M 282 142 C 288 134, 298 128, 304 134 C 310 142, 308 158, 302 166 C 294 174, 284 168, 286 154 C 288 142, 298 132, 306 136"
                  stroke="url(#sigGradLinks)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ strokeDasharray: 450, strokeDashoffset: 0, animation: 'sigDraw 1.6s cubic-bezier(0.25, 1, 0.5, 1) 0.3s forwards' }}
                />
                <path
                  d="M 52 178 C 110 170, 195 166, 295 178 C 305 179, 298 186, 275 192 C 210 206, 120 198, 85 188"
                  stroke="url(#sigGradLinks)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  style={{ strokeDasharray: 320, strokeDashoffset: 0, animation: 'sigDraw 1.4s cubic-bezier(0.25, 1, 0.5, 1) 0.5s forwards' }}
                />
              </svg>
            </div>

            <div className="mt-3 text-center">
              <p
                className="text-2xl text-white font-normal drop-shadow-[0_0_12px_rgba(0,212,255,0.45)]"
                style={{ fontFamily: "'Alex Brush', 'Caveat', cursive" }}
              >
                Rafa 930
              </p>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#00d4ff]/80">
                Firma Oficial
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Animated Ambient Cosmic Nebula */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-24 -left-20 w-80 h-80 rounded-full bg-[#a855f7]/15 blur-[120px] galaxy-breathe"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-1/3 -right-20 w-80 h-80 rounded-full bg-[#ec4899]/14 blur-[120px] galaxy-breathe"
        style={{ animationDelay: '3s' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -bottom-24 left-1/4 w-72 h-72 rounded-full bg-[#00d4ff]/12 blur-[120px] galaxy-breathe"
        style={{ animationDelay: '5s' }}
      />

      {/* Top Bar */}
      <div className="relative z-10 w-full max-w-[410px] flex items-center justify-between">
        <button
          type="button"
          onClick={handleShare}
          aria-label="Compartir"
          className="w-10 h-10 rounded-xl bg-[#111118]/85 backdrop-blur-md border border-[#22222e] hover:border-[#00d4ff] flex items-center justify-center text-white transition-all cursor-pointer"
        >
          {copied ? (
            <Check className="w-4 h-4 text-[#00d4ff]" />
          ) : (
            <Share2 className="w-4 h-4 text-[#a1a1b5]" />
          )}
        </button>

        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="w-10 h-10 rounded-xl bg-[#111118]/85 backdrop-blur-md border border-[#22222e] hover:border-[#ec4899] flex items-center justify-center text-[#a1a1b5] hover:text-white transition-all cursor-pointer"
          >
            ✕
          </button>
        ) : (
          <span className="px-2.5 py-1 rounded-full bg-[#111118]/80 border border-[#00d4ff]/35 text-[10px] font-mono text-[#00d4ff]">
            08930 · BCN
          </span>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[410px] flex flex-col items-center my-auto py-4">
        {/* Avatar with animated neon ring */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[2.5px] bg-gradient-to-tr from-[#a855f7] via-[#00d4ff] to-[#ec4899] shadow-[0_0_32px_rgba(0,212,255,0.28)] mb-3.5">
          <img
            src={PORTRAIT_URL}
            alt="RAFA 930"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top rounded-full border-2 border-[#050507]"
          />
          <span className="absolute bottom-0.5 right-0.5 w-6 h-6 rounded-full bg-[#00d4ff] text-[#050507] font-bold text-xs flex items-center justify-center border-2 border-[#050507] shadow-[0_0_10px_#00d4ff]">
            ✓
          </span>
        </div>

        <h1 className="font-['Bebas_Neue'] text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          RAFA <span className="text-gradient-930">930</span>
        </h1>

        <p className="text-xs font-mono text-[#a1a1b5] mt-1">
          Música · Fotos · Web
        </p>

        {/* Featured Video Card — DE VUELTA (https://youtu.be/RVuiWbT_mNk) */}
        <div className="w-full mt-5 rounded-2xl bg-[#111118]/90 backdrop-blur-xl border border-[#00d4ff]/45 shadow-[0_0_28px_rgba(0,212,255,0.16)] overflow-hidden">
          {playVideoInline ? (
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${DE_VUELTA_VIDEO_ID}?autoplay=1&rel=0`}
                title="RAFA 930 - De Vuelta"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPlayVideoInline(true)}
              className="group relative aspect-video w-full bg-[#0a0a0f] overflow-hidden block cursor-pointer"
            >
              <img
                src={`https://i.ytimg.com/vi/${DE_VUELTA_VIDEO_ID}/hqdefault.jpg`}
                alt="RAFA 930 - De Vuelta"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/30 to-transparent" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#ec4899] text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <Volume2 className="w-3 h-3" />
                <span>NUEVO TEMA · DE VUELTA</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full gradient-lila-rosa-rojo text-white flex items-center justify-center shadow-[0_0_28px_rgba(236,72,153,0.75)] group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>
            </button>
          )}

          <div className="px-4 py-3 flex items-center justify-between gap-2 bg-[#111118]">
            <div className="text-left">
              <div className="text-sm font-bold text-white leading-tight">De Vuelta</div>
              <div className="text-[11px] font-mono text-[#00d4ff]">RAFA 930 · 2026</div>
            </div>
            <a
              href={DE_VUELTA_YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg gradient-lila-rosa-rojo text-white text-xs font-semibold inline-flex items-center gap-1.5 hover:opacity-95 transition-opacity"
            >
              <span>Abrir en YouTube</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Short-Named Linktree Buttons */}
        <div className="w-full flex flex-col gap-2.5 mt-4">
          {RAFA_LINKTREE_ITEMS.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group w-full h-14 px-4 rounded-xl flex items-center justify-between transition-all duration-200 active:scale-[0.98] backdrop-blur-md ${
                  item.highlight
                    ? 'gradient-lila-rosa-rojo text-white shadow-[0_6px_22px_rgba(236,72,153,0.38)] hover:opacity-95'
                    : 'bg-[#111118]/85 border border-[#22222e] hover:border-[#00d4ff] text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      item.highlight
                        ? 'bg-black/25 text-white'
                        : 'bg-[#050507] border border-[#22222e] text-[#00d4ff] group-hover:text-[#ec4899]'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm tracking-tight">{item.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.sub && (
                    <span
                      className={`text-[11px] font-mono ${
                        item.highlight ? 'text-white/85' : 'text-[#a1a1b5]'
                      }`}
                    >
                      {item.sub}
                    </span>
                  )}
                  <ArrowUpRight
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      item.highlight ? 'text-white' : 'text-[#a1a1b5] group-hover:text-[#00d4ff]'
                    }`}
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full max-w-[410px] pt-3 border-t border-[#22222e] flex flex-col items-center gap-2">
        {showDownloadButtons && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <a
              href="./links.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#111118] border border-[#ec4899]/50 hover:border-[#ec4899] text-[11px] font-mono text-[#f472b6] hover:text-white transition-colors"
            >
              <span>Ver HTML completo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="./links.html"
              download="RAFA-930-Links.html"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#111118] border border-[#00d4ff]/40 hover:border-[#00d4ff] text-[11px] font-mono text-[#00d4ff] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar HTML</span>
            </a>
          </div>
        )}
        <span className="text-[10px] font-mono text-[#a1a1b5]/60">RAFA 930</span>
      </div>
    </div>
  );
};

export default SocialLinks;
