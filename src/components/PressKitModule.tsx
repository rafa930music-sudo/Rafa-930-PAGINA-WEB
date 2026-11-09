import { useState } from 'react';
import { Download, FileText, FileArchive, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { PRESS_KIT_ITEMS, OFFICIAL_EMAIL } from '../data/content';
import type { PressKitItem } from '../types';

const ICON_MAP = {
  PDF: FileText,
  ZIP: FileArchive,
} as const;

export function PressKitModule() {
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const handleDownload = (item: PressKitItem) => {
    setDownloadedId(item.id);
    window.setTimeout(() => setDownloadedId(null), 2500);
  };

  return (
    <section
      aria-labelledby="presskit-heading"
      className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-8 py-16 md:py-24 border-b border-[#1f1938]"
    >
      <div className="max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30">
          <Zap className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
          <span>DOSSIER &amp; SPEC TÉCNICO OFICIAL 2026</span>
        </div>
        <h2
          id="presskit-heading"
          className="text-4xl sm:text-5xl font-black tracking-tighter uppercase text-white"
        >
          PRESS KIT &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ff007f]">
            RIDER TÉCNICO
          </span>
        </h2>
        <p className="text-[#9490b8] text-sm sm:text-base mt-2">
          Documentación oficial verificada para programadores de festivales, salas de conciertos y prensa acreditada. 
          Auditoría de sonido, especificaciones de microfonía y archivo visual en alta resolución.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRESS_KIT_ITEMS.map((item, index) => {
          const Icon = ICON_MAP[item.fileFormat];
          const isDownloaded = downloadedId === item.id;
          const ariaLabel = `Descargar ${item.title}, ${item.fileFormat}, ${item.fileSize}`;
          const isEven = index % 2 === 0;

          return (
            <article
              key={item.id}
              className="relative bg-[#0d0a1d]/80 backdrop-blur-md border border-[#241e42] hover:border-[#00f0ff] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,240,255,0.18)]"
            >
              {/* Corner neon accent indicator */}
              <div 
                className={`absolute top-0 right-8 w-12 h-1 rounded-b ${
                  isEven ? 'bg-[#00f0ff]' : 'bg-[#ff007f]'
                } opacity-70 group-hover:opacity-100 transition-opacity`} 
              />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    isEven 
                      ? 'bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] group-hover:bg-[#00f0ff]/20' 
                      : 'bg-[#ff007f]/10 border border-[#ff007f]/30 text-[#ff007f] group-hover:bg-[#ff007f]/20'
                  }`}>
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#b4b0dc] border border-[#2e2654] bg-[#140f2b] px-3 py-1 rounded-full">
                    {item.fileFormat} · {item.fileSize}
                  </span>
                </div>

                <h3 className="font-black text-xl text-white uppercase tracking-tight mb-2.5 group-hover:text-[#00f0ff] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9490b8] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <a
                href={item.fileUrl}
                download
                onClick={() => handleDownload(item)}
                aria-label={ariaLabel}
                className={`mt-7 h-12 px-6 text-xs font-mono font-bold uppercase rounded-xl inline-flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer ${
                  isDownloaded
                    ? 'bg-[#00f0ff] text-[#040308] shadow-[0_0_20px_rgba(0,240,255,0.6)] font-black'
                    : 'bg-[#15102d] hover:bg-gradient-to-r hover:from-[#00f0ff] hover:to-[#ff007f] text-white hover:text-[#040308] border border-[#33295c] hover:border-transparent'
                }`}
              >
                {isDownloaded ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#040308]" aria-hidden="true" />
                    <span>DESCARGADO CON ÉXITO</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" aria-hidden="true" />
                    <span>DESCARGAR ASSET</span>
                  </>
                )}
              </a>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#6c6791] pt-6 border-t border-[#181330]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00f0ff]" />
          <span>Uso exclusivo para promotores, salas y prensa verificada · RAFA 930</span>
        </div>
        <a
          href={`mailto:${OFFICIAL_EMAIL}`}
          className="text-[#ff007f] hover:text-[#00f0ff] transition-colors font-bold"
        >
          {OFFICIAL_EMAIL}
        </a>
      </div>
    </section>
  );
}
