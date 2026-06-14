import { initTheme } from './core/theme.js';
import { initI18n } from './core/i18n.js';
import { initCookies } from './core/cookies.js';
import { initSplash } from './modules/splash.js';
import { initHeader, initMobileMenu } from './modules/header.js';
import { initCarousel } from './modules/carousel.js';
import { initDiscCarousel } from './modules/discCarousel.js';
import { initForm } from './modules/form.js';
import { initShare } from './modules/share.js';
import { initParticles } from './modules/particles.js';
import { initBackToTop } from './modules/backToTop.js';
import { prefersReducedMotion } from './core/utils.js';

// AOS se cargará desde el CDN en el HTML, así que lo inicializamos aquí si existe
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: true, disable: prefersReducedMotion() });
  }
  initTheme();
  initI18n();
  initCookies();
  initSplash();
  initHeader();
  initMobileMenu();
  initCarousel();
  initDiscCarousel();
  initForm();
  initShare();
  initParticles();
  initBackToTop();
  console.log('🚀 Rafa 930 - Todos los sistemas funcionando correctamente');
});