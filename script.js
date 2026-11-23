/**
 * RAFA 930 — Vanilla JavaScript (ES6+)
 * Zero external libraries or frameworks.
 * Handles: splash screen, i18n, mobile nav, video stage, discography & gallery filters,
 * GDPR cookie consent, and contact form validation.
 */

'use strict';

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const isReloadNavigation = (() => {
  try {
    const navEntries =
      typeof performance.getEntriesByType === 'function'
        ? performance.getEntriesByType('navigation')
        : [];
    if (navEntries.length > 0 && 'type' in navEntries[0]) {
      return navEntries[0].type === 'reload';
    }
  } catch {
    // Performance navigation API unavailable
  }
  return false;
})();

const isIndexDocument = !document.body.classList.contains('legal-page-body');
const cameFromLegalPage = (() => {
  try {
    return typeof document.referrer === 'string' && /legal\.html/i.test(document.referrer);
  } catch {
    return false;
  }
})();

const shouldPreserveExternalHash =
  !isReloadNavigation &&
  cameFromLegalPage &&
  Boolean(window.location.hash) &&
  !/^#(inicio|musica|discografia)$/i.test(window.location.hash);

if (isIndexDocument) {
  if (!shouldPreserveExternalHash && window.location.hash && history.replaceState) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  if (!shouldPreserveExternalHash) {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
}

/* ==========================================================================
   1. Data Catalog (Collaborators & Gallery)
   ========================================================================== */

const COLLABORATORS = [
  {
    id: 'incrife',
    name: 'Incrife',
    category: 'prod',
    handle: '@incrife',
    url: 'https://www.instagram.com/incrife/',
    avatar: './assets/colab-incrife.webp',
    position: 'center center',
    role: { es: 'Fotógrafo y Productor', ca: 'Fotògraf i Productor', en: 'Photographer & Producer' },
    bio: {
      es: 'Responsable de la identidad fotográfica en claroscuro y producción visual oficial.',
      ca: 'Responsable de la identitat fotogràfica en clarobscur i producció visual oficial.',
      en: 'Lead chiaroscuro photographer and official visual producer.',
    },
  },
  {
    id: 'ouxxox',
    name: 'Ouxxox',
    category: 'prod',
    handle: '@ouxxox.res0',
    url: 'https://www.instagram.com/ouxxox.res0/',
    avatar: './assets/colab-ouxxox.webp',
    position: 'center center',
    role: { es: 'Productor y Beatmaker', ca: 'Productor i Beatmaker', en: 'Producer & Beatmaker' },
    bio: {
      es: 'Beatmaker especializado en bases de trap melódico y diseño sonoro.',
      ca: 'Beatmaker especialitzat en bases de trap melòdic i disseny sonor.',
      en: 'Beatmaker specializing in melodic trap instrumentals and sound design.',
    },
  },
  {
    id: 'elnobir',
    name: 'Elnobir',
    category: 'prod',
    handle: '@elnobir',
    url: 'https://www.instagram.com/elnobir/',
    avatar: './assets/colab-elnobir.jpg',
    position: 'center 20%',
    role: { es: 'Artista y Fotógrafo', ca: 'Artista i Fotògraf', en: 'Artist & Photographer' },
    bio: {
      es: 'Artista visual y fotógrafo colaborador en sesiones editoriales urbanas con RAFA 930.',
      ca: 'Artista visual i fotògraf col·laborador en sessions editorials urbanes amb RAFA 930.',
      en: 'Visual artist and photographer collaborating on urban editorial shoots with RAFA 930.',
    },
  },
  {
    id: 'therassam',
    name: 'Therassam',
    category: 'vocal',
    handle: '@therassam',
    url: 'https://www.instagram.com/therassam/',
    avatar: './assets/colab-therassam.webp',
    position: 'center center',
    role: { es: 'Artista Vocal', ca: 'Artista Vocal', en: 'Vocal Artist' },
    bio: {
      es: 'Artista urbano y colaborador vocal habitual en el estudio y la escena del Besòs.',
      ca: 'Artista urbà i col·laborador vocal habitual a l’estudi i l’escena del Besòs.',
      en: 'Urban artist and regular vocal collaborator in the Barcelona / Besòs scene.',
    },
  },
  {
    id: 'kingsla',
    name: 'Kingsla',
    category: 'vocal',
    handle: '@amine_grafi',
    url: 'https://www.instagram.com/amine_grafi/',
    avatar: './assets/colab-amine.webp',
    position: 'center center',
    role: { es: 'Artista Creativo', ca: 'Artista Creatiu', en: 'Creative Artist' },
    bio: {
      es: 'Artista colaborador en proyectos musicales y visuales de la escena underground.',
      ca: 'Artista col·laborador en projectes musicals i visuals de l’escena underground.',
      en: 'Collaborating artist across underground music and visual projects.',
    },
  },
  {
    id: 'salma',
    name: 'Salma',
    category: 'model',
    handle: '@ssalmaem',
    url: 'https://www.instagram.com/ssalmaem/',
    avatar: './assets/colab-salma.webp',
    position: 'center center',
    role: { es: 'Modelo e Imagen', ca: 'Model i Imatge', en: 'Model & Image' },
    bio: {
      es: 'Modelo protagonista en sesiones fotográficas editoriales y visuales oficiales.',
      ca: 'Model protagonista en sessions fotogràfiques editorials i visuals oficials.',
      en: 'Lead model in official editorial photography and visual campaigns.',
    },
  },
  {
    id: 'toliyug',
    name: 'Toliyug',
    category: 'model',
    handle: '@toliyug',
    url: 'https://www.instagram.com/toliyug/',
    avatar: './assets/colab-toliyug.webp',
    position: 'center center',
    role: { es: 'Modelo Editorial', ca: 'Model Editorial', en: 'Editorial Model' },
    bio: {
      es: 'Modelo editorial en campañas de moda urbana y fotografía nocturna en Barcelona.',
      ca: 'Model editorial en campanyes de moda urbana i fotografia nocturna a Barcelona.',
      en: 'Editorial model in urban fashion campaigns and night street shoots.',
    },
  },
  {
    id: 'quiriat',
    name: 'Quiriat Jearim Deras Menjivar',
    category: 'model',
    handle: '@quiriatmenjivar',
    url: 'https://www.instagram.com/quiriatmenjivar',
    avatar: './assets/colab-derasmenjivar.webp',
    position: 'center center',
    role: { es: 'Modelo de Portada', ca: 'Model de Portada', en: 'Cover Model' },
    bio: {
      es: 'Modelo en visuales, rodajes y fotografías de portada para sencillos de RAFA 930.',
      ca: 'Model en visuals, rodatges i fotografies de portada per a senzills de RAFA 930.',
      en: 'Model featured in single cover art and music video shoots for RAFA 930.',
    },
  },
];

const GALLERY_PHOTOS = COLLABORATORS.map((person) => ({
  id: `gal-${person.id}`,
  title: person.name,
  category: person.category,
  image: person.avatar,
  position: person.position || 'center center',
  handle: person.handle,
  url: person.url,
  role: person.role,
}));

/* ==========================================================================
   2. Internationalization Dictionary (ES / CA / EN)
   ========================================================================== */

const COOKIE_STORAGE_KEY = 'rafa930_cookie_consent_v1';
const LANG_STORAGE_KEY = 'rafa930_lang';

const I18N = {
  es: {
    skipLink: 'Saltar al contenido',
    marquee1: 'DE VUELTA · VIDEOCLIP OFICIAL 2026',
    marquee2: 'MÚSICA · DESARROLLO WEB & APPS · FOTOGRAFÍA',
    marquee3: 'BOOKING & PROYECTOS 2026 ABIERTOS',
    navHome: 'Inicio',
    navBio: 'Biografía',
    navSpecialties: 'Especialidades',
    navDiscography: 'Música',
    navGallery: 'Galería',
    navContact: 'Contacto',
    heroSubtitle: 'Música urbana, desarrollo web & apps y dirección visual desde Barcelona.',
    heroCtaPrimary: 'Escuchar en Spotify',
    heroCtaSecondary: 'Contratación y Booking',
    discEyebrow: 'Catálogo Seleccionado',
    discTitle: 'Discografía Oficial',
    track1Sub: 'Videoclip Oficial',
    track2Sub: 'Audio Oficial',
    track3Sub: 'La Vida Es Bella',
    track4Sub: 'Audio Oficial',
    videoPrivacyNote: 'Haz clic para reproducir (modo privacidad YouTube)',
    spotifyCardMeta: 'RAFA 930 · Reproductor oficial',
    spotifyCardBtn: '🎧 Escuchar los temas en Spotify',
    spotifyCardClose: 'Cerrar reproductor ✕',
    bioEyebrow: 'Identidad, Historia & Orígenes',
    bioTitle: 'Biografía Oficial',
    bioLead:
      'Rafael Moreno Román, conocido como RAFA 930, es un artista y compositor nacido en Mataró y criado en el barrio de La Mina (Sant Adrià de Besòs, 08930, Barcelona), que transforma experiencias reales en música urbana directa y honesta.',
    bioBody1:
      'Con temas como «De Vuelta», une emoción y verdad bajo su proyecto artístico independiente RAFA 930, completando su identidad creativa como desarrollador de aplicaciones y webs y fotógrafo y director visual.',
    specEyebrow: 'Perfil Multidisciplinar',
    specTitle: 'Música, Desarrollo & Dirección Visual',
    spec1Title: 'Artista Musical & Compositor',
    spec1Desc:
      'Música urbana, trap romántico y producción independiente con identidad propia desde el estudio hasta el escenario.',
    spec1Meta: 'Música urbana · Trap romántico · Directos',
    spec2Title: 'Desarrollador de Apps y Webs',
    spec2Desc:
      'Creación de experiencias digitales, desarrollo frontend/backend y aplicaciones modernas centradas en velocidad y diseño.',
    spec2Meta: 'Frontend · Backend · Aplicaciones web',
    spec3Title: 'Fotógrafo & Dirección Visual',
    spec3Desc:
      'Fotografía artística, retratos editoriales, estética en claroscuro y edición visual profesional para artistas y marcas.',
    spec3Meta: 'Retrato · Claroscuro · Edición visual',
    galEyebrow: 'Colaboraciones y Créditos',
    galTitle: 'Galería de Colaboradores',
    galAll: 'Todos (8)',
    galProd: 'Producción y Foto',
    galVocal: 'Artistas',
    galModel: 'Modelos',
    contactEyebrow: 'Booking & Management',
    contactTitle: 'Contacto Directo',
    contactLead:
      'Para contratación de conciertos, festivales, colaboraciones musicales o proyectos creativos. Respuesta directa en menos de 24 horas.',
    contactEmailLabel: 'Correo oficial',
    contactLocationLabel: 'Ubicación',
    contactResponseLabel: 'Disponibilidad',
    contactResponseVal: 'Directos · Estudio · Prensa (< 24h)',
    lblName: 'Nombre completo *',
    lblEmail: 'Correo electrónico *',
    lblPhone: 'Teléfono / WhatsApp *',
    lblType: 'Tipo de consulta',
    optShow: 'Concierto / Festival',
    optFeat: 'Colaboración / Estudio',
    optVisual: 'Fotografía / Web',
    optPress: 'Prensa / Entrevista',
    lblMessage: 'Detalles del proyecto *',
    lblPrivacyPre: 'He leído y acepto la',
    lblPrivacyLink: 'Política de Privacidad',
    lblPrivacyPost: 'y el tratamiento de mis datos para gestionar esta consulta. *',
    rgpdLayerRespLbl: 'Responsable:',
    rgpdLayerRespVal: 'Rafael Moreno Román (RAFA 930) · Mataró / Sant Adrià de Besòs (08930), provincia de Barcelona, España · https://rafa930.com · rafa.930music@gmail.com',
    rgpdLayerFinLbl: 'Finalidad y Legitimación:',
    rgpdLayerFinVal: 'Responder tu consulta o solicitud de booking basada en tu consentimiento expreso (art. 6.1.a RGPD). No se ceden datos a terceros.',
    rgpdLayerDerLbl: 'Derechos:',
    rgpdLayerDerVal: 'Acceso, rectificación, supresión y oposición escribiendo a rafa.930music@gmail.com.',
    rgpdLayerMore: 'Más información',
    btnSubmit: 'Enviar solicitud',
    phName: 'Tu nombre o entidad',
    phEmail: 'nombre@dominio.com',
    phMessage: 'Cuéntame fechas estimadas, ciudad o idea...',
    footerBrandDesc:
      'Música urbana, desarrollo de aplicaciones y webs modernas, y fotografía artística con dirección visual en claroscuro desde Barcelona.',
    footerNavTitle: 'Secciones',
    footerPlatformsTitle: 'Plataformas',
    footerLegalTitle: 'Legal',
    footerCopyright: '© 2026 RAFA 930 · Rafael Moreno Román · rafa930.com. Todos los derechos reservados.',
    footerNotice: 'Aviso Legal',
    footerPrivacy: 'Política de Privacidad',
    footerCookies: 'Política de Cookies',
    footerCookiePrefs: 'Configurar Cookies',
    floatingCookieLabel: 'Cookies',
    fabContact: 'Contacto',
    cookieBannerTitle: 'Uso de cookies',
    cookieBannerText:
      'Utilizamos almacenamiento técnico necesario para el funcionamiento básico y, si nos das permiso, el reproductor de YouTube con privacidad mejorada.',
    cookieReadPolicy: 'Ver Política de Cookies',
    cookieConfigure: 'Configurar',
    cookieReject: 'Rechazar',
    cookieAccept: 'Aceptar todas',
    cookiePrefsEyebrow: 'RGPD · LSSI-CE',
    cookiePrefsTitle: 'Configuración de Cookies',
    cookiePrefsIntro:
      'Elige qué categorías autorizas en rafa930.com. Solo empleamos almacenamiento técnico esencial y reproducción externa de YouTube bajo privacidad mejorada.',
    cookieCatTechTitle: '1. Técnicas necesarias',
    cookieCatTechDesc:
      'Almacena tu elección de cookies e idioma técnico para garantizar el funcionamiento básico.',
    cookieAlwaysOn: 'Siempre activas',
    cookieCatMediaTitle: '2. Reproductor YouTube (privacidad mejorada)',
    cookieCatMediaDesc:
      'Carga los videoclips mediante youtube-nocookie.com al hacer clic para reproducirlos.',
    cookieSavePrefs: 'Guardar',
    copyEmailLabel: 'Copiar correo oficial rafa.930music@gmail.com',
    copyEmailCopied: 'Correo copiado al portapapeles',
    errName: 'Introduce tu nombre completo (mínimo 2 caracteres).',
    errEmail: 'Introduce un correo electrónico válido.',
    errPhone: 'Introduce un teléfono o WhatsApp válido.',
    errMessage: 'Describe tu propuesta con al menos 15 caracteres.',
    errMessageLinks: 'Por seguridad, evita incluir enlaces o URLs en este formulario.',
    errPrivacy: 'Debes aceptar la política de privacidad para continuar.',
    errBotFast: 'Por seguridad, espera unos segundos antes de enviar la solicitud.',
    errCooldownTpl: 'Por seguridad, espera {s} segundos antes de realizar otro envío.',
    formSuccess: 'Solicitud validada correctamente. Puedes enviarla directamente por correo o WhatsApp:',
  },
  ca: {
    skipLink: 'Saltar al contingut',
    marquee1: 'DE VUELTA · VIDEOCLIP OFICIAL 2026',
    marquee2: 'MÚSICA · DESENVOLUPAMENT WEB & APPS · FOTOGRAFIA',
    marquee3: 'BOOKING & PROJECTES 2026 OBERTS',
    navHome: 'Inici',
    navBio: 'Biografia',
    navSpecialties: 'Especialitats',
    navDiscography: 'Música',
    navGallery: 'Galeria',
    navContact: 'Contacte',
    heroSubtitle: 'Música urbana, desenvolupament web & apps i direcció visual des de Barcelona.',
    heroCtaPrimary: 'Escoltar a Spotify',
    heroCtaSecondary: 'Contractació i Booking',
    discEyebrow: 'Catàleg Seleccionat',
    discTitle: 'Discografia Oficial',
    track1Sub: 'Videoclip Oficial',
    track2Sub: 'Àudio Oficial',
    track3Sub: 'La Vida Es Bella',
    track4Sub: 'Àudio Oficial',
    videoPrivacyNote: 'Fes clic per reproduir (mode privacitat YouTube)',
    spotifyCardMeta: 'RAFA 930 · Reproductor oficial',
    spotifyCardBtn: '🎧 Escoltar els temes a Spotify',
    spotifyCardClose: 'Tancar reproductor ✕',
    bioEyebrow: 'Identitat, Història & Orígens',
    bioTitle: 'Biografia Oficial',
    bioLead:
      'Rafael Moreno Román, conegut com a RAFA 930, és un artista i compositor nascut a Mataró i criat al barri de La Mina (Sant Adrià de Besòs, 08930, Barcelona), que transforma experiències reals en música urbana directa i honesta.',
    bioBody1:
      'Amb temes com «De Vuelta», uneix emoció i veritat sota el seu projecte artístic independent RAFA 930, completant la seva identitat creativa com a desenvolupador d’aplicacions i webs i fotògraf i director visual.',
    specEyebrow: 'Perfil Multidisciplinari',
    specTitle: 'Música, Desenvolupament & Direcció Visual',
    spec1Title: 'Artista Musical & Compositor',
    spec1Desc:
      'Música urbana, trap romàntic i producció independent amb identitat pròpia des de l’estudi fins a l’escenari.',
    spec1Meta: 'Música urbana · Trap romàntic · Directes',
    spec2Title: 'Desenvolupador d’Apps i Webs',
    spec2Desc:
      'Creació d’experiències digitals, desenvolupament frontend/backend i aplicacions modernes centrades en velocitat i disseny.',
    spec2Meta: 'Frontend · Backend · Aplicacions web',
    spec3Title: 'Fotògraf & Direcció Visual',
    spec3Desc:
      'Fotografia artística, retrats editorials, estètica en clarobscur i edició visual professional per a artistes i marques.',
    spec3Meta: 'Retrat · Clarobscur · Edició visual',
    galEyebrow: 'Col·laboracions i Crèdits',
    galTitle: 'Galeria de Col·laboradors',
    galAll: 'Tots (8)',
    galProd: 'Producció i Foto',
    galVocal: 'Artistes',
    galModel: 'Models',
    contactEyebrow: 'Booking & Management',
    contactTitle: 'Contacte Directe',
    contactLead:
      'Per a contractació de concerts, festivals, col·laboracions musicals o projectes creatius. Resposta directa en menys de 24 hores.',
    contactEmailLabel: 'Correu oficial',
    contactLocationLabel: 'Ubicació',
    contactResponseLabel: 'Disponibilitat',
    contactResponseVal: 'Directes · Estudi · Premsa (< 24h)',
    lblName: 'Nom complet *',
    lblEmail: 'Correu electrònic *',
    lblPhone: 'Telèfon / WhatsApp *',
    lblType: 'Tipus de consulta',
    optShow: 'Concert / Festival',
    optFeat: 'Col·laboració / Estudi',
    optVisual: 'Fotografia / Web',
    optPress: 'Premsa / Entrevista',
    lblMessage: 'Detalls del projecte *',
    lblPrivacyPre: 'He llegit i accepto la',
    lblPrivacyLink: 'Política de Privacitat',
    lblPrivacyPost: 'i el tractament de les meves dades per gestionar aquesta consulta. *',
    rgpdLayerRespLbl: 'Responsable:',
    rgpdLayerRespVal: 'Rafael Moreno Román (RAFA 930) · Mataró / Sant Adrià de Besòs (08930), província de Barcelona, Espanya · https://rafa930.com · rafa.930music@gmail.com',
    rgpdLayerFinLbl: 'Finalitat i Legitimació:',
    rgpdLayerFinVal: 'Respondre la teva consulta o sol·licitud de booking basada en el teu consentiment exprés (art. 6.1.a RGPD). No se cedeixen dades a tercers.',
    rgpdLayerDerLbl: 'Drets:',
    rgpdLayerDerVal: 'Accés, rectificació, supressió i oposició escrivint a rafa.930music@gmail.com.',
    rgpdLayerMore: 'Més informació',
    btnSubmit: 'Enviar sol·licitud',
    phName: 'El teu nom o entitat',
    phEmail: 'nom@domini.com',
    phMessage: 'Explica’m dates estimades, ciutat o idea...',
    footerBrandDesc:
      'Música urbana, desenvolupament d’aplicacions i webs modernes, i fotografia artística amb direcció visual en clarobscur des de Barcelona.',
    footerNavTitle: 'Seccions',
    footerPlatformsTitle: 'Plataformes',
    footerLegalTitle: 'Legal',
    footerCopyright: '© 2026 RAFA 930 · Rafael Moreno Román · rafa930.com. Tots els drets reservats.',
    footerNotice: 'Avís Legal',
    footerPrivacy: 'Política de Privacitat',
    footerCookies: 'Política de Cookies',
    footerCookiePrefs: 'Configurar Cookies',
    floatingCookieLabel: 'Cookies',
    fabContact: 'Contacte',
    cookieBannerTitle: 'Ús de cookies',
    cookieBannerText:
      'Utilitzem emmagatzematge tècnic necessari per al funcionament bàsic i, si ens dones permís, el reproductor de YouTube amb privacitat millorada.',
    cookieReadPolicy: 'Veure Política de Cookies',
    cookieConfigure: 'Configurar',
    cookieReject: 'Rebutjar',
    cookieAccept: 'Acceptar totes',
    cookiePrefsEyebrow: 'RGPD · LSSI-CE',
    cookiePrefsTitle: 'Configuració de Cookies',
    cookiePrefsIntro:
      'Tria quines categories autoritzes a rafa930.com. Només emprem emmagatzematge tècnic essencial i reproducció externa de YouTube sota privacitat millorada.',
    cookieCatTechTitle: '1. Tècniques necessàries',
    cookieCatTechDesc:
      'Emmagatzema la teva elecció de cookies i idioma tècnic per garantir el funcionament bàsic.',
    cookieAlwaysOn: 'Sempre actives',
    cookieCatMediaTitle: '2. Reproductor YouTube (privacitat millorada)',
    cookieCatMediaDesc:
      'Carrega els videoclips mitjançant youtube-nocookie.com en fer clic per reproduir-los.',
    cookieSavePrefs: 'Desar',
    copyEmailLabel: 'Copiar correu oficial rafa.930music@gmail.com',
    copyEmailCopied: 'Correu copiat al porta-retalls',
    errName: 'Introdueix el teu nom complet (mínim 2 caràcters).',
    errEmail: 'Introdueix un correu electrònic vàlid.',
    errPhone: 'Introdueix un telèfon o WhatsApp vàlid.',
    errMessage: 'Descriu la teva proposta amb almenys 15 caràcters.',
    errMessageLinks: 'Per seguretat, evita incloure enllaços o URLs en aquest formulari.',
    errPrivacy: 'Has d’acceptar la política de privacitat per continuar.',
    errBotFast: 'Per seguretat, espera uns segons abans d’enviar la sol·licitud.',
    errCooldownTpl: 'Per seguretat, espera {s} segons abans de fer un altre enviament.',
    formSuccess: 'Sol·licitud validada correctament. Pots enviar-la directament per correu o WhatsApp:',
  },
  en: {
    skipLink: 'Skip to content',
    marquee1: 'DE VUELTA · OFFICIAL MUSIC VIDEO 2026',
    marquee2: 'MUSIC · WEB & APP DEVELOPMENT · PHOTOGRAPHY',
    marquee3: '2026 BOOKING & PROJECTS OPEN',
    navHome: 'Home',
    navBio: 'Biography',
    navSpecialties: 'Specialties',
    navDiscography: 'Music',
    navGallery: 'Gallery',
    navContact: 'Contact',
    heroSubtitle: 'Urban music, web & app development, and visual direction from Barcelona.',
    heroCtaPrimary: 'Listen on Spotify',
    heroCtaSecondary: 'Booking & Contact',
    discEyebrow: 'Selected Catalog',
    discTitle: 'Official Discography',
    track1Sub: 'Official Music Video',
    track2Sub: 'Official Audio',
    track3Sub: 'La Vida Es Bella',
    track4Sub: 'Official Audio',
    videoPrivacyNote: 'Click to play (YouTube privacy mode)',
    spotifyCardMeta: 'RAFA 930 · Official player',
    spotifyCardBtn: '🎧 Listen to the tracks on Spotify',
    spotifyCardClose: 'Close player ✕',
    bioEyebrow: 'Identity, Story & Roots',
    bioTitle: 'Official Biography',
    bioLead:
      'Rafael Moreno Román, known as RAFA 930, is an artist and songwriter born in Mataró and raised in La Mina (Sant Adrià de Besòs, 08930, Barcelona), turning real-life experiences into direct, honest urban music.',
    bioBody1:
      'With tracks like "De Vuelta", he brings emotion and truth together under his independent artistic project RAFA 930, completing his creative identity as an app and web developer and photographer and visual director.',
    specEyebrow: 'Multidisciplinary Profile',
    specTitle: 'Music, Software & Visual Direction',
    spec1Title: 'Musical Artist & Songwriter',
    spec1Desc:
      'Urban music, romantic trap, and independent production with a distinctive identity from studio to live stage.',
    spec1Meta: 'Urban music · Romantic trap · Live shows',
    spec2Title: 'App & Web Developer',
    spec2Desc:
      'Building digital experiences, frontend/backend architecture, and modern applications focused on speed and clean design.',
    spec2Meta: 'Frontend · Backend · Modern apps',
    spec3Title: 'Photographer & Visual Director',
    spec3Desc:
      'Artistic photography, editorial portraits, chiaroscuro lighting aesthetics, and high-grade visual editing for artists and brands.',
    spec3Meta: 'Portraits · Chiaroscuro · Visual editing',
    galEyebrow: 'Collaborations & Credits',
    galTitle: 'Collaborators Gallery',
    galAll: 'All (8)',
    galProd: 'Production & Photo',
    galVocal: 'Artists',
    galModel: 'Models',
    contactEyebrow: 'Booking & Management',
    contactTitle: 'Direct Contact',
    contactLead:
      'For concert bookings, festivals, studio collaborations, or creative direction. Direct response within 24 hours.',
    contactEmailLabel: 'Official email',
    contactLocationLabel: 'Location',
    contactResponseLabel: 'Availability',
    contactResponseVal: 'Live · Studio · Press (< 24h)',
    lblName: 'Full name *',
    lblEmail: 'Email address *',
    lblPhone: 'Phone / WhatsApp *',
    lblType: 'Inquiry type',
    optShow: 'Concert / Festival',
    optFeat: 'Collaboration / Studio',
    optVisual: 'Photography / Web',
    optPress: 'Press / Interview',
    lblMessage: 'Project details *',
    lblPrivacyPre: 'I have read and accept the',
    lblPrivacyLink: 'Privacy Policy',
    lblPrivacyPost: 'and the processing of my data to manage this inquiry. *',
    rgpdLayerRespLbl: 'Controller:',
    rgpdLayerRespVal: 'Rafael Moreno Román (RAFA 930) · Mataró / Sant Adrià de Besòs (08930), Barcelona, Spain · https://rafa930.com · rafa.930music@gmail.com',
    rgpdLayerFinLbl: 'Purpose & Legal Basis:',
    rgpdLayerFinVal: 'Respond to your booking or contact inquiry based on your explicit consent (Art. 6(1)(a) GDPR). No data shared with third parties.',
    rgpdLayerDerLbl: 'Rights:',
    rgpdLayerDerVal: 'Access, rectification, erasure, and objection by emailing rafa.930music@gmail.com.',
    rgpdLayerMore: 'More information',
    btnSubmit: 'Send request',
    phName: 'Your name or organization',
    phEmail: 'name@domain.com',
    phMessage: 'Share estimated dates, city, or project details...',
    footerBrandDesc:
      'Urban music, modern web and app development, and chiaroscuro artistic photography from Barcelona.',
    footerNavTitle: 'Sections',
    footerPlatformsTitle: 'Platforms',
    footerLegalTitle: 'Legal',
    footerCopyright: '© 2026 RAFA 930 · Rafael Moreno Román · rafa930.com. All rights reserved.',
    footerNotice: 'Legal Notice',
    footerPrivacy: 'Privacy Policy',
    footerCookies: 'Cookie Policy',
    footerCookiePrefs: 'Cookie Settings',
    floatingCookieLabel: 'Cookies',
    fabContact: 'Contact',
    cookieBannerTitle: 'Cookies usage',
    cookieBannerText:
      'We use essential technical storage for core functionality and, with your permission, YouTube playback in enhanced privacy mode.',
    cookieReadPolicy: 'View Cookie Policy',
    cookieConfigure: 'Customize',
    cookieReject: 'Reject',
    cookieAccept: 'Accept all',
    cookiePrefsEyebrow: 'GDPR · LSSI-CE',
    cookiePrefsTitle: 'Cookie Settings',
    cookiePrefsIntro:
      'Choose which categories you authorize on rafa930.com. We only use essential technical storage and YouTube playback under enhanced privacy mode.',
    cookieCatTechTitle: '1. Strictly necessary',
    cookieCatTechDesc:
      'Stores your cookie preference and technical interface language for core site functionality.',
    cookieAlwaysOn: 'Always active',
    cookieCatMediaTitle: '2. YouTube player (enhanced privacy)',
    cookieCatMediaDesc:
      'Loads music videos via youtube-nocookie.com only when you click to play.',
    cookieSavePrefs: 'Save',
    copyEmailLabel: 'Copy official email rafa.930music@gmail.com',
    copyEmailCopied: 'Email copied to clipboard',
    errName: 'Please enter your full name (at least 2 characters).',
    errEmail: 'Please enter a valid email address.',
    errPhone: 'Please enter a valid phone or WhatsApp number.',
    errMessage: 'Please describe your proposal (at least 15 characters).',
    errMessageLinks: 'For security, please do not include links or URLs in this form.',
    errPrivacy: 'You must accept the privacy notice to proceed.',
    errBotFast: 'For security, please wait a few seconds before submitting.',
    errCooldownTpl: 'For security, please wait {s} seconds before submitting again.',
    formSuccess: 'Request validated. Send directly via email or WhatsApp below:',
  },
};

/* ==========================================================================
   3. Application State
   ========================================================================== */

const state = {
  lang: 'es',
  galleryFilter: 'all',
  filteredGallery: GALLERY_PHOTOS,
  consent: {
    necessary: true,
    preferences: false,
    media: false,
    hasChoice: false,
  },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function createEl(tag, className, textContent) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent !== undefined) el.textContent = textContent;
  return el;
}

