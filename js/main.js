/* ========================================
   RAFA 930 - PREMIUM JAVASCRIPT
   Versión: 7.0.0 | Awwwards/FWA Ready
   Módulos: Splash, Header, Theme, i18n, 
            Lightbox, Carrusel, Share, Form
   Rendimiento: Intersection Observer, 
                Passive Events, Debounce
   Accesibilidad: ARIA, Focus Management,
                  Reduced Motion Respect
   ======================================== */

'use strict';

// ========================================
// MÓDULO: UTILIDADES GLOBALES
// ========================================
const Utils = {
  // Debounce para eventos de scroll/resize
  debounce(fn, delay = 100) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  },
  
  // Verificar prefers-reduced-motion
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  
  // Mostrar toast
  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}" aria-hidden="true"></i><span>${message}</span>`;
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    });
  },
  
  // Mostrar toast de compartir
  showShareToast(message) {
    const oldToast = document.querySelector('.share-toast');
    if (oldToast) oldToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'share-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `<i class="fas fa-check-circle" aria-hidden="true"></i> ${message}`;
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 2000);
      }, 2000);
    });
  }
};

// ========================================
// MÓDULO: SPLASH GALAXIA ÉLITE
// Partículas 3D + Estrellas fugaces + Parallax
// ========================================
const SplashModule = (() => {
  let animationId = null;
  let particulas = [];
  let estrellasFugaces = [];
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let canvas, ctx;
  
  const CANTIDAD_PARTICULAS = 250;
  const ESTRELLAS_FUGACES_MAX = 3;
  
  function init() {
    const splash = document.getElementById('splash');
    if (!splash) return;
    
    // Si ya visitó, saltar splash
    if (sessionStorage.getItem('splash_seen')) {
      splash.style.display = 'none';
      document.body.style.overflow = 'auto';
      return;
    }
    
    canvas = document.getElementById('galaxyCanvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    
    resizeCanvas();
    crearParticulas();
    animar();
    
    // Event listeners
    window.addEventListener('resize', () => {
      if (animationId) cancelAnimationFrame(animationId);
      resizeCanvas();
      animar();
    });
    
    canvas.addEventListener('mousemove', onMouseMove, { passive: true });
    
    document.body.style.overflow = 'hidden';
    
    splash.addEventListener('click', cerrarSplash);
    document.addEventListener('keydown', (e) => {
      if (splash.style.display !== 'none' && (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ')) {
        e.preventDefault();
        cerrarSplash();
      }
    });
    
    // Crear estrellas fugaces periódicamente
    setInterval(() => {
      if (splash.style.display !== 'none' && Math.random() < 0.3) {
        crearEstrellaFugaz();
      }
    }, 2000);
  }
  
  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function crearParticulas() {
    particulas = [];
    const colores = [
      '#a855f7', '#c084fc', '#e9d5ff',
      '#fbbf24', '#fcd34d', '#fef3c7',
      '#ffffff', '#e0e7ff', '#ddd6fe'
    ];
    
    for (let i = 0; i < CANTIDAD_PARTICULAS; i++) {
      const color = colores[Math.floor(Math.random() * colores.length)];
      const sizeType = Math.random();
      let radio, brillo, speedMultiplier;
      
      if (sizeType < 0.7) {
        radio = Math.random() * 2 + 0.5;
        brillo = 0.3 + Math.random() * 0.4;
        speedMultiplier = 0.5;
      } else if (sizeType < 0.9) {
        radio = Math.random() * 4 + 2;
        brillo = 0.5 + Math.random() * 0.4;
        speedMultiplier = 0.3;
      } else {
        radio = Math.random() * 6 + 4;
        brillo = 0.7 + Math.random() * 0.3;
        speedMultiplier = 0.1;
      }
      
      particulas.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radio: radio,
        brillo: brillo,
        velocidadX: (Math.random() - 0.5) * 0.4 * speedMultiplier,
        velocidadY: (Math.random() - 0.5) * 0.2 * speedMultiplier + 0.1,
        color: color,
        alpha: 0.4 + Math.random() * 0.6,
        parpadeo: Math.random() * Math.PI * 2,
        velocidadParpadeo: 0.005 + Math.random() * 0.02,
        profundidad: Math.random()
      });
    }
    
    particulas.sort((a, b) => a.profundidad - b.profundidad);
  }
  
  function crearEstrellaFugaz() {
    if (estrellasFugaces.length >= ESTRELLAS_FUGACES_MAX) return;
    
    const angulo = Math.PI / 4 + (Math.random() - 0.5) * Math.PI / 2;
    const velocidad = 8 + Math.random() * 15;
    const longitud = 80 + Math.random() * 150;
    
    estrellasFugaces.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.5,
      vx: Math.cos(angulo) * velocidad,
      vy: Math.sin(angulo) * velocidad,
      longitud: longitud,
      alpha: 0.8 + Math.random() * 0.2,
      vida: 40 + Math.random() * 40,
      edad: 0
    });
  }
  
  function dibujarFondo() {
    const gradiente = ctx.createRadialGradient(
      window.innerWidth / 2, window.innerHeight / 2, 0,
      window.innerWidth / 2, window.innerHeight / 2, Math.max(window.innerWidth, window.innerHeight)
    );
    gradiente.addColorStop(0, '#0a0a2e');
    gradiente.addColorStop(0.4, '#0d0d35');
    gradiente.addColorStop(0.8, '#050515');
    gradiente.addColorStop(1, '#000000');
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }
  
  function dibujarParticulas() {
    for (let i = 0; i < particulas.length; i++) {
      const p = particulas[i];
      
      const parpadeo = 0.4 + Math.sin(p.parpadeo) * 0.4 + Math.cos(p.parpadeo * 1.7) * 0.2;
      const alphaFinal = Math.max(0, Math.min(1, p.alpha * parpadeo * p.brillo));
      
      // Glow radial
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radio * 3);
      gradient.addColorStop(0, p.color);
      gradient.addColorStop(0.3, p.color);
      gradient.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radio * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.globalAlpha = alphaFinal * 0.4;
      ctx.fill();
      
      // Núcleo brillante
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = alphaFinal;
      ctx.fill();
      
      // Parallax hacia el ratón
      const dx = p.x - targetMouseX;
      const dy = p.y - targetMouseY;
      const distancia = Math.sqrt(dx * dx + dy * dy);
      const maxDistancia = 300;
      
      if (distancia < maxDistancia) {
        const fuerza = (1 - distancia / maxDistancia) * p.profundidad;
        p.x += dx * fuerza * 0.02;
        p.y += dy * fuerza * 0.02;
      }
      
      // Movimiento normal
      p.x += p.velocidadX;
      p.y += p.velocidadY;
      p.parpadeo += p.velocidadParpadeo;
      
      // Wrap around
      if (p.x < -50) p.x = window.innerWidth + 50;
      if (p.x > window.innerWidth + 50) p.x = -50;
      if (p.y < -50) p.y = window.innerHeight + 50;
      if (p.y > window.innerHeight + 50) p.y = -50;
    }
    ctx.globalAlpha = 1;
  }
  
  function dibujarEstrellasFugaces() {
    for (let i = estrellasFugaces.length - 1; i >= 0; i--) {
      const e = estrellasFugaces[i];
      e.edad++;
      
      if (e.edad >= e.vida) {
        estrellasFugaces.splice(i, 1);
        continue;
      }
      
      const progreso = e.edad / e.vida;
      const alphaFade = progreso < 0.2 ? progreso / 0.2 : (1 - progreso) / 0.8;
      
      const x2 = e.x - e.vx * e.longitud * 0.05;
      const y2 = e.y - e.vy * e.longitud * 0.05;
      
      const starGradient = ctx.createLinearGradient(e.x, e.y, x2, y2);
      starGradient.addColorStop(0, 'rgba(255,255,255,' + (alphaFade * 0.8) + ')');
      starGradient.addColorStop(1, 'rgba(168,85,247,0)');
      
      ctx.beginPath();
      ctx.moveTo(e.x, e.y);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = starGradient;
      ctx.lineWidth = 2;
      ctx.globalAlpha = alphaFade;
      ctx.stroke();
      
      e.x += e.vx;
      e.y += e.vy;
    }
    ctx.globalAlpha = 1;
  }
  
  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    targetMouseX = e.clientX - rect.left;
    targetMouseY = e.clientY - rect.top;
  }
  
  function animar() {
    if (!ctx) return;
    
    // Suavizar movimiento del ratón
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;
    
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    dibujarFondo();
    dibujarParticulas();
    dibujarEstrellasFugaces();
    
    animationId = requestAnimationFrame(animar);
  }
  
  function cerrarSplash() {
    const splash = document.getElementById('splash');
    if (!splash) return;
    
    splash.classList.add('exit');
    
    setTimeout(() => {
      splash.style.display = 'none';
      document.body.style.overflow = 'auto';
      if (animationId) cancelAnimationFrame(animationId);
      sessionStorage.setItem('splash_seen', 'true');
    }, 1200);
  }
  
  return { init };
})();

