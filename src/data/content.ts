import {
  Track,
  Collaborator,
  GalleryPhoto,
  TimelineEvent,
  Show,
  PressKitItem,
  StreamingLink,
  NavItem,
} from '../types';
import rafa930Cara from '@/src/assets/images/rafa-930-cara.jpg';
import logoWhite from '@/src/assets/images/logo-white.webp';
import laMinaHeroBg from '@/src/assets/images/barrio-de-la-mina.png';
import deVueltaNew from '@/src/assets/images/de-vuelta-new.jpg';
import romeoYJulietaNew from '@/src/assets/images/romeo-y-julieta-new.jpg';
import diferentesCaminosNew from '@/src/assets/images/diferentes-caminos-new.jpg';
import pasanLosDiasNew from '@/src/assets/images/pasan-los-dias-new.jpg';
import unAmorProhibidoNew from '@/src/assets/images/un-amor-prohibido-new.png';
import hagoDineroNew from '@/src/assets/images/hago-dinero-new.jpg';

import metallicCyberBg from '@/src/assets/images/metallic_cyber_texture_1793815475887.jpg';
import studioCrewBg from '@/src/assets/images/studio_crew_session_1793816322490.jpg';

export const OFFICIAL_SPOTIFY_URL = 'https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng';
export const OFFICIAL_YOUTUBE_URL = 'https://www.youtube.com/@rafa_930';
export const OFFICIAL_INSTAGRAM_URL = 'https://www.instagram.com/rafa930_oficial';
export const OFFICIAL_DEEZER_URL = 'https://www.deezer.com/mx/artist/224265995';
export const OFFICIAL_APPLE_MUSIC_URL = 'https://music.apple.com/es/artist/rafa-930/1724193275';
export const OFFICIAL_AMAZON_MUSIC_URL = 'https://music.amazon.in/artists/B0CJM7BWF1/rafa-930';
export const OFFICIAL_TIDAL_URL = 'https://tidal.com/artist/41128230';
export const OFFICIAL_EMAIL = 'rafa.930music@gmail.com';
export const OFFICIAL_WHATSAPP = '+34 671 59 18 14';

export const OFFICIAL_LOGOS = {
  header: logoWhite,
  splash: logoWhite,
  drawer: logoWhite,
  footer: logoWhite,
};

export const ARTIST_IMAGES = {
  heroPortrait: rafa930Cara,
  laMinaHeroBg: laMinaHeroBg,
  metallicBg: metallicCyberBg,
  studioCrewBg: studioCrewBg,
  libraryOrigin: laMinaHeroBg,
  deVuelta2026: deVueltaNew,
  single2026: deVueltaNew,
  epMyWorld: pasanLosDiasNew,
  albumVidaEsBella: romeoYJulietaNew,
  romeoYJulietaCover: romeoYJulietaNew,
  diferentesCaminosCover: diferentesCaminosNew,
  pasanLosDiasCover: pasanLosDiasNew,
  unAmorProhibidoCover: unAmorProhibidoNew,
  hagoDineroCover: hagoDineroNew,
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Inicio', hash: '#home' },
  { id: 'discografia', label: 'Discografía', hash: '#discografia' },
  { id: 'galeria', label: 'Fotos', hash: '#galeria' },
  { id: 'contacte', label: 'Contacto', hash: '#contacte' },
];

export const SHOWS: Show[] = [
  {
    id: 'bcn-sala-apolo',
    city: 'Barcelona',
    venue: 'Sala Apolo [La (2)]',
    date: '2026-05-16',
    status: 'confirmado',
    ticketUrl: 'https://wa.me/34671591814?text=Entradas%20RAFA%20930%20Barcelona',
  },
  {
    id: 'mataro-clot',
    city: 'Mataró',
    venue: 'Espai Nau Clot',
    date: '2026-06-20',
    status: 'ultimas',
    ticketUrl: 'https://wa.me/34671591814?text=Entradas%20RAFA%20930%20Mataro',
  },
  {
    id: 'sant-adria-fest',
    city: 'Sant Adrià de Besòs',
    venue: 'Parc del Fòrum / Besòs Stage',
    date: '2026-07-11',
    status: 'confirmado',
    ticketUrl: 'https://wa.me/34671591814?text=Entradas%20RAFA%20930%20Sant%20Adria',
  },
  {
    id: 'madrid-shoko',
    city: 'Madrid',
    venue: 'Shôko Live Madrid',
    date: '2026-09-18',
    status: 'confirmado',
    ticketUrl: 'https://wa.me/34671591814?text=Entradas%20RAFA%20930%20Madrid',
  },
];

