(function() {
  // Tema
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light');
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    if (saved === 'light') toggle.classList.add('light');
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
      document.body.classList.toggle('dark');
      const isLight = document.body.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      toggle.classList.toggle('light', isLight);
    });
  }
  // Cookies
  window.aceptarCookies = function() {
    localStorage.setItem('cookies_aceptadas', 'true');
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'none';
    const status = document.getElementById('cookieStatus');
    if (status) status.innerHTML = '<span class="cookie-status accepted">✅ Cookies aceptadas</span>';
  };
  window.rechazarCookies = function() {
    localStorage.setItem('cookies_aceptadas', 'false');
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'none';
    const status = document.getElementById('cookieStatus');
    if (status) status.innerHTML = '<span class="cookie-status rejected">❌ Cookies rechazadas</span>';
  };
  // Mostrar estado actual en página de cookies
  const statusDiv = document.getElementById('cookieStatus');
  if (statusDiv) {
    const aceptadas = localStorage.getItem('cookies_aceptadas');
    if (aceptadas === 'true') statusDiv.innerHTML = '<span class="cookie-status accepted">✅ Cookies aceptadas</span>';
    else if (aceptadas === 'false') statusDiv.innerHTML = '<span class="cookie-status rejected">❌ Cookies rechazadas</span>';
  }
})();