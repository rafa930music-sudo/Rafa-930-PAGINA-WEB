import React, { useState } from 'react';
import { Language, LegalDocId } from '../../types';
import { OFFICIAL_SPOTIFY_URL } from '../../data/content';
import {
  sanitizeUserInput,
  isValidEmail,
  isValidPhone,
  checkSubmissionRateLimit,
  submitToFormspree,
  FORMSPREE_ENDPOINT,
} from '../../utils/seoAndSecurity';
import { SectionColorBubbles } from '../AmbientColorBubbles';
import { Card3D } from '../Card3D';
import {
  Mail,
  Send,
  Check,
  MessageSquare,
  Instagram,
  Youtube,
  MapPin,
  AlertCircle,
  Radio,
  Loader2,
} from 'lucide-react';

interface ContacteScreenProps {
  language: Language;
  onOpenLegalTab?: (tab: LegalDocId) => void;
}

export const ContacteScreen: React.FC<ContacteScreenProps> = ({ language, onOpenLegalTab }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formspreeConfirmed, setFormspreeConfirmed] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError(null);

    // Anti-bot honeypot check
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
    const result = await submitToFormspree({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      inquiryType: formData.type,
      message: cleanMessage,
      sourceScreen: 'Apartado Contacto Directo (#contacte)',
      language,
    });
    setIsSubmitting(false);
    setFormspreeConfirmed(result.ok);
    setSubmitted(true);
  };

  const getWhatsAppDirectLink = () => {
    const text =
      language === 'ca'
        ? `Hola RAFA 930, sóc ${formData.name} (${formData.email}${formData.phone ? ` / ${formData.phone}` : ''}). Àrea: ${formData.type}. Projecte: ${formData.message}`
        : language === 'es'
        ? `Hola RAFA 930, soy ${formData.name} (${formData.email}${formData.phone ? ` / ${formData.phone}` : ''}). Área: ${formData.type}. Proyecto: ${formData.message}`
        : `Hello RAFA 930, I am ${formData.name} (${formData.email}${formData.phone ? ` / ${formData.phone}` : ''}). Area: ${formData.type}. Project: ${formData.message}`;
    return `https://wa.me/34671591814?text=${encodeURIComponent(text)}`;
  };

  const getMailtoDirectLink = () => {
    const subject = `Solicitud Profesional [${formData.type.toUpperCase()}] - ${formData.name} · RAFA 930`;
    const body = `Nombre: ${formData.name}\nEmail: ${formData.email}\nTeléfono: ${formData.phone || '-'}\nÁrea: ${formData.type}\n\nDetalles del proyecto:\n${formData.message}\n`;
    return `mailto:rafa.930music@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16 space-y-16 overflow-hidden">
      <SectionColorBubbles variant="electric" />
      {/* Editorial Header */}
      <div className="border-b border-[#22222e] pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1b5] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
          <span className="text-[#ec4899] font-semibold">
            {language === 'ca'
              ? 'CONTACTE & CONTRACTACIÓ · RAFA 930'
              : language === 'es'
              ? 'CONTACTO & CONTRATACIÓN · RAFA 930'
              : 'CONTACT & BOOKING · RAFA 930'}
          </span>
          <span aria-hidden="true" className="text-[#00d4ff]">·</span>
          <span>
            {language === 'ca'
              ? 'RESPOSTA EN 24 HORES'
              : language === 'es'
              ? 'RESPUESTA EN 24 HORAS'
              : 'RESPONSE WITHIN 24 HOURS'}
          </span>
        </div>
        <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl font-semibold text-[#ffffff]">
          {language === 'ca'
            ? 'Contacte Directe'
            : language === 'es'
            ? 'Contacto Directo'
            : 'Direct Contact'}
        </h1>
        <p className="text-[#a1a1b5] text-base max-w-2xl mt-2 leading-relaxed">
          {language === 'ca'
            ? 'Per a contractacions de concerts, festivals, sessions fotogràfiques, desenvolupament web o consultes de premsa.'
            : language === 'es'
            ? 'Para contrataciones de conciertos, festivales, sesiones fotográficas, desarrollo web o consultas de prensa.'
            : 'For concert bookings, festivals, photography sessions, web development, or press inquiries.'}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <Card3D
            intensity={5}
            glowColor="rgba(236, 72, 153, 0.2)"
            className="bg-[#111118]/90 backdrop-blur-md border border-[#22222e] rounded-xl p-6 sm:p-8 space-y-5"
          >
            <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#ffffff]">
              {language === 'ca'
                ? 'Canals Oficials'
                : language === 'es'
                ? 'Canales Oficiales'
                : 'Official Channels'}
            </h2>

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
              className="p-4 bg-[#0a0a0f] border border-[#22222e] hover:border-[#a855f7] rounded-lg flex items-center gap-4 transition-colors block group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#111118] border border-[#22222e] text-[#a855f7] flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#a1a1b5] block">
                  {language === 'ca'
                    ? 'WhatsApp Directe'
                    : language === 'es'
                    ? 'WhatsApp Directo'
                    : 'Direct WhatsApp'}
                </span>
                <span className="text-sm font-semibold text-[#ffffff] group-hover:text-[#a855f7] block tabular-nums">
                  +34 671 59 18 14
                </span>
              </div>
            </a>

            <a
              href="https://instagram.com/rafa930_oficial"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#0a0a0f] border border-[#22222e] hover:border-[#ec4899] rounded-lg flex items-center gap-4 transition-colors block group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#111118] border border-[#22222e] text-[#ec4899] flex items-center justify-center shrink-0">
                <Instagram className="w-5 h-5" />
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
              href="https://youtube.com/@rafa_930"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#0a0a0f] border border-[#00d4ff]/35 hover:border-[#00d4ff] rounded-lg flex items-center gap-4 transition-colors block group shadow-[0_0_16px_rgba(0,212,255,0.08)]"
            >
              <div className="w-10 h-10 rounded-lg bg-[#111118] border border-[#00d4ff]/40 text-[#00d4ff] flex items-center justify-center shrink-0">
                <Youtube className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#a1a1b5] block">
                  {language === 'ca'
                    ? 'Canal Musical Oficial'
                    : language === 'es'
                    ? 'Canal Musical Oficial'
                    : 'Official Music Channel'}
                </span>
                <span className="text-sm font-semibold text-[#ffffff] group-hover:text-[#00d4ff] block">
                  YouTube (@rafa_930)
                </span>
              </div>
            </a>

            <a
              href={OFFICIAL_SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#0a0a0f] border border-[#a855f7]/40 hover:border-[#00d4ff] rounded-lg flex items-center gap-4 transition-colors block group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#111118] border border-[#00d4ff]/40 text-[#00d4ff] flex items-center justify-center shrink-0">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#a1a1b5] block">
                  {language === 'ca'
                    ? 'Perfil Oficial d’Artista'
                    : language === 'es'
                    ? 'Perfil Oficial de Artista'
                    : 'Official Artist Profile'}
                </span>
                <span className="text-sm font-semibold text-[#ffffff] group-hover:text-[#00d4ff] block">
                  Spotify (RAFA 930)
                </span>
              </div>
            </a>
          </Card3D>

          <Card3D
            intensity={4}
            glowColor="rgba(0, 212, 255, 0.2)"
            className="bg-[#0a0a0f]/90 backdrop-blur-md border border-[#22222e] rounded-xl p-6 space-y-2"
          >
            <div className="flex items-center gap-2 text-[#ec4899] font-mono text-xs">
              <MapPin className="w-4 h-4" />
              <span>
                {language === 'ca'
                  ? 'UBICACIÓ & DISPONIBILITAT'
                  : language === 'es'
                  ? 'UBICACIÓN & DISPONIBILIDAD'
                  : 'LOCATION & AVAILABILITY'}
              </span>
            </div>
            <p className="text-sm font-semibold text-[#ffffff]">Sant Adrià de Besòs · Barcelona</p>
            <p className="text-xs text-[#a1a1b5] leading-relaxed">
              {language === 'ca'
                ? 'Disponibilitat per a desplaçaments a nivell nacional i internacional.'
                : language === 'es'
                ? 'Disponibilidad para desplazamientos a nivel nacional e internacional.'
                : 'Available for national and international travel.'}
            </p>
          </Card3D>
        </div>

        {/* Right: Booking Form */}
        <div className="lg:col-span-7">
          <Card3D
            intensity={4}
            glowColor="rgba(0, 212, 255, 0.22)"
            className="bg-[#111118]/90 backdrop-blur-md border border-[#22222e] rounded-xl p-6 sm:p-10 space-y-6"
          >
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-semibold text-[#ffffff]">
                {language === 'ca'
                  ? 'Formulari de Sol·licitud'
                  : language === 'es'
                  ? 'Formulario de Solicitud'
                  : 'Inquiry & Booking Form'}
              </h2>
              <p className="text-xs text-[#a1a1b5] mt-1">
                {language === 'ca'
                  ? 'Especifica els detalls de la teva proposta i rebràs resposta tècnica i econòmica en menys de 24 hores.'
                  : language === 'es'
                  ? 'Especifica los detalles de tu propuesta y recibirás respuesta técnica y económica en menos de 24 horas.'
                  : 'Specify your proposal details and receive a technical and financial response within 24 hours.'}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-[#0a0a0f] border border-[#ec4899] rounded-xl text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#ec4899]/15 text-[#ec4899] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#ffffff]">
                  {formspreeConfirmed
                    ? language === 'ca'
                      ? 'Sol·licitud rebuda i enviada a RAFA 930!'
                      : language === 'es'
                      ? '¡Solicitud recibida y enviada a RAFA 930!'
                      : 'Inquiry received and sent to RAFA 930!'
                    : language === 'ca'
                    ? 'Sol·licitud preparada correctament'
                    : language === 'es'
                    ? 'Solicitud preparada correctamente'
                    : 'Inquiry ready to send'}
                </h3>
                <p className="text-xs text-[#a1a1b5] max-w-md mx-auto leading-relaxed">
                  {formspreeConfirmed
                    ? language === 'ca'
                      ? `Gràcies ${formData.name}. El teu missatge ja s'ha registrat automàticament a la bústia oficial de RAFA 930 (${formData.email}). Si vols resposta immediata, també pots escriure per WhatsApp:`
                      : language === 'es'
                      ? `Gracias ${formData.name}. Tu mensaje ya se ha registrado automáticamente en el buzón oficial de RAFA 930 (${formData.email}). Si deseas atención inmediata, también puedes abrir WhatsApp:`
                      : `Thank you ${formData.name}. Your message has been automatically delivered to RAFA 930’s official inbox (${formData.email}). For instant follow-up, you can also reach out via WhatsApp:`
                    : language === 'ca'
                    ? `Gràcies ${formData.name}. Pots enviar la teva sol·licitud directament al WhatsApp o al correu oficial de RAFA 930 amb un sol clic:`
                    : language === 'es'
                    ? `Gracias ${formData.name}. Puedes enviar tu solicitud directamente al WhatsApp o al correo oficial de RAFA 930 con un solo clic:`
                    : `Thank you ${formData.name}. Send your inquiry directly to RAFA 930’s official WhatsApp or email with one click:`}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-md mx-auto">
                  <a
                    href={getWhatsAppDirectLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target-48 px-4 py-3 rounded-lg gradient-lila-rosa-rojo text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>
                      {language === 'ca'
                        ? 'Enviar per WhatsApp'
                        : language === 'es'
                        ? 'Enviar por WhatsApp'
                        : 'Send via WhatsApp'}
                    </span>
                  </a>

                  <a
                    href={getMailtoDirectLink()}
                    className="touch-target-48 px-4 py-3 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#ec4899] text-[#ffffff] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#ec4899]" />
                    <span>
                      {language === 'ca'
                        ? 'Enviar per Correu'
                        : language === 'es'
                        ? 'Enviar por Correo'
                        : 'Send via Email'}
                    </span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="touch-target-44 mt-2 px-5 py-2 rounded-lg text-xs font-mono text-[#a1a1b5] hover:text-[#ffffff] underline"
                >
                  {language === 'ca'
                    ? 'Editar o enviar una altra sol·licitud'
                    : language === 'es'
                    ? 'Editar o enviar otra solicitud'
                    : 'Edit or send another request'}
                </button>
              </div>
            ) : (
              <form
                action={FORMSPREE_ENDPOINT}
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
              >
                {/* Hidden Anti-Bot Honeypot Field */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="c-website-url">Website</label>
                  <input
                    id="c-website-url"
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
                    <label className="block text-xs font-mono text-[#a1a1b5] mb-1.5" htmlFor="c-nombre">
                      {language === 'ca'
                        ? 'Nom i Cognoms *'
                        : language === 'es'
                        ? 'Nombre y Apellidos *'
                        : 'Full Name *'}
                    </label>
                    <input
                      id="c-nombre"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={
                        language === 'ca'
                          ? 'El teu nom o empresa'
                          : language === 'es'
                          ? 'Tu nombre o empresa'
                          : 'Your name or company'
                      }
                      className="touch-target-48 w-full px-4 bg-[#0a0a0f] border border-[#22222e] rounded-lg text-[#ffffff] focus:outline-none focus:border-[#ec4899] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#a1a1b5] mb-1.5" htmlFor="c-email">
                      {language === 'ca'
                        ? 'Correu electrònic *'
                        : language === 'es'
                        ? 'Correo electrónico *'
                        : 'Email address *'}
                    </label>
                    <input
                      id="c-email"
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
                    <label className="block text-xs font-mono text-[#a1a1b5] mb-1.5" htmlFor="c-telefono">
                      {language === 'ca'
                        ? 'Telèfon / WhatsApp'
                        : language === 'es'
                        ? 'Teléfono / WhatsApp'
                        : 'Phone / WhatsApp'}
                    </label>
                    <input
                      id="c-telefono"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+34 600 000 000"
                      className="touch-target-48 w-full px-4 bg-[#0a0a0f] border border-[#22222e] rounded-lg text-[#ffffff] focus:outline-none focus:border-[#ec4899] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#a1a1b5] mb-1.5" htmlFor="c-tipo">
                      {language === 'ca'
                        ? 'Àrea de Treball *'
                        : language === 'es'
                        ? 'Área de Trabajo *'
                        : 'Area of Interest *'}
                    </label>
                    <select
                      id="c-tipo"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="touch-target-48 w-full px-4 bg-[#0a0a0f] border border-[#22222e] rounded-lg text-[#ffffff] focus:outline-none focus:border-[#ec4899] text-sm"
                    >
                      <option value="concierto">
                        {language === 'ca'
                          ? 'Concert / Festival / Booking'
                          : language === 'es'
                          ? 'Concierto / Festival / Booking'
                          : 'Concert / Festival / Booking'}
                      </option>
                      <option value="colaboracion">
                        {language === 'ca'
                          ? 'Col·laboració musical / Feat'
                          : language === 'es'
                          ? 'Colaboración musical / Feat'
                          : 'Musical Collaboration / Feat'}
                      </option>
                      <option value="estudio">
                        {language === 'ca'
                          ? 'Direcció Fotogràfica / Editorial'
                          : language === 'es'
                          ? 'Dirección Fotográfica / Editorial'
                          : 'Photography Direction / Editorial'}
                      </option>
                      <option value="desarrollo">
                        {language === 'ca'
                          ? 'Desenvolupament Web & Disseny Digital'
                          : language === 'es'
                          ? 'Desarrollo Web & Diseño Digital'
                          : 'Web Development & Digital Design'}
                      </option>
                      <option value="prensa">
                        {language === 'ca'
                          ? 'Premsa / Entrevista / Mitjans'
                          : language === 'es'
                          ? 'Prensa / Entrevista / Medios'
                          : 'Press / Interview / Media'}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#a1a1b5] mb-1.5" htmlFor="c-mensaje">
                    {language === 'ca'
                      ? 'Descripció del Projecte *'
                      : language === 'es'
                      ? 'Descripción del Proyecto *'
                      : 'Project Description *'}
                  </label>
                  <textarea
                    id="c-mensaje"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      language === 'ca'
                        ? 'Explica detalls com data prevista, localització o requeriments...'
                        : language === 'es'
                        ? 'Explica detalles como fecha prevista, localización o requerimientos...'
                        : 'Explain details such as target date, location, or requirements...'
                    }
                    className="w-full p-4 bg-[#0a0a0f] border border-[#22222e] rounded-lg text-[#ffffff] focus:outline-none focus:border-[#ec4899] text-sm"
                  />
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input
                    id="c-privacidad"
                    type="checkbox"
                    required
                    checked={formData.privacy}
                    onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                    className="touch-target-44 w-5 h-5 rounded bg-[#0a0a0f] border-[#22222e] text-[#ec4899] cursor-pointer mt-0.5"
                  />
                  <label htmlFor="c-privacidad" className="text-xs text-[#a1a1b5] cursor-pointer leading-normal">
                    {language === 'ca' ? (
                      <>
                        Accepto la{' '}
                        <button
                          type="button"
                          onClick={() => onOpenLegalTab && onOpenLegalTab('privacitat')}
                          className="text-[#ec4899] underline font-semibold"
                        >
                          política de privacitat & RGPD
                        </button>{' '}
                        i el tractament confidencial de les meves dades per al contacte.
                      </>
                    ) : language === 'es' ? (
                      <>
                        Acepto la{' '}
                        <button
                          type="button"
                          onClick={() => onOpenLegalTab && onOpenLegalTab('privacitat')}
                          className="text-[#ec4899] underline font-semibold"
                        >
                          política de privacidad & RGPD
                        </button>{' '}
                        y el tratamiento confidencial de mis datos para el contacto.
                      </>
                    ) : (
                      <>
                        I accept the{' '}
                        <button
                          type="button"
                          onClick={() => onOpenLegalTab && onOpenLegalTab('privacitat')}
                          className="text-[#ec4899] underline font-semibold"
                        >
                          privacy policy & GDPR
                        </button>{' '}
                        and the confidential processing of my data for contact purposes.
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
                          : 'Sending inquiry...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>
                        {language === 'ca'
                          ? 'Enviar sol·licitud directa'
                          : language === 'es'
                          ? 'Enviar solicitud directa'
                          : 'Send direct inquiry'}
                      </span>
                    </>
                  )}
                </button>
              </form>
            )}
          </Card3D>
        </div>
      </div>
    </div>
  );
};
