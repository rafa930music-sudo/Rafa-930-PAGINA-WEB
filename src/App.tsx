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
import { NeonSectionTransition } from './components/NeonSectionTransition';

// Pantallas del diseño original
import { RevistaScreen } from './components/Screens/RevistaScreen';
import { DiscografiaScreen } from './components/Screens/DiscografiaScreen';
import { GaleriaScreen } from './components/Screens/GaleriaScreen';
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
    // Notify audio player of user interaction to guarantee sound on mobile
    window.dispatchEvent(new CustomEvent('rafa930:user-gesture-triggered'));

    let target = screen;
    if (target === 'serveis') {
      target = 'contacte';
    } else if (
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

      {/* 2b. Fondo Atmosférico Global: Iluminación Neón, Malla Ciber-Urbana & Viñeta */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Halo de luz superior violeta */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.14),rgba(192,132,252,0.05)_45%,transparent_75%)] blur-3xl" />
        {/* Halo inferior derecho rosa neón */}
        <div className="absolute -bottom-40 -right-20 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.10),rgba(168,85,247,0.04)_50%,transparent_70%)] blur-3xl" />
        {/* Halo lateral izquierdo violeta eléctrico */}
        <div className="absolute top-1/3 -left-32 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_65%)] blur-2xl" />
        {/* Micro-textura de cuadrícula urbana sutil */}
        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#a855f7_1px,transparent_1px),linear-gradient(to_bottom,#a855f7_1px,transparent_1px)] bg-[size:4.5rem_4.5rem]" />
        {/* Viñeta perimetral cinematográfica */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,7,0.85)_100%)]" />
      </div>

      {/* 3. Fondo atmosférico de estrellas y partículas orbitales */}
      <AmbientColorBubbles currentScreen={currentScreen} />

      {/* 3b. Reproductor de sonido ambiental sutil en segundo plano para todo el sitio */}
      <AmbientGlobalPlayer />

      {/* 3c. Transición de cambio de sección con logotipo de neón oficial */}
      <NeonSectionTransition currentScreen={currentScreen} language={language} />

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
      <div className="relative z-10 pt-16 sm:pt-18 pb-24 lg:pb-0">
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
            onNavigateToBooking={() => handleSelectScreen('contacte')}
          />
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