export const STREAMING_LINKS: StreamingLink[] = [
  { label: 'Spotify Oficial', url: OFFICIAL_SPOTIFY_URL },
  { label: 'YouTube Canal Oficial (@rafa_930)', url: OFFICIAL_YOUTUBE_URL },
  { label: 'Instagram (@rafa930_oficial)', url: OFFICIAL_INSTAGRAM_URL },
  { label: 'Apple Music Oficial', url: OFFICIAL_APPLE_MUSIC_URL },
  { label: 'Amazon Music', url: OFFICIAL_AMAZON_MUSIC_URL },
  { label: 'Deezer Streaming', url: OFFICIAL_DEEZER_URL },
  { label: 'Tidal Hi-Fi', url: OFFICIAL_TIDAL_URL },
];

export const PRESS_KIT_ITEMS: PressKitItem[] = [
  {
    id: 'press-dossier-2026',
    title: 'Dossier Artístico & Bio Oficial',
    description: 'Trayectoria, cronología 2023-2026, hitos de streaming y repercusión cultural desde 08930.',
    fileUrl: '/assets/presskit-rafa930.txt',
    fileFormat: 'PDF',
    fileSize: '3.4 MB',
    lastUpdated: 'Temporada 2026',
  },
  {
    id: 'press-rider-audio',
    title: 'Rider Técnico & Stage Plot',
    description: 'Requisitos de sonido, microfonía Shure inalámbrica UHF, monitoraje in-ear y set DJ balanceado.',
    fileUrl: '/assets/presskit-rafa930.txt',
    fileFormat: 'PDF',
    fileSize: '1.2 MB',
    lastUpdated: 'Enero 2026',
  },
  {
    id: 'press-assets-4k',
    title: 'Pack Fotográfico 4K & Logotipos',
    description: 'Retratos editoriales por Incrife en alta resolución, portadas de singles e identidades visuales.',
    fileUrl: '/assets/presskit-rafa930.txt',
    fileFormat: 'ZIP',
    fileSize: '24.8 MB',
    lastUpdated: '2026 Master',
  },
];