/* ==========================================================================
   4. Dynamic Section Renderers & Image Preload / Decode
   ========================================================================== */

const PRELOADED_IMAGES = [];

function preloadAllImages() {
  const urls = [
    'logo-splash.png',
    'logo.png',
    'mi-foto.jpg',
    './favicon.jpg',
    'https://img.youtube.com/vi/nOVpU_fKwkc/maxresdefault.jpg',
    'https://img.youtube.com/vi/WaV1KeSN5_4/maxresdefault.jpg',
    'https://img.youtube.com/vi/hlDWuv44yrc/maxresdefault.jpg',
    'https://img.youtube.com/vi/9FYW3Fm87bE/maxresdefault.jpg',
    './assets/de-vuelta.jpg',
    './assets/nose-si-estare-manana.jpg',
    './assets/romeo-y-julieta.jpg',
    ...COLLABORATORS.map((c) => c.avatar),
  ];

  const uniqueUrls = Array.from(new Set(urls.filter(Boolean)));
  uniqueUrls.forEach((src) => {
    const img = new Image();
    img.decoding = 'async';
    if (/^https?:\/\//i.test(src)) {
      img.referrerPolicy = 'no-referrer';
    }
    img.src = src;
    if (typeof img.decode === 'function') {
      img.decode().catch(() => {});
    }
    PRELOADED_IMAGES.push(img);
  });

  $$('img').forEach((domImg) => {
    if (domImg.complete && typeof domImg.decode === 'function') {
      domImg.decode().catch(() => {});
    }
  });
}

