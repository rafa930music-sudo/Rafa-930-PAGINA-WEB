// js/core/cookies.js
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
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag; // accesible globalmente si lo necesitas luego
  window.gtag('js', new Date());
  window.gtag('config', 'G-9R8QT0EDZ0');
}

export function initCookies() {
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('cookieAccept');
  const rejectBtn = document.getElementById('cookieReject');

  const consent = localStorage.getItem('cookies_aceptadas');

  // 1) Decidir si mostramos el banner
  if (consent === 'true') {
    // Ya aceptó antes: activa Analytics sin banner
    cargarGoogleAnalytics();
  } else if (consent === null && banner) {
    // No ha decidido: muestra el banner
    banner.style.display = 'flex';
  }
  // Si es 'false' → no banner, no Analytics

  // 2) Listeners de los botones (si existen en esta página)
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookies_aceptadas', 'true');
      if (banner) banner.style.display = 'none';
      cargarGoogleAnalytics();
      showToast('🍪 Cookies aceptadas');
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      localStorage.setItem('cookies_aceptadas', 'false');
      if (banner) banner.style.display = 'none';
      showToast('🍪 Cookies rechazadas');
      // Analytics no se carga
    });
  }
}