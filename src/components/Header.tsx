import React, { useState, useEffect } from 'react';
import { ScreenId, Language, ThemeMode, LegalDocId } from '../types';
import {
  Menu,
  X,
  ArrowRight,
  Sun,
  Moon,
  ShieldCheck,
  Home,
  Disc3,
  Camera,
  Briefcase,
  FileText,
  Mail,
} from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  onOpenLegalTab?: (tab: LegalDocId) => void;
  language: Language;
  onToggleLanguage: () => void;
  onSelectLanguage?: (lang: Language) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onSelectScreen,
  onOpenLegalTab,
  language,
  onToggleLanguage,
  onSelectLanguage,
  theme,
  onToggleTheme,
}) => {
  const [burgerOpen, setBurgerOpen] = useState(false);

  // Close BurgerNav on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setBurgerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems: {
    id: ScreenId;
    label: Record<Language, string>;
    shortLabel: Record<Language, string>;
    Icon: React.FC<{ className?: string }>;
  }[] = [
    {
      id: 'revista',
      label: { ca: 'Portada', es: 'Portada', en: 'Home' },
      shortLabel: { ca: 'Portada', es: 'Portada', en: 'Home' },
      Icon: Home,
    },
    {
      id: 'discografia',
      label: { ca: 'Discografia', es: 'Discografía', en: 'Discography' },
      shortLabel: { ca: 'Música', es: 'Música', en: 'Music' },
      Icon: Disc3,
    },
    {
      id: 'galeria',
      label: { ca: 'Fotografia', es: 'Fotografía', en: 'Photography' },
      shortLabel: { ca: 'Fotos', es: 'Fotos', en: 'Photos' },
      Icon: Camera,
    },
    {
      id: 'serveis',
      label: { ca: 'Serveis', es: 'Servicios', en: 'Services' },
      shortLabel: { ca: 'Serveis', es: 'Servicios', en: 'Services' },
      Icon: Briefcase,
    },
    {
      id: 'presskit',
      label: { ca: 'Presskit', es: 'Presskit', en: 'Presskit' },
      shortLabel: { ca: 'Presskit', es: 'Presskit', en: 'Presskit' },
      Icon: FileText,
    },
    {
      id: 'contacte',
      label: { ca: 'Contacte', es: 'Contacto', en: 'Contact' },
      shortLabel: { ca: 'Contacte', es: 'Contacto', en: 'Contact' },
      Icon: Mail,
    },
  ];

  const legalSubItems: { id: LegalDocId; label: Record<Language, string> }[] = [
    { id: 'aviso', label: { ca: '01. Avís Legal & LSSI-CE', es: '01. Aviso Legal & LSSI-CE', en: '01. Legal Notice & LSSI-CE' } },
    { id: 'privacitat', label: { ca: '02. Privacitat RGPD', es: '02. Privacidad RGPD', en: '02. GDPR Privacy Policy' } },
    { id: 'cookies', label: { ca: '03. Política de Cookies', es: '03. Política de Cookies', en: '03. Cookie Policy' } },
    { id: 'credits', label: { ca: '04. Crèdits & Fitxa Tècnica', es: '04. Créditos & Ficha Técnica', en: '04. Credits & Tech Sheet' } },
  ];

  const handleNavClick = (id: ScreenId) => {
    onSelectScreen(id);
    setBurgerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLegalClick = (tab: LegalDocId) => {
    if (onOpenLegalTab) {
      onOpenLegalTab(tab);
    } else {
      onSelectScreen('legal');
    }
    setBurgerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const languages: Language[] = ['ca', 'es', 'en'];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050507]/95 backdrop-blur-xl border-b border-[#00d4ff]/25 w-full transition-colors shadow-[0_4px_25px_rgba(0,212,255,0.08)]">
        <div
          aria-hidden="true"
          className="h-[2px] w-full bg-gradient-to-r from-[#a855f7] via-[#00d4ff] to-[#ec4899] shadow-[0_0_12px_rgba(0,212,255,0.65)]"
        />
        <div className="flex justify-between items-center w-full px-3 sm:px-6 md:px-10 h-16 sm:h-18 max-w-7xl mx-auto gap-2">
          {/* Zone 1: Brand Wordmark -> RAFA 930 */}
          <button
            type="button"
            onClick={() => handleNavClick('revista')}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#ffffff] hover:opacity-90 transition-opacity font-['Bebas_Neue'] whitespace-nowrap shrink-0 focus:outline-none"
          >
            RAFA <span className="text-gradient-lila-rosa-rojo">930</span>
          </button>

          {/* Zone 2: Clean Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden xl:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-medium transition-colors relative py-1 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#ffffff] font-semibold underline decoration-[#00d4ff] decoration-2 underline-offset-8'
                      : 'text-[#a1a1b5] hover:text-[#00d4ff] hover:underline hover:decoration-[#00d4ff] hover:underline-offset-8'
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
                  )}
                  {item.label[language]}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language Selector + Theme + BurgerNav Button (Visible on all viewports) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Direct CA · ES · EN Segmented Selector */}
            <div
              role="group"
              aria-label="Selector d'idioma / Selector de idioma / Language selector"
              className="flex items-center p-0.5 rounded-lg border border-[#22222e] bg-[#111118]"
            >
              {languages.map((lang) => {
                const active = language === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => (onSelectLanguage ? onSelectLanguage(lang) : onToggleLanguage())}
                    className={`px-2 py-1.5 rounded-md text-[11px] sm:text-xs font-mono transition-all uppercase whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#e11d48] text-white font-bold shadow-sm'
                        : 'text-[#a1a1b5] hover:text-[#ffffff]'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onToggleTheme}
              className="touch-target-44 w-10 h-10 sm:w-auto sm:px-3 sm:py-2 rounded-lg border border-[#22222e] bg-[#111118] text-xs font-mono text-[#a1a1b5] hover:text-[#ffffff] hover:border-[#a855f7] transition-colors flex items-center justify-center gap-1.5 shrink-0"
              aria-label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#ec4899]" />
              ) : (
                <Moon className="w-4 h-4 text-[#a855f7]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('contacte')}
              className="hidden md:inline-flex items-center gap-1.5 gradient-lila-rosa-rojo text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:opacity-95 transition-opacity whitespace-nowrap shrink-0 touch-target-44 shadow-md"
            >
              <span>
                {language === 'ca' ? 'Contactar' : language === 'es' ? 'Contactar' : 'Contact'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Always-Visible BurgerNav Button in Header */}
            <button
              type="button"
              onClick={() => setBurgerOpen((prev) => !prev)}
              aria-expanded={burgerOpen}
              aria-label={
                language === 'ca'
                  ? 'Obrir menú de navegació'
                  : language === 'es'
                  ? 'Abrir menú de navegación'
                  : 'Open navigation menu'
              }
              className="touch-target-44 px-3 h-10 sm:h-11 flex items-center justify-center gap-2 rounded-lg border border-[#00d4ff]/40 bg-[#111118] hover:border-[#00d4ff] text-[#ffffff] shadow-[0_0_12px_rgba(0,212,255,0.15)] transition-all shrink-0"
            >
              {burgerOpen ? (
                <X className="w-5 h-5 text-[#00d4ff]" />
              ) : (
                <Menu className="w-5 h-5 text-[#00d4ff]" />
              )}
              <span className="hidden sm:inline text-xs font-mono uppercase tracking-wider text-[#00d4ff]">
                {language === 'ca' ? 'Menú' : language === 'es' ? 'Menú' : 'Menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Responsive BurgerNav Drawer (Works on Mobile, Tablet & Desktop) */}
      {burgerOpen && (
        <div
          className="fixed inset-0 z-[60] bg-[#050507]/85 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => setBurgerOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#0a0a0f] border-l border-[#22222e] h-full flex flex-col justify-between overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Top Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 h-16 sm:h-18 border-b border-[#22222e] shrink-0">
              <span className="font-['Bebas_Neue'] text-2xl font-extrabold tracking-tight text-[#ffffff]">
                RAFA <span className="text-gradient-lila-rosa-rojo">930</span>
              </span>
              <button
                type="button"
                onClick={() => setBurgerOpen(false)}
                aria-label="Close menu"
                className="touch-target-44 w-10 h-10 flex items-center justify-center rounded-lg border border-[#22222e] bg-[#111118] hover:border-[#ec4899] text-[#ffffff]"
              >
                <X className="w-5 h-5 text-[#ec4899]" />
              </button>
            </div>

            {/* Drawer Body: Main Sections + Separated Legal Section */}
            <div className="flex-1 px-5 sm:px-6 py-6 space-y-8">
              {/* 1. Primary Website Sections */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase text-[#a855f7] tracking-wider">
                  {language === 'ca'
                    ? 'Navegació Principal'
                    : language === 'es'
                    ? 'Navegación Principal'
                    : 'Main Navigation'}
                </div>
                <nav className="flex flex-col divide-y divide-[#22222e]">
                  {navItems.map((item, idx) => {
                    const isActive = currentScreen === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        className={`font-['Cormorant_Garamond'] text-2xl sm:text-3xl text-left flex items-center justify-between py-3 transition-colors ${
                          isActive
                            ? 'text-[#ec4899] font-semibold'
                            : 'text-[#ffffff] hover:text-[#a855f7]'
                        }`}
                      >
                        <span>
                          0{idx + 1}. {item.label[language]}
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#a1a1b5]" />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* 2. Separated & Ordered Legal Section */}
              <div className="p-4 rounded-xl bg-[#111118] border border-[#22222e] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#ec4899] font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      {language === 'ca'
                        ? 'APARTAT LEGAL & RGPD'
                        : language === 'es'
                        ? 'APARTADO LEGAL & RGPD'
                        : 'LEGAL & GDPR SECTION'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0a0a0f] border border-[#22222e] text-[#a1a1b5]">
                    {language === 'ca' ? 'Separat' : language === 'es' ? 'Separado' : 'Dedicated'}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-1.5">
                  {legalSubItems.map((leg) => (
                    <button
                      key={leg.id}
                      type="button"
                      onClick={() => handleLegalClick(leg.id)}
                      className="w-full text-left px-3 py-2 rounded-lg bg-[#0a0a0f] border border-[#22222e] hover:border-[#ec4899] text-xs font-mono text-[#a1a1b5] hover:text-[#ffffff] flex items-center justify-between transition-colors"
                    >
                      <span>{leg.label[language]}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#ec4899]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer: Language Switcher & Direct Contact */}
            <div className="p-5 sm:p-6 border-t border-[#22222e] bg-[#050507] space-y-3 shrink-0 pb-24 xl:pb-6">
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => (onSelectLanguage ? onSelectLanguage(lang) : onToggleLanguage())}
                    className={`py-2 rounded-lg font-mono text-xs uppercase border transition-all ${
                      language === lang
                        ? 'gradient-lila-rosa-rojo text-white border-transparent font-bold'
                        : 'bg-[#111118] border-[#22222e] text-[#a1a1b5] hover:text-[#ffffff]'
                    }`}
                  >
                    {lang === 'ca' ? 'Català' : lang === 'es' ? 'Español' : 'English'}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleNavClick('contacte')}
                className="touch-target-48 w-full flex items-center justify-center gap-2 gradient-lila-rosa-rojo text-white font-semibold text-xs py-3 rounded-lg shadow-md"
              >
                <span>
                  {language === 'ca'
                    ? 'Contacte Directe'
                    : language === 'es'
                    ? 'Contacto Directo'
                    : 'Direct Contact'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permanent Fixed Mobile & Tablet Bottom Navigation Bar */}
      <nav
        aria-label={
          language === 'ca'
            ? 'Navegació inferior mòbil'
            : language === 'es'
            ? 'Navegación inferior móvil'
            : 'Mobile bottom navigation'
        }
        className="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#050507]/95 backdrop-blur-xl border-t border-[#00d4ff]/30 shadow-[0_-6px_28px_rgba(0,0,0,0.85)] pb-[env(safe-area-inset-bottom)]"
      >
        <div
          aria-hidden="true"
          className="h-[1.5px] w-full bg-gradient-to-r from-[#a855f7] via-[#00d4ff] to-[#ec4899] shadow-[0_0_10px_rgba(0,212,255,0.6)]"
        />
        <div className="grid grid-cols-6 items-center h-16 max-w-2xl mx-auto px-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            const IconComponent = item.Icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex flex-col items-center justify-center h-full gap-1 px-1 transition-all focus:outline-none ${
                  isActive
                    ? 'text-[#00d4ff]'
                    : 'text-[#a1a1b5] hover:text-[#ffffff]'
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute top-1 w-6 h-0.5 rounded-full bg-[#00d4ff] shadow-[0_0_10px_#00d4ff]"
                  />
                )}
                <div
                  className={`flex items-center justify-center w-8 h-7 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#00d4ff]/15 border border-[#00d4ff]/40 shadow-[0_0_12px_rgba(0,212,255,0.25)]'
                      : ''
                  }`}
                >
                  <IconComponent
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-[#00d4ff] scale-110' : 'text-[#a1a1b5]'
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] font-mono tracking-tight leading-none truncate max-w-full ${
                    isActive ? 'text-[#ffffff] font-bold' : 'text-[#a1a1b5]'
                  }`}
                >
                  {item.shortLabel[language]}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
