document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const modeToggle = document.getElementById("modeToggle");
  const imgLight = document.getElementById("imgLight");
  const imgDark = document.getElementById("imgDark");
  const overlay = document.getElementById("overlay");
  const carouselText = document.getElementById("carousel-text");
  const perfilTitle = document.getElementById("perfilTitle");

  // Estado inicial
  let darkMode = localStorage.getItem("darkMode") === "true";
  
  // Asegurar que el body tenga la clase correcta al inicio
  if (darkMode) {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
  
  // Aplicar modo inicial
  aplicarModo(darkMode);

  // Evento para cambiar modo
  modeToggle.addEventListener("click", () => {
    darkMode = !darkMode;
    localStorage.setItem("darkMode", darkMode);
    aplicarModo(darkMode);
  });

  function aplicarModo(isDark) {
    if (isDark) {
      body.classList.add("dark");
      imgLight.style.opacity = "0";
      imgDark.style.opacity = "1";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      body.style.background = "linear-gradient(135deg, #0a0a0a, #3b0764)";
      body.style.color = "#f1f1f1";
      modeToggle.textContent = "Modo Claro";
      modeToggle.style.backgroundColor = "#5a0ca3";
      modeToggle.style.color = "white";
      
      if (perfilTitle) {
        perfilTitle.style.color = "#ffffff";
        perfilTitle.style.backgroundColor = "#1a1a1a";
        perfilTitle.style.textShadow = "3px 3px 0 #000000, -3px -3px 0 #000000, 3px -3px 0 #000000, -3px 3px 0 #000000, 0 0 20px #ffffff, 0 0 40px #ffffff";
        perfilTitle.style.border = "2px solid #ffffff";
        perfilTitle.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.7), inset 0 0 10px rgba(0, 0, 0, 0.3)";
      }
      
    } else {
      body.classList.remove("dark");
      imgLight.style.opacity = "1";
      imgDark.style.opacity = "0";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      body.style.background = "white";
      body.style.color = "black";
      modeToggle.textContent = "Modo Oscuro";
      modeToggle.style.backgroundColor = "white";
      modeToggle.style.color = "black";
      
      if (perfilTitle) {
        perfilTitle.style.color = "#8b00ff";
        perfilTitle.style.backgroundColor = "#f5f5f5";
        perfilTitle.style.textShadow = "3px 3px 0 #ffffff, -3px -3px 0 #ffffff, 3px -3px 0 #ffffff, -3px 3px 0 #ffffff, 0 0 20px #8b00ff, 0 0 40px #8b00ff";
        perfilTitle.style.border = "2px solid #8b00ff";
        perfilTitle.style.boxShadow = "0 0 15px rgba(139, 0, 255, 0.7), inset 0 0 10px rgba(139, 0, 255, 0.3)";
      }
    }
  }

  // Aplicar estilos base al título
  if (perfilTitle) {
    perfilTitle.style.fontFamily = "'Bebas Neue', cursive";
    perfilTitle.style.padding = "0.5rem 1.5rem";
    perfilTitle.style.borderRadius = "12px";
    perfilTitle.style.display = "inline-block";
    perfilTitle.style.margin = "1rem 0";
    perfilTitle.style.transition = "all 0.5s ease";
    
    if (darkMode) {
      perfilTitle.style.color = "#ffffff";
      perfilTitle.style.backgroundColor = "#1a1a1a";
      perfilTitle.style.textShadow = "3px 3px 0 #000000, -3px -3px 0 #000000, 3px -3px 0 #000000, -3px 3px 0 #000000, 0 0 20px #ffffff, 0 0 40px #ffffff";
      perfilTitle.style.border = "2px solid #ffffff";
      perfilTitle.style.boxShadow = "0 0 15px rgba(0, 0, 0, 1), inset 0 0 10px rgba(0, 0, 0, 0.3)";
    } else {
      perfilTitle.style.color = "#8b00ff";
      perfilTitle.style.backgroundColor = "#f5f5f5";
      perfilTitle.style.textShadow = "3px 3px 0 #ffffff, -3px -3px 0 #ffffff, 3px -3px 0 #ffffff, -3px 3px 0 #ffffff, 0 0 20px #8b00ff, 0 0 40px #8b00ff";
      perfilTitle.style.border = "2px solid #8b00ff";
      perfilTitle.style.boxShadow = "0 0 15px rgba(139, 0, 255, 0.7), inset 0 0 10px rgba(139, 0, 255, 0.3)";
    }
  }

  // Carrusel de frases
  const frases = ["Rafa 930", "LA MINA", "930"];
  let fraseIndex = 0;
  
  if (carouselText) {
    function cambiarFrase() {
      carouselText.style.opacity = "0";
      carouselText.style.transform = "translateY(-10px)";
      
      setTimeout(() => {
        fraseIndex = (fraseIndex + 1) % frases.length;
        carouselText.textContent = frases[fraseIndex];
        carouselText.style.opacity = "1";
        carouselText.style.transform = "translateY(0)";
      }, 300);
    }
    
    setInterval(cambiarFrase, 3000);
  }

  // Sistema de pestañas
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");
      
      tabs.forEach(t => {
        t.setAttribute("aria-selected", "false");
        t.classList.remove("bg-purple-700", "ring-2", "ring-purple-300");
        t.classList.add("bg-purple-600");
      });
      
      tab.setAttribute("aria-selected", "true");
      tab.classList.remove("bg-purple-600");
      tab.classList.add("bg-purple-700", "ring-2", "ring-purple-300");
      
      panels.forEach(panel => {
        panel.classList.add("hidden");
        panel.classList.remove("flex");
      });
      
      const activePanel = document.getElementById(tabId);
      if (activePanel) {
        activePanel.classList.remove("hidden");
        activePanel.classList.add("flex");
      }
    });
  });

  // Título responsivo
  function ajustarTitulo() {
    if (!perfilTitle) return;
    
    const width = window.innerWidth;
    if (width < 640) {
      perfilTitle.style.fontSize = "2.5rem";
    } else if (width < 768) {
      perfilTitle.style.fontSize = "3rem";
    } else if (width < 1024) {
      perfilTitle.style.fontSize = "4rem";
    } else {
      perfilTitle.style.fontSize = "5rem";
    }
  }

  ajustarTitulo();
  window.addEventListener("resize", ajustarTitulo);

  // Suavizar scroll
  document.documentElement.style.scrollBehavior = "smooth";
  
  // Efecto de carga
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 300);

  // ====================== CÓDIGO PARA EL BOTÓN GMAIL ======================
  
  // Asegurar que Font Awesome esté cargado
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(faLink);
  }

  const gmailMessage = document.getElementById('gmailMessage');
  const gmailButton = document.getElementById('gmailButton');

  if (gmailButton && gmailMessage) {
    let hideTimeout;
    let messageTimeout;
    
    // Funciones para mostrar/ocultar mensaje
    function showMessage() {
      clearTimeout(hideTimeout);
      gmailMessage.classList.remove('opacity-0', 'translate-x-10');
      gmailMessage.classList.add('opacity-100', 'translate-x-0');
      
      // Ocultar automáticamente después de 8 segundos
      hideTimeout = setTimeout(() => {
        hideMessage();
      }, 8000);
    }
    
    function hideMessage() {
      gmailMessage.classList.remove('opacity-100', 'translate-x-0');
      gmailMessage.classList.add('opacity-0', 'translate-x-10');
    }
    
    function isMessageVisible() {
      return gmailMessage.classList.contains('opacity-100');
    }
    
    // Mostrar mensaje después de 3 segundos de cargar la página
    setTimeout(() => {
      showMessage();
      setTimeout(() => {
        hideMessage();
      }, 8000);
    }, 3000);
    
    // Ciclo de aparición cada 45 segundos
    setInterval(() => {
      if (!isMessageVisible()) {
        setTimeout(() => {
          showMessage();
          setTimeout(() => {
            hideMessage();
          }, 8000);
        }, 5000);
      }
    }, 45000);
    
    // Mostrar mensaje al hacer hover en el botón
    gmailButton.addEventListener('mouseenter', () => {
      showMessage();
    });
    
    // Ocultar mensaje al salir del área
    gmailButton.addEventListener('mouseleave', (e) => {
      setTimeout(() => {
        if (!gmailMessage.matches(':hover')) {
          hideMessage();
        }
      }, 100);
    });
    
    // Mantener visible si el mouse está sobre el mensaje
    gmailMessage.addEventListener('mouseenter', () => {
      clearTimeout(hideTimeout);
    });
    
    gmailMessage.addEventListener('mouseleave', () => {
      hideMessage();
    });
    
    // Efecto de clic en el botón (SIN PREVENT DEFAULT - para que funcione mailto:)
    gmailButton.addEventListener('click', function(e) {
      // Solo animación, NO preventDefault
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = '';
      }, 300);
      
      // Ocultar mensaje después de click
      hideMessage();
      
      // NO hacer window.location.href aquí - dejar que el href natural funcione
      console.log('Botón de Gmail clickeado - Abriendo cliente de email...');
    });
    
    // Para móviles (touch) - SOLO mostrar mensaje, NO redirigir
    gmailButton.addEventListener('touchstart', function(e) {
      // Solo mostrar mensaje
      showMessage();
      
      // NO redirigir aquí - el href natural del <a> se encargará cuando el usuario toque para enviar
      clearTimeout(messageTimeout);
      messageTimeout = setTimeout(() => {
        hideMessage();
      }, 5000);
    });
    
    // Detectar scroll y esconder mensaje si es necesario
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (isMessageVisible()) {
          hideMessage();
        }
      }, 500);
    });
  }
});