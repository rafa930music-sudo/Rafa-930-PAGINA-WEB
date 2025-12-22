document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const modeToggle = document.getElementById("modeToggle");
  const imgLight = document.getElementById("imgLight");
  const imgDark = document.getElementById("imgDark");
  const overlay = document.getElementById("overlay");
  const carouselText = document.getElementById("carousel-text");

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
      // ✅ MODO OSCURO
      body.classList.add("dark");
      body.classList.remove("light");
      
      // Imágenes
      imgLight.style.opacity = "0";
      imgDark.style.opacity = "1";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      
      // Botón
      modeToggle.textContent = "Modo Claro";
      modeToggle.style.backgroundColor = "#5a0ca3";
      modeToggle.style.color = "white";
      
    } else {
      // ✅ MODO CLARO
      body.classList.remove("dark");
      body.classList.add("light");
      
      // Imágenes
      imgLight.style.opacity = "1";
      imgDark.style.opacity = "0";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      
      // Botón
      modeToggle.textContent = "Modo Oscuro";
      modeToggle.style.backgroundColor = "white";
      modeToggle.style.color = "black";
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

  // Función para enlaces de email
  function setupEmailLink(elementId, email, subject = "Consulta Musical", bodyText = "Hola Rafa,\n\nMe gustaría contactarte sobre...") {
    const element = document.getElementById(elementId);
    if (element) {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        
        const subjectEncoded = encodeURIComponent(subject);
        const bodyEncoded = encodeURIComponent(bodyText);
        
        const mailtoLink = `mailto:${email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
        window.location.href = mailtoLink;
        
        setTimeout(() => {
          const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${email}&su=${subjectEncoded}&body=${bodyEncoded}`;
          window.open(gmailUrl, "_blank", "noopener,noreferrer");
        }, 1000);
      });
    }
  }

  setupEmailLink(
    "contactEmail", 
    "rafa930.music@gmail.com",
    "Consulta Musical - Sitio Web Rafa 930",
    "Hola Rafa 930,\n\nVi tu página web y me gustaría contactarte para:\n\n- Colaboración musical\n- Contratación para evento\n- Consulta sobre tu música\n- Otro motivo\n\nEspero tu respuesta.\n\nSaludos,"
  );

  document.documentElement.style.scrollBehavior = "smooth";
});