function renderGallery() {
  const grid = $('#gallery-grid');
  if (!grid) return;
  grid.textContent = '';

  const filtered =
    state.galleryFilter === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === state.galleryFilter);

  state.filteredGallery = filtered;
  grid.dataset.count = String(filtered.length);

  filtered.forEach((photo) => {
    const figure = createEl('figure', 'gallery-item');

    const thumb = createEl('div', 'gallery-thumb');
    const img = document.createElement('img');
    img.src = photo.image;
    img.alt = `${photo.title} — ${photo.role[state.lang]} colaborador de RAFA 930`;
    img.width = 400;
    img.height = 400;
    img.loading = 'eager';
    img.decoding = 'async';
    img.draggable = false;
    img.style.objectPosition = photo.position || 'center center';
    thumb.appendChild(img);

    const caption = createEl('figcaption', 'gallery-caption');
    const title = createEl('strong', 'gallery-name', photo.title);

    const igLink = document.createElement('a');
    igLink.className = 'gallery-ig-btn';
    igLink.href = photo.url;
    igLink.target = '_blank';
    igLink.rel = 'noopener noreferrer';
    igLink.setAttribute('aria-label', `Instagram de ${photo.title} (${photo.handle})`);

    const svgNS = 'http://www.w3.org/2000/svg';
    const igSvg = document.createElementNS(svgNS, 'svg');
    igSvg.setAttribute('width', '13');
    igSvg.setAttribute('height', '13');
    igSvg.setAttribute('viewBox', '0 0 24 24');
    igSvg.setAttribute('fill', 'currentColor');
    igSvg.setAttribute('aria-hidden', 'true');
    const igPath = document.createElementNS(svgNS, 'path');
    igPath.setAttribute(
      'd',
      'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
    );
    igSvg.appendChild(igPath);
    const igHandle = createEl('span', '', photo.handle);
    igLink.append(igSvg, igHandle);

    caption.append(title, igLink);
    figure.append(thumb, caption);

    grid.appendChild(figure);
  });

  if (typeof refreshGalleryReveal === 'function') {
    refreshGalleryReveal();
  }
}

/* ==========================================================================
   6. Language Switcher
   ========================================================================== */

const BIO_KEYWORDS = {
  es: [
    'RAFA 930',
    'Mataró',
    'La Mina',
    'música urbana',
    'De Vuelta',
    'desarrollador de aplicaciones y webs',
    'fotógrafo y director visual',
  ],
  ca: [
    'RAFA 930',
    'Mataró',
    'La Mina',
    'música urbana',
    'De Vuelta',
    'desenvolupador d’aplicacions i webs',
    'fotògraf i director visual',
  ],
  en: [
    'RAFA 930',
    'Mataró',
    'La Mina',
    'urban music',
    'De Vuelta',
    'app and web developer',
    'photographer and visual director',
  ],
};

function renderRichKeywords(el, text, keywords) {
  if (!keywords || keywords.length === 0) {
    el.textContent = text;
    return;
  }
  const sorted = [...keywords].sort((a, b) => b.length - a.length);
  const escaped = sorted.map((kw) => kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g');
  const parts = text.split(pattern);
  const frag = document.createDocumentFragment();

  parts.forEach((part) => {
    if (!part) return;
    if (sorted.includes(part)) {
      frag.appendChild(createEl('strong', 'bio-keyword', part));
    } else {
      frag.appendChild(document.createTextNode(part));
    }
  });

  el.textContent = '';
  el.appendChild(frag);
}

function applyLanguage(lang) {
  if (!I18N[lang]) return;
  state.lang = lang;
  if (!document.body.classList.contains('legal-page-body')) {
    document.documentElement.lang = lang;
  }

  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // Storage unavailable
  }

  const dict = I18N[lang];
  const bioKeys = new Set(['bioLead', 'bioBody1']);

  $$('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key && dict[key]) {
      if (bioKeys.has(key)) {
        renderRichKeywords(el, dict[key], BIO_KEYWORDS[lang]);
      } else {
        el.textContent = dict[key];
      }
    }
  });

  $$('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && dict[key] && 'placeholder' in el) {
      el.placeholder = dict[key];
    }
  });

  const copyEmailBtn = $('#copy-email-btn');
  if (copyEmailBtn && dict.copyEmailLabel) {
    copyEmailBtn.setAttribute('aria-label', dict.copyEmailLabel);
  }

  $$('.lang-btn').forEach((btn) => {
    const active = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  renderGallery();
}

/* ==========================================================================
   7. Navigation & Scroll Spy
   ========================================================================== */

function initNavigation() {
  const header = $('.site-header');
  const menuToggle = $('#menu-toggle');
  const primaryNav = $('#primary-nav');
  const navLinks = $$('.nav-link');
  const sections = $$('main section[id]');

  let activeId = 'inicio';
  let scrollLockUntil = 0;

  const resolveSectionId = (rawId) => (rawId === 'musica' ? 'discografia' : rawId);

  const setActiveNav = (targetId) => {
    if (!targetId) return;
    const resolvedId = resolveSectionId(targetId);
    activeId = resolvedId;
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute('href') === `#${resolvedId}`;
      link.classList.toggle('is-active', isMatch);
      if (isMatch) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const closeMenu = () => {
    if (!menuToggle || !primaryNav) return;
    primaryNav.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
  };

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = primaryNav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
      );
    });

    document.addEventListener('click', (e) => {
      if (
        primaryNav.classList.contains('is-open') &&
        header &&
        !header.contains(/** @type {Node} */ (e.target))
      ) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 980 && primaryNav.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  $$('a[href^="#"]:not(.skip-link)').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      if (href.length < 2) return;
      const targetId = resolveSectionId(href.slice(1));
      const targetEl = document.getElementById(targetId);
      if (!targetEl && targetId !== 'inicio') return;

      closeMenu();
      setActiveNav(targetId);
      scrollLockUntil = Date.now() + 750;

      if (targetId === 'inicio') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }

      if (
        !document.body.classList.contains('legal-page-body') &&
        window.location.hash &&
        history.replaceState
      ) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    });
  });

  const lightSections = $$('main section.section-light');
  const syncHeaderTheme = () => {
    if (!header) return;
    if (document.body.classList.contains('legal-page-body') || lightSections.length === 0) {
      header.classList.remove('is-light-header');
      return;
    }
    const headerRect = header.getBoundingClientRect();
    const probeY = Math.max(12, headerRect.top + headerRect.height * 0.5);
    let onLightSection = false;
    for (let i = 0; i < lightSections.length; i += 1) {
      const rect = lightSections[i].getBoundingClientRect();
      if (rect.top <= probeY && rect.bottom > probeY) {
        onLightSection = true;
        break;
      }
    }
    header.classList.toggle('is-light-header', onLightSection);
  };

  if (typeof window.IntersectionObserver === 'function' && lightSections.length > 0) {
    const themeTargets = $$('main section[id], footer.site-footer');
    const headerThemeObserver = new IntersectionObserver(
      () => {
        syncHeaderTheme();
      },
      {
        threshold: [0, 0.05, 0.25, 0.5, 0.85, 1],
        rootMargin: '-1px 0px 0px 0px',
      }
    );
    themeTargets.forEach((el) => headerThemeObserver.observe(el));
  }

  const computeActiveSection = () => {
    if (sections.length === 0) return 'inicio';
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const headerHeight = header ? header.getBoundingClientRect().height : 74;

    if (scrollY <= 60) {
      return 'inicio';
    }

    const docHeight = document.documentElement.scrollHeight;
    if (window.innerHeight + scrollY >= docHeight - 24) {
      return sections[sections.length - 1].getAttribute('id') || 'contacto';
    }

    const triggerLine = Math.max(135, headerHeight + 70);
    let current = sections[0].getAttribute('id') || 'inicio';

    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top <= triggerLine) {
        current = sections[i].getAttribute('id') || current;
      } else {
        break;
      }
    }

    return current;
  };

  let scrollTicking = false;
  const syncScrollSpy = () => {
    syncHeaderTheme();
    if (Date.now() < scrollLockUntil) return;
    const nextId = computeActiveSection();
    if (nextId !== activeId) {
      setActiveNav(nextId);
    }
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(() => {
          syncScrollSpy();
          scrollTicking = false;
        });
      }
    },
    { passive: true }
  );

  // Release temporary click lock if user manually scrolls with wheel or touch
  window.addEventListener('wheel', () => { scrollLockUntil = 0; }, { passive: true });
  window.addEventListener('touchstart', () => { scrollLockUntil = 0; }, { passive: true });
  window.addEventListener('resize', syncScrollSpy, { passive: true });

  syncHeaderTheme();
  setActiveNav(computeActiveSection());
}

/* ==========================================================================
   8. Video Stage Controls & Invisible Background Music Controller (De Vuelta.mp3)
   ========================================================================== */

let pauseBgMusic = () => {};

function setSafeAudioVolume(audio, value) {
  if (!audio || !Number.isFinite(value)) return;
  try {
    audio.volume = Math.max(0, Math.min(1, value));
  } catch {
    // Ignore hardware/browser volume locks (e.g., mobile read-only volume)
  }
}

function initBackgroundMusic() {
  const audio = /** @type {HTMLAudioElement | null} */ ($('#bg-music'));
  if (!audio) return;

  const TARGET_VOLUME = 0.45;
  const FADE_DURATION_MS = 1200;

  let fadeRafId = 0;
  let hasStarted = false;
  let isAttemptInFlight = false;
  let pausedByVideo = false;

  const stopFade = () => {
    if (fadeRafId) {
      window.cancelAnimationFrame(fadeRafId);
      fadeRafId = 0;
    }
  };

  const fadeVolumeIn = () => {
    stopFade();
    const startTime = performance.now();
    setSafeAudioVolume(audio, 0);

    const step = (now) => {
      if (audio.paused) {
        fadeRafId = 0;
        return;
      }
      const progress = Math.max(0, Math.min(1, (now - startTime) / FADE_DURATION_MS));
      const eased = 1 - Math.pow(1 - progress, 3);
      setSafeAudioVolume(audio, Number((TARGET_VOLUME * eased).toFixed(3)));
      if (progress < 1) {
        fadeRafId = window.requestAnimationFrame(step);
      } else {
        setSafeAudioVolume(audio, TARGET_VOLUME);
        fadeRafId = 0;
      }
    };

    fadeRafId = window.requestAnimationFrame(step);
  };

  const cleanupGestureListeners = () => {
    document.removeEventListener('touchstart', handleFirstInteraction, true);
    document.removeEventListener('pointerdown', handleFirstInteraction, true);
    document.removeEventListener('click', handleFirstInteraction, true);
    document.removeEventListener('keydown', handleFirstInteraction, true);
  };

  pauseBgMusic = () => {
    pausedByVideo = true;
    stopFade();
    if (!audio.paused) {
      audio.pause();
    }
    cleanupGestureListeners();
  };

  const handleFirstInteraction = async (e) => {
    if (hasStarted || isAttemptInFlight || pausedByVideo || !audio.paused) return;

    const target = e.target instanceof Element ? e.target : null;
    if (target && target.closest('.video-stage, #spotify-open-btn')) return;
    if ($('.video-stage-embedded')) return;

    if (e.type === 'keydown') {
      const ke = /** @type {KeyboardEvent} */ (e);
      if (ke.key === 'Tab' || ke.key === 'Escape' || ke.metaKey || ke.ctrlKey || ke.altKey) {
        return;
      }
    }

    isAttemptInFlight = true;
    try {
      setSafeAudioVolume(audio, 0);
      await audio.play();
      isAttemptInFlight = false;
      if (pausedByVideo) {
        audio.pause();
        return;
      }
      hasStarted = true;
      fadeVolumeIn();
      cleanupGestureListeners();
    } catch {
      isAttemptInFlight = false;
    }
  };

  document.addEventListener('touchstart', handleFirstInteraction, { capture: true, passive: true });
  document.addEventListener('pointerdown', handleFirstInteraction, { capture: true, passive: true });
  document.addEventListener('click', handleFirstInteraction, { capture: true, passive: true });
  document.addEventListener('keydown', handleFirstInteraction, { capture: true, passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !audio.paused) {
      stopFade();
      audio.pause();
    }
  });

  document.addEventListener(
    'click',
    (e) => {
      const anchor = e.target instanceof Element ? e.target.closest('a[href]') : null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      if (/open\.spotify\.com|youtube\.com|youtu\.be|music\.apple\.com/i.test(href)) {
        pauseBgMusic();
      }
    },
    { passive: true }
  );
}

