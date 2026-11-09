import React, { useState, useEffect } from 'react';
import { Language, LegalDocId } from '../types';
import { ShieldCheck, Cookie, Settings, Check, X, Lock } from 'lucide-react';

interface CookieConsentModalProps {
  language: Language;
  onOpenLegalTab?: (tab: LegalDocId) => void;
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export interface CookiePreferences {
  essential: boolean; // Always true
  preferences: boolean;
  analytics: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'rafa930_cookie_consent_v1';

export const CookieConsentModal: React.FC<CookieConsentModalProps> = ({
  language,
  onOpenLegalTab,
  isOpenExternal = false,
  onCloseExternal,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    essential: true,
    preferences: true,
    analytics: false,
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    // Siempre mostrar la consulta de cookies al oyente al entrar
    setIsVisible(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPrefs(parsed);
      } catch (e) {
        // Fallback
      }
    }
  }, []);

  useEffect(() => {
    if (isOpenExternal) {
      setIsVisible(true);
      setShowConfig(true);
    }
  }, [isOpenExternal]);

  const savePreferences = (newPrefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
    setPrefs(newPrefs);
    setIsVisible(false);
    setShowConfig(false);
    if (onCloseExternal) onCloseExternal();
  };

  const handleAcceptAll = () => {
    const fullConsent: CookiePreferences = {
      essential: true,
      preferences: true,
      analytics: true,
      timestamp: new Date().toISOString(),
    };
    savePreferences(fullConsent);
  };

  const handleRejectNonEssential = () => {
    const minimalConsent: CookiePreferences = {
      essential: true,
      preferences: false,
      analytics: false,
      timestamp: new Date().toISOString(),
    };
    savePreferences(minimalConsent);
  };

  const handleSaveCustom = () => {
    savePreferences({
      ...prefs,
      essential: true,
      timestamp: new Date().toISOString(),
    });
  };

  if (!isVisible) {
    return (
      <button
        type="button"
        onClick={() => {
          setIsVisible(true);
          setShowConfig(true);
        }}
        aria-label="Configuración de Cookies"
        title="Configurar Cookies / RGPD"
        className="fixed bottom-20 xl:bottom-6 left-3 sm:left-6 z-40 p-2.5 rounded-full bg-[#111118]/90 backdrop-blur border border-[#00d4ff]/40 text-[#00d4ff] hover:text-white hover:border-[#00d4ff] shadow-[0_0_15px_rgba(0,212,255,0.25)] hover:scale-110 transition-all cursor-pointer flex items-center justify-center group"
      >
        <Cookie className="w-4 h-4 group-hover:rotate-12 transition-transform" />
      </button>
    );
  }

  const i18n = {
    title: {
      ca: 'Gestió de Cookies i Privacitat',
      es: 'Gestión de Cookies y Privacidad',
      en: 'Cookie & Privacy Management',
    },
    shortDesc: {
      ca: 'Utilitzem emmagatzematge local i cookies tècniques estrictament necessàries per recordar el teu idioma i garantir una navegació segura.',
      es: 'Utilizamos almacenamiento local y cookies técnicas estrictamente necesarias para recordar tu idioma y garantizar una navegación segura.',
      en: 'We use local storage and strictly necessary technical cookies to remember your language and ensure secure browsing.',
    },
    acceptAll: {
      ca: 'Acceptar Totes',
      es: 'Aceptar Todas',
      en: 'Accept All',
    },
    rejectNonEssential: {
      ca: 'Només Necessàries',
      es: 'Solo Necesarias',
      en: 'Essential Only',
    },
    configure: {
      ca: 'Ajustos',
      es: 'Ajustes',
      en: 'Settings',
    },
    save: {
      ca: 'Guardar Selecció',
      es: 'Guardar Selección',
      en: 'Save Selection',
    },
    readPolicy: {
      ca: 'Política de Cookies',
      es: 'Política de Cookies',
      en: 'Cookie Policy',
    },
    catEssentialTitle: {
      ca: '1. Cookies Tècniques (Obligatòries)',
      es: '1. Cookies Técnicas (Obligatorias)',
      en: '1. Technical Cookies (Mandatory)',
    },
    catEssentialDesc: {
      ca: 'Imprescindibles per a seguretat i navegació bàsica.',
      es: 'Imprescindibles para seguridad y navegación básica.',
      en: 'Essential for security and basic navigation.',
    },
    catPrefsTitle: {
      ca: '2. Preferències d’Idioma i Àudio',
      es: '2. Preferencias de Idioma y Audio',
      en: '2. Language & Audio Preferences',
    },
    catPrefsDesc: {
      ca: 'Recorda l’idioma triat i ajustos multimèdia.',
      es: 'Recuerda el idioma elegido y ajustes multimedia.',
      en: 'Remembers selected language and media choices.',
    },
    catAnalyticsTitle: {
      ca: '3. Anàlisi Anònima de Rendiment',
      es: '3. Análisis Anónimo de Rendimiento',
      en: '3. Anonymous Performance Analytics',
    },
    catAnalyticsDesc: {
      ca: 'Mesura de velocitat i reproducció anònima.',
      es: 'Medición de velocidad y reproducción anónima.',
      en: 'Measures speed and playback stats anonymously.',
    },
  };

