// ========================================
// INICIALIZACIÓN PRINCIPAL
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({ duration: 1000, once: true });
  initSplashGalaxia();
  initHeaderScroll();
  initMobileMenu();
  initThemeToggle();
  initLanguageSelector();
  initLightbox();
  initFloatingButtons();
  initForm();
  initShareButtons(); // ← Botones de compartir (una sola vez)
});

// ========================================
// SPLASH GALAXIA - LLUVIA DE ESTRELLAS
// ========================================
function initSplashGalaxia() {
  const splash = document.getElementById('splash');
  if (!splash) return;
  
  const canvas = document.getElementById('galaxyCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particulas = [];
  let mouseX = 0, mouseY = 0;
  let tiempo = 0;
  let animationId;
  
  const CANTIDAD_PARTICULAS = 300;
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticulas();
  }
  
  function initParticulas() {
    particulas = [];
    const colores = ['#a855f7', '#fbbf24', '#ffffff', '#c084fc', '#fcd34d', '#e879f9'];
    
    for (let i = 0; i < CANTIDAD_PARTICULAS; i++) {
      const color = colores[Math.floor(Math.random() * colores.length)];
      particulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radio: Math.random() * 3 + 1,
        brillo: 0.3 + Math.random() * 0.7,
        velocidadX: (Math.random() - 0.5) * 0.5,
        velocidadY: (Math.random() - 0.5) * 0.3 + 0.2,
        color: color,
        alpha: 0.4 + Math.random() * 0.6,
        parpadeo: Math.random() * Math.PI * 2,
        velocidadParpadeo: 0.01 + Math.random() * 0.03
      });
    }
  }
  
  function dibujarParticulas() {
    for (let i = 0; i < particulas.length; i++) {
      const p = particulas[i];
      const parpadeo = 0.5 + Math.sin(p.parpadeo) * 0.3;
      const alphaFinal = p.alpha * parpadeo * p.brillo;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = alphaFinal;
      ctx.fill();
      
      p.parpadeo += p.velocidadParpadeo;
      p.x += p.velocidadX;
      p.y += p.velocidadY;
      
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const distancia = Math.sqrt(dx * dx + dy * dy);
      
      if (distancia < 100) {
        const angulo = Math.atan2(dy, dx);
        const fuerza = (100 - distancia) / 100;
        p.x += Math.cos(angulo) * fuerza * 2;
        p.y += Math.sin(angulo) * fuerza * 2;
      }
      
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }
  
  function dibujarFondo() {
    const gradiente = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradiente.addColorStop(0, '#0a0a2a');
    gradiente.addColorStop(0.3, '#150a30');
    gradiente.addColorStop(0.7, '#1a0a3e');
    gradiente.addColorStop(1, '#000000');
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    tiempo += 0.002;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.ellipse(
        canvas.width * (0.2 + Math.sin(tiempo + i) * 0.1),
        canvas.height * (0.5 + Math.cos(tiempo * 0.5 + i) * 0.1),
        250, 150, 0, 0, Math.PI * 2
      );
      ctx.fillStyle = `rgba(168, 85, 247, 0.02)`;
      ctx.fill();
    }
  }
  
  function animar() {
    if (!ctx) return;
    dibujarFondo();
    dibujarParticulas();
    animationId = requestAnimationFrame(animar);
  }
  
  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    mouseX = (e.clientX - rect.left) * scaleX;
    mouseY = (e.clientY - rect.top) * scaleY;
  }
  
  window.addEventListener('resize', resizeCanvas);
  canvas.addEventListener('mousemove', onMouseMove);
  
  resizeCanvas();
  animar();
  
  document.body.style.overflow = 'hidden';
  
  splash.addEventListener('click', () => {
    splash.classList.add('exit');
    setTimeout(() => {
      splash.style.display = 'none';
      document.body.style.overflow = 'auto';
      showToast('✨ ¡Bienvenido a Rafa 930! ✨');
    }, 800);
  });
  
  document.addEventListener('keydown', (e) => {
    if (splash.style.display !== 'none' && (e.key === 'Enter' || e.key === 'Escape')) {
      splash.click();
    }
  });
  
  return () => {
    if (animationId) cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resizeCanvas);
    canvas.removeEventListener('mousemove', onMouseMove);
  };
}

