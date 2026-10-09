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
  Terminal,
  Mic,
  Camera,
  CheckCircle2,
  Clock,
  ExternalLink,
  Calculator,
  MessageCircle,
  Mail,
  Send,
  Loader2,
  Check,
} from 'lucide-react';

interface ServeisScreenProps {
  language: Language;
}

interface ExtraItemI18n {
  id: string;
  name: Record<Language, string>;
  price: number;
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
    price: 40,
    category: 'musica',
  },
  {
    id: 'videoclip',
    name: {
      ca: 'Guió i direcció artística per a videoclip',
      es: 'Guion y dirección artística para videoclip',
      en: 'Script & art direction for music video',
    },
    price: 90,
    category: 'musica',
  },
  {
    id: 'cover-art',
    name: {
      ca: 'Disseny de portada oficial en alta resolució',
      es: 'Diseño de portada oficial en alta resolución',
      en: 'High-resolution official cover art design',
    },
    price: 50,
    category: 'musica',
  },
  {
    id: 'extra-photos',
    name: {
      ca: '15 fotografies addicionals editades en alta resolució',
      es: '15 fotografías adicionales editadas en alta resolución',
      en: '15 additional high-resolution edited photographs',
    },
    price: 45,
    category: 'fotografia',
  },
  {
    id: 'reel-bts',
    name: {
      ca: 'Peça vertical / Reel Behind the Scenes 4K',
      es: 'Pieza vertical / Reel Behind the Scenes 4K',
      en: '4K Vertical Reel / Behind the Scenes piece',
    },
    price: 60,
    category: 'fotografia',
  },
  {
    id: 'epk-interactiu',
    name: {
      ca: 'Dossier / EPK interactiu per a promotors i festivals',
      es: 'Dossier / EPK interactivo para promotores y festivales',
      en: 'Interactive EPK / Presskit for promoters & festivals',
    },
    price: 70,
    category: 'web',
  },
  {
    id: 'domain-seo',
    name: {
      ca: 'Configuració de domini propi + posicionament SEO',
      es: 'Configuración de dominio propio + posicionamiento SEO',
      en: 'Custom domain setup + SEO positioning',
    },
    price: 55,
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
        'Professional studio vocal recording',
        'Guidance on melodic structure and urban rhythm',
        'Delivery of audio stems in 24-bit WAV format',
      ],
    },
  },
  'pack-foto': {
    title: {
      ca: 'Sessió Fotogràfica Editorial & Moda',
      es: 'Sesión Fotográfica Editorial & Moda',
      en: 'Editorial & Fashion Photography Session',
    },
    description: {
      ca: 'Retrat d’autor, moda urbana (streetwear) i portades discogràfiques amb estètica cinematogràfica.',
      es: 'Retrato de autor, moda urbana (streetwear) y portadas discográficas con estética cinematográfica.',
      en: 'Auteur portrait, urban streetwear fashion, and album cover shoots with a cinematographic aesthetic.',
    },
    turnaround: {
      ca: '5 – 7 dies',
      es: '5 – 7 días',
      en: '5 – 7 days',
    },
    features: {
      ca: [
        'Sessió de 2 hores en exterior (Barcelona / Sant Adrià) o estudi',
        '20 fotografies editades en alta resolució (color i B/N)',
        'Direcció de posat i estilisme visual urbà',
        'Llicència d’ús per a portades, premsa i xarxes socials',
      ],
      es: [
        'Sesión de 2 horas en exterior (Barcelona / Sant Adrià) o estudio',
        '20 fotografías editadas en alta resolución (color y B/N)',
        'Dirección de posado y estilismo visual urbano',
        'Licencia de uso para portadas, prensa y redes sociales',
      ],
      en: [
        '2-hour outdoor (Barcelona / Sant Adrià) or studio session',
        '20 high-resolution edited photos (color and B&W)',
        'Posing direction and urban visual styling',
        'Usage license for cover art, press, and social media',
      ],
    },
  },
  'pack-web': {
    title: {
      ca: 'Desenvolupament Web & Portfoli Digital',
      es: 'Desarrollo Web & Portfolio Digital',
      en: 'Web Development & Digital Portfolio',
    },
    description: {
      ca: 'Disseny i programació de pàgines web d’alt impacte per a artistes, segells, estudis creatius i marques.',
      es: 'Diseño y programación de páginas web de alto impacto para artistas, sellos, estudios creativos y marcas.',
      en: 'High-impact website design and development for artists, labels, creative studios, and brands.',
    },
    turnaround: {
      ca: '10 – 15 dies',
      es: '10 – 15 días',
      en: '10 – 15 days',
    },
    features: {
      ca: [
        'Disseny web responsive a mida (Mòbil, Tablet i Escriptori)',
        'Integració de catàleg musical, galeria i formulari de booking',
        'Optimització de velocitat, accessibilitat i SEO',
        'Multillenguatge (Català, Espanyol i Anglès) inclòs',
      ],
      es: [
        'Diseño web responsive a medida (Móvil, Tablet y Escritorio)',
        'Integración de catálogo musical, galería y formulario de booking',
        'Optimización de velocidad, accesibilidad y SEO',
        'Multiidioma (Catalán, Español e Inglés) incluido',
      ],
      en: [
        'Custom responsive web design (Mobile, Tablet, and Desktop)',
        'Integration of music catalog, gallery, and booking form',
        'Speed, accessibility, and SEO optimization',
        'Multilingual support (Catalan, Spanish, and English) included',
      ],
    },
  },
};

