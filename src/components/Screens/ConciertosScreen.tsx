import React, { useState } from 'react';
import { Language, ScreenId } from '../../types';
import { Card3D } from '../Card3D';
import { SectionColorBubbles } from '../AmbientColorBubbles';
import { ARTIST_IMAGES } from '../../data/content';
import { sanitizeUserInput, isValidEmail, checkSubmissionRateLimit } from '../../utils/seoAndSecurity';
import {
  Calendar,
  Ticket,
  Bell,
  Sparkles,
  Volume2,
  Mic,
  Check,
  Send,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Mail,
  MapPin,
  Clock,
  Radio,
  Play,
} from 'lucide-react';
import { SpotifyLogo, YouTubeLogo } from '../PlatformLogos';

interface ConciertosScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  onOpenLegalTab?: (tab: any) => void;
}

export const ConciertosScreen: React.FC<ConciertosScreenProps> = ({
  language,
  onNavigate,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [notifyError, setNotifyError] = useState<string | null>(null);

  const t = {
    ca: {
      badge: '08930 · GIRA & DIRECTES',
      title: 'Concerts & Espectacles en Viu',
      subtitle:
        'La posada en escena de RAFA 930: energia de carrer, so autèntic i lírica honesta.',
      statusTag: 'PROPERAMENT · EN PREPARACIÓ',
      statusTitle: 'Preparant la primera posada en escena en directe',
      statusDesc:
        'Actualment estem preparant i perfeccionant la posada en escena per als primers concerts en directe. Encara no he tingut l’oportunitat de fer concerts en viu, però estem treballant dur per portar tot el repertori del 930 a l’escenari molt aviat. Estigues atent a les primeres dates!',
      notifyTitle: 'Vols ser el primer a saber quan s’anunciïn les dates?',
      notifySub:
        'Deixa el teu correu i la teva ciutat. T’avisarem abans que a ningú quan es publiquin els primers concerts i entrades.',
      emailPlaceholder: 'el_teu_email@domini.com',
      cityPlaceholder: 'La teva ciutat (ex: Barcelona, Mataró, Badalona...)',
      notifyBtn: 'Avisa’m del primer concert',
      notifySuccess:
        'Gràcies pel suport! T’avisarem de seguida que s’anunciï la primera data oficial de RAFA 930.',
      setlistTitle: 'Repertori en Preparació per a Escenari',
      setlistSub:
        'El bloc de cançons que formaran part del directe de RAFA 930:',
      riderTitle: 'Contractació & Rider Tècnic Oficial',
      riderSub:
        'Informació essencial per a promotors, sales, festivals, festes majors i comissions de festes.',
      formatLabel: 'Format de Directe',
      formatVal: 'Showcase Urbà (35-50 min) amb veu en viu i suport audiovisual',
      soundLabel: 'Requeriments de So',
      soundVal: 'Microfonía sense fil professional (Shure SM58 / Beta 58A), monitoratge i PA estéreo',
      visualsLabel: 'Direcció Visual',
      visualsVal: 'Visuals sincronitzats en clarobscur i cinematografia per Incrife',
      bookingBtn: 'Sol·licitar Contractació',
      contactOr: 'o escriu directament a',
      faqTitle: 'Preguntes Freqüents sobre Directes',
      exploreDiscography: 'Escoltar Discografia Abans del Directe',
    },
    es: {
      badge: '08930 · GIRA & DIRECTOS',
      title: 'Conciertos & Espectáculos en Vivo',
      subtitle:
        'La puesta en escena de RAFA 930: energía de calle, sonido auténtico y lírica honesta.',
      statusTag: 'PRÓXIMAMENTE · EN PREPARACIÓN',
      statusTitle: 'Preparando la primera puesta en escena en directo',
      statusDesc:
        'Actualmente estamos preparando y perfeccionando la puesta en escena para los primeros conciertos en directo. Por ahora no he tenido la oportunidad de hacer un concierto en vivo, pero estamos trabajando duro para llevar todo el repertorio del 930 al escenario muy pronto. ¡Muy pronto anunciaremos las primeras fechas oficiales!',
      notifyTitle: '¿Quieres ser el primero en saber cuándo se anuncien las fechas?',
      notifySub:
        'Deja tu correo y tu ciudad. Te avisaremos antes que a nadie cuando se publiquen los primeros conciertos y entradas.',
      emailPlaceholder: 'tu_email@dominio.com',
      cityPlaceholder: 'Tu ciudad (ej: Barcelona, Mataró, Badalona...)',
      notifyBtn: 'Avísame del primer concierto',
      notifySuccess:
        '¡Gracias por el apoyo! Te avisaremos de inmediato en cuanto se anuncie la primera fecha oficial de RAFA 930.',
      setlistTitle: 'Repertorio en Preparación para Escenario',
      setlistSub:
        'El bloque de temas que formarán parte del directo de RAFA 930:',
      riderTitle: 'Contratación & Rider Técnico Oficial',
      riderSub:
        'Información esencial para promotores, salas, festivales, fiestas mayores y comisiones de fiestas.',
      formatLabel: 'Formato de Directo',
      formatVal: 'Showcase Urbano (35-50 min) con voz en vivo y soporte audiovisual',
      soundLabel: 'Requisitos de Sonido',
      soundVal: 'Microfonía inalámbrica profesional (Shure SM58 / Beta 58A), monitoraje y PA estéreo',
      visualsLabel: 'Dirección Visual',
      visualsVal: 'Visuales sincronizados en claroscuro y cinematografía por Incrife',
      bookingBtn: 'Solicitar Contratación',
      contactOr: 'o escribe directamente a',
      faqTitle: 'Preguntas Frecuentes sobre Directos',
      exploreDiscography: 'Escuchar Discografía Antes del Directo',
    },
    en: {
      badge: '08930 · TOUR & LIVE SHOWS',
      title: 'Concerts & Live Stage Shows',
      subtitle:
        'RAFA 930’s live stage presence: raw neighborhood energy, authentic sound, and honest lyricism.',
      statusTag: 'COMING SOON · IN PREPARATION',
      statusTitle: 'Preparing the first live stage production',
      statusDesc:
        'We are currently preparing and perfecting the live stage show for upcoming concerts. I have not had the opportunity to perform a live concert yet, but we are working hard to bring the full 930 repertoire to the stage very soon. Stay tuned for the first official tour dates!',
      notifyTitle: 'Want to be the first to know when dates are announced?',
      notifySub:
        'Drop your email and city below. We’ll notify you first when the first concert dates and tickets go live.',
      emailPlaceholder: 'your_email@domain.com',
      cityPlaceholder: 'Your city (e.g. Barcelona, Mataró, Badalona...)',
      notifyBtn: 'Notify me of the first show',
      notifySuccess:
        'Thank you for the support! You will be notified the moment RAFA 930’s first official date is announced.',
      setlistTitle: 'Repertoire in Preparation for the Stage',
      setlistSub:
        'The core tracks being arranged for RAFA 930’s live performance:',
      riderTitle: 'Booking & Official Technical Rider',
      riderSub:
        'Essential information for promoters, venues, festivals, local councils, and event organizers.',
      formatLabel: 'Live Format',
      formatVal: 'Urban Showcase (35-50 min) with live vocals and audiovisual support',
      soundLabel: 'Audio Requirements',
      soundVal: 'Professional wireless microphones (Shure SM58 / Beta 58A), stage monitors and stereo PA',
      visualsLabel: 'Visual Direction',
      visualsVal: 'Synchronized chiaroscuro visuals and cinematic lighting by Incrife',
      bookingBtn: 'Request Live Booking',
      contactOr: 'or email directly to',
      faqTitle: 'Frequently Asked Questions about Live Shows',
      exploreDiscography: 'Listen to Discography Before the Live Show',
    },
  }[language];

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotifyError(null);

    const cleanEmail = sanitizeUserInput(emailInput, 120);
    const cleanCity = sanitizeUserInput(cityInput, 80);

    if (!isValidEmail(cleanEmail)) {
      setNotifyError(
        language === 'ca'
          ? 'Si us plau, introdueix un correu electrònic vàlid.'
          : language === 'es'
          ? 'Por favor, introduce un correo electrónico válido.'
          : 'Please enter a valid email address.'
      );
      return;
    }

    const rate = checkSubmissionRateLimit();
    if (!rate.allowed) {
      setNotifyError(
        language === 'ca'
          ? `Per seguretat, espera ${rate.waitSeconds}s abans de tornar a enviar.`
          : language === 'es'
          ? `Por seguridad, espera ${rate.waitSeconds}s antes de enviar otra solicitud.`
          : `Please wait ${rate.waitSeconds}s before submitting again.`
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
      setEmailInput('');
      setCityInput(cleanCity);
    }, 700);
  };

  const setlistTracks = [
    {
      order: '01',
      title: 'De Vuelta',
      tag: language === 'ca' ? 'Obertura / Nou Destacat 2026' : language === 'es' ? 'Apertura / Nuevo Destacado 2026' : 'Opening / 2026 Highlight',
      desc: language === 'ca' ? 'Energia nocturna d’arrencada i declaració d’intencions amb el so 930.' : language === 'es' ? 'Energía nocturna de arranque y declaración de intenciones con el sonido 930.' : 'High-energy nocturnal opening with the signature 930 sound.',
      highlight: true,
    },
    {
      order: '02',
      title: 'EP My World (Trilogia en Directe)',
      tag: language === 'ca' ? 'Bloc Conceptual · Ja a Spotify' : language === 'es' ? 'Bloque Conceptual · Ya en Spotify' : 'Conceptual Block · Out on Spotify',
      desc: '01. 1 Minuto y 10 Segundos · 02. Lo Material No Lo Es Todo · 03. Fuck Sistema',
      highlight: true,
      spotifyUrl: 'https://open.spotify.com/album/25v5dLghLWzumiIXqLDD8A?si=yVkoZMeNSnGFTFE8P48Pug',
    },
    {
      order: '03',
      title: 'Hago Dinero',
      tag: language === 'ca' ? 'Trap Urbà · Hit de Carrer' : language === 'es' ? 'Trap Urbano · Hit Callejero' : 'Urban Trap · Street Hit',
      desc: language === 'ca' ? 'Potència sonora pura, ambició i superació des del barri de La Mina.' : language === 'es' ? 'Potencia sonora pura, ambición y superación desde el barrio de La Mina.' : 'Pure sound power, hustle and determination straight from La Mina.',
      highlight: true,
      spotifyUrl: 'https://open.spotify.com/artist/06iYQvB7eM6Zq03q0dYx9k',
    },
    {
      order: '04',
      title: 'Romeo y Julieta',
      tag: language === 'ca' ? 'Single Oficial · Romance Urbà' : language === 'es' ? 'Sencillo Oficial · Romance Urbano' : 'Official Single · Urban Romance',
      desc: language === 'ca' ? 'Relat romàntic de carrer amb gran acollida del públic.' : language === 'es' ? 'Relato romántico de calle con gran acogida del público.' : 'Urban romantic story with deep emotional resonance.',
    },
    {
      order: '05',
      title: 'Nose si estaré mañana',
      tag: language === 'ca' ? 'Senzill Oficial 2026' : language === 'es' ? 'Sencillo Oficial 2026' : 'Official 2026 Single',
      desc: language === 'ca' ? 'Introspecció lírica profunda i urgència vital sobre el ritme.' : language === 'es' ? 'Introspección lírica profunda y urgencia vital sobre el ritmo.' : 'Deep lyrical introspection and urgent melody over the beat.',
    },
    {
      order: '06',
      title: 'Un Amor Prohibido',
      tag: language === 'ca' ? 'Hit Single · +1.2K Reps' : language === 'es' ? 'Hit Single · +1.2K Reps' : 'Hit Single · 1.2K+ Streams',
      desc: language === 'ca' ? 'Uno dels temes més emblemàtics i demanats pel públic.' : language === 'es' ? 'Uno de los temas más emblemáticos y aclamados por el público.' : 'One of the most emblematic and highly requested tracks.',
    },
  ];

  const faqs = [
    {
      q: {
        ca: 'Quan serà el primer concert de RAFA 930?',
        es: '¿Cuándo será el primer concierto de RAFA 930?',
        en: 'When will RAFA 930’s first concert take place?',
      },
      a: {
        ca: 'Actualment estem en procés de preparació i assaig del repertori i la posada en escena. Com que fins ara no hi ha hagut oportunitat d’actuar, anunciarem les primeres dates oficials a través d’aquesta pàgina i xarxes socials tan aviat com estiguin confirmades.',
        es: 'Actualmente estamos en proceso de preparación y ensayo del repertorio y la puesta en escena. Como hasta ahora no he tenido la oportunidad de actuar en vivo, anunciaremos las primeras fechas oficiales a través de esta página y de redes sociales tan pronto como estén confirmadas.',
        en: 'We are currently rehearsing and refining the stage production. As there hasn’t been an opportunity to perform live yet, the first official tour dates will be announced on this website and on official social media as soon as they are confirmed.',
      },
    },
    {
      q: {
        ca: 'A quines ciutats està prevista la gira?',
        es: '¿En qué ciudades está prevista la gira?',
        en: 'Which cities are planned for the upcoming shows?',
      },
      a: {
        ca: 'L’objectiu prioritari és començar a sales i esdeveniments de Barcelona, Sant Adrià de Besòs (La Mina), Mataró i comarques metropolitanes, amb disponibilitat per viatjar a qualsevol punt de Catalunya i Espanya.',
        es: 'El objetivo prioritario es comenzar en salas y eventos de Barcelona, Sant Adrià de Besòs (La Mina), Mataró y comarcas metropolitanas, con total disponibilidad para viajar a cualquier punto de Cataluña y el resto del estado.',
        en: 'The initial priority is performing in venues across Barcelona, Sant Adrià de Besòs (La Mina), Mataró, and metropolitan areas, with full availability to travel across Spain.',
      },
    },
    {
      q: {
        ca: 'Com pot una sala o promotor contractar a RAFA 930?',
        es: '¿Cómo puede una sala o promotor contratar a RAFA 930?',
        en: 'How can a venue or promoter book RAFA 930?',
      },
      a: {
        ca: 'Pots enviar una proposta directament a rafa.930music@gmail.com o a través del formulari de contacte oficial. Responem en menys de 24 hores amb disponibilitat i pressupost adaptat a l’aforament.',
        es: 'Puedes enviar una propuesta directamente a rafa.930music@gmail.com o a través del formulario de contacto oficial. Respondemos en menos de 24 horas con disponibilidad y presupuesto adaptado al aforo.',
        en: 'You can email directly at rafa.930music@gmail.com or submit a proposal via the official contact form. We reply within 24 hours with availability and customized pricing based on venue capacity.',
      },
    },
  ];

  return (
    <div className="relative w-full min-h-screen py-10 sm:py-16 overflow-hidden">
      {/* Background image full width 100% con atmósfera de directo */}
      <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden select-none z-0">
        <img
          src={ARTIST_IMAGES.heroPortraitNight}
          alt="RAFA 930 Directe"
          className="w-full h-full object-cover object-center filter contrast-125 brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-[#050507]/85 to-[#050507]" />
        {/* Iluminación de escenario neón */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.22),transparent_70%)] blur-2xl" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.18),transparent_70%)] blur-2xl" />
      </div>

      <SectionColorBubbles variant="music" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-12">
        {/* Header Editorial */}
        <div className="relative z-10 border-b border-[#22222e] pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1b5] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7]" />
          <span className="text-[#a855f7] font-semibold">{t.badge}</span>
          <span aria-hidden="true" className="text-[#a855f7]">·</span>
          <span className="text-[#ec4899] font-bold">{t.statusTag}</span>
        </div>

        <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl font-semibold text-[#ffffff] tracking-tight">
          {t.title}
        </h1>
        <p className="text-[#a1a1b5] text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Tarjeta Principal: Estado "Próximamente" (Honesta y Transparente) */}
      <Card3D
        intensity={4}
        glowColor="rgba(168, 85, 247, 0.22)"
        className="relative z-10 p-6 sm:p-8 bg-[#111118] border border-[#a855f7]/40 rounded-2xl shadow-[0_0_32px_rgba(168,85,247,0.12)]"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#22222e]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/40 text-[#a855f7] text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-ping" />
              <span>{t.statusTag}</span>
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-bold text-white">
              {t.statusTitle}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('contacte')}
              className="touch-target-48 px-5 py-3 rounded-xl gradient-lila-rosa-rojo text-white font-semibold text-xs transition-opacity hover:opacity-95 shadow-md flex items-center gap-2 whitespace-nowrap"
            >
              <Ticket className="w-4 h-4" />
              <span>{t.bookingBtn}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('discografia')}
              className="touch-target-48 px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#22222e] hover:border-[#a855f7] text-xs font-mono text-[#ffffff] transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Volume2 className="w-4 h-4 text-[#a855f7]" />
              <span className="hidden sm:inline">{t.exploreDiscography}</span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-[#a1a1b5] text-sm sm:text-base leading-relaxed max-w-4xl">
          <p className="border-l-2 border-[#ec4899] pl-4 italic text-[#f472b6] font-['Cormorant_Garamond'] text-xl sm:text-2xl mb-4">
            «{t.statusDesc}»
          </p>
        </div>
      </Card3D>

      {/* Formulario Interactivo: Notifícame de los Primeros Conciertos */}
      <Card3D
        intensity={3}
        glowColor="rgba(236, 72, 153, 0.2)"
        className="relative z-10 p-6 sm:p-8 bg-[#111118] border border-[#ec4899]/35 rounded-2xl"
      >
        <div className="flex items-center gap-2.5 text-xs font-mono text-[#ec4899] mb-2 font-semibold">
          <Bell className="w-4 h-4 text-[#ec4899]" />
          <span>ALERTA DE FECHAS OFICIALES</span>
        </div>

        <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-bold text-white mb-2">
          {t.notifyTitle}
        </h3>
        <p className="text-xs sm:text-sm text-[#a1a1b5] mb-6 max-w-2xl">
          {t.notifySub}
        </p>

        {subscribed ? (
          <div className="p-4 sm:p-5 rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/40 text-white flex items-center gap-3">
            <Check className="w-5 h-5 text-[#a855f7] shrink-0" />
            <p className="text-xs sm:text-sm font-mono text-[#a855f7]">
              {t.notifySuccess}
            </p>
          </div>
        ) : (
          <form onSubmit={handleNotifySubmit} className="space-y-4 max-w-3xl">
            {notifyError && (
              <div className="p-3 rounded-lg bg-[#e11d48]/20 border border-[#e11d48] text-xs text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#e11d48] shrink-0" />
                <span>{notifyError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#a1a1b5] mb-1.5" htmlFor="concert-email">
                  {language === 'ca' ? 'Correu electrònic *' : language === 'es' ? 'Correo electrónico *' : 'Email address *'}
                </label>
                <input
                  id="concert-email"
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="touch-target-48 w-full px-4 bg-[#0a0a0f] border border-[#22222e] rounded-xl text-white text-sm focus:outline-none focus:border-[#ec4899]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#a1a1b5] mb-1.5" htmlFor="concert-city">
                  {language === 'ca' ? 'La teva ciutat / Municipi' : language === 'es' ? 'Tu ciudad / Municipio' : 'Your city / Town'}
                </label>
                <input
                  id="concert-city"
                  type="text"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  placeholder={t.cityPlaceholder}
                  className="touch-target-48 w-full px-4 bg-[#0a0a0f] border border-[#22222e] rounded-xl text-white text-sm focus:outline-none focus:border-[#a855f7]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="touch-target-48 px-6 py-3 rounded-xl gradient-lila-rosa-rojo text-white text-xs font-bold font-mono tracking-wider transition-opacity hover:opacity-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? '...' : t.notifyBtn}</span>
            </button>
          </form>
        )}
      </Card3D>

      {/* Repertorio en Preparación */}
      <div className="relative z-10 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#a855f7] mb-2 font-semibold">
            <Mic className="w-4 h-4 text-[#a855f7]" />
            <span>LIVE SETLIST PREVIEW</span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-white">
            {t.setlistTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#a1a1b5] mt-1">
            {t.setlistSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {setlistTracks.map((track) => (
            <Card3D
              key={track.order}
              intensity={3}
              glowColor={track.highlight ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.15)'}
              className={`p-5 bg-[#111118] border rounded-xl flex flex-col justify-between ${
                track.highlight ? 'border-[#a855f7]/40 shadow-[0_0_16px_rgba(168,85,247,0.12)]' : 'border-[#22222e]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#a855f7] font-bold">PISTA {track.order}</span>
                  <span className="text-[#ec4899] font-medium text-[11px]">{track.tag}</span>
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-white">
                  {track.title}
                </h3>
                <p className="text-xs text-[#a1a1b5] mt-2 leading-relaxed">
                  {track.desc}
                </p>
              </div>

              {track.spotifyUrl && (
                <div className="mt-4 pt-3 border-t border-[#22222e]">
                  <a
                    href={track.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#1ed760] hover:underline"
                  >
                    <SpotifyLogo className="w-3.5 h-3.5" />
                    <span>Escuchar en Spotify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </Card3D>
          ))}
        </div>
      </div>

      {/* Rider Técnico & Contratación para Promotores */}
      <Card3D
        intensity={3}
        glowColor="rgba(168, 85, 247, 0.2)"
        className="relative z-10 p-6 sm:p-8 bg-[#111118] border border-[#22222e] rounded-2xl"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-[#a855f7] mb-2 font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#a855f7]" />
          <span>ESPECIFICACIONES PARA SALAS & EVENTOS</span>
        </div>

        <h2 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-bold text-white mb-2">
          {t.riderTitle}
        </h2>
        <p className="text-xs sm:text-sm text-[#a1a1b5] mb-6 max-w-3xl">
          {t.riderSub}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-[#0a0a0f] border border-[#22222e]">
            <h4 className="text-xs font-mono font-semibold text-[#a855f7] uppercase mb-1">
              {t.formatLabel}
            </h4>
            <p className="text-xs text-[#a1a1b5] leading-relaxed">
              {t.formatVal}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0a0a0f] border border-[#22222e]">
            <h4 className="text-xs font-mono font-semibold text-[#ec4899] uppercase mb-1">
              {t.soundLabel}
            </h4>
            <p className="text-xs text-[#a1a1b5] leading-relaxed">
              {t.soundVal}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0a0a0f] border border-[#22222e]">
            <h4 className="text-xs font-mono font-semibold text-[#a855f7] uppercase mb-1">
              {t.visualsLabel}
            </h4>
            <p className="text-xs text-[#a1a1b5] leading-relaxed">
              {t.visualsVal}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#22222e]">
          <div className="text-xs font-mono text-[#a1a1b5] flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#a855f7]" />
            <span>
              {t.contactOr}{' '}
              <a href="mailto:rafa.930music@gmail.com" className="text-white hover:text-[#a855f7] underline font-semibold">
                rafa.930music@gmail.com
              </a>
            </span>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('contacte')}
            className="touch-target-44 px-5 py-2.5 rounded-lg gradient-lila-rosa-rojo text-white text-xs font-semibold hover:opacity-95 transition-opacity flex items-center gap-1.5"
          >
            <span>{t.bookingBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </Card3D>

      {/* FAQ de Conciertos */}
      <div className="relative z-10 space-y-4">
        <h2 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-bold text-white mb-4">
          {t.faqTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="p-5 bg-[#111118] border border-[#22222e] rounded-xl space-y-2"
            >
              <h3 className="font-semibold text-sm text-white">
                {faq.q[language]}
              </h3>
              <p className="text-xs text-[#a1a1b5] leading-relaxed">
                {faq.a[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};
