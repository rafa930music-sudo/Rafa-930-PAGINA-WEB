import React, { useState } from 'react';
import { Language } from '../../types';
import { SERVICE_PACKAGES } from '../../data/content';
import {
  sanitizeUserInput,
  isValidEmail,
  checkSubmissionRateLimit,
  submitToFormspree,
} from '../../utils/seoAndSecurity';
import { Card3D } from '../Card3D';
import { SectionColorBubbles } from '../AmbientColorBubbles';
import {
  Mic,
  Camera,
  Terminal,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageCircle,
  Mail,
  Send,
  Loader2,
  Check,
  Sparkles,
  FileSpreadsheet,
} from 'lucide-react';

interface ServeisScreenProps {
  language: Language;
}

interface ExtraItemI18n {
  id: string;
  name: Record<Language, string>;
  category: 'musica' | 'fotografia' | 'web';
}

const EXTRAS_I18N: ExtraItemI18n[] = [
  {
    id: 'master',
    name: {
      ca: 'Masterització professional per a plataformes d’streaming',
      es: 'Masterización profesional para plataformas de streaming',
      en: 'Professional mastering for streaming platforms',
    },
    category: 'musica',
  },
  {
    id: 'videoclip',
    name: {
      ca: 'Guió i direcció artística per a videoclip',
      es: 'Guion y dirección artística para videoclip',
      en: 'Script & art direction for music video',
    },
    category: 'musica',
  },
  {
    id: 'cover-art',
    name: {
      ca: 'Disseny de portada oficial en alta resolució',
      es: 'Diseño de portada oficial en alta resolución',
      en: 'High-resolution official cover art design',
    },
    category: 'musica',
  },
  {
    id: 'extra-photos',
    name: {
      ca: 'Fotografies addicionals editades en alta resolució',
      es: 'Fotografías adicionales editadas en alta resolución',
      en: 'Additional high-resolution edited photographs',
    },
    category: 'fotografia',
  },
  {
    id: 'reel-bts',
    name: {
      ca: 'Peça vertical / Reel Behind the Scenes 4K',
      es: 'Pieza vertical / Reel Behind the Scenes 4K',
      en: '4K Vertical Reel / Behind the Scenes piece',
    },
    category: 'fotografia',
  },
  {
    id: 'epk-interactiu',
    name: {
      ca: 'Dossier / EPK interactiu per a promotors i festivals',
      es: 'Dossier / EPK interactivo para promotores y festivales',
      en: 'Interactive EPK / Presskit for promoters & festivals',
    },
    category: 'web',
  },
  {
    id: 'domain-seo',
    name: {
      ca: 'Configuració de domini propi + posicionament SEO',
      es: 'Configuración de dominio propio + posicionamiento SEO',
      en: 'Custom domain setup + SEO positioning',
    },
    category: 'web',
  },
];

const PACKAGE_I18N: Record<
  string,
  {
    title: Record<Language, string>;
    description: Record<Language, string>;
    turnaround: Record<Language, string>;
    features: Record<Language, string[]>;
  }