export const ServeisScreen: React.FC<ServeisScreenProps> = ({ language }) => {
  const [selectedPackage, setSelectedPackage] = useState<string>('pack-web');
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['domain-seo']);
  const [showQuickForm, setShowQuickForm] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [quoteSending, setQuoteSending] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  const currentPkg = SERVICE_PACKAGES.find((p) => p.id === selectedPackage) || SERVICE_PACKAGES[0];
  const currentPkgI18n = PACKAGE_I18N[currentPkg.id];
  const currentPkgTitle = currentPkgI18n ? currentPkgI18n.title[language] : currentPkg.title;

  const toggleExtra = (id: string) => {
    setQuoteSent(false);
    if (selectedExtras.includes(id)) {
      setSelectedExtras(selectedExtras.filter((e) => e !== id));
    } else {
      setSelectedExtras([...selectedExtras, id]);
    }
  };

  const extrasTotal = selectedExtras.reduce((sum, extraId) => {
    const extra = EXTRAS_I18N.find((e) => e.id === extraId);
    return sum + (extra ? extra.price : 0);
  }, 0);

  const totalPrice = currentPkg.basePrice + extrasTotal;

  const handleDirectQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteError(null);
    const cleanName = sanitizeUserInput(clientName, 80);
    const cleanEmail = sanitizeUserInput(clientEmail, 120);
    const cleanNotes = sanitizeUserInput(clientNotes, 500);

    if (!cleanName || cleanName.length < 2) {
      setQuoteError(
        language === 'ca'
          ? 'Introdueix el teu nom.'
          : language === 'es'
          ? 'Introduce tu nombre.'
          : 'Please enter your name.'
      );
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setQuoteError(
        language === 'ca'
          ? 'Introdueix un correu vàlid.'
          : language === 'es'
          ? 'Introduce un correo válido.'
          : 'Please enter a valid email.'
      );
      return;
    }
    const rate = checkSubmissionRateLimit();
    if (!rate.allowed) {
      setQuoteError(
        language === 'ca'
          ? `Espera ${rate.waitSeconds}s abans d'enviar.`
          : language === 'es'
          ? `Espera ${rate.waitSeconds}s antes de enviar.`
          : `Please wait ${rate.waitSeconds}s.`
      );
      return;
    }

    const selectedExtraNames = selectedExtras
      .map((id) => EXTRAS_I18N.find((ex) => ex.id === id)?.name[language])
      .filter(Boolean)
      .join(', ');

    setQuoteSending(true);
    await submitToFormspree({
      name: cleanName,
      email: cleanEmail,
      inquiryType: `Presupuesto: ${currentPkgTitle}`,
      estimatedBudget: `${totalPrice} € (Base ${currentPkg.basePrice}€ + Extras: ${selectedExtraNames || 'Ninguno'})`,
      message: cleanNotes || `Solicitud de presupuesto calculado online para ${currentPkgTitle}.`,
      sourceScreen: 'Calculadora de Servicios (#serveis)',
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
        ? `Hola RAFA 930, m'interessa contractar el servei "${currentPkgTitle}" (Base: ${currentPkg.basePrice}€)${
            selectedExtraNames ? ` amb els complements: ${selectedExtraNames}` : ''
          }. Pressupost estimat: ${totalPrice}€. Podem parlar per concretar dates?`
        : language === 'es'
        ? `Hola RAFA 930, me interesa contratar el servicio de "${currentPkgTitle}" (Base: ${currentPkg.basePrice}€)${
            selectedExtraNames ? ` con los extras: ${selectedExtraNames}` : ''
          }. Presupuesto estimado: ${totalPrice}€. ¿Podemos hablar para concretar fechas?`
        : `Hello RAFA 930, I am interested in booking the "${currentPkgTitle}" service (Base: ${currentPkg.basePrice}€)${
            selectedExtraNames ? ` with extras: ${selectedExtraNames}` : ''
          }. Estimated budget: ${totalPrice}€. Can we discuss dates?`;

    return `https://wa.me/34671591814?text=${encodeURIComponent(text)}`;
  };

  const generateMailto = () => {
    const subject =
      language === 'ca'
        ? `Pressupost Professional: ${currentPkgTitle} - RAFA 930`
        : language === 'es'
        ? `Presupuesto Profesional: ${currentPkgTitle} - RAFA 930`
        : `Professional Quote: ${currentPkgTitle} - RAFA 930`;
    const body =
      language === 'ca'
        ? `Hola RAFA 930,\n\nM'agradaria sol·licitar el servei: ${currentPkgTitle}.\nComplements seleccionats: ${selectedExtras.join(', ') || 'Cap'}\nPressupost estimat: ${totalPrice}€.\n\nNom:\nTelèfon:\nDetalls del projecte:\n`
        : language === 'es'
        ? `Hola RAFA 930,\n\nMe gustaría solicitar el servicio de ${currentPkgTitle}.\nExtras seleccionados: ${selectedExtras.join(', ') || 'Ninguno'}\nPresupuesto estimado: ${totalPrice}€.\n\nNombre:\nTeléfono:\nDetalles del proyecto:\n`
        : `Hello RAFA 930,\n\nI would like to request the ${currentPkgTitle} service.\nSelected extras: ${selectedExtras.join(', ') || 'None'}\nEstimated budget: ${totalPrice}€.\n\nName:\nPhone:\nProject details:\n`;
    return `mailto:rafa.930music@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16 space-y-16 overflow-hidden">
      <SectionColorBubbles variant="electric" />
      {/* Editorial Header */}
      <div className="border-b border-[#22222e] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1b5] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
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
              ? 'Producció artística i desenvolupament digital per a músics, marques i professionals. Selecciona una disciplina i configura el teu pressupost a mida.'
              : language === 'es'
              ? 'Producción artística y desarrollo digital para músicos, marcas y profesionales. Selecciona una disciplina y configura tu presupuesto a medida.'
              : 'Artistic production and digital development for musicians, brands, and professionals. Select a discipline and configure your custom quote.'}
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
              intensity={4}
              onClick={() => setSelectedPackage(pkg.id)}
              glowColor="rgba(236, 72, 153, 0.16)"
              className={`bg-[#111118] border rounded-xl p-6 sm:p-8 cursor-pointer ${
                isSelected ? 'border-[#ec4899]' : 'border-[#22222e] hover:border-[#a855f7]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#a1a1b5] mb-4">
                  <span className="text-[#a855f7] font-semibold">
                    0{idx + 1}.{' '}
                    {language === 'ca' ? 'MODALITAT' : language === 'es' ? 'MODALIDAD' : 'PACKAGE'}
                  </span>
                  {isSelected && (
                    <span className="text-[#ec4899] font-semibold">
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

              <div className="pt-4 border-t border-[#22222e] flex items-baseline justify-between tabular-nums">
                <div>
                  <span className="text-[11px] font-mono text-[#a1a1b5] block">
                    {language === 'ca'
                      ? 'Tarifa base des de'
                      : language === 'es'
                      ? 'Tarifa base desde'
                      : 'Base rate from'}
                  </span>
                  <span className="text-3xl font-semibold text-[#ffffff] font-['Cormorant_Garamond']">
                    {pkg.basePrice} €
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

      {/* Interactive Live Budget Calculator */}
      <section className="bg-[#111118] border border-[#00d4ff]/35 rounded-xl p-6 sm:p-10 shadow-[0_0_24px_rgba(0,212,255,0.08)]">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1 space-y-6 w-full">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#00d4ff]" />
              <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-semibold text-[#ffffff]">
                {language === 'ca'
                  ? 'Calculadora de Pressupost a Mida'
                  : language === 'es'
                  ? 'Calculadora de Presupuesto a Medida'
                  : 'Custom Quote Calculator'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#a1a1b5]">
              {language === 'ca'
                ? 'Personalitza el teu encàrrec afegint complements tècnics o artístics segons els objectius del teu projecte.'
                : language === 'es'
                ? 'Personaliza tu encargo añadiendo complementos técnicos o artísticos según los objetivos de tu proyecto.'
                : 'Customize your order by adding technical or artistic add-ons tailored to your project goals.'}
            </p>

            <div className="space-y-3">
              <span className="text-xs font-mono text-[#a855f7] block">
                {language === 'ca'
                  ? 'Complements disponibles:'
                  : language === 'es'
                  ? 'Complementos disponibles:'
                  : 'Available add-ons:'}
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
                      <div className="space-y-0.5 pr-2">
                        <span className="text-xs font-semibold block">{extra.name[language]}</span>
                        <span className="text-[11px] font-mono text-[#ec4899] tabular-nums">
                          +{extra.price} €
                        </span>
                      </div>
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

          {/* Right: Summary Box */}
          <div className="w-full lg:w-96 bg-[#0a0a0f] border border-[#00d4ff]/35 rounded-xl p-6 space-y-6 tabular-nums shadow-[0_0_20px_rgba(0,212,255,0.06)]">
            <div className="border-b border-[#22222e] pb-4">
              <span className="text-[11px] font-mono text-[#00d4ff] font-semibold">
                {language === 'ca'
                  ? 'Resum de la proposta'
                  : language === 'es'
                  ? 'Resumen de la propuesta'
                  : 'Proposal summary'}
              </span>
              <h4 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#ffffff] mt-1">
                {currentPkgTitle}
              </h4>
              <span className="text-xs font-mono text-[#a855f7]">
                {language === 'ca'
                  ? `Tarifa base: ${currentPkg.basePrice} €`
                  : language === 'es'
                  ? `Tarifa base: ${currentPkg.basePrice} €`
                  : `Base rate: ${currentPkg.basePrice} €`}
              </span>
            </div>

            {selectedExtras.length > 0 && (
              <div className="space-y-2 border-b border-[#22222e] pb-4">
                <span className="text-[11px] font-mono text-[#a1a1b5]">
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
                    <div key={id} className="flex justify-between text-xs text-[#ffffff]">
                      <span className="truncate pr-2">{item.name[language]}</span>
                      <span className="font-mono text-[#ec4899]">+{item.price}€</span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex items-baseline justify-between pt-2">
              <span className="text-sm text-[#a1a1b5] font-medium">
                {language === 'ca'
                  ? 'Total estimat'
                  : language === 'es'
                  ? 'Total estimado'
                  : 'Estimated total'}
              </span>
              <span className="text-4xl font-semibold font-['Cormorant_Garamond'] text-gradient-lila-rosa-rojo">
                {totalPrice} €
              </span>
            </div>

            <div className="space-y-2.5 pt-2">
              {quoteSent ? (
                <div className="p-4 rounded-lg bg-[#111118] border border-[#00d4ff] text-center space-y-1.5">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#00d4ff]">
                    <Check className="w-4 h-4" />
                    <span>
                      {language === 'ca'
                        ? 'Pressupost enviat a RAFA 930!'
                        : language === 'es'
                        ? '¡Presupuesto enviado a RAFA 930!'
                        : 'Quote sent to RAFA 930!'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#a1a1b5]">
                    {language === 'ca'
                      ? `Rebràs resposta a ${clientEmail} en menys de 24h.`
                      : language === 'es'
                      ? `Recibirás respuesta en ${clientEmail} en menos de 24h.`
                      : `You will receive a reply at ${clientEmail} within 24h.`}
                  </p>
                </div>
              ) : showQuickForm ? (
                <form onSubmit={handleDirectQuoteSubmit} className="space-y-2.5 p-3.5 rounded-lg bg-[#111118] border border-[#ec4899]/50">
                  {quoteError && (
                    <p className="text-[11px] text-[#e11d48] font-mono">{quoteError}</p>
                  )}
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={
                      language === 'ca'
                        ? 'El teu nom *'
                        : language === 'es'
                        ? 'Tu nombre *'
                        : 'Your name *'
                    }
                    className="w-full px-3 py-2 rounded bg-[#0a0a0f] border border-[#22222e] text-xs text-white focus:outline-none focus:border-[#ec4899]"
                  />
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder={
                      language === 'ca'
                        ? 'El teu correu *'
                        : language === 'es'
                        ? 'Tu correo electrónico *'
                        : 'Your email *'
                    }
                    className="w-full px-3 py-2 rounded bg-[#0a0a0f] border border-[#22222e] text-xs text-white focus:outline-none focus:border-[#ec4899]"
                  />
                  <input
                    type="text"
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder={
                      language === 'ca'
                        ? 'Data o nota breu (opcional)'
                        : language === 'es'
                        ? 'Fecha o nota breve (opcional)'
                        : 'Date or brief note (optional)'
                    }
                    className="w-full px-3 py-2 rounded bg-[#0a0a0f] border border-[#22222e] text-xs text-white focus:outline-none focus:border-[#ec4899]"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={quoteSending}
                      className="flex-1 py-2.5 px-3 rounded gradient-lila-rosa-rojo text-white font-semibold text-xs flex items-center justify-center gap-1.5"
                    >
                      {quoteSending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {language === 'ca'
                          ? 'Confirmar enviament'
                          : language === 'es'
                          ? 'Confirmar envío'
                          : 'Confirm send'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowQuickForm(false)}
                      className="px-2.5 py-2 rounded bg-[#0a0a0f] border border-[#22222e] text-[11px] text-[#a1a1b5] hover:text-white"
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
                      ? 'Enviar Pressupost Directe (Web)'
                      : language === 'es'
                      ? 'Enviar Presupuesto Directo (Web)'
                      : 'Send Direct Quote (Web)'}
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
                    ? 'Sol·licitar per WhatsApp'
                    : language === 'es'
                    ? 'Solicitar por WhatsApp'
                    : 'Request via WhatsApp'}
                </span>
              </a>

              <a
                href={generateMailto()}
                className="touch-target-48 w-full bg-[#111118] border border-[#22222e] hover:border-[#ec4899] text-[#ffffff] font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#ec4899]" />
                <span>
                  {language === 'ca'
                    ? 'Sol·licitar per Correu'
                    : language === 'es'
                    ? 'Solicitar por Correo'
                    : 'Request via Email'}
                </span>
              </a>
            </div>

            <p className="text-[11px] text-[#a1a1b5] text-center font-mono">
              {language === 'ca'
                ? 'Pressupost orientatiu sense compromís. Resposta en menys de 24h.'
                : language === 'es'
                ? 'Presupuesto orientativo sin compromiso. Respuesta en menos de 24h.'
                : 'Non-binding estimated quote. Response within 24h.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
