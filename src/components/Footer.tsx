import React from 'react';
import { ScreenId, Language, LegalDocId } from '../types';
import { OFFICIAL_SPOTIFY_URL } from '../data/content';
import {
  Terminal,
  ShieldCheck,
  ArrowRight,
  Zap,
} from 'lucide-react';
import {
  SpotifyLogo,
  YouTubeLogo,
  InstagramLogo,
  DeezerLogo,
  AppleMusicLogo,
  AmazonMusicLogo,
  TidalLogo,
} from './PlatformLogos';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenLegalTab: (tab: LegalDocId) => void;
  language: Language;
  onShowSplash?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegalTab, language, onShowSplash }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionJump = (sectionId: string) => {
    onNavigate('revista');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else scrollToTop();
    }, 100);
  };

  return (
    <footer className="w-full bg-[#050811] border-t border-white/10 text-white">
      <div
        aria-hidden="true"
        className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00d4ff]/60 to-transparent shadow-[0_0_12px_rgba(229,184,105,0.4)]"
      />
      {/* Main Footer Area */}
      <div className="w-full px-4 sm:px-6 md:px-10 py-10 md:py-14 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-white/10 gap-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                onNavigate('revista');
                scrollToTop();
              }}
              className="font-['Bebas_Neue'] text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-['Bebas_Neue'] text-left cursor-pointer flex items-center gap-2 group"
            >
              <span className="transition-all duration-300 transform group-hover:scale-105 inline-flex items-center gap-1">
                <span className="transition-all duration-300 group-hover-gradient-930">RAFA</span>
                <span className="text-gradient-930 group-hover:filter group-hover:drop-shadow-[0_0_16px_rgba(0,212,255,0.9)]">930</span>
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={OFFICIAL_SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="touch-target-44 w-10 h-10 rounded-xl bg-[#0a0f1d] border border-white/10 flex items-center justify-center text-[#8c98b4] hover:text-[#1DB954] hover:border-[#1DB954] transition-colors"
            >
              <SpotifyLogo className="w-5 h-5" />
            </a>

            <a
              href="https://instagram.com/rafa930_oficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="touch-target-44 w-10 h-10 rounded-xl bg-[#0a0f1d] border border-white/10 flex items-center justify-center text-[#8c98b4] hover:text-[#00d4ff] hover:border-[#00d4ff] transition-colors"
            >
              <InstagramLogo className="w-5 h-5" />
            </a>

            <a
              href="https://youtube.com/@rafa_930"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="touch-target-44 w-10 h-10 rounded-xl bg-[#0a0f1d] border border-white/10 flex items-center justify-center text-[#8c98b4] hover:text-[#FF0000] hover:border-[#FF0000] transition-colors"
            >
              <YouTubeLogo className="w-5 h-5" />
            </a>

            <a
              href="https://rafa930music-sudo.github.io/930-Digital/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="930 Digital"
              className="touch-target-44 w-10 h-10 rounded-xl bg-[#0a0f1d] border border-[#00d4ff]/30 flex items-center justify-center text-[#00d4ff] hover:text-white hover:border-[#00d4ff] transition-colors"
            >
              <Terminal className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 text-xs font-mono">
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-3">
              Secciones Principales
            </h4>
            <ul className="space-y-2 text-[#8c98b4]">
              <li>
                <button type="button" onClick={() => { onNavigate('revista'); scrollToTop(); }} className="hover:text-[#00d4ff] transition-colors py-0.5">
                  00. Portada & Manifiesto
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleSectionJump('discografia')} className="hover:text-[#00d4ff] transition-colors py-0.5">
                  01. Discografía Oficial 2023–2026
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleSectionJump('videos')} className="hover:text-[#00d4ff] transition-colors py-0.5">
                  02. Vídeos & Videoclips
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleSectionJump('biografia')} className="hover:text-[#00d4ff] transition-colors py-0.5">
                  03. Biografía Oficial
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleSectionJump('fotos')} className="hover:text-[#00d4ff] transition-colors py-0.5">
                  04. Archivo Fotográfico
                </button>
              </li>
              <li>
                <button type="button" onClick={() => { onNavigate('conciertos'); scrollToTop(); }} className="hover:text-[#00d4ff] text-[#00d4ff] transition-colors py-0.5 flex items-center gap-1 font-semibold">
                  <span>05. {language === 'ca' ? 'Concerts & Directes' : language === 'es' ? 'Conciertos & Directos' : 'Concerts & Live'}</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-[#00d4ff]/15 border border-[#00d4ff]/40 rounded text-[#00d4ff]">{language === 'ca' ? 'Pròximament' : language === 'es' ? 'Próximamente' : 'Soon'}</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#ffffff] mb-3 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#00d4ff]" />
              <span>{language === 'ca' ? 'Plataformes Oficials' : language === 'es' ? 'Plataformas Oficiales' : 'Official Platforms'}</span>
            </h4>
            <ul className="space-y-2 text-[#a1a1b5]">
              <li>
                <a
                  href={OFFICIAL_SPOTIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00d4ff] transition-colors block py-0.5"
                >
                  Spotify Oficial (RAFA 930)
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@rafa_930"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00d4ff] transition-colors block py-0.5"
                >
                  YouTube Oficial (@rafa_930)
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/rafa930_oficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00d4ff] transition-colors block py-0.5"
                >
                  Instagram (@rafa930_oficial)
                </a>
              </li>
              <li>
                <a
                  href="https://rafa930music-sudo.github.io/930-Digital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00d4ff] transition-colors block py-0.5"
                >
                  930 Digital Studio
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#ffffff] mb-3">
              {language === 'ca' ? 'Contacte Directe' : language === 'es' ? 'Contacto Directo' : 'Direct Contact'}
            </h4>
            <address className="not-italic space-y-2 text-[#a1a1b5]">
              <div>
                <a
                  href="mailto:rafa.930music@gmail.com"
                  className="hover:text-[#ec4899] transition-colors block py-0.5 break-all"
                >
                  rafa.930music@gmail.com
                </a>
              </div>
              <div className="text-xs text-[#a1a1b5]">
                Sant Adrià de Besòs · Barcelona (CP 08930)
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Separated Bottom Legal Bar — Apartado Independiente */}
      <div className="w-full bg-[#050507] border-t border-[#22222e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-5 flex flex-col items-center justify-center gap-4 text-xs">
          {/* Platforms Block */}
          <div className="flex gap-3 mb-2 flex-wrap justify-center items-center">
             <a href={OFFICIAL_SPOTIFY_URL} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#1DB954] text-[#1DB954] hover:scale-105 transition-all" title="Spotify"><SpotifyLogo className="w-4 h-4" /></a>
             <a href="https://youtube.com/@rafa_930" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FF0000] text-[#FF0000] hover:scale-105 transition-all" title="YouTube"><YouTubeLogo className="w-4 h-4" /></a>
             <a href="https://www.deezer.com/mx/artist/224265995" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#A238FF] text-[#A238FF] hover:scale-105 transition-all" title="Deezer"><DeezerLogo className="w-4 h-4" /></a>
             <a href="https://music.apple.com/es/artist/rafa-930/1724193275" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FA243C] text-[#FA243C] hover:scale-105 transition-all" title="Apple Music"><AppleMusicLogo className="w-4 h-4" /></a>
             <a href="https://music.amazon.in/artists/B0CJM7BWF1/rafa-930" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FF9900] text-[#FF9900] hover:scale-105 transition-all" title="Amazon Music"><AmazonMusicLogo className="w-4 h-4" /></a>
             <a href="https://tidal.com/artist/41128230" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#00FFFF] text-[#00FFFF] hover:scale-105 transition-all" title="Tidal"><TidalLogo className="w-4 h-4" /></a>
             <a href="https://instagram.com/rafa930_oficial" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#EC4899] text-[#EC4899] hover:scale-105 transition-all" title="Instagram"><InstagramLogo className="w-4 h-4" /></a>
          </div>

          <div className="flex items-center gap-2 text-[#ffffff] font-mono text-[11px] uppercase tracking-wide text-center">
            <ShieldCheck className="w-4 h-4 text-[#ec4899] shrink-0" />
            <p>
              © 2026 RAFA 930 · Rafael Moreno Román · Todos los derechos reservados
            </p>
          </div>

          {/* Marco Legal Destacado — Secció Legal / Sección Legal */}
          <div className="w-full max-w-3xl bg-[#0a0a0f] border border-[#22222e] rounded-xl px-4 py-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-mono shadow-inner">
            <button
              type="button"
              onClick={() => onOpenLegalTab('aviso')}
              className="text-[#ffffff] hover:text-[#00d4ff] transition-colors font-medium hover:underline underline-offset-4 decoration-[#00d4ff]"
            >
              {language === 'ca' ? '01. Avís Legal' : language === 'es' ? '01. Aviso Legal' : '01. Legal Notice'}
            </button>
            <span className="text-[#00d4ff]/40 font-bold" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => onOpenLegalTab('privacitat')}
              className="text-[#ffffff] hover:text-[#ec4899] transition-colors font-medium hover:underline underline-offset-4 decoration-[#ec4899]"
            >
              {language === 'ca' ? '02. Privacitat RGPD' : language === 'es' ? '02. Privacidad RGPD' : '02. GDPR Privacy'}
            </button>
            <span className="text-[#ec4899]/40 font-bold" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => onOpenLegalTab('cookies')}
              className="text-[#ffffff] hover:text-[#a855f7] transition-colors font-medium hover:underline underline-offset-4 decoration-[#a855f7]"
            >
              {language === 'ca' ? '03. Cookies' : language === 'es' ? '03. Cookies' : '03. Cookies'}
            </button>
            <span className="text-[#a855f7]/40 font-bold" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => onOpenLegalTab('credits')}
              className="text-[#ffffff] hover:text-[#00d4ff] transition-colors font-medium hover:underline underline-offset-4 decoration-[#00d4ff]"
            >
              {language === 'ca' ? '04. Crèdits' : language === 'es' ? '04. Créditos' : '04. Credits'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
