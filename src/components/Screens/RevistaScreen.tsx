import React, { useState } from 'react';
import { ScreenId, Language, LegalDocId } from '../../types';
import { ARTIST_IMAGES, COLLABORATORS, OFFICIAL_SPOTIFY_URL } from '../../data/content';
import {
  sanitizeUserInput,
  isValidEmail,
  isValidPhone,
  checkSubmissionRateLimit,
  submitToFormspree,
  FORMSPREE_ENDPOINT,
} from '../../utils/seoAndSecurity';
import { Spatial3DCanvas } from '../Spatial3DCanvas';
import { Card3D } from '../Card3D';
import { SectionColorBubbles } from '../AmbientColorBubbles';
import {
  Play,
  ArrowRight,
  Mic,
  Camera,
  Terminal,
  Share2,
  ExternalLink,
  Copy,
  Check,
  Send,
  AlertCircle,
  Radio,
  Loader2,
} from 'lucide-react';

interface RevistaScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  onOpenLegalTab?: (tab: LegalDocId) => void;
}

const TIMELINE_I18N: {
  year: string;
  badge?: Record<Language, string>;
  title: Record<Language, string>;
  description: Record<Language, string>;
  highlight?: boolean;
}[] = [
  {
    year: '2023 · 24 Mar',
    badge: { ca: 'PRIMER TEMA OFICIAL', es: 'PRIMER TEMA OFICIAL', en: 'FIRST OFFICIAL TRACK' },
    title: {
      ca: 'Vive, sueña en tu mundo',
      es: 'Vive, sueña en tu mundo',
      en: 'Vive, sueña en tu mundo',
    },
    description: {
      ca: 'El punt de partida discogràfic que va donar inici a l’expressió sonora de RAFA 930.',
      es: 'El punto de partida discográfico que dio inicio a la expresión sonora de RAFA 930.',
      en: 'The discographic starting point that launched RAFA 930’s sonic expression.',
    },
    highlight: true,
  },
  {
    year: '2023 · Etapa Inicial',
    badge: { ca: 'ETAPA INICIAL', es: 'ETAPA INICIAL', en: 'EARLY STAGE' },
    title: {
      ca: 'Poeta · Arrepentido · Así es la vida · Pienso · La Luna',
      es: 'Poeta · Arrepentido · Así es la vida · Pienso · La Luna',
      en: 'Poeta · Arrepentido · Así es la vida · Pienso · La Luna',
    },
    description: {
      ca: 'Temes nascuts des de la sinceritat més crua als carrers de La Mina.',
      es: 'Temas nacidos desde la sinceridad más cruda en las calles de La Mina.',
      en: 'Tracks born from raw honesty in the streets of La Mina.',
    },
  },
  {
    year: '2024 · Consolidació',
    badge: { ca: 'CONSOLIDACIÓ 2024', es: 'CONSOLIDACIÓN 2024', en: '2024 CONSOLIDATION' },
    title: {
      ca: 'Siento · Cambié · Algo Imposible · No Love',
      es: 'Siento · Cambié · Algo Imposible · No Love',
      en: 'Siento · Cambié · Algo Imposible · No Love',
    },
    description: {
      ca: 'Sonoritats profundes de trap emocional i lletres sobre superació i creixement publicades el 2024.',
      es: 'Sonoridades profundas de trap emocional y letras sobre superación y crecimiento publicadas en 2024.',
      en: 'Deep emotional trap textures and lyrics focused on resilience and personal growth released in 2024.',
    },
  },
  {
    year: '2024 · Romanticisme Urbà',
    badge: { ca: 'ROMANTICISME URBÀ 2024', es: 'ROMANTICISMO URBANO 2024', en: '2024 URBAN ROMANTICISM' },
    title: {
      ca: 'Te Quiero · Mi Destino · Pensándote · Una Mirada',
      es: 'Te Quiero · Mi Destino · Pensándote · Una Mirada',
      en: 'Te Quiero · Mi Destino · Pensándote · Una Mirada',
    },
    description: {
      ca: 'Obertura cap a la lírica romàntica i relats de vivències properes durant el 2024.',
      es: 'Apertura hacia la lírica romántica y relatos de vivencias cercanas durante el 2024.',
      en: 'Expansion into romantic lyricism and intimate personal stories throughout 2024.',
    },
  },
  {
    year: '2024 · Hit Singles',
    badge: { ca: 'HIT SINGLES', es: 'HIT SINGLES', en: 'HIT SINGLES' },
    title: {
      ca: 'Un Amor Prohibido (+1.000 reps) · Hago Dinero (+500 reps)',
      es: 'Un Amor Prohibido (+1.000 reps) · Hago Dinero (+500 reps)',
      en: 'Un Amor Prohibido (1,000+ plays) · Hago Dinero (500+ plays)',
    },
    description: {
      ca: 'Creixement orgànic sostingut en plataformes d’streaming i YouTube.',
      es: 'Crecimiento orgánico sostenido en plataformas de streaming y YouTube.',
      en: 'Sustained organic growth across streaming platforms and YouTube.',
    },
    highlight: true,
  },
  {
    year: '2024 · Evolució',
    badge: { ca: 'LÍRICA CONSCIENT', es: 'LÍRICA CONSCIENTE', en: 'CONSCIOUS LYRICISM' },
    title: {
      ca: 'Bonnie & Clyde · Mirada de hada · Presidente VS Ciudadanos · Pasan los días · Diferentes Caminos',
      es: 'Bonnie & Clyde · Mirada de hada · Presidente VS Ciudadanos · Pasan los días · Diferentes Caminos',
      en: 'Bonnie & Clyde · Mirada de hada · Presidente VS Ciudadanos · Pasan los días · Diferentes Caminos',
    },
    description: {
      ca: 'Reflexions socials i lírica conscient que connecta directament amb les vivències del barri.',
      es: 'Reflexiones sociales y lírica consciente que conecta directamente con las vivencias del barrio.',
      en: 'Social reflections and conscious lyricism connecting directly with neighborhood life.',
    },
  },
  {
    year: '2025 · EP Conceptual',
    badge: { ca: "EP 'MY WORLD'", es: "EP 'MY WORLD'", en: "EP 'MY WORLD'" },
    title: {
      ca: '1 Minuto y 10 Segundos · Lo Material No Lo Es Todo · Fuck Sistema · Romeo y Julieta',
      es: '1 Minuto y 10 Segundos · Lo Material No Lo Es Todo · Fuck Sistema · Romeo y Julieta',
      en: '1 Minuto y 10 Segundos · Lo Material No Lo Es Todo · Fuck Sistema · Romeo y Julieta',
    },
    description: {
      ca: 'Un projecte conceptual en tres actes que desafia el cànon comercial per reivindicar valors reals.',
      es: 'Un proyecto conceptual en tres actos que desafía el canon comercial para reivindicar valores reales.',
      en: 'A three-act conceptual project challenging commercial norms to champion real values.',
    },
    highlight: true,
  },
  {
    year: '2026 · Senzills & Avançaments',
    badge: { ca: 'LLANÇAMENTS 2026', es: 'LANZAMIENTOS 2026', en: '2026 RELEASES' },
    title: {
      ca: 'Tú Aroma · Nose si estaré mañana',
      es: 'Tú Aroma · Nose si estaré mañana',
      en: 'Tú Aroma · Nose si estaré mañana',
    },
    description: {
      ca: 'Tú Aroma (primer avançament oficial del pròxim àlbum La Vida Es Bella) i el senzill Nose si estaré mañana.',
      es: 'Tú Aroma (primer adelanto oficial del próximo álbum La Vida Es Bella) y el sencillo Nose si estaré mañana.',
      en: 'Tú Aroma (first official preview of the upcoming album La Vida Es Bella) and the single Nose si estaré mañana.',
    },
  },
  {
    year: '2026 · Present (Destacat)',
    badge: { ca: 'TEMA DESTACAT 2026', es: 'TEMA DESTACADO 2026', en: 'FEATURED 2026 RELEASE' },
    title: {
      ca: 'De Vuelta & Àlbum La Vida Es Bella',
      es: 'De Vuelta & Álbum La Vida Es Bella',
      en: 'De Vuelta & Album La Vida Es Bella',
    },
    description: {
      ca: 'Acabat de pujar: «De Vuelta» lidera els temes destacats de 2026 amb una nova energia nocturna i l’essència pura del 930.',
      es: 'Recién subido: «De Vuelta» lidera los temas destacados de 2026 con una nueva energía nocturna y la esencia pura del 930.',
      en: 'Just uploaded: “De Vuelta” leads the 2026 featured tracks with nocturnal energy and the pure essence of 930.',
    },
    highlight: true,
  },
];

const COLLABORATORS_ROLE_I18N: Record<string, Record<Language, string>> = {
  incrife: {
    ca: 'Fotògraf',
    es: 'Fotógrafo',
    en: 'Photographer',
  },
  ouxxox: {
    ca: 'Productor',
    es: 'Productor',
    en: 'Producer',
  },
  therassam: {
    ca: 'Artista',
    es: 'Artista',
    en: 'Artist',
  },
  kingsla: {
    ca: 'Artista',
    es: 'Artista',
    en: 'Artist',
  },
  salma: {
    ca: 'Model',
    es: 'Modelo',
    en: 'Model',
  },
  toliyug: {
    ca: 'Model',
    es: 'Modelo',
    en: 'Model',
  },
  quiriat: {
    ca: 'Model',
    es: 'Modelo',
    en: 'Model',
  },
};

export const RevistaScreen: React.FC<RevistaScreenProps> = ({
  language,
  onNavigate,
  onOpenLegalTab,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [securityError, setSecurityError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'concierto',
    message: '',
    privacy: false,
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError(null);

    if (honeypot.trim() !== '') {
      return;
    }

    const cleanName = sanitizeUserInput(formData.name, 100);
    const cleanEmail = sanitizeUserInput(formData.email, 120);
    const cleanPhone = sanitizeUserInput(formData.phone, 25);
    const cleanMessage = sanitizeUserInput(formData.message, 1000);

    if (!cleanName || cleanName.length < 2) {
      setSecurityError(
        language === 'ca'
          ? 'Si us plau, introdueix un nom vàlid.'
          : language === 'es'
          ? 'Por favor, introduce un nombre válido.'
          : 'Please enter a valid name.'
      );
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setSecurityError(
        language === 'ca'
          ? 'Si us plau, introdueix un correu electrònic vàlid.'
          : language === 'es'
          ? 'Por favor, introduce un correo electrónico válido.'
          : 'Please enter a valid email address.'
      );
      return;
    }

    if (!isValidPhone(cleanPhone)) {
      setSecurityError(
        language === 'ca'
          ? 'Format de telèfon no vàlid.'
          : language === 'es'
          ? 'Formato de teléfono no válido.'
          : 'Invalid phone number format.'
      );
      return;
    }

    const rateCheck = checkSubmissionRateLimit();
    if (!rateCheck.allowed) {
      setSecurityError(
        language === 'ca'
          ? `Per seguretat anti-spam, espera ${rateCheck.waitSeconds}s abans d'enviar una altra sol·licitud.`
          : language === 'es'
          ? `Por seguridad anti-spam, espera ${rateCheck.waitSeconds}s antes de enviar otra solicitud.`
          : `For anti-spam security, please wait ${rateCheck.waitSeconds}s before submitting again.`
      );
      return;
    }

    setFormData({
      ...formData,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      message: cleanMessage,
    });

    setIsSubmitting(true);
    await submitToFormspree({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      inquiryType: formData.type,
      message: cleanMessage,
      sourceScreen: 'Portada Editorial (#revista)',
      language,
    });
    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* HERO EDITORIAL MONOGRAPH — LILA, ROSA, ROJO, BLANCO Y NEGRO */}
      {/* ========================================================================= */}
      <section
        className="relative min-h-[84vh] flex items-center justify-center px-4 sm:px-6 md:px-10 py-12 md:py-20 border-b border-[#22222e] overflow-hidden"
        id="hero"
      >
        <SectionColorBubbles variant="electric" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#a855f7]/15 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 right-0 w-96 h-96 rounded-full bg-[#ec4899]/12 blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-[#e11d48]/12 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-12 right-1/4 w-96 h-96 rounded-full bg-[#00d4ff]/16 blur-[130px]"
        />

        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          {/* Left Editorial Column */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#a1a1b5]">
              <span className="text-[#ec4899] font-semibold">
                {language === 'ca'
                  ? 'EDICIÓ MONOGRÀFICA · RAFA 930'
                  : language === 'es'
                  ? 'EDICIÓN MONOGRÁFICA · RAFA 930'
                  : 'MONOGRAPH EDITION · RAFA 930'}
              </span>
              <span aria-hidden="true" className="text-[#00d4ff]">·</span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#00d4ff]/10 border border-[#00d4ff]/40 text-[#00d4ff] font-semibold shadow-[0_0_12px_rgba(0,212,255,0.2)]">
                MATARÓ — SANT ADRIÀ DE BESÒS (BARCELONA)
              </span>
            </div>

            <h1 className="font-['Cormorant_Garamond'] fluid-hero-title font-semibold text-[#ffffff]">
              RAFA <span className="text-gradient-lila-rosa-rojo">930</span>
            </h1>

            <div className="border-l-2 border-[#ec4899] pl-4">
              <p className="text-[#f472b6] font-['Cormorant_Garamond'] italic text-2xl sm:text-3xl leading-snug">
                {language === 'ca'
                  ? '«De La Mina al món. Amb la veritat per davant.»'
                  : language === 'es'
                  ? '«De La Mina al mundo. Con la verdad por delante.»'
                  : '“From La Mina to the world. Leading with the truth.”'}
              </p>
            </div>

            <p className="text-[#a1a1b5] text-base sm:text-lg max-w-2xl leading-relaxed">
              {language === 'ca'
                ? 'Artista urbà nascut a Mataró i forjat entre els carrers i la Biblioteca Font de La Mina. La seva obra integra composició musical honesta, fotografia de retrat en clarobscur i desenvolupament de plataformes digitals per a creadors i marques.'
                : language === 'es'
                ? 'Artista urbano nacido en Mataró y forjado entre las calles y la Biblioteca Font de La Mina. Su obra integra composición musical honesta, fotografía de retrato en claroscuro y desarrollo de plataformas digitales para creadores y marcas.'
                : 'Urban artist born in Mataró and forged between the streets and the Font de La Mina Library. His work integrates honest musical composition, chiaroscuro portrait photography, and digital platform development for creators and brands.'}
            </p>

            {/* Primary Navigation Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full">
              <button
                type="button"
                onClick={() => onNavigate('discografia')}
                className="touch-target-48 inline-flex items-center justify-center gap-2 gradient-lila-rosa-rojo text-white text-xs font-semibold px-6 py-3.5 rounded-lg hover:opacity-95 transition-all whitespace-nowrap shrink-0"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>
                  {language === 'ca'
                    ? 'Explorar Discografia'
                    : language === 'es'
                    ? 'Explorar Discografía'
                    : 'Explore Discography'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('galeria')}
                className="touch-target-48 inline-flex items-center justify-center gap-2 border border-[#22222e] bg-[#111118] hover:border-[#ec4899] text-[#ffffff] text-xs font-semibold px-6 py-3.5 rounded-lg transition-all whitespace-nowrap shrink-0"
              >
                <Camera className="w-4 h-4 text-[#ec4899]" />
                <span>
                  {language === 'ca'
                    ? 'Arxiu Fotogràfic'
                    : language === 'es'
                    ? 'Archivo Fotográfico'
                    : 'Photography Archive'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('serveis')}
                className="touch-target-48 inline-flex items-center justify-center gap-2 border border-[#00d4ff]/50 bg-[#111118] hover:border-[#00d4ff] hover:bg-[#00d4ff]/10 text-[#ffffff] text-xs font-semibold px-6 py-3.5 rounded-lg transition-all whitespace-nowrap shrink-0 shadow-[0_0_16px_rgba(0,212,255,0.16)]"
              >
                <Terminal className="w-4 h-4 text-[#00d4ff]" />
                <span>
                  {language === 'ca'
                    ? 'Serveis & Tarifes'
                    : language === 'es'
                    ? 'Servicios & Tarifas'
                    : 'Services & Rates'}
                </span>
              </button>
            </div>

            {/* Quiet Share Row */}
            <div className="pt-4 border-t border-[#22222e] w-full flex flex-wrap items-center gap-3 text-xs font-mono text-[#a1a1b5]">
              <span className="flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-[#00d4ff]" />
                <span>
                  {language === 'ca' ? 'Canals:' : language === 'es' ? 'Canales:' : 'Channels:'}
                </span>
              </span>
              <a
                className="hover:text-[#00d4ff] underline underline-offset-4 decoration-[#00d4ff]"
                href="https://youtube.com/@rafa_930"
                rel="noopener noreferrer"
                target="_blank"
              >
                YouTube Oficial
              </a>
              <span aria-hidden="true" className="text-[#00d4ff]">·</span>
              <a
                className="hover:text-[#00d4ff] underline underline-offset-4 decoration-[#a855f7] flex items-center gap-1"
                href={OFFICIAL_SPOTIFY_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Radio className="w-3.5 h-3.5 text-[#00d4ff]" />
                <span>Spotify Oficial</span>
              </a>
              <span aria-hidden="true" className="text-[#00d4ff]">·</span>
              <a
                className="hover:text-[#00d4ff] underline underline-offset-4 decoration-[#ec4899]"
                href="https://instagram.com/rafa930_oficial"
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram (@rafa930_oficial)
              </a>
              <span aria-hidden="true" className="text-[#00d4ff]">·</span>
              <button
                onClick={handleCopyLink}
                className="hover:text-[#00d4ff] flex items-center gap-1"
                type="button"
              >
                {copiedLink ? (
                  <Check className="w-3.5 h-3.5 text-[#ec4899]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>
                  {copiedLink
                    ? language === 'ca'
                      ? 'Enllaç copiat'
                      : language === 'es'
                      ? 'Enlace copiado'
                      : 'Link copied'
                    : language === 'ca'
                    ? 'Copiar enllaç'
                    : language === 'es'
                    ? 'Copiar enlace'
                    : 'Copy link'}
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Portrait */}
          <div className="lg:col-span-5 space-y-5">
            <Card3D
              intensity={5}
              glowColor="rgba(0, 212, 255, 0.24)"
              className="bg-[#111118] border border-[#00d4ff]/35 rounded-xl p-4 shadow-[0_0_28px_rgba(0,212,255,0.12)]"
            >
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-[#0a0a0f]">
                <img
                  alt="RAFA 930 — Retrato editorial por Incrife"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  src={ARTIST_IMAGES.heroPortrait}
                  loading="eager"
                />
              </div>
              <div className="pt-3 px-1 flex items-center justify-between text-xs font-serif italic text-[#a1a1b5]">
                <span>
                  {language === 'ca'
                    ? 'Fig. 01 — Retrat editorial per Incrife'
                    : language === 'es'
                    ? 'Fig. 01 — Retrato editorial por Incrife'
                    : 'Fig. 01 — Editorial portrait by Incrife'}
                </span>
                <span className="font-mono not-italic text-[#00d4ff] font-semibold">Barcelona, 2025</span>
              </div>
            </Card3D>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CAPÍTULO I · BIOGRAFÍA & ORÍGENES */}
      {/* ========================================================================= */}
      <section
        className="py-16 md:py-24 px-4 sm:px-6 md:px-10 border-b border-[#22222e] max-w-7xl mx-auto"
        id="biografia"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1b5] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
          <span className="text-[#a855f7] font-semibold">
            {language === 'ca'
              ? '01. BIOGRAFIA & ORÍGENS'
              : language === 'es'
              ? '01. BIOGRAFÍA & ORÍGENES'
              : '01. BIOGRAPHY & ORIGINS'}
          </span>
          <span aria-hidden="true" className="text-[#00d4ff]">·</span>
          <span>
            {language === 'ca'
              ? 'DE MATARÓ A LA BIBLIOTECA FONT DE LA MINA'
              : language === 'es'
              ? 'DE MATARÓ A LA BIBLIOTECA FONT DE LA MINA'
              : 'FROM MATARÓ TO FONT DE LA MINA LIBRARY'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-semibold text-[#ffffff] leading-tight">
              {language === 'ca'
                ? 'Una trajectòria construïda des de l’autenticitat i la cultura de barri'
                : language === 'es'
                ? 'Una trayectoria construida desde la autenticidad y la cultura de barrio'
                : 'A trajectory built on authenticity and neighborhood culture'}
            </h2>

            <blockquote className="py-4 border-y border-[#22222e]">
              <p className="font-['Cormorant_Garamond'] italic text-2xl sm:text-3xl text-[#f472b6] leading-snug">
                {language === 'ca'
                  ? '“Amb la música podia expressar les meves emocions i els meus pensaments més profunds.”'
                  : language === 'es'
                  ? '“Con la música podía expresar mis emociones y mis pensamientos más profundos.”'
                  : '“Through music I could express my deepest emotions and thoughts.”'}
              </p>
            </blockquote>

            <div className="space-y-4 text-[#a1a1b5] text-sm sm:text-base leading-relaxed max-w-2xl">
              <p className="first-letter:text-5xl first-letter:font-['Cormorant_Garamond'] first-letter:font-semibold first-letter:text-[#ec4899] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                {language === 'ca'
                  ? 'Rafael Moreno Román (RAFA 930) va néixer i créixer a Mataró. La seva infància va transcórrer entre el carrer, el futbol, el parkour i els moments en família. Als 10 anys, per causes familiars, es va traslladar al barri de La Mina (Sant Adrià de Besòs), on va descobrir una altra realitat i va començar un camí vital i artístic que marcaria per sempre la seva obra.'
                  : language === 'es'
                  ? 'Rafael Moreno Román (RAFA 930) nació y creció en Mataró. Su infancia transcurrió entre la calle, el fútbol, el parkour y los momentos en familia. A los 10 años, por causas familiares, se trasladó al barrio de La Mina (Sant Adrià de Besòs), donde descubrió otra realidad y comenzó un camino vital y artístico que marcaría para siempre su obra.'
                  : 'Rafael Moreno Román (RAFA 930) was born and raised in Mataró. His childhood was spent between the streets, football, parkour, and family moments. At age 10, for family reasons, he moved to the neighborhood of La Mina (Sant Adrià de Besòs), where he discovered a new reality and began a vital and artistic path that would forever shape his work.'}
              </p>
              <p>
                {language === 'ca' ? (
                  <>
                    A la <strong className="text-[#ffffff] font-medium">Biblioteca de la Font de La Mina</strong> va conèixer un grup d’amics que componien música —entre ells el productor Ouxxox i el fotògraf Incrife— i allà va germinar la seva vocació creativa. Amb el pas dels anys, va ampliar el seu llenguatge cap a la fotografia de retrat i el desenvolupament web, integrant tres disciplines sota una mateixa mirada autoral.
                  </>
                ) : language === 'es' ? (
                  <>
                    En la <strong className="text-[#ffffff] font-medium">Biblioteca de la Font de La Mina</strong> conoció a un grupo de amigos que componían música —entre ellos el productor Ouxxox y el fotógrafo Incrife— y allí germinó su vocación creativa. Con el paso de los años, amplió su lenguaje hacia la fotografía de retrato y el desarrollo web, integrando tres disciplinas bajo una misma mirada autoral.
                  </>
                ) : (
                  <>
                    At the <strong className="text-[#ffffff] font-medium">Font de La Mina Library</strong>, he met a group of friends who composed music—including producer Ouxxox and photographer Incrife—where his creative calling took root. Over the years, he expanded his craft into portrait photography and web development, uniting three disciplines under one auteur vision.
                  </>
                )}
              </p>
            </div>

            {/* 3 Core Professional Pillars */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card3D
                intensity={4}
                onClick={() => onNavigate('discografia')}
                glowColor="rgba(168, 85, 247, 0.18)"
                className="p-5 bg-[#111118] border border-[#22222e] rounded-xl hover:border-[#a855f7] cursor-pointer"
              >
                <Mic className="w-5 h-5 text-[#a855f7] mb-3" />
                <h3 className="font-semibold text-[#ffffff] text-sm mb-1">
                  {language === 'ca'
                    ? 'Composició & Directe'
                    : language === 'es'
                    ? 'Composición & Directo'
                    : 'Composition & Live'}
                </h3>
                <p className="text-xs text-[#a1a1b5] leading-relaxed">
                  {language === 'ca'
                    ? 'Música urbana, rap conscient i xous en viu amb identitat pròpia.'
                    : language === 'es'
                    ? 'Música urbana, rap consciente y shows en vivo con identidad propia.'
                    : 'Urban music, conscious rap, and live shows with a distinct identity.'}
                </p>
              </Card3D>

              <Card3D
                intensity={4}
                onClick={() => onNavigate('galeria')}
                glowColor="rgba(236, 72, 153, 0.18)"
                className="p-5 bg-[#111118] border border-[#22222e] rounded-xl hover:border-[#ec4899] cursor-pointer"
              >
                <Camera className="w-5 h-5 text-[#ec4899] mb-3" />
                <h3 className="font-semibold text-[#ffffff] text-sm mb-1">
                  {language === 'ca'
                    ? 'Fotografia Editorial'
                    : language === 'es'
                    ? 'Fotografía Editorial'
                    : 'Editorial Photography'}
                </h3>
                <p className="text-xs text-[#a1a1b5] leading-relaxed">
                  {language === 'ca'
                    ? 'Retrat d’autor, sessions de moda urbana i direcció visual de portades.'
                    : language === 'es'
                    ? 'Retrato de autor, sesiones de moda urbana y dirección visual de portadas.'
                    : 'Auteur portrait sessions, urban fashion shoots, and album cover direction.'}
                </p>
              </Card3D>

              <Card3D
                intensity={4}
                onClick={() => onNavigate('serveis')}
                glowColor="rgba(0, 212, 255, 0.24)"
                className="p-5 bg-[#111118] border border-[#00d4ff]/35 rounded-xl hover:border-[#00d4ff] cursor-pointer shadow-[0_0_20px_rgba(0,212,255,0.1)]"
              >
                <Terminal className="w-5 h-5 text-[#00d4ff] mb-3" />
                <h3 className="font-semibold text-[#ffffff] text-sm mb-1">
                  {language === 'ca'
                    ? 'Desenvolupament Web'
                    : language === 'es'
                    ? 'Desarrollo Web'
                    : 'Web Development'}
                </h3>
                <p className="text-xs text-[#a1a1b5] leading-relaxed">
                  {language === 'ca'
                    ? 'Portfolis professionals, presskits interactius i disseny digital a mida.'
                    : language === 'es'
                    ? 'Portfolios profesionales, presskits interactivos y diseño digital a medida.'
                    : 'Professional portfolios, interactive presskits, and custom digital design.'}
                </p>
              </Card3D>
            </div>
          </div>

          {/* Right Archival Figure + 3D Sculpture Viewer */}
          <div className="lg:col-span-5 space-y-6">
            <Card3D
              intensity={4}
              glowColor="rgba(168, 85, 247, 0.16)"
              className="bg-[#111118] border border-[#22222e] rounded-xl p-4"
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#0a0a0f]">
                <img
                  alt="Biblioteca Font de La Mina"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  src={ARTIST_IMAGES.libraryOrigin}
                  loading="lazy"
                />
              </div>
              <div className="pt-3 px-1 flex justify-between items-center text-xs font-serif italic text-[#a1a1b5]">
                <span>
                  {language === 'ca'
                    ? 'Fig. 02 — Biblioteca Font de La Mina (Punt d’origen)'
                    : language === 'es'
                    ? 'Fig. 02 — Biblioteca Font de La Mina (Punto de origen)'
                    : 'Fig. 02 — Font de La Mina Library (Point of origin)'}
                </span>
                <span className="font-mono not-italic text-[#a855f7]">
                  {language === 'ca' ? 'Arxiu' : language === 'es' ? 'Archivo' : 'Archive'}
                </span>
              </div>
            </Card3D>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#a1a1b5]">
                <span>
                  {language === 'ca'
                    ? 'INSTAL·LACIÓ ESCULTÒRICA INTERACTIVA 3D'
                    : language === 'es'
                    ? 'INSTALACIÓN ESCULTÓRICA INTERACTIVA 3D'
                    : 'INTERACTIVE 3D SCULPTURAL INSTALLATION'}
                </span>
                <span className="text-[#00d4ff] font-semibold">WebGL · 3D</span>
              </div>
              <Spatial3DCanvas
                currentScreen="revista"
                language={language}
                heightClass="h-[260px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CAPÍTULO II · CRONOLOGÍA ARTÍSTICA (2023 - 2026) */}
      {/* ========================================================================= */}
      <section
        aria-label={
          language === 'ca'
            ? 'Cronologia de llançaments i trajectòria'
            : language === 'es'
            ? 'Cronología de lanzamientos y trayectoria'
            : 'Release timeline and artistic trajectory'
        }
        className="relative py-16 md:py-24 px-4 sm:px-6 md:px-10 border-b border-[#22222e] bg-[#0a0a0f] overflow-hidden"
      >
        <SectionColorBubbles variant="editorial" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1b5] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
            <span className="text-[#ec4899] font-semibold">
              {language === 'ca'
                ? '02. CRONOLOGIA D’OBRA'
                : language === 'es'
                ? '02. CRONOLOGÍA DE OBRA'
                : '02. WORK TIMELINE'}
            </span>
            <span aria-hidden="true" className="text-[#00d4ff]">·</span>
            <span>
              {language === 'ca'
                ? 'ARXIU 2023–2026'
                : language === 'es'
                ? 'ARCHIVO 2023–2026'
                : 'ARCHIVE 2023–2026'}
            </span>
          </div>

          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-semibold text-[#ffffff] mb-10">
            {language === 'ca'
              ? 'Evolució musical i conceptual'
              : language === 'es'
              ? 'Evolución musical y conceptual'
              : 'Musical and conceptual evolution'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TIMELINE_I18N.map((item, idx) => (
              <Card3D
                key={idx}
                intensity={4}
                glowColor="rgba(168, 85, 247, 0.16)"
                className={`bg-[#111118] border rounded-xl p-6 ${
                  item.highlight ? 'border-[#ec4899]/70' : 'border-[#22222e]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#a1a1b5] mb-2 tabular-nums">
                    <time className="text-[#a855f7] font-semibold">{item.year}</time>
                    {item.badge && (
                      <span className="text-[#ec4899] font-semibold">{item.badge[language]}</span>
                    )}
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] font-semibold text-xl text-[#ffffff] leading-snug">
                    {item.title[language]}
                  </h3>
                  <p className="text-[#a1a1b5] text-xs sm:text-sm mt-2 leading-relaxed">
                    {item.description[language]}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#22222e] text-[11px] font-mono text-[#a1a1b5] tabular-nums flex justify-between">
                  <span className="text-[#00d4ff]">Cap. 0{idx + 1}</span>
                  <span>
                    {language === 'ca'
                      ? 'Catàleg Oficial'
                      : language === 'es'
                      ? 'Catálogo Oficial'
                      : 'Official Catalog'}
                  </span>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CAPÍTULO III · DISCOGRAFÍA SELECCIONADA */}
      {/* ========================================================================= */}
      <section
        className="relative py-16 md:py-24 px-4 sm:px-6 md:px-10 border-b border-[#22222e] max-w-7xl mx-auto overflow-hidden"
        id="musica"
      >
        <SectionColorBubbles variant="music" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1b5] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
              <span className="text-[#e11d48] font-semibold">
                {language === 'ca'
                  ? '03. CATÀLEG DISCOGRÀFIC'
                  : language === 'es'
                  ? '03. CATÁLOGO DISCOGRÁFICO'
                  : '03. DISCOGRAPHY CATALOG'}
              </span>
              <span aria-hidden="true" className="text-[#00d4ff]">·</span>
              <span>
                {language === 'ca'
                  ? 'OBRES DESTACADES'
                  : language === 'es'
                  ? 'OBRAS DESTACADAS'
                  : 'FEATURED WORKS'}
              </span>
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-semibold text-[#ffffff]">
              {language === 'ca'
                ? 'Discografia Seleccionada'
                : language === 'es'
                ? 'Discografía Seleccionada'
                : 'Selected Discography'}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={OFFICIAL_SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-[#111118] border border-[#00d4ff]/40 hover:border-[#00d4ff] text-xs font-mono text-[#00d4ff] flex items-center gap-1.5 whitespace-nowrap shadow-[0_0_14px_rgba(0,212,255,0.12)] transition-colors"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>
                {language === 'ca'
                  ? 'Perfil Oficial Spotify'
                  : language === 'es'
                  ? 'Perfil Oficial Spotify'
                  : 'Official Spotify Profile'}
              </span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              type="button"
              onClick={() => onNavigate('discografia')}
              className="text-xs font-mono text-[#ec4899] hover:underline flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>
                {language === 'ca'
                  ? 'Veure catàleg complet i lletres (8 obres)'
                  : language === 'es'
                  ? 'Ver catálogo completo y letras (8 obras)'
                  : 'View full catalog & lyrics (8 works)'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: De Vuelta (Featured Release) */}
          <Card3D
            intensity={5}
            glowColor="rgba(0, 212, 255, 0.24)"
            className="bg-[#111118] border border-[#00d4ff]/50 hover:border-[#ec4899] rounded-xl p-5 group shadow-[0_0_24px_rgba(0,212,255,0.12)]"
          >
            <div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-[#0a0a0f] mb-4">
                <img
                  alt="De Vuelta — RAFA 930"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform"
                  src={ARTIST_IMAGES.deVuelta2026}
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#ec4899] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-lg">
                  {language === 'ca'
                    ? 'NOU DESTACAT 2026'
                    : language === 'es'
                    ? 'NUEVO DESTACADO 2026'
                    : 'NEW FEATURED 2026'}
                </span>
              </div>
              <div className="text-xs font-mono text-[#00d4ff] mb-1 tabular-nums">
                {language === 'ca'
                  ? 'SENZILL DESTACAT · 2026 · 126 BPM'
                  : language === 'es'
                  ? 'TEMA DESTACADO · 2026 · 126 BPM'
                  : 'FEATURED SINGLE · 2026 · 126 BPM'}
              </div>
              <h3 className="font-['Cormorant_Garamond'] font-semibold text-2xl text-[#ffffff]">
                De Vuelta
              </h3>
              <p className="text-[#a1a1b5] text-xs sm:text-sm mt-2 leading-relaxed">
                {language === 'ca'
                  ? 'El nou llançament destacat de RAFA 930 en 2026. Energia nocturna, retorn amb més força i la identitat pura del codi 930.'
                  : language === 'es'
                  ? 'El nuevo lanzamiento destacado de RAFA 930 en 2026. Energía nocturna, regreso con más fuerza y la identidad pura del código 930.'
                  : 'RAFA 930’s new featured 2026 release. Nocturnal energy, a stronger return, and the pure identity of the 930 code.'}
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-[#22222e] flex gap-2">
              <a
                href="https://youtube.com/@rafa_930"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target-44 flex-1 py-2.5 px-4 gradient-lila-rosa-rojo text-white hover:opacity-95 rounded-lg flex items-center justify-center gap-2 text-xs font-semibold transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>
                  {language === 'ca'
                    ? 'Escoltar a YouTube'
                    : language === 'es'
                    ? 'Escuchar en YouTube'
                    : 'Listen on YouTube'}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card3D>

          {/* Card 2 */}
          <Card3D
            intensity={5}
            glowColor="rgba(236, 72, 153, 0.18)"
            className="bg-[#111118] border border-[#22222e] hover:border-[#ec4899] rounded-xl p-5 group"
          >
            <div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-[#0a0a0f] mb-4">
                <img
                  alt="EP My World"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform"
                  src={ARTIST_IMAGES.epMyWorld}
                  loading="lazy"
                />
              </div>
              <div className="text-xs font-mono text-[#ec4899] mb-1 tabular-nums">
                {language === 'ca'
                  ? 'EP CONCEPTUAL · 2025 · TRILOGIA'
                  : language === 'es'
                  ? 'EP CONCEPTUAL · 2025 · TRILOGÍA'
                  : 'CONCEPTUAL EP · 2025 · TRILOGY'}
              </div>
              <h3 className="font-['Cormorant_Garamond'] font-semibold text-2xl text-[#ffffff]">
                EP My World
              </h3>
              <ul className="text-xs text-[#a1a1b5] mt-2 space-y-1 font-mono tabular-nums">
                <li>01. 1 Minuto y 10 Segundos</li>
                <li>02. Lo Material No Lo Es Todo</li>
                <li>03. Fuck Sistema</li>
              </ul>
            </div>

            <div className="pt-5 mt-4 border-t border-[#22222e] flex gap-2">
              <a
                href="https://www.youtube.com/watch?v=lCwhG67eijs&list=PLs6c6tp_0W8Q_4mPsWLRQ8Zwt569Rpe5x"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target-44 flex-1 py-2.5 px-4 gradient-lila-rosa-rojo text-white hover:opacity-95 rounded-lg flex items-center justify-center gap-2 text-xs font-semibold transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>
                  {language === 'ca'
                    ? 'Escoltar a YouTube'
                    : language === 'es'
                    ? 'Escuchar en YouTube'
                    : 'Listen on YouTube'}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card3D>

          {/* Card 3 */}
          <Card3D
            intensity={5}
            glowColor="rgba(225, 29, 72, 0.18)"
            className="bg-[#111118] border border-[#22222e] hover:border-[#e11d48] rounded-xl p-5 group"
          >
            <div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-[#0a0a0f] mb-4">
                <img
                  alt="La Vida Es Bella"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform"
                  src={ARTIST_IMAGES.albumVidaEsBella}
                  loading="lazy"
                />
              </div>
              <div className="text-xs font-mono text-[#e11d48] mb-1 tabular-nums">
                {language === 'ca'
                  ? 'ÀLBUM DEBUT · 2026 · AVANÇAMENT: TÚ AROMA'
                  : language === 'es'
                  ? 'ÁLBUM DEBUT · 2026 · ADELANTO: TÚ AROMA'
                  : 'DEBUT ALBUM · 2026 · PREVIEW: TÚ AROMA'}
              </div>
              <h3 className="font-['Cormorant_Garamond'] font-semibold text-2xl text-[#ffffff]">
                La Vida Es Bella
              </h3>
              <p className="text-[#a1a1b5] text-xs sm:text-sm mt-2 leading-relaxed">
                {language === 'ca'
                  ? 'El projecte de llarga durada que celebra la resiliència, la maduresa escènica i l’amor per la vida.'
                  : language === 'es'
                  ? 'El proyecto de larga duración que celebra la resiliencia, la madurez escénica y el amor por la vida.'
                  : 'The full-length project celebrating resilience, stage maturity, and love for life.'}
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-[#22222e]">
              <a
                href="https://youtube.com/@rafa_930"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target-44 w-full py-2.5 px-4 bg-[#0a0a0f] border border-[#ec4899]/60 hover:bg-[#ec4899] text-[#f472b6] hover:text-white rounded-lg flex items-center justify-center gap-2 text-xs font-semibold transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>
                  {language === 'ca'
                    ? 'Escoltar a YouTube Oficial'
                    : language === 'es'
                    ? 'Escuchar en YouTube Oficial'
                    : 'Listen on Official YouTube'}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card3D>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CAPÍTULO IV · EQUIPO & COLABORADORES */}
      {/* ========================================================================= */}
      <section
        className="py-16 md:py-24 px-4 sm:px-6 md:px-10 border-b border-[#22222e] bg-[#0a0a0f]"
        id="colaboraciones"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1b5] mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
                <span className="text-[#a855f7] font-semibold">
                  {language === 'ca'
                    ? '04. DIRECTORI DE TALENT'
                    : language === 'es'
                    ? '04. DIRECTORIO DE TALENTO'
                    : '04. TALENT DIRECTORY'}
                </span>
                <span aria-hidden="true" className="text-[#00d4ff]">·</span>
                <span>
                  {language === 'ca'
                    ? '7 COL·LABORADORS CLAU'
                    : language === 'es'
                    ? '7 COLABORADORES CLAVE'
                    : '7 KEY COLLABORATORS'}
                </span>
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-semibold text-[#ffffff]">
                {language === 'ca'
                  ? 'Equip Creatiu & Col·laboracions'
                  : language === 'es'
                  ? 'Equipo Creativo & Colaboraciones'
                  : 'Creative Team & Collaborations'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COLLABORATORS.map((c) => {
              const roleText = COLLABORATORS_ROLE_I18N[c.id]?.[language] || c.role;

              return (
                <Card3D
                  key={c.id}
                  intensity={4}
                  glowColor="rgba(236, 72, 153, 0.16)"
                  className="bg-[#111118] border border-[#22222e] hover:border-[#ec4899] rounded-xl overflow-hidden group"
                >
                  <div>
                    <div className="relative aspect-[4/4] w-full overflow-hidden bg-[#0a0a0f] border-b border-[#22222e]">
                      <img
                        alt={`${c.name} — ${roleText}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        src={c.avatarUrl}
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#050507]/85 backdrop-blur-md border border-[#ec4899]/40 text-[11px] font-mono text-[#ec4899] font-semibold">
                        {roleText}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-['Cormorant_Garamond'] font-semibold text-xl text-[#ffffff] leading-snug">
                        {c.name}
                      </h3>
                      <div className="text-xs font-mono text-[#a1a1b5] mt-0.5 truncate">
                        {c.handle}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-2 flex">
                    <a
                      className="touch-target-44 w-full px-3 py-2 bg-[#0a0a0f] border border-[#22222e] hover:border-[#00d4ff] rounded-lg text-xs font-mono text-[#c084fc] hover:text-[#00d4ff] flex items-center justify-between transition-colors"
                      href={c.instagramUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="truncate">Instagram · {c.handle}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#00d4ff]" />
                    </a>
                  </div>
                </Card3D>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CAPÍTULO V · CONTACTO PROFESIONAL */}
      {/* ========================================================================= */}
      <section
        className="py-16 md:py-24 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto"
        id="contacto"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1b5] mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
          <span className="text-[#ec4899] font-semibold">
            {language === 'ca'
              ? '05. CONTACTE & CONTRACTACIÓ'
              : language === 'es'
              ? '05. CONTACTO & CONTRATACIÓN'
              : '05. CONTACT & BOOKING'}
          </span>
          <span aria-hidden="true" className="text-[#00d4ff]">·</span>
          <span>
            {language === 'ca'
              ? 'RESPOSTA EN MENYS DE 24H'
              : language === 'es'
              ? 'RESPUESTA EN MENOS DE 24H'
              : 'RESPONSE WITHIN 24H'}
          </span>
        </div>

        <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-semibold text-[#ffffff] mb-2">
          {language === 'ca'
            ? 'Treballem junts?'
            : language === 'es'
            ? '¿Trabajamos juntos?'
            : 'Shall we work together?'}
        </h2>
        <p className="text-[#a1a1b5] text-sm sm:text-base max-w-2xl mb-10">
          {language === 'ca'
            ? 'Per a contractació de concerts, sessions de fotografia editorial o desenvolupament de projectes digitals a mida.'
            : language === 'es'
            ? 'Para contratación de conciertos, sesiones de fotografía editorial o desarrollo de proyectos digitales a medida.'
            : 'For concert bookings, editorial photography sessions, or custom digital development projects.'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-[#111118] border border-[#22222e] rounded-xl space-y-2">
              <div className="text-xs font-mono text-[#a855f7]">
                {language === 'ca'
                  ? '01. MÚSICA & BOOKING'
                  : language === 'es'
                  ? '01. MÚSICA & BOOKING'
                  : '01. MUSIC & BOOKING'}
              </div>
              <p className="text-xs text-[#a1a1b5]">
                {language === 'ca'
                  ? 'Correu directe de contractació i management:'
                  : language === 'es'
                  ? 'Correo directo de contratación y management:'
                  : 'Direct booking and management email:'}
              </p>
              <a
                className="text-sm font-medium text-[#ffffff] hover:text-[#ec4899] transition-colors block break-all"
                href="mailto:rafa.930music@gmail.com?subject=Consulta%20Profesional%20-%20RAFA%20930"
              >
                rafa.930music@gmail.com
              </a>
            </div>

            <div className="p-6 bg-[#111118] border border-[#22222e] rounded-xl space-y-2">
              <div className="text-xs font-mono text-[#ec4899]">
                {language === 'ca'
                  ? '02. DIRECCIÓ FOTOGRÀFICA'
                  : language === 'es'
                  ? '02. DIRECCIÓN FOTOGRÁFICA'
                  : '02. PHOTOGRAPHY DIRECTION'}
              </div>
              <p className="text-xs text-[#a1a1b5] leading-relaxed">
                {language === 'ca'
                  ? 'Retrats d’estudi, exteriors, moda urbana i portades discogràfiques amb estètica editorial.'
                  : language === 'es'
                  ? 'Retratos de estudio, exteriores, moda urbana y portadas discográficas con estética editorial.'
                  : 'Studio portraits, outdoor shoots, urban fashion, and album covers with an editorial aesthetic.'}
              </p>
            </div>

            <div className="p-6 bg-[#111118] border border-[#00d4ff]/35 rounded-xl space-y-3 shadow-[0_0_20px_rgba(0,212,255,0.08)]">
              <div className="text-xs font-mono text-[#00d4ff] font-semibold">
                {language === 'ca'
                  ? '03. DESENVOLUPAMENT WEB & ESTUDI DIGITAL'
                  : language === 'es'
                  ? '03. DESARROLLO WEB & ESTUDIO DIGITAL'
                  : '03. WEB DEVELOPMENT & DIGITAL STUDIO'}
              </div>
              <p className="text-xs text-[#a1a1b5] leading-relaxed">
                {language === 'ca'
                  ? 'Disseny i desenvolupament de pàgines web, portfolis artístics i dossiers interactius.'
                  : language === 'es'
                  ? 'Diseño y desarrollo de páginas web, portfolios artísticos y dossiers interactivos.'
                  : 'Design and development of websites, artistic portfolios, and interactive presskits.'}
              </p>
              <a
                className="touch-target-44 w-full py-2.5 bg-[#0a0a0f] border border-[#00d4ff]/45 hover:border-[#00d4ff] hover:bg-[#00d4ff]/10 text-[#00d4ff] rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
                href="https://rafa930music-sudo.github.io/930-Digital/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  {language === 'ca'
                    ? 'Visitar Estudi Digital'
                    : language === 'es'
                    ? 'Visitar Estudio Digital'
                    : 'Visit Digital Studio'}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#111118] border border-[#22222e] p-6 sm:p-8 rounded-xl">
              <div className="mb-6">
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#ffffff] mb-1">
                  {language === 'ca'
                    ? 'Sol·licitud d’Informació'
                    : language === 'es'
                    ? 'Solicitud de Información'
                    : 'Information Request'}
                </h3>
                <p className="text-[#a1a1b5] text-xs">
                  {language === 'ca'
                    ? 'Completa les dades de la teva proposta i rebràs resposta en menys de 24 hores.'
                    : language === 'es'
                    ? 'Completa los datos de tu propuesta y recibirás respuesta en menos de 24 horas.'
                    : 'Complete your proposal details and receive a response within 24 hours.'}
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 bg-[#0a0a0f] border border-[#ec4899] text-[#ffffff] rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#ec4899]" />
                    <h4 className="font-semibold text-sm">
                      {language === 'ca'
                        ? 'Missatge enviat correctament'
                        : language === 'es'
                        ? 'Mensaje enviado correctamente'
                        : 'Message sent successfully'}
                    </h4>
                  </div>
                  <p className="text-xs text-[#a1a1b5]">
                    {language === 'ca'
                      ? `Gràcies ${formData.name || 'pel teu missatge'}. Et respondrem ben aviat a través de ${formData.email || 'correu electrònic'}.`
                      : language === 'es'
                      ? `Gracias ${formData.name || 'por tu mensaje'}. Te responderemos en breve a través de ${formData.email || 'correo electrónico'}.`
                      : `Thank you ${formData.name || 'for your message'}. We will reply shortly via ${formData.email || 'email'}.`}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        type: 'concierto',
                        message: '',
                        privacy: false,
                      });
                    }}
                    className="mt-3 text-xs text-[#ec4899] underline"
                  >
                    {language === 'ca'
                      ? 'Enviar una altra consulta'
                      : language === 'es'
                      ? 'Enviar otra consulta'
                      : 'Send another inquiry'}
                  </button>
                </div>
              ) : (
                <form
                  action={FORMSPREE_ENDPOINT}
                  method="POST"
                  onSubmit={handleFormSubmit}
                  className="space-y-4"
                  noValidate
                >
                  {/* Hidden Anti-Bot Honeypot Field */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="r-website-url">Website</label>
                    <input
                      id="r-website-url"
                      type="text"
                      name="website_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {securityError && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-lg bg-[#e11d48]/15 border border-[#e11d48] text-xs text-[#ffffff] flex items-center gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 text-[#e11d48] shrink-0" />
                      <span>{securityError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#a1a1b5] mb-1.5" htmlFor="nombre">
                        {language === 'ca'
                          ? 'Nom complet *'
                          : language === 'es'
                          ? 'Nombre completo *'
                          : 'Full name *'}
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={
                          language === 'ca'
                            ? 'El teu nom o entitat'
                            : language === 'es'
                            ? 'Tu nombre o entidad'
                            : 'Your name or organization'
                        }
                        className="touch-target-48 w-full px-4 bg-[#0a0a0f] border border-[#22222e] rounded-lg text-[#ffffff] focus:outline-none focus:border-[#ec4899] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#a1a1b5] mb-1.5" htmlFor="email">
                        {language === 'ca'
                          ? 'Correu electrònic *'
                          : language === 'es'
                          ? 'Correo electrónico *'
                          : 'Email address *'}
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nombre@dominio.com"
                        className="touch-target-48 w-full px-4 bg-[#0a0a0f] border border-[#22222e] rounded-lg text-[#ffffff] focus:outline-none focus:border-[#ec4899] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#a1a1b5] mb-1.5" htmlFor="telefono">
                        {language === 'ca'
                          ? 'Telèfon / WhatsApp'
                          : language === 'es'
                          ? 'Teléfono / WhatsApp'
                          : 'Phone / WhatsApp'}
                      </label>
                      <input
                        id="telefono"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+34 600 000 000"
                        className="touch-target-48 w-full px-4 bg-[#0a0a0f] border border-[#22222e] rounded-lg text-[#ffffff] focus:outline-none focus:border-[#ec4899] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#a1a1b5] mb-1.5" htmlFor="tipo_consulta">
                        {language === 'ca'
                          ? 'Àrea de consulta *'
                          : language === 'es'
                          ? 'Área de consulta *'
                          : 'Inquiry area *'}
                      </label>
                      <select
                        id="tipo_consulta"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="touch-target-48 w-full px-4 bg-[#0a0a0f] border border-[#22222e] rounded-lg text-[#ffffff] focus:outline-none focus:border-[#ec4899] text-sm"
                      >
                        <option value="concierto">
                          {language === 'ca'
                            ? 'Concert / Xou en directe'
                            : language === 'es'
                            ? 'Concierto / Show en directo'
                            : 'Concert / Live Show'}
                        </option>
                        <option value="colaboracion">
                          {language === 'ca'
                            ? 'Col·laboració musical / Feat'
                            : language === 'es'
                            ? 'Colaboración musical / Feat'
                            : 'Musical Collaboration / Feat'}
                        </option>
                        <option value="fotografia">
                          {language === 'ca'
                            ? 'Sessió fotogràfica / Editorial'
                            : language === 'es'
                            ? 'Sesión fotográfica / Editorial'
                            : 'Photography Session / Editorial'}
                        </option>
                        <option value="desarrollo">
                          {language === 'ca'
                            ? 'Desenvolupament Web & Disseny Digital'
                            : language === 'es'
                            ? 'Desarrollo Web & Diseño Digital'
                            : 'Web Development & Digital Design'}
                        </option>
                        <option value="otros">
                          {language === 'ca'
                            ? 'Altres consultes'
                            : language === 'es'
                            ? 'Otras consultas'
                            : 'Other inquiries'}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#a1a1b5] mb-1.5" htmlFor="mensaje">
                      {language === 'ca'
                        ? 'Detalls del projecte'
                        : language === 'es'
                        ? 'Detalles del proyecto'
                        : 'Project details'}
                    </label>
                    <textarea
                      id="mensaje"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        language === 'ca'
                          ? 'Descriu breument el teu projecte, dates o necessitats...'
                          : language === 'es'
                          ? 'Describe brevemente tu proyecto, fechas o necesidades...'
                          : 'Briefly describe your project, dates, or requirements...'
                      }
                      className="w-full p-4 bg-[#0a0a0f] border border-[#22222e] rounded-lg text-[#ffffff] focus:outline-none focus:border-[#ec4899] text-sm min-h-[100px]"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <input
                      id="privacidad"
                      type="checkbox"
                      required
                      checked={formData.privacy}
                      onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                      className="touch-target-44 w-5 h-5 rounded bg-[#0a0a0f] border-[#22222e] text-[#ec4899] cursor-pointer"
                    />
                    <label htmlFor="privacidad" className="text-xs text-[#a1a1b5] cursor-pointer">
                      {language === 'ca' ? (
                        <>
                          He llegit i accepto la{' '}
                          <button
                            type="button"
                            onClick={() => onOpenLegalTab && onOpenLegalTab('privacitat')}
                            className="text-[#ec4899] underline font-semibold"
                          >
                            política de privacitat i tractament RGPD
                          </button>
                        </>
                      ) : language === 'es' ? (
                        <>
                          He leído y acepto la{' '}
                          <button
                            type="button"
                            onClick={() => onOpenLegalTab && onOpenLegalTab('privacitat')}
                            className="text-[#ec4899] underline font-semibold"
                          >
                            política de privacidad y tratamiento RGPD
                          </button>
                        </>
                      ) : (
                        <>
                          I have read and accept the{' '}
                          <button
                            type="button"
                            onClick={() => onOpenLegalTab && onOpenLegalTab('privacitat')}
                            className="text-[#ec4899] underline font-semibold"
                          >
                            privacy policy and GDPR processing
                          </button>
                        </>
                      )}
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="touch-target-48 w-full gradient-lila-rosa-rojo text-white font-semibold text-xs rounded-lg hover:opacity-95 disabled:opacity-60 transition-all flex items-center justify-center gap-2 mt-2 shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>
                          {language === 'ca'
                            ? 'Enviant sol·licitud...'
                            : language === 'es'
                            ? 'Enviando solicitud...'
                            : 'Sending request...'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>
                          {language === 'ca'
                            ? 'Enviar sol·licitud'
                            : language === 'es'
                            ? 'Enviar solicitud'
                            : 'Send request'}
                        </span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
