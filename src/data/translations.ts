import { Language, ScreenId } from '../types';

export interface SheetMeta {
  id: ScreenId;
  number: string;
  total: string;
  name: Record<Language, string>;
  subtitle: Record<Language, string>;
  categoryTag: Record<Language, string>;
}

export const SHEETS_CONFIG: SheetMeta[] = [
  {
    id: 'revista',
    number: '01',
    total: '06',
    name: {
      ca: 'Revista & Portada',
      es: 'Revista & Portada',
      en: 'Magazine & Cover',
    },
    subtitle: {
      ca: 'Cultura urbana, música conscient i veu de La Mina al món',
      es: 'Cultura urbana, música consciente y voz de La Mina al mundo',
      en: 'Urban culture, conscious music and the voice of La Mina to the world',
    },
    categoryTag: {
      ca: 'EDITORIAL & PORTADA',
      es: 'EDITORIAL & PORTADA',
      en: 'EDITORIAL & COVER',
    },
  },
  {
    id: 'discografia',
    number: '02',
    total: '06',
    name: {
      ca: 'Discografia & Màsters',
      es: 'Discografía & Másters',
      en: 'Discography & Masters',
    },
    subtitle: {
      ca: 'Catàleg oficial, lletres completes i so d’alta fidelitat',
      es: 'Catálogo oficial, letras completas y sonido de alta fidelidad',
      en: 'Official catalog, complete lyrics and high-fidelity sound',
    },
    categoryTag: {
      ca: 'AUDIO & PRODUCCIÓ',
      es: 'AUDIO & PRODUCCIÓN',
      en: 'AUDIO & PRODUCTION',
    },
  },
  {
    id: 'serveis',
    number: '03',
    total: '06',
    name: {
      ca: 'Serveis d’Estudi & Web',
      es: 'Servicios de Estudio & Web',
      en: 'Studio Services & Web',
    },
    subtitle: {
      ca: 'Producció musical, fotografia professional i desenvolupament digital 930',
      es: 'Producción musical, fotografía profesional y desarrollo digital 930',
      en: 'Music production, professional photography and digital development 930',
    },
    categoryTag: {
      ca: 'ESTUDI 930 & DIGITAL',
      es: 'ESTUDIO 930 & DIGITAL',
      en: 'STUDIO 930 & DIGITAL',
    },
  },
  {
    id: 'presskit',
    number: '04',
    total: '06',
    name: {
      ca: 'Presskit & Rider',
      es: 'Presskit & Rider',
      en: 'Presskit & Rider',
    },
    subtitle: {
      ca: 'Dossier de premsa musical, biografia artística, mètriques i descàrregues',
      es: 'Dossier de prensa musical, biografía artística, métricas y descargas',
      en: 'Music press kit, artistic biography, metrics and official downloads',
    },
    categoryTag: {
      ca: 'PREMSA & CONTRACTACIÓ',
      es: 'PRENSA & CONTRATACIÓN',
      en: 'PRESS & BOOKING',
    },
  },
  {
    id: 'contacte',
    number: '05',
    total: '06',
    name: {
      ca: 'Contractació & Contacte',
      es: 'Contratación & Contacto',
      en: 'Booking & Inquiries',
    },
    subtitle: {
      ca: 'Concerts, featurings, serveis d’estudi i disponibilitat per a projectes',
      es: 'Conciertos, featurings, servicios de estudio y disponibilidad para proyectos',
      en: 'Concerts, featurings, studio services and project availability',
    },
    categoryTag: {
      ca: 'CANAL DIRECTE 930',
      es: 'CANAL DIRECTO 930',
      en: 'DIRECT CHANNEL 930',
    },
  },
  {
    id: 'legal',
    number: '06',
    total: '06',
    name: {
      ca: 'Marc Legal & Drets',
      es: 'Marco Legal & Derechos',
      en: 'Legal Framework & Rights',
    },
    subtitle: {
      ca: 'Avís legal, privacitat, cookies, propietat intel·lectual i crèdits oficials',
      es: 'Aviso legal, privacidad, cookies, propiedad intelectual y créditos oficiales',
      en: 'Legal notice, privacy, cookies, IP rights and official credits',
    },
    categoryTag: {
      ca: 'TRANSPARÈNCIA & DRETS',
      es: 'TRANSPARENCIA & DERECHOS',
      en: 'TRANSPARENCY & RIGHTS',
    },
  },
];

export const UI_TRANSLATIONS = {
  header: {
    magazineTitle: {
      ca: 'Revista de Barri',
      es: 'Revista de Barrio',
      en: 'Neighborhood Magazine',
    },
    location: {
      ca: 'La Mina · Sant Adrià (08930)',
      es: 'La Mina · Sant Adrià (08930)',
      en: 'La Mina · Sant Adrià (08930)',
    },
    ctaWork: {
      ca: 'Treballem Junts',
      es: 'Trabajemos Juntos',
      en: "Let's Work Together",
    },
    audioOn: {
      ca: 'SO 930 ACTIU',
      es: 'AUDIO 930 ON',
      en: '930 AUDIO ON',
    },
    audioOff: {
      ca: 'ÀUDIO',
      es: 'AUDIO',
      en: 'AUDIO',
    },
    intro: {
      ca: 'INTRO',
      es: 'INTRO',
      en: 'INTRO',
    },
    lightMode: {
      ca: 'CLAR',
      es: 'CLARO',
      en: 'LIGHT',
    },
    darkMode: {
      ca: 'FOSC',
      es: 'OSCURO',
      en: 'DARK',
    },
    selectLang: {
      ca: 'Selecciona Idioma',
      es: 'Seleccionar Idioma',
      en: 'Select Language',
    },
  },
  sheetNav: {
    folioLabel: {
      ca: 'PANTALLA / HOJA',
      es: 'PANTALLA / HOJA',
      en: 'SCREEN / SHEET',
    },
    of: {
      ca: 'DE',
      es: 'DE',
      en: 'OF',
    },
    prevSheet: {
      ca: 'Full Anterior',
      es: 'Hoja Anterior',
      en: 'Previous Sheet',
    },
    nextSheet: {
      ca: 'Següent Full',
      es: 'Siguiente Hoja',
      en: 'Next Sheet',
    },
    keyboardHint: {
      ca: 'Usa les fletxes [←] i [→] per canviar de pantalla',
      es: 'Usa las flechas [←] y [→] para cambiar de pantalla',
      en: 'Use arrow keys [←] and [→] to turn pages',
    },
  },
  languages: [
    { code: 'ca' as Language, label: 'Català', short: 'CA', flag: 'CA' },
    { code: 'es' as Language, label: 'Español', short: 'ES', flag: 'ES' },
    { code: 'en' as Language, label: 'English', short: 'EN', flag: 'EN' },
  ],
};
