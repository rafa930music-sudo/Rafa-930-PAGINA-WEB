document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const modeToggle = document.getElementById("modeToggle");
  const videoLight = document.getElementById("videoLight");
  const videoDark = document.getElementById("videoDark");
  const overlay = document.getElementById("overlay");
  const carouselText = document.getElementById("carousel-text");
  const perfilTitle = document.getElementById("perfilTitle");

  // Restaurar preferencia guardada
  let darkMode = localStorage.getItem("darkMode") === "true";
  aplicarModo(darkMode);

  modeToggle.addEventListener("click", () => {
    darkMode = !darkMode;
    localStorage.setItem("darkMode", darkMode);
    aplicarModo(darkMode);
  });
function aplicarModo(isDark) {
  const perfilTitle = document.getElementById("perfilTitle");

  if (isDark) {
    // Header
    videoLight.style.opacity = "0";
    videoDark.style.opacity = "1";
    overlay.style.backgroundColor = "rgba(131,12,196,0.5)"; // overlay semi-transparente

    // Fondo y texto general con gradiente violeta difuminado
    body.style.background = "linear-gradient(135deg, #830cc4 0%, #5a0ca3 100%)";
    body.style.color = "white";

    // Título perfil
    perfilTitle.style.color = "white";

    // Botón
    modeToggle.textContent = "Modo Oscuro";
    modeToggle.style.backgroundColor = "#5a0ca3"; // botón violeta más oscuro
    modeToggle.style.color = "white";
  } else {
    // Header
    videoLight.style.opacity = "1";
    videoDark.style.opacity = "0";
    overlay.style.backgroundColor = "rgba(0,0,0,0.3)";

    // Fondo y texto general
    body.style.background = "white";
    body.style.color = "black";

    // Título perfil
    perfilTitle.style.color = "black";

    // Botón
    modeToggle.textContent = "Modo Claro";
    modeToggle.style.backgroundColor = "white";
    modeToggle.style.color = "black";
  }
}


  // Carrusel de frases
  const frases = ["Rafa 930", "LA MINA", "930"];
  let i = 0;
  setInterval(() => {
    carouselText.style.opacity = 0;
    setTimeout(() => {
      i = (i + 1) % frases.length;
      carouselText.textContent = frases[i];
      carouselText.style.opacity = 1;
    }, 300);
  }, 2000);

  // Pestañas
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-content");

  tabs.forEach(btnTab => {
    btnTab.addEventListener("click", () => {
      tabs.forEach(b => b.setAttribute("aria-selected","false"));
      panels.forEach(p => p.classList.add("hidden"));
      btnTab.setAttribute("aria-selected","true");
      document.getElementById(btnTab.dataset.tab).classList.remove("hidden");
    });
  });

  // Enlaces de email
  function setupEmailLink(elementId, email) {
    const el = document.getElementById(elementId);
    if(el){
      el.addEventListener('click', e => {
        e.preventDefault();
        window.location.href = "mailto:" + email;
        setTimeout(() => {
          const subject = encodeURIComponent("Consulta Musical");
          const body = encodeURIComponent("Hola Rafa,\n\nMe gustaría contactarte sobre...");
          const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${email}&su=${subject}&body=${body}`;
          window.open(gmailUrl, "_blank");
        }, 500);
      });
    }
  }

  setupEmailLink("headerEmail", "rafa930.music@gmail.com");
  setupEmailLink("nameEmail", "rafa930.music@gmail.com");
  setupEmailLink("contactEmail", "rafa930.music@gmail.com");
});
const perfilTitle = document.getElementById("perfilTitle");

// Cambiar tamaño de texto
perfilTitle.style.fontSize = "3rem"; // ejemplo: 3rem = 48px