// ========================================
// MÓDULO: HEADER SCROLL
// ========================================
const HeaderModule = (() => {
  let lastScroll = 0;
  
  function init() {
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', Utils.debounce(() => {
      const currentScroll = window.scrollY;
      
      // Header
      if (currentScroll > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
      
      // Back to top
      if (currentScroll > 500) {
        backToTop?.classList.add('visible');
      } else {
        backToTop?.classList.remove('visible');
      }
      
      // Parallax hero
      const heroBg = document.getElementById('heroBg');
      if (heroBg && !Utils.prefersReducedMotion()) {
        heroBg.style.transform = `translateY(${currentScroll * 0.5}px)`;
      }
      
      lastScroll = currentScroll;
    }, 16)); // ~60fps
    
    backToTop?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: Utils.prefersReducedMotion() ? 'auto' : 'smooth' });
      Utils.showToast('Volviendo al inicio 🚀');
    });
  }
  
  return { init };
})();

// ========================================
// MÓDULO: MOBILE MENU
// ========================================
const MobileMenuModule = (() => {
  function init() {
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('closeBtn');
    
    if (!burgerBtn || !mobileMenu) return;
    
    burgerBtn.addEventListener('click', () => {
      const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
      mobileMenu.classList.toggle('active');
      burgerBtn.setAttribute('aria-expanded', !isExpanded);
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });
    
    closeBtn?.addEventListener('click', cerrarMenu);
    
    document.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', cerrarMenu);
    });
    
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) cerrarMenu();
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        cerrarMenu();
      }
    });
  }
  
  function cerrarMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const burgerBtn = document.getElementById('burgerBtn');
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  
  return { init };
})();

