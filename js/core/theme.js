import { showToast } from './utils.js';
export function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const theme = saved || (prefersLight ? 'light' : 'dark');
  document.body.classList.add(theme);
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    if (theme === 'light') toggle.classList.add('light');
    toggle.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark');
      if (isDark) {
        document.body.classList.replace('dark', 'light');
        toggle.classList.add('light');
        localStorage.setItem('theme', 'light');
        showToast('☀️ Modo claro activado');
      } else {
        document.body.classList.replace('light', 'dark');
        toggle.classList.remove('light');
        localStorage.setItem('theme', 'dark');
        showToast('🌙 Modo oscuro activado');
      }
    });
  }
}