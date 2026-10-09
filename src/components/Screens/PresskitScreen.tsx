import React, { useState } from 'react';
import { Language } from '../../types';
import { Download, Sliders, Printer, Check } from 'lucide-react';
import { Card3D } from '../Card3D';

interface PresskitScreenProps {
  language: Language;
}

export const PresskitScreen: React.FC<PresskitScreenProps> = ({ language }) => {
  const [downloaded, setDownloaded] = useState<string | null>(null);

  const generateOfficialTxtFile = (assetTitle: string) => {
    const content =
      language === 'ca'
        ? `====================================================================
RAFA 930 (Rafael Moreno Román) — DOSSIER ARTÍSTIC & RIDER TÈCNIC 2026
Recurs: ${assetTitle}
====================================================================

1. DADES OFICIALS D'ARTISTA
- Nom artístic: RAFA 930 (Rafael Moreno Román)
- Origen: Mataró / Barri de La Mina (Sant Adrià de Besòs, CP 08930, Barcelona)
- Gènere: Música Urbana · Rap Conscient · Trap Melòdic
- Format de Directe: Veu Principal + DJ (Durada: 45 - 60 minuts)

2. DISCOGRAFIA DESTACADA (2023 - 2026)
- De Vuelta (Nou Tema Destacat, 2026)
- Nose si estaré mañana (Senzill Oficial, 2026)
- La Vida Es Bella (Àlbum Debut, 2026 - Avançament 2026: Tú Aroma)
- EP My World (Trilogia 2025: 1 Minuto y 10 Segundos, Lo Material No Lo Es Todo, Fuck Sistema)
- Un Amor Prohibido, Hago Dinero, Siento, Cambié, No Love, Algo Imposible, Te Quiero, Mi Destino, Pensándote, Una Mirada (2024)
- Vive, sueña en tu mundo (Debut Oficial, Març 2023)

3. RIDER TÈCNIC D'ESCENARI
- 01. Microfonia: 1x Shure SM58 / Beta 58A sense fils (UHF)
- 02. Monitorització: 2x Monitors d'escenari en falca o sistema In-Ear estèreo
- 03. Línia DJ / Pistes: 2x Línia XLR balancejada + taula DJ estàndard
- 04. Il·luminació: Ambientació en tons lila, rosa, vermell i contrallum blanc

4. ENLLAÇOS & CONTACTE DE CONTRACTACIÓ (BOOKING)
- Web Oficial: https://rafa930music-sudo.github.io/Rafa-930-PAGINA-WEB/
- Email: rafa.930music@gmail.com
- WhatsApp Directe: +34 671 59 18 14
- Spotify: https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng
- YouTube: https://youtube.com/@rafa_930
- Instagram: https://instagram.com/rafa930_oficial
- Estudi Digital: https://rafa930music-sudo.github.io/930-Digital/
====================================================================`
        : language === 'es'
        ? `====================================================================
RAFA 930 (Rafael Moreno Román) — DOSSIER ARTÍSTICO & RIDER TÉCNICO 2026
Recurso: ${assetTitle}
====================================================================

1. DATOS OFICIALES DEL ARTISTA
- Nombre artístico: RAFA 930 (Rafael Moreno Román)
- Origen: Mataró / Barrio de La Mina (Sant Adrià de Besòs, CP 08930, Barcelona)
- Género: Música Urbana · Rap Consciente · Trap Melódico
- Formato de Directo: Voz Principal + DJ (Duración: 45 - 60 minutos)

2. DISCOGRAFÍA DESTACADA (2023 - 2026)
- De Vuelta (Nuevo Tema Destacado, 2026)
- Nose si estaré mañana (Sencillo Oficial, 2026)
- La Vida Es Bella (Álbum Debut, 2026 - Adelanto 2026: Tú Aroma)
- EP My World (Trilogía 2025: 1 Minuto y 10 Segundos, Lo Material No Lo Es Todo, Fuck Sistema)
- Un Amor Prohibido, Hago Dinero, Siento, Cambié, No Love, Algo Imposible, Te Quiero, Mi Destino, Pensándote, Una Mirada (2024)
- Vive, sueña en tu mundo (Debut Oficial, Marzo 2023)

3. RIDER TÉCNICO DE ESCENARIO
- 01. Microfonía: 1x Shure SM58 / Beta 58A inalámbrico (UHF)
- 02. Monitorización: 2x Monitores de escenario en cuña o sistema In-Ear estéreo
- 03. Línea DJ / Pistas: 2x Línea XLR balanceada + mesa DJ estándar
- 04. Iluminación: Ambientación en tonos lila, rosa, rojo, azul eléctrico y contraluz blanco

4. ENLACES & CONTACTO DE CONTRATACIÓN (BOOKING)
- Web Oficial: https://rafa930music-sudo.github.io/Rafa-930-PAGINA-WEB/
- Email: rafa.930music@gmail.com
- WhatsApp Directo: +34 671 59 18 14
- Spotify: https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng
- YouTube: https://youtube.com/@rafa_930
- Instagram: https://instagram.com/rafa930_oficial
- Estudio Digital: https://rafa930music-sudo.github.io/930-Digital/
====================================================================`
        : `====================================================================
RAFA 930 (Rafael Moreno Román) — ARTISTIC PRESSKIT & TECHNICAL RIDER 2026
Asset: ${assetTitle}
====================================================================

1. OFFICIAL ARTIST PROFILE
- Artist Name: RAFA 930 (Rafael Moreno Román)
- Origin: Mataró / La Mina (Sant Adrià de Besòs, 08930 Barcelona, Spain)
- Genre: Urban Music · Conscious Rap · Melodic Trap
- Live Format: Lead Vocals + DJ (Duration: 45 - 60 minutes)

2. SELECTED DISCOGRAPHY (2023 - 2026)
- De Vuelta (Featured Single, 2026)
- Nose si estaré mañana (Official Single, 2026)
- La Vida Es Bella (Debut Album, 2026 - 2026 Preview: Tú Aroma)
- EP My World (2025 Trilogy: 1 Minuto y 10 Segundos, Lo Material No Lo Es Todo, Fuck Sistema)
- Un Amor Prohibido, Hago Dinero, Siento, Cambié, No Love, Algo Imposible, Te Quiero, Mi Destino, Pensándote, Una Mirada (2024)
- Vive, sueña en tu mundo (Official Debut, March 2023)

3. STAGE TECHNICAL RIDER
- 01. Microphones: 1x Wireless Shure SM58 / Beta 58A (UHF)
- 02. Monitoring: 2x Stage wedge monitors or stereo In-Ear system
- 03. DJ / Backing Line: 2x Balanced XLR lines + standard DJ mixer
- 04. Lighting: Lilac, pink, crimson red, electric blue atmosphere with crisp white backlight

4. OFFICIAL LINKS & BOOKING CONTACT
- Official Website: https://rafa930music-sudo.github.io/Rafa-930-PAGINA-WEB/
- Email: rafa.930music@gmail.com
- Direct WhatsApp: +34 671 59 18 14
- Spotify: https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng
- YouTube: https://youtube.com/@rafa_930
- Instagram: https://instagram.com/rafa930_oficial
- Digital Studio: https://rafa930music-sudo.github.io/930-Digital/
====================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RAFA-930-Presskit-Rider-${language.toUpperCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(assetTitle);
    setTimeout(() => setDownloaded(null), 3500);
  };

  const assets = [
    {
      name: {
        ca: 'Identitat Visual & Logotips RAFA 930 (.SVG / .PNG)',
        es: 'Identidad Visual & Logotipos RAFA 930 (.SVG / .PNG)',
        en: 'Visual Identity & RAFA 930 Logos (.SVG / .PNG)',
      },
      size: '2.4 MB',
    },
    {
      name: {
        ca: 'Sessió Fotogràfica Editorial 4K (Incrife)',
        es: 'Sesión Fotográfica Editorial 4K (Incrife)',
        en: '4K Editorial Photography Session (Incrife)',
      },
      size: '18.7 MB',
    },
    {
      name: {
        ca: 'Portades Discogràfiques Oficials (Singles & EPs)',
        es: 'Portadas Discográficas Oficiales (Singles & EPs)',
        en: 'Official Album & Single Cover Art',
      },
      size: '12.1 MB',
    },
    {
      name: {
        ca: 'Fitxa Tècnica & Rider d’Escenari Oficial',
        es: 'Ficha Técnica & Rider de Escenario Oficial',
        en: 'Official Technical Spec Sheet & Stage Rider',
      },
      size: '1.1 MB',
    },
  ];

  const fullPdfName =
    language === 'ca'
      ? 'Dossier Complet RAFA 930'
      : language === 'es'
      ? 'Dossier Completo RAFA 930'
      : 'Full RAFA 930 Presskit';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16 space-y-16">
      {/* Editorial Header */}
      <div className="border-b border-[#22222e] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1b5] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
            <span className="text-[#ec4899] font-semibold">
              ELECTRONIC PRESS KIT · RAFA 930
            </span>
            <span aria-hidden="true" className="text-[#00d4ff]">·</span>
            <span>
              {language === 'ca'
                ? 'PER A PROMOTORS, SALES & MITJANS'
                : language === 'es'
                ? 'PARA PROMOTORES, SALAS & MEDIOS'
                : 'FOR PROMOTERS, VENUES & MEDIA'}
            </span>
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl font-semibold text-[#ffffff]">
            {language === 'ca'
              ? 'Dossier Artístic 2026'
              : language === 'es'
              ? 'Dossier Artístico 2026'
              : 'Artistic Presskit 2026'}
          </h1>
          <p className="text-[#a1a1b5] text-base max-w-2xl mt-2 leading-relaxed">
            {language === 'ca'
              ? 'Tota la informació tècnica i biogràfica necessària per a programadors culturals, sales de concerts, festivals i mitjans de comunicació.'
              : language === 'es'
              ? 'Toda la información técnica y biográfica necesaria para programadores culturales, salas de conciertos, festivales y medios de comunicación.'
              : 'All technical and biographical information required by cultural programmers, concert venues, festivals, and media outlets.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => window.print()}
            className="touch-target-48 inline-flex items-center gap-2 bg-[#111118] border border-[#22222e] hover:border-[#a855f7] text-[#ffffff] text-xs font-semibold px-5 py-3.5 rounded-lg transition-all whitespace-nowrap"
          >
            <Printer className="w-4 h-4 text-[#a855f7]" />
            <span>
              {language === 'ca'
                ? 'Imprimir / Guardar PDF'
                : language === 'es'
                ? 'Imprimir / Guardar PDF'
                : 'Print / Save PDF'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => generateOfficialTxtFile(fullPdfName)}
            className="touch-target-48 inline-flex items-center gap-2 gradient-lila-rosa-rojo text-white text-xs font-semibold px-6 py-3.5 rounded-lg hover:opacity-95 transition-all whitespace-nowrap shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>
              {language === 'ca'
                ? 'Descarregar Fitxa Oficial'
                : language === 'es'
                ? 'Descargar Ficha Oficial'
                : 'Download Official Sheet'}
            </span>
          </button>
        </div>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <Card3D
            intensity={5}
            glowColor="rgba(168, 85, 247, 0.22)"
            className="bg-[#111118]/90 backdrop-blur-sm border border-[#22222e] rounded-xl p-6 sm:p-8 space-y-4 shadow-[0_14px_34px_-10px_rgba(0,0,0,0.7)]"
          >
            <h2 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-semibold text-[#ffffff]">
              {language === 'ca'
                ? 'Biografia Executiva per a Programació'
                : language === 'es'
                ? 'Biografía Ejecutiva para Programación'
                : 'Executive Biography for Booking'}
            </h2>
            <div className="text-xs sm:text-sm text-[#a1a1b5] space-y-3 leading-relaxed">
              <p>
                {language === 'ca' ? (
                  <>
                    <strong className="text-[#ffffff]">RAFA 930 (Rafael Moreno Román)</strong> és un artista de música urbana contemporània originari de Mataró i vinculat al barri de La Mina (Sant Adrià de Besòs). La seva proposta fusiona l’honestedat lírica amb el rap conscient, el trap melòdic i ritmes urbans d’autor.
                  </>
                ) : language === 'es' ? (
                  <>
                    <strong className="text-[#ffffff]">RAFA 930 (Rafael Moreno Román)</strong> es un artista de música urbana contemporánea originario de Mataró y vinculado al barrio de La Mina (Sant Adrià de Besòs). Su propuesta fusiona la honestidad lírica con el rap consciente, el trap melódico y ritmos urbanos de autor.
                  </>
                ) : (
                  <>
                    <strong className="text-[#ffffff]">RAFA 930 (Rafael Moreno Román)</strong> is a contemporary urban music artist born in Mataró and rooted in the neighborhood of La Mina (Sant Adrià de Besòs). His sound blends lyrical honesty with conscious rap, melodic trap, and auteur urban rhythms.
                  </>
                )}
              </p>
              <p>
                {language === 'ca' ? (
                  <>
                    Des del seu debut el març de 2023 amb <em>Vive, sueña en tu mundo</em>, ha publicat el 2024 una sòlida etapa de consolidació i romanticisme urbà (<em>Siento, Cambié, Algo Imposible, No Love, Te Quiero, Mi Destino, Pensándote, Una Mirada</em>) juntament amb els hits <em>Un Amor Prohibido</em> i <em>Hago Dinero</em>, seguits de l’EP conceptual <em>My World</em> (2025). En 2026 lidera el seu catàleg amb el nou tema destacat <strong><em>De Vuelta</em></strong>, juntament amb <em>Nose si estaré mañana</em> i <em>Tú Aroma</em> (avançament de l’àlbum <em>La Vida Es Bella</em>).
                  </>
                ) : language === 'es' ? (
                  <>
                    Desde su debut en marzo de 2023 con <em>Vive, sueña en tu mundo</em>, publicó en 2024 una sólida etapa de consolidación y romanticismo urbano (<em>Siento, Cambié, Algo Imposible, No Love, Te Quiero, Mi Destino, Pensándote, Una Mirada</em>) junto a los hits <em>Un Amor Prohibido</em> y <em>Hago Dinero</em>, seguidos del EP conceptual <em>My World</em> (2025). En 2026 lidera su catálogo con el nuevo tema destacado <strong><em>De Vuelta</em></strong>, junto a <em>Nose si estaré mañana</em> y <em>Tú Aroma</em> (adelanto del álbum <em>La Vida Es Bella</em>).
                  </>
                ) : (
                  <>
                    Since his debut in March 2023 with <em>Vive, sueña en tu mundo</em>, he released a strong 2024 catalog (<em>Siento, Cambié, Algo Imposible, No Love, Te Quiero, Mi Destino, Pensándote, Una Mirada</em>) alongside hit singles <em>Un Amor Prohibido</em> and <em>Hago Dinero</em>, followed by the conceptual EP <em>My World</em> (2025). In 2026, he leads his catalog with the new featured release <strong><em>De Vuelta</em></strong>, alongside <em>Nose si estaré mañana</em> and <em>Tú Aroma</em> (preview from his debut album <em>La Vida Es Bella</em>).
                  </>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#22222e] tabular-nums">
              <div className="p-3.5 bg-[#0a0a0f] rounded-lg border border-[#22222e]">
                <span className="text-[11px] font-mono text-[#a1a1b5] block">
                  {language === 'ca'
                    ? 'Gènere Principal'
                    : language === 'es'
                    ? 'Género Principal'
                    : 'Primary Genre'}
                </span>
                <span className="text-xs font-semibold text-[#ffffff]">
                  {language === 'ca'
                    ? 'Urbà · Rap Conscient'
                    : language === 'es'
                    ? 'Urbano · Rap Consciente'
                    : 'Urban · Conscious Rap'}
                </span>
              </div>
              <div className="p-3.5 bg-[#0a0a0f] rounded-lg border border-[#22222e]">
                <span className="text-[11px] font-mono text-[#a1a1b5] block">
                  {language === 'ca'
                    ? 'Format Directe'
                    : language === 'es'
                    ? 'Formato Directo'
                    : 'Live Format'}
                </span>
                <span className="text-xs font-semibold text-[#ec4899]">
                  {language === 'ca'
                    ? 'Veu Principal + DJ'
                    : language === 'es'
                    ? 'Voz Principal + DJ'
                    : 'Lead Vocals + DJ'}
                </span>
              </div>
              <div className="p-3.5 bg-[#0a0a0f] rounded-lg border border-[#22222e]">
                <span className="text-[11px] font-mono text-[#a1a1b5] block">
                  {language === 'ca'
                    ? 'Durada Xou'
                    : language === 'es'
                    ? 'Duración Show'
                    : 'Show Duration'}
                </span>
                <span className="text-xs font-semibold text-[#ffffff]">
                  {language === 'ca'
                    ? '45 – 60 minuts'
                    : language === 'es'
                    ? '45 – 60 minutos'
                    : '45 – 60 minutes'}
                </span>
              </div>
            </div>
          </Card3D>

          <Card3D
            intensity={6}
            glowColor="rgba(0, 212, 255, 0.24)"
            className="bg-[#111118]/90 backdrop-blur-sm border border-[#00d4ff]/35 rounded-xl p-6 sm:p-8 space-y-4 shadow-[0_14px_34px_-10px_rgba(0,0,0,0.7),0_0_20px_rgba(0,212,255,0.08)]"
          >
            <div className="flex items-center gap-2 text-[#00d4ff]">
              <Sliders className="w-5 h-5" />
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#ffffff]">
                {language === 'ca'
                  ? 'Rider Tècnic de Directe'
                  : language === 'es'
                  ? 'Rider Técnico de Directo'
                  : 'Live Technical Rider'}
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs text-[#a1a1b5] font-mono">
              <li>
                {language === 'ca'
                  ? '01. Microfonia: 1x Shure SM58 / Beta 58A sense fils (UHF)'
                  : language === 'es'
                  ? '01. Microfonía: 1x Shure SM58 / Beta 58A inalámbrico (UHF)'
                  : '01. Microphones: 1x Wireless Shure SM58 / Beta 58A (UHF)'}
              </li>
              <li>
                {language === 'ca'
                  ? '02. Monitorització: 2x Monitors d’escenari en falca o sistema In-Ear estèreo'
                  : language === 'es'
                  ? '02. Monitorización: 2x Monitores de escenario en cuña o sistema In-Ear estéreo'
                  : '02. Monitoring: 2x Stage wedge monitors or stereo In-Ear system'}
              </li>
              <li>
                {language === 'ca'
                  ? '03. Línia DJ / Pistes: 2x Línia XLR balancejada + taula DJ estàndard'
                  : language === 'es'
                  ? '03. Línea DJ / Pistas: 2x Línea XLR balanceada + mesa DJ estándar'
                  : '03. DJ / Backing Line: 2x Balanced XLR lines + standard DJ mixer'}
              </li>
              <li className="text-[#00d4ff]">
                {language === 'ca'
                  ? '04. Il·luminació: Ambientació en tons lila, rosa, vermell, blau elèctric i contrallum blanc'
                  : language === 'es'
                  ? '04. Iluminación: Ambientación en tonos lila, rosa, rojo, azul eléctrico y contraluz blanco'
                  : '04. Lighting: Lilac, pink, crimson red, electric blue atmosphere with crisp white backlight'}
              </li>
            </ul>
          </Card3D>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card3D
            intensity={6}
            glowColor="rgba(236, 72, 153, 0.22)"
            className="bg-[#111118]/90 backdrop-blur-sm border border-[#22222e] rounded-xl p-6 sm:p-8 space-y-5 shadow-[0_14px_34px_-10px_rgba(0,0,0,0.7)]"
          >
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#ffffff]">
              {language === 'ca'
                ? 'Materials Gràfics & Premsa'
                : language === 'es'
                ? 'Materiales Gráficos & Prensa'
                : 'Graphic Assets & Press'}
            </h3>
            <p className="text-xs text-[#a1a1b5]">
              {language === 'ca'
                ? 'Descàrrega directa de la fitxa oficial i recursos per a cartelleria, premsa escrita i mitjans digitals.'
                : language === 'es'
                ? 'Descarga directa de la ficha oficial y recursos para cartelería, prensa escrita y medios digitales.'
                : 'Direct download of the official spec sheet and assets for posters, print press, and digital media.'}
            </p>

            <div className="space-y-3 tabular-nums">
              {assets.map((item, idx) => {
                const label = item.name[language];
                return (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#0a0a0f] border border-[#22222e] rounded-lg flex items-center justify-between hover:border-[#ec4899] transition-colors"
                  >
                    <div className="space-y-0.5 pr-2">
                      <span className="text-xs font-semibold text-[#ffffff] block">{label}</span>
                      <span className="text-[11px] font-mono text-[#a1a1b5]">{item.size}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => generateOfficialTxtFile(label)}
                      className="touch-target-44 p-2 rounded-lg bg-[#111118] text-[#ec4899] hover:text-white border border-[#22222e]"
                      title={
                        language === 'ca'
                          ? 'Descarregar recurs'
                          : language === 'es'
                          ? 'Descargar recurso'
                          : 'Download asset'
                      }
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {downloaded && (
              <div className="p-3 bg-[#0a0a0f] border border-[#ec4899] text-[#f472b6] rounded-lg text-xs font-mono flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-[#ec4899]" />
                <span>
                  {language === 'ca'
                    ? `Fitxer descarregat: «${downloaded}»`
                    : language === 'es'
                    ? `Archivo descargado: «${downloaded}»`
                    : `File downloaded: “${downloaded}”`}
                </span>
              </div>
            )}
          </Card3D>

          <div className="bg-[#0a0a0f] border border-[#22222e] p-6 rounded-xl space-y-3">
            <span className="text-xs font-mono text-[#a855f7] block">
              {language === 'ca'
                ? 'CONTACTE DIRECTE DE CONTRACTACIÓ'
                : language === 'es'
                ? 'CONTACTO DIRECTO DE CONTRATACIÓN'
                : 'DIRECT BOOKING CONTACT'}
            </span>
            <p className="text-xs text-[#a1a1b5]">
              {language === 'ca'
                ? 'Per a disponibilitat de dates en la temporada 2026/2027:'
                : language === 'es'
                ? 'Para disponibilidad de fechas en la temporada 2026/2027:'
                : 'For date availability during the 2026/2027 season:'}
            </p>
            <div className="space-y-1.5 text-xs font-mono">
              <p className="text-[#ffffff]">
                Email: <span className="text-[#ec4899]">rafa.930music@gmail.com</span>
              </p>
              <p className="text-[#ffffff]">
                WhatsApp:{' '}
                <a
                  href="https://wa.me/34671591814?text=Hola%20RAFA%20930,%20consulta%20de%20contratacion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ec4899] hover:underline"
                >
                  +34 671 59 18 14
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