const videoStageBackups = new WeakMap();
let openSpotifyPlayerCard = (_opts = { pauseMusic: false }) => {};
let closeSpotifyPlayerCard = () => {};

function extractYoutubeId(rawValue) {
  if (!rawValue) return '';
  const trimmed = rawValue.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  const embedMatch = trimmed.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  return '';
}

function stopYoutubeStage(stage) {
  if (!stage) return;
  const activeIframe = stage.querySelector('iframe');
  if (activeIframe) {
    activeIframe.src = 'about:blank';
    activeIframe.remove();
  }

  const backup = videoStageBackups.get(stage);
  stage.classList.remove('video-stage-embedded');
  stage.setAttribute('role', 'button');
  stage.setAttribute('tabindex', '0');
  if (backup) {
    if (backup.ariaLabel) {
      stage.setAttribute('aria-label', backup.ariaLabel);
    }
    stage.textContent = '';
    backup.nodes.forEach((node) => stage.appendChild(node));
    const dict = I18N[state.lang] || I18N.es;
    stage.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key && dict[key]) el.textContent = dict[key];
    });
  }
}

function embedYoutubeStage(stage, autoplay) {
  if (!stage) return;
  const rawId = stage.getAttribute('data-video-id') || stage.getAttribute('data-youtube-id') || '';
  const ytId = extractYoutubeId(rawId);
  if (!ytId || stage.querySelector('iframe')) return;

  $$('.video-stage.video-stage-embedded').forEach((otherStage) => {
    if (otherStage !== stage) {
      stopYoutubeStage(otherStage);
    }
  });

  closeSpotifyPlayerCard();
  pauseBgMusic();

  if (!videoStageBackups.has(stage)) {
    videoStageBackups.set(stage, {
      ariaLabel: stage.getAttribute('aria-label') || '',
      nodes: Array.from(stage.childNodes),
    });
  }

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${ytId}?${autoplay ? 'autoplay=1&' : ''}rel=0`;
  iframe.title = stage.getAttribute('data-track-title') || 'RAFA 930 — Vídeo Oficial';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;
  stage.classList.add('video-stage-embedded');
  stage.removeAttribute('role');
  stage.removeAttribute('tabindex');
  stage.textContent = '';
  stage.appendChild(iframe);
}

function initAudioAndVideo() {
  $$('.video-stage').forEach((stage) => {
    const rawId = stage.getAttribute('data-video-id') || stage.getAttribute('data-youtube-id') || '';
    const ytId = extractYoutubeId(rawId);
    if (!ytId) return;

    const activateVideo = () => embedYoutubeStage(stage, true);
    stage.addEventListener('click', activateVideo);
    stage.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateVideo();
      }
    });
  });
}

function initSpotifyCard() {
  const card = $('#spotify-player-card');
  const openBtn = $('#spotify-open-btn');
  const closeBtn = $('#spotify-close-btn');
  const panel = $('#spotify-embed-panel');
  const inner = $('#spotify-embed-inner');
  if (!card || !openBtn || !closeBtn || !panel || !inner) return;

  const SPOTIFY_EMBED_SRC =
    'https://open.spotify.com/embed/artist/2YyY3BFuxnqeYXlupNRcng?utm_source=generator&theme=0';

  const mountIframe = () => {
    if (inner.querySelector('iframe')) return;
    const iframe = document.createElement('iframe');
    iframe.style.borderRadius = '12px';
    iframe.src = SPOTIFY_EMBED_SRC;
    iframe.width = '100%';
    iframe.height = '152';
    iframe.setAttribute('frameborder', '0');
    iframe.allowFullscreen = true;
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.loading = 'lazy';
    iframe.title = 'RAFA 930 — Reproductor oficial de Spotify';
    inner.appendChild(iframe);
  };

  const closeSpotifyPlayer = () => {
    card.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    closeBtn.hidden = true;
    openBtn.hidden = false;
    const activeIframe = inner.querySelector('iframe');
    if (activeIframe) {
      activeIframe.src = 'about:blank';
      activeIframe.remove();
    }
  };

  closeSpotifyPlayerCard = closeSpotifyPlayer;

  openSpotifyPlayerCard = ({ pauseMusic = true } = { pauseMusic: true }) => {
    if (pauseMusic) {
      pauseBgMusic();
      $$('.video-stage.video-stage-embedded').forEach((activeStage) => {
        stopYoutubeStage(activeStage);
      });
    }
    mountIframe();
    card.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    openBtn.hidden = true;
    closeBtn.hidden = false;
  };

  openBtn.addEventListener('click', () => openSpotifyPlayerCard({ pauseMusic: true }));
  closeBtn.addEventListener('click', closeSpotifyPlayer);
}

/* ==========================================================================
   8b. Independent Dust & Particle Explosion Splash Screen (4.0s Cinematic)
   ========================================================================== */

function initSplashScreen() {
  const splash = $('#splash-screen');
  if (!splash) {
    document.documentElement.classList.remove('is-splash-active');
    document.body.classList.remove('is-splash-active');
    document.body.classList.add('is-hero-ready');
    return;
  }

  document.documentElement.classList.add('is-splash-active');
  document.body.classList.add('is-splash-active');
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

  const canvas = $('#splash-dust-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const logoStage = splash.querySelector('.splash-logo-stage');

  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let rafId = 0;
  let finished = false;
  let hasDetonated = false;
  let chargeTimer = 0;
  let detonateTimer = 0;
  let revealTimer = 0;
  let heroTimer = 0;
  let canvasFadeTimer = 0;
  let finishTimer = 0;

  const isMobileViewport = () => width < 768;

  // Offscreen cached radial smoke/dust cloud sprites for zero-GC 60fps rendering
  const cloudSprites = [];
  const createCloudSprite = (r, g, b, innerAlpha, midAlpha) => {
    const size = 128;
    const off = document.createElement('canvas');
    off.width = size;
    off.height = size;
    const octx = off.getContext('2d');
    if (octx) {
      const half = size * 0.5;
      const grad = octx.createRadialGradient(half, half, 2, half, half, half);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${innerAlpha})`);
      grad.addColorStop(0.38, `rgba(${r}, ${g}, ${b}, ${midAlpha})`);
      grad.addColorStop(0.75, `rgba(${r}, ${g}, ${b}, ${midAlpha * 0.25})`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      octx.fillStyle = grad;
      octx.fillRect(0, 0, size, size);
    }
    return off;
  };

  if (ctx) {
    cloudSprites.push(
      createCloudSprite(255, 255, 255, 0.72, 0.34), // luminous white mist
      createCloudSprite(203, 213, 225, 0.58, 0.26), // cool silver dust
      createCloudSprite(71, 85, 105, 0.42, 0.18),   // graphite smoke cloud
      createCloudSprite(37, 99, 235, 0.46, 0.2),    // electric blue dust cloud
      createCloudSprite(124, 58, 237, 0.44, 0.19)   // vibrant purple dust cloud
    );
  }

  // Crisp sparks & fine dust grain palette
  const grainPalette = [
    '255, 255, 255', // luminous white
    '241, 245, 249', // bright pearl
    '71, 85, 105',   // graphite grey
    '51, 65, 85',    // dark graphite
    '37, 99, 235',   // electric blue #2563EB
    '124, 58, 237',  // vibrant purple #7C3AED
  ];

  const ambientParticles = [];
  const cloudParticles = [];
  const sparkParticles = [];
  let shockwave = null;

  const spawnAmbientParticles = () => {
    ambientParticles.length = 0;
    const count = isMobileViewport() ? 42 : 70;
    const cx = width * 0.5;
    const cy = height * 0.5;
    const spanX = Math.min(width * 0.7, 640);
    const spanY = Math.min(height * 0.52, 420);

    for (let i = 0; i < count; i += 1) {
      const colorRgb = grainPalette[Math.floor(Math.random() * grainPalette.length)];
      ambientParticles.push({
        x: cx + (Math.random() - 0.5) * spanX,
        y: cy + (Math.random() - 0.5) * spanY,
        vx: (Math.random() - 0.5) * 18,
        vy: -8 - Math.random() * 18,
        radius: 1 + Math.random() * 2.2,
        alpha: 0.28 + Math.random() * 0.52,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 1.6 + Math.random() * 2.1,
        colorRgb,
      });
    }
  };

  const setupCanvas = () => {
    if (!canvas || !ctx) return;
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!hasDetonated && ambientParticles.length === 0) {
      spawnAmbientParticles();
    }
  };

  setupCanvas();
  window.addEventListener('resize', setupCanvas, { passive: true });

  let blastStartTime = 0;
  let lastTime = performance.now();
  let phaseStart = lastTime;
  let isCharging = false;
  let earlyFactor = 1;

  const triggerExplosion = (early = false) => {
    if (hasDetonated || finished) return;
    hasDetonated = true;
    isCharging = false;
    earlyFactor = early ? 0.62 : 1;

    window.clearTimeout(chargeTimer);
    window.clearTimeout(detonateTimer);

    splash.classList.remove('is-charging');
    splash.classList.add('is-detonating');
    splash.setAttribute('aria-hidden', 'true');

    blastStartTime = performance.now();

    const cx = width * 0.5;
    const cy = height * 0.5;
    const rect = logoStage ? logoStage.getBoundingClientRect() : null;
    const emitW = rect && rect.width > 0 ? rect.width * 0.78 : Math.min(width * 0.55, 380);
    const emitH = rect && rect.height > 0 ? rect.height * 0.62 : Math.min(height * 0.22, 130);
    const maxDim = Math.max(width, height);

    // Subtle radial shockwave pulse behind clouds
    shockwave = {
      x: cx,
      y: cy,
      radius: 16,
      maxRadius: maxDim * 0.85,
      alpha: 0.42,
    };

    // Convert ambient motes into outward blast grains
    for (let i = 0; i < ambientParticles.length; i += 1) {
      const m = ambientParticles[i];
      const dx = m.x - cx;
      const dy = m.y - cy;
      const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.4;
      const speed = (340 + Math.random() * 680) * (isMobileViewport() ? 0.78 : 1);
      sparkParticles.push({
        x: m.x,
        y: m.y,
        prevX: m.x,
        prevY: m.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: m.radius,
        alpha: Math.min(0.95, m.alpha + 0.3),
        drag: 1.45 + Math.random() * 1.4,
        gravity: 38 + Math.random() * 55,
        turbAmp: 12 + Math.random() * 26,
        turbPhase: Math.random() * Math.PI * 2,
        turbSpeed: 2.2 + Math.random() * 2.8,
        colorRgb: m.colorRgb,
        shape: Math.random() < 0.35 ? 1 : 0, // 0: round grain, 1: crisp shard/spark
      });
    }
    ambientParticles.length = 0;

    // 1) Dense Soft Dust / Smoke Clouds (~72 desktop, ~38 mobile)
    const cloudCount = isMobileViewport() ? 38 : 72;
    for (let i = 0; i < cloudCount; i += 1) {
      const ox = cx + (Math.random() - 0.5) * emitW * 0.85;
      const oy = cy + (Math.random() - 0.5) * emitH * 0.85;
      const angle = Math.atan2(oy - cy, ox - cx) + (Math.random() - 0.5) * 0.85;
      const speed = (180 + Math.random() * 660) * (isMobileViewport() ? 0.72 : 1);
      const startRadius = 28 + Math.random() * 44;
      const growthRate = 48 + Math.random() * 88;
      const sprite = cloudSprites[Math.floor(Math.random() * cloudSprites.length)];

      cloudParticles.push({
        x: ox,
        y: oy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 18,
        radius: startRadius,
        maxRadius: startRadius + (isMobileViewport() ? 75 : 130) + Math.random() * 85,
        growthRate,
        drag: 1.65 + Math.random() * 1.15,
        gravity: -8 + Math.random() * 24,
        alpha: 0.36 + Math.random() * 0.38,
        turbPhase: Math.random() * Math.PI * 2,
        turbSpeed: 1.2 + Math.random() * 1.6,
        sprite,
      });
    }

    // 2) Hundreds of Crisp Sparks & Fine Dust Grains (1px - 5px)
    // Total blast particles: ~442 desktop (370 + 72), ~220 mobile (182 + 38)
    const sparkCount = isMobileViewport() ? 182 : 370;
    for (let i = 0; i < sparkCount; i += 1) {
      const ox = cx + (Math.random() - 0.5) * emitW;
      const oy = cy + (Math.random() - 0.5) * emitH;
      const dx = ox - cx;
      const dy = oy - cy;
      const baseAngle =
        Math.abs(dx) + Math.abs(dy) > 4
          ? Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.95
          : Math.random() * Math.PI * 2;

      const isFastSpark = Math.random() < 0.42;
      const baseSpeed = isFastSpark
        ? 560 + Math.random() * 1120
        : 190 + Math.random() * 580;
      const speed = baseSpeed * (isMobileViewport() ? 0.76 : 1);

      const radius = isFastSpark
        ? 1.1 + Math.random() * 2.3
        : 1.0 + Math.random() * 3.9; // 1px to ~5px grains

      const colorRgb = grainPalette[Math.floor(Math.random() * grainPalette.length)];

      sparkParticles.push({
        x: ox,
        y: oy,
        prevX: ox,
        prevY: oy,
        vx: Math.cos(baseAngle) * speed,
        vy: Math.sin(baseAngle) * speed - Math.random() * 40,
        radius,
        alpha: 0.48 + Math.random() * 0.5,
        drag: isFastSpark ? 1.9 + Math.random() * 1.4 : 1.15 + Math.random() * 1.25,
        gravity: 34 + Math.random() * 82,
        turbAmp: 14 + Math.random() * 36,
        turbPhase: Math.random() * Math.PI * 2,
        turbSpeed: 2.0 + Math.random() * 3.2,
        colorRgb,
        shape: Math.random() < 0.3 ? 1 : 0,
      });
    }

    // Reveal the page cleanly underneath the flying dust cloud
    const backdropDelay = early ? 90 : 150;
    const heroDelay = early ? 110 : 180;
    const canvasFadeDelay = early ? 720 : 1820;
    const cleanupDelay = early ? 1120 : 2200; // 1800ms + 2200ms = exact 4000ms total

    revealTimer = window.setTimeout(() => {
      splash.classList.add('is-revealing');
    }, backdropDelay);

    heroTimer = window.setTimeout(() => {
      document.body.classList.add('is-hero-ready');
    }, heroDelay);

    canvasFadeTimer = window.setTimeout(() => {
      splash.classList.add('is-fading-canvas');
    }, canvasFadeDelay);

    finishTimer = window.setTimeout(cleanupSplash, cleanupDelay);
  };

  const renderFrame = (now) => {
    if (finished || !ctx) return;
    const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
    lastTime = now;

    ctx.clearRect(0, 0, width, height);
    const cx = width * 0.5;
    const cy = height * 0.5;

    if (!hasDetonated) {
      // Phase 1 (0.0s - 1.8s): Ambient dust swirling subtly & charging toward center
      const elapsed = (now - phaseStart) / 1000;
      const chargeStrength = isCharging ? Math.min(1, Math.max(0, (elapsed - 1.05) / 0.75)) : 0;

      for (let i = 0; i < ambientParticles.length; i += 1) {
        const p = ambientParticles[i];
        p.phase += p.phaseSpeed * dt;

        if (chargeStrength > 0) {
          const dx = cx - p.x;
          const dy = cy - p.y;
          const dist = Math.hypot(dx, dy) || 1;
          // Gentle inward kinetic pull + orbital swirl prior to detonation
          const pull = chargeStrength * 64 * dt;
          p.vx += (dx / dist) * pull - (dy / dist) * pull * 0.45;
          p.vy += (dy / dist) * pull + (dx / dist) * pull * 0.45;
          p.vx *= Math.exp(-1.5 * dt);
          p.vy *= Math.exp(-1.5 * dt);
        }

        p.x += (p.vx + Math.sin(p.phase) * 14) * dt;
        p.y += (p.vy + Math.cos(p.phase * 0.9) * 10) * dt;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const twinkle = 0.65 + 0.35 * Math.sin(p.phase);
        const alpha = p.alpha * twinkle * (1 + chargeStrength * 0.35);
        ctx.fillStyle = `rgba(${p.colorRgb}, ${Math.min(1, alpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Phase 2 & Phase 3 (1.8s - 4.0s): Blast clouds, shockwave & sparks physics
      const blastElapsed = (now - blastStartTime) / 1000;
      const fadeDuration = 2.2 * earlyFactor;
      // Stay dense through 1.8s-2.4s, then smoothly clear toward 4.0s
      const fadeStart = 0.55 * earlyFactor;
      const fadeT = Math.max(0, Math.min(1, (blastElapsed - fadeStart) / (fadeDuration - fadeStart)));
      const globalFade = 1 - fadeT * fadeT * (3 - 2 * fadeT);

      // Shockwave ring (fast radial expansion in first 0.42s)
      if (shockwave && shockwave.alpha > 0.005) {
        shockwave.radius += (shockwave.maxRadius - shockwave.radius) * Math.min(1, dt * 8.5);
        shockwave.alpha *= Math.exp(-5.4 * dt);
        ctx.save();
        ctx.strokeStyle = `rgba(37, 99, 235, ${shockwave.alpha * 0.48})`;
        ctx.lineWidth = Math.max(1.5, 18 * shockwave.alpha);
        ctx.beginPath();
        ctx.arc(shockwave.x, shockwave.y, shockwave.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(124, 58, 237, ${shockwave.alpha * 0.34})`;
        ctx.lineWidth = Math.max(1, 8 * shockwave.alpha);
        ctx.beginPath();
        ctx.arc(shockwave.x, shockwave.y, shockwave.radius * 0.88, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Soft billowing dust/smoke clouds
      for (let i = 0; i < cloudParticles.length; i += 1) {
        const c = cloudParticles[i];
        c.turbPhase += c.turbSpeed * dt;
        const damp = Math.exp(-c.drag * dt);
        c.vx *= damp;
        c.vy = c.vy * damp + c.gravity * dt;

        c.x += (c.vx + Math.sin(c.turbPhase) * 26) * dt;
        c.y += (c.vy + Math.cos(c.turbPhase * 0.8) * 18) * dt;
        if (c.radius < c.maxRadius) {
          c.radius = Math.min(c.maxRadius, c.radius + c.growthRate * damp * dt);
        }

        const alpha = c.alpha * globalFade;
        if (alpha <= 0.008 || !c.sprite) continue;

        ctx.globalAlpha = alpha;
        const d = c.radius * 2;
        ctx.drawImage(c.sprite, c.x - c.radius, c.y - c.radius, d, d);
      }
      ctx.globalAlpha = 1;

      // Crisp sparks & fine dust grains (1px - 5px)
      for (let i = 0; i < sparkParticles.length; i += 1) {
        const s = sparkParticles[i];
        s.prevX = s.x;
        s.prevY = s.y;
        s.turbPhase += s.turbSpeed * dt;

        const damp = Math.exp(-s.drag * dt);
        s.vx *= damp;
        s.vy = s.vy * damp + s.gravity * dt;

        s.x += (s.vx + Math.sin(s.turbPhase) * s.turbAmp) * dt;
        s.y += (s.vy + Math.cos(s.turbPhase * 0.9) * (s.turbAmp * 0.65)) * dt;

        const alpha = s.alpha * globalFade;
        if (alpha <= 0.01) continue;

        const speedSq = s.vx * s.vx + s.vy * s.vy;
        if (blastElapsed < 0.34 && speedSq > 95000) {
          // Brief high-velocity spark streak during initial detonation wave
          ctx.strokeStyle = `rgba(${s.colorRgb}, ${alpha * 0.85})`;
          ctx.lineWidth = Math.max(1, s.radius * 0.85);
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(s.prevX, s.prevY);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
        } else if (s.shape === 1) {
          ctx.fillStyle = `rgba(${s.colorRgb}, ${alpha})`;
          const size = s.radius * 1.6;
          ctx.fillRect(s.x - size * 0.5, s.y - size * 0.5, size, size);
        } else {
          ctx.fillStyle = `rgba(${s.colorRgb}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    rafId = window.requestAnimationFrame(renderFrame);
  };

  if (ctx) {
    rafId = window.requestAnimationFrame(renderFrame);
  }

  const cleanupSplash = () => {
    if (finished) return;
    finished = true;
    window.clearTimeout(chargeTimer);
    window.clearTimeout(detonateTimer);
    window.clearTimeout(revealTimer);
    window.clearTimeout(heroTimer);
    window.clearTimeout(canvasFadeTimer);
    window.clearTimeout(finishTimer);
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
    window.removeEventListener('resize', setupCanvas);
    document.removeEventListener('keydown', onKeyDown);

    ambientParticles.length = 0;
    cloudParticles.length = 0;
    sparkParticles.length = 0;
    cloudSprites.length = 0;
    shockwave = null;

    splash.classList.add('is-hidden');
    if (splash.parentNode) splash.parentNode.removeChild(splash);
    document.documentElement.classList.remove('is-splash-active');
    document.body.classList.remove('is-splash-active');

    const rawHash = window.location.hash ? window.location.hash.slice(1) : '';
    const resolvedHash = rawHash === 'musica' ? 'discografia' : rawHash;
    const hashTarget =
      shouldPreserveExternalHash && resolvedHash ? document.getElementById(resolvedHash) : null;
    if (hashTarget) {
      hashTarget.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
    }

    document.body.classList.add('is-hero-ready');
    if (typeof revealVisibleNow === 'function') {
      revealVisibleNow();
    }
  };

  const onKeyDown = (e) => {
    if (!hasDetonated && (e.key === 'Escape' || e.key === 'Enter')) {
      triggerExplosion(true);
    }
  };

  splash.addEventListener('click', () => triggerExplosion(true));
  document.addEventListener('keydown', onKeyDown);

  // Phase 1 (0.0s - 1.8s): Firm centered logo + energy charge & vibration from 1.05s
  chargeTimer = window.setTimeout(() => {
    if (!hasDetonated && !finished) {
      isCharging = true;
      splash.classList.add('is-charging');
    }
  }, 1050);

  // Phase 2 (1.8s - 2.3s): Radial detonation & logo disintegration; Phase 3 (2.3s - 4.0s): Dust cloud clears to Hero
  detonateTimer = window.setTimeout(() => triggerExplosion(false), 1800);
}

/* ==========================================================================
   8c. Global Nocturnal Storm Canvas Engine (Rain, Branched Lightning & Scroll)
   ========================================================================== */

function initGlobalStorm() {
  const canvas = /** @type {HTMLCanvasElement | null} */ ($('#global-storm-canvas'));
  const hero = /** @type {HTMLElement | null} */ ($('#inicio'));
  const heroContent = /** @type {HTMLElement | null} */ ($('#inicio .hero-content'));
  const ctx = canvas ? canvas.getContext('2d') : null;
  if (!canvas || !ctx) return;

  const prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const WIND_ANGLE_RAD = (12 * Math.PI) / 180;
  const SIN_WIND = Math.sin(WIND_ANGLE_RAD);
  const COS_WIND = Math.cos(WIND_ANGLE_RAD);
  const PARALLAX_FACTORS = [0.18, 0.32, 0.48];

  let width = 0;
  let height = 0;
  let dpr = 1;
  let rafId = 0;
  let lastTime = performance.now();
  let lastScrollY = window.scrollY || window.pageYOffset || 0;
  let scrollSpeedBoost = 0;
  let pendingParallaxDelta = 0;
  let resizeTimer = 0;

  /** @type {Array<{ x: number; y: number; layer: number; length: number; width: number; speed: number; alphaMul: number; splashArmed: boolean }>} */
  const drops = [];

  /** @type {Array<{ x: number; y: number; radius: number; vx: number; vy: number; phase: number; phaseSpeed: number; baseAlpha: number; spriteIdx: number }>} */
  const mistParticles = [];

  /** @type {Array<{ x: number; y: number; radius: number; maxRadius: number; alpha: number; age: number; duration: number }>} */
  const splashes = [];

  /**
   * @type {{
   *   active: boolean;
   *   elapsed: number;
   *   duration: number;
   *   startX: number;
   *   startY: number;
   *   trunk: Array<{ x1: number; y1: number; x2: number; y2: number }>;
   *   branches: Array<Array<{ x1: number; y1: number; x2: number; y2: number }>>;
   * } | null}
   */
  let currentBolt = null;
  let nextBoltIn = 1800 + Math.random() * 1800;
  let lastFlashCssVal = '0';

  const setLightningCssPulse = (val) => {
    const nextVal = val > 0.01 ? val.toFixed(2) : '0';
    if (nextVal !== lastFlashCssVal) {
      lastFlashCssVal = nextVal;
      document.documentElement.style.setProperty('--lightning-flash', nextVal);
    }
  };

  const createMistSprite = (rgb) => {
    const size = 128;
    const off = document.createElement('canvas');
    off.width = size;
    off.height = size;
    const octx = off.getContext('2d');
    if (!octx) return off;
    const half = size * 0.5;
    const grad = octx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0, `rgba(${rgb}, 0.28)`);
    grad.addColorStop(0.45, `rgba(${rgb}, 0.11)`);
    grad.addColorStop(1, `rgba(${rgb}, 0)`);
    octx.fillStyle = grad;
    octx.fillRect(0, 0, size, size);
    return off;
  };

  const mistSprites = [createMistSprite('56, 189, 248'), createMistSprite('37, 99, 235')];

  const populateMist = () => {
    const targetMist = width < 768 ? 7 : 12;
    mistParticles.length = 0;
    for (let i = 0; i < targetMist; i += 1) {
      const baseRadius = width < 768 ? 110 + Math.random() * 90 : 170 + Math.random() * 155;
      mistParticles.push({
        x: Math.random() * (width + baseRadius * 2) - baseRadius,
        y: height * (0.58 + Math.random() * 0.42),
        radius: baseRadius,
        vx: -(10 + Math.random() * 16),
        vy: (Math.random() - 0.5) * 4,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.35 + Math.random() * 0.45,
        baseAlpha: 0.16 + Math.random() * 0.14,
        spriteIdx: i % mistSprites.length,
      });
    }
  };

  const createDrop = (randomY = true) => {
    const roll = Math.random();
    let layer = 0;
    let length = 11 + Math.random() * 7;
    let lineWidth = 0.65 + Math.random() * 0.25;
    let speed = 420 + Math.random() * 140;
    let alphaMul = 0.36;

    if (roll > 0.8) {
      layer = 2;
      length = 26 + Math.random() * 13;
      lineWidth = 1.3 + Math.random() * 0.4;
      speed = 820 + Math.random() * 240;
      alphaMul = 0.88;
    } else if (roll > 0.45) {
      layer = 1;
      length = 17 + Math.random() * 9;
      lineWidth = 0.95 + Math.random() * 0.32;
      speed = 590 + Math.random() * 170;
      alphaMul = 0.62;
    }

    const spanX = width + height * SIN_WIND + 80;
    return {
      x: Math.random() * spanX - 40,
      y: randomY ? Math.random() * height : -(10 + Math.random() * 90),
      layer,
      length,
      width: lineWidth,
      speed,
      alphaMul,
      splashArmed: layer >= 1 && Math.random() < 0.18,
    };
  };

  const populateDrops = () => {
    const targetCount = width < 768 ? 55 : 110;
    drops.length = 0;
    for (let i = 0; i < targetCount; i += 1) {
      drops.push(createDrop(true));
    }
    populateMist();
  };

  const subdivideSegment = (x1, y1, x2, y2, disp, depth, out) => {
    if (depth <= 0) {
      out.push({ x1, y1, x2, y2 });
      return;
    }
    const mx = (x1 + x2) * 0.5 + (Math.random() - 0.5) * disp;
    const my = (y1 + y2) * 0.5 + (Math.random() - 0.5) * disp * 0.35;
    subdivideSegment(x1, y1, mx, my, disp * 0.52, depth - 1, out);
    subdivideSegment(mx, my, x2, y2, disp * 0.52, depth - 1, out);
  };

  const spawnLightningBolt = () => {
    if (width <= 0 || height <= 0) return;

    const zoneRoll = Math.random();
    let startX;
    let endX;
    let endY;

    if (zoneRoll < 0.45) {
      // Left lateral background area
      startX = width * (0.04 + Math.random() * 0.2);
      endX = startX + (Math.random() - 0.35) * (width * 0.11);
      endY = height * (0.45 + Math.random() * 0.28);
    } else if (zoneRoll < 0.9) {
      // Right lateral background area
      startX = width * (0.76 + Math.random() * 0.2);
      endX = startX + (Math.random() - 0.65) * (width * 0.11);
      endY = height * (0.45 + Math.random() * 0.28);
    } else {
      // Upper sky arc
      startX = width * (0.34 + Math.random() * 0.32);
      endX = startX + (Math.random() - 0.5) * (width * 0.14);
      endY = height * (0.16 + Math.random() * 0.1);
    }

    const startY = Math.random() * (height * 0.05);
    /** @type {Array<{ x1: number; y1: number; x2: number; y2: number }>} */
    const trunk = [];
    subdivideSegment(startX, startY, endX, endY, Math.max(32, width * 0.05), 5, trunk);

    const branchCount = 2 + Math.floor(Math.random() * 3);
    /** @type {Array<Array<{ x1: number; y1: number; x2: number; y2: number }>>} */
    const branches = [];

    for (let i = 0; i < branchCount; i += 1) {
      const segIdx = Math.min(
        trunk.length - 1,
        Math.max(2, Math.floor(trunk.length * (0.18 + Math.random() * 0.55)))
      );
      const origin = trunk[segIdx];
      if (!origin) continue;

      const dir = Math.random() < 0.5 ? -1 : 1;
      const bLen = height * (0.11 + Math.random() * 0.15);
      const bx2 = origin.x1 + dir * (32 + Math.random() * Math.max(54, width * 0.085));
      const by2 = Math.min(height * 0.78, origin.y1 + bLen);
      /** @type {Array<{ x1: number; y1: number; x2: number; y2: number }>} */
      const branchSegs = [];
      subdivideSegment(origin.x1, origin.y1, bx2, by2, Math.max(16, width * 0.024), 3, branchSegs);
      branches.push(branchSegs);
    }

    currentBolt = {
      active: true,
      elapsed: 0,
      duration: 240,
      startX,
      startY,
      trunk,
      branches,
    };
  };

  const getLightningIntensity = (elapsedMs) => {
    if (elapsedMs < 0 || elapsedMs > 240) return 0;
    if (elapsedMs <= 45) return 1 - (elapsedMs / 45) * 0.18;
    if (elapsedMs <= 85) return 0.22;
    if (elapsedMs <= 135) return 0.94 - ((elapsedMs - 85) / 50) * 0.2;
    if (elapsedMs <= 180) return 0.55 * (1 - (elapsedMs - 135) / 45) + 0.12;
    return Math.max(0, 0.12 * (1 - (elapsedMs - 180) / 60));
  };

  const setupCanvas = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(320, window.innerWidth || document.documentElement.clientWidth);
    height = Math.max(420, window.innerHeight || document.documentElement.clientHeight);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    populateDrops();
  };

  const updateScrollDynamics = (dt) => {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const rawDelta = scrollY - lastScrollY;
    lastScrollY = scrollY;
    pendingParallaxDelta += rawDelta;

    if (dt > 0) {
      const instantBoost = Math.min(2.6, (Math.abs(rawDelta) / dt) / 680);
      const blend = Math.min(1, dt * (instantBoost > scrollSpeedBoost ? 14 : 4.5));
      scrollSpeedBoost += (instantBoost - scrollSpeedBoost) * blend;
    }

    if (hero && heroContent) {
      const heroHeight = hero.offsetHeight || height || 720;
      const clampedScroll = Math.max(0, Math.min(scrollY, heroHeight * 1.15));
      const fadeProgress = Math.min(1, clampedScroll / Math.max(260, heroHeight * 0.72));
      heroContent.style.transform = `translate3d(0, ${(clampedScroll * 0.16).toFixed(2)}px, 0)`;
      heroContent.style.opacity = String(Math.max(0, 1 - fadeProgress).toFixed(3));
    }
  };

  const drawFrame = (dt, animate = true) => {
    ctx.clearRect(0, 0, width, height);

    const frameParallaxDelta = pendingParallaxDelta;
    pendingParallaxDelta = 0;

    let activeLightningIntensity = 0;

    if (animate) {
      // Lightning schedule (every 4s - 7s across the full page)
      nextBoltIn -= dt * 1000;
      if (nextBoltIn <= 0 && !currentBolt) {
        spawnLightningBolt();
        nextBoltIn = 4000 + Math.random() * 3000;
      }

      if (currentBolt && currentBolt.active) {
        currentBolt.elapsed += dt * 1000;
        const intensity = getLightningIntensity(currentBolt.elapsed);
        activeLightningIntensity = intensity;

        if (intensity > 0.01) {
          const glowRadius = Math.max(width, height) * 0.56;
          const glowY = currentBolt.startY + height * 0.12;
          const skyGlow = ctx.createRadialGradient(
            currentBolt.startX,
            glowY,
            0,
            currentBolt.startX,
            glowY,
            glowRadius
          );
          skyGlow.addColorStop(0, `rgba(37, 99, 235, ${(0.12 * intensity).toFixed(3)})`);
          skyGlow.addColorStop(0.55, `rgba(56, 189, 248, ${(0.045 * intensity).toFixed(3)})`);
          skyGlow.addColorStop(1, 'rgba(37, 99, 235, 0)');
          ctx.fillStyle = skyGlow;
          ctx.fillRect(0, 0, width, height);

          ctx.save();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          ctx.strokeStyle = `rgba(56, 189, 248, ${(0.76 * intensity).toFixed(3)})`;
          ctx.lineWidth = 1.05;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#2563EB';
          ctx.beginPath();
          for (let b = 0; b < currentBolt.branches.length; b += 1) {
            const branch = currentBolt.branches[b];
            for (let s = 0; s < branch.length; s += 1) {
              const seg = branch[s];
              ctx.moveTo(seg.x1, seg.y1);
              ctx.lineTo(seg.x2, seg.y2);
            }
          }
          ctx.stroke();

          ctx.strokeStyle = `rgba(224, 242, 254, ${Math.min(1, intensity * 0.98).toFixed(3)})`;
          ctx.lineWidth = 2.05;
          ctx.shadowBlur = 18;
          ctx.shadowColor = '#2563EB';
          ctx.beginPath();
          for (let s = 0; s < currentBolt.trunk.length; s += 1) {
            const seg = currentBolt.trunk[s];
            ctx.moveTo(seg.x1, seg.y1);
            ctx.lineTo(seg.x2, seg.y2);
          }
          ctx.stroke();
          ctx.restore();
        }

        if (currentBolt.elapsed >= currentBolt.duration) {
          currentBolt = null;
        }
      }
    }

    setLightningCssPulse(activeLightningIntensity);

    // Drifting blue horizon mist/haze particles
    for (let i = 0; i < mistParticles.length; i += 1) {
      const m = mistParticles[i];
      if (animate) {
        m.phase += m.phaseSpeed * dt;
        m.x += (m.vx - scrollSpeedBoost * 16) * dt;
        m.y += Math.sin(m.phase) * 5 * dt + m.vy * dt;
        if (frameParallaxDelta !== 0) {
          m.y -= frameParallaxDelta * 0.08;
        }
        if (m.x + m.radius < -20) {
          m.x = width + m.radius + 20;
        }
        const minBandY = height * 0.54;
        const maxBandY = height * 1.04;
        if (m.y < minBandY) m.y = maxBandY;
        if (m.y > maxBandY) m.y = minBandY;
      }

      const sprite = mistSprites[m.spriteIdx];
      const pulse = 0.72 + Math.sin(m.phase) * 0.28 + activeLightningIntensity * 0.25;
      ctx.save();
      ctx.globalAlpha = Math.min(0.45, m.baseAlpha * pulse);
      ctx.drawImage(sprite, m.x - m.radius, m.y - m.radius * 0.62, m.radius * 2, m.radius * 1.24);
      ctx.restore();
    }

    // Diagonal 12deg Rain Drops with continuous depth-scaled scroll parallax
    const speedMultiplier = 1 + scrollSpeedBoost;
    const totalWrapHeight = height + 48;
    ctx.lineCap = 'round';

    for (let i = 0; i < drops.length; i += 1) {
      const d = drops[i];
      if (animate) {
        const travel = d.speed * speedMultiplier * dt;
        d.x -= travel * SIN_WIND;
        d.y += travel * COS_WIND;

        if (frameParallaxDelta !== 0) {
          d.y -= frameParallaxDelta * PARALLAX_FACTORS[d.layer];
          if (d.y < -36) {
            d.y = ((d.y + 36) % totalWrapHeight + totalWrapHeight) % totalWrapHeight - 36;
          }
        }

        const splashLine = height - 38 - (i % 5) * 14;
        if (d.splashArmed && d.y >= splashLine) {
          d.splashArmed = false;
          splashes.push({
            x: d.x,
            y: splashLine,
            radius: 1.4,
            maxRadius: 5.5 + Math.random() * 4.5,
            alpha: 0.34,
            age: 0,
            duration: 0.24 + Math.random() * 0.12,
          });
        }

        if (d.y - d.length > height + 12 || d.x < -60) {
          const reset = createDrop(false);
          d.x = reset.x;
          d.y = reset.y;
          d.splashArmed = reset.splashArmed;
        }
      }

      const tailX = d.x + d.length * SIN_WIND;
      const tailY = d.y - d.length * COS_WIND;

      const grad = ctx.createLinearGradient(d.x, d.y, tailX, tailY);
      grad.addColorStop(0, `rgba(56, 189, 248, ${(0.42 * d.alphaMul).toFixed(3)})`);
      grad.addColorStop(1, `rgba(37, 99, 235, ${(0.08 * d.alphaMul).toFixed(3)})`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = d.width;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
    }

    for (let i = splashes.length - 1; i >= 0; i -= 1) {
      const sp = splashes[i];
      sp.age += dt;
      if (sp.age >= sp.duration) {
        splashes.splice(i, 1);
        continue;
      }
      const p = sp.age / sp.duration;
      const r = sp.radius + (sp.maxRadius - sp.radius) * p;
      const alpha = sp.alpha * (1 - p);

      ctx.strokeStyle = `rgba(56, 189, 248, ${alpha.toFixed(3)})`;
      ctx.lineWidth = 0.85;
      ctx.beginPath();
      ctx.ellipse(sp.x, sp.y, r, r * 0.42, 0, 0, Math.PI * 2);
      ctx.stroke();

      if (p < 0.38) {
        ctx.fillStyle = `rgba(56, 189, 248, ${(alpha * 1.05).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, 1.15, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const renderLoop = (now) => {
    if (document.visibilityState === 'hidden' || document.hidden) {
      rafId = 0;
      return;
    }
    const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
    lastTime = now;

    updateScrollDynamics(dt);
    drawFrame(dt, true);

    rafId = window.requestAnimationFrame(renderLoop);
  };

  const startLoop = () => {
    if (prefersReducedMotion || rafId || document.visibilityState === 'hidden' || document.hidden) return;
    lastTime = performance.now();
    rafId = window.requestAnimationFrame(renderLoop);
  };

  const stopLoop = () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
  };

  setupCanvas();

  if (prefersReducedMotion) {
    drawFrame(0, false);
    window.addEventListener(
      'scroll',
      () => updateScrollDynamics(0),
      { passive: true }
    );
  } else {
    startLoop();
  }

  window.addEventListener(
    'resize',
    () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setupCanvas();
        if (prefersReducedMotion) {
          drawFrame(0, false);
        }
      }, 150);
    },
    { passive: true }
  );

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' || document.hidden) {
      stopLoop();
      setLightningCssPulse(0);
    } else {
      startLoop();
    }
  });
}