export const TRACKS: Track[] = [
  {
    id: 'de-vuelta',
    title: 'De Vuelta',
    year: '2026',
    category: 'hit',
    categoryLabel: 'Nou Llançament Destacat 2026 · Video Lyrics',
    coverUrl: ARTIST_IMAGES.deVuelta2026,
    duration: '2:56',
    spotifyUrl: 'https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng',
    youtubeUrl: 'https://youtu.be/RVuiWbT_mNk',
    description: 'El nou tema destacat de RAFA 930 en 2026. Energia nocturna, retorn amb més força i la identitat pura del 930.',
    plays: '252+ reproduccions',
    credits: 'Lletra i Veu: Rafa 930',
  },
  {
    id: 'hago-dinero',
    title: 'Hago Dinero',
    year: '2024',
    category: 'hit',
    categoryLabel: 'Hit Single · Trap Potent',
    coverUrl: ARTIST_IMAGES.hagoDineroCover,
    duration: '3:12',
    spotifyUrl: 'https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng',
    youtubeUrl: 'https://youtube.com/@rafa_930',
    description: 'Crecimiento orgánico sostenido a plataformas con un so trap potent, barras directas y autenticidad del barrio.',
    plays: '500+ reproduccions',
    credits: 'Lletra i Veu: Rafa 930',
  },
  {
    id: 'my-world-ep',
    title: 'EP My World',
    year: '2025',
    category: 'ep',
    categoryLabel: "EP Oficial 'My World' · Ja a Spotify",
    coverUrl: ARTIST_IMAGES.epMyWorld,
    duration: '6:35',
    spotifyUrl: 'https://open.spotify.com/album/25v5dLghLWzumiIXqLDD8A?si=yVkoZMeNSnGFTFE8P48Pug',
    youtubeUrl: 'https://www.youtube.com/watch?v=lCwhG67eijs&list=PLs6c6tp_0W8Q_4mPsWLRQ8Zwt569Rpe5x',
    description: 'Trilogia conceptual disponible oficialment a Spotify: 01. 1 Minuto y 10 Segundos · 02. Lo Material No Lo Es Todo · 03. Fuck Sistema.',
    plays: 'Disponible a Spotify',
    credits: 'Rafa 930 · Visuals: Incrife',
  },
  {
    id: 'romeo-y-julieta',
    title: 'Romeo y Julieta',
    year: '2025',
    category: 'single',
    categoryLabel: 'Single Oficial · Audio',
    coverUrl: ARTIST_IMAGES.romeoYJulietaCover,
    duration: '3:51',
    spotifyUrl: 'https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng',
    youtubeUrl: 'https://youtube.com/@rafa_930',
    description: 'Relat romàntic urbà intens que reinterpreta el clàssic des de la perspectiva del barri.',
    plays: '486+ reproduccions',
    credits: 'Lletra i Veu: Rafa 930',
  },
  {
    id: 'nose-si-estare-manana',
    title: 'Nose si estaré mañana',
    year: '2026',
    category: 'single',
    categoryLabel: 'Single Oficial 2026 · Audio Oficial',
    coverUrl: ARTIST_IMAGES.single2026,
    duration: '2:48',
    spotifyUrl: 'https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng',
    youtubeUrl: 'https://www.youtube.com/watch?v=WaV1KeSN5_4',
    description: 'Un single carregat d’urgència vital, melodies envolupants i la introspecció més honesta de l’artista.',
    plays: '252+ reproduccions',
    lyricsExcerpt: 'Miro al cielo y no sé si estaré mañana,\npero hoy te juro que canto con el alma.\nSalgo a la calle con la fe en la mirada,\ndesde La Mina con la voz afilada...',
    credits: 'Lletra: Rafa 930 · Producció: Incrife',
  },
  {
    id: 'diferentes-caminos',
    title: 'Diferentes Caminos',
    year: '2024',
    category: 'single',
    categoryLabel: 'Tema Inèdit · YouTube Oficial',
    coverUrl: ARTIST_IMAGES.diferentesCaminosCover,
    duration: '3:08',
    spotifyUrl: 'https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng',
    youtubeUrl: 'https://youtube.com/@rafa_930',
    description: 'Reflexió profunda sobre la separació de rutes i la maduresa personal davant la vida.',
    plays: '268+ reproduccions',
    lyricsExcerpt: 'Ara prenem diferents camins sota el mateix cel,\nrecordant tot allò que vam escriure en paper...',
    credits: 'Lletra i Veu: Rafa 930',
  },
  {
    id: 'pasan-los-dias',
    title: 'Pasan los días',
    year: '2024',
    category: 'single',
    categoryLabel: 'Tema Inèdit · YouTube Oficial',
    coverUrl: ARTIST_IMAGES.pasanLosDiasCover,
    duration: '2:56',
    spotifyUrl: 'https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng',
    youtubeUrl: 'https://youtube.com/@rafa_930',
    description: 'El pas del temps i la constància diària en la recerca de metes i superació personal.',
    plays: '286+ reproduccions',
    lyricsExcerpt: 'Pasan los días y la mente sigue en pie,\nlluitant per tot allò que jo sempre vaig creure...',
    credits: 'Lletra i Veu: Rafa 930',
  },
  {
    id: 'un-amor-prohibido',
    title: 'Un Amor Prohibido',
    year: '2024',
    category: 'hit',
    categoryLabel: 'Hit Single · +1.2K Reproduccions',
    coverUrl: ARTIST_IMAGES.unAmorProhibidoCover,
    duration: '2:55',
    spotifyUrl: 'https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng',
    youtubeUrl: 'https://youtube.com/@rafa_930',
    description: 'Un dels temes més corejats i escoltats de la trajectòria de RAFA 930 a YouTube.',
    plays: '1.2K+ reproduccions',
    lyricsExcerpt: 'Sé que deien que no podia ser,\nun amor prohibit sota el mateix carrer.\nTu i jo mirant la lluna créixer,\nsense por del que hagi de vèncer...',
    credits: 'Lletra i Veu: Rafa 930',
  },
];

