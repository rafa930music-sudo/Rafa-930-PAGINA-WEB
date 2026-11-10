import React from 'react';
import { ScreenId, Language, LegalDocId } from '../types';
import { OFFICIAL_SPOTIFY_URL } from '../data/content';
import { RafaBrandLogo } from './RafaBrandLogo';
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
  onOpenCookieConfig?: () => void;
  language: Language;
  onShowSplash?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenLegalTab,
  onOpenCookieConfig,
  language,
  onShowSplash,
}) => {
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
    <footer className="w-full bg-[#050507] border-t border-[#22222e] text-white pb-16 xl:pb-0">
      <div
        aria-hidden="true"
        className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#a855f7]/30 to-transparent"
      />
      {/* Main Footer Area */}
      <div className="w-full px-4 sm:px-6 md:px-10 py-10 md:py-14 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-white/10 gap-6">
          <div className="flex items-center gap-4">
            <RafaBrandLogo
              onClick={() => {
                if (onShowSplash) onShowSplash();
                else {
                  onNavigate('revista');
                  scrollToTop();
                }
              }}
              title="RAFA 930 · Ver portada / intro"
              size="md"
            />
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
              className="touch-target-44 w-10 h-10 rounded-xl bg-[#0a0f1d] border border-white/10 flex items-center justify-center text-[#8c98b4] hover:text-[#a855f7] hover:border-[#a855f7] transition-colors"
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
              className="touch-target-44 w-10 h-10 rounded-xl bg-[#0a0f1d] border border-[#a855f7]/30 flex items-center justify-center text-[#a855f7] hover:text-white hover:border-[#a855f7] transition-colors"
            >
              <Terminal className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8 text-xs font-mono">
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-3">
              Secciones Principales
            </h4>
            <ul className="space-y-2 text-[#8c98b4]">
              <li>
                <button type="button" onClick={() => { onNavigate('revista'); scrollToTop(); }} className="hover:text-[#a855f7] transition-colors py-0.5">
                  00. Portada & Manifiesto
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleSectionJump('discografia')} className="hover:text-[#a855f7] transition-colors py-0.5">
                  01. Discografía Oficial 2023–2026
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleSectionJump('videos')} className="hover:text-[#a855f7] transition-colors py-0.5">
                  02. Vídeos & Videoclips
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleSectionJump('biografia')} className="hover:text-[#a855f7] transition-colors py-0.5">
                  03. Biografía Oficial
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleSectionJump('fotos')} className="hover:text-[#a855f7] transition-colors py-0.5">
                  04. Archivo Fotográfico
                </button>
              </li>
              <li>
                <button type="button" onClick={() => { onNavigate('contacte'); scrollToTop(); }} className="hover:text-[#a855f7] transition-colors py-0.5">
                  05. {language === 'ca' ? 'Booking & Contacte' : language === 'es' ? 'Booking & Contacto' : 'Booking & Contact'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { onNavigate('redes'); scrollToTop(); }}
                  className="hover:text-[#a855f7] text-[#a855f7] font-bold transition-colors py-0.5 flex items-center gap-1.5"
                >
                  <span>06. {language === 'ca' ? 'Redes Socials Oficials' : language === 'es' ? 'Redes Sociales Oficiales' : 'Official Social Networks'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#a855f7]" />
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ec4899]" />
              <span>{language === 'ca' ? 'Marco Legal & RGPD' : language === 'es' ? 'Apartado Legal & RGPD' : 'Legal & GDPR Section'}</span>
            </h4>
            <ul className="space-y-2 text-[#8c98b4]">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalTab('aviso')}
                  className="hover:text-[#a855f7] transition-colors py-0.5 text-left"
                >
                  01. {language === 'ca' ? 'Avís Legal & LSSI-CE' : language === 'es' ? 'Aviso Legal & LSSI-CE' : 'Legal Notice & LSSI-CE'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalTab('privacitat')}
                  className="hover:text-[#ec4899] transition-colors py-0.5 text-left"
                >
                  02. {language === 'ca' ? 'Privacitat RGPD' : language === 'es' ? 'Privacidad RGPD' : 'GDPR Privacy Policy'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenCookieConfig) onOpenCookieConfig();
                    else onOpenLegalTab('cookies');
                  }}
                  className="hover:text-[#a855f7] transition-colors py-0.5 text-left"
                >
                  03. {language === 'ca' ? 'Política de Cookies' : language === 'es' ? 'Política de Cookies' : 'Cookie Policy'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalTab('credits')}
                  className="hover:text-[#a855f7] transition-colors py-0.5 text-left"
                >
                  04. {language === 'ca' ? 'Crèdits & Fitxa Tècnica' : language === 'es' ? 'Créditos & Ficha Técnica' : 'Credits & Tech Sheet'}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#ffffff] mb-3 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#a855f7]" />
              <span>{language === 'ca' ? 'Plataformes Oficials' : language === 'es' ? 'Plataformas Oficiales' : 'Official Platforms'}</span>
            </h4>
            <ul className="space-y-2 text-[#a1a1b5]">
              <li>
                <a
                  href={OFFICIAL_SPOTIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#a855f7] transition-colors block py-0.5"
                >
                  Spotify Oficial (RAFA 930)
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@rafa_930"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#a855f7] transition-colors block py-0.5"
                >
                  YouTube Oficial (@rafa_930)
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/rafa930_oficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#a855f7] transition-colors block py-0.5"
                >
                  Instagram (@rafa930_oficial)
                </a>
              </li>
              <li>
                <a
                  href="https://rafa930music-sudo.github.io/930-Digital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#a855f7] transition-colors block py-0.5"
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

      {/* Bottom Copyright & Platforms Bar */}
      <div className="w-full bg-[#050507] border-t border-[#22222e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#a1a1b5] font-mono text-[11px] text-center md:text-left">
            <ShieldCheck className="w-4 h-4 text-[#ec4899] shrink-0" />
            <p>
              © 2026 RAFA 930 · Rafael Moreno Román · Todos los derechos reservados
            </p>
          </div>

          {/* Platforms Icons */}
          <div className="flex gap-2.5 flex-wrap justify-center items-center">
            <a href={OFFICIAL_SPOTIFY_URL} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#1DB954] text-[#a1a1b5] hover:text-[#1DB954] hover:scale-105 transition-all" title="Spotify"><SpotifyLogo className="w-4 h-4" /></a>
            <a href="https://youtube.com/@rafa_930" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FF0000] text-[#a1a1b5] hover:text-[#FF0000] hover:scale-105 transition-all" title="YouTube"><YouTubeLogo className="w-4 h-4" /></a>
            <a href="https://www.deezer.com/mx/artist/224265995" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#A238FF] text-[#a1a1b5] hover:text-[#A238FF] hover:scale-105 transition-all" title="Deezer"><DeezerLogo className="w-4 h-4" /></a>
            <a href="https://music.apple.com/es/artist/rafa-930/1724193275" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FA243C] text-[#a1a1b5] hover:text-[#FA243C] hover:scale-105 transition-all" title="Apple Music"><AppleMusicLogo className="w-4 h-4" /></a>
            <a href="https://music.amazon.in/artists/B0CJM7BWF1/rafa-930" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FF9900] text-[#a1a1b5] hover:text-[#FF9900] hover:scale-105 transition-all" title="Amazon Music"><AmazonMusicLogo className="w-4 h-4" /></a>
            <a href="https://tidal.com/artist/41128230" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#00FFFF] text-[#a1a1b5] hover:text-[#00FFFF] hover:scale-105 transition-all" title="Tidal"><TidalLogo className="w-4 h-4" /></a>
            <a href="https://instagram.com/rafa930_oficial" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#EC4899] text-[#a1a1b5] hover:text-[#EC4899] hover:scale-105 transition-all" title="Instagram"><InstagramLogo className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
