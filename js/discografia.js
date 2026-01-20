 // Smooth scroll para anclas internas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Efecto hover para tarjetas
  document.querySelectorAll('.card-glow').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
  
  // Botón Gmail hover effect
  const gmailButton = document.getElementById('gmailButton');
  const gmailMessage = document.getElementById('gmailMessage');
  
  if (gmailButton && gmailMessage) {
    gmailButton.addEventListener('mouseenter', () => {
      gmailMessage.style.opacity = '1';
      gmailMessage.style.transform = 'translateX(0)';
    });
    
    gmailButton.addEventListener('mouseleave', () => {
      gmailMessage.style.opacity = '0';
      gmailMessage.style.transform = 'translateX(10px)';
    });
  }
  
  // Efecto parallax en header
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header-parallax');
    const scrolled = window.pageYOffset;
    
    if (header) {
      header.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
  });