> = {
  'pack-musica': {
    title: {
      ca: 'Producció Musical, Lletres & Feats',
      es: 'Producción Musical, Letras & Feats',
      en: 'Music Production, Lyrics & Feats',
    },
    description: {
      ca: 'Composició lírica a mida, col·laboracions vocals (feats) o direcció d’estudi amb l’essència de RAFA 930.',
      es: 'Composición lírica a medida, colaboraciones vocales (feats) o dirección de estudio con la esencia de RAFA 930.',
      en: 'Custom lyric composition, vocal collaborations (feats), or studio direction with RAFA 930’s essence.',
    },
    turnaround: {
      ca: '7 – 14 dies',
      es: '7 – 14 días',
      en: '7 – 14 days',
    },
    features: {
      ca: [
        'Composició de lletra original o vers col·laboratiu (Feat)',
        'Enregistrament de veus en estudi amb qualitat professional',
        'Assessorament en estructura melòdica i ritme urbà',
        'Entrega de pistes (stems) en format WAV 24-bit',
      ],
      es: [
        'Composición de letra original o verso colaborativo (Feat)',
        'Grabación de voces en estudio con calidad profesional',
        'Asesoramiento en estructura melódica y ritmo urbano',
        'Entrega de pistas (stems) en formato WAV 24-bit',
      ],
      en: [
        'Original lyric composition or collaborative verse (Feat)',
        'Studio vocal recording with professional grade gear',
        'Guidance on melodic structure and urban rhythm',
        'Stem export delivery in WAV 24-bit format',
      ],
    },
  },
  'pack-foto': {
    title: {
      ca: 'Fotografia Professional & Editorial',
      es: 'Fotografía Profesional & Editorial',
      en: 'Professional & Editorial Photography',
    },
    description: {
      ca: 'Retrats urbans, sessions per a artistes, moda i estètica cinematogràfica d’alt impacte per Incrife.',
      es: 'Retratos urbanos, sesiones para artistas, moda y estética cinematográfica de alto impacto por Incrife.',
      en: 'Urban portraits, artist photoshoot sessions, fashion, and high-impact cinematic aesthetics by Incrife.',
    },
    turnaround: {
      ca: '48 a 72 hores',
      es: '48 a 72 horas',
      en: '48 to 72 hours',
    },
    features: {
      ca: [
        'Sessió fotogràfica a exteriors o estudi',
        'Fotografies editades i retocades en color grading',
        'Format llest per a xarxes, premsa i cartelleria',
        'Direcció d’art i assessorament d’estilisme',
      ],
      es: [
        'Sesión fotográfica en exteriores o estudio',
        'Fotografías editadas y retocadas en color grading',
        'Formato listo para redes, prensa y cartelería',
        'Dirección de arte y asesoramiento de estilismo',
      ],
      en: [
        'On-location or studio photoshoot session',
        'Edited and retouched photos with custom color grading',
        'Ready-to-publish formats for social media, press & posters',
        'Art direction and styling advice',
      ],
    },
  },
  'pack-web': {
    title: {
      ca: 'Desenvolupament Web & Plataformes · 930 Digital',
      es: 'Desarrollo Web & Plataformas · 930 Digital',
      en: 'Web Development & Platforms · 930 Digital',
    },
    description: {
      ca: 'Pàgines web, portfolios, presskits digitals i aplicacions amb disseny avantguardista i lliurament ràpid.',
      es: 'Páginas web, portfolios, presskits digitales y aplicaciones con diseño vanguardista y entrega rápida.',
      en: 'Websites, portfolios, digital presskits, and apps with cutting-edge design and fast delivery.',
    },
    turnaround: {
      ca: '3 a 5 dies hàbils',
      es: '3 a 5 días hábiles',
      en: '3 to 5 business days',
    },
    features: {
      ca: [
        'Web responsive d’alt rendiment (mòbil i escriptori)',
        'Dossier / EPK interactiu amb reproductor i biografia',
        'Domini personalitzat, SEO i càrrega ultraràpida',
        'Assessorament directe i suport tècnic',
      ],
      es: [
        'Web responsive de alto rendimiento (móvil y escritorio)',
        'Dossier / EPK interactivo con reproductor y biografía',
        'Dominio personalizado, SEO y carga ultrarrápida',
        'Asesoramiento directo y soporte técnico',
      ],
      en: [
        'High-performance responsive website (mobile & desktop)',
        'Interactive EPK / Dossier with audio player and bio',
        'Custom domain setup, SEO and ultra-fast loading',
        'Direct consultation and technical support',
      ],
    },
  },
};

