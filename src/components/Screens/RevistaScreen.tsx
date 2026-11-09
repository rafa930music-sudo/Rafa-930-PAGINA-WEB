import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScreenId, Language, LegalDocId } from '../../types';
import {
  ARTIST_IMAGES,
  COLLABORATORS,
  OFFICIAL_SPOTIFY_URL,
  OFFICIAL_YOUTUBE_URL,
} from '../../data/content';
import {
  sanitizeUserInput,
  isValidEmail,
  isValidPhone,
  checkSubmissionRateLimit,
  submitToFormspree,
  FORMSPREE_ENDPOINT,
} from '../../utils/seoAndSecurity';
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
  ShieldCheck,
  Award,
  MapPin,
  Mail,
  Upload,
  RotateCcw,
  X,
  Users,
  Sparkles,
} from 'lucide-react';
import {
  InstagramLogo,
  SpotifyLogo,
  YouTubeLogo,
  WhatsAppLogo,
  DeezerLogo,
  AppleMusicLogo,
  AmazonMusicLogo,
  TidalLogo,
  TikTokLogo,
  SoundcloudLogo,
} from '../PlatformLogos';

interface RevistaScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  onOpenLegalTab?: (tab: LegalDocId) => void;
  onShowSplash?: () => void;
}

const TIMELINE_I18N: {
  year: string;
  badge?: Record<Language, string>;
  title: Record<Language, string>;
  description: Record<Language, string>;
  coverUrl: string;
  highlight?: boolean;
}[] = [
  {
    year: '2023 · Etapa Inicial',
    badge: { ca: 'ETAPA INICIAL', es: 'ETAPA INICIAL', en: 'EARLY STAGE' },
    title: {
      ca: 'Poeta · Arrepentido · Así es la vida · Pienso · La Luna',
      es: 'Poeta · Arrepentido · Así es la vida · Pienso · La Luna',
      en: 'Poeta · Arrepentido · Así es la vida · Pienso · La Luna',
    },
    description: {
      ca: 'Primers temes nascuts des de la sinceritat més crua als carrers de La Mina.',
      es: 'Primeros temas nacidos desde la sinceridad más cruda en las calles de La Mina.',
      en: 'Early tracks born from raw honesty in the streets of La Mina.',
    },
    coverUrl: ARTIST_IMAGES.libraryOrigin,
    highlight: true,
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
    coverUrl: ARTIST_IMAGES.pasanLosDiasCover,
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
    coverUrl: ARTIST_IMAGES.romeoYJulietaCover,
  },
  {
    year: '2024 · Hit Single',
    badge: { ca: 'HIT SINGLE', es: 'HIT SINGLE', en: 'HIT SINGLE' },
    title: {
      ca: 'Hago Dinero',
      es: 'Hago Dinero',
      en: 'Hago Dinero',
    },
    description: {
      ca: 'Creixement orgànic sostingut en plataformes d’streaming i YouTube amb so trap potent.',
      es: 'Crecimiento orgánico sostenido en plataformas de streaming y YouTube con sonido trap potente.',
      en: 'Sustained organic growth across streaming platforms and YouTube with powerful trap sound.',
    },
    coverUrl: ARTIST_IMAGES.hagoDineroCover,
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
    coverUrl: ARTIST_IMAGES.diferentesCaminosCover,
  },
  {
    year: '2025 · EP Conceptual',
    badge: { ca: "JA A SPOTIFY", es: "YA EN SPOTIFY", en: "OUT ON SPOTIFY" },
    title: {
      ca: "EP 'My World': 1 Minuto y 10 Segundos · Lo Material No Lo Es Todo · Fuck Sistema",
      es: "EP 'My World': 1 Minuto y 10 Segundos · Lo Material No Lo Es Todo · Fuck Sistema",
      en: "EP 'My World': 1 Minuto y 10 Segundos · Lo Material No Lo Es Todo · Fuck Sistema",
    },
    description: {
      ca: 'Un projecte conceptual que desafia el cànon comercial per reivindicar valors reals. Ja disponible oficialment a Spotify.',
      es: 'Un proyecto conceptual que desafía el canon comercial para reivindicar valores reales. Ya disponible oficialmente en Spotify.',
      en: 'A conceptual project challenging commercial norms to champion real values. Available officially on Spotify.',
    },
    coverUrl: ARTIST_IMAGES.epMyWorld,
    highlight: true,
  },
  {
    year: '2026 · Senzills Oficials',
    badge: { ca: 'LLANÇAMENTS 2026', es: 'LANZAMIENTOS 2026', en: '2026 RELEASES' },
    title: {
      ca: 'Tú Aroma · Nose si estaré mañana',
      es: 'Tú Aroma · Nose si estaré mañana',
      en: 'Tú Aroma · Nose si estaré mañana',
    },
    description: {
      ca: 'Senzills oficials: «Tú Aroma» i «Nose si estaré mañana» amb la producció de 930 Records i Incrife.',
      es: 'Sencillos oficiales: «Tú Aroma» y «Nose si estaré mañana» con la producción de 930 Records e Incrife.',
      en: 'Official singles: “Tú Aroma” and “Nose si estaré mañana” produced by 930 Records and Incrife.',
    },
    coverUrl: ARTIST_IMAGES.single2026,
  },
  {
    year: '2026 · Present (Destacat)',
    badge: { ca: 'TEMA DESTACAT 2026', es: 'TEMA DESTACADO 2026', en: 'FEATURED 2026 RELEASE' },
    title: {
      ca: 'De Vuelta',
      es: 'De Vuelta',
      en: 'De Vuelta',
    },
    description: {
      ca: 'Acabat de pujar: «De Vuelta» lidera els temes destacats de 2026 amb una nova energia nocturna i l’essència pura del 930.',
      es: 'Recién subido: «De Vuelta» lidera los temas destacados de 2026 con una nueva energía nocturna y la esencia pura del 930.',
      en: 'Just uploaded: “De Vuelta” leads the 2026 featured tracks with nocturnal energy and the pure essence of 930.',
    },
    coverUrl: ARTIST_IMAGES.deVuelta2026,
    highlight: true,
  },
];

const COLLABORATORS_ROLE_I18N: Record<string, Record<Language, string>> = {
  incrife: {
    ca: 'Fotògraf & Productor Visual',
    es: 'Fotógrafo & Productor Visual',
    en: 'Photographer & Visual Producer',
  },
  ouxxox: {
    ca: 'Productor & Beatmaker 930',
    es: 'Productor & Beatmaker 930',
    en: 'Producer & Beatmaker 930',
  },
  therassam: {
    ca: 'Artista Vocal & Feats',
    es: 'Artista Vocal & Feats',
    en: 'Vocal Artist & Feats',
  },
  kingsla: {
    ca: 'Artista & Creatiu Urbà',
    es: 'Artista & Creativo Urbano',
    en: 'Urban Artist & Creative',
  },
  salma: {
    ca: 'Model & Imatge Principal',
    es: 'Modelo & Imagen Principal',
    en: 'Lead Model & Visuals',
  },
  toliyug: {
    ca: 'Model Editorial & Moda Urbana',
    es: 'Modelo Editorial & Moda Urbana',
    en: 'Editorial & Urban Fashion Model',
  },
  quiriat: {
    ca: 'Model de Portada & Singles',
    es: 'Modelo de Portada & Singles',
    en: 'Cover Model & Single Visuals',
  },
};

interface ColabExtendedMeta {
  category: 'prod' | 'vocal' | 'model';
  projects: Record<Language, string[]>;
  extendedBio: Record<Language, string>;
}