  return (
    <div className="fixed bottom-20 xl:bottom-6 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-xl z-[9999] pointer-events-auto transition-all animate-fade-in">
      <div className="bg-[#0e0e15]/95 backdrop-blur-xl border border-[#00d4ff]/30 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.85)] p-4 sm:p-5 text-white space-y-3">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-[#22222e] pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#00d4ff]/15 border border-[#00d4ff]/30 text-[#00d4ff] flex items-center justify-center shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00d4ff]" />
              <h3 className="text-xs sm:text-sm font-bold font-['Plus_Jakarta_Sans'] text-white">
                {i18n.title[language]}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRejectNonEssential}
            className="p-1 rounded-md text-[#a1a1b5] hover:text-white hover:bg-[#22222e] transition-colors"
            title="Tancar / Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        {!showConfig ? (
          <div className="space-y-3">
            <p className="text-xs text-[#a1a1b5] leading-relaxed">
              {i18n.shortDesc[language]}{' '}
              <button
                type="button"
                onClick={() => {
                  if (onOpenLegalTab) onOpenLegalTab('cookies');
                }}
                className="text-[#00d4ff] hover:underline font-mono text-[11px]"
              >
                {i18n.readPolicy[language]}
              </button>
            </p>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowConfig(true)}
                className="px-3 py-1.5 rounded-lg border border-[#22222e] bg-[#161622] hover:bg-[#22222e] text-[#a1a1b5] hover:text-white font-mono text-xs transition-colors flex items-center gap-1"
              >
                <Settings className="w-3 h-3" />
                <span>{i18n.configure[language]}</span>
              </button>

              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-3 py-1.5 rounded-lg border border-[#ec4899]/30 bg-[#ec4899]/10 hover:bg-[#ec4899]/20 text-white font-mono text-xs transition-colors"
              >
                {i18n.rejectNonEssential[language]}
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#00d4ff] via-[#a855f7] to-[#ec4899] text-white font-bold font-mono text-xs shadow-md hover:opacity-95 transition-opacity flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{i18n.acceptAll[language]}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Expanded Configuration view inside bottom card */
          <div className="space-y-3 text-xs font-mono pt-1">
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {/* Category 1: Essential */}
              <div className="p-2.5 bg-[#161622] border border-[#22222e] rounded-lg flex items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-white text-[11px]">
                    <Lock className="w-3 h-3 text-[#00d4ff]" />
                    <span>{i18n.catEssentialTitle[language]}</span>
                  </div>
                  <p className="text-[10px] text-[#a1a1b5] font-sans">
                    {i18n.catEssentialDesc[language]}
                  </p>
                </div>
                <span className="text-[9px] font-bold text-[#00d4ff] bg-[#00d4ff]/15 px-2 py-0.5 rounded border border-[#00d4ff]/30 shrink-0">
                  Activas
                </span>
              </div>

              {/* Category 2: Preferences */}
              <div className="p-2.5 bg-[#161622] border border-[#22222e] rounded-lg flex items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-white text-[11px]">
                    {i18n.catPrefsTitle[language]}
                  </div>
                  <p className="text-[10px] text-[#a1a1b5] font-sans">
                    {i18n.catPrefsDesc[language]}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={prefs.preferences}
                    onChange={(e) => setPrefs({ ...prefs, preferences: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-[#22222e] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ec4899]"></div>
                </label>
              </div>

              {/* Category 3: Analytics */}
              <div className="p-2.5 bg-[#161622] border border-[#22222e] rounded-lg flex items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-white text-[11px]">
                    {i18n.catAnalyticsTitle[language]}
                  </div>
                  <p className="text-[10px] text-[#a1a1b5] font-sans">
                    {i18n.catAnalyticsDesc[language]}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-[#22222e] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00d4ff]"></div>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#22222e]">
              <button
                type="button"
                onClick={() => setShowConfig(false)}
                className="px-3 py-1.5 rounded-lg border border-[#22222e] text-[#a1a1b5] hover:text-white text-xs"
              >
                Volver
              </button>

              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-1.5 rounded-lg bg-[#00d4ff] text-[#050507] font-bold text-xs shadow-md hover:opacity-95 transition-opacity"
              >
                {i18n.save[language]}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