// ========================================
// HEADER SCROLL
// ========================================
function initHeaderScroll() {
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    
    if (window.scrollY > 500) {
      backToTop?.classList.add('visible');
    } else {
      backToTop?.classList.remove('visible');
    }
    
    const heroBg = document.getElementById('heroBg');
    if (heroBg) {
      heroBg.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
  });
  
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Volviendo al inicio 🚀');
  });
}

// ========================================
// THEME TOGGLE
// ========================================
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'light') {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    themeToggle?.classList.remove('light');
  } else {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    themeToggle?.classList.add('light');
  }
  
  function updateToggleIcon() {
    if (!themeToggle) return;
    const isDark = document.body.classList.contains('dark');
    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');
    if (sunIcon) sunIcon.style.opacity = isDark ? '0.5' : '1';
    if (moonIcon) moonIcon.style.opacity = isDark ? '1' : '0.5';
  }
  
  updateToggleIcon();
  
  themeToggle?.addEventListener('click', () => {
    if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      themeToggle.classList.remove('light');
      localStorage.setItem('theme', 'light');
      showToast('Modo claro activado ☀️');
    } else {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      themeToggle.classList.add('light');
      localStorage.setItem('theme', 'dark');
      showToast('Modo oscuro activado 🌙');
    }
    updateToggleIcon();
  });
}

// ========================================
// SELECTOR DE IDIOMA
// ========================================
const traducciones = {
  es: {
    splash_eyebrow: "Bienvenido al universo de",
    splash_sub: "Música · Fotografía",
    splash_click: "HAZ CLIC PARA ENTRAR",
    logo_sub: "Música & Fotografía",
    nav_about: "Biografía",
    nav_music: "Música",
    nav_photo: "Fotografía",
    nav_booking: "Booking",
    nav_contact: "Contacto",
    nav_btn: "Contacto",
    hero_desc: "Artista de música urbana y fotógrafo profesional. Trap, reggaetón, rap y sesiones fotográficas de alta calidad.",
    hero_btn1: "Escuchar música",
    hero_btn2: "Ver portafolio",
    hero_btn_colab: "Ver colaboraciones",
    hero_scroll: "DESCUBRE",
    about_eyebrow: "Mi historia",
    about_title: "Música y fotografía",
    about_badge: "Música Urbana",
    about_p1: "Soy Rafa 930, artista de música urbana en España y fotógrafo profesional. Mi estilo musical combina trap, reggaetón y rap, creando un sonido único que refleja mi vida y mis sueños.",
    about_p2: "Como fotógrafo, me especializo en retratos, fotografía urbana y sesiones para artistas. Capturo la esencia de cada persona a través de mi lente, ofreciendo un trabajo profesional y de alta calidad.",
    about_p3: "Mi objetivo es llevar mi música a todo el mundo y, al mismo tiempo, ofrecer un servicio fotográfico excepcional.",
    disc_eyebrow: "Mi música",
    disc_title: "Discografía",
    soon: "Próximamente",
    disc_desc1: "Un viaje musical que refleja la dualidad de la vida y las decisiones que tomamos.",
    disc_desc2: "Un EP que muestra mi universo musical, con sonidos frescos y letras sinceras.",
    disc_desc3: "Mi próximo álbum. Una celebración de la vida a través de la música urbana.",
    port_eyebrow: "Mi trabajo",
    port_title: "Portafolio fotográfico",
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
    booking_note: "Primera sesión con precio especial. Consulta disponibilidad.",
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
    footer_copyright: "Todos los derechos reservados"
  },
  en: {
    splash_eyebrow: "Welcome to the universe of",
    splash_sub: "Music · Photography",
    splash_click: "CLICK TO ENTER",
    logo_sub: "Music & Photography",
    nav_about: "Biography",
    nav_music: "Music",
    nav_photo: "Photography",
    nav_booking: "Booking",
    nav_contact: "Contact",
    nav_btn: "Contact",
    hero_desc: "Urban music artist and professional photographer. Trap, reggaeton, rap and high quality photo sessions.",
    hero_btn1: "Listen to music",
    hero_btn2: "View portfolio",
    hero_btn_colab: "View collaborations",
    hero_scroll: "DISCOVER",
    about_eyebrow: "My story",
    about_title: "Music & Photography",
    about_badge: "Urban Music",
    about_p1: "I'm Rafa 930, urban music artist in Spain and professional photographer. My musical style combines trap, reggaeton and rap, creating a unique sound that reflects my life and dreams.",
    about_p2: "As a photographer, I specialize in portraits, urban photography and sessions for artists. I capture the essence of each person through my lens, offering professional, high-quality work.",
    about_p3: "My goal is to take my music worldwide while offering exceptional photographic service.",
    disc_eyebrow: "My music",
    disc_title: "Discography",
    soon: "Coming soon",
    disc_desc1: "A musical journey reflecting the duality of life and the decisions we make.",
    disc_desc2: "An EP showing my musical universe, with fresh sounds and sincere lyrics.",
    disc_desc3: "My next album. A celebration of life through urban music.",
    port_eyebrow: "My work",
    port_title: "Photography portfolio",
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
    booking_note: "First session with special price. Check availability.",
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
    footer_copyright: "All rights reserved"
  }
};

