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
      // Modo oscuro
      imgLight.style.opacity = "0";
      imgDark.style.opacity = "1";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      
      // Fondo gradiente oscuro
      body.style.background = "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)";
      body.style.color = "#e2e8f0";
      
      // Añadir clase para modo oscuro
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      
      // Botón - texto más claro
      modeToggle.textContent = "Modo Claro";
      modeToggle.style.backgroundColor = "#4f46e5";
      modeToggle.style.color = "white";
      modeToggle.style.border = "2px solid #6366f1";
      
    } else {
      // Modo claro
      imgLight.style.opacity = "1";
      imgDark.style.opacity = "0";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      
      // Fondo claro
      body.style.background = "white";
      body.style.color = "black";
      
      // Añadir clase para modo claro
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
      
      // Botón
      modeToggle.textContent = "Modo Oscuro";
      modeToggle.style.backgroundColor = "white";
      modeToggle.style.color = "black";
      modeToggle.style.border = "2px solid #e5e7eb";
    }
  }

  // Carrusel de frases mejorado
  const frases = [
    "Rafa 930", 
    "LA MINA", 
    "930",
    "Música Urbana Española",
    "Trap · Reggaetón · Rap"
  ];
  
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

  // Configurar enlaces de email (solo uno necesario)
  setupEmailLink(
    "contactEmail", 
    "rafa930.music@gmail.com",
    "Consulta Musical - Sitio Web Rafa 930",
    "Hola Rafa 930,\n\nVi tu página web y me gustaría contactarte para:\n\n- Colaboración musical\n- Contratación para evento\n- Consulta sobre tu música\n- Otro motivo\n\nEspero tu respuesta.\n\nSaludos,"
  );

  // Título responsivo (mejor usar clases CSS)
  function ajustarTitulo() {
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

// CSS adicional que puedes añadir a tu archivo styles.css
/*
.light-mode {
  --bg-color: white;
  --text-color: black;
}

.dark-mode {
  --bg-color: #1a1a2e;
  --text-color: #e2e8f0;
}

body.loaded * {
  transition: background-color 0.5s ease, 
              color 0.5s ease, 
              opacity 0.5s ease,
              transform 0.5s ease;
}

#carousel-text {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.tab-content {
  transition: opacity 0.3s ease;
}
*/