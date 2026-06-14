import { showToast } from './utils.js';
export function initCookies() {
  if (!localStorage.getItem('cookies_aceptadas')) {
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'flex';
  }
  window.aceptarCookies = () => {
    localStorage.setItem('cookies_aceptadas', 'true');
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'none';
    showToast('🍪 Cookies aceptadas');
  };
  window.rechazarCookies = () => {
    localStorage.setItem('cookies_aceptadas', 'false');
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'none';
    showToast('🍪 Cookies rechazadas');
  };
}