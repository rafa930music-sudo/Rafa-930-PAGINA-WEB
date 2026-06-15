import { debounce } from '../core/utils.js';

export function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }, 50));
}

export function initMobileMenu() {
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeBtn');
  if (!burgerBtn || !mobileMenu) return;
  
  function cerrarMenu() {
    mobileMenu.classList.remove('active');
    burgerBtn.classList.remove('active');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  }
  
  function abrirMenu() {
    mobileMenu.classList.add('active');
    burgerBtn.classList.add('active');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'pan-y pinch-zoom';
  }
  
  burgerBtn.addEventListener('click', () => {
    const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      cerrarMenu();
    } else {
      abrirMenu();
    }
  });
  
  if (closeBtn) closeBtn.addEventListener('click', cerrarMenu);
  document.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', cerrarMenu);
  });
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) cerrarMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) cerrarMenu();
  });
}