export const DISCOGRAPHY_TRACKS = TRACKS.map((t) => ({
  ...t,
  coverImage: t.coverUrl || '',
  description: {
    ca: typeof t.description === 'string' ? t.description : t.description?.ca || '',
    es: typeof t.description === 'string' ? t.description : t.description?.es || '',
    en: typeof t.description === 'string' ? t.description : t.description?.en || '',
  },
}));

export const COLLABORATORS: Collaborator[] = [
  {
    id: 'incrife',
    name: 'Incrife',
    role: 'Fotògraf & Productor',
    roleColor: 'primary',
    avatarUrl: studioCrewBg,
    instagramUrl: 'https://www.instagram.com/incrife/',
    handle: '@incrife',
    bio: '',
  },
  {
    id: 'ouxxox',
    name: 'Ouxxox',
    role: 'Productor',
    roleColor: 'secondary',
    avatarUrl: studioCrewBg,
    instagramUrl: 'https://www.instagram.com/_.ouxxox_fr33/',
    handle: '@_.ouxxox_fr33',
    bio: '',
  },
  {
    id: 'therassam',
    name: 'Therassam',
    role: 'Artista',
    roleColor: 'tertiary',
    avatarUrl: rafa930Cara,
    instagramUrl: 'https://www.instagram.com/therassam/',
    handle: '@therassam',
    bio: '',
  },
  {
    id: 'kingsla',
    name: 'Kingsla',
    role: 'Artista',
    roleColor: 'tertiary',
    avatarUrl: studioCrewBg,
    instagramUrl: 'https://www.instagram.com/amine_grafi/',
    handle: '@amine_grafi',
    bio: '',
  },
  {
    id: 'salma',
    name: 'Salma',
    role: 'Model',
    roleColor: 'secondary',
    avatarUrl: romeoYJulietaNew,
    instagramUrl: 'https://www.instagram.com/ssalmaem/',
    handle: '@ssalmaem',
    bio: '',
  },
  {
    id: 'toliyug',
    name: 'Toliyug',
    role: 'Model',
    roleColor: 'secondary',
    avatarUrl: diferentesCaminosNew,
    instagramUrl: 'https://www.instagram.com/toliyug/',
    handle: '@toliyug',
    bio: '',
  },
  {
    id: 'quiriat',
    name: 'Quiriat Jearim Deras Menjivar',
    role: 'Model',
    roleColor: 'secondary',
    avatarUrl: pasanLosDiasNew,
    instagramUrl: 'https://www.instagram.com/derasmenjivar_13/',
    handle: '@derasmenjivar_13',
    bio: '',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g-portrait-incrife',
    title: 'RAFA 930 · Clarobscur',
    category: 'retrat',
    categoryLabel: 'Arxiu Editorial',
    imageUrl: ARTIST_IMAGES.heroPortrait,
    credits: 'Foto: Incrife (@incrife)',
    year: '2025',
    location: 'Barcelona',
    description: 'Sessió editorial oficial en clarobscur per Incrife.',
  },
  {
    id: 'g-library',
    title: 'Barri de La Mina',
    category: 'mina',
    categoryLabel: 'Arxiu Històric',
    imageUrl: ARTIST_IMAGES.libraryOrigin,
    credits: 'Arxiu 930',
    year: 'Orígens',
    location: 'Sant Adrià de Besòs',
    description: 'Bressol creatiu de les primeres lletres i composicions.',
  },
  {
    id: 'g-salma',
    title: 'Salma',
    category: 'moda',
    categoryLabel: 'Model',
    imageUrl: COLLABORATORS[4].avatarUrl,
    credits: '@ssalmaem',
    year: '2025',
    location: 'Barcelona',
    description: '',
  },
  {
    id: 'g-toliyug',
    title: 'Toliyug',
    category: 'moda',
    categoryLabel: 'Model',
    imageUrl: COLLABORATORS[5].avatarUrl,
    credits: '@toliyug',
    year: '2025',
    location: 'Barcelona',
    description: '',
  },
  {
    id: 'g-quiriat',
    title: 'Quiriat Jearim Deras Menjivar',
    category: 'retrat',
    categoryLabel: 'Model',
    imageUrl: COLLABORATORS[6].avatarUrl,
    credits: '@derasmenjivar_13',
    year: '2025',
    location: 'Barcelona',
    description: '',
  },
  {
    id: 'g-therassam',
    title: 'Therassam',
    category: 'urbana',
    categoryLabel: 'Artista',
    imageUrl: COLLABORATORS[2].avatarUrl,
    credits: '@therassam',
    year: '2024',
    location: 'Sant Adrià de Besòs',
    description: '',
  },
  {
    id: 'g-kingsla',
    title: 'Kingsla',
    category: 'urbana',
    categoryLabel: 'Artista',
    imageUrl: COLLABORATORS[3].avatarUrl,
    credits: '@amine_grafi',
    year: '2024',
    location: 'Sant Adrià de Besòs',
    description: 'Retrat d’artista urbà a Sant Adrià de Besòs.',
  },
  {
    id: 'g-ouxxox',
    title: 'Ouxxox',
    category: 'urbana',
    categoryLabel: 'Productor',
    imageUrl: COLLABORATORS[1].avatarUrl,
    credits: '@_.ouxxox_fr33',
    year: '2024',
    location: 'Barcelona',
    description: 'Productor musical clau de l’univers sonor 08930.',
  },
  {
    id: 'g-incrife',
    title: 'Incrife',
    category: 'retrat',
    categoryLabel: 'Fotògraf',
    imageUrl: COLLABORATORS[0].avatarUrl,
    credits: '@incrife',
    year: '2024',
    location: 'Barcelona',
    description: '',
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2023 · ETAPA INICIAL',
    title: 'Poeta · Arrepentido · Así es la vida · Pienso · La Luna',
    badge: 'Etapa Inicial',
    badgeType: 'secondary',
    description: 'Temes nascuts des de la sinceritat més crua als carrers de La Mina.',
    highlight: true,
  },
  {
    year: '2024 · CONSOLIDACIÓ',
    title: 'Siento · Cambié · Algo Imposible · No Love',
    badge: 'Consolidació 2024',
    badgeType: 'primary',
    description: 'Sonoritats profundes de trap emocional i lletres sobre superació i creixement.',
  },
  {
    year: '2024 · ROMANTICISME URBÀ',
    title: 'Te Quiero · Mi Destino · Pensándote · Una Mirada',
    badge: 'Romanticisme Urbà 2024',
    badgeType: 'secondary',
    description: 'Obertura cap a la lírica romàntica i relats de vivències properes publicats el 2024.',
  },
  {
    year: '2024 · HIT SINGLE',
    title: 'Hago Dinero (+500 reps)',
    badge: 'Hit Single',
    badgeType: 'primary',
    description: 'Creixement orgànic sostingut en plataformes de streaming i YouTube.',
    highlight: true,
  },
  {
    year: '2024 · EVOLUCIÓ',
    title: 'Bonnie & Clyde · Mirada de hada · Presidente VS Ciudadanos · Pasan los días · Diferentes Caminos',
    badge: 'Lírica Conscient',
    badgeType: 'tertiary',
    description: 'Reflexions socials i lírica conscient que connecta directament amb les vivències del barri.',
  },
  {
    year: '2025 · EP CONCEPTUAL',
    title: "EP 'My World': 1 Minuto y 10 Segundos · Lo Material No Lo Es Todo · Fuck Sistema",
    badge: "Ja a Spotify",
    badgeType: 'primary',
    description: 'Projecte conceptual disponible oficialment a Spotify que reivindica valors reals i lírica d’arrel.',
    highlight: true,
  },
  {
    year: '2026 · SENZILLS OFICIALS',
    title: 'Tú Aroma · Nose si estaré mañana',
    badge: 'Llançaments 2026',
    badgeType: 'secondary',
    description: 'Senzills oficials «Tú Aroma» i «Nose si estaré mañana» amb so renovat i producció d’Incrife.',
  },
  {
    year: '2026 · PRESENT (DESTACAT)',
    title: 'De Vuelta',
    badge: 'Nou Tema Destacat 2026',
    badgeType: 'tertiary',
    description: 'El nou llançament estel·lar de RAFA 930 que lidera l’etapa actual amb força i identitat pròpia.',
    highlight: true,
  },
];