// ========================================
// MÓDULO: THEME TOGGLE
// ========================================
const ThemeModule = (() => {
  function init() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      themeToggle.classList.remove('light');
    }
    
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark');
      
      if (isDark) {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        themeToggle.classList.remove('light');
        localStorage.setItem('theme', 'light');
        Utils.showToast('Modo claro activado ☀️');
      } else {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        themeToggle.classList.add('light');
        localStorage.setItem('theme', 'dark');
        Utils.showToast('Modo oscuro activado 🌙');
      }
    });
  }
  
  return { init };
})();

// ========================================
// MÓDULO: INTERNACIONALIZACIÓN (i18n)
// ========================================
const I18nModule = (() => {
  const traducciones = {
    es: {
      splash_eyebrow: "Bienvenido al universo de",
      splash_sub: "Música · Fotografía",
      splash_click: "HAZ CLIC PARA ENTRAR",
      logo_sub: "Música & Fotografía",
      nav_about: "Biografía",
      nav_music: "Música",
      nav_booking: "Booking",
      nav_contact: "Contacto",
      nav_btn: "Contacto",
      hero_desc: "Artista de música urbana y fotógrafo profesional. Trap, reggaetón, rap y sesiones fotográficas de alta calidad.",
      hero_btn1: "Escuchar música",
      hero_btn_colab: "Ver colaboraciones",
      hero_scroll: "DESCUBRE",
      about_eyebrow: "Mi historia",
      about_title: "Música y fotografía",
      about_p1: "Soy RAFA 930, artista de música urbana en España y fotógrafo profesional. Mi estilo musical combina trap, reggaetón y rap, creando un sonido único que refleja mi vida y mis sueños.",
      about_p2: "Como fotógrafo, me especializo en retratos, fotografía urbana y sesiones para artistas. Capturo la esencia de cada persona a través de mi lente, ofreciendo un trabajo profesional y de alta calidad.",
      about_p3: "Mi objetivo es llevar mi música a todo el mundo y, al mismo tiempo, ofrecer un servicio fotográfico excepcional.",
      disc_eyebrow: "Mi música",
      disc_title: "Discografía",
      soon: "Próximamente",
      disc_desc1: "Un viaje musical que refleja la dualidad de la vida y las decisiones que tomamos.",
      disc_desc2: "Un EP que muestra mi universo musical, con sonidos frescos y letras sinceras.",
      disc_desc3: "Mi próximo álbum. Una celebración de la vida a través de la música urbana.",
      social_eyebrow: "Sígueme",
      social_title: "Redes sociales",
      feature1_title: "Música original",
      feature1_desc: "Creaciones únicas que fusionan trap, reggaetón y rap con un estilo personal e inconfundible.",
      feature2_title: "Fotografía profesional",
      feature2_desc: "Sesiones fotográficas de alta calidad para artistas, retratos y fotografía urbana.",
      feature3_title: "Booking disponible",
      feature3_desc: "Conciertos, colaboraciones musicales y sesiones fotográficas. Contáctame.",
      booking_eyebrow: "Booking",
      booking_title: "¿Trabajamos juntos?",
      booking_desc: "Para conciertos, colaboraciones musicales, sesiones fotográficas o cualquier consulta profesional, contáctame.",
      booking_music: "Música / Conciertos",
      booking_email: "Email profesional",
      booking_photo: "Sesiones Fotográficas",
      booking_retratos: "Retratos",
      booking_urbano: "Urbano",
      form_title: "Solicitar información",
      form_subtitle: "Completa todos los campos y te responderé en menos de 24h",
      form_name: "Nombre",
      form_lastname: "Apellidos",
      form_email: "Email",
      form_phone: "Teléfono / WhatsApp",
      form_subject: "Tipo de consulta",
      form_budget: "Presupuesto estimado",
      form_message: "Mensaje",
      form_privacy: "Acepto la política de privacidad",
      form_submit: "Enviar consulta",
      form_success: "¡Consulta enviada con éxito! Te responderé en menos de 24 horas.",
      form_error: "Error al enviar. Intenta de nuevo.",
      contact_eyebrow: "Contacto",
      contact_title: "Encuéntrame",
      footer_desc: "Artista de música urbana y fotógrafo profesional.",
      footer_nav: "Navegación",
      footer_contact: "Contacto",
      footer_legal: "Legal",
      footer_copyright: "Todos los derechos reservados",
      select_option: "Selecciona una opción"
    },
    en: {
      splash_eyebrow: "Welcome to the universe of",
      splash_sub: "Music · Photography",
      splash_click: "CLICK TO ENTER",
      logo_sub: "Music & Photography",
      nav_about: "Biography",
      nav_music: "Music",
      nav_booking: "Booking",
      nav_contact: "Contact",
      nav_btn: "Contact",
      hero_desc: "Urban music artist and professional photographer. Trap, reggaeton, rap and high quality photo sessions.",
      hero_btn1: "Listen to music",
      hero_btn_colab: "View collaborations",
      hero_scroll: "DISCOVER",
      about_eyebrow: "My story",
      about_title: "Music & Photography",
      about_p1: "I'm RAFA 930, urban music artist in Spain and professional photographer. My musical style combines trap, reggaeton and rap, creating a unique sound that reflects my life and dreams.",
      about_p2: "As a photographer, I specialize in portraits, urban photography and sessions for artists. I capture the essence of each person through my lens, offering professional, high-quality work.",
      about_p3: "My goal is to take my music worldwide while offering exceptional photographic service.",
      disc_eyebrow: "My music",
      disc_title: "Discography",
      soon: "Coming soon",
      disc_desc1: "A musical journey reflecting the duality of life and the decisions we make.",
      disc_desc2: "An EP showing my musical universe, with fresh sounds and sincere lyrics.",
      disc_desc3: "My next album. A celebration of life through urban music.",
      social_eyebrow: "Follow me",
      social_title: "Social media",
      feature1_title: "Original music",
      feature1_desc: "Unique creations blending trap, reggaeton and rap with a personal, unmistakable style.",
      feature2_title: "Professional photography",
      feature2_desc: "High-quality photo sessions for artists, portraits and urban photography.",
      feature3_title: "Booking available",
      feature3_desc: "Concerts, musical collaborations and photo sessions. Contact me.",
      booking_eyebrow: "Booking",
      booking_title: "Work together?",
      booking_desc: "For concerts, musical collaborations, photo sessions or any professional inquiry, contact me.",
      booking_music: "Music / Concerts",
      booking_email: "Professional email",
      booking_photo: "Photo Sessions",
      booking_retratos: "Portraits",
      booking_urbano: "Urban",
      form_title: "Request information",
      form_subtitle: "Fill all fields and I'll reply within 24h",
      form_name: "First name",
      form_lastname: "Last name",
      form_email: "Email",
      form_phone: "Phone / WhatsApp",
      form_subject: "Inquiry type",
      form_budget: "Estimated budget",
      form_message: "Message",
      form_privacy: "I accept the privacy policy",
      form_submit: "Send inquiry",
      form_success: "Inquiry sent successfully! I'll reply within 24 hours.",
      form_error: "Error sending. Please try again.",
      contact_eyebrow: "Contact",
      contact_title: "Find me",
      footer_desc: "Urban music artist and professional photographer.",
      footer_nav: "Navigation",
      footer_contact: "Contact",
      footer_legal: "Legal",
      footer_copyright: "All rights reserved",
      select_option: "Select an option"
    }
  };
  
  let idiomaActual = 'es';
  
  function cambiarIdioma(idioma) {
    idiomaActual = idioma;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (traducciones[idioma]?.[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = traducciones[idioma][key];
        } else {
          el.textContent = traducciones[idioma][key];
        }
      }
    });
    
    localStorage.setItem('idioma', idioma);
  }
  
  function init() {
    const langBtns = document.querySelectorAll('.lang-btn');
    const savedLang = localStorage.getItem('idioma') || 'es';
    
    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        langBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');
        cambiarIdioma(lang);
      });
      
      if (btn.getAttribute('data-lang') === savedLang) {
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');
      }
    });
    
    cambiarIdioma(savedLang);
  }
  
  return { init, cambiarIdioma };
})();

