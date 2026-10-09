import React from 'react';
import { ScreenId, Language, LegalDocId } from '../types';
import { OFFICIAL_SPOTIFY_URL } from '../data/content';
import {
  Camera,
  Youtube,
  Terminal,
  ShieldCheck,
  ArrowRight,
  Zap,
  Radio,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenLegalTab: (tab: LegalDocId) => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegalTab, language }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0a0a0f] border-t border-[#00d4ff]/25">
      <div
        aria-hidden="true"
        className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00d4ff]/60 to-transparent shadow-[0_0_12px_rgba(0,212,255,0.4)]"
      />
      {/* Main Footer Area (Artistic, Navigation & Direct Contact) */}
      <div className="w-full px-4 sm:px-6 md:px-10 py-10 md:py-14 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#22222e] gap-6">
          <div>
            <button
              type="button"
              onClick={() => {
                onNavigate('revista');
                scrollToTop();
              }}
              className="font-['Bebas_Neue'] text-2xl sm:text-3xl font-extrabold tracking-tight text-[#ffffff] hover:opacity-90 transition-opacity text-left"
            >
              RAFA <span className="text-gradient-lila-rosa-rojo">930</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={OFFICIAL_SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="touch-target-44 w-10 h-10 rounded-lg bg-[#111118] border border-[#22222e] flex items-center justify-center text-[#a1a1b5] hover:text-[#ffffff] hover:border-[#00d4ff] transition-colors"
            >
              <Radio className="w-4 h-4" />
            </a>

            <a
              href="https://instagram.com/rafa930_oficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="touch-target-44 w-10 h-10 rounded-lg bg-[#111118] border border-[#22222e] flex items-center justify-center text-[#a1a1b5] hover:text-[#ffffff] hover:border-[#ec4899] transition-colors"
            >
              <Camera className="w-4 h-4" />
            </a>

            <a
              href="https://youtube.com/@rafa_930"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="touch-target-44 w-10 h-10 rounded-lg bg-[#111118] border border-[#22222e] flex items-center justify-center text-[#a1a1b5] hover:text-[#ffffff] hover:border-[#e11d48] transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>

            <a
              href="https://rafa930music-sudo.github.io/930-Digital/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="930 Digital"
              className="touch-target-44 w-10 h-10 rounded-lg bg-[#111118] border border-[#00d4ff]/35 flex items-center justify-center text-[#00d4ff] hover:text-[#ffffff] hover:border-[#00d4ff] shadow-[0_0_12px_rgba(0,212,255,0.12)] transition-colors"
            >
              <Terminal className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 text-xs">
          <div>
            <h4 className="font-semibold text-[#ffffff] mb-3">
              {language === 'ca' ? 'Seccions Principals' : language === 'es' ? 'Secciones Principales' : 'Main Sections'}
            </h4>
            <ul className="space-y-2 text-[#a1a1b5]">
              <li>
                <button type="button" onClick={() => { onNavigate('revista'); scrollToTop(); }} className="hover:text-[#ec4899] transition-colors py-0.5">
                  {language === 'ca' ? 'Portada Editorial' : language === 'es' ? 'Portada Editorial' : 'Editorial Home'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => { onNavigate('discografia'); scrollToTop(); }} className="hover:text-[#ec4899] transition-colors py-0.5">
                  {language === 'ca' ? 'Catàleg Discogràfic' : language === 'es' ? 'Catálogo Discográfico' : 'Discography Catalog'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => { onNavigate('galeria'); scrollToTop(); }} className="hover:text-[#ec4899] transition-colors py-0.5">
                  {language === 'ca' ? 'Arxiu Fotogràfic' : language === 'es' ? 'Archivo Fotográfico' : 'Photography Archive'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => { onNavigate('serveis'); scrollToTop(); }} className="hover:text-[#ec4899] transition-colors py-0.5">
                  {language === 'ca' ? 'Serveis & Tarifes' : language === 'es' ? 'Servicios & Tarifas' : 'Services & Rates'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => { onNavigate('presskit'); scrollToTop(); }} className="hover:text-[#ec4899] transition-colors py-0.5">
                  Presskit & Rider
                </button>
              </li>
              <li>
                <button type="button" onClick={() => { onNavigate('contacte'); scrollToTop(); }} className="hover:text-[#ec4899] transition-colors py-0.5">
                  {language === 'ca' ? 'Contacte & Booking' : language === 'es' ? 'Contacto & Booking' : 'Contact & Booking'}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#a1a1b5]">
            <ShieldCheck className="w-4 h-4 text-[#ec4899] shrink-0" />
            <span>
              {language === 'ca'
                ? '© 2026 RAFA 930 · Rafael Moreno Román. Tots els drets reservats.'
                : language === 'es'
                ? '© 2026 RAFA 930 · Rafael Moreno Román. Todos los derechos reservados.'
                : '© 2026 RAFA 930 · Rafael Moreno Román. All rights reserved.'}
            </span>
          </div>

          {/* Separated Legal Links Strip */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono">
            <button
              type="button"
              onClick={() => onOpenLegalTab('aviso')}
              className="text-[#a1a1b5] hover:text-[#ec4899] transition-colors"
            >
              {language === 'ca' ? '01. Avís Legal' : language === 'es' ? '01. Aviso Legal' : '01. Legal Notice'}
            </button>
            <span className="text-[#22222e]" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => onOpenLegalTab('privacitat')}
              className="text-[#a1a1b5] hover:text-[#ec4899] transition-colors"
            >
              {language === 'ca' ? '02. Privacitat RGPD' : language === 'es' ? '02. Privacidad RGPD' : '02. GDPR Privacy'}
            </button>
            <span className="text-[#22222e]" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => onOpenLegalTab('cookies')}
              className="text-[#a1a1b5] hover:text-[#ec4899] transition-colors"
            >
              {language === 'ca' ? '03. Cookies' : language === 'es' ? '03. Cookies' : '03. Cookies'}
            </button>
            <span className="text-[#22222e]" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => onOpenLegalTab('credits')}
              className="text-[#a1a1b5] hover:text-[#ec4899] transition-colors"
            >
              {language === 'ca' ? '04. Crèdits' : language === 'es' ? '04. Créditos' : '04. Credits'}
            </button>
            <button
              type="button"
              onClick={() => onOpenLegalTab('aviso')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#111118] border border-[#00d4ff]/40 hover:border-[#00d4ff] text-[#00d4ff] font-semibold transition-colors shadow-[0_0_10px_rgba(0,212,255,0.12)]"
            >
              <span>
                {language === 'ca'
                  ? 'Apartat Legal'
                  : language === 'es'
                  ? 'Apartado Legal'
                  : 'Legal Center'}
              </span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
