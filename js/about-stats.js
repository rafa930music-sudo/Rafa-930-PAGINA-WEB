/* ============================================ */
/* ABOUT – CONTADOR ANIMADO DE STATS            */
/* ============================================ */

(function () {
  'use strict';

  const statsSection = document.querySelector('.about__stats');
  if (!statsSection) return;

  const counters = statsSection.querySelectorAll('.about__stat-num');
  if (!counters.length) return;

  // Respeta prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Anima un contador desde 0 hasta `target` en `duration` ms.
   */
  function animateCounter(el, target, duration = 1500) {
    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }

    const start = performance.now();
    const startValue = 0;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const currentValue = Math.floor(startValue + (target - startValue) * eased);

      el.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(tick);
  }

  /**
   * Inicia los contadores.
   */
  function startCounters() {
    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.count, 10) || 0;
      animateCounter(counter, target, 1600);
    });
  }

  // IntersectionObserver – solo anima cuando entra al viewport
  if ('IntersectionObserver' in window) {
    let hasAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            startCounters();
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    observer.observe(statsSection);
  } else {
    // Fallback: sin IntersectionObserver, anima directo
    startCounters();
  }
})();