let idiomaActual = 'es';

function cambiarIdioma(idioma) {
  idiomaActual = idioma;
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (traducciones[idioma][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = traducciones[idioma][key];
      } else if (el.tagName === 'IMG') {
        el.alt = traducciones[idioma][key];
      } else {
        el.textContent = traducciones[idioma][key];
      }
    }
  });
  
  localStorage.setItem('idioma', idioma);
}

function initLanguageSelector() {
  const langBtns = document.querySelectorAll('.lang-btn');
  const savedLang = localStorage.getItem('idioma') || 'es';
  
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      cambiarIdioma(lang);
    });
    
    if (btn.getAttribute('data-lang') === savedLang) {
      btn.classList.add('active');
    }
  });
  
  cambiarIdioma(savedLang);
}

// ========================================
// LIGHTBOX MEJORADO
// ========================================
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  let currentIndex = 0;
  let images = [];
  
  portfolioItems.forEach((item, index) => {
    const imgSrc = item.getAttribute('data-image') || item.querySelector('img')?.src;
    const imgTitle = item.getAttribute('data-title') || item.querySelector('.portfolio-overlay h4')?.textContent || 'Foto';
    
    if (imgSrc) {
      images.push({ src: imgSrc, title: imgTitle });
    }
    
    item.addEventListener('click', () => {
      currentIndex = index;
      openLightbox(currentIndex);
    });
  });
  
  function openLightbox(index) {
    if (!lightbox || !lightboxImage) return;
    const image = images[index];
    if (image) {
      lightboxImage.src = image.src;
      if (lightboxCaption) lightboxCaption.textContent = image.title;
      if (lightboxCounter) lightboxCounter.textContent = `${index + 1} / ${images.length}`;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  
  function closeLightbox() {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function nextImage() {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      openLightbox(currentIndex);
    }
  }
  
  function prevImage() {
    if (currentIndex > 0) {
      currentIndex--;
      openLightbox(currentIndex);
    }
  }
  
  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', prevImage);
  nextBtn?.addEventListener('click', nextImage);
  
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });
}

// ========================================
// TOAST NOTIFICATIONS
// ========================================
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i><span>${message}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ========================================
// BOTONES FLOTANTES
// ========================================
function initFloatingButtons() {
  document.getElementById('whatsappBtn')?.addEventListener('click', (e) => {
    showToast('📱 Abriendo WhatsApp...');
  });
  
  document.getElementById('gmailBtn')?.addEventListener('click', (e) => {
    showToast('📧 Abriendo Gmail...');
  });
}

// ========================================
// FORMULARIO
// ========================================
function initForm() {
  const form = document.getElementById('bookingForm');
  const successDiv = document.getElementById('formSuccess');
  const errorDiv = document.getElementById('formError');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn?.innerHTML || 'Enviar';
      
      if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        btn.disabled = true;
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
          showToast('✅ Consulta enviada con éxito');
          setTimeout(() => {
            if (successDiv) successDiv.style.display = 'none';
          }, 5000);
        } else {
          throw new Error();
        }
      } catch (error) {
        if (errorDiv) errorDiv.style.display = 'block';
        showToast('❌ Error al enviar, intenta de nuevo', 'error');
        setTimeout(() => {
          if (errorDiv) errorDiv.style.display = 'none';
        }, 5000);
      }
      
      if (btn) {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    });
  }
}

