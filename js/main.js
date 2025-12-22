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
      // ✅ AÑADIR CLASE "dark" AL BODY
      body.classList.add("dark");
      
      // ✅ MODO OSCURO REAL (gradiente lila/morado)
      imgLight.style.opacity = "0";
      imgDark.style.opacity = "1";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      
      // Fondo gradiente oscuro (lila/morado)
      body.style.background = "linear-gradient(135deg, #0a0a0a, #3b0764)";
      body.style.color = "#f1f1f1";
      
      // Botón - indica que puedes cambiar a CLARO
      modeToggle.textContent = "Modo Claro";
      modeToggle.style.backgroundColor = "#5a0ca3";
      modeToggle.style.color = "white";
      
      // ✅ APLICAR ESTILOS AL TÍTULO EN MODO OSCURO (BLANCO)
       // MODO OSCURO: BLANCO
      perfilTitle.style.color = "#000000ff";
      perfilTitle.style.backgroundColor = "#1a1a1a";
      perfilTitle.style.textShadow = 
        "3px 3px 0 #ffffff, -3px -3px 0 #ffffff, 3px -3px 0 #ffffff, -3px 3px 0 #ffffff, 0 0 20px #ffffff, 0 0 40px #ffffff";
      perfilTitle.style.border = "2px solid #ffffff";
      perfilTitle.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.7), inset 0 0 10px rgba(0, 0, 0, 0.3)";
    
      
    } else {
      // ✅ QUITAR CLASE "dark" DEL BODY
      body.classList.remove("dark");
      
      // ✅ MODO CLARO REAL (fondo blanco)
      imgLight.style.opacity = "1";
      imgDark.style.opacity = "0";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      
      // Fondo blanco
      body.style.background = "white";
      body.style.color = "black";
      
      // Botón - indica que puedes cambiar a OSCURO
      modeToggle.textContent = "Modo Oscuro";
      modeToggle.style.backgroundColor = "white";
      modeToggle.style.color = "black";
      
      // ✅ APLICAR ESTILOS AL TÍTULO EN MODO CLARO (MORADO)
      if (perfilTitle) {
        perfilTitle.style.color = "#8b00ff";
        perfilTitle.style.backgroundColor = "#f5f5f5"; // Gris claro
        perfilTitle.style.textShadow = 
          "3px 3px 0 #ffffff, -3px -3px 0 #ffffff, 3px -3px 0 #ffffff, -3px 3px 0 #ffffff, 0 0 20px #8b00ff, 0 0 40px #8b00ff";
        perfilTitle.style.border = "2px solid #8b00ff";
        perfilTitle.style.boxShadow = "0 0 15px rgba(139, 0, 255, 0.7), inset 0 0 10px rgba(139, 0, 255, 0.3)";
      }
    }
  }

  // ✅ APLICAR ESTILOS BASE AL TÍTULO
  if (perfilTitle) {
    perfilTitle.style.fontFamily = "'Bebas Neue', cursive";
    perfilTitle.style.padding = "0.5rem 1.5rem";
    perfilTitle.style.borderRadius = "12px";
    perfilTitle.style.display = "inline-block";
    perfilTitle.style.margin = "1rem 0";
    perfilTitle.style.transition = "all 0.5s ease";
    
    // Aplicar estilos iniciales basados en el modo actual
    if (darkMode) {
      // MODO OSCURO: BLANCO
      perfilTitle.style.color = "#000000ff";
      perfilTitle.style.backgroundColor = "#1a1a1a";
      perfilTitle.style.textShadow = 
        "3px 3px 0 #ffffff, -3px -3px 0 #ffffff, 3px -3px 0 #ffffff, -3px 3px 0 #ffffff, 0 0 20px #ffffff, 0 0 40px #ffffff";
      perfilTitle.style.border = "2px solid #ffffff85";
      perfilTitle.style.boxShadow = "0 0 15px rgba(0, 0, 0, 1), inset 0 0 10px rgba(0, 0, 0, 0.3)";
    } else {
      // MODO CLARO: MORADO
      perfilTitle.style.color = "#8b00ff";
      perfilTitle.style.backgroundColor = "#f5f5f5";
      perfilTitle.style.textShadow = 
        "3px 3px 0 #ffffff, -3px -3px 0 #ffffff, 3px -3px 0 #ffffff, -3px 3px 0 #ffffff, 0 0 20px #8b00ff, 0 0 40px #8b00ff";
      perfilTitle.style.border = "2px solid #8b00ff";
      perfilTitle.style.boxShadow = "0 0 15px rgba(139, 0, 255, 0.7), inset 0 0 10px rgba(139, 0, 255, 0.3)";
    }
  }

  // Carrusel de frases - SOLO 3 FRASES
  const frases = ["Rafa 930", "LA MINA", "930"];
  
  let fraseIndex = 0;
  
  if (carouselText) {
    // Cambio suave de frases
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
    
    // Cambiar cada 3 segundos
    setInterval(cambiarFrase, 3000);
  }

  // Sistema de pestañas mejorado
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Obtener ID del tab a mostrar
      const tabId = tab.getAttribute("data-tab");
      
      // Actualizar estado de pestañas
      tabs.forEach(t => {
        t.setAttribute("aria-selected", "false");
        t.classList.remove("bg-purple-700", "ring-2", "ring-purple-300");
        t.classList.add("bg-purple-600");
      });
      
      // Activar pestaña clickeada
      tab.setAttribute("aria-selected", "true");
      tab.classList.remove("bg-purple-600");
      tab.classList.add("bg-purple-700", "ring-2", "ring-purple-300");
      
      // Mostrar panel correspondiente
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

  // Función mejorada para enlaces de email
  function setupEmailLink(elementId, email, subject = "Consulta Musical", bodyText = "Hola Rafa,\n\nMe gustaría contactarte sobre...") {
    const element = document.getElementById(elementId);
    if (element) {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        
        const subjectEncoded = encodeURIComponent(subject);
        const bodyEncoded = encodeURIComponent(bodyText);
        
        // Intentar abrir cliente de correo nativo
        const mailtoLink = `mailto:${email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
        window.location.href = mailtoLink;
        
        // Fallback: abrir Gmail después de un breve retraso
        setTimeout(() => {
          const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${email}&su=${subjectEncoded}&body=${bodyEncoded}`;
          window.open(gmailUrl, "_blank", "noopener,noreferrer");
        }, 1000);
      });
    }
  }

  // Configurar enlaces de email
  setupEmailLink(
    "contactEmail", 
    "rafa930.music@gmail.com",
    "Consulta Musical - Sitio Web Rafa 930",
    "Hola Rafa 930,\n\nVi tu página web y me gustaría contactarte para:\n\n- Colaboración musical\n- Contratación para evento\n- Consulta sobre tu música\n- Otro motivo\n\nEspero tu respuesta.\n\nSaludos,"
  );

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

  // Ajustar al cargar y al redimensionar
  ajustarTitulo();
  window.addEventListener("resize", ajustarTitulo);

  // Añadir animaciones suaves para transiciones
  document.documentElement.style.scrollBehavior = "smooth";
  
  // Añadir efecto de carga
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 300);
});