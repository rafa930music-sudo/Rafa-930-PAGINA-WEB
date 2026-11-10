import React from 'react';
import { ScreenId, Language, ThemeMode } from '../types';
import { SHEETS_CONFIG } from '../data/translations';
import { Newspaper, Music2, Camera, Send, ShieldCheck } from 'lucide-react';

interface MobileBottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  theme: ThemeMode;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentScreen,
  onNavigate,
  language,
  theme,
}) => {
  const getIcon = (id: ScreenId, active: boolean) => {
    const iconColor = active
      ? 'text-[#a855f7] scale-110'
      : theme === 'light'
      ? 'text-[#3f3f46]'
      : 'text-[#a1a1aa]';

    const className = `w-4 h-4 sm:w-5 sm:h-5 transition-transform ${iconColor}`;
    switch (id) {
      case 'revista':
        return <Newspaper className={className} />;
      case 'discografia':
        return <Music2 className={className} />;
      case 'galeria':
        return <Camera className={className} />;
      case 'contacte':
        return <Send className={className} />;
      case 'legal':
        return <ShieldCheck className={className} />;
      default:
        return <Newspaper className={className} />;
    }
  };

  return (
    <nav
      aria-label="Navegació inferior per a mòbil"
      className={`lg:hidden fixed bottom-0 inset-x-0 z-40 border-t backdrop-blur-xl transition-all shadow-[0_-4px_20px_rgba(0,0,0,0.15)] ${
        theme === 'light'
          ? 'bg-white/95 border-[#d4d4d8] text-[#18181b]'
          : 'bg-[#0e0e11]/95 border-[#27272a] text-[#f4f4f5]'
      } pb-safe`}
    >
      <div className="grid grid-cols-5 items-center px-1 py-1 max-w-lg mx-auto">
        {SHEETS_CONFIG.map((sheet) => {
          const isActive = sheet.id === currentScreen;
          return (
            <button
              key={sheet.id}
              onClick={() => {
                window.dispatchEvent(new CustomEvent('rafa930:user-gesture-triggered'));
                onNavigate(sheet.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-current={isActive ? 'page' : undefined}
              className={`touch-target-44 flex flex-col items-center justify-center py-1 px-1 rounded-lg transition-all relative text-center w-full ${
                isActive
                  ? 'text-[#a855f7] font-bold'
                  : theme === 'light'
                  ? 'text-[#27272a] hover:text-[#09090b]'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              {/* Active Indicator Top Pill - Centered Perfectly */}
              {isActive && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-[#a855f7] shadow-[0_0_10px_#a855f7]" />
              )}

              <div className={`p-1.5 rounded-lg flex items-center justify-center ${isActive ? 'bg-[#a855f7]/15' : ''}`}>
                {getIcon(sheet.id, isActive)}
              </div>

              <span
                className={`text-[9px] sm:text-[10px] font-mono tracking-tight uppercase truncate max-w-full mt-0.5 text-center block ${
                  isActive ? 'text-[#a855f7] font-bold' : ''
                }`}
              >
                {sheet.name[language].split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