// ========================================
// COMPARTIR EN REDES SOCIALES (ÚNICA FUNCIÓN)
// ========================================
function initShareButtons() {
  // Selecciona TODOS los botones: los normales y los de la tarjeta 3D
  const shareButtons = document.querySelectorAll('.share-btn, .floating-share-btn');
  
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent('Rafa 930 | Música Urbana & Fotografía Profesional');
  
  shareButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
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
          navigator.clipboard.writeText(decodeURIComponent(pageUrl));
          showShareToast('✅ ¡Enlace copiado!');
          return;
        default:
          return;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
        showShareToast('📤 Compartiendo...');
      }
    });
  });
}

// Toast específico para compartir
function showShareToast(message) {
  const oldToast = document.querySelector('.share-toast');
  if (oldToast) oldToast.remove();
  
  const toast = document.createElement('div');
  toast.className = 'share-toast';
  toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 2000);
  }, 2000);
}

// JavaScript para el modal
function initShareModal() {
  const openBtn = document.getElementById('openShareModal');
  const modal = document.getElementById('shareModal');
  const closeBtn = document.querySelector('.share-modal-close');
  
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
    });
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
  
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}
// ========================================
// CARRUSEL HORIZONTAL
// ========================================

function initCarruselHorizontal() {
  const track = document.getElementById('carruselTrack');
  const cards = document.querySelectorAll('.carrusel-horizontal-card');
  const prevBtn = document.getElementById('carruselPrev');
  const nextBtn = document.getElementById('carruselNext');
  const dotsContainer = document.getElementById('carruselDots');
  const container = document.querySelector('.carrusel-horizontal-container');
  
  if (!track || !cards.length) return;
  
  let currentIndex = 0;
  const totalCards = cards.length;
  const cardWidth = cards[0].offsetWidth + 24; // 24 es el gap
  
  function updateDots() {
    const dots = document.querySelectorAll('.carrusel-horizontal-dots .dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  function scrollToCard(index) {
    container.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    currentIndex = index;
    updateDots();
  }
  
  function nextSlide() {
    if (currentIndex < totalCards - 1) {
      scrollToCard(currentIndex + 1);
    }
  }
  
  function prevSlide() {
    if (currentIndex > 0) {
      scrollToCard(currentIndex - 1);
    }
  }
  
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Crear dots
  dotsContainer.innerHTML = '';
  for (let i = 0; i < totalCards; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => scrollToCard(i));
    dotsContainer.appendChild(dot);
  }
  
  // Detectar scroll manual
  container.addEventListener('scroll', () => {
    const newIndex = Math.round(container.scrollLeft / cardWidth);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalCards) {
      currentIndex = newIndex;
      updateDots();
    }
  });
  
  // Teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
}

document.addEventListener('DOMContentLoaded', initCarruselHorizontal);

// ========================================
// MOBILE MENU - VERSIÓN DEFINITIVA
// ========================================
function initMobileMenu() {
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeBtn');
  
  // Verificar que los elementos existen
  if (!burgerBtn) {
    console.error('❌ Botón burger no encontrado');
    return;
  }
  
  if (!mobileMenu) {
    console.error('❌ Menú móvil no encontrado');
    return;
  }
  
  console.log('✅ Menú móvil inicializado');
  
  // Abrir menú al hacer clic en el burger
  burgerBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    console.log('📱 Menú abierto');
  });
  
  // Cerrar menú con el botón X
  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
      console.log('❌ Menú cerrado con X');
    });
  }
  
  // Cerrar menú al hacer clic en cualquier enlace
  const mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
      console.log('🔗 Menú cerrado por enlace');
    });
  });
  
  // Cerrar menú al hacer clic fuera del contenido
  mobileMenu.addEventListener('click', function(e) {
    if (e.target === mobileMenu) {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
      console.log('👆 Menú cerrado por clic fuera');
    }
  });
}