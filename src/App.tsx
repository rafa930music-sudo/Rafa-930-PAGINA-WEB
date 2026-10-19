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
import { EnllacosScreen } from './components/Screens/EnllacosScreen';
import { ContacteScreen } from './components/Screens/ContacteScreen';
import { LegalScreen } from './components/Screens/LegalScreen';

const VALID_SCREENS: ScreenId[] = [
  'revista',
  'discografia',
  'galeria',
  'serveis',
  'presskit',
  'enllacos',
  'contacte',
  'legal',
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(() => {
    let hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'links' || hash === 'enlaces') hash = 'enllacos';
    if (VALID_SCREENS.includes(hash as ScreenId)) return hash as ScreenId;
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

  const [showSplash, setShowSplash] = useState<boolean>(true);

  const handleCompleteSplash = React.useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleTriggerSplash = React.useCallback(() => {
    setShowSplash(true);
  }, []);

  // Sync URL hash for deep linking & browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      let hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'links' || hash === 'enlaces') hash = 'enllacos';
      if (VALID_SCREENS.includes(hash as ScreenId)) {
        setCurrentScreen(hash as ScreenId);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light');
    root.classList.add('dark');
  }, []);

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
      className="min-h-[100dvh] w-full bg-[#050507] text-[#ffffff] relative overflow-x-hidden selection:bg-[#ec4899] selection:text-white flex flex-col justify-between"
    >
      {showSplash && (
        <SplashScreen
          language={language}
          onComplete={handleCompleteSplash}
        />
      )}

      <AmbientColorBubbles
        currentScreen={currentScreen}
        isPlayingMusic={false}
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

        {currentScreen === 'enllacos' && (
          <EnllacosScreen language={language} onSelectScreen={handleScreenChange} />
        )}

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