/* ==========================================================================
   8d. Scroll Reveal Choreography & Blurred Cursor Atmospheric Orb (60fps GPU)
   ========================================================================== */

let refreshGalleryReveal = () => {};
let revealVisibleNow = () => {};

function initCursorAtmosphere() {
  const prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsHoverPointer =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (prefersReducedMotion || !supportsHoverPointer) return;

  const orb = document.createElement('div');
  orb.className = 'cursor-atmosphere';
  orb.setAttribute('aria-hidden', 'true');
  document.body.appendChild(orb);

  const HALF_SIZE = 260;
  let targetX = window.innerWidth * 0.5;
  let targetY = window.innerHeight * 0.5;
  let currentX = targetX;
  let currentY = targetY;
  let hasMoved = false;
  let isVisible = false;
  let rafId = 0;
  let lastFrame = performance.now();

  const step = (now) => {
    const dt = Math.min(0.05, Math.max(0.001, (now - lastFrame) / 1000));
    lastFrame = now;

    const ease = 1 - Math.exp(-5.5 * dt);
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;

    orb.style.transform = `translate3d(${(currentX - HALF_SIZE).toFixed(1)}px, ${(currentY - HALF_SIZE).toFixed(1)}px, 0)`;

    if (Math.abs(targetX - currentX) < 0.25 && Math.abs(targetY - currentY) < 0.25) {
      currentX = targetX;
      currentY = targetY;
      orb.style.transform = `translate3d(${(currentX - HALF_SIZE).toFixed(1)}px, ${(currentY - HALF_SIZE).toFixed(1)}px, 0)`;
      rafId = 0;
      return;
    }

    rafId = window.requestAnimationFrame(step);
  };

  const ensureLoop = () => {
    if (!rafId) {
      lastFrame = performance.now();
      rafId = window.requestAnimationFrame(step);
    }
  };

  document.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      targetX = e.clientX;
      targetY = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        currentX = targetX;
        currentY = targetY;
        orb.style.transform = `translate3d(${(currentX - HALF_SIZE).toFixed(1)}px, ${(currentY - HALF_SIZE).toFixed(1)}px, 0)`;
      }
      if (!isVisible) {
        isVisible = true;
        orb.style.opacity = '1';
      }
      ensureLoop();
    },
    { passive: true }
  );

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    orb.style.opacity = '0';
  });

  window.addEventListener('blur', () => {
    isVisible = false;
    orb.style.opacity = '0';
  });
}

