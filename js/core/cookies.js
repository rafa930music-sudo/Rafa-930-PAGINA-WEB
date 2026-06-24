import { showToast } from './utils.js';

// Carga Google Analytics solo si el usuario ha aceptado
function cargarGoogleAnalytics() {
  // Evita insertar el script más de una vez
  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return;

  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-9R8QT0EDZ0';
  script.async = true;
  document.head.appendChild(script);

  // Configuración de GA4
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-9R8QT0EDZ0');
}

export function initCookies() {
  const consent = localStorage.getItem('cookies_aceptadas');

  if (consent === 'true') {
    // Ya aceptó antes: activa Analytics directamente
    cargarGoogleAnalytics();
  } else if (consent === null) {
    // No ha decidido: muestra el banner
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'flex';
  }
  // Si es 'false', no se hace nada (ni banner ni Analytics)

  // Exponemos las funciones globales para que los botones del banner funcionen
  window.aceptarCookies = () => {
    localStorage.setItem('cookies_aceptadas', 'true');
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'none';
    cargarGoogleAnalytics();
    showToast('🍪 Cookies aceptadas');
  };

  window.rechazarCookies = () => {
    localStorage.setItem('cookies_aceptadas', 'false');
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'none';
    showToast('🍪 Cookies rechazadas');
    // Analytics no se carga
  };
}