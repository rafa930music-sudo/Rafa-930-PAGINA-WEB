import React, { useState } from 'react';
import { Language } from '../../types';
import {
  ARTIST_IMAGES,
  OFFICIAL_SPOTIFY_URL,
  OFFICIAL_YOUTUBE_URL,
  OFFICIAL_INSTAGRAM_URL,
  OFFICIAL_DEEZER_URL,
  OFFICIAL_APPLE_MUSIC_URL,
  OFFICIAL_AMAZON_MUSIC_URL,
  OFFICIAL_TIDAL_URL,
} from '../../data/content';
import { SectionColorBubbles } from '../AmbientColorBubbles';
import {
  Copy,
  Check,
  QrCode,
  Share2,
  X,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import {
  SpotifyLogo,
  YouTubeLogo,
  DeezerLogo,
  AppleMusicLogo,
  AmazonMusicLogo,
  TidalLogo,
  InstagramLogo,
  TikTokLogo,
  SoundcloudLogo,
  WhatsAppLogo,
} from '../PlatformLogos';

interface RedesScreenProps {
  language: Language;
  onNavigate: (screen: any) => void;
}

export const RedesScreen: React.FC<RedesScreenProps> = ({ language, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [activeColor, setActiveColor] = useState<string | null>(null);

  const content = {
    ca: {
      title: 'Canals Oficials de RAFA 930',
      copyLink: 'Copiar Enllaç',
      copiedText: 'Enllaç copiat!',
      qrCodeBtn: 'Codi QR',
      shareBtn: 'Compartir',
      backToWeb: 'Tornar a la Portada Principal',
      qrTitle: 'Escaneja per connectar amb RAFA 930',
      qrSubtitle: 'Apunta amb la càmera del mòbil per obrir tots els canals oficials',
      close: 'Tancar',
    },
    es: {
      title: 'Canales Oficiales de RAFA 930',
      copyLink: 'Copiar Enlace',
      copiedText: '¡Enlace copiado!',
      qrCodeBtn: 'Código QR',
      shareBtn: 'Compartir',
      backToWeb: 'Volver a la Portada Principal',
      qrTitle: 'Escanea para conectar con RAFA 930',
      qrSubtitle: 'Apunta con la cámara de tu móvil para acceder a todos los canales oficiales',
      close: 'Cerrar',
    },
    en: {
      title: 'Official RAFA 930 Channels',
      copyLink: 'Copy Link',
      copiedText: 'Link copied!',
      qrCodeBtn: 'QR Code',
      shareBtn: 'Share',
      backToWeb: 'Back to Main Home',
      qrTitle: 'Scan to connect with RAFA 930',
      qrSubtitle: 'Point your camera to access all official channels instantly',
      close: 'Close',
    },
  }[language];

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}#redes`
      : 'https://rafa930music-sudo.github.io/Rafa-930-PAGINA-WEB/#redes';

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const input = document.createElement('input');
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const handleShare = async () => {
    const shareText = '🎵 RAFA 930 — Rap consciente, trap melódico y producciones urbanas desde La Mina (08930, Barcelona). Escucha la discografía oficial y conecta en todas las plataformas.';
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RAFA 930 · Sitio Web Oficial',
          text: shareText,
          url: shareUrl,
        });
      } catch {}
    } else {
      handleCopyLink();
    }
  };

  const socialNetworks = [
    {
      id: 'spotify',
      name: 'Spotify',
      handle: 'RAFA 930 · Perfil de Artista Verificado',
      url: OFFICIAL_SPOTIFY_URL,
      Logo: SpotifyLogo,
      color: '#1DB954',
      badge: 'Streaming',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      handle: '@rafa_930 · Canal Oficial de Videoclips',
      url: OFFICIAL_YOUTUBE_URL,
      Logo: YouTubeLogo,
      color: '#FF0000',
      badge: 'Videoclips',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@rafa930_oficial · Novedades y Directos',
      url: OFFICIAL_INSTAGRAM_URL,
      Logo: InstagramLogo,
      color: '#EC4899',
      badge: 'Red Social',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@rafa930_oficial · Contenido Exclusivo',
      url: 'https://www.tiktok.com/@rafa930_oficial',
      Logo: TikTokLogo,
      color: '#a855f7',
      badge: 'Vídeos',
    },
    {
      id: 'apple',
      name: 'Apple Music',
      handle: 'RAFA 930 · Audio Espacial & Catálogo',
      url: OFFICIAL_APPLE_MUSIC_URL,
      Logo: AppleMusicLogo,
      color: '#FA5788',
      badge: 'Apple Music',
    },
    {
      id: 'amazon',
      name: 'Amazon Music',
      handle: 'RAFA 930 · Streaming Oficial',
      url: OFFICIAL_AMAZON_MUSIC_URL,
      Logo: AmazonMusicLogo,
      color: '#FF9900',
      badge: 'Amazon Music',
    },
    {
      id: 'deezer',
      name: 'Deezer',
      handle: 'RAFA 930 · Alta Fidelidad Hi-Fi',
      url: OFFICIAL_DEEZER_URL,
      Logo: DeezerLogo,
      color: '#FFB700',
      badge: 'Deezer Hi-Fi',
    },
    {
      id: 'tidal',
      name: 'Tidal',
      handle: 'RAFA 930 · Master Quality Audio',
      url: OFFICIAL_TIDAL_URL,
      Logo: TidalLogo,
      color: '#00FFFF',
      badge: 'Tidal Master',
    },
    {
      id: 'soundcloud',
      name: 'SoundCloud',
      handle: 'RAFA 930 · Maquetas & Beats',
      url: 'https://soundcloud.com/',
      Logo: SoundcloudLogo,
      color: '#FF5500',
      badge: 'SoundCloud',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Booking',
      handle: 'Atención Directa y Contratación 930',
      url: 'https://wa.me/34600000000?text=Hola%20RAFA%20930,%20quisiera%20informaci%C3%B3n%20sobre%20booking',
      Logo: WhatsAppLogo,
      color: '#25D366',
      badge: 'Contacto Directo',
    },
  ];

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
    shareUrl
  )}&color=00d4ff&bgcolor=050507`;

  return (
    <div className="relative w-full min-h-screen py-8 sm:py-14 overflow-hidden flex flex-col items-center">
      {/* Background image full width 100% */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden select-none z-0">
        <img
          src={ARTIST_IMAGES.heroPortrait}
          alt=""
          className="w-full h-full object-cover object-top filter contrast-125 brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-[#050507]/90 to-[#050507]" />
      </div>

      <SectionColorBubbles variant="editorial" />

      {/* Prominent Single-Column Container */}
      <div className="relative z-10 w-full max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">

        {/* Enlarged Profile Header */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          <div
            className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-[3px] transition-all duration-500 shadow-[0_0_40px_rgba(168,85,247,0.35)]"
            style={{
              background: activeColor
                ? `linear-gradient(135deg, ${activeColor}, #ffffff)`
                : 'linear-gradient(135deg, #a855f7, #c084fc, #ec4899)',
              boxShadow: activeColor
                ? `0 0 45px ${activeColor}90`
                : '0 0 35px rgba(168,85,247,0.35)',
            }}
          >
            <img
              src={ARTIST_IMAGES.heroPortrait}
              alt="RAFA 930"
              className="w-full h-full object-cover object-center rounded-full bg-[#050507]"
              loading="eager"
              decoding="async"
            />
            <div
              className="absolute bottom-0.5 right-0.5 w-7.5 h-7.5 sm:w-9 sm:h-9 rounded-full bg-[#0095F6] text-white border-2 sm:border-3 border-[#050507] flex items-center justify-center shadow-[0_0_16px_rgba(0,149,246,0.7)] text-sm sm:text-base font-black"
              title="Verificado en Meta"
            >
              ✓
            </div>
          </div>

          <div>
            {/* Enlarged Dynamic Typography for RAFA 930 Header */}
            <h1
              className="font-['Bebas_Neue'] text-5xl sm:text-7xl font-extrabold tracking-wider transition-all duration-300"
              style={{
                color: activeColor || '#ffffff',
                textShadow: activeColor
                  ? `0 0 30px ${activeColor}a0`
                  : '0 0 20px rgba(168,85,247,0.35)',
              }}
            >
              RAFA <span style={{ color: activeColor || '#a855f7' }}>930</span>
            </h1>
          </div>

          {/* Enlarged Action Bar */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 pt-1 flex-wrap">
            <button
              type="button"
              onClick={handleCopyLink}
              className={`touch-target-44 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-mono flex items-center gap-2 border transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                  : 'bg-[#111118] border-[#22222e] text-[#a1a1b5] hover:text-white hover:border-[#a855f7]'
              }`}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? content.copiedText : content.copyLink}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="touch-target-44 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-mono bg-[#111118] border border-[#22222e] text-[#a1a1b5] hover:text-white hover:border-[#a855f7] transition-all flex items-center gap-2 cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-[#a855f7]" />
              <span>{content.qrCodeBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="touch-target-44 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-mono bg-[#111118] border border-[#22222e] text-[#a1a1b5] hover:text-white hover:border-[#ec4899] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[#ec4899]" />
              <span>{content.shareBtn}</span>
            </button>
          </div>
        </div>

        {/* Single Column Large Link Stack */}
        <div className="w-full flex flex-col gap-3 sm:gap-3.5">
          {socialNetworks.map((net) => {
            const isSelected = activeColor === net.color;
            return (
              <a
                key={net.id}
                href={net.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveColor(net.color)}
                onMouseLeave={() => setActiveColor(null)}
                onTouchStart={() => setActiveColor(net.color)}
                onTouchEnd={() => setActiveColor(null)}
                className="group w-full h-16 sm:h-20 px-4 sm:px-6 rounded-2xl flex items-center justify-between bg-[#111118]/90 backdrop-blur-md border border-[#22222e] transition-all duration-250 active:scale-[0.98] shadow-lg cursor-pointer"
                style={{
                  borderColor: isSelected ? net.color : undefined,
                  boxShadow: isSelected ? `0 0 28px ${net.color}50` : undefined,
                  backgroundColor: isSelected ? `${net.color}15` : undefined,
                }}
              >
                <div className="flex items-center gap-3.5 sm:gap-4.5 min-w-0">
                  <div
                    className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 group-hover:scale-105"
                    style={{
                      backgroundColor: `${net.color}25`,
                      borderColor: `${net.color}70`,
                      color: net.color,
                    }}
                  >
                    <net.Logo className="w-5 h-5 sm:w-7 sm:h-7 text-white" colored={true} />
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <span
                      className="font-extrabold text-base sm:text-xl text-white transition-colors truncate"
                      style={{ color: isSelected ? net.color : '#ffffff' }}
                    >
                      {net.name}
                    </span>
                    <span
                      className="text-xs sm:text-sm font-mono text-[#a1a1b5] truncate transition-colors mt-0.5"
                      style={{ color: isSelected ? net.color : '#a1a1b5' }}
                    >
                      {net.handle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 ml-2">
                  <span
                    className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-lg border text-white/95 hidden sm:inline-block transition-colors font-semibold"
                    style={{
                      backgroundColor: `${net.color}25`,
                      borderColor: `${net.color}70`,
                    }}
                  >
                    {net.badge}
                  </span>
                  <ArrowUpRight
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#a1a1b5] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: isSelected ? net.color : '#a1a1b5' }}
                  />
                </div>
              </a>
            );
          })}
        </div>

        {/* Back to Home CTA */}
        <div className="relative z-10 pt-2 text-center">
          <button
            type="button"
            onClick={() => onNavigate('revista')}
            className="text-xs font-mono text-[#a1a1b5] hover:text-[#a855f7] transition-colors cursor-pointer"
          >
            ← {content.backToWeb}
          </button>
        </div>

        {/* QR Code Modal */}
        {showQrModal && (
          <div
            className="fixed inset-0 z-50 bg-[#050507]/90 backdrop-blur-xl flex items-center justify-center p-4 select-none"
            role="dialog"
            aria-modal="true"
            onClick={() => setShowQrModal(false)}
          >
            <div
              className="relative max-w-sm w-full bg-[#0a0a0f] border border-[#a855f7]/40 rounded-2xl p-6 text-center space-y-4 shadow-[0_0_50px_rgba(168,85,247,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 touch-target-44 w-9 h-9 rounded-full bg-[#111118] border border-[#22222e] text-[#a1a1b5] hover:text-white flex items-center justify-center cursor-pointer"
                title={content.close}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] mb-1">
                <div className="w-12 h-12 rounded-full bg-[#050507] flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-[#a855f7]" />
                </div>
              </div>

              <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-white tracking-tight">
                {content.qrTitle}
              </h3>

              <p className="text-xs text-[#a1a1b5] leading-relaxed">
                {content.qrSubtitle}
              </p>

              <div className="p-4 bg-[#050507] border border-[#22222e] rounded-xl flex items-center justify-center">
                <img
                  src={qrImageUrl}
                  alt="QR Code RAFA 930"
                  className="w-56 h-56 rounded-lg object-contain"
                  loading="eager"
                />
              </div>

              <div className="text-[11px] font-mono text-[#a855f7] bg-[#111118] py-2 px-3 rounded-lg border border-[#22222e] break-all">
                {shareUrl}
              </div>

              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full py-3 rounded-xl gradient-lila-rosa-rojo text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? content.copiedText : content.copyLink}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