function initScrollReveal() {
  const prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || typeof window.IntersectionObserver !== 'function') {
    $$('.reveal-title, .reveal-card').forEach((el) => {
      el.classList.add('is-visible', 'is-settled');
    });
    return;
  }

  document.documentElement.classList.add('reveal-ready');

  const markRevealTitle = (el, delayMs = 0) => {
    if (!el || el.classList.contains('is-visible')) return;
    el.classList.add('reveal-title');
    if (el instanceof HTMLElement) {
      el.style.setProperty('--reveal-delay', `${delayMs}ms`);
    }
  };

  const markRevealCard = (el, fallbackDelayMs = 0) => {
    if (!el || el.classList.contains('is-visible')) return;
    el.classList.add('reveal-card');
    if (el instanceof HTMLElement) {
      el.dataset.revealFallback = String(fallbackDelayMs);
      el.style.setProperty('--reveal-delay', `${fallbackDelayMs}ms`);
    }
  };

  // Títulos y encabezados de sección (mismo desenfoque + elevación del Hero)
  $$('.section-header, .legal-doc-heading-group, .legal-clause-header').forEach((el) => {
    markRevealTitle(el, 0);
  });

  // Biografía: tarjeta, párrafos y retrato editorial
  $$('.bio-editorial-card').forEach((el) => markRevealCard(el, 0));
  $$('.bio-narrative .story-lead, .bio-narrative .story-body').forEach((el, idx) => {
    markRevealTitle(el, (idx + 1) * 80);
  });
  $$('.story-visuals .story-card').forEach((el) => markRevealCard(el, 120));

  // Especialidades
  $$('.specialties-grid .specialty-card').forEach((el, idx) => markRevealCard(el, idx * 90));

  // Música: los 4 temas con vídeo y tarjeta Spotify
  $$('.music-video-grid .video-feature-card').forEach((el, idx) => markRevealCard(el, idx * 90));
  $$('.spotify-player-card').forEach((el) => markRevealCard(el, 90));

  // Galería: controles de filtro (los items se observan en refreshGalleryReveal)
  $$('#galeria .filter-group').forEach((el) => markRevealTitle(el, 60));

  // Contacto y formulario
  $$('.contact-info .eyebrow, .contact-info .section-title, .contact-info .contact-lead').forEach(
    (el, idx) => markRevealTitle(el, idx * 70)
  );
  $$('.contact-details .detail-row').forEach((el, idx) => markRevealCard(el, idx * 80));
  $$('.contact-form-wrap').forEach((el) => markRevealCard(el, 90));

  // Footer
  $$('.footer-grid .footer-col').forEach((el, idx) => markRevealCard(el, idx * 90));
  $$('.footer-bottom').forEach((el) => markRevealTitle(el, 60));

  // Página Legal (legal.html): cabecera, metadatos, barra de herramientas, barra lateral, cláusulas y párrafos/tablas
  $$('.legal-doc-banner-card, .legal-sidebar-card').forEach((el, idx) => markRevealCard(el, idx * 80));
  $$('.legal-meta-strip > div').forEach((el, idx) => markRevealTitle(el, idx * 60));
  $$('.legal-toolbar').forEach((el) => markRevealTitle(el, 100));
  $$('.legal-clause').forEach((el, idx) => markRevealCard(el, Math.min(idx, 2) * 80));
  $$(
    '.legal-clause h3, .legal-clause > p, .legal-clause .legal-list, .legal-clause .legal-table-wrap, .legal-clause .legal-cookie-cta-row'
  ).forEach((el) => markRevealTitle(el, 40));

  const revealEl = (el, delayMs) => {
    if (el.classList.contains('is-visible')) return;
    if (el instanceof HTMLElement) {
      el.style.setProperty('--reveal-delay', `${delayMs}ms`);
    }
    el.classList.add('is-visible');
    window.setTimeout(() => {
      el.classList.add('is-settled');
    }, delayMs + 780);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      let batchCardIndex = 0;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        observer.unobserve(target);

        if (target.classList.contains('reveal-card')) {
          const delayMs = Math.min(batchCardIndex, 4) * 90;
          batchCardIndex += 1;
          revealEl(target, delayMs);
        } else {
          const rawDelay =
            target instanceof HTMLElement ? target.style.getPropertyValue('--reveal-delay') : '0ms';
          const parsedDelay = Number.parseInt(rawDelay, 10) || 0;
          revealEl(target, parsedDelay);
        }
      });
    },
    {
      threshold: 0.01,
      rootMargin: '0px 0px 24px 0px',
    }
  );

  $$('.reveal-title, .reveal-card').forEach((el) => observer.observe(el));

  revealVisibleNow = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const docHeight = document.documentElement.scrollHeight;
    const nearBottom = scrollY + vh >= docHeight - 48;

    $$('.reveal-title:not(.is-visible), .reveal-card:not(.is-visible)').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (nearBottom || rect.top <= vh + 24) {
        observer.unobserve(el);
        const rawDelay =
          el instanceof HTMLElement ? el.style.getPropertyValue('--reveal-delay') : '0ms';
        const parsedDelay = Number.parseInt(rawDelay, 10) || 0;
        revealEl(el, el.classList.contains('reveal-card') ? Math.min(parsedDelay, 180) : parsedDelay);
      }
    });
  };

  let scrollCheckRaf = 0;
  window.addEventListener(
    'scroll',
    () => {
      if (scrollCheckRaf) return;
      scrollCheckRaf = window.requestAnimationFrame(() => {
        scrollCheckRaf = 0;
        revealVisibleNow();
      });
    },
    { passive: true }
  );

  window.setTimeout(revealVisibleNow, 180);

  refreshGalleryReveal = () => {
    const items = $$('#gallery-grid .gallery-item');
    items.forEach((item, idx) => {
      markRevealCard(item, (idx % 4) * 90);
      observer.observe(item);
    });
    revealVisibleNow();
  };

  refreshGalleryReveal();
}

