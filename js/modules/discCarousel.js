// discCarousel.js - Carrusel de discografía con flechas y dots sincronizados
let autoplayInterval = null;
let isHovering = false;

function getTrack() {
  return document.getElementById('discTrack');
}

function getCards() {
  const track = getTrack();
  return track ? Array.from(track.querySelectorAll('.carrusel-horizontal__card')) : [];
}

function getCardWidth() {
  const cards = getCards();
  if (cards.length === 0) return 0;
  const style = window.getComputedStyle(cards[0]);
  // Incluye margen derecho e izquierdo (si los hubiera)
  return cards[0].offsetWidth + parseInt(style.marginRight || 0) + parseInt(style.marginLeft || 0);
}

function getCurrentIndex() {
  const track = getTrack();
  const cardWidth = getCardWidth();
  if (!track || cardWidth === 0) return 0;
  // Usamos Math.round porque el scroll puede dar posiciones decimales
  return Math.round(track.scrollLeft / cardWidth);
}

function updateDots() {
  const dotsContainer = document.getElementById('discDots');
  if (!dotsContainer) return;
  const current = getCurrentIndex();
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === current);
  });
}

function scrollToIndex(index) {
  const track = getTrack();
  const cardWidth = getCardWidth();
  const cards = getCards();
  if (!track || cardWidth === 0 || cards.length === 0) return;
  // Limitar índice entre 0 y último
  if (index < 0) index = 0;
  if (index >= cards.length) index = cards.length - 1;
  track.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  // Los dots se actualizarán en el evento 'scroll' (ver más abajo)
}

function nextSlide() {
  const cards = getCards();
  if (cards.length === 0) return;
  let newIndex = getCurrentIndex() + 1;
  if (newIndex >= cards.length) newIndex = 0;
  scrollToIndex(newIndex);
  resetAutoplay();
}

function prevSlide() {
  const cards = getCards();
  if (cards.length === 0) return;
  let newIndex = getCurrentIndex() - 1;
  if (newIndex < 0) newIndex = cards.length - 1;
  scrollToIndex(newIndex);
  resetAutoplay();
}

// Autoplay (opcional, por defecto desactivado para discografía)
function startAutoplay(intervalMs = 5000) {
  if (autoplayInterval) clearInterval(autoplayInterval);
  const cards = getCards();
  if (cards.length <= 1) return;
  autoplayInterval = setInterval(() => {
    if (!isHovering && document.visibilityState === 'visible') {
      nextSlide();
    }
  }, intervalMs);
}

function stopAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
}

function resetAutoplay() {
  stopAutoplay();
  // Solo reactivar si autoplay está habilitado (por defecto false)
  if (window.DISC_AUTOPLAY_ENABLED) {
    startAutoplay(window.DISC_AUTOPLAY_INTERVAL);
  }
}

function createDots() {
  const dotsContainer = document.getElementById('discDots');
  const cards = getCards();
  if (!dotsContainer || cards.length === 0) return;
  dotsContainer.innerHTML = '';
  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      scrollToIndex(i);
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  });
}

// Evento disparado al hacer scroll manual
function onTrackScroll() {
  updateDots();
}

// Inicialización pública
export function initDiscCarousel(enableAutoplay = false, autoplayIntervalMs = 5000) {
  const track = getTrack();
  if (!track) return;

  // Guardar configuración de autoplay a nivel global para resetAutoplay
  window.DISC_AUTOPLAY_ENABLED = enableAutoplay;
  window.DISC_AUTOPLAY_INTERVAL = autoplayIntervalMs;

  // Pequeño retraso para asegurar que las imágenes y estilos estén listos
  setTimeout(() => {
    createDots();
    // Asegurar que el scroll empiece al principio
    track.scrollLeft = 0;
    updateDots();
    if (enableAutoplay) startAutoplay(autoplayIntervalMs);
  }, 300);

  // Botones de navegación
  const prevBtn = document.getElementById('discPrev');
  const nextBtn = document.getElementById('discNext');
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
    });
  }

  // Eventos de hover para pausar autoplay
  track.addEventListener('mouseenter', () => {
    isHovering = true;
    stopAutoplay();
  });
  track.addEventListener('mouseleave', () => {
    isHovering = false;
    if (enableAutoplay) startAutoplay(autoplayIntervalMs);
  });

  // Sincronizar dots cuando el usuario haga scroll manual
  track.addEventListener('scroll', onTrackScroll);

  // Recalcular todo si la ventana cambia de tamaño
  window.addEventListener('resize', () => {
    createDots();
    const current = getCurrentIndex();
    scrollToIndex(current);
    updateDots();
    resetAutoplay();
  });

  // Navegación con teclado (opcional)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoplay();
    }
  });
}