import React, { useEffect } from 'react';
import { ScreenId, Language, ThemeMode } from '../types';
import { SHEETS_CONFIG, SheetMeta, UI_TRANSLATIONS } from '../data/translations';
import { ChevronLeft, ChevronRight, Bookmark, Compass, Sparkles } from 'lucide-react';

interface EditorialSheetProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  theme: ThemeMode;
  children: React.ReactNode;
}

export const EditorialSheet: React.FC<EditorialSheetProps> = ({
  currentScreen,
  onNavigate,
  language,
  theme,
  children,
}) => {
  const currentIndex = SHEETS_CONFIG.findIndex((s) => s.id === currentScreen);
  const currentSheet = SHEETS_CONFIG[currentIndex] || SHEETS_CONFIG[0];

  const prevSheet: SheetMeta =
    currentIndex > 0 ? SHEETS_CONFIG[currentIndex - 1] : SHEETS_CONFIG[SHEETS_CONFIG.length - 1];
  const nextSheet: SheetMeta =
    currentIndex < SHEETS_CONFIG.length - 1 ? SHEETS_CONFIG[currentIndex + 1] : SHEETS_CONFIG[0];

  // Keyboard arrow navigation between sheets
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight') {
        onNavigate(nextSheet.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft') {
        onNavigate(prevSheet.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, nextSheet.id, prevSheet.id, onNavigate]);

  const handleSheetSwitch = (id: ScreenId) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col relative transition-colors duration-300">
      {/* ── TOP EDITORIAL FOLIO RIBBON ── */}
      <div
        className={`w-full border-b transition-colors ${
          theme === 'light'
            ? 'bg-white/90 border-[#e4e4e7] text-[#18181b]'
            : 'bg-[#18181b]/95 border-[#27272a] text-[#f4f4f5]'
        } backdrop-blur-md sticky top-20 z-30 shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Sheet Folio Indicator */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#7c3aed]/15 border border-[#8b5cf6]/40 text-[#d0bcff] font-mono text-[11px] font-bold tracking-wider uppercase">
              <Bookmark className="w-3 h-3 text-[#ffb95f]" />
              <span>
                {UI_TRANSLATIONS.sheetNav.folioLabel[language]} {currentSheet.number} / {currentSheet.total}
              </span>
            </div>

            <span
              className={`text-xs font-semibold uppercase tracking-wider hidden sm:inline ${
                theme === 'light' ? 'text-[#27272a]' : 'text-[#a1a1aa]'
              }`}
            >
              {currentSheet.name[language]}
            </span>

            <span className={`hidden md:inline text-[11px] font-mono ${theme === 'light' ? 'text-[#b45309]' : 'text-[#ffb95f]'}`}>
              · {currentSheet.categoryTag[language]}
            </span>
          </div>

          {/* Center/Right: Quick 7-Sheet Switcher Ribbon */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar max-w-full">
            {SHEETS_CONFIG.map((sheet, idx) => {
              const isActive = sheet.id === currentScreen;
              return (
                <button
                  key={sheet.id}
                  onClick={() => handleSheetSwitch(sheet.id)}
                  title={`${sheet.number}. ${sheet.name[language]}`}
                  className={`touch-target-44 px-2.5 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap select-none ${
                    isActive
                      ? 'bg-[#7c3aed] text-white font-bold shadow-md scale-105'
                      : theme === 'light'
                      ? 'bg-[#f4f4f5] border border-[#d4d4d8] hover:bg-[#e4e4e7] text-[#18181b] font-medium'
                      : 'bg-[#27272a]/60 hover:bg-[#27272a] text-[#a1a1aa] hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-[#ffb95f]' : 'opacity-60'}>{sheet.number}</span>
                  <span className="hidden sm:inline text-[11px] font-medium">{sheet.name[language]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── ACTUAL SCREEN / SHEET CONTENT ── */}
      <div className="flex-1 w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
        {children}
      </div>

      {/* ── BOTTOM EDITORIAL SHEET PAGINATION BAR ("PASSAR DE HOJA") ── */}
      <section
        aria-label="Navegació entre fulls de la revista"
        className={`w-full border-t border-b my-8 transition-colors ${
          theme === 'light'
            ? 'bg-[#ffffff] border-[#e4e4e7] text-[#18181b]'
            : 'bg-[#111114] border-[#27272a] text-[#f4f4f5]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Previous Sheet */}
            <button
              onClick={() => handleSheetSwitch(prevSheet.id)}
              className={`touch-target-48 w-full md:w-auto px-5 py-3 rounded-xl border flex items-center justify-start md:justify-center gap-3 transition-all active:scale-98 group ${
                theme === 'light'
                  ? 'bg-white border-[#d4d4d8] hover:border-[#7c3aed] hover:bg-[#f8f9fa] text-[#09090b] shadow-sm'
                  : 'bg-[#18181b] border-[#27272a] hover:border-[#8b5cf6] text-[#f4f4f5]'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/15 flex items-center justify-center text-[#7c3aed] group-hover:-translate-x-0.5 transition-transform">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className={`text-[10px] font-mono uppercase tracking-wider ${theme === 'light' ? 'text-[#b45309]' : 'text-[#ffb95f]'}`}>
                  ← {UI_TRANSLATIONS.sheetNav.prevSheet[language]} ({prevSheet.number}/{prevSheet.total})
                </p>
                <p className="text-xs sm:text-sm font-bold truncate max-w-[200px]">
                  {prevSheet.name[language]}
                </p>
              </div>
            </button>

            {/* Center: Sheet Progress Indicators & Keyboard Help */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1.5">
                {SHEETS_CONFIG.map((sheet, idx) => {
                  const isActive = sheet.id === currentScreen;
                  return (
                    <button
                      key={sheet.id}
                      onClick={() => handleSheetSwitch(sheet.id)}
                      className={`touch-target-44 transition-all duration-300 rounded-full flex items-center justify-center font-mono text-xs ${
                        isActive
                          ? 'w-9 h-9 bg-[#7c3aed] text-white font-bold shadow-[0_0_12px_rgba(124,58,237,0.5)] scale-110'
                          : theme === 'light'
                          ? 'w-8 h-8 bg-[#e4e4e7] text-[#18181b] font-semibold hover:bg-[#d4d4d8]'
                          : 'w-8 h-8 bg-[#27272a] text-[#a1a1aa] hover:bg-[#3f3f46]'
                      }`}
                      title={sheet.name[language]}
                    >
                      {sheet.number}
                    </button>
                  );
                })}
              </div>
              <p
                className={`text-[10px] font-mono tracking-widest uppercase hidden lg:block ${
                  theme === 'light' ? 'text-[#52525b]' : 'text-[#71717a]'
                }`}
              >
                {UI_TRANSLATIONS.sheetNav.keyboardHint[language]}
              </p>
            </div>

            {/* Right: Next Sheet */}
            <button
              onClick={() => handleSheetSwitch(nextSheet.id)}
              className={`touch-target-48 w-full md:w-auto px-5 py-3 rounded-xl border flex items-center justify-end md:justify-center gap-3 transition-all active:scale-98 group ${
                theme === 'light'
                  ? 'bg-white border-[#d4d4d8] hover:border-[#7c3aed] hover:bg-[#f8f9fa] text-[#09090b] shadow-sm'
                  : 'bg-[#18181b] border-[#27272a] hover:border-[#8b5cf6] text-[#f4f4f5]'
              }`}
            >
              <div className="text-right">
                <p className={`text-[10px] font-mono uppercase tracking-wider ${theme === 'light' ? 'text-[#b45309]' : 'text-[#ffb95f]'}`}>
                  {UI_TRANSLATIONS.sheetNav.nextSheet[language]} ({nextSheet.number}/{nextSheet.total}) →
                </p>
                <p className="text-xs sm:text-sm font-bold truncate max-w-[200px]">
                  {nextSheet.name[language]}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/15 flex items-center justify-center text-[#7c3aed] group-hover:translate-x-0.5 transition-transform">
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