/* ==========================================================================
   9. GDPR Cookie Consent & Preferences Modal
   ========================================================================== */

function closeDialogEl(dlg) {
  if (!dlg) return;
  if (typeof dlg.close === 'function') {
    dlg.close();
  } else {
    dlg.removeAttribute('open');
  }
}

function openDialogEl(dlg) {
  if (!dlg) return;
  if (typeof dlg.showModal === 'function') {
    dlg.showModal();
  } else {
    dlg.setAttribute('open', '');
  }
}

function loadSavedCookieConsent() {
  try {
    const raw = window.localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      state.consent = {
        necessary: true,
        preferences: Boolean(parsed.preferences),
        media: Boolean(parsed.media),
        hasChoice: true,
      };
    }
  } catch {
    // Storage unavailable or malformed
  }
}

function syncFabCookieOffset() {
  const banner = $('#cookie-banner');
  const root = document.documentElement;
  const isBannerVisible = Boolean(banner && !banner.hidden);
  document.body.classList.toggle('has-cookie-banner', isBannerVisible);
  if (!root) return;
  if (isBannerVisible && banner) {
    const h = banner.getBoundingClientRect().height;
    root.style.setProperty('--fab-bottom-offset', `${Math.ceil(h) + 20}px`);
  } else {
    root.style.setProperty('--fab-bottom-offset', 'clamp(1rem, 3vw, 1.5rem)');
  }
}

function persistCookieConsent(media) {
  state.consent = {
    necessary: true,
    preferences: true,
    media: Boolean(media),
    hasChoice: true,
  };

  try {
    window.localStorage.setItem(
      COOKIE_STORAGE_KEY,
      JSON.stringify({
        necessary: true,
        preferences: true,
        media: state.consent.media,
        updatedAt: new Date().toISOString(),
      })
    );
    window.localStorage.setItem(LANG_STORAGE_KEY, state.lang);
  } catch {
    // Storage unavailable
  }

  const banner = $('#cookie-banner');
  if (banner) banner.hidden = true;
  syncFabCookieOffset();

  if (state.consent.media) {
    openSpotifyPlayerCard({ pauseMusic: false });
  }
}

function initModals() {
  // Floating GDPR Cookie Banner & Preferences Modal
  const cookieBanner = $('#cookie-banner');
  const cookiePrefsDialog = /** @type {HTMLDialogElement | null} */ ($('#cookie-prefs-dialog'));
  const cookiePrefsClose = $('#cookie-prefs-close');
  const prefMediaToggle = /** @type {HTMLInputElement | null} */ ($('#pref-media-toggle'));

  if (cookieBanner && !state.consent.hasChoice) {
    cookieBanner.hidden = false;
  }
  syncFabCookieOffset();
  window.addEventListener('resize', syncFabCookieOffset, { passive: true });
  if (cookieBanner && typeof ResizeObserver === 'function') {
    const cookieObserver = new ResizeObserver(syncFabCookieOffset);
    cookieObserver.observe(cookieBanner);
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncFabCookieOffset).catch(() => {});
  }

  const openCookiePreferences = () => {
    if (prefMediaToggle) prefMediaToggle.checked = state.consent.media;
    openDialogEl(cookiePrefsDialog);
  };

  const acceptBtn = $('#cookie-accept-btn');
  const rejectBtn = $('#cookie-reject-btn');
  const configureBtn = $('#cookie-prefs-btn');
  const footerPrefsBtn = $('#open-cookie-prefs-btn');
  const floatingCookieBtn = $('#floating-cookie-btn');
  const legalCookieBtn = $('#legal-open-cookie-prefs');
  const legalReopenCookieBtn = $('#legal-reopen-cookie-btn');

  if (acceptBtn) acceptBtn.addEventListener('click', () => persistCookieConsent(true));
  if (rejectBtn) rejectBtn.addEventListener('click', () => persistCookieConsent(false));
  if (configureBtn) configureBtn.addEventListener('click', openCookiePreferences);
  if (footerPrefsBtn) footerPrefsBtn.addEventListener('click', openCookiePreferences);
  if (floatingCookieBtn) floatingCookieBtn.addEventListener('click', openCookiePreferences);
  if (legalCookieBtn) legalCookieBtn.addEventListener('click', openCookiePreferences);
  if (legalReopenCookieBtn) legalReopenCookieBtn.addEventListener('click', openCookiePreferences);

  try {
    if (new URLSearchParams(window.location.search).get('cookies') === '1') {
      openCookiePreferences();
    }
  } catch {
    // Ignore URL parsing issues
  }

  const prefsSaveBtn = $('#prefs-save-btn');
  const prefsAcceptAllBtn = $('#prefs-accept-all-btn');
  const prefsRejectBtn = $('#prefs-reject-btn');

  if (prefsSaveBtn) {
    prefsSaveBtn.addEventListener('click', () => {
      persistCookieConsent(prefMediaToggle ? prefMediaToggle.checked : false);
      closeDialogEl(cookiePrefsDialog);
    });
  }

  if (prefsAcceptAllBtn) {
    prefsAcceptAllBtn.addEventListener('click', () => {
      persistCookieConsent(true);
      closeDialogEl(cookiePrefsDialog);
    });
  }

  if (prefsRejectBtn) {
    prefsRejectBtn.addEventListener('click', () => {
      persistCookieConsent(false);
      closeDialogEl(cookiePrefsDialog);
    });
  }

  if (cookiePrefsDialog) {
    if (cookiePrefsClose) {
      cookiePrefsClose.addEventListener('click', () => closeDialogEl(cookiePrefsDialog));
    }
    cookiePrefsDialog.addEventListener('click', (e) => {
      if (e.target === cookiePrefsDialog) closeDialogEl(cookiePrefsDialog);
    });
  }
}

/* ==========================================================================
   10. Anti-Spam & Strict Contact Form Validation (ES6+)
   ========================================================================== */

