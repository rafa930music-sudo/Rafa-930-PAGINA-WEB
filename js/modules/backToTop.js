import { debounce } from '../core/utils.js';
export function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;
  window.addEventListener('scroll', debounce(() => {
    if (window.scrollY > 500) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  }, 100));
  backToTop.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}