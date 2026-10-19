import React, { useState } from 'react';
import { Language } from '../../types';
import { ARTIST_IMAGES } from '../../data/content';
import {
  Disc3,
  Youtube,
  Instagram,
  Globe,
  FileText,
  Mail,
  ArrowUpRight,
  Music2,
  Sparkles,
  Copy,
  Check,
  QrCode,
  Share2,
  X,
} from 'lucide-react';

interface EnllacosScreenProps {
  language: Language;
  onSelectScreen: (screen: any) => void;
}

export const EnllacosScreen: React.FC<EnllacosScreenProps> = ({ language, onSelectScreen }) => {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const content = {
    ca: {
      title: 'Enllaços Oficials',
      subtitle: 'Música recent, plataformes de streaming, xarxes socials i contractació oficial.',
      copyLink: 'Copiar Enllaç Bio',
      copiedText: 'Enllaç copiat!',
      qrCodeBtn: 'Codi QR',
      shareBtn: 'Compartir',
      backToWeb: 'Tornar a la Portada Principal',
      qrTitle: 'Escaneja per connectar amb RAFA 930',
      qrSubtitle: 'Apunta amb la càmera del mòbil per obrir tots els enllaços oficials',
      close: 'Tancar',
      spotifyProfile: 'Perfil Oficial a Spotify',
      spotifySub: 'Escolta el catàleg complet de cançons i EPs',
      youtubeChannel: 'Canal Oficial de YouTube',
      youtubeSub: 'Videoclips oficials i visualitzadors',
      instagram: 'Instagram Oficial (@rafa_930_)',
      instagramSub: 'Arxiu fotogràfic, novetats i directes',
      website: 'Web Editorial Completa',
      websiteSub: 'Revista biogràfica, galeria i discografia',
      presskit: 'Presskit Oficial & Rider (EPK)',
      presskitSub: 'Dossier per a promotors, premsa i festivals',
      services: 'Serveis Professionals & Tarifes',
      servicesSub: 'Producció de veu, fotografia editorial i web',
      contact: 'Booking & Contacte Directe',
      contactSub: 'Contractació per a directes i col·laboracions',
      latestSingle: 'Últim Llançament 2026',
      singleTitle: 'De Vuelta',
      singleProd: 'RAFA 930 · 930 Records',
    },
    es: {
      title: 'Enlaces Oficiales',
      subtitle: 'Música reciente, plataformas de streaming, redes sociales y contratación oficial.',
      copyLink: 'Copiar Enlace Bio',
      copiedText: '¡Enlace copiado!',
      qrCodeBtn: 'Código QR',
      shareBtn: 'Compartir',
      backToWeb: 'Volver a la Portada Principal',
      qrTitle: 'Escanea para conectar con RAFA 930',
      qrSubtitle: 'Apunta con la cámara de tu móvil para abrir todos los enlaces oficiales',
      close: 'Cerrar',
      spotifyProfile: 'Perfil Oficial en Spotify',
      spotifySub: 'Escucha el catálogo completo de canciones y EPs',
      youtubeChannel: 'Canal Oficial de YouTube',
      youtubeSub: 'Videoclips oficiales y visualizadores',
      instagram: 'Instagram Oficial (@rafa_930_)',
      instagramSub: 'Archivo fotográfico, novedades y directos',
      website: 'Web Editorial Completa',
      websiteSub: 'Revista biográfica, galería y discografía',
      presskit: 'Presskit Oficial & Rider (EPK)',
      presskitSub: 'Dossier para promotores, prensa y festivales',
      services: 'Servicios Profesionales & Tarifas',
      servicesSub: 'Producción de voz, fotografía editorial y web',
      contact: 'Booking & Contacto Directo',
      contactSub: 'Contratación para directos y colaboraciones',
      latestSingle: 'Último Lanzamiento 2026',
      singleTitle: 'De Vuelta',
      singleProd: 'RAFA 930 · 930 Records',
    },
    en: {
      title: 'Official Links',
      subtitle: 'Recent music, streaming platforms, social media, and official booking.',
      copyLink: 'Copy Bio Link',
      copiedText: 'Link copied!',
      qrCodeBtn: 'QR Code',
      shareBtn: 'Share',
      backToWeb: 'Back to Main Home',
      qrTitle: 'Scan to connect with RAFA 930',
      qrSubtitle: 'Point your phone camera to access all official links instantly',
      close: 'Close',
      spotifyProfile: 'Official Spotify Profile',
      spotifySub: 'Stream all songs and discography catalog',
      youtubeChannel: 'Official YouTube Channel',
      youtubeSub: 'Official music videos and visuals',
      instagram: 'Official Instagram (@rafa_930_)',
      instagramSub: 'Photo archive, stories, and daily updates',
      website: 'Full Editorial Website',
      websiteSub: 'Biographical magazine, gallery & music',
      presskit: 'Official Presskit & Rider (EPK)',
      presskitSub: 'Press dossier for promoters and festivals',
      services: 'Professional Services & Rates',
      servicesSub: 'Vocals, editorial photography & web design',
      contact: 'Direct Booking & Contact',
      contactSub: 'Live concerts, features, and inquiries',
      latestSingle: 'Latest Single 2026',
      singleTitle: 'De Vuelta',
      singleProd: 'RAFA 930 · 930 Records',
    },
  }[language];

  const shareUrl = 'https://rafa930music-sudo.github.io/Rafa-930-PAGINA-WEB/#links';
  const officialSpotifyUrl = 'https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng';
  const officialYoutubeUrl = 'https://www.youtube.com/@Rafa930';
  const officialInstagramUrl = 'https://www.instagram.com/rafa_930_/';

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
      icon: Disc3,
      badge: 'Spotify',
      colorClass: 'bg-[#1DB954] hover:bg-[#1ed760] text-black shadow-[0_0_25px_rgba(29,185,84,0.35)] font-bold',
      isPrimary: true,
    },
    {
      id: 'youtube',
      title: content.youtubeChannel,
      subtitle: content.youtubeSub,
      url: officialYoutubeUrl,
      icon: Youtube,
      badge: 'YouTube',
      colorClass: 'bg-[#12121c] border border-[#00d4ff]/40 hover:border-[#00d4ff] text-white shadow-[0_0_20px_rgba(0,212,255,0.15)]',
    },
    {
      id: 'deezer',
      title: 'Deezer',
      subtitle: 'Escucha en Deezer',
      url: 'https://www.deezer.com/mx/artist/224265995',
      icon: Music2,
      badge: 'Deezer',
      colorClass: 'bg-[#12121c] border border-[#ffb700]/40 hover:border-[#ffb700] text-white shadow-[0_0_20px_rgba(255,183,0,0.15)]',
    },

    {
      id: 'apple',
      title: 'Apple Music',
      subtitle: 'Escucha en Apple Music',
      url: 'https://music.apple.com/es/artist/rafa-930/1724193275',
      icon: Music2,
      badge: 'Apple Music',
      colorClass: 'bg-[#12121c] border border-[#fa5788]/40 hover:border-[#fa5788] text-white shadow-[0_0_20px_rgba(250,87,136,0.15)]',
    },
    {
      id: 'amazon',
      title: 'Amazon Music',
      subtitle: 'Escucha en Amazon Music',
      url: 'https://music.amazon.in/artists/B0CJM7BWF1/rafa-930',
      icon: Music2,
      badge: 'Amazon Music',
      colorClass: 'bg-[#12121c] border border-[#ff9900]/40 hover:border-[#ff9900] text-white shadow-[0_0_20px_rgba(255,153,0,0.15)]',
    },
    {
      id: 'tidal',
      title: 'Tidal',
      subtitle: 'Escucha en Tidal',
      url: 'https://tidal.com/artist/41128230',
      icon: Music2,
      badge: 'Tidal',
      colorClass: 'bg-[#12121c] border border-[#00ffff]/40 hover:border-[#00ffff] text-white shadow-[0_0_20px_rgba(0,255,255,0.15)]',
    },
    {
      id: 'latest',
      title: content.singleTitle,
      subtitle: content.singleProd,
      url: 'https://youtu.be/RVuiWbT_mNk',
      icon: Music2,
      badge: content.latestSingle,
      colorClass: 'bg-gradient-to-r from-[#a855f7] via-[#00d4ff] to-[#ec4899] text-white font-bold shadow-[0_0_30px_rgba(0,212,255,0.3)]',
      isPrimary: true,
    },
    {
      id: 'instagram',
      title: content.instagram,
      subtitle: content.instagramSub,
      url: officialInstagramUrl,
      icon: Instagram,
      badge: 'Instagram',
      colorClass: 'bg-[#12121c] border border-[#ec4899]/40 hover:border-[#ec4899] text-white shadow-[0_0_20px_rgba(236,72,153,0.15)]',
    },
  ];

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(shareUrl)}&color=00d4ff&bgcolor=0a0a0f`;

  return (
    <div id="main-content" className="min-h-screen pt-20 pb-20 px-4 sm:px-6 relative flex flex-col items-center">
      {/* Deep Galaxy Atmosphere */}
      <div className="absolute inset-0 bg-[#050507]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#1e1b4b_0%,#0f172a_35%,#020617_100%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 2 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                opacity: Math.random() * 0.7 + 0.3,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-xl space-y-8">
        {/* Profile Header */}
        <div className="relative z-10 w-full flex flex-col items-center text-center">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#a855f7] via-[#00d4ff] to-[#ec4899] shadow-[0_0_35px_rgba(0,212,255,0.4)] mb-4">
            <img
              src={ARTIST_IMAGES.heroPortrait}
              alt="RAFA 930"
              className="w-full h-full object-cover object-top rounded-full bg-[#050507]"
              loading="eager"
              decoding="async"
            />
            <div className="absolute -bottom-1 right-2 bg-[#1DB954] text-black p-1.5 rounded-full shadow-lg" title="Artista Oficial a Spotify">
              <Disc3 className="w-4 h-4" />
            </div>
          </div>

          <h1 className="font-['Bebas_Neue'] text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            RAFA <span className="text-gradient-930">930</span>
          </h1>

          <p className="text-xs sm:text-sm font-mono text-[#00d4ff] mt-1 tracking-wider uppercase">
            La Mina · Barcelona · 930 Records
          </p>

          <p className="text-sm text-white/70 max-w-md mx-auto mt-2 leading-relaxed">
            {content.subtitle}
          </p>

          {/* Quick Action Bar for Social Sharing / Linktree */}
          <div className="flex items-center justify-center gap-2.5 mt-5 flex-wrap">
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

        {/* Links Hub Stack */}
        <div className="grid grid-cols-1 gap-3.5">
          {links.map((link) => {
            const Icon = link.icon;
            const Component = link.url ? 'a' : 'button';
            const props = link.url
              ? { href: link.url, target: '_blank', rel: 'noopener noreferrer' }
              : { onClick: link.onClick, type: 'button' as const };

            return (
              <Component
                key={link.id}
                {...props}
                className={`group flex items-center p-4 rounded-xl transition-all duration-300 ${link.colorClass} border border-white/5 backdrop-blur-sm cursor-pointer`}
              >
                <div className="p-3 bg-white/10 rounded-lg mr-4 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-widest opacity-80 mb-0.5">
                    {link.badge}
                  </div>
                  <div className="text-lg font-bold font-['Bebas_Neue'] tracking-wide truncate">
                    {link.title}
                  </div>
                  <div className="text-xs opacity-75 font-light truncate">
                    {link.subtitle}
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
              </Component>
            );
          })}
        </div>

        {/* Back to Home CTA */}
        <div className="pt-4 text-center">
          <button
            type="button"
            onClick={() => onSelectScreen('revista')}
            className="text-xs font-mono text-[#a1a1b5] hover:text-[#00d4ff] underline decoration-[#00d4ff]/40 underline-offset-4 transition-colors cursor-pointer"
          >
            ← {content.backToWeb}
          </button>
        </div>
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

            <h3 className="font-['Bebas_Neue'] text-2xl font-extrabold text-white tracking-tight">
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