// ========================================
// MÓDULO: SHARE BUTTONS
// ========================================
const ShareModule = (() => {
  function init() {
    const shareButtons = document.querySelectorAll('.share__btn');
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent('Rafa 930 | Música Urbana & Fotografía Profesional');
    
    shareButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const platform = btn.dataset.platform;
        let shareUrl = '';
        
        switch(platform) {
          case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`;
            break;
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
            break;
          case 'whatsapp':
            shareUrl = `https://wa.me/?text=${pageTitle}%20-%20${decodeURIComponent(pageUrl)}`;
            break;
          case 'copy':
            navigator.clipboard.writeText(decodeURIComponent(pageUrl))
              .then(() => Utils.showShareToast('✅ ¡Enlace copiado!'))
              .catch(() => Utils.showShareToast('❌ Error al copiar'));
            return;
        }
        
        if (shareUrl) {
          window.open(shareUrl, '_blank', 'width=600,height=400');
          Utils.showShareToast('📤 Compartiendo...');
        }
      });
    });
  }
  
  return { init };
})();

// ========================================
// MÓDULO: CARRUSEL HORIZONTAL
// ========================================
const CarruselModule = (() => {
  let currentIndex = 0;
  let cardWidth = 0;
  let totalCards = 0;
  
  function init() {
    const track = document.getElementById('carruselTrack');
    const cards = document.querySelectorAll('.carrusel-horizontal__card');
    const prevBtn = document.getElementById('carruselPrev');
    const nextBtn = document.getElementById('carruselNext');
    const dotsContainer = document.getElementById('carruselDots');
    const container = document.querySelector('.carrusel-horizontal__track');
    
    if (!track || !cards.length) return;
    
    updateDimensions();
    
    // Crear dots
    dotsContainer.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot';
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Colaboración ${i + 1}`);
      dot.addEventListener('click', () => scrollToCard(i));
      dotsContainer.appendChild(dot);
    });
    
    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);
    
    container?.addEventListener('scroll', Utils.debounce(() => {
      updateDimensions();
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalCards) {
        currentIndex = newIndex;
        updateDots();
      }
    }, 50));
    
    window.addEventListener('resize', Utils.debounce(updateDimensions, 150));
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });
  }
  
  function updateDimensions() {
    const cards = document.querySelectorAll('.carrusel-horizontal__card');
    if (cards.length) {
      const style = window.getComputedStyle(cards[0]);
      cardWidth = cards[0].offsetWidth + parseInt(style.marginRight || 0) + parseInt(style.marginLeft || 0);
      totalCards = cards.length;
    }
  }
  
  function scrollToCard(index) {
    const container = document.querySelector('.carrusel-horizontal__track');
    container?.scrollTo({ left: index * cardWidth, behavior: Utils.prefersReducedMotion() ? 'auto' : 'smooth' });
    currentIndex = index;
    updateDots();
  }
  
  function nextSlide() {
    if (currentIndex < totalCards - 1) scrollToCard(currentIndex + 1);
  }
  
  function prevSlide() {
    if (currentIndex > 0) scrollToCard(currentIndex - 1);
  }
  
  function updateDots() {
    document.querySelectorAll('.carrusel-horizontal__dots .dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }
  
  return { init };
})();

// ========================================
// MÓDULO: FORMULARIO
// ========================================
const FormModule = (() => {
  function init() {
    const form = document.getElementById('bookingForm');
    const successDiv = document.getElementById('formSuccess');
    const errorDiv = document.getElementById('formError');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn?.innerHTML || 'Enviar';
      
      if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Enviando...';
        btn.disabled = true;
        btn.setAttribute('aria-busy', 'true');
      }
      
      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
          if (successDiv) successDiv.style.display = 'block';
          if (errorDiv) errorDiv.style.display = 'none';
          form.reset();
          Utils.showToast('✅ Consulta enviada con éxito');
          setTimeout(() => { if (successDiv) successDiv.style.display = 'none'; }, 5000);
        } else {
          throw new Error('Error en la respuesta');
        }
      } catch (error) {
        if (errorDiv) errorDiv.style.display = 'block';
        Utils.showToast('❌ Error al enviar, intenta de nuevo', 'error');
        setTimeout(() => { if (errorDiv) errorDiv.style.display = 'none'; }, 5000);
      } finally {
        if (btn) {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.removeAttribute('aria-busy');
        }
      }
    });
  }
  
  return { init };
})();

// ========================================
// MÓDULO: COOKIES
// ========================================
const CookiesModule = (() => {
  function init() {
    if (!localStorage.getItem('cookies_aceptadas')) {
      const banner = document.getElementById('cookieBanner');
      if (banner) banner.style.display = 'block';
    }
    
    window.aceptarCookies = () => {
      localStorage.setItem('cookies_aceptadas', 'true');
      const banner = document.getElementById('cookieBanner');
      if (banner) banner.style.display = 'none';
      Utils.showToast('🍪 Cookies aceptadas');
    };
    
    window.rechazarCookies = () => {
      localStorage.setItem('cookies_aceptadas', 'false');
      const banner = document.getElementById('cookieBanner');
      if (banner) banner.style.display = 'none';
      Utils.showToast('🍪 Cookies rechazadas');
    };
  }
  
  return { init };
})();

// ========================================
// INICIALIZACIÓN PRINCIPAL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar AOS (animaciones scroll)
  AOS.init({ 
    duration: 1000, 
    once: true,
    disable: Utils.prefersReducedMotion() ? true : false
  });
  
  // Inicializar todos los módulos
  SplashModule.init();
  HeaderModule.init();
  MobileMenuModule.init();
  ThemeModule.init();
  I18nModule.init();
  ShareModule.init();
  CarruselModule.init();
  FormModule.init();
  CookiesModule.init();
  
  console.log('🚀 Rafa 930 Premium inicializado - Versión 7.0.0');
});