const COLLABORATORS_EXTENDED_INFO: Record<string, ColabExtendedMeta> = {
  incrife: {
    category: 'prod',
    projects: {
      ca: ['Clarobscur Editorial (Arxiu Oficial)', 'Visuals oficials de Romeo y Julieta', 'Art de Portada de De Vuelta (2026)', 'Direcció Fotogràfica 930'],
      es: ['Claroscuro Editorial (Archivo Oficial)', 'Visuales oficiales de Romeo y Julieta', 'Arte de Portada de De Vuelta (2026)', 'Dirección Fotográfica 930'],
      en: ['Chiaroscuro Editorial (Official Archive)', 'Romeo y Julieta Official Visuals', 'De Vuelta Cover Art (2026)', '930 Photographic Direction'],
    },
    extendedBio: {
      ca: 'Fotògraf i productor visual de referència de RAFA 930. Responsable de la identitat en clarobscur i dels retrats oficials en blanc i negre.',
      es: 'Fotógrafo y productor visual de referencia de RAFA 930. Responsable de la identidad en claroscuro y de los retratos oficiales en blanco y negro.',
      en: 'Primary photographer and visual producer for RAFA 930. Creator of the iconic chiaroscuro aesthetic and monochrome portraits.',
    },
  },
  ouxxox: {
    category: 'prod',
    projects: {
      ca: ['Producció de ritmes & trap fosc', 'Mescles i arranjaments a l’estudi 930', 'Disseny sonor i percussions pesades'],
      es: ['Producción de ritmos & trap oscuro', 'Mezclas y arreglos en el estudio 930', 'Diseño sonoro y percusiones pesadas'],
      en: ['Beat production & dark trap rhythm', 'Mixing and arrangements at 930 studio', 'Sound design and heavy 808 percussion'],
    },
    extendedBio: {
      ca: 'Beatmaker i productor clau de l’equip 930, aportant bombos pesats, caixes afilades i atmosferes de trap melòdic.',
      es: 'Beatmaker y productor clave del equipo 930, aportando bombos pesados, cajas afiladas y atmósferas de trap melódico.',
      en: 'Core beatmaker and producer of the 930 crew, delivering driving 808s, tight snares, and melodic trap textures.',
    },
  },
  therassam: {
    category: 'vocal',
    projects: {
      ca: ['Col·laboracions vocals en directe', 'Composició compartida a Barcelona', 'Feats representatius del Besòs'],
      es: ['Colaboraciones vocales en directo', 'Composición compartida en Barcelona', 'Feats representativos del Besòs'],
      en: ['Live vocal collaborations', 'Co-writing sessions in Barcelona', 'Besòs urban scene feature verses'],
    },
    extendedBio: {
      ca: 'Artista urbà i col·laborador vocal habitual de RAFA 930. Representa l’energia d’estudi i la connexió directa amb l’escena de carrer.',
      es: 'Artista urbano y colaborador vocal habitual de RAFA 930. Representa la energía de estudio y la conexión directa con la escena callejera.',
      en: 'Urban artist and frequent vocal ally of RAFA 930, bringing raw studio energy and authentic street connection.',
    },
  },
  kingsla: {
    category: 'vocal',
    projects: {
      ca: ['Sessions freestyle i lletres', 'Visuals col·laboratius', 'Moviment musical underground'],
      es: ['Sesiones freestyle y letras', 'Visuales colaborativos', 'Movimiento musical underground'],
      en: ['Freestyle sessions & lyricism', 'Collaborative visuals', 'Underground music movement'],
    },
    extendedBio: {
      ca: 'Artista actiu a les xarxes i l’escena urbana underground, aliat creatiu en projectes musicals autèntics.',
      es: 'Artista activo en redes y la escena urbana underground, aliado creativo en proyectos musicales auténticos.',
      en: 'Underground urban artist active across Barcelona street culture and collaborative musical projects.',
    },
  },
  salma: {
    category: 'model',
    projects: {
      ca: ['Sessió de fotos editorial de moda', 'Protagonista de videoclips oficials', 'Campanyes d’estilisme urbà contemporani'],
      es: ['Sesión de fotos editorial de moda', 'Protagonista de videoclips oficiales', 'Campañas de estilismo urbano contemporáneo'],
      en: ['Fashion editorial photo session', 'Lead protagonist in music videos', 'Contemporary urban styling campaigns'],
    },
    extendedBio: {
      ca: 'Model protagonista en sessions fotogràfiques i visuals de RAFA 930, aportant estilisme contemporani i expressivitat.',
      es: 'Modelo protagonista en sesiones fotográficas y visuales de RAFA 930, aportando estilismo contemporáneo y expresividad.',
      en: 'Lead model for RAFA 930 editorial shoots and music videos, providing contemporary urban styling and expressive presence.',
    },
  },
  toliyug: {
    category: 'model',
    projects: {
      ca: ['Editorial de cuir i moda nocturna', 'Lookbook oficial de roba urbana', 'Fotografia conceptual a Barcelona'],
      es: ['Editorial de cuero y moda nocturna', 'Lookbook oficial de ropa urbana', 'Fotografía conceptual en Barcelona'],
      en: ['Leather & nightwear editorial', 'Official street style lookbook', 'Conceptual urban photo projects'],
    },
    extendedBio: {
      ca: 'Model especialitzada en campanyes editorials de moda urbana, cuir i estètica nocturna pels carrers de Barcelona.',
      es: 'Modelo especializada en campañas editoriales de moda urbana, cuero y estética nocturna por las calles de Barcelona.',
      en: 'Model specializing in high-contrast urban fashion, leather editorials, and night street aesthetics in Barcelona.',
    },
  },
  quiriat: {
    category: 'model',
    projects: {
      ca: ['Rodatges de singles oficials', 'Sessions fotogràfiques al litoral', 'Direcció d’imatge i estilisme al Besòs'],
      es: ['Rodajes de singles oficiales', 'Sesiones fotográficas en el litoral', 'Dirección de imagen y estilismo en el Besòs'],
      en: ['Official single shoots', 'Coastal photo sessions', 'Visual direction and styling in Besòs'],
    },
    extendedBio: {
      ca: 'Model en visuals i fotografies de portada oficials de RAFA 930, present a les sessions del litoral de Sant Adrià.',
      es: 'Modelo en visuales y fotografías de portada oficiales de RAFA 930, presente en las sesiones del litoral de Sant Adrià.',
      en: 'Model in official RAFA 930 cover visuals and photography, featured in Sant Adrià coastal sessions.',
    },
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

  // Estado interactivo de colaboradores y equipo creativo
  const [colabCategory, setColabCategory] = useState<'all' | 'prod' | 'vocal' | 'model'>('all');
  const [selectedColabId, setSelectedColabId] = useState<string | null>(null);
  const [uploadSuccessId, setUploadSuccessId] = useState<string | null>(null);
  const [customAvatars, setCustomAvatars] = useState<Record<string, string>>(() => {
    try {
      const stored: Record<string, string> = {};
      COLLABORATORS.forEach((c) => {
        const val = localStorage.getItem(`rafa930_colab_${c.id}`);
        if (val) stored[c.id] = val;
      });
      return stored;
    } catch {
      return {};
    }
  });

  const handleColabImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawData = event.target?.result as string;
      if (!rawData) return;

      const img = new Image();
      img.onload = () => {
        const maxDim = 1000;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.88);
          try {
            localStorage.setItem(`rafa930_colab_${id}`, compressed);
          } catch (err) {
            console.warn('Failed to save avatar to localStorage:', err);
          }
          setCustomAvatars((prev) => ({ ...prev, [id]: compressed }));
          setUploadSuccessId(id);
          setTimeout(() => setUploadSuccessId(null), 3500);
        }
      };
      img.src = rawData;
    };
    reader.readAsDataURL(file);
  };

  const handleResetColabImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.removeItem(`rafa930_colab_${id}`);
    } catch {}
    setCustomAvatars((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

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
          ? 'Si us plau, introdueix el teu nom i cognoms.'
          : language === 'es'
          ? 'Por favor, introduce tu nombre y apellidos completo.'
          : 'Please enter your full name.'
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

    if (!cleanPhone || !isValidPhone(cleanPhone)) {
      setSecurityError(
        language === 'ca'
          ? 'Si us plau, introdueix un número de telèfon o WhatsApp vàlid per al contacte.'
          : language === 'es'
          ? 'Por favor, introduce un número de teléfono o WhatsApp válido para el contacto.'
          : 'Please enter a valid phone or WhatsApp number for contact.'
      );
      return;
    }

    if (!formData.type) {
      setSecurityError(
        language === 'ca'
          ? 'Si us plau, selecciona una àrea de consulta.'
          : language === 'es'
          ? 'Por favor, selecciona un área de consulta.'
          : 'Please select an inquiry area.'
      );
      return;
    }

    if (!cleanMessage || cleanMessage.length < 10) {
      setSecurityError(
        language === 'ca'
          ? 'Si us plau, descriu la teva proposta o projecte (mínim 10 caràcters).'
          : language === 'es'
          ? 'Por favor, describe los detalles de tu propuesta o proyecto (mínimo 10 caracteres).'
          : 'Please describe details of your proposal or project (at least 10 characters).'
      );
      return;
    }

    if (!formData.privacy) {
      setSecurityError(
        language === 'ca'
          ? 'Has d’acceptar la política de privacitat per enviar la sol·licitud.'
          : language === 'es'
          ? 'Debes marcar la casilla para aceptar la política de privacidad antes de enviar.'
          : 'You must check the box to accept the privacy policy before sending.'
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
        className="relative min-h-[88vh] flex items-center justify-center px-4 sm:px-6 md:px-10 py-16 md:py-24 overflow-hidden"
        id="hero"
      >
        {/* Fondo fotográfico auténtico del Barrio de La Mina aportado por el artista */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src={ARTIST_IMAGES.laMinaHeroBg}
            alt="Barrio de La Mina — Edificis de La Mina, Sant Adrià de Besòs (Barcelona 08930)"
            className="w-full h-full object-cover object-center scale-105 filter contrast-125 brightness-[0.38] saturate-[0.80] transition-transform duration-1000"
          />
          {/* Degradados oscuros y de atmósfera neón para máxima legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/85 to-[#050507]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050507] via-[#050507]/90 to-transparent sm:w-4/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00d4ff]/12 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#ec4899]/15 via-transparent to-transparent" />
        </div>

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

        <div className="max-w-4xl w-full mx-auto flex flex-col items-center justify-center text-center relative z-10 space-y-6">
          {/* Centered Brand Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-['Bebas_Neue'] tracking-wider text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-[#ffffff] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] text-center leading-none"
          >
            RAFA <span className="text-gradient-930 drop-shadow-[0_0_40px_rgba(0,212,255,0.85)]">930</span>
          </motion.h1>

          {/* Centered Signature Quote (Horizontal, sin selección, sin subrayado, degradado neón animado) */}
          <div className="w-full flex items-center justify-center overflow-hidden px-2 my-2 select-none pointer-events-auto">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="font-['Cormorant_Garamond'] italic text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-normal font-bold text-center whitespace-normal md:whitespace-nowrap tracking-wide select-none selection:bg-transparent border-none outline-none no-underline animate-neon-gradient-text break-words max-w-full"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                {language === 'ca'
                  ? '«De La Mina al món. Amb la veritat per davant.»'
                  : language === 'es'
                  ? '«De La Mina al mundo. Con la verdad por delante.»'
                  : '“From La Mina to the world. Leading with the truth.”'}
              </motion.span>
            </motion.p>
          </div>

          {/* Centered Actions — Fluid Stacking on Mobile, Side-by-Side on Tablet/Desktop */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-xl mx-auto">
            <button
              type="button"
              onClick={() => onNavigate('discografia')}
              className="touch-target-48 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#00d4ff] text-white text-sm font-semibold px-7 py-3.5 rounded-xl shadow-[0_4px_22px_rgba(168,85,247,0.35)] hover:shadow-[0_6px_28px_rgba(236,72,153,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>
                {language === 'ca'
                  ? 'Explorar Discografia'
                  : language === 'es'
                  ? 'Explorar Discografía'
                  : 'Explore Discography'}
              </span>
              <ArrowRight className="w-4 h-4 text-white/85" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('galeria')}
              className="touch-target-44 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#111118]/90 hover:bg-[#181824] border border-[#22222e] hover:border-[#00d4ff]/60 text-xs font-semibold text-[#e2e2ec] hover:text-[#00d4ff] transition-all cursor-pointer shadow-sm group"
            >
              <Camera className="w-4 h-4 text-[#00d4ff] group-hover:scale-110 transition-transform" />
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
              onClick={() => onNavigate('contacte')}
              className="touch-target-44 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#111118]/90 hover:bg-[#181824] border border-[#22222e] hover:border-[#ec4899]/60 text-xs font-semibold text-[#e2e2ec] hover:text-[#ec4899] transition-all cursor-pointer shadow-sm group"
            >
              <Send className="w-4 h-4 text-[#ec4899] group-hover:scale-110 transition-transform" />
              <span>
                {language === 'ca'
                  ? 'Booking & Contacte'
                  : language === 'es'
                  ? 'Booking & Contacto'
                  : 'Booking & Contact'}
              </span>
            </button>
          </div>
        </div>
      </section>

      <section
        className="relative w-full py-16 md:py-28 bg-gradient-to-b from-[#050507] to-[#0a0a0f] overflow-hidden"
        id="biografia"
      >
        {/* Fondo fotográfico auténtico 100% ancho total sin cortes */}
        <div className="absolute inset-0 pointer-events-none opacity-60 overflow-hidden select-none">
          <img
            src={ARTIST_IMAGES.laMinaHeroBg}
            alt="Barrio de La Mina"
            className="w-full h-full object-cover object-center filter contrast-125 brightness-90 saturate-110 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/60 to-[#050507]/80" />
          <div className="absolute inset-0 bg-[#050507]/40 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-semibold text-[#ffffff] leading-tight"
            >
              {language === 'ca'
                ? 'Una trajectòria construïda des de l’autenticitat i la cultura de barri'
                : language === 'es'
                ? 'Una trayectoria construida desde la autenticidad y la cultura de barrio'
                : 'A trajectory built on authenticity and neighborhood culture'}
            </motion.h2>

            <blockquote className="py-3">
              <p className="font-['Cormorant_Garamond'] italic text-2xl sm:text-3xl text-[#00f0ff] leading-snug font-medium drop-shadow-[0_0_18px_rgba(0,240,255,0.7)] [text-shadow:0_0_10px_#00f0ff,0_0_25px_rgba(0,212,255,0.5)]">
                {language === 'ca'
                  ? '“Amb la música podia expressar les meves emocions i els meus pensaments més profunds.”'
                  : language === 'es'
                  ? '“Con la música podía expresar mis emociones y mis pensamientos más profundos.”'
                  : '“Through music I could express my deepest emotions and thoughts.”'}
              </p>
            </blockquote>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-4 text-[#f8fafc] text-sm sm:text-base leading-relaxed max-w-2xl font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            >
              <p className="first-letter:text-5xl first-letter:font-['Cormorant_Garamond'] first-letter:font-bold first-letter:text-[#ec4899] first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:drop-shadow-[0_0_15px_#ec4899]">
                {language === 'ca'
                  ? 'RAFA 930 és un artista urbà emergent i multidisciplinari: raper, desenvolupador web, fotògraf i creador total des de l’entorn de La Mina i Mataró (08930). La seva música destil·la rap conscient i trap melódico de carrer, amb lletres profundes que parlen de superació personal, la duresa i la bellesa del barri, la lleialtat familiar, la nit i el contrast entre somnis i realitat. Impulsat per la curiositat i pel suport incondicional dels seus amics Ouxxox i Incrife, la seva obra uneix una lírica crua i honesta amb una estètica fotogràfica cinematogràfica en clarobscur.'
                  : language === 'es'
                  ? 'RAFA 930 es un artista urbano emergente y multidisciplinar: rapero, desarrollador web, fotógrafo y creador total desde el entorno de La Mina y Mataró (08930). Su música destila rap consciente y trap melódico de calle, con letras profundas que abordan la superación personal, la crudeza y la belleza del barrio, la lealtad de los suyos, la noche y el pulso entre los sueños y la realidad. Impulsado por la curiosidad y por el apoyo incondicional de sus amigos Ouxxox e Incrife, su obra une una lírica sincera y directa con una estética fotográfica cinematográfica en claroscuro.'
                  : 'RAFA 930 is an emerging, multidisciplinary urban artist: rapper, web developer, photographer, and total creator hailing from La Mina and Mataró (08930). His music distills conscious rap and melodic street trap, featuring deep lyrics about resilience, neighborhood life, loyalty, nocturnal ambition, and the pursuit of dreams. Driven by curiosity and the unconditional support of his friends Ouxxox and Incrife, his work merges raw, honest storytelling with cinematic chiaroscuro visual aesthetics.'}
              </p>
              <p className="text-[#f1f5f9]">
                {language === 'ca' ? (
                  <>
                    El seu projecte és una convergència entre la producció sonora, la narrativa visual i la innovació digital. RAFA 930 no només lidera la seva pròpia visió artística amb barres afilades i so impecable, sinó que també impulsa el desenvolupament digital de tercers a través de 930 Digital, aportant una mirada professional, precisa i connectada amb l’essència del carrer.
                  </>
                ) : language === 'es' ? (
                  <>
                    Su proyecto es una convergencia entre la producción sonora, la narrativa visual y la innovación digital. RAFA 930 no solo lidera su propia visión artística con barras afiladas y sonido impecable, sino que también impulsa el desarrollo digital de terceros a través de 930 Digital, aportando una mirada profesional, precisa y conectada con la esencia de la calle.
                  </>
                ) : (
                  <>
                    His project is a true convergence of sound production, visual narrative, and digital innovation. RAFA 930 not only leads his artistic vision with sharp bars and pristine sound, but also drives digital development through 930 Digital, bringing a professional perspective rooted in street culture.
                  </>
                )}
              </p>
            </motion.div>

            {/* 3 Core Professional Pillars */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card3D
                intensity={4}
                onClick={() => onNavigate('discografia')}
                glowColor="rgba(168, 85, 247, 0.22)"
                className="p-5 bg-[#0e0e15]/95 backdrop-blur-md border border-[#303042] rounded-xl hover:border-[#a855f7] cursor-pointer shadow-lg"
              >
                <Mic className="w-5 h-5 text-[#a855f7] mb-3" />
                <h3 className="font-bold text-[#ffffff] text-sm mb-1">
                  {language === 'ca'
                    ? 'Composició & Directe'
                    : language === 'es'
                    ? 'Composición & Directo'
                    : 'Composition & Live'}
                </h3>
                <p className="text-xs text-[#cbd5e1] leading-relaxed">
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
                glowColor="rgba(236, 72, 153, 0.22)"
                className="p-5 bg-[#0e0e15]/95 backdrop-blur-md border border-[#303042] rounded-xl hover:border-[#ec4899] cursor-pointer shadow-lg"
              >
                <Camera className="w-5 h-5 text-[#ec4899] mb-3" />
                <h3 className="font-bold text-[#ffffff] text-sm mb-1">
                  {language === 'ca'
                    ? 'Fotografia Editorial'
                    : language === 'es'
                    ? 'Fotografía Editorial'
                    : 'Editorial Photography'}
                </h3>
                <p className="text-xs text-[#cbd5e1] leading-relaxed">
                  {language === 'ca'
                    ? 'Retrat d’autor, sessions de moda urbana i direcció visual de portades.'
                    : language === 'es'
                    ? 'Retrato de autor, sesiones de moda urbana y dirección visual de portadas.'
                    : 'Auteur portrait sessions, urban fashion shoots, and album cover direction.'}
                </p>
              </Card3D>

              <Card3D
                intensity={4}
                onClick={() => onNavigate('contacte')}
                glowColor="rgba(0, 212, 255, 0.28)"
                className="p-5 bg-[#0e0e15]/95 backdrop-blur-md border border-[#00d4ff]/50 rounded-xl hover:border-[#00d4ff] cursor-pointer shadow-[0_0_24px_rgba(0,212,255,0.14)]"
              >
                <Send className="w-5 h-5 text-[#00d4ff] mb-3" />
                <h3 className="font-bold text-[#ffffff] text-sm mb-1">
                  {language === 'ca'
                    ? 'Booking & Contractació'
                    : language === 'es'
                    ? 'Booking & Contratación'
                    : 'Booking & Direct Management'}
                </h3>
                <p className="text-xs text-[#cbd5e1] leading-relaxed">
                  {language === 'ca'
                    ? 'Concerts, featurings, direcció visual i projectes a mida sense res establert.'
                    : language === 'es'
                    ? 'Conciertos, featurings, dirección visual y proyectos a medida sin nada establecido.'
                    : 'Concerts, featurings, visual direction, and custom projects tailored for you.'}
                </p>
              </Card3D>
            </div>
          </div>

          {/* Right Side: Portrait Image ("Mi Cara") positioned side-by-side with Biography Text */}
          <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
            <Card3D
              intensity={5}
              glowColor="rgba(0, 212, 255, 0.28)"
              className="bg-[#111118] border border-[#00d4ff]/50 rounded-2xl p-3 shadow-[0_0_35px_rgba(0,212,255,0.25)] w-full max-w-md group"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[#050507]">
                <img
                  alt="RAFA 930 — Retrato oficial de cara"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  src={ARTIST_IMAGES.heroPortrait}
                  loading="eager"
                  decoding="sync"
                />
              </div>
              <div className="pt-3 px-1 flex justify-between items-center text-xs font-serif italic text-[#a1a1b5]">
                <span>
                  {language === 'ca'
                    ? 'Retrat Oficial — RAFA 930'
                    : language === 'es'
                    ? 'Retrato Oficial — RAFA 930'
                    : 'Official Portrait — RAFA 930'}
                </span>
              </div>
            </Card3D>

            <Card3D
              intensity={4}
              glowColor="rgba(168, 85, 247, 0.16)"
              className="bg-[#111118] border border-[#22222e] rounded-xl p-3 w-full max-w-md"
            >
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-[#0a0a0f]">
                <img
                  alt="Barri de La Mina"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  src={ARTIST_IMAGES.libraryOrigin}
                  loading="lazy"
                />
              </div>
              <div className="pt-2 px-1 flex justify-between items-center text-xs font-serif italic text-[#a1a1b5]">
                <span>
                  {language === 'ca'
                    ? 'Fig. 02 — Barri de La Mina (Punt d’origen)'
                    : language === 'es'
                    ? 'Fig. 02 — Barrio de La Mina (Punto de origen)'
                    : 'Fig. 02 — La Mina Neighborhood (Origin point)'}
                </span>
                <span className="font-mono not-italic text-[#a855f7]">
                  {language === 'ca' ? 'Arxiu' : language === 'es' ? 'Archivo' : 'Archive'}
                </span>
              </div>
            </Card3D>
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
        className="relative py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-[#0a0a0f] overflow-hidden"
      >
        {/* Fondo metálico industrial futurista con fuerte presencia visible */}
        {ARTIST_IMAGES.metallicBg && (
          <div className="absolute inset-0 pointer-events-none opacity-65 overflow-hidden select-none">
            <img
              src={ARTIST_IMAGES.metallicBg}
              alt=""
              className="w-full h-full object-cover scale-105 filter contrast-125 brightness-110 saturate-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-[#0a0a0f]/80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0f_90%)]" />
          </div>
        )}

        <SectionColorBubbles variant="editorial" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-semibold text-[#ffffff]">
                {language === 'ca'
                  ? 'Evolució musical i conceptual'
                  : language === 'es'
                  ? 'Evolución musical y conceptual'
                  : 'Musical and conceptual evolution'}
              </h2>
              <p className="text-[#a1a1b5] text-sm sm:text-base mt-2 max-w-2xl">
                {language === 'ca'
                  ? 'Trajectòria discogràfica documentada: de les primeres maquetes al barri fins als llançaments oficials a Spotify i plataformes.'
                  : language === 'es'
                  ? 'Trayectoria discográfica documentada: de las primeras maquetas en el barrio hasta los lanzamientos oficiales en Spotify y plataformas.'
                  : 'Documented discographical trajectory: from early street demos to official releases on Spotify and streaming.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE_I18N.map((item, idx) => (
              <Card3D
                key={idx}
                intensity={5}
                glowColor={item.highlight ? 'rgba(0, 212, 255, 0.28)' : 'rgba(168, 85, 247, 0.2)'}
                className={`relative bg-[#111118]/95 backdrop-blur-md rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col justify-between ${
                  item.highlight
                    ? 'border border-[#00d4ff]/60 shadow-[0_0_30px_rgba(0,212,255,0.18)]'
                    : 'border border-[#22222e] hover:border-[#a855f7]/70'
                }`}
              >
                <div>
                  {/* Artwork Banner */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050507]">
                    <img
                      src={item.coverUrl}
                      alt={item.title[language]}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-[#111118]/40 to-transparent" />
                    
                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute top-3 left-3 text-[10px] font-mono text-[#ec4899] font-bold uppercase tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        {item.badge[language]}
                      </div>
                    )}
                    
                    <div className="absolute bottom-2 right-3 text-[11px] font-mono text-[#00d4ff] font-semibold bg-[#050507]/80 px-2 py-0.5 rounded">
                      Cap. 0{idx + 1}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <div className="text-xs font-mono text-[#a855f7] font-semibold tracking-wider">
                      {item.year}
                    </div>
                    <h3 className="font-['Cormorant_Garamond'] font-semibold text-xl text-[#ffffff] leading-snug group-hover:text-[#00d4ff] transition-colors">
                      {item.title[language]}
                    </h3>
                    <p className="text-[#cbd5e1] text-xs leading-relaxed line-clamp-3">
                      {item.description[language]}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 flex items-center justify-between text-[11px] font-mono text-[#a1a1b5]">
                  <span className="text-[#00d4ff]">RAFA 930</span>
                  <span className="text-[#a1a1b5]">
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

      <section
        className="relative w-full py-16 md:py-24 overflow-hidden"
        id="musica"
      >
        {/* Fondo atmosférico fotográfico de Discografía 100% ancho total */}
        <div className="absolute inset-0 pointer-events-none opacity-60 overflow-hidden select-none">
          <img
            src={ARTIST_IMAGES.epMyWorld}
            alt="Arte Musical RAFA 930"
            className="w-full h-full object-cover object-center scale-105 filter contrast-125 brightness-100 saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-[#0a0a0f]/80" />
          <div className="absolute inset-0 bg-[#0a0a0f]/30 backdrop-blur-[2px]" />
        </div>
        <SectionColorBubbles variant="music" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
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
              className="px-3.5 py-2 rounded-lg bg-[#111118] border border-[#1DB954]/50 hover:border-[#1ed760] text-xs font-mono text-[#1ed760] flex items-center gap-1.5 whitespace-nowrap shadow-[0_0_14px_rgba(29,185,84,0.15)] transition-colors"
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
                  ? 'Veure catàleg complet'
                  : language === 'es'
                  ? 'Ver catálogo completo'
                  : 'View full catalog'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: De Vuelta (Featured Release) */}
          <Card3D
            intensity={5}
            glowColor="rgba(0, 212, 255, 0.3)"
            className="bg-[#0e0e15]/95 backdrop-blur-md border border-[#00d4ff]/60 hover:border-[#ec4899] rounded-xl p-5 group shadow-[0_0_28px_rgba(0,212,255,0.2)]"
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
                <span className="absolute top-3 left-3 text-white text-[10px] font-mono font-bold uppercase tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  {language === 'ca'
                    ? 'NOU DESTACAT 2026'
                    : language === 'es'
                    ? 'NUEVO DESTACADO 2026'
                    : 'NEW FEATURED 2026'}
                </span>
                <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] font-mono text-[#1ed760] font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse shadow-[0_0_8px_#1DB954]" />
                  <span className="uppercase tracking-widest">Spotify</span>
                </div>
              </div>
              <div className="text-xs font-mono text-[#00d4ff] font-semibold mb-1 tabular-nums tracking-wide">
                {language === 'ca'
                  ? 'TEMA DESTACAT · 2026'
                  : language === 'es'
                  ? 'TEMA DESTACADO · 2026'
                  : 'FEATURED SINGLE · 2026'}
              </div>
              <h3 className="font-['Cormorant_Garamond'] font-bold text-2xl sm:text-3xl text-[#ffffff] drop-shadow-sm">
                De Vuelta
              </h3>
              <p className="text-[#f1f5f9] text-xs sm:text-sm mt-2 leading-relaxed font-normal">
                {language === 'ca'
                  ? 'El nou llançament destacat de RAFA 930 en 2026. Energia nocturna, retorn amb més força i la identitat pura del codi 930.'
                  : language === 'es'
                  ? 'El nuevo lanzamiento destacado de RAFA 930 en 2026. Energía nocturna, regreso con más fuerza y la identidad pura del código 930.'
                  : 'RAFA 930’s new featured 2026 release. Nocturnal energy, a stronger return, and the pure identity of the 930 code.'}
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-[#22222e] flex flex-col sm:flex-row gap-2">
              <a
                href={OFFICIAL_SPOTIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target-44 flex-1 py-2.5 px-3 bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold rounded-lg flex items-center justify-center gap-1.5 text-xs transition-all shadow-[0_0_14px_rgba(29,185,84,0.3)]"
              >
                <SpotifyLogo className="w-4 h-4 text-white shrink-0" />
                <span>Spotify</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>

              <a
                href="https://youtu.be/RVuiWbT_mNk"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target-44 flex-1 py-2.5 px-3 gradient-lila-rosa-rojo text-white hover:opacity-95 rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold transition-all shadow-md"
              >
                <YouTubeLogo className="w-4 h-4 text-white shrink-0" />
                <span>YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>
            </div>
          </Card3D>

          {/* Card 2: EP My World (Ya disponible en Spotify) */}
          <Card3D
            intensity={5}
            glowColor="rgba(236, 72, 153, 0.3)"
            className="bg-[#0e0e15]/95 backdrop-blur-md border border-[#ec4899]/60 hover:border-[#00d4ff] rounded-xl p-5 group shadow-[0_0_28px_rgba(236,72,153,0.2)]"
          >
            <div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-[#0a0a0f] mb-4">
                <img
                  alt="EP My World — RAFA 930"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform"
                  src={ARTIST_IMAGES.epMyWorld}
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#ec4899] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-lg">
                  {language === 'ca'
                    ? 'JA A SPOTIFY'
                    : language === 'es'
                    ? 'YA EN SPOTIFY'
                    : 'OUT ON SPOTIFY'}
                </span>
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#050507]/90 backdrop-blur-md border border-[#1DB954]/70 text-[10px] font-mono text-[#1ed760] font-semibold shadow-[0_0_12px_rgba(29,185,84,0.35)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse" />
                  <span>Álbum</span>
                </div>
              </div>
              <div className="text-xs font-mono text-[#ec4899] font-semibold mb-1 tabular-nums tracking-wide">
                {language === 'ca'
                  ? 'EP CONCEPTUAL · 2025 · 3 TEMES'
                  : language === 'es'
                  ? 'EP CONCEPTUAL · 2025 · 3 TEMAS'
                  : 'CONCEPTUAL EP · 2025 · 3 TRACKS'}
              </div>
              <h3 className="font-['Cormorant_Garamond'] font-bold text-2xl sm:text-3xl text-[#ffffff] drop-shadow-sm">
                EP My World
              </h3>
              <ul className="text-xs sm:text-sm text-[#ffffff] mt-3 space-y-1.5 font-mono tabular-nums">
                <li className="flex items-center gap-2">
                  <span className="text-[#ec4899] font-bold">01.</span>
                  <span className="text-[#f8fafc] font-medium">1 Minuto y 10 Segundos</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#ec4899] font-bold">02.</span>
                  <span className="text-[#f8fafc] font-medium">Lo Material No Lo Es Todo</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#ec4899] font-bold">03.</span>
                  <span className="text-[#f8fafc] font-medium">Fuck Sistema</span>
                </li>
              </ul>
            </div>

            <div className="pt-5 mt-4 border-t border-[#22222e] flex flex-col sm:flex-row gap-2">
              <a
                href="https://open.spotify.com/album/25v5dLghLWzumiIXqLDD8A?si=yVkoZMeNSnGFTFE8P48Pug"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target-44 flex-1 py-2.5 px-3 bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold rounded-lg flex items-center justify-center gap-1.5 text-xs transition-all shadow-[0_0_14px_rgba(29,185,84,0.3)]"
              >
                <SpotifyLogo className="w-4 h-4 text-white shrink-0" />
                <span>Spotify</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>

              <a
                href="https://www.youtube.com/watch?v=lCwhG67eijs&list=PLs6c6tp_0W8Q_4mPsWLRQ8Zwt569Rpe5x"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target-44 flex-1 py-2.5 px-3 gradient-lila-rosa-rojo text-white hover:opacity-95 rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold transition-all shadow-md"
              >
                <YouTubeLogo className="w-4 h-4 text-white shrink-0" />
                <span>YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>
            </div>
          </Card3D>

          {/* Card 3: Nose si estaré mañana (Single Oficial 2026) */}
          <Card3D
            intensity={5}
            glowColor="rgba(0, 212, 255, 0.25)"
            className="bg-[#0e0e15]/95 backdrop-blur-md border border-[#00d4ff]/40 hover:border-[#00d4ff] rounded-xl p-5 group shadow-[0_0_24px_rgba(0,212,255,0.15)]"
          >
            <div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-[#0a0a0f] mb-4">
                <img
                  alt="Nose si estaré mañana — RAFA 930"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform"
                  src={ARTIST_IMAGES.single2026}
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#00d4ff] text-black text-[10px] font-mono font-bold uppercase tracking-wider shadow-lg">
                  {language === 'ca'
                    ? 'SENZILL OFICIAL'
                    : language === 'es'
                    ? 'SENCILLO OFICIAL'
                    : 'OFFICIAL SINGLE'}
                </span>
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#050507]/90 backdrop-blur-md border border-[#1DB954]/70 text-[10px] font-mono text-[#1ed760] font-semibold shadow-[0_0_12px_rgba(29,185,84,0.35)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse" />
                  <span>Spotify</span>
                </div>
              </div>
              <div className="text-xs font-mono text-[#00d4ff] font-semibold mb-1 tabular-nums tracking-wide">
                {language === 'ca'
                  ? 'SENZILL OFICIAL 2026'
                  : language === 'es'
                  ? 'SENCILLO OFICIAL 2026'
                  : 'OFFICIAL SINGLE 2026'}
              </div>
              <h3 className="font-['Cormorant_Garamond'] font-bold text-2xl sm:text-3xl text-[#ffffff] drop-shadow-sm">
                Nose si estaré mañana
              </h3>
              <p className="text-[#f1f5f9] text-xs sm:text-sm mt-2 leading-relaxed font-normal">
                {language === 'ca'
                  ? 'Un single carregat d’urgència vital, melodies introspectives i la veu pura de RAFA 930.'
                  : language === 'es'
                  ? 'Un single cargado de urgencia vital, melodías introspectivas y la voz pura de RAFA 930.'
                  : 'A single charged with vital urgency, introspective melodies, and the pure voice of RAFA 930.'}
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-[#22222e] flex flex-col sm:flex-row gap-2">
              <a
                href={OFFICIAL_SPOTIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target-44 flex-1 py-2.5 px-3 bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold rounded-lg flex items-center justify-center gap-1.5 text-xs transition-all shadow-[0_0_14px_rgba(29,185,84,0.3)]"
              >
                <SpotifyLogo className="w-4 h-4 text-white shrink-0" />
                <span>Spotify</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>

              <a
                href="https://www.youtube.com/watch?v=WaV1KeSN5_4"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target-44 flex-1 py-2.5 px-3 gradient-lila-rosa-rojo text-white hover:opacity-95 rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold transition-all shadow-md"
              >
                <YouTubeLogo className="w-4 h-4 text-white shrink-0" />
                <span>YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>
            </div>
          </Card3D>
        </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CAPÍTULO IV · EQUIPO CREATIVO & COLABORACIONES */}
      {/* ========================================================================= */}
      <section
        className="relative py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-[#0a0a0f] overflow-hidden"
        id="colaboraciones"
      >
        {/* Fondo fotográfico auténtico de Estudio y Equipo Creativo con presencia y contraste */}
        {ARTIST_IMAGES.studioCrewBg && (
          <div className="absolute inset-0 pointer-events-none opacity-45 overflow-hidden select-none">
            <img
              src={ARTIST_IMAGES.studioCrewBg}
              alt="Sesión en estudio del Equipo Creativo RAFA 930"
              className="w-full h-full object-cover scale-105 filter contrast-125 brightness-90 saturate-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-[#0a0a0f]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0a0a0f_90%)]" />
          </div>
        )}

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Encabezado editorial */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-[#242436] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec4899]/15 border border-[#ec4899]/30 text-xs font-mono text-[#ec4899] mb-3 uppercase tracking-widest font-semibold">
                <Users className="w-3.5 h-3.5 text-[#ec4899]" />
                {language === 'ca'
                  ? 'Capítol IV · Col·lectiu 930'
                  : language === 'es'
                  ? 'Capítulo IV · Colectivo 930'
                  : 'Chapter IV · 930 Collective'}
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-semibold text-[#ffffff] drop-shadow-md">
                {language === 'ca'
                  ? 'Equip Creatiu & Col·laboracions'
                  : language === 'es'
                  ? 'Equipo Creativo & Colaboraciones'
                  : 'Creative Team & Collaborations'}
              </h2>
              <p className="text-sm md:text-base font-mono text-[#94a3b8] mt-2 max-w-2xl">
                {language === 'ca'
                  ? 'Productors, fotògrafs, artistes i models que donen vida a la identitat sonora i visual de RAFA 930.'
                  : language === 'es'
                  ? 'Productores, fotógrafos, artistas y modelos que dan vida a la identidad sonora y visual de RAFA 930.'
                  : 'Producers, photographers, vocal artists, and models shaping the sonic and visual identity of RAFA 930.'}
              </p>
            </div>

            {/* Selector de categorías */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setColabCategory('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  colabCategory === 'all'
                    ? 'bg-[#ec4899] text-white shadow-lg shadow-[#ec4899]/30 border border-[#ec4899]'
                    : 'bg-[#151522] text-[#94a3b8] hover:text-white border border-[#26263a] hover:border-[#383854]'
                }`}
              >
                {language === 'ca' ? 'Tots (7)' : language === 'es' ? 'Todos (7)' : 'All (7)'}
              </button>
              <button
                type="button"
                onClick={() => setColabCategory('prod')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  colabCategory === 'prod'
                    ? 'bg-[#ec4899] text-white shadow-lg shadow-[#ec4899]/30 border border-[#ec4899]'
                    : 'bg-[#151522] text-[#94a3b8] hover:text-white border border-[#26263a] hover:border-[#383854]'
                }`}
              >
                {language === 'ca' ? 'Producció & Beats (2)' : language === 'es' ? 'Producción & Beats (2)' : 'Production (2)'}
              </button>
              <button
                type="button"
                onClick={() => setColabCategory('vocal')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  colabCategory === 'vocal'
                    ? 'bg-[#ec4899] text-white shadow-lg shadow-[#ec4899]/30 border border-[#ec4899]'
                    : 'bg-[#151522] text-[#94a3b8] hover:text-white border border-[#26263a] hover:border-[#383854]'
                }`}
              >
                {language === 'ca' ? 'Artistes Vocals (2)' : language === 'es' ? 'Artistas Vocales (2)' : 'Vocal Artists (2)'}
              </button>
              <button
                type="button"
                onClick={() => setColabCategory('model')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  colabCategory === 'model'
                    ? 'bg-[#ec4899] text-white shadow-lg shadow-[#ec4899]/30 border border-[#ec4899]'
                    : 'bg-[#151522] text-[#94a3b8] hover:text-white border border-[#26263a] hover:border-[#383854]'
                }`}
              >
                {language === 'ca' ? 'Models & Imatge (3)' : language === 'es' ? 'Modelos & Imagen (3)' : 'Models (3)'}
              </button>
            </div>
          </div>

          {/* Banner de confirmación de subida */}
          {uploadSuccessId && (
            <div className="mb-6 px-4 py-2.5 rounded-xl bg-[#10b981]/15 border border-[#10b981]/40 text-[#10b981] font-mono text-xs flex items-center justify-between shadow-lg animate-fade-in">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>
                  {language === 'ca'
                    ? 'Foto actualitzada correctament per al col·laborador i desada al teu navegador.'
                    : language === 'es'
                    ? 'Foto actualizada correctamente para el colaborador y guardada en tu navegador.'
                    : 'Collaborator photo updated successfully and saved in your browser.'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setUploadSuccessId(null)}
                className="text-white/60 hover:text-white p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Cuadrícula de colaboradores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLLABORATORS.filter((c) => {
              if (colabCategory === 'all') return true;
              return COLLABORATORS_EXTENDED_INFO[c.id]?.category === colabCategory;
            }).map((c) => {
              const meta = COLLABORATORS_EXTENDED_INFO[c.id];
              const roleText = COLLABORATORS_ROLE_I18N[c.id]?.[language] || c.role;
              const currentImg = customAvatars[c.id] || c.avatarUrl;
              const hasCustom = Boolean(customAvatars[c.id]);

              return (
                <Card3D
                  key={c.id}
                  intensity={4}
                  glowColor="rgba(236, 72, 153, 0.25)"
                  className="bg-[#0e0e15]/95 backdrop-blur-md border border-[#2d2d42] hover:border-[#ec4899] rounded-xl overflow-hidden group shadow-2xl flex flex-col justify-between transition-all"
                >
                  <div>
                    {/* Contenedor de Imagen con overlay interactivo */}
                    <div
                      className="relative aspect-square w-full overflow-hidden bg-[#07070b] border-b border-[#222232] cursor-pointer"
                      onClick={() => setSelectedColabId(c.id)}
                    >
                      <img
                        alt={`${c.name} — ${roleText}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                        src={currentImg}
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = ARTIST_IMAGES.studioCrewBg;
                        }}
                      />

                      {/* Gradiente inferior para legibilidad */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e15] via-transparent to-black/30 pointer-events-none" />

                      {/* Rol Tag */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#050507]/90 backdrop-blur-md border border-[#ec4899]/70 text-[11px] font-mono text-[#ec4899] font-bold shadow-lg">
                        {roleText}
                      </div>

                      {/* Acciones de foto rápida (Subir propia / Restablecer) */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
                        {hasCustom && (
                          <button
                            type="button"
                            onClick={(e) => handleResetColabImage(c.id, e)}
                            title={
                              language === 'ca'
                                ? 'Restablir foto original d’arxiu'
                                : language === 'es'
                                ? 'Restablecer foto original de archivo'
                                : 'Reset to original archive photo'
                            }
                            className="p-1.5 rounded-lg bg-black/80 hover:bg-[#ef4444] text-white/80 hover:text-white transition-all backdrop-blur-md border border-white/20 shadow-md"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <label
                          onClick={(e) => e.stopPropagation()}
                          title={
                            language === 'ca'
                              ? 'Pujar / Canviar foto des del teu dispositiu'
                              : language === 'es'
                              ? 'Subir / Cambiar foto desde tu dispositivo'
                              : 'Upload custom photo'
                          }
                          className="cursor-pointer p-1.5 rounded-lg bg-black/80 hover:bg-[#ec4899] text-white/80 hover:text-white transition-all backdrop-blur-md border border-white/20 shadow-md flex items-center gap-1"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleColabImageUpload(c.id, e)}
                          />
                        </label>
                      </div>

                      {/* Badge si es personalizada */}
                      {hasCustom && (
                        <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-[#10b981]/80 backdrop-blur-sm text-[10px] font-mono text-white font-bold">
                          {language === 'ca' ? 'Foto pròpia' : language === 'es' ? 'Foto propia' : 'Custom'}
                        </div>
                      )}
                    </div>

                    {/* Información del colaborador */}
                    <div className="p-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-['Cormorant_Garamond'] font-bold text-xl text-[#ffffff] leading-snug drop-shadow-sm group-hover:text-[#ec4899] transition-colors">
                          {c.name}
                        </h3>
                      </div>

                      <div className="text-xs font-mono text-[#cbd5e1] mt-0.5 truncate font-medium flex items-center gap-1">
                        <span className="text-[#ec4899]">@</span>
                        <span>{c.handle.replace('@', '')}</span>
                      </div>

                      {/* Biografía breve */}
                      <p className="text-xs text-[#94a3b8] mt-2.5 line-clamp-3 leading-relaxed">
                        {meta?.extendedBio[language] || c.bio}
                      </p>
                    </div>
                  </div>

                  {/* Botones inferiores: Ver ficha + Instagram */}
                  <div className="px-4 pb-4 pt-1 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedColabId(c.id)}
                      className="w-full py-1.5 px-3 rounded-lg bg-[#141420] hover:bg-[#202032] border border-[#2b2b40] hover:border-[#ec4899]/60 text-xs font-mono text-[#cbd5e1] hover:text-white transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>{language === 'ca' ? 'Veure Fitxa & Foto' : language === 'es' ? 'Ver Ficha & Foto' : 'View Profile'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#ec4899]" />
                    </button>

                    <a
                      className="touch-target-44 w-full px-3 py-2 bg-[#181824] hover:bg-[#242436] border border-[#38384f] hover:border-[#ec4899] rounded-lg text-xs font-mono text-[#e2e8f0] hover:text-[#ffffff] flex items-center justify-between transition-all shadow-sm group/ig"
                      href={c.instagramUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <InstagramLogo className="w-4 h-4 text-[#ec4899] group-hover/ig:scale-110 transition-transform shrink-0" colored={true} />
                        <span className="truncate font-semibold text-[#f1f5f9] group-hover/ig:text-[#ec4899]">{c.handle}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#ec4899]" />
                    </a>
                  </div>
                </Card3D>
              );
            })}
          </div>
        </div>

        {/* Modal de Detalle de Colaborador */}
        {selectedColabId && (() => {
          const colab = COLLABORATORS.find((c) => c.id === selectedColabId);
          if (!colab) return null;
          const meta = COLLABORATORS_EXTENDED_INFO[colab.id];
          const roleText = COLLABORATORS_ROLE_I18N[colab.id]?.[language] || colab.role;
          const currentImg = customAvatars[colab.id] || colab.avatarUrl;
          const hasCustom = Boolean(customAvatars[colab.id]);

          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
              onClick={() => setSelectedColabId(null)}
            >
              <div
                className="relative max-w-2xl w-full bg-[#0e0e15] border border-[#3a3a52] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Botón cerrar */}
                <button
                  type="button"
                  onClick={() => setSelectedColabId(null)}
                  className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/70 hover:bg-[#ec4899] text-white/80 hover:text-white transition-all backdrop-blur-md border border-white/20"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Foto en grande */}
                <div className="md:w-1/2 relative bg-black aspect-square md:aspect-auto min-h-[300px]">
                  <img
                    src={currentImg}
                    alt={`${colab.name} — ${roleText}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e15] via-transparent to-transparent md:hidden" />
                  
                  {/* Botón para cambiar foto en modal */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                    <label className="cursor-pointer flex-1 py-2 px-3 rounded-lg bg-black/80 hover:bg-[#ec4899] text-white text-xs font-mono font-medium transition-all backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center gap-2">
                      <Camera className="w-3.5 h-3.5" />
                      <span>{language === 'ca' ? 'Pujar Foto' : language === 'es' ? 'Subir Foto' : 'Upload Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleColabImageUpload(colab.id, e)}
                      />
                    </label>
                    {hasCustom && (
                      <button
                        type="button"
                        onClick={(e) => handleResetColabImage(colab.id, e)}
                        className="p-2 rounded-lg bg-black/80 hover:bg-[#ef4444] text-white transition-all backdrop-blur-md border border-white/20"
                        title={language === 'ca' ? 'Restablir original' : language === 'es' ? 'Restablecer original' : 'Reset original'}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Contenido modal */}
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-2.5 py-1 rounded-md bg-[#ec4899]/15 border border-[#ec4899]/50 text-xs font-mono text-[#ec4899] font-bold mb-3">
                      {roleText}
                    </div>

                    <h3 className="font-['Cormorant_Garamond'] text-3xl font-bold text-white leading-tight">
                      {colab.name}
                    </h3>

                    <div className="text-sm font-mono text-[#cbd5e1] mt-1 font-semibold flex items-center gap-1.5">
                      <span className="text-[#ec4899]">@</span>
                      <span>{colab.handle.replace('@', '')}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#94a3b8] mt-4 leading-relaxed font-sans">
                      {meta?.extendedBio[language] || colab.bio}
                    </p>

                    {meta?.projects[language] && (
                      <div className="mt-5 pt-4 border-t border-[#252538]">
                        <h4 className="text-xs uppercase font-mono tracking-wider text-[#94a3b8] font-bold mb-2">
                          {language === 'ca' ? 'Col·laboracions destacades amb 930:' : language === 'es' ? 'Colaboraciones destacadas con 930:' : 'Featured Works with 930:'}
                        </h4>
                        <ul className="space-y-1.5 text-xs font-mono text-[#e2e8f0]">
                          {meta.projects[language].map((proj, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899] shrink-0" />
                              <span>{proj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className="mt-6 pt-4 border-t border-[#252538] flex flex-col gap-2">
                    <a
                      href={colab.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#ec4899] hover:bg-[#db2777] text-white font-mono text-xs font-bold transition-all shadow-lg shadow-[#ec4899]/30 flex items-center justify-center gap-2"
                    >
                      <InstagramLogo className="w-4 h-4 text-white" />
                      <span>{language === 'ca' ? 'Veure Perfil a Instagram' : language === 'es' ? 'Ver Perfil en Instagram' : 'View on Instagram'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* ========================================================================= */}
      {/* CAPÍTULO V · CONTACTO PROFESIONAL */}
      {/* ========================================================================= */}
      <section
        className="relative py-16 md:py-24 px-4 sm:px-6 md:px-10 overflow-hidden"
        id="contacto"
      >
        {/* Fondo fotográfico auténtico con presencia y contraste */}
        <div className="absolute inset-0 pointer-events-none opacity-55 overflow-hidden select-none">
          <img
            src={ARTIST_IMAGES.laMinaHeroBg}
            alt="La Mina 08930"
            className="w-full h-full object-cover scale-105 filter contrast-125 brightness-90 saturate-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/70 to-[#0a0a0f]/90" />
          <div className="absolute inset-0 bg-[#0a0a0f]/40 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-semibold text-[#ffffff] mb-2 drop-shadow-md">
            {language === 'ca'
              ? 'Treballem junts?'
              : language === 'es'
              ? '¿Trabajamos juntos?'
              : 'Shall we work together?'}
          </h2>
          <p className="text-[#cbd5e1] text-sm sm:text-base max-w-2xl mb-10 font-normal">
            {language === 'ca'
              ? 'Per a contractació de concerts, sessions de fotografia editorial o desenvolupament de projectes digitals a mida.'
              : language === 'es'
              ? 'Para contratación de conciertos, sesiones de fotografía editorial o desarrollo de proyectos digitales a medida.'
              : 'For concert bookings, editorial photography sessions, or custom digital development projects.'}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <Card3D
                intensity={5}
                glowColor="rgba(236, 72, 153, 0.2)"
                className="bg-[#0e0e15]/95 backdrop-blur-md border border-[#22222e] rounded-xl p-6 sm:p-8 space-y-4 shadow-xl"
              >
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#ffffff]">
                  {language === 'ca'
                    ? 'Canals Oficials'
                    : language === 'es'
                    ? 'Canales Oficiales'
                    : 'Official Channels'}
                </h3>

                <a
                  href="mailto:rafa.930music@gmail.com?subject=Consulta%20Profesional%20-%20RAFA%20930"
                  className="p-4 bg-[#0a0a0f] border border-[#22222e] hover:border-[#ec4899] rounded-lg flex items-center gap-4 transition-colors block group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#111118] border border-[#22222e] text-[#ec4899] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] font-mono text-[#a1a1b5] block">
                      {language === 'ca'
                        ? 'Correu Professional'
                        : language === 'es'
                        ? 'Correo Profesional'
                        : 'Professional Email'}
                    </span>
                    <span className="text-sm font-semibold text-[#ffffff] group-hover:text-[#ec4899] truncate block">
                      rafa.930music@gmail.com
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/34671591814?text=Hola%20RAFA%20930,%20me%20interesa%20contactar%20contigo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#0a0a0f] border border-[#22222e] hover:border-[#25D366] rounded-lg flex items-center gap-4 transition-colors block group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#111118] border border-[#22222e] flex items-center justify-center shrink-0">
                    <WhatsAppLogo className="w-5 h-5" colored={true} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#a1a1b5] block">
                      {language === 'ca'
                        ? 'WhatsApp Directe'
                        : language === 'es'
                        ? 'WhatsApp Directo'
                        : 'Direct WhatsApp'}
                    </span>
                    <div className="text-sm font-semibold text-[#ffffff] group-hover:text-[#25D366] block tabular-nums">
                      +34 671 59 18 14
                    </div>
                  </div>
                </a>

                <a
                  href="https://instagram.com/rafa930_oficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#0a0a0f] border border-[#22222e] hover:border-[#E1306C] rounded-lg flex items-center gap-4 transition-colors block group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#111118] border border-[#22222e] flex items-center justify-center shrink-0">
                    <InstagramLogo className="w-5 h-5" colored={true} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#a1a1b5] block">
                      {language === 'ca'
                        ? 'Instagram Oficial'
                        : language === 'es'
                        ? 'Instagram Oficial'
                        : 'Official Instagram'}
                    </span>
                    <span className="text-sm font-semibold text-[#ffffff] group-hover:text-[#ec4899] block">
                      @rafa930_oficial
                    </span>
                  </div>
                </a>

                <a
                  href={OFFICIAL_YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#0a0a0f] border border-[#22222e] hover:border-[#FF0000] rounded-lg flex items-center gap-4 transition-colors block group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#111118] border border-[#22222e] flex items-center justify-center shrink-0">
                    <YouTubeLogo className="w-5 h-5" colored={true} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#a1a1b5] block">
                      {language === 'ca'
                        ? 'Canal Musical Oficial'
                        : language === 'es'
                        ? 'Canal Musical Oficial'
                        : 'Official Music Channel'}
                    </span>
                    <span className="text-sm font-semibold text-[#ffffff] group-hover:text-[#FF0000] block">
                      YouTube (@rafa_930)
                    </span>
                  </div>
                </a>

                <a
                  href={OFFICIAL_SPOTIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#0a0a0f] border border-[#22222e] hover:border-[#1DB954] rounded-lg flex items-center gap-4 transition-colors block group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#111118] border border-[#22222e] flex items-center justify-center shrink-0">
                    <SpotifyLogo className="w-5 h-5" colored={true} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#a1a1b5] block">
                      {language === 'ca'
                        ? 'Perfil Oficial d’Artista'
                        : language === 'es'
                        ? 'Perfil Oficial de Artista'
                        : 'Official Artist Profile'}
                    </span>
                    <span className="text-sm font-semibold text-[#ffffff] group-hover:text-[#1DB954] block">
                      Spotify (RAFA 930)
                    </span>
                  </div>
                </a>

                {/* Platforms block with real official brand logos */}
                <div className="p-4 bg-[#0a0a0f] border border-[#22222e] rounded-lg mt-2">
                  <h4 className="text-xs font-mono text-[#a1a1b5] mb-3">
                    {language === 'ca'
                      ? 'Totes les meves plataformes digitals'
                      : language === 'es'
                      ? 'Todas mis plataformas digitales'
                      : 'All my digital platforms'}
                  </h4>
                  <div className="flex gap-2.5 flex-wrap items-center">
                    <a href={OFFICIAL_SPOTIFY_URL} target="_blank" rel="noopener noreferrer" title="Spotify" className="p-2.5 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#1DB954] transition-colors"><SpotifyLogo className="w-5 h-5" colored={true} /></a>
                    <a href={OFFICIAL_YOUTUBE_URL} target="_blank" rel="noopener noreferrer" title="YouTube" className="p-2.5 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FF0000] transition-colors"><YouTubeLogo className="w-5 h-5" colored={true} /></a>
                    <a href="https://instagram.com/rafa930_oficial" target="_blank" rel="noopener noreferrer" title="Instagram" className="p-2.5 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#E1306C] transition-colors"><InstagramLogo className="w-5 h-5" colored={true} /></a>
                    <a href="https://wa.me/34671591814" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="p-2.5 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#25D366] transition-colors"><WhatsAppLogo className="w-5 h-5" colored={true} /></a>
                    <a href="https://www.deezer.com/mx/artist/224265995" target="_blank" rel="noopener noreferrer" title="Deezer" className="p-2.5 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#A238FF] transition-colors"><DeezerLogo className="w-5 h-5" colored={true} /></a>
                    <a href="https://music.apple.com/es/artist/rafa-930/1724193275" target="_blank" rel="noopener noreferrer" title="Apple Music" className="p-2.5 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FA243C] transition-colors"><AppleMusicLogo className="w-5 h-5" colored={true} /></a>
                    <a href="https://music.amazon.in/artists/B0CJM7BWF1/rafa-930" target="_blank" rel="noopener noreferrer" title="Amazon Music" className="p-2.5 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FF9900] transition-colors"><AmazonMusicLogo className="w-5 h-5" colored={true} /></a>
                    <a href="https://tidal.com/artist/41128230" target="_blank" rel="noopener noreferrer" title="Tidal" className="p-2.5 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#00FFFF] transition-colors"><TidalLogo className="w-5 h-5" colored={true} /></a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" title="TikTok" className="p-2.5 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#00f2fe] transition-colors"><TikTokLogo className="w-5 h-5" colored={true} /></a>
                    <a href="https://soundcloud.com" target="_blank" rel="noopener noreferrer" title="SoundCloud" className="p-2.5 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FF5500] transition-colors"><SoundcloudLogo className="w-5 h-5" colored={true} /></a>
                  </div>
                </div>
              </Card3D>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#0e0e15]/95 backdrop-blur-md border border-[#303042] p-6 sm:p-8 rounded-xl shadow-2xl">
                <div className="mb-6">
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#ffffff] mb-1">
                    {language === 'ca'
                      ? 'Sol·licitud d’Informació'
                      : language === 'es'
                      ? 'Solicitud de Información'
                      : 'Information Request'}
                  </h3>
                  <p className="text-[#cbd5e1] text-xs font-normal">
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
                      <label className="block text-xs font-mono text-[#cbd5e1] font-semibold mb-1.5" htmlFor="nombre">
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
                        className="touch-target-48 w-full px-4 bg-[#08080d] border border-[#38384f] rounded-lg text-[#ffffff] placeholder:text-[#64748b] focus:outline-none focus:border-[#ec4899] focus:ring-1 focus:ring-[#ec4899] text-base sm:text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#cbd5e1] font-semibold mb-1.5" htmlFor="email">
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
                        className="touch-target-48 w-full px-4 bg-[#08080d] border border-[#38384f] rounded-lg text-[#ffffff] placeholder:text-[#64748b] focus:outline-none focus:border-[#ec4899] focus:ring-1 focus:ring-[#ec4899] text-base sm:text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#cbd5e1] font-semibold mb-1.5" htmlFor="telefono">
                        {language === 'ca'
                          ? 'Telèfon / WhatsApp *'
                          : language === 'es'
                          ? 'Teléfono / WhatsApp *'
                          : 'Phone / WhatsApp *'}
                      </label>
                      <input
                        id="telefono"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+34 600 000 000"
                        className="touch-target-48 w-full px-4 bg-[#08080d] border border-[#38384f] rounded-lg text-[#ffffff] placeholder:text-[#64748b] focus:outline-none focus:border-[#ec4899] focus:ring-1 focus:ring-[#ec4899] text-base sm:text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#cbd5e1] font-semibold mb-1.5" htmlFor="tipo_consulta">
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
                        className="touch-target-48 w-full px-4 bg-[#08080d] border border-[#38384f] rounded-lg text-[#ffffff] focus:outline-none focus:border-[#ec4899] focus:ring-1 focus:ring-[#ec4899] text-base sm:text-sm font-medium"
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
                        <option value="otro">
                          {language === 'ca'
                            ? 'Altra / Consulta Personalitzada'
                            : language === 'es'
                            ? 'Otro / Consulta Personalizada'
                            : 'Other / Custom Inquiry'}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#cbd5e1] font-semibold mb-1.5" htmlFor="mensaje">
                      {language === 'ca'
                        ? 'Descripció del Projecte *'
                        : language === 'es'
                        ? 'Descripción del Proyecto *'
                        : 'Project Description *'}
                    </label>
                    <textarea
                      id="mensaje"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        language === 'ca'
                          ? 'Descriu breument el teu projecte, dates o necessitats...'
                          : language === 'es'
                          ? 'Describe brevemente tu proyecto, fechas o necesidades...'
                          : 'Briefly describe your project, dates, or requirements...'
                      }
                      className="w-full p-4 bg-[#08080d] border border-[#38384f] rounded-lg text-[#ffffff] placeholder:text-[#64748b] focus:outline-none focus:border-[#ec4899] focus:ring-1 focus:ring-[#ec4899] text-base sm:text-sm min-h-[100px] font-medium"
                    />
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <input
                      id="privacidad"
                      type="checkbox"
                      required
                      checked={formData.privacy}
                      onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-[#08080d] border border-[#38384f] text-[#ec4899] focus:ring-1 focus:ring-[#ec4899] cursor-pointer shrink-0 accent-[#ec4899]"
                    />
                    <label htmlFor="privacidad" className="text-xs text-[#cbd5e1] cursor-pointer leading-tight select-none">
                      {language === 'ca' ? (
                        <>
                          He llegit i accepto la{' '}
                          <button
                            type="button"
                            onClick={() => onOpenLegalTab && onOpenLegalTab('privacitat')}
                            className="text-[#ec4899] hover:text-[#00d4ff] font-semibold transition-colors underline underline-offset-2"
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
                            className="text-[#ec4899] hover:text-[#00d4ff] font-semibold transition-colors underline underline-offset-2"
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
                            className="text-[#ec4899] hover:text-[#00d4ff] font-semibold transition-colors underline underline-offset-2"
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
        </div>
      </section>
    </div>
  );
};
