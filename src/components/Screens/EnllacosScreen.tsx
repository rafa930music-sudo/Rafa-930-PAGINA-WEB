import React, { useState } from 'react';
import { Language } from '../../types';
import { ARTIST_IMAGES, OFFICIAL_SPOTIFY_URL } from '../../data/content';
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

  const content = {
    ca: {
      badge: 'ENLLAÇOS OFICIALS · BIO LINK',
      title: 'Plataformes & Música',
      subtitle: 'Tots els canals oficials, llançaments recents i plataformes de streaming de RAFA 930.',
      copyLink: 'Copiar Enllaç Bio',
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
      spotifyProfile: 'Perfil Oficial a Spotify',
      spotifySub: 'Catàleg complet de senzills, EPs i àlbum',
      youtubeChannel: 'Canal Oficial de YouTube',
      youtubeSub: 'Videoclips oficials, àudios i visualitzadors',
      deezerProfile: 'Deezer Music',
      deezerSub: 'Discografia completa en alta fidelitat',
      appleProfile: 'Apple Music',
      appleSub: 'Senzills i àlbums en so espacial',
      amazonProfile: 'Amazon Music',
      amazonSub: 'Reproducció oficial a Amazon Music',
      tidalProfile: 'Tidal',
      tidalSub: 'Master Sound & so d’alta definició',
      instagram: 'Instagram Oficial',
      instagramSub: '@rafa930_oficial · Novetats i directes',
    },
    es: {
      badge: 'ENLACES OFICIALES · BIO LINK',
      title: 'Plataformas & Música',
      subtitle: 'Todos los canales oficiales, lanzamientos recientes y plataformas de streaming de RAFA 930.',
      copyLink: 'Copiar Enlace Bio',
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
      spotifyProfile: 'Perfil Oficial en Spotify',
      spotifySub: 'Catálogo completo de temas, EPs y álbum',
      youtubeChannel: 'Canal Oficial de YouTube',
      youtubeSub: 'Videoclips oficiales, audios y visualizadores',
      deezerProfile: 'Deezer Music',
      deezerSub: 'Discografía completa en alta fidelidad',
      appleProfile: 'Apple Music',
      appleSub: 'Sencillos y álbumes en audio espacial',
      amazonProfile: 'Amazon Music',
      amazonSub: 'Reproducción oficial en Amazon Music',
      tidalProfile: 'Tidal',
      tidalSub: 'Master Sound & audio en alta definición',
      instagram: 'Instagram Oficial',
      instagramSub: '@rafa930_oficial · Novedades y directos',
    },
    en: {
      badge: 'OFFICIAL LINKS · BIO LINK',
      title: 'Platforms & Music',
      subtitle: 'All official channels, recent single releases, and streaming platforms by RAFA 930.',
      copyLink: 'Copy Bio Link',
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
      spotifyProfile: 'Official Spotify Profile',
      spotifySub: 'Complete single catalog, EPs and debut album',
      youtubeChannel: 'Official YouTube Channel',
      youtubeSub: 'Official music videos, audio & visualizers',
      deezerProfile: 'Deezer Music',
      deezerSub: 'Full discography catalog in high fidelity',
      appleProfile: 'Apple Music',
      appleSub: 'Singles and albums in spatial audio',
      amazonProfile: 'Amazon Music',
      amazonSub: 'Official streaming on Amazon Music',
      tidalProfile: 'Tidal',
      tidalSub: 'Master Sound & high-res audio',
      instagram: 'Official Instagram',
      instagramSub: '@rafa930_oficial · News and daily updates',
    },
  }[language];

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}#enllacos` : 'https://rafa930music-sudo.github.io/Rafa-930-PAGINA-WEB/#enllacos';
  const officialSpotifyUrl = OFFICIAL_SPOTIFY_URL;
  const officialYoutubeUrl = 'https://www.youtube.com/@Rafa930';
  const officialInstagramUrl = 'https://www.instagram.com/rafa930_oficial';

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
          title: 'RAFA 930 · Enlaces Oficiales',
          text: content.subtitle,
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
      url: 'https://www.deezer.com/mx/artist/224265995',
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
      url: 'https://music.apple.com/es/artist/rafa-930/1724193275',
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
      url: 'https://music.amazon.in/artists/B0CJM7BWF1/rafa-930',
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
      url: 'https://tidal.com/artist/41128230',
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
    <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10 overflow-hidden">
      {/* Same Ambient Bubbles as the rest of the web app */}
      <SectionColorBubbles variant="editorial" />

      {/* Profile Header & Typography coherent with the rest of the web */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        {/* Avatar with subtle neon pulse */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#a855f7] via-[#00d4ff] to-[#ec4899] shadow-[0_0_32px_rgba(0,212,255,0.3)]">
          <img
            src={ARTIST_IMAGES.heroPortrait}
            alt="RAFA 930"
            className="w-full h-full object-cover object-top rounded-full bg-[#050507]"
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
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
            <span className="text-[#00d4ff] font-semibold">{content.badge}</span>
            <span aria-hidden="true" className="text-[#a1a1b5]">·</span>
            <span>08930 · LA MINA</span>
          </div>

          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl font-semibold text-[#ffffff] tracking-tight">
            RAFA <span className="text-gradient-930">930</span>
          </h1>

          <p className="text-xs sm:text-sm font-mono text-[#a855f7] mt-1 uppercase tracking-wider">
            Música Urbana · Fotografía Editorial · Desarrollo Web
          </p>

          <p className="text-[#a1a1b5] text-sm max-w-md mx-auto mt-2 leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* Action Bar (Copy Bio, QR Code, Share) */}
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

      {/* Featured Release Card: De Vuelta */}
      <div className="relative z-10 rounded-2xl bg-[#111118]/85 backdrop-blur-md border border-[#00d4ff]/40 overflow-hidden shadow-[0_0_28px_rgba(0,212,255,0.12)]">
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
            <span className="text-[10px] font-mono text-[#00d4ff] uppercase tracking-wider block">
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
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-mono uppercase tracking-wider text-[#a1a1b5]">
            {language === 'ca' ? 'Totes les plataformes' : language === 'es' ? 'Todas mis plataformas digitales' : 'All digital platforms'}
          </span>
          <span className="text-[11px] font-mono text-[#00d4ff]">7 Enlaces</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center p-3.5 sm:p-4 rounded-xl bg-[#111118]/85 backdrop-blur-md border border-[#22222e] ${link.borderHover} transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.35)] cursor-pointer`}
            >
              <div
                className="w-11 h-11 rounded-xl bg-[#0a0a0f] border border-[#22222e] flex items-center justify-center p-2.5 mr-3.5 shrink-0 group-hover:scale-105 transition-transform"
                style={{ color: link.logoColor }}
              >
                <link.Logo className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${link.badgeColor}`}>
                    {link.badge}
                  </span>
                </div>
                <h4 className="font-['Cormorant_Garamond'] text-xl sm:text-2xl font-bold text-white group-hover:text-[#00d4ff] transition-colors truncate">
                  {link.title}
                </h4>
                <p className="text-xs text-[#a1a1b5] font-light truncate">
                  {link.subtitle}
                </p>
              </div>

              <div className="ml-3 shrink-0 text-[#a1a1b5] group-hover:text-[#00d4ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Back to Editorial Home CTA */}
      <div className="relative z-10 pt-4 text-center">
        <button
          type="button"
          onClick={() => onSelectScreen('revista')}
          className="text-xs font-mono text-[#a1a1b5] hover:text-[#00d4ff] underline decoration-[#00d4ff]/40 underline-offset-4 transition-colors cursor-pointer"
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
            className="relative max-w-sm w-full bg-[#0a0a0f] border border-[#00d4ff]/40 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-[0_0_50px_rgba(0,212,255,0.25)]"
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
  );
};