export const ServeisScreen: React.FC<ServeisScreenProps> = ({ language }) => {
  const [selectedPackage, setSelectedPackage] = useState<string>('pack-foto');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  // Form states
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [websiteTrap, setWebsiteTrap] = useState(''); // Anti-bot honeypot
  const [quoteSending, setQuoteSending] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const [quoteError, setQuoteError] = useState('');
  const [showQuickForm, setShowQuickForm] = useState(false);

  const toggleExtra = (id: string) => {
    if (selectedExtras.includes(id)) {
      setSelectedExtras(selectedExtras.filter((e) => e !== id));
    } else {
      setSelectedExtras([...selectedExtras, id]);
    }
  };

  const currentPkg = SERVICE_PACKAGES.find((p) => p.id === selectedPackage) || SERVICE_PACKAGES[0];
  const currentPkgTrans = PACKAGE_I18N[currentPkg.id];
  const currentPkgTitle = currentPkgTrans ? currentPkgTrans.title[language] : currentPkg.title;

  const handleDirectQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteError('');

    // Honeypot check
    if (websiteTrap) {
      setQuoteSent(true);
      return;
    }

    if (!clientName.trim()) {
      setQuoteError(
        language === 'ca'
          ? 'Per favor, indica el teu nom.'
          : language === 'es'
          ? 'Por favor, indica tu nombre.'
          : 'Please enter your name.'
      );
      return;
    }

    if (!isValidEmail(clientEmail)) {
      setQuoteError(
        language === 'ca'
          ? 'Introduïu un correu electrònic vàlid.'
          : language === 'es'
          ? 'Introduce un correo electrónico válido.'
          : 'Please enter a valid email address.'
      );
      return;
    }

    const rate = checkSubmissionRateLimit();
    if (!rate.allowed) {
      setQuoteError(
        language === 'ca'
          ? `Espereu ${rate.waitSeconds} segons abans de tornar a enviar.`
          : language === 'es'
          ? `Espera ${rate.waitSeconds} segundos antes de volver a enviar.`
          : `Please wait ${rate.waitSeconds}s before submitting again.`
      );
      return;
    }

    setQuoteSending(true);

    const cleanName = sanitizeUserInput(clientName, 100);
    const cleanEmail = sanitizeUserInput(clientEmail, 120);
    const cleanNotes = sanitizeUserInput(clientNotes, 600);

    const selectedExtraNames = selectedExtras
      .map((id) => EXTRAS_I18N.find((e) => e.id === id)?.name[language])
      .filter(Boolean)
      .join(', ');

    await submitToFormspree({
      name: cleanName,
      email: cleanEmail,
      inquiryType: `Solicitud de Presupuesto: ${currentPkgTitle}`,
      estimatedBudget: 'A medida / Consultar sin compromiso',
      message: `${cleanNotes || 'Solicitud de presupuesto personalizado.'}\nServicio principal: ${currentPkgTitle}\nComplementos requeridos: ${selectedExtraNames || 'Ninguno'}`,
      sourceScreen: 'Solicitud de Presupuesto (#serveis)',
      language,
    });

    setQuoteSending(false);
    setQuoteSent(true);
  };

  const generateWhatsAppMessage = () => {
    const selectedExtraNames = selectedExtras
      .map((id) => EXTRAS_I18N.find((e) => e.id === id)?.name[language])
      .filter(Boolean)
      .join(', ');

    const text =
      language === 'ca'
        ? `Hola RAFA 930, m'interessa sol·licitar un pressupost personalitzat per al servei de "${currentPkgTitle}"${
            selectedExtraNames ? ` amb els complements: ${selectedExtraNames}` : ''
          }. Podem parlar per concretar detalls?`
        : language === 'es'
        ? `Hola RAFA 930, me interesa solicitar un presupuesto personalizado para el servicio de "${currentPkgTitle}"${
            selectedExtraNames ? ` con los extras: ${selectedExtraNames}` : ''
          }. ¿Podemos hablar para concretar detalles?`
        : `Hello RAFA 930, I would like to request a custom quote for "${currentPkgTitle}"${
            selectedExtraNames ? ` with add-ons: ${selectedExtraNames}` : ''
          }. Can we discuss the details?`;

    return `https://wa.me/34671591814?text=${encodeURIComponent(text)}`;
  };

  const generateMailto = () => {
    const subject =
      language === 'ca'
        ? `Sol·licitud de Pressupost: ${currentPkgTitle} - RAFA 930`
        : language === 'es'
        ? `Solicitud de Presupuesto: ${currentPkgTitle} - RAFA 930`
        : `Quote Request: ${currentPkgTitle} - RAFA 930`;

    const selectedExtraNames = selectedExtras
      .map((id) => EXTRAS_I18N.find((e) => e.id === id)?.name[language])
      .filter(Boolean)
      .join(', ');

    const body =
      language === 'ca'
        ? `Hola RAFA 930,\n\nM'agradaria demanar un pressupost personalitzat per al servei: ${currentPkgTitle}.\nComplements requerits: ${selectedExtraNames || 'Cap'}.\n\nNom:\nTelèfon:\nDetalls del projecte:\n`
        : language === 'es'
        ? `Hola RAFA 930,\n\nMe gustaría pedir un presupuesto personalizado para el servicio: ${currentPkgTitle}.\nComplementos requeridos: ${selectedExtraNames || 'Ninguno'}.\n\nNombre:\nTeléfono:\nDetalles del proyecto:\n`
        : `Hello RAFA 930,\n\nI would like to request a custom quote for: ${currentPkgTitle}.\nRequired add-ons: ${selectedExtraNames || 'None'}.\n\nName:\nPhone:\nProject details:\n`;

    return `mailto:rafa.930music@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16 space-y-16 overflow-hidden">
      <SectionColorBubbles variant="electric" />

      {/* Editorial Header */}
      <div className="border-b border-[#22222e] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1b5] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            <span className="text-[#ec4899] font-semibold">
              {language === 'ca'
                ? 'SERVEIS PROFESSIONALS · RAFA 930'
                : language === 'es'
                ? 'SERVICIOS PROFESIONALES · RAFA 930'
                : 'PROFESSIONAL SERVICES · RAFA 930'}
            </span>
            <span aria-hidden="true" className="text-[#00d4ff]">·</span>
            <span>
              {language === 'ca'
                ? 'MÚSICA, FOTOGRAFIA & DESENVOLUPAMENT WEB'
                : language === 'es'
                ? 'MÚSICA, FOTOGRAFÍA & DESARROLLO WEB'
                : 'MUSIC, PHOTOGRAPHY & WEB DEVELOPMENT'}
            </span>
          </div>

          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl font-semibold text-[#ffffff]">
            {language === 'ca'
              ? 'Solucions Creatives & Digitals'
              : language === 'es'
              ? 'Soluciones Creativas & Digitales'
              : 'Creative & Digital Solutions'}
          </h1>

          <p className="text-[#a1a1b5] text-base max-w-2xl mt-2 leading-relaxed">
            {language === 'ca'
              ? 'Producció artística i desenvolupament digital per a músics, marques i professionals. Selecciona una disciplina i sol·licita el teu pressupost a mida.'
              : language === 'es'
              ? 'Producción artística y desarrollo digital para músicos, marcas y profesionales. Selecciona una disciplina y solicita tu presupuesto a medida.'
              : 'Artistic production and digital development for musicians, brands, and professionals. Select a discipline and request your custom quote.'}
          </p>
        </div>

        <a
          href="https://rafa930music-sudo.github.io/930-Digital/"
          target="_blank"
          rel="noopener noreferrer"
          className="touch-target-48 inline-flex items-center gap-2 gradient-lila-rosa-rojo text-white text-xs font-semibold px-6 py-3.5 rounded-lg hover:opacity-95 transition-all shrink-0 whitespace-nowrap shadow-md"
        >
          <span>
            {language === 'ca'
              ? 'Visitar Estudi Digital'
              : language === 'es'
              ? 'Visitar Estudio Digital'
              : 'Visit Digital Studio'}
          </span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* 3 Main Discipline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SERVICE_PACKAGES.map((pkg, idx) => {
          const isSelected = selectedPackage === pkg.id;
          const pkgTrans = PACKAGE_I18N[pkg.id];
          const title = pkgTrans ? pkgTrans.title[language] : pkg.title;
          const desc = pkgTrans ? pkgTrans.description[language] : pkg.description;
          const turnaround = pkgTrans ? pkgTrans.turnaround[language] : pkg.turnaround;
          const features = pkgTrans ? pkgTrans.features[language] : pkg.features;

          return (
            <Card3D
              key={pkg.id}
              intensity={3}
              onClick={() => setSelectedPackage(pkg.id)}
              glowColor="rgba(168, 85, 247, 0.2)"
              className={`bg-[#111118] border rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'border-[#a855f7] shadow-[0_4px_24px_rgba(168,85,247,0.25)]'
                  : 'border-[#22222e] hover:border-[#a855f7]/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#a1a1b5] mb-4">
                  <span className="text-[#a855f7] font-semibold">
                    0{idx + 1}.{' '}
                    {language === 'ca' ? 'DISCIPLINA' : language === 'es' ? 'DISCIPLINA' : 'SERVICE'}
                  </span>
                  {isSelected && (
                    <span className="text-[#ec4899] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#ec4899]" />
                      {language === 'ca'
                        ? 'SELECCIONAT'
                        : language === 'es'
                        ? 'SELECCIONADO'
                        : 'SELECTED'}
                    </span>
                  )}
                </div>

                <div className="w-11 h-11 rounded-lg bg-[#0a0a0f] border border-[#22222e] flex items-center justify-center mb-5">
                  {pkg.category === 'musica' && <Mic className="w-5 h-5 text-[#a855f7]" />}
                  {pkg.category === 'fotografia' && <Camera className="w-5 h-5 text-[#ec4899]" />}
                  {pkg.category === 'web' && <Terminal className="w-5 h-5 text-[#00d4ff]" />}
                </div>

                <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#ffffff] mb-2">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-[#a1a1b5] leading-relaxed mb-6">{desc}</p>

                <div className="space-y-2.5 border-t border-[#22222e] pt-4 mb-6">
                  {features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#ffffff]">
                      <CheckCircle2 className="w-4 h-4 text-[#ec4899] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#22222e] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#00d4ff]">
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {language === 'ca'
                      ? 'Demana Pressupost'
                      : language === 'es'
                      ? 'Pedir Presupuesto'
                      : 'Request Quote'}
                  </span>
                </div>
                <div className="text-right text-[11px] font-mono text-[#a855f7]">
                  <Clock className="w-3 h-3 inline mr-1" />
                  <span>{turnaround}</span>
                </div>
              </div>
            </Card3D>
          );
        })}
      </div>

      {/* Interactive Custom Quote Request Panel */}
      <section className="bg-[#111118] border border-[#00d4ff]/35 rounded-2xl p-6 sm:p-10 shadow-[0_0_24px_rgba(0,212,255,0.08)]">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1 space-y-6 w-full">
            <div className="flex items-center gap-2.5">
              <FileSpreadsheet className="w-6 h-6 text-[#00d4ff]" />
              <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-semibold text-[#ffffff]">
                {language === 'ca'
                  ? 'Sol·licitud de Pressupost Personalitzat'
                  : language === 'es'
                  ? 'Solicitud de Presupuesto Personalizado'
                  : 'Custom Quote Request'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#a1a1b5] leading-relaxed">
              {language === 'ca'
                ? 'Personalitza el teu encàrrec afegint els complements tècnics o artístics que s’ajustin a la teva idea. Rebràs una proposta a mida sense cap compromís.'
                : language === 'es'
                ? 'Personaliza tu encargo añadiendo los complementos técnicos o artísticos que se ajusten a tu idea. Recibirás una propuesta a medida sin ningún compromiso.'
                : 'Customize your project by selecting the technical or artistic add-ons that fit your idea. You will receive a tailored proposal with no obligation.'}
            </p>

            <div className="space-y-3">
              <span className="text-xs font-mono text-[#a855f7] block">
                {language === 'ca'
                  ? 'Complements i requisits addicionals:'
                  : language === 'es'
                  ? 'Complementos y requisitos adicionales:'
                  : 'Additional add-ons and requirements:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXTRAS_I18N.map((extra) => {
                  const isChecked = selectedExtras.includes(extra.id);
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra.id)}
                      className={`p-3.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-[#ec4899]/10 border-[#ec4899] text-[#ffffff]'
                          : 'bg-[#0a0a0f] border-[#22222e] text-[#a1a1b5] hover:border-[#a855f7]'
                      }`}
                    >
                      <span className="text-xs font-semibold block pr-2">{extra.name[language]}</span>
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 ${
                          isChecked
                            ? 'bg-[#ec4899] border-[#ec4899] text-white'
                            : 'border-[#22222e]'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Proposal Summary & Submission Panel */}
          <div className="w-full lg:w-96 bg-[#0a0a0f] border border-[#00d4ff]/35 rounded-xl p-6 space-y-6 shadow-[0_0_20px_rgba(0,212,255,0.06)]">
            <div className="border-b border-[#22222e] pb-4">
              <span className="text-[11px] font-mono text-[#00d4ff] font-semibold uppercase tracking-wider block mb-1">
                {language === 'ca'
                  ? 'Resum de la sol·licitud'
                  : language === 'es'
                  ? 'Resumen de la solicitud'
                  : 'Request summary'}
              </span>
              <h4 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#ffffff]">
                {currentPkgTitle}
              </h4>
            </div>

            {selectedExtras.length > 0 && (
              <div className="space-y-2 border-b border-[#22222e] pb-4">
                <span className="text-[11px] font-mono text-[#a1a1b5] block">
                  {language === 'ca'
                    ? 'Complements seleccionats:'
                    : language === 'es'
                    ? 'Complementos seleccionados:'
                    : 'Selected add-ons:'}
                </span>
                {selectedExtras.map((id) => {
                  const item = EXTRAS_I18N.find((e) => e.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="flex items-center gap-1.5 text-xs text-[#ffffff]">
                      <Check className="w-3.5 h-3.5 text-[#ec4899] shrink-0" />
                      <span className="truncate">{item.name[language]}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="space-y-3 pt-2">
              {quoteSent ? (
                <div className="p-4 rounded-lg bg-[#111118] border border-[#00d4ff] text-center space-y-1.5">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#00d4ff]">
                    <Check className="w-4 h-4" />
                    <span>
                      {language === 'ca'
                        ? 'Sol·licitud enviada a RAFA 930!'
                        : language === 'es'
                        ? '¡Solicitud enviada a RAFA 930!'
                        : 'Quote request sent to RAFA 930!'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#a1a1b5]">
                    {language === 'ca'
                      ? `Et respondrem directament a ${clientEmail} en menys de 24h.`
                      : language === 'es'
                      ? `Te responderemos directamente a ${clientEmail} en menos de 24h.`
                      : `We will reply directly to ${clientEmail} within 24h.`}
                  </p>
                </div>
              ) : showQuickForm ? (
                <form onSubmit={handleDirectQuoteSubmit} className="space-y-3 p-4 rounded-xl bg-[#111118] border border-[#ec4899]/50">
                  {/* Honeypot anti-spam trap */}
                  <input
                    type="text"
                    name="website_trap"
                    value={websiteTrap}
                    onChange={(e) => setWebsiteTrap(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {quoteError && (
                    <p className="text-[11px] text-[#e11d48] font-mono">{quoteError}</p>
                  )}

                  <div>
                    <label className="text-[10px] font-mono text-[#a1a1b5] uppercase block mb-1">
                      {language === 'ca' ? 'Nom *' : language === 'es' ? 'Nombre *' : 'Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder={
                        language === 'ca'
                          ? 'El teu nom o marca'
                          : language === 'es'
                          ? 'Tu nombre o marca'
                          : 'Your name or brand'
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#0a0a0f] border border-[#22222e] text-xs text-white focus:outline-none focus:border-[#ec4899]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#a1a1b5] uppercase block mb-1">
                      {language === 'ca' ? 'Correu *' : language === 'es' ? 'Correo electrónico *' : 'Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="email@domain.com"
                      className="w-full px-3 py-2 rounded-lg bg-[#0a0a0f] border border-[#22222e] text-xs text-white focus:outline-none focus:border-[#ec4899]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#a1a1b5] uppercase block mb-1">
                      {language === 'ca' ? 'Detalls del projecte' : language === 'es' ? 'Detalles del proyecto' : 'Project details'}
                    </label>
                    <input
                      type="text"
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      placeholder={
                        language === 'ca'
                          ? 'Data orientativa, idea o comentaris'
                          : language === 'es'
                          ? 'Fecha orientativa, idea o comentarios'
                          : 'Target date, idea or comments'
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#0a0a0f] border border-[#22222e] text-xs text-white focus:outline-none focus:border-[#ec4899]"
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="submit"
                      disabled={quoteSending}
                      className="flex-1 py-2.5 px-3 rounded-lg gradient-lila-rosa-rojo text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md"
                    >
                      {quoteSending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {language === 'ca'
                          ? 'Enviar Sol·licitud'
                          : language === 'es'
                          ? 'Enviar Solicitud'
                          : 'Send Request'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowQuickForm(false)}
                      className="px-3 py-2.5 rounded-lg bg-[#0a0a0f] border border-[#22222e] text-[11px] text-[#a1a1b5] hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowQuickForm(true)}
                  className="touch-target-48 w-full gradient-lila-rosa-rojo text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {language === 'ca'
                      ? 'Demanar Pressupost Personalitzat'
                      : language === 'es'
                      ? 'Pedir Presupuesto Personalizado'
                      : 'Request Custom Quote'}
                  </span>
                </button>
              )}

              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target-48 w-full bg-[#111118] border border-[#a855f7]/50 hover:border-[#a855f7] text-[#ffffff] font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#a855f7]" />
                <span>
                  {language === 'ca'
                    ? 'Consultar per WhatsApp'
                    : language === 'es'
                    ? 'Consultar por WhatsApp'
                    : 'Consult via WhatsApp'}
                </span>
              </a>

              <a
                href={generateMailto()}
                className="touch-target-48 w-full bg-[#111118] border border-[#22222e] hover:border-[#ec4899] text-[#ffffff] font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#ec4899]" />
                <span>
                  {language === 'ca'
                    ? 'Consultar per Correu'
                    : language === 'es'
                    ? 'Consultar por Correo'
                    : 'Consult via Email'}
                </span>
              </a>
            </div>

            <p className="text-[11px] text-[#a1a1b5] text-center font-mono leading-relaxed">
              {language === 'ca'
                ? 'Proposta personalitzada sense cap compromís. Resposta directa en menys de 24h.'
                : language === 'es'
                ? 'Propuesta personalizada sin ningún compromiso. Respuesta directa en menos de 24h.'
                : 'Customized proposal with no obligation. Direct response within 24h.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