function initContactForm() {
  const form = /** @type {HTMLFormElement | null} */ ($('#contact-form'));
  if (!form) return;

  const nameInput = /** @type {HTMLInputElement | null} */ ($('#contact-name'));
  const emailInput = /** @type {HTMLInputElement | null} */ ($('#contact-email'));
  const phoneInput = /** @type {HTMLInputElement | null} */ ($('#contact-phone'));
  const typeSelect = /** @type {HTMLSelectElement | null} */ ($('#contact-type'));
  const messageInput = /** @type {HTMLTextAreaElement | null} */ ($('#contact-message'));
  const privacyInput = /** @type {HTMLInputElement | null} */ ($('#contact-privacy'));
  const honeypotInput = /** @type {HTMLInputElement | null} */ ($('#website_url'));
  const feedbackEl = $('#form-feedback');

  if (!nameInput || !emailInput || !phoneInput || !typeSelect || !messageInput || !privacyInput) {
    return;
  }

  const formLoadedAt = Date.now();
  const MIN_FILL_TIME_MS = 3000;
  const COOLDOWN_KEY = 'rafa930_contact_cooldown';
  const COOLDOWN_MS = 60000;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^[+\d\s()-]{7,20}$/;
  const suspiciousUrlRegex = /(https?:\/\/|www\.|bit\.ly\/|tinyurl\.|t\.me\/|[a-z0-9-]+\.(ru|cn|tk|top|xyz|click|link)\b)/i;

  const disposableEmailDomains = new Set([
    'test.com', 'ejemplo.com', 'mailinator.com', 'tempmail.com', 'example.com',
    'fakeemail.com', 'trashmail.com', '10minutemail.com', 'guerrillamail.com'
  ]);

  const spamPhoneSequences = new Set([
    '000000000', '111111111', '123456789', '999999999', '12345678', '0123456789'
  ]);

  const setError = (field, errId, msg) => {
    const errEl = $(`#${errId}`);
    if (msg) {
      field.setAttribute('aria-invalid', 'true');
      if (errEl) errEl.textContent = msg;
    } else {
      field.removeAttribute('aria-invalid');
      if (errEl) errEl.textContent = '';
    }
  };

  const showFeedbackNotice = (msg, isError) => {
    if (!feedbackEl) return;
    feedbackEl.hidden = false;
    feedbackEl.className = `form-feedback ${isError ? 'is-error' : 'is-success'}`;
    feedbackEl.textContent = '';
    feedbackEl.appendChild(createEl('p', 'feedback-msg', msg));
  };

  const fieldPairs = [
    [nameInput, 'err-name'],
    [emailInput, 'err-email'],
    [phoneInput, 'err-phone'],
    [messageInput, 'err-message'],
  ];

  fieldPairs.forEach(([field, errId]) => {
    field.addEventListener('input', () => setError(field, errId, ''));
  });

  privacyInput.addEventListener('change', () => {
    if (privacyInput.checked) {
      setError(privacyInput, 'err-privacy', '');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (honeypotInput && honeypotInput.value.trim() !== '') {
      return;
    }

    const dict = I18N[state.lang] || I18N.es;

    if (Date.now() - formLoadedAt < MIN_FILL_TIME_MS) {
      showFeedbackNotice(dict.errBotFast || 'Por seguridad, espera unos segundos antes de enviar la solicitud.', true);
      return;
    }

    try {
      const lastSentRaw = window.sessionStorage.getItem(COOLDOWN_KEY);
      if (lastSentRaw) {
        const elapsed = Date.now() - Number(lastSentRaw);
        if (Number.isFinite(elapsed) && elapsed < COOLDOWN_MS) {
          const secsLeft = Math.max(1, Math.ceil((COOLDOWN_MS - elapsed) / 1000));
          showFeedbackNotice(dict.errCooldownTpl ? dict.errCooldownTpl.replace('{s}', String(secsLeft)) : `Espera ${secsLeft}s.`, true);
          return;
        }
      }
    } catch {
      // sessionStorage unavailable
    }

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim().toLowerCase();
    const phoneVal = phoneInput.value.trim();
    const phoneDigits = phoneVal.replace(/\D/g, '');
    const msgVal = messageInput.value.trim();
    const privacyOk = privacyInput.checked;

    const repeatedDigitsRegex = /^(\d)\1+$/;
    const repeatedCharsRegex = /(.)\1{4,}/;
    let hasError = false;

    if (nameVal.length < 2 || /^\d+$/.test(nameVal) || repeatedCharsRegex.test(nameVal)) {
      setError(nameInput, 'err-name', dict.errName);
      hasError = true;
    } else {
      setError(nameInput, 'err-name', '');
    }

    const emailDomain = emailVal.split('@')[1] || '';
    if (!emailRegex.test(emailVal) || disposableEmailDomains.has(emailDomain)) {
      setError(emailInput, 'err-email', dict.errEmail || 'Introduce un correo electrónico válido.');
      hasError = true;
    } else {
      setError(emailInput, 'err-email', '');
    }

    if (
      !phoneRegex.test(phoneVal) ||
      phoneDigits.length < 7 ||
      spamPhoneSequences.has(phoneDigits) ||
      repeatedDigitsRegex.test(phoneDigits)
    ) {
      setError(phoneInput, 'err-phone', dict.errPhone || 'Introduce un teléfono o WhatsApp válido.');
      hasError = true;
    } else {
      setError(phoneInput, 'err-phone', '');
    }

    if (msgVal.length < 15) {
      setError(messageInput, 'err-message', dict.errMessage);
      hasError = true;
    } else if (suspiciousUrlRegex.test(msgVal)) {
      setError(messageInput, 'err-message', dict.errMessageLinks);
      hasError = true;
    } else {
      setError(messageInput, 'err-message', '');
    }

    if (!privacyOk) {
      const errPriv = $('#err-privacy');
      privacyInput.setAttribute('aria-invalid', 'true');
      if (errPriv) errPriv.textContent = dict.errPrivacy;
      if (!hasError) privacyInput.focus();
      hasError = true;
    } else {
      const errPriv = $('#err-privacy');
      privacyInput.removeAttribute('aria-invalid');
      if (errPriv) errPriv.textContent = '';
    }

    if (hasError || !feedbackEl) return;

    try {
      window.sessionStorage.setItem(COOLDOWN_KEY, String(Date.now()));
    } catch {
      // sessionStorage unavailable
    }

    const subject = encodeURIComponent(`[RAFA 930 · ${typeSelect.value.toUpperCase()}] ${nameVal}`);
    const body = encodeURIComponent(
      `Nombre: ${nameVal}\nEmail: ${emailVal}\nTeléfono: ${phoneVal}\nConsulta: ${typeSelect.value}\n\nMensaje:\n${msgVal}`
    );
    const mailtoHref = `mailto:rafa.930music@gmail.com?subject=${subject}&body=${body}`;
    const waHref = `https://wa.me/34671591814?text=${encodeURIComponent(
      `Hola RAFA 930, soy ${nameVal} (${emailVal} / ${phoneVal}). Consulta: ${typeSelect.value}. ${msgVal}`
    )}`;

    feedbackEl.hidden = false;
    feedbackEl.className = 'form-feedback is-success';
    feedbackEl.textContent = '';

    const p = createEl('p', 'feedback-msg', dict.formSuccess);
    const linksWrap = createEl('div', 'feedback-actions');

    const mailBtn = createEl('a', 'btn btn-primary btn-sm', 'Email');
    mailBtn.href = mailtoHref;

    const waBtn = createEl('a', 'btn btn-secondary btn-sm', 'WhatsApp');
    waBtn.href = waHref;
    waBtn.target = '_blank';
    waBtn.rel = 'noopener noreferrer';

    linksWrap.append(mailBtn, waBtn);
    feedbackEl.append(p, linksWrap);
    form.reset();
  });
}

function initCopyEmailButton() {
  const copyBtn = $('#copy-email-btn');
  const statusEl = $('#copy-email-status');
  if (!copyBtn) return;

  const OFFICIAL_EMAIL = 'rafa.930music@gmail.com';
  let resetTimer = 0;

  copyBtn.addEventListener('click', async () => {
    const dict = I18N[state.lang] || I18N.es;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(OFFICIAL_EMAIL);
      } else {
        const area = document.createElement('textarea');
        area.value = OFFICIAL_EMAIL;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        document.body.removeChild(area);
      }

      copyBtn.classList.add('is-copied');
      if (statusEl) {
        statusEl.textContent = dict.copyEmailCopied || 'Correo copiado al portapapeles';
      }

      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        copyBtn.classList.remove('is-copied');
        if (statusEl) statusEl.textContent = '';
      }, 2400);
    } catch {
      if (statusEl) {
        statusEl.textContent = OFFICIAL_EMAIL;
      }
    }
  });
}

/* ==========================================================================
   13. Filter Bindings & Bootstrap
   ========================================================================== */

function initFilters() {
  $$('[data-gal-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.galleryFilter = btn.getAttribute('data-gal-filter') || 'all';
      $$('[data-gal-filter]').forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      renderGallery();
    });
  });

  $$('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang) applyLanguage(lang);
    });
  });
}

/* ==========================================================================
   14. Header Progressive Reading Bar & Floating Action Buttons
   ========================================================================== */

function initScrollAndFloatingActions() {
  const progressFill = $('#header-scroll-progress-fill');
  const scrollTopBtn = $('#fab-scroll-top');
  const quickToggle = $('#fab-quick-toggle');
  const fabMenu = $('#fab-menu');
  const fabWrap = $('#floating-actions');

  let ticking = false;
  const updateScrollUI = () => {
    ticking = false;
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;

    if (progressFill) {
      progressFill.style.width = `${pct.toFixed(2)}%`;
    }
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('is-visible', scrollY > 340);
    }
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScrollUI);
      }
    },
    { passive: true }
  );
  updateScrollUI();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (quickToggle && fabMenu) {
    const closeFabMenu = () => {
      fabMenu.hidden = true;
      quickToggle.setAttribute('aria-expanded', 'false');
      quickToggle.classList.remove('is-open');
    };

    quickToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = fabMenu.hidden;
      fabMenu.hidden = !willOpen;
      quickToggle.setAttribute('aria-expanded', String(willOpen));
      quickToggle.classList.toggle('is-open', willOpen);
    });

    $$('.fab-menu-item').forEach((item) => {
      item.addEventListener('click', closeFabMenu);
    });

    document.addEventListener('click', (e) => {
      if (!fabMenu.hidden && fabWrap && !fabWrap.contains(/** @type {Node} */ (e.target))) {
        closeFabMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !fabMenu.hidden) {
        closeFabMenu();
        quickToggle.focus();
      }
    });
  }
}

/* ==========================================================================
   15. Dedicated Legal Center Page Tools (Print/PDF, TXT Export, Copy & TOC)
   ========================================================================== */

function initLegalPage() {
  const docEl = $('#legal-document-content');
  if (!docEl) return;

  const printBtn = $('#legal-print-btn');
  const downloadTxtBtn = $('#legal-download-txt-btn');
  const copyBtn = $('#legal-copy-btn');
  const copyLabel = $('#legal-copy-label');
  const statusEl = $('#legal-export-status');
  const tocLinks = $$('.legal-toc-link');
  const clauses = $$('.legal-clause[id]');

  const buildPlainLegalText = () => {
    const lines = [
      '========================================================================',
      'CENTRO LEGAL, PRIVACIDAD Y POLÍTICA DE COOKIES — RAFA 930 (https://rafa930.com)',
      'Titular / Responsable: Rafael Moreno Román (RAFA 930)',
      'Ubicación: Mataró / Sant Adrià de Besòs (08930), provincia de Barcelona, España',
      'Sitio web: https://rafa930.com | Correo de contacto: rafa.930music@gmail.com',
      'Normativa aplicable: Ley 34/2002 (LSSI-CE), RGPD (UE) 2016/679, LOPDGDD 3/2018',
      '========================================================================',
      '',
    ];

    clauses.forEach((clause) => {
      const children = clause.querySelectorAll('h2, h3, p, li, tr');
      children.forEach((node) => {
        const tag = node.tagName;
        if (tag === 'H2') {
          lines.push('');
          lines.push('------------------------------------------------------------------------');
          lines.push(node.textContent.trim().toUpperCase());
          lines.push('------------------------------------------------------------------------');
        } else if (tag === 'H3') {
          lines.push('');
          lines.push(node.textContent.trim());
        } else if (tag === 'LI') {
          lines.push(`  • ${node.textContent.replace(/\s+/g, ' ').trim()}`);
        } else if (tag === 'TR') {
          const cells = Array.from(node.querySelectorAll('th, td'))
            .map((c) => c.textContent.replace(/\s+/g, ' ').trim())
            .join(' | ');
          if (cells) lines.push(`  ${cells}`);
        } else {
          const txt = node.textContent.replace(/\s+/g, ' ').trim();
          if (txt) lines.push(txt);
        }
      });
      lines.push('');
    });

    return lines.join('\n');
  };

  const setExportStatus = (msg) => {
    if (!statusEl) return;
    statusEl.textContent = msg;
    setTimeout(() => {
      if (statusEl.textContent === msg) statusEl.textContent = '';
    }, 4000);
  };

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (downloadTxtBtn) {
    downloadTxtBtn.addEventListener('click', () => {
      const content = buildPlainLegalText();
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'rafa930-documentacion-legal-rgpd-lssi.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setExportStatus('Archivo .TXT descargado correctamente.');
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const content = buildPlainLegalText();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(content);
        } else {
          const area = document.createElement('textarea');
          area.value = content;
          area.setAttribute('readonly', '');
          area.style.position = 'fixed';
          area.style.opacity = '0';
          document.body.appendChild(area);
          area.select();
          document.execCommand('copy');
          document.body.removeChild(area);
        }
        copyBtn.classList.add('is-copied');
        if (copyLabel) {
          copyLabel.textContent = 'Texto copiado';
          setTimeout(() => {
            copyLabel.textContent = 'Copiar texto legal';
            copyBtn.classList.remove('is-copied');
          }, 2600);
        }
        setExportStatus('Texto legal copiado al portapapeles.');
      } catch {
        setExportStatus('No se pudo acceder al portapapeles en este navegador.');
      }
    });
  }

  if (tocLinks.length > 0 && clauses.length > 0) {
    const setActiveToc = (id) => {
      tocLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('data-legal-nav') === id);
      });
    };

    tocLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const target = link.getAttribute('data-legal-nav');
        if (target) setActiveToc(target);
      });
    });

    const syncLegalToc = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      if (scrollY <= 120) {
        setActiveToc(clauses[0].id);
        return;
      }
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 24) {
        setActiveToc(clauses[clauses.length - 1].id);
        return;
      }
      let current = clauses[0].id;
      for (let i = 0; i < clauses.length; i += 1) {
        if (clauses[i].getBoundingClientRect().top <= 160) {
          current = clauses[i].id;
        } else {
          break;
        }
      }
      setActiveToc(current);
    };

    window.addEventListener('scroll', syncLegalToc, { passive: true });
    if (window.location.hash) {
      const hashId = window.location.hash.slice(1);
      if (clauses.some((c) => c.id === hashId)) setActiveToc(hashId);
    } else {
      syncLegalToc();
    }
  }
}

/* ==========================================================================
   16. Photo Grain Touch Reveal (Bio & Collaborators Gallery)
   ========================================================================== */

function initPhotoGrainReveal() {
  const selector = '.story-card, .gallery-thumb';
  /** @type {Element | null} */
  let activeTarget = null;
  let startX = 0;
  let startY = 0;
  let startTime = 0;
  let lastTouchAt = 0;
  let wasAlreadyRevealed = false;
  let moved = false;

  /** @param {Element | null} exceptEl */
  const clearRevealed = (exceptEl) => {
    $$(`${selector}.revealed`).forEach((el) => {
      if (el !== exceptEl) el.classList.remove('revealed');
    });
  };

  document.addEventListener(
    'touchstart',
    (e) => {
      lastTouchAt = Date.now();
      const target = e.target instanceof Element ? e.target.closest(selector) : null;
      if (!target) {
        clearRevealed(null);
        activeTarget = null;
        return;
      }

      const touch = e.touches && e.touches[0];
      activeTarget = target;
      startX = touch ? touch.clientX : 0;
      startY = touch ? touch.clientY : 0;
      startTime = Date.now();
      wasAlreadyRevealed = target.classList.contains('revealed');
      moved = false;

      clearRevealed(target);
      target.classList.add('revealed');
    },
    { passive: true }
  );

  document.addEventListener(
    'touchmove',
    (e) => {
      if (!activeTarget) return;
      const touch = e.touches && e.touches[0];
      if (!touch) return;
      if (Math.abs(touch.clientX - startX) > 10 || Math.abs(touch.clientY - startY) > 10) {
        moved = true;
        if (!wasAlreadyRevealed) {
          activeTarget.classList.remove('revealed');
        }
        activeTarget = null;
      }
    },
    { passive: true }
  );

  const handleTouchEnd = () => {
    lastTouchAt = Date.now();
    if (!activeTarget) return;
    const heldMs = Date.now() - startTime;
    if (!moved && (heldMs >= 260 || wasAlreadyRevealed)) {
      activeTarget.classList.remove('revealed');
    }
    activeTarget = null;
  };

  document.addEventListener('touchend', handleTouchEnd, { passive: true });
  document.addEventListener('touchcancel', handleTouchEnd, { passive: true });

  document.addEventListener('click', (e) => {
    if (Date.now() - lastTouchAt < 500) return;
    const target = e.target instanceof Element ? e.target.closest(selector) : null;
    if (!target) {
      clearRevealed(null);
      return;
    }
    const willReveal = !target.classList.contains('revealed');
    clearRevealed(willReveal ? target : null);
    target.classList.toggle('revealed', willReveal);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadSavedCookieConsent();

  let initialLang = 'es';
  try {
    const savedLang = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (savedLang && I18N[savedLang]) initialLang = savedLang;
  } catch {
    // Storage unavailable
  }

  preloadAllImages();
  initSplashScreen();
  initGlobalStorm();
  initNavigation();
  initFilters();
  initBackgroundMusic();
  initAudioAndVideo();
  initSpotifyCard();
  initModals();
  initContactForm();
  initCopyEmailButton();
  initScrollAndFloatingActions();
  initLegalPage();
  initPhotoGrainReveal();
  initCursorAtmosphere();
  initScrollReveal();
  applyLanguage(initialLang);
});
