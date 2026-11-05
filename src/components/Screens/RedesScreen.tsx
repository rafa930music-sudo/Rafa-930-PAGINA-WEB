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

  const content = {
    ca: {
      badge: 'XARXES SOCIALS & CANALS OFICIALS',
      title: 'Canals Oficials de RAFA 930',
      subtitle: 'Tots els perfils verificats, plataformes d’streaming, xarxes socials i canal directe de booking.',
      copyLink: 'Copiar Enllaç de Perfil',
      copiedText: 'Enllaç copiat!',
      qrCodeBtn: 'Codi QR',
      shareBtn: 'Compartir',
      backToWeb: 'Tornar a la Portada Principal',
      qrTitle: 'Escaneja per connectar amb RAFA 930',
      qrSubtitle: 'Apunta amb la càmera del mòbil per obrir tots els canals oficials',
      close: 'Tancar',
    },
    es: {
      badge: 'REDES SOCIALES & CANALES OFICIALES',
      title: 'Canales Oficiales de RAFA 930',
      subtitle: 'Todos los perfiles verificados, plataformas de streaming, redes sociales y canal directo de booking.',
      copyLink: 'Copiar Enlace de Perfil',
      copiedText: '¡Enlace copiado!',
      qrCodeBtn: 'Código QR',
      shareBtn: 'Compartir',
      backToWeb: 'Volver a la Portada Principal',
      qrTitle: 'Escanea para conectar con RAFA 930',
      qrSubtitle: 'Apunta con la cámara de tu móvil para acceder a todos los canales oficiales',
      close: 'Cerrar',
    },
    en: {
      badge: 'OFFICIAL SOCIAL NETWORKS & CHANNELS',
      title: 'Official RAFA 930 Channels',
      subtitle: 'All verified profiles, streaming platforms, social networks, and direct booking channels.',
      copyLink: 'Copy Profile Link',
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
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RAFA 930 · Redes Oficiales',
          text: content.subtitle,
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
      badge: 'Streaming Principal',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      handle: '@rafa_930 · Canal Oficial de Videoclips',
      url: OFFICIAL_YOUTUBE_URL,
      Logo: YouTubeLogo,
      color: '#FF0000',
      badge: 'Videoclips & Audios',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@rafa930_oficial · Novedades y Directos',
      url: OFFICIAL_INSTAGRAM_URL,
      Logo: InstagramLogo,
      color: '#EC4899',
      badge: 'Red Social Oficial',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@rafa930_oficial · Fragmentos & Exclusivos',
      url: 'https://www.tiktok.com/@rafa930_oficial',
      Logo: TikTokLogo,
      color: '#00d4ff',
      badge: 'Contenido Corto',
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
    <div className="relative w-full min-h-screen py-10 sm:py-16 overflow-hidden">
      {/* Background image full width 100% */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden select-none z-0">
        <img
          src={ARTIST_IMAGES.heroPortrait}
          alt=""
          className="w-full h-full object-cover object-top filter contrast-125 brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-[#050507]/85 to-[#050507]" />
      </div>

      <SectionColorBubbles variant="editorial" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-10">

      {/* Profile Header */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#a855f7] via-[#00d4ff] to-[#ec4899] shadow-[0_0_32px_rgba(0,212,255,0.3)]">
          <img
            src={ARTIST_IMAGES.heroPortrait}
            alt="RAFA 930"
            className="w-full h-full object-cover object-center rounded-full bg-[#050507]"
            loading="eager"
            decoding="async"
          />
          <div
            className="absolute bottom-0 right-1 w-7 h-7 rounded-full bg-[#1DB954] text-black border-2 border-[#050507] flex items-center justify-center shadow-lg"
            title="Artista Verificado"
          >
            <span className="text-xs font-black">✓</span>
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#a1a1b5] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            <span className="text-[#00d4ff] font-semibold">{content.badge}</span>
            <span aria-hidden="true" className="text-[#a1a1b5]">·</span>
            <span>08930 · LA MINA</span>
          </div>

          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl font-semibold text-[#ffffff] tracking-tight">
            RAFA <span className="text-gradient-930">930</span>
          </h1>

          <p className="text-xs sm:text-sm font-mono text-[#a855f7] mt-1 uppercase tracking-wider">
            Redes Sociales & Canales Digitales Oficiales
          </p>

          <p className="text-[#a1a1b5] text-sm max-w-md mx-auto mt-2 leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-center gap-2.5 pt-2 flex-wrap">
          <button
            type="button"
            onClick={handleCopyLink}
            className={`touch-target-44 px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.3)]'
                : 'bg-[#111118] border-[#22222e] text-[#a1a1b5] hover:text-white hover:border-[#00d4ff]'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? content.copiedText : content.copyLink}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="touch-target-44 px-4 py-2 rounded-xl text-xs font-mono bg-[#111118] border border-[#22222e] text-[#a1a1b5] hover:text-white hover:border-[#a855f7] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-[#a855f7]" />
            <span>{content.qrCodeBtn}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="touch-target-44 px-4 py-2 rounded-xl text-xs font-mono bg-[#111118] border border-[#22222e] text-[#a1a1b5] hover:text-white hover:border-[#ec4899] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#ec4899]" />
            <span>{content.shareBtn}</span>
          </button>
        </div>
      </div>

      {/* Official Social Media Grid */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-mono uppercase tracking-wider text-[#a1a1b5]">
            {language === 'ca'
              ? 'Tots els Canals Oficials'
              : language === 'es'
              ? 'Todos mis canales oficiales'
              : 'All official channels'}
          </span>
          <span className="text-[11px] font-mono text-[#00d4ff]">{socialNetworks.length} Redes</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {socialNetworks.map((net) => (
            <a
              key={net.id}
              href={net.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center p-4 rounded-xl bg-[#111118]/90 backdrop-blur-md border border-[#22222e] hover:border-[#00d4ff] transition-all duration-300 shadow-md cursor-pointer"
            >
              <div
                className="w-12 h-12 rounded-xl bg-[#0a0a0f] border border-[#22222e] flex items-center justify-center p-2.5 mr-3.5 shrink-0 group-hover:scale-105 transition-transform"
                style={{ color: net.color }}
              >
                <net.Logo className="w-6 h-6 text-white" colored={true} />
              </div>

              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-md border text-white/90"
                    style={{
                      backgroundColor: `${net.color}20`,
                      borderColor: `${net.color}50`,
                    }}
                  >
                    {net.badge}
                  </span>
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-white group-hover:text-[#00d4ff] transition-colors truncate">
                  {net.name}
                </h3>
                <p className="text-xs text-[#a1a1b5] font-mono truncate">
                  {net.handle}
                </p>
              </div>

              <div className="ml-3 shrink-0 text-[#a1a1b5] group-hover:text-[#00d4ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Back to Home CTA */}
      <div className="relative z-10 pt-4 text-center">
        <button
          type="button"
          onClick={() => onNavigate('revista')}
          className="text-xs font-mono text-[#a1a1b5] hover:text-[#00d4ff] transition-colors cursor-pointer"
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
            className="relative max-w-sm w-full bg-[#0a0a0f] border border-[#00d4ff]/40 rounded-2xl p-6 text-center space-y-4 shadow-[0_0_50px_rgba(0,212,255,0.25)]"
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

            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#ec4899] mb-1">
              <div className="w-12 h-12 rounded-full bg-[#050507] flex items-center justify-center">
                <QrCode className="w-6 h-6 text-[#00d4ff]" />
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

            <div className="text-[11px] font-mono text-[#00d4ff] bg-[#111118] py-2 px-3 rounded-lg border border-[#22222e] break-all">
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
