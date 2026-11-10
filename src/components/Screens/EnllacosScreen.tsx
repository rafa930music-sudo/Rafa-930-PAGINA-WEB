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
  ArrowUpRight,
  Sparkles,
  Copy,
  Check,
  QrCode,
  Share2,
  X,
  Play,
  ExternalLink,
} from 'lucide-react';

import {
  SpotifyLogo,
  YouTubeLogo,
  DeezerLogo,
  AppleMusicLogo,
  AmazonMusicLogo,
  TidalLogo,
  InstagramLogo,
} from '../PlatformLogos';

interface EnllacosScreenProps {
  language: Language;
  onSelectScreen: (screen: any) => void;
}

export const EnllacosScreen: React.FC<EnllacosScreenProps> = ({ language, onSelectScreen }) => {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeColor, setActiveColor] = useState<string | null>(null);

  const content = {
    ca: {
      title: 'Plataformes & Música',
      copyLink: 'Copiar Enllaç',
      copiedText: 'Enllaç copiat!',
      qrCodeBtn: 'Codi QR',
      shareBtn: 'Compartir',
      backToWeb: 'Tornar a la Portada Principal',
      qrTitle: 'Escaneja per connectar amb RAFA 930',
      qrSubtitle: 'Apunta amb la càmera del mòbil per obrir tots els enllaços oficials',
      close: 'Tancar',
      featuredBadge: 'NOU TEMA DESTACAT 2026',
      featuredTitle: 'De Vuelta',
      featuredSub: 'RAFA 930 · Producció Oficial (2026)',
      listenYouTube: 'Escoltar a YouTube',
      spotifyProfile: 'Spotify',
      spotifySub: 'RAFA 930 · Perfil Verificat',
      youtubeChannel: 'YouTube',
      youtubeSub: '@rafa_930 · Canal Oficial',
      deezerProfile: 'Deezer Music',
      deezerSub: 'RAFA 930 · Alta Fidelitat',
      appleProfile: 'Apple Music',
      appleSub: 'RAFA 930 · Audio Espacial',
      amazonProfile: 'Amazon Music',
      amazonSub: 'RAFA 930 · Streaming Oficial',
      tidalProfile: 'Tidal',
      tidalSub: 'RAFA 930 · Master Quality Audio',
      instagram: 'Instagram Oficial',
      instagramSub: '@rafa930_oficial · Directes i novetats',
    },
    es: {
      title: 'Plataformas & Música',
      copyLink: 'Copiar Enlace',
      copiedText: '¡Enlace copiado!',
      qrCodeBtn: 'Código QR',
      shareBtn: 'Compartir',
      backToWeb: 'Volver a la Portada Principal',
      qrTitle: 'Escanea para conectar con RAFA 930',
      qrSubtitle: 'Apunta con la cámara de tu móvil para abrir todos los enlaces oficiales',
      close: 'Cerrar',
      featuredBadge: 'NUEVO TEMA DESTACADO 2026',
      featuredTitle: 'De Vuelta',
      featuredSub: 'RAFA 930 · Producción Oficial (2026)',
      listenYouTube: 'Escuchar en YouTube',
      spotifyProfile: 'Spotify',
      spotifySub: 'RAFA 930 · Perfil Verificado',
      youtubeChannel: 'YouTube',
      youtubeSub: '@rafa_930 · Canal Oficial',
      deezerProfile: 'Deezer Music',
      deezerSub: 'RAFA 930 · Alta Fidelidad',
      appleProfile: 'Apple Music',
      appleSub: 'RAFA 930 · Audio Espacial',
      amazonProfile: 'Amazon Music',
      amazonSub: 'RAFA 930 · Streaming Oficial',
      tidalProfile: 'Tidal',
      tidalSub: 'RAFA 930 · Master Quality Audio',
      instagram: 'Instagram Oficial',
      instagramSub: '@rafa930_oficial · Directos y novedades',
    },
    en: {
      title: 'Platforms & Music',
      copyLink: 'Copy Link',
      copiedText: 'Link copied!',
      qrCodeBtn: 'QR Code',
      shareBtn: 'Share',
      backToWeb: 'Back to Main Home',
      qrTitle: 'Scan to connect with RAFA 930',
      qrSubtitle: 'Point your phone camera to access all official links instantly',
      close: 'Close',
      featuredBadge: 'NEW FEATURED SINGLE 2026',
      featuredTitle: 'De Vuelta',
      featuredSub: 'RAFA 930 · Official Production (2026)',
      listenYouTube: 'Listen on YouTube',
      spotifyProfile: 'Spotify',
      spotifySub: 'RAFA 930 · Verified Profile',
      youtubeChannel: 'YouTube',
      youtubeSub: '@rafa_930 · Official Channel',
      deezerProfile: 'Deezer Music',
      deezerSub: 'RAFA 930 · High Fidelity',
      appleProfile: 'Apple Music',
      appleSub: 'RAFA 930 · Spatial Audio',
      amazonProfile: 'Amazon Music',
      amazonSub: 'RAFA 930 · Official Streaming',
      tidalProfile: 'Tidal',
      tidalSub: 'RAFA 930 · Master Quality Audio',
      instagram: 'Official Instagram',
      instagramSub: '@rafa930_oficial · News and updates',
    },
  }[language];

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}#enllacos` : 'https://rafa930music-sudo.github.io/Rafa-930-PAGINA-WEB/#enllacos';
  const officialSpotifyUrl = OFFICIAL_SPOTIFY_URL;
  const officialYoutubeUrl = OFFICIAL_YOUTUBE_URL;
  const officialInstagramUrl = OFFICIAL_INSTAGRAM_URL;

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

  const links = [
    {
      id: 'spotify',
      title: content.spotifyProfile,
      subtitle: content.spotifySub,
      url: officialSpotifyUrl,
      badge: 'Spotify',
      Logo: SpotifyLogo,
      logoColor: '#1DB954',
      borderHover: 'hover:border-[#1DB954]',
      badgeColor: 'text-[#1ed760] bg-[#1DB954]/10 border-[#1DB954]/30',
      isPrimary: true,
    },
    {
      id: 'youtube',
      title: content.youtubeChannel,
      subtitle: content.youtubeSub,
      url: officialYoutubeUrl,
      badge: 'YouTube',
      Logo: YouTubeLogo,
      logoColor: '#FF0000',
      borderHover: 'hover:border-[#FF0000]',
      badgeColor: 'text-[#FF0000] bg-[#FF0000]/10 border-[#FF0000]/30',
    },
    {
      id: 'deezer',
      title: content.deezerProfile,
      subtitle: content.deezerSub,
      url: OFFICIAL_DEEZER_URL,
      badge: 'Deezer',
      Logo: DeezerLogo,
      logoColor: '#FFB700',
      borderHover: 'hover:border-[#FFB700]',
      badgeColor: 'text-[#FFB700] bg-[#FFB700]/10 border-[#FFB700]/30',
    },
    {
      id: 'apple',
      title: content.appleProfile,
      subtitle: content.appleSub,
      url: OFFICIAL_APPLE_MUSIC_URL,
      badge: 'Apple Music',
      Logo: AppleMusicLogo,
      logoColor: '#FA5788',
      borderHover: 'hover:border-[#FA5788]',
      badgeColor: 'text-[#FA5788] bg-[#FA5788]/10 border-[#FA5788]/30',
    },
    {
      id: 'amazon',
      title: content.amazonProfile,
      subtitle: content.amazonSub,
      url: OFFICIAL_AMAZON_MUSIC_URL,
      badge: 'Amazon Music',
      Logo: AmazonMusicLogo,
      logoColor: '#FF9900',
      borderHover: 'hover:border-[#FF9900]',
      badgeColor: 'text-[#FF9900] bg-[#FF9900]/10 border-[#FF9900]/30',
    },
    {
      id: 'tidal',
      title: content.tidalProfile,
      subtitle: content.tidalSub,
      url: OFFICIAL_TIDAL_URL,
      badge: 'Tidal',
      Logo: TidalLogo,
      logoColor: '#00FFFF',
      borderHover: 'hover:border-[#00FFFF]',
      badgeColor: 'text-[#00FFFF] bg-[#00FFFF]/10 border-[#00FFFF]/30',
    },
    {
      id: 'instagram',
      title: content.instagram,
      subtitle: content.instagramSub,
      url: officialInstagramUrl,
      badge: 'Instagram',
      Logo: InstagramLogo,
      logoColor: '#EC4899',
      borderHover: 'hover:border-[#EC4899]',
      badgeColor: 'text-[#EC4899] bg-[#EC4899]/10 border-[#EC4899]/30',
    },
  ];

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(shareUrl)}&color=00d4ff&bgcolor=0a0a0f`;

  return (
    <div className="relative w-full max-w-md mx-auto px-4 py-8 sm:py-14 space-y-7 overflow-hidden flex flex-col items-center">
      {/* Same Ambient Bubbles as the rest of the web app */}
      <SectionColorBubbles variant="editorial" />

      {/* Profile Header & Typography coherent with the rest of the web */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-3 w-full">
        {/* Avatar with subtle neon pulse */}
        <div
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[2.5px] transition-all duration-500 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
          style={{
            background: activeColor
              ? `linear-gradient(135deg, ${activeColor}, #ffffff)`
              : 'linear-gradient(135deg, #a855f7, #c084fc, #ec4899)',
            boxShadow: activeColor
              ? `0 0 35px ${activeColor}80`
              : '0 0 30px rgba(168,85,247,0.3)',
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
            className="absolute bottom-0 right-0 w-6.5 h-6.5 rounded-full bg-[#0095F6] text-white border-2 border-[#050507] flex items-center justify-center shadow-[0_0_14px_rgba(0,149,246,0.6)] text-xs font-black"
            title="Verificado en Meta"
          >
            ✓
          </div>
        </div>

        <div>
          <h1
            className="font-['Bebas_Neue'] text-4xl sm:text-5xl font-extrabold tracking-wide transition-all duration-300"
            style={{
              color: activeColor || '#ffffff',
              textShadow: activeColor
                ? `0 0 24px ${activeColor}90`
                : '0 0 16px rgba(168,85,247,0.3)',
            }}
          >
            RAFA <span style={{ color: activeColor || '#a855f7' }}>930</span>
          </h1>
        </div>

        {/* Action Bar (Copy Bio, QR Code, Share) */}
        <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
          <button
            type="button"
            onClick={handleCopyLink}
            className={`touch-target-44 px-3.5 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.3)]'
                : 'bg-[#111118] border-[#22222e] text-[#a1a1b5] hover:text-white hover:border-[#a855f7]'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? content.copiedText : content.copyLink}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="touch-target-44 px-3.5 py-1.5 rounded-xl text-xs font-mono bg-[#111118] border border-[#22222e] text-[#a1a1b5] hover:text-white hover:border-[#a855f7] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-[#a855f7]" />
            <span>{content.qrCodeBtn}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="touch-target-44 px-3.5 py-1.5 rounded-xl text-xs font-mono bg-[#111118] border border-[#22222e] text-[#a1a1b5] hover:text-white hover:border-[#ec4899] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#ec4899]" />
            <span>{content.shareBtn}</span>
          </button>
        </div>
      </div>

      {/* Featured Release Card: De Vuelta */}
      <div className="relative z-10 rounded-2xl bg-[#111118]/85 backdrop-blur-md border border-[#a855f7]/40 overflow-hidden shadow-[0_0_28px_rgba(168,85,247,0.15)]">
        {isVideoPlaying ? (
          <div className="aspect-video w-full bg-black">
            <iframe
              src="https://www.youtube.com/embed/RVuiWbT_mNk?autoplay=1&rel=0"
              title="RAFA 930 - De Vuelta"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        ) : (
          <div
            onClick={() => setIsVideoPlaying(true)}
            className="relative aspect-video w-full bg-[#0a0a0f] cursor-pointer group overflow-hidden"
          >
            <img
              src="https://i.ytimg.com/vi/RVuiWbT_mNk/hqdefault.jpg"
              alt="RAFA 930 - De Vuelta"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-black/40 to-transparent flex items-center justify-center">
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#ec4899] text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-lg">
                ● {content.featuredBadge}
              </span>
              <div className="w-14 h-14 rounded-full gradient-lila-rosa-rojo flex items-center justify-center text-white shadow-[0_0_25px_rgba(236,72,153,0.7)] group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
            </div>
          </div>
        )}

        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#22222e]">
          <div>
            <span className="text-[10px] font-mono text-[#a855f7] uppercase tracking-wider block">
              {content.featuredBadge}
            </span>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-white">
              {content.featuredTitle}
            </h3>
            <p className="text-xs text-[#a1a1b5] font-mono">{content.featuredSub}</p>
          </div>

          <a
            href="https://youtu.be/RVuiWbT_mNk"
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target-44 px-4 py-2 rounded-xl gradient-lila-rosa-rojo text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md hover:opacity-95 transition-all shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{content.listenYouTube}</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Official Digital Platforms List */}
      <div className="relative z-10 space-y-2.5 w-full">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-mono uppercase tracking-wider text-[#a1a1b5]">
            {language === 'ca' ? 'Tots els canals' : language === 'es' ? 'Todos mis canales' : 'All channels'}
          </span>
          <span className="text-[11px] font-mono text-[#a855f7]">{links.length} Enlaces</span>
        </div>

        <div className="w-full flex flex-col gap-2.5">
          {links.map((link) => {
            const isSelected = activeColor === link.logoColor;
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveColor(link.logoColor)}
                onMouseLeave={() => setActiveColor(null)}
                onTouchStart={() => setActiveColor(link.logoColor)}
                onTouchEnd={() => setActiveColor(null)}
                className="group w-full h-14 px-3.5 sm:px-4 rounded-xl flex items-center justify-between bg-[#111118]/90 backdrop-blur-md border border-[#22222e] transition-all duration-200 active:scale-[0.98] shadow-md cursor-pointer"
                style={{
                  borderColor: isSelected ? link.logoColor : undefined,
                  boxShadow: isSelected ? `0 0 22px ${link.logoColor}45` : undefined,
                  backgroundColor: isSelected ? `${link.logoColor}12` : undefined,
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-200 group-hover:scale-105"
                    style={{
                      backgroundColor: `${link.logoColor}20`,
                      borderColor: `${link.logoColor}60`,
                      color: link.logoColor,
                    }}
                  >
                    <link.Logo className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex flex-col text-left min-w-0">
                    <span
                      className="font-bold text-sm text-white transition-colors truncate"
                      style={{ color: isSelected ? link.logoColor : '#ffffff' }}
                    >
                      {link.title}
                    </span>
                    <span
                      className="text-[11px] font-mono text-[#a1a1b5] truncate transition-colors"
                      style={{ color: isSelected ? link.logoColor : '#a1a1b5' }}
                    >
                      {link.subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border text-white/90 hidden sm:inline-block transition-colors"
                    style={{
                      backgroundColor: `${link.logoColor}20`,
                      borderColor: `${link.logoColor}60`,
                    }}
                  >
                    {link.badge}
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 text-[#a1a1b5] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: isSelected ? link.logoColor : '#a1a1b5' }}
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Back to Editorial Home CTA */}
      <div className="relative z-10 pt-4 text-center">
        <button
          type="button"
          onClick={() => onSelectScreen('revista')}
          className="text-xs font-mono text-[#a1a1b5] hover:text-[#a855f7] underline decoration-[#a855f7]/40 underline-offset-4 transition-colors cursor-pointer"
        >
          ← {content.backToWeb}
        </button>
      </div>

      {/* QR Code Modal for In-Person Concerts / Stories */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 bg-[#050507]/90 backdrop-blur-xl flex items-center justify-center p-4 select-none"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="relative max-w-sm w-full bg-[#0a0a0f] border border-[#a855f7]/40 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-[0_0_50px_rgba(168,85,247,0.25)]"
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

            <h3 className="font-['Cormorant_Garamond'] text-3xl font-bold text-white tracking-tight">
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
  );
};

