/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenId, Language, ThemeMode, LegalDocId } from './types';
import { applyDynamicSeo, installRuntimeSecurityGuards, isSearchCrawler } from './utils/seoAndSecurity';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWidgets } from './components/FloatingWidgets';
import { SplashScreen } from './components/SplashScreen';
import { AmbientColorBubbles } from './components/AmbientColorBubbles';
import { RevistaScreen } from './components/Screens/RevistaScreen';
import { DiscografiaScreen } from './components/Screens/DiscografiaScreen';
import { GaleriaScreen } from './components/Screens/GaleriaScreen';
import { ServeisScreen } from './components/Screens/ServeisScreen';
import { PresskitScreen } from './components/Screens/PresskitScreen';
import { ContacteScreen } from './components/Screens/ContacteScreen';
import { LegalScreen } from './components/Screens/LegalScreen';

const VALID_SCREENS: ScreenId[] = [
  'revista',
  'discografia',
  'galeria',
  'serveis',
  'presskit',
  'contacte',
  'legal',
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(() => {
    const hash = window.location.hash.replace('#', '') as ScreenId;
    if (VALID_SCREENS.includes(hash)) return hash;
    return 'revista';
  });
  const [legalInitialTab, setLegalInitialTab] = useState<LegalDocId>('aviso');

  // Language state with URL query or localStorage persistence
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'ca' || urlLang === 'es' || urlLang === 'en') return urlLang;
      const saved = localStorage.getItem('rafa930_lang');
      if (saved === 'ca' || saved === 'es' || saved === 'en') return saved;
    } catch {}
    return 'es';
  });

  // Dark/Light Theme state with document sync
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('rafa930_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return 'dark';
  });

  const [showSplash, setShowSplash] = useState<boolean>(() => {
    if (isSearchCrawler()) return false;
    try {
      if (sessionStorage.getItem('rafa930_splash_seen') === '1') return false;
    } catch {}
    return true;
  });

  // Sync URL hash for deep linking & browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ScreenId;
      if (VALID_SCREENS.includes(hash)) {
        setCurrentScreen(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    try {
      localStorage.setItem('rafa930_theme', theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('rafa930_lang', language);
    } catch {}
    applyDynamicSeo(currentScreen, language);
  }, [currentScreen, language]);

  useEffect(() => {
    const cleanupSecurity = installRuntimeSecurityGuards();
    return () => cleanupSecurity();
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => {
      if (prev === 'ca') return 'es';
      if (prev === 'es') return 'en';
      return 'ca';
    });
  };

  const handleScreenChange = (screen: ScreenId) => {
    setCurrentScreen(screen);
    try {
      window.history.replaceState(null, '', `#${screen}`);
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLegalTab = (tab: LegalDocId) => {
    setLegalInitialTab(tab);
    setCurrentScreen('legal');
    try {
      window.history.replaceState(null, '', '#legal');
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const skipText = {
    ca: 'Saltar al contingut principal',
    es: 'Saltar al contenido principal',
    en: 'Skip to main content',
  }[language];

  return (
    <div
      className={`min-h-screen ${
        theme === 'light' ? 'bg-[#ffffff] text-[#050507]' : 'bg-[#050507] text-[#ffffff]'
      } pb-18 xl:pb-0 relative overflow-x-hidden selection:bg-[#ec4899] selection:text-white flex flex-col justify-between transition-colors duration-300`}
    >
      {showSplash && (
        <SplashScreen
          language={language}
          onComplete={() => {
            try {
              sessionStorage.setItem('rafa930_splash_seen', '1');
            } catch {}
            setShowSplash(false);
          }}
        />
      )}

      <AmbientColorBubbles
        currentScreen={currentScreen}
        isPlayingMusic={false}
        theme={theme}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2.5 focus:bg-[#a855f7] focus:text-white focus:font-semibold focus:rounded-md"
      >
        {skipText}
      </a>

      <Header
        currentScreen={currentScreen}
        onSelectScreen={handleScreenChange}
        onOpenLegalTab={handleOpenLegalTab}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onSelectLanguage={setLanguage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main id="main-content" className="flex-1 relative z-10 w-full pt-16 sm:pt-18">
        {currentScreen === 'revista' && (
          <RevistaScreen
            language={language}
            onNavigate={handleScreenChange}
            onOpenLegalTab={handleOpenLegalTab}
          />
        )}

        {currentScreen === 'discografia' && (
          <DiscografiaScreen
            language={language}
          />
        )}

        {currentScreen === 'galeria' && (
          <GaleriaScreen
            language={language}
            onNavigateToServices={() => handleScreenChange('serveis')}
          />
        )}

        {currentScreen === 'serveis' && <ServeisScreen language={language} />}

        {currentScreen === 'presskit' && <PresskitScreen language={language} />}

        {currentScreen === 'contacte' && (
          <ContacteScreen language={language} onOpenLegalTab={handleOpenLegalTab} />
        )}

        {currentScreen === 'legal' && (
          <LegalScreen
            language={language}
            initialTab={legalInitialTab}
            onNavigate={handleScreenChange}
          />
        )}
      </main>

      <Footer
        onNavigate={handleScreenChange}
        onOpenLegalTab={handleOpenLegalTab}
        language={language}
      />

      <FloatingWidgets language={language} hasMiniPlayer={false} />
    </div>
  );
}
