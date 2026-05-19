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
// MÓDULO: SPLASH - FADE OUT + FADE IN SIMULTÁNEO (TRANSICIÓN INVISIBLE)
// El splash se desvanece mientras la web aparece, sin que se note el cambio
// ========================================

const SplashModule = (() => {
  let animationId = null;
  let particles = [];
  let canvas, ctx;
  let isExiting = false;
  let logoImage = null;
  let logoLoaded = false;
  let startTime = null;
  let exitProgress = 0;
  const DURATION = 2800;
  const EXIT_DURATION = 1000; // 1 segundo para fade out/in
  
  function init() {
    const splash = document.getElementById('splash');
    if (!splash) return;
    
    canvas = document.getElementById('galaxyCanvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    
    // Ocultar contenido principal inicialmente
    const mainContent = document.getElementById('main-content');
    const header = document.getElementById('header');
    const footer = document.querySelector('.footer');
    
    if (mainContent) {
      mainContent.style.opacity = '0';
      mainContent.style.transition = 'opacity 0.01s'; // transición instantánea al inicio
    }
    if (header) {
      header.style.opacity = '0';
      header.style.transition = 'opacity 0.01s';
    }
    if (footer) {
      footer.style.opacity = '0';
      footer.style.transition = 'opacity 0.01s';
    }
    
    // Cargar logo
    logoImage = new Image();
    logoImage.onload = () => {
      logoLoaded = true;
      console.log('✅ Logo cargado');
    };
    logoImage.src = 'images/logo-white.webp';
    
    resizeCanvas();
    createParticles();
    startTime = performance.now();
    animate();
    
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
    
    document.body.style.overflow = 'hidden';
    splash.addEventListener('click', () => exitSplash());
    
    setTimeout(() => exitSplash(), DURATION + 500);
  }
  
  function createParticles() {
    particles = [];
    const colors = ['#a855f7', '#c084fc', '#fbbf24', '#fcd34d', '#ffffff', '#e9d5ff'];
    
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3.5 + 1.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.5 + 0.3,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        spin: 0.005 + Math.random() * 0.015
      });
    }
  }
  
  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function drawBackground() {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#050510');
    grad.addColorStop(0.5, '#080818');
    grad.addColorStop(1, '#000000');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.globalAlpha = 0.12;
    const centerGrad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width/2);
    centerGrad.addColorStop(0, '#a855f7');
    centerGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = centerGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
  }
  
  function drawParticles() {
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += p.pulseSpeed;
      p.angle += p.spin;
      
      if (p.x < -100) p.x = canvas.width + 100;
      if (p.x > canvas.width + 100) p.x = -100;
      if (p.y < -100) p.y = canvas.height + 100;
      if (p.y > canvas.height + 100) p.y = -100;
      
      const pulseScale = 0.6 + Math.sin(p.pulse) * 0.4;
      const size = p.size * pulseScale;
      const opacity = p.alpha + Math.sin(p.pulse) * 0.15;
      
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.shadowBlur = size * 2;
      ctx.shadowColor = p.color;
      
      ctx.beginPath();
      for (let s = 0; s < 4; s++) {
        const angle = (s * Math.PI * 2) / 4;
        const x1 = Math.cos(angle) * size;
        const y1 = Math.sin(angle) * size;
        const x2 = Math.cos(angle + Math.PI / 4) * size * 0.4;
        const y2 = Math.sin(angle + Math.PI / 4) * size * 0.4;
        if (s === 0) ctx.moveTo(x1, y1);
        else ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.closePath();
      
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.min(opacity, 0.7) * (1 - exitProgress);
      ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }
  
  function drawLogo() {
    if (!logoLoaded || !logoImage) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const logoSize = 250;
    
    const elapsed = performance.now() - startTime;
    let progress = Math.min(elapsed / DURATION, 1);
    
    const blurAmount = Math.max(0, 20 * (1 - progress));
    const opacity = Math.min(progress * 1.2, 1);
    const scale = 0.9 + (progress * 0.1);
    const scaledSize = logoSize * scale;
    
    let finalOpacity = opacity * (1 - exitProgress);
    
    ctx.save();
    ctx.shadowBlur = blurAmount;
    ctx.shadowColor = '#ffffff';
    ctx.globalAlpha = finalOpacity;
    ctx.drawImage(logoImage, centerX - scaledSize/2, centerY - scaledSize/2, scaledSize, scaledSize);
    ctx.restore();
  }
  
  let exitStartTime = 0;
  let exitAnimationRunning = false;
  
  function startExit() {
    if (exitAnimationRunning) return;
    exitAnimationRunning = true;
    exitStartTime = performance.now();
    exitProgress = 0;
    
    // Configurar transiciones suaves para el contenido principal
    const mainContent = document.getElementById('main-content');
    const header = document.getElementById('header');
    const footer = document.querySelector('.footer');
    
    if (mainContent) {
      mainContent.style.transition = `opacity ${EXIT_DURATION}ms ease`;
    }
    if (header) {
      header.style.transition = `opacity ${EXIT_DURATION}ms ease`;
    }
    if (footer) {
      footer.style.transition = `opacity ${EXIT_DURATION}ms ease`;
    }
    
    // Iniciar fade out del splash y fade in de la web SIMULTÁNEAMENTE
    const exitInterval = setInterval(() => {
      const elapsed = performance.now() - exitStartTime;
      exitProgress = Math.min(elapsed / EXIT_DURATION, 1);
      
      // El contenido de la web aparece al mismo ritmo que el splash desaparece
      const webOpacity = exitProgress;
      
      if (mainContent) mainContent.style.opacity = webOpacity;
      if (header) header.style.opacity = webOpacity;
      if (footer) footer.style.opacity = webOpacity;
      
      if (exitProgress >= 1) {
        clearInterval(exitInterval);
        
        // Ocultar splash completamente
        const splash = document.getElementById('splash');
        if (splash) splash.style.display = 'none';
        
        document.body.style.overflow = 'auto';
        if (animationId) cancelAnimationFrame(animationId);
      }
    }, 16);
  }
  
  function exitSplash() {
    if (isExiting) return;
    isExiting = true;
    startExit();
  }
  
  function animate() {
    if (!ctx) return;
    drawBackground();
    drawParticles();
    drawLogo();
    animationId = requestAnimationFrame(animate);
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
// MÓDULO: CARRUSEL HORIZONTAL CON AUTOPLAY
// ========================================
const CarruselModule = (() => {
  let currentIndex = 0;
  let cardWidth = 0;
  let totalCards = 0;
  let autoplayInterval = null;
  let isHovering = false;
  
  function init() {
    const track = document.getElementById('carruselTrack');
    const cards = document.querySelectorAll('.carrusel-horizontal__card');
    const prevBtn = document.getElementById('carruselPrev');
    const nextBtn = document.getElementById('carruselNext');
    const dotsContainer = document.getElementById('carruselDots');
    
    if (!track || !cards.length) {
      console.warn('Carrusel: No se encontraron elementos');
      return;
    }
    
    // Pequeño delay para asegurar que todo está renderizado
    setTimeout(() => {
      updateDimensions();
      
      if (cardWidth === 0) {
        console.warn('Carrusel: cardWidth es 0, reintentando...');
        updateDimensions();
      }
      
      // Crear dots
      dotsContainer.innerHTML = '';
      cards.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Colaboración ${i + 1}`);
        dot.addEventListener('click', () => {
          scrollToCard(i);
          resetAutoplay();
        });
        dotsContainer.appendChild(dot);
      });
      
      prevBtn?.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
      });
      
      nextBtn?.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
      
      // Pausar autoplay al hover
      track.addEventListener('mouseenter', () => {
        isHovering = true;
        stopAutoplay();
      });
      
      track.addEventListener('mouseleave', () => {
        isHovering = false;
        startAutoplay();
      });
      
      // Touch events para móvil
      track.addEventListener('touchstart', () => {
        stopAutoplay();
      });
      
      track.addEventListener('touchend', () => {
        setTimeout(() => {
          if (!isHovering) startAutoplay();
        }, 2000);
      });
      
      window.addEventListener('resize', Utils.debounce(() => {
        updateDimensions();
        scrollToCard(currentIndex);
      }, 150));
      
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { prevSlide(); resetAutoplay(); }
        if (e.key === 'ArrowRight') { nextSlide(); resetAutoplay(); }
      });
      
      // Iniciar autoplay
      startAutoplay();
      
      console.log('🎠 Carrusel iniciado - ' + totalCards + ' cards - Autoplay: 3s');
      
    }, 500);
  }
  
  function updateDimensions() {
    const cards = document.querySelectorAll('.carrusel-horizontal__card');
    if (cards.length && cards[0].offsetWidth > 0) {
      const style = window.getComputedStyle(cards[0]);
      cardWidth = cards[0].offsetWidth + parseInt(style.marginRight || 0) + parseInt(style.marginLeft || 0);
      totalCards = cards.length;
    }
  }
  
  function scrollToCard(index) {
    if (cardWidth === 0) {
      updateDimensions();
    }
    const container = document.querySelector('.carrusel-horizontal__track');
    if (container && cardWidth > 0) {
      container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
      currentIndex = index;
      updateDots();
    }
  }
  
  function nextSlide() {
    updateDimensions();
    if (totalCards === 0) return;
    if (currentIndex < totalCards - 1) {
      scrollToCard(currentIndex + 1);
    } else {
      scrollToCard(0);
    }
  }
  
  function prevSlide() {
    updateDimensions();
    if (totalCards === 0) return;
    if (currentIndex > 0) {
      scrollToCard(currentIndex - 1);
    } else {
      scrollToCard(totalCards - 1);
    }
  }
  
  function updateDots() {
    document.querySelectorAll('.carrusel-horizontal__dots .dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }
  
  function startAutoplay() {
    stopAutoplay();
    if (totalCards <= 1) return;
    autoplayInterval = setInterval(() => {
      if (!isHovering && document.visibilityState === 'visible') {
        nextSlide();
      }
    }, 3000);
  }
  
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }
  
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }
  
  return { init };
})();

/// ========================================
// MÓDULO: FORMULARIO
// ========================================
const FormModule = (() => {
  function init() {
    const form = document.getElementById('bookingForm');
    const successDiv = document.getElementById('formSuccess');
    const errorDiv = document.getElementById('formError');
    const inputs = document.querySelectorAll('.form-control[required], .form-select[required]');
    
    if (!form) return;
    
    // Validación en tiempo real
    inputs.forEach(input => {
      input.addEventListener('blur', () => validarCampo(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
          validarCampo(input);
        }
      });
    });
    
    function validarCampo(input) {
      if (!input.value.trim()) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        return false;
      }
      
      if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
          input.classList.add('invalid');
          input.classList.remove('valid');
          return false;
        }
      }
      
      if (input.id === 'phone') {
        const phoneRegex = /^[+]?[\d\s]{7,15}$/;
        if (!phoneRegex.test(input.value.trim())) {
          input.classList.add('invalid');
          input.classList.remove('valid');
          return false;
        }
      }
      
      input.classList.remove('invalid');
      input.classList.add('valid');
      return true;
    }
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validar todos los campos antes de enviar
      let todoValido = true;
      inputs.forEach(input => {
        if (!validarCampo(input)) {
          todoValido = false;
        }
      });
      
      // Validar checkbox de privacidad
      const privacy = document.getElementById('privacy');
      if (privacy && !privacy.checked) {
        privacy.parentElement.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
          privacy.parentElement.style.animation = '';
        }, 500);
        todoValido = false;
      }
      
      if (!todoValido) {
        Utils.showToast('❌ Revisa los campos marcados en rojo', 'error');
        return;
      }
      
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
          // Limpiar validaciones visuales
          inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
          });
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