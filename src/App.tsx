import React, { useState, useEffect } from 'react';
import type { ScreenId, Language, LegalDocId } from './types';

// Componentes del diseño original RAFA 930
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ScrollLateralBar } from './components/ScrollLateralBar';
import { FloatingWidgets } from './components/FloatingWidgets';
import { SplashScreen } from './components/SplashScreen';
import { AmbientColorBubbles } from './components/AmbientColorBubbles';
import { AmbientGlobalPlayer } from './components/AmbientGlobalPlayer';
import { CookieConsentModal } from './components/CookieConsentModal';

// Pantallas del diseño original
import { RevistaScreen } from './components/Screens/RevistaScreen';
import { DiscografiaScreen } from './components/Screens/DiscografiaScreen';
import { GaleriaScreen } from './components/Screens/GaleriaScreen';
import { ServeisScreen } from './components/Screens/ServeisScreen';
import { ContacteScreen } from './components/Screens/ContacteScreen';
import { LegalScreen } from './components/Screens/LegalScreen';
import { RedesScreen } from './components/Screens/RedesScreen';

import { applyDynamicSeo } from './utils/seoAndSecurity';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('revista');
  const [language, setLanguage] = useState<Language>('es');
  const [legalTab, setLegalTab] = useState<LegalDocId>('aviso');
  const [cookieConfigOpen, setCookieConfigOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Sincronización dinámica de SEO (títulos, canónicas, OpenGraph)
  useEffect(() => {
    applyDynamicSeo(currentScreen, language);
  }, [currentScreen, language]);

  const handleSelectScreen = (screen: ScreenId) => {
    let target = screen;
    if (
      target === 'home' ||
      (target as string) === 'conciertos' ||
      (target as string) === 'presskit' ||
      (target as string) === 'enllacos'
    ) {
      target = 'revista';
    }
    setCurrentScreen(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLegalTab = (tab: LegalDocId) => {
    setLegalTab(tab);
    setCurrentScreen('legal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLanguage = () => {
    const nextLang: Record<Language, Language> = {
      es: 'ca',
      ca: 'en',
      en: 'es',
    };
    setLanguage(nextLang[language]);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#ffffff] font-sans relative selection:bg-[#ec4899] selection:text-white">
      {/* 1. Splash Screen oficial interactivo */}
      {showSplash && (
        <SplashScreen
          language={language}
          onComplete={() => setShowSplash(false)}
        />
      )}

      {/* 2. Barra de scroll lateral progresiva corporativa */}
      <ScrollLateralBar />

      {/* 3. Fondo atmosférico de estrellas y partículas orbitales */}
      <AmbientColorBubbles currentScreen={currentScreen} />

      {/* 3b. Reproductor de sonido ambiental sutil en segundo plano para todo el sitio */}
      <AmbientGlobalPlayer />

      {/* 4. Cabecera principal con barra de progreso, logotipo oficial y navegación completa */}
      <Header
        currentScreen={currentScreen}
        onSelectScreen={handleSelectScreen}
        onOpenLegalTab={handleOpenLegalTab}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onSelectLanguage={setLanguage}
        onShowSplash={() => setShowSplash(true)}
      />

      {/* 5. Contenido principal con las pantallas del diseño original */}
      <div className="relative z-10 pt-16 sm:pt-18 pb-20 lg:pb-0">
        {(currentScreen === 'revista' || currentScreen === 'home') && (
          <RevistaScreen
            language={language}
            onNavigate={handleSelectScreen}
            onOpenLegalTab={handleOpenLegalTab}
            onShowSplash={() => setShowSplash(true)}
          />
        )}

        {currentScreen === 'discografia' && (
          <DiscografiaScreen language={language} />
        )}

        {currentScreen === 'galeria' && (
          <GaleriaScreen
            language={language}
            onNavigateToServices={() => handleSelectScreen('serveis')}
          />
        )}

        {currentScreen === 'serveis' && (
          <ServeisScreen language={language} />
        )}

        {currentScreen === 'contacte' && (
          <ContacteScreen
            language={language}
            onOpenLegalTab={handleOpenLegalTab}
          />
        )}

        {currentScreen === 'legal' && (
          <LegalScreen
            language={language}
            initialTab={legalTab}
            onNavigate={handleSelectScreen}
          />
        )}

        {currentScreen === 'redes' && (
          <RedesScreen
            language={language}
            onNavigate={handleSelectScreen}
          />
        )}
      </div>

      {/* 6. Pie de página oficial con enlaces a plataformas, créditos y atajos */}
      <Footer
        onNavigate={handleSelectScreen}
        onOpenLegalTab={handleOpenLegalTab}
        onOpenCookieConfig={() => setCookieConfigOpen(true)}
        language={language}
        onShowSplash={() => setShowSplash(true)}
      />

      {/* 7. Barra de navegación inferior móvil */}
      <MobileBottomNav
        currentScreen={currentScreen}
        onNavigate={handleSelectScreen}
        language={language}
        theme="dark"
      />

      {/* 8. Widgets flotantes: botón volver arriba + contacto rápido por WhatsApp */}
      <FloatingWidgets language={language} />

      {/* 9. Modal de consentimiento y configuración de Cookies RGPD */}
      <CookieConsentModal
        language={language}
        onOpenLegalTab={handleOpenLegalTab}
        isOpenExternal={cookieConfigOpen}
        onCloseExternal={() => setCookieConfigOpen(false)}
      />
    </div>
  );
}
