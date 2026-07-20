import { showToast } from './utils.js';

const translations = {
  es: {
    // Navegación
    nav_about: "Biografía",
    nav_music: "Música",
    nav_booking: "Contacto",
    nav_contact: "Contacto",
    header_subtitle: "Volver al inicio",

    // Hero y CTAs
    hero_desc: "Artista musical · Fotógrafo profesional · Desarrollador web",
    hero_btn1: "Escuchar música",
    hero_btn_colab: "Ver colaboraciones",
    hero_btn_dev: "Desarrollo web",
    about_cta_dev: "Desarrollo",
    share_text: "Comparte mi música",
    share_twitter: "Twitter",
    share_facebook: "Facebook",
    share_whatsapp: "WhatsApp",
    share_copy: "Copiar link",

    // About
    about_eyebrow: "Mi historia",
    about_title: "Música · Fotografía · Código",
    about_p1: "Soy RAFA 930, artista de música urbana, fotógrafo profesional y desarrollador web.",
    about_p2: "Tres disciplinas que se alimentan entre sí para crear experiencias únicas.",
    about_p3: "Como músico, fusiono trap, reggaetón y rap con un sonido propio.",
    about_p4: "Como fotógrafo, capturo la esencia de cada persona en retratos, sesiones urbanas y proyectos editoriales.",
    about_p5: "Como desarrollador, construyo páginas web, portfolios y tiendas online con inteligencia artificial.",
    about_p6: "Mi objetivo es llevar mi arte a todo el mundo y, al mismo tiempo, ayudar a otros creadores a tener presencia digital profesional.",

    // Discografía
    disc_eyebrow: "Mi música",
    disc_title: "Discografía",
    disc_single: "SINGLE",
    disc_ep: "EP",
    disc_album: "ÁLBUM",
    disc_soon: "Próximamente",
    disc_btn_youtube: "YouTube",
    disc_listen_now: 'Escucha "Diferentes Caminos" en Spotify',

    // Social
    social_eyebrow: "Sígueme",
    social_title: "Redes sociales",
    social_instagram: "Instagram",
    social_spotify: "Spotify",
    social_youtube: "YouTube",
    social_links: "Enlaces",

    // Features
    feature1_title: "Música original",
    feature1_desc: "Trap, reggaetón y rap con un estilo personal. Conciertos, colaboraciones y producción musical.",
    feature2_title: "Fotografía profesional",
    feature2_desc: "Retratos, sesiones urbanas, fotografía editorial y sesiones para artistas. Calidad y creatividad.",
    feature3_title: "Desarrollo web con IA",
    feature3_desc: "Páginas web, portfolios, presskits y tiendas online con diseño único, entrega rápida y precio justo.",

    // Booking
    booking_eyebrow: "Contacto",
    booking_title: "¿Trabajamos juntos?",
    booking_desc: "Para conciertos, sesiones fotográficas, desarrollo web o cualquier consulta profesional, contáctame.",
    booking_music: "Música / Conciertos",
    booking_email: "Email profesional",
    booking_instagram: "Instagram",
    booking_photo: "Fotografía",
    booking_retratos: "Retratos",
    booking_retratos_desc: "Fotografía de estudio, exteriores y conceptual",
    booking_urbano: "Urbano",
    booking_urbano_desc: "Sesiones en entornos urbanos",
    booking_dev: "Desarrollo Web",
    booking_web_pages: "Páginas web",
    booking_web_pages_desc: "Landing pages, portfolios y webs corporativas",
    booking_stores: "Tiendas online",
    booking_stores_desc: "Ecommerce con catálogo, carrito y pasarela de pago",
    booking_presskits: "Presskits artísticos",
    booking_presskits_desc: "Dossier digital con música, rider y formulario de booking",
    booking_dev_btn: "Ver todos los servicios de desarrollo",

    // Formulario
    form_title: "Solicitar información",
    form_subtitle: "Rellena los campos y te responderé en menos de 24h",
    form_name: "Nombre",
    form_name_placeholder: "ej: Rafa",
    form_lastname: "Apellidos",
    form_email: "Email",
    form_email_placeholder: "tu@email.com",
    form_phone: "Teléfono / WhatsApp",
    form_phone_placeholder: "+34 123 456 789",
    form_optional: "(opcional)",
    form_subject: "Tipo de consulta",
    form_budget: "Presupuesto estimado",
    form_message: "Mensaje",
    form_message_placeholder: "Cuéntame tu idea...",
    form_privacy: "Acepto la política de privacidad",
    form_submit: "Enviar mensaje",
    form_success: "¡Consulta enviada con éxito! Te responderé en menos de 24 horas.",
    form_error: "Error al enviar. Intenta de nuevo.",

    // Select
    select_option: "Selecciona una opción",
    form_option_concert: "🎤 Concierto / Show",
    form_option_colab: "🎵 Colaboración musical",
    form_option_photo: "📸 Sesión fotográfica",
    form_option_web: "💻 Desarrollo web",
    form_option_other: "💼 Otros",

    // Contacto
    contact_eyebrow: "Contacto",
    contact_title: "Encuéntrame",
    contact_email_label: "Email",
    contact_instagram_label: "Instagram",
    contact_spotify_label: "Spotify",
    contact_youtube_label: "YouTube",
    contact_webdev_label: "Desarrollo Web",
    contact_webdev_link: "930 Digital",
    contact_escuchar: "Escuchar ahora",
    contact_suscribirse: "Suscribirse",

    // Footer
    footer_desc: "Artista musical · Fotógrafo profesional · Desarrollador web",
    footer_nav: "Navegación",
    footer_contact: "Contacto",
    footer_legal: "Legal",
    footer_links: "Enlaces",
    footer_copyright: "Todos los derechos reservados",

    // Colaboradores
    colab_eyebrow: "Colaboraciones",
    colab_title: "He trabajado con <span class=\"text-gradient\">ellos</span>",
    colab_view: "Ver",
    colab_role_photographer: "Fotógrafo",
    colab_role_producer: "Productor",
    colab_role_artist: "Artista",
    colab_role_model: "Modelo",

    // Cookie banner
    cookie_text: "🍪 Usamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra <a href=\"cookies.html\">Política de Cookies</a>.",
    cookie_accept: "Aceptar",
    cookie_reject: "Rechazar"
  },

  en: {
    // Navigation
    nav_about: "Biography",
    nav_music: "Music",
    nav_booking: "Contact",
    nav_contact: "Contact",
    header_subtitle: "Back to home",

    // Hero and CTAs
    hero_desc: "Music artist · Professional photographer · Web developer",
    hero_btn1: "Listen to music",
    hero_btn_colab: "View collaborations",
    hero_btn_dev: "Web development",
    about_cta_dev: "Development",
    share_text: "Share my music",
    share_twitter: "Twitter",
    share_facebook: "Facebook",
    share_whatsapp: "WhatsApp",
    share_copy: "Copy link",

    // About
    about_eyebrow: "My story",
    about_title: "Music · Photography · Code",
    about_p1: "I'm RAFA 930, a urban music artist, professional photographer and web developer.",
    about_p2: "Three disciplines that feed each other to create unique experiences.",
    about_p3: "As a musician, I blend trap, reggaeton and rap with my own sound.",
    about_p4: "As a photographer, I capture the essence of each person in portraits, urban sessions and editorial projects.",
    about_p5: "As a developer, I build websites, portfolios and online stores with artificial intelligence.",
    about_p6: "My goal is to take my art worldwide and, at the same time, help other creators to have a professional digital presence.",

    // Discography
    disc_eyebrow: "My music",
    disc_title: "Discography",
    disc_single: "SINGLE",
    disc_ep: "EP",
    disc_album: "ALBUM",
    disc_soon: "Coming soon",
    disc_btn_youtube: "YouTube",
    disc_listen_now: 'Listen to "Diferentes Caminos" on Spotify',

    // Social
    social_eyebrow: "Follow me",
    social_title: "Social media",
    social_instagram: "Instagram",
    social_spotify: "Spotify",
    social_youtube: "YouTube",
    social_links: "Links",

    // Features
    feature1_title: "Original music",
    feature1_desc: "Trap, reggaeton and rap with a personal style. Concerts, collaborations and music production.",
    feature2_title: "Professional photography",
    feature2_desc: "Portraits, urban sessions, editorial photography and sessions for artists. Quality and creativity.",
    feature3_title: "Web development with AI",
    feature3_desc: "Websites, portfolios, presskits and online stores with unique design, fast delivery and fair price.",

    // Booking
    booking_eyebrow: "Contact",
    booking_title: "Work together?",
    booking_desc: "For concerts, photo sessions, web development or any professional inquiry, contact me.",
    booking_music: "Music / Concerts",
    booking_email: "Professional email",
    booking_instagram: "Instagram",
    booking_photo: "Photography",
    booking_retratos: "Portraits",
    booking_retratos_desc: "Studio, outdoor and conceptual photography",
    booking_urbano: "Urban",
    booking_urbano_desc: "Sessions in urban environments",
    booking_dev: "Web Development",
    booking_web_pages: "Websites",
    booking_web_pages_desc: "Landing pages, portfolios and corporate websites",
    booking_stores: "Online stores",
    booking_stores_desc: "Ecommerce with catalog, cart and payment gateway",
    booking_presskits: "Artistic presskits",
    booking_presskits_desc: "Digital dossier with music, rider and booking form",
    booking_dev_btn: "View all development services",

    // Form
    form_title: "Request information",
    form_subtitle: "Fill in the fields and I'll reply within 24h",
    form_name: "First name",
    form_name_placeholder: "e.g. Rafa",
    form_lastname: "Last name",
    form_email: "Email",
    form_email_placeholder: "your@email.com",
    form_phone: "Phone / WhatsApp",
    form_phone_placeholder: "+34 123 456 789",
    form_optional: "(optional)",
    form_subject: "Inquiry type",
    form_budget: "Estimated budget",
    form_message: "Message",
    form_message_placeholder: "Tell me your idea...",
    form_privacy: "I accept the privacy policy",
    form_submit: "Send message",
    form_success: "Inquiry sent successfully! I'll reply within 24 hours.",
    form_error: "Error sending. Please try again.",

    // Select
    select_option: "Select an option",
    form_option_concert: "🎤 Concert / Show",
    form_option_colab: "🎵 Musical collaboration",
    form_option_photo: "📸 Photo session",
    form_option_web: "💻 Web development",
    form_option_other: "💼 Other",

    // Contact
    contact_eyebrow: "Contact",
    contact_title: "Find me",
    contact_email_label: "Email",
    contact_instagram_label: "Instagram",
    contact_spotify_label: "Spotify",
    contact_youtube_label: "YouTube",
    contact_webdev_label: "Web Development",
    contact_webdev_link: "930 Digital",
    contact_escuchar: "Listen now",
    contact_suscribirse: "Subscribe",

    // Footer
    footer_desc: "Music artist · Professional photographer · Web developer",
    footer_nav: "Navigation",
    footer_contact: "Contact",
    footer_legal: "Legal",
    footer_links: "Links",
    footer_copyright: "All rights reserved",

    // Collaborations
    colab_eyebrow: "Collaborations",
    colab_title: "I've worked with <span class=\"text-gradient\">them</span>",
    colab_view: "View",
    colab_role_photographer: "Photographer",
    colab_role_producer: "Producer",
    colab_role_artist: "Artist",
    colab_role_model: "Model",

    // Cookie banner
    cookie_text: "🍪 We use cookies to improve your experience. By continuing to browse, you accept our <a href=\"cookies.html\">Cookie Policy</a>.",
    cookie_accept: "Accept",
    cookie_reject: "Reject"
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
        el.innerHTML = translations[lang][key];
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