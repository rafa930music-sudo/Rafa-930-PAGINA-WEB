import { showToast } from './utils.js';

const translations = {
  es: {
    // Navegación
    nav_about: "Biografía",
    nav_music: "Música",
    nav_booking: "Booking",
    nav_contact: "Contacto",
    header_subtitle: "Volver al inicio",

    // Hero
    hero_desc: "Artista de música urbana y fotógrafo profesional. Trap, reggaetón, rap y sesiones fotográficas de alta calidad.",
    hero_btn1: "Escuchar música",
    hero_btn_colab: "Ver colaboraciones",
   share_text: "Comparte mi música",
    share_twitter: "Twitter",
    share_facebook: "Facebook",
    share_whatsapp: "WhatsApp",
    share_copy: "Copiar link",
    // About
    about_eyebrow: "Mi historia",
    about_title: "Música y fotografía",
    about_p1: "Soy RAFA 930, artista de música urbana en España y fotógrafo profesional. Mi estilo musical combina trap, reggaetón y rap, creando un sonido único que refleja mi vida y mis sueños.",
    about_p2: "Como fotógrafo, me especializo en retratos, fotografía urbana y sesiones para artistas. Capturo la esencia de cada persona a través de mi lente, ofreciendo un trabajo profesional y de alta calidad.",
    about_p3: "Mi objetivo es llevar mi música a todo el mundo y, al mismo tiempo, ofrecer un servicio fotográfico excepcional.",

    // Discografía
    disc_eyebrow: "Mi música",
    disc_title: "Discografía",
    disc_listen_now: 'Escucha "Diferentes Caminos" en Spotify',

    // Social
    social_eyebrow: "Sígueme",
    social_title: "Redes sociales",

    // Features
    feature1_title: "Música original",
    feature1_desc: "Creaciones únicas que fusionan trap, reggaetón y rap con un estilo personal e inconfundible.",
    feature2_title: "Fotografía profesional",
    feature2_desc: "Sesiones fotográficas de alta calidad para artistas, retratos y fotografía urbana.",
    feature3_title: "Booking disponible",
    feature3_desc: "Conciertos, colaboraciones musicales y sesiones fotográficas. Contáctame.",

    // Booking
    booking_eyebrow: "Booking",
    booking_title: "¿Trabajamos juntos?",
    booking_desc: "Para conciertos, colaboraciones musicales, sesiones fotográficas o cualquier consulta profesional, contáctame.",
    booking_music: "Música / Conciertos",
    booking_email: "Email profesional",
    booking_photo: "Sesiones Fotográficas",
    booking_retratos: "Retratos",
    booking_urbano: "Urbano",

    // Formulario
    form_title: "Solicitar información",
    form_subtitle: "Rellena los campos y te responderé en menos de 24h",
    form_name: "Nombre",
    form_lastname: "Apellidos",
    form_email: "Email",
    form_phone: "Teléfono / WhatsApp",
    form_subject: "Tipo de consulta",
    form_budget: "Presupuesto estimado",
    form_message: "Mensaje",
    form_privacy: "Acepto la política de privacidad",
    form_submit: "Solicitar presupuesto sin compromiso",
    form_success: "¡Consulta enviada con éxito! Te responderé en menos de 24 horas.",
    form_error: "Error al enviar. Intenta de nuevo.",

    // Contacto
    contact_eyebrow: "Contacto",
    contact_title: "Encuéntrame",

    // Footer
    footer_desc: "Artista de música urbana y fotógrafo profesional.",
    footer_nav: "Navegación",
    footer_contact: "Contacto",
    footer_legal: "Legal",
    footer_copyright: "Todos los derechos reservados",

    // Select
    select_option: "Selecciona una opción",

    // Colaboradores (nuevo)
    colab_eyebrow: "Colaboraciones",
    colab_title: "He trabajado con ellos",
    colab_role_photographer: "Fotógrafo",
    colab_role_producer: "Productor",
    colab_role_artist: "Artista",
    colab_role_model: "Modelo"
  },

  en: {
    // Navigation
    nav_about: "Biography",
    nav_music: "Music",
    nav_booking: "Booking",
    nav_contact: "Contact",
    header_subtitle: "Back to home",

    // Hero
    hero_desc: "Urban music artist and professional photographer. Trap, reggaeton, rap and high quality photo sessions.",
    hero_btn1: "Listen to music",
    hero_btn_colab: "View collaborations",
    share_text: "Share my music", 

    // About
    about_eyebrow: "My story",
    about_title: "Music & Photography",
    about_p1: "I'm RAFA 930, urban music artist in Spain and professional photographer. My musical style combines trap, reggaeton and rap, creating a unique sound that reflects my life and dreams.",
    about_p2: "As a photographer, I specialize in portraits, urban photography and sessions for artists. I capture the essence of each person through my lens, offering professional, high-quality work.",
    about_p3: "My goal is to take my music worldwide while offering exceptional photographic service.",

    // Discography
    disc_eyebrow: "My music",
    disc_title: "Discography",
    disc_listen_now: 'Listen to "Diferentes Caminos" on Spotify',

    // Social
    social_eyebrow: "Follow me",
    social_title: "Social media",

    // Features
    feature1_title: "Original music",
    feature1_desc: "Unique creations blending trap, reggaeton and rap with a personal, unmistakable style.",
    feature2_title: "Professional photography",
    feature2_desc: "High-quality photo sessions for artists, portraits and urban photography.",
    feature3_title: "Booking available",
    feature3_desc: "Concerts, musical collaborations and photo sessions. Contact me.",

    // Booking
    booking_eyebrow: "Booking",
    booking_title: "Work together?",
    booking_desc: "For concerts, musical collaborations, photo sessions or any professional inquiry, contact me.",
    booking_music: "Music / Concerts",
    booking_email: "Professional email",
    booking_photo: "Photo Sessions",
    booking_retratos: "Portraits",
    booking_urbano: "Urban",

    // Form
    form_title: "Request information",
    form_subtitle: "Fill in the fields and I'll reply within 24h",
    form_name: "First name",
    form_lastname: "Last name",
    form_email: "Email",
    form_phone: "Phone / WhatsApp",
    form_subject: "Inquiry type",
    form_budget: "Estimated budget",
    form_message: "Message",
    form_privacy: "I accept the privacy policy",
    form_submit: "Request a free quote",
    form_success: "Inquiry sent successfully! I'll reply within 24 hours.",
    form_error: "Error sending. Please try again.",

    // Contact
    contact_eyebrow: "Contact",
    contact_title: "Find me",

    // Footer
    footer_desc: "Urban music artist and professional photographer.",
    footer_nav: "Navigation",
    footer_contact: "Contact",
    footer_legal: "Legal",
    footer_copyright: "All rights reserved",

    // Select
    select_option: "Select an option",

    // Collaborations (new)
    colab_eyebrow: "Collaborations",
    colab_title: "I've worked with them",
    colab_role_photographer: "Photographer",
    colab_role_producer: "Producer",
    colab_role_artist: "Artist",
    colab_role_model: "Model"
  }
};

let currentLang = localStorage.getItem('idioma') || 'es';

export function t(key) {
  return translations[currentLang]?.[key] || key;
}

export function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('idioma', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang]?.[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[lang][key];
      } else if (el.tagName === 'SELECT' && el.options && key === 'select_option') {
        el.options[0].text = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });
  showToast(`Idioma cambiado a ${lang === 'es' ? 'Español' : 'English'}`);
}

export function initI18n() {
  setLanguage(currentLang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      setLanguage(lang);
    });
  });
}