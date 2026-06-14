import { showToast } from '../core/utils.js';
export function initShare() {
  const shareButtons = document.querySelectorAll('.share__btn');
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent('Rafa 930 | Música Urbana & Fotografía Profesional');
  shareButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const platform = btn.dataset.platform;
      let shareUrl = '';
      switch(platform) {
        case 'twitter': shareUrl = `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`; break;
        case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`; break;
        case 'whatsapp': shareUrl = `https://wa.me/?text=${pageTitle}%20-%20${decodeURIComponent(pageUrl)}`; break;
        case 'copy':
          navigator.clipboard.writeText(decodeURIComponent(pageUrl))
            .then(() => showToast('✅ ¡Enlace copiado!'))
            .catch(() => showToast('❌ Error al copiar'));
          return;
      }
      if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
    });
  });
}