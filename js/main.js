document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 main.js cargado correctamente");
  
  const body = document.body;
  const modeToggle = document.getElementById("modeToggle");
  const imgLight = document.getElementById("imgLight");
  const imgDark = document.getElementById("imgDark");
  const overlay = document.getElementById("overlay");
  const carouselText = document.getElementById("carousel-text");
  const perfilTitle = document.getElementById("perfilTitle");

  // Estado inicial
  let darkMode = localStorage.getItem("darkMode") === "true";
  
  console.log("Modo oscuro al inicio:", darkMode);
  
  // Asegurar que el body tenga la clase correcta al inicio
  if (darkMode) {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
  
  // Aplicar modo inicial
  aplicarModo(darkMode);

  // Evento para cambiar modo
  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      console.log("Cambiando modo oscuro/claro");
      darkMode = !darkMode;
      localStorage.setItem("darkMode", darkMode);
      aplicarModo(darkMode);
    });
  }

  function aplicarModo(isDark) {
    console.log("Aplicando modo:", isDark ? "Oscuro" : "Claro");
    
    if (isDark) {
      body.classList.add("dark");
      if (imgLight) imgLight.style.opacity = "0";
      if (imgDark) imgDark.style.opacity = "1";
      if (overlay) overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      body.style.background = "linear-gradient(135deg, #0a0a0a, #3b0764)";
      body.style.color = "#f1f1f1";
      if (modeToggle) {
        modeToggle.textContent = "Modo Claro";
        modeToggle.style.backgroundColor = "#5a0ca3";
        modeToggle.style.color = "white";
      }
      
      if (perfilTitle) {
        perfilTitle.style.color = "#ffffff";
        perfilTitle.style.backgroundColor = "#1a1a1a";
        perfilTitle.style.textShadow = "3px 3px 0 #000000, -3px -3px 0 #000000, 3px -3px 0 #000000, -3px 3px 0 #000000, 0 0 20px #ffffff, 0 0 40px #ffffff";
        perfilTitle.style.border = "2px solid #ffffff";
        perfilTitle.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.7), inset 0 0 10px rgba(0, 0, 0, 0.3)";
      }
      
    } else {
      body.classList.remove("dark");
      if (imgLight) imgLight.style.opacity = "1";
      if (imgDark) imgDark.style.opacity = "0";
      if (overlay) overlay.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      body.style.background = "white";
      body.style.color = "black";
      if (modeToggle) {
        modeToggle.textContent = "Modo Oscuro";
        modeToggle.style.backgroundColor = "white";
        modeToggle.style.color = "black";
      }
      
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
  }

  // Carrusel de frases
  const frases = ["Rafa 930", "LA MINA", "930"];
  let fraseIndex = 0;
  
  if (carouselText) {
    console.log("Carrusel de frases iniciado");
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

  // ====================== CÓDIGO MEJORADO PARA EL BOTÓN GMAIL ======================
  
  const gmailMessage = document.getElementById('gmailMessage');
  const gmailButton = document.getElementById('gmailButton');

  if (gmailButton && gmailMessage) {
    console.log("✅ Botón Gmail encontrado - Iniciando funcionalidad");
    
    let hideTimeout;
    let messageTimeout;
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Funciones para mostrar/ocultar mensaje
    function showMessage() {
      console.log("Mostrando mensaje Gmail");
      clearTimeout(hideTimeout);
      gmailMessage.style.opacity = '1';
      gmailMessage.style.transform = 'translateX(0)';
      gmailMessage.classList.remove('opacity-0', 'translate-x-10');
      gmailMessage.classList.add('opacity-100', 'translate-x-0');
      
      // Ocultar automáticamente después de 5 segundos (más corto)
      hideTimeout = setTimeout(() => {
        hideMessage();
      }, 5000);
    }
    
    function hideMessage() {
      console.log("Ocultando mensaje Gmail");
      gmailMessage.style.opacity = '0';
      gmailMessage.style.transform = 'translateX(40px)';
      gmailMessage.classList.remove('opacity-100', 'translate-x-0');
      gmailMessage.classList.add('opacity-0', 'translate-x-10');
    }
    
    // Mostrar mensaje después de 2 segundos de cargar la página
    setTimeout(() => {
      showMessage();
      setTimeout(() => {
        hideMessage();
      }, 5000);
    }, 2000);
    
    // Para desktop: mostrar al hacer hover
    if (!isMobile) {
      gmailButton.addEventListener('mouseenter', showMessage);
      
      gmailButton.addEventListener('mouseleave', () => {
        setTimeout(() => {
          hideMessage();
        }, 500);
      });
      
      gmailMessage.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
      });
      
      gmailMessage.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(hideMessage, 500);
      });
    }
    
    // Click en el botón (para todos los dispositivos)
    gmailButton.addEventListener('click', function(e) {
      console.log("📧 Click en botón Gmail - Abriendo cliente de email");
      
      // Efecto visual
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
      
      // Ocultar mensaje
      hideMessage();
      
      // NO hacer preventDefault - dejar que el href="mailto:" funcione
    });
    
    // Para móviles: mostrar con touch
    if (isMobile) {
      gmailButton.addEventListener('touchstart', function(e) {
        console.log("📱 Touch en botón Gmail");
        showMessage();
        
        clearTimeout(messageTimeout);
        messageTimeout = setTimeout(() => {
          hideMessage();
        }, 4000);
      });
    }
    
    // Detectar scroll y esconder mensaje
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (parseInt(gmailMessage.style.opacity) > 0) {
          hideMessage();
        }
      }, 300);
    });
    
  } else {
    console.error("❌ ERROR: Elementos del botón Gmail no encontrados");
    console.log("Buscando gmailButton:", document.getElementById('gmailButton'));
    console.log("Buscando gmailMessage:", document.getElementById('gmailMessage'));
    
    // Si no se encuentran, crear un botón de emergencia
    if (!document.getElementById('gmailButton')) {
      console.log("Creando botón Gmail de emergencia...");
      const emergencyButton = document.createElement('a');
      emergencyButton.href = "mailto:rafa930.music@gmail.com";
      emergencyButton.id = "gmailButton";
      emergencyButton.className = "fixed bottom-6 right-6 z-50 bg-red-600 text-white p-4 rounded-full shadow-lg";
      emergencyButton.innerHTML = "✉️";
      emergencyButton.style.fontSize = "24px";
      document.body.appendChild(emergencyButton);
    }
  }
  
  console.log("✨ JavaScript completamente cargado");
}); function aplicarModo(isDark) {
  if (isDark) {
    // ... tu código existente ...
    
    // SOLUCIÓN DE EMERGENCIA PARA TEXTO "SOBRE MÍ"
    setTimeout(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        // Forzar color blanco en TODO el contenido
        aboutSection.querySelectorAll('*').forEach(element => {
          element.style.cssText += 'color: white !important;';
        });
        
        // Colores específicos para spans
        aboutSection.querySelectorAll('.text-purple-300').forEach(span => {
          span.style.cssText += 'color: #d8b4fe !important;';
        });
        
        aboutSection.querySelectorAll('.text-pink-300').forEach(span => {
          span.style.cssText += 'color: #f9a8d4 !important;';
        });
      }
    }, 50);
    
  } else {
    // ... tu código existente para modo claro ...
    
    // Restaurar colores en modo claro
    setTimeout(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.querySelectorAll('*').forEach(element => {
          element.style.cssText = element.style.cssText.replace(/color:\s*white\s*!important;/g, '');
          element.style.cssText = element.style.cssText.replace(/color:\s*#[0-9a-f]+\s*!important;/g, '');
        });
      }
    }, 50);
  }
}// Estado inicial - FORZAR modo oscuro
let darkMode = true; // Cambia esto a true para forzar modo oscuro

// Asegurar que el body tenga la clase correcta al inicio
body.classList.add("dark"); // Esto fuerza la clase dark

// Aplicar modo inicial
aplicarModo(true); // Esto fuerza el modo oscuro