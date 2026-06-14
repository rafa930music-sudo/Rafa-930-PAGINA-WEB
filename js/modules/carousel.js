let autoplayInterval = null;
let isHovering = false;

// Obtener el contenedor del track
function getTrack() {
  return document.getElementById('carruselTrack');
}

// Obtener todas las tarjetas
function getCards() {
  const track = getTrack();
  return track ? Array.from(track.querySelectorAll('.carrusel-horizontal__card')) : [];
}

// Calcular ancho de cada tarjeta (incluyendo margen)
function getCardWidth() {
  const cards = getCards();
  if (cards.length === 0) return 0;
  const style = window.getComputedStyle(cards[0]);
  return cards[0].offsetWidth + parseInt(style.marginRight || 0) + parseInt(style.marginLeft || 0);
}

// Obtener el índice actual basado en el scrollLeft del track
function getCurrentIndex() {
  const track = getTrack();
  const cardWidth = getCardWidth();
  if (!track || cardWidth === 0) return 0;
  const scrollLeft = track.scrollLeft;
  // Redondeo para evitar errores por decimales
  return Math.round(scrollLeft / cardWidth);
}

// Actualizar dots según el índice actual
function updateDots() {
  const dots = document.querySelectorAll('.carrusel-horizontal__dots .dot');
  const current = getCurrentIndex();
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === current);
  });
}

// Desplazar a un índice específico
function scrollToCard(index) {
  const track = getTrack();
  const cardWidth = getCardWidth();
  const cards = getCards();
  if (!track || cardWidth === 0 || cards.length === 0) return;
  // Asegurar índice dentro de límites
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
  scrollToCard(newIndex);
  resetAutoplay();
}

function prevSlide() {
  const cards = getCards();
  if (cards.length === 0) return;
  let newIndex = getCurrentIndex() - 1;
  if (newIndex < 0) newIndex = cards.length - 1;
  scrollToCard(newIndex);
  resetAutoplay();
}

// Autoplay
function startAutoplay() {
  if (autoplayInterval) clearInterval(autoplayInterval);
  const cards = getCards();
  if (cards.length <= 1) return;
  autoplayInterval = setInterval(() => {
    if (!isHovering && document.visibilityState === 'visible') {
      nextSlide();
    }
  }, 5000);
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

// Crear los dots dinámicamente
function createDots() {
  const dotsContainer = document.getElementById('carruselDots');
  const cards = getCards();
  if (!dotsContainer || cards.length === 0) return;
  dotsContainer.innerHTML = '';
  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      scrollToCard(i);
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  });
}

// Sincronizar currentIndex con el scroll manual (evento 'scroll')
function onTrackScroll() {
  updateDots();
}

// Inicialización principal
export function initCarousel() {
  const track = getTrack();
  if (!track) return;

  // Crear dots y configurar dimensiones iniciales
  const initialize = () => {
    createDots();
    // Asegurar que el scroll esté al inicio
    track.scrollLeft = 0;
    updateDots();
    startAutoplay();
  };

  // Esperar a que las imágenes y estilos estén listos
  setTimeout(initialize, 300);

  // Eventos de flechas
  const prevBtn = document.getElementById('carruselPrev');
  const nextBtn = document.getElementById('carruselNext');
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); prevSlide(); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); nextSlide(); });

  // Eventos de hover para pausar autoplay
  track.addEventListener('mouseenter', () => { isHovering = true; stopAutoplay(); });
  track.addEventListener('mouseleave', () => { isHovering = false; startAutoplay(); });

  // Sincronizar dots cuando el usuario haga scroll manual
  track.addEventListener('scroll', onTrackScroll);

  // Recalcular si la ventana cambia de tamaño
  window.addEventListener('resize', () => {
    // Forzar recreación de dots porque el ancho de las tarjetas puede cambiar
    createDots();
    // Mantener la posición relativa (opcional: podrías conservar el índice)
    const current = getCurrentIndex();
    scrollToCard(current);
    updateDots();
    resetAutoplay();
  });

  // Navegación con teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { prevSlide(); resetAutoplay(); }
    if (e.key === 'ArrowRight') { nextSlide(); resetAutoplay(); }
  });
}