document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const btn = document.getElementById('modeToggle');

  // Restaurar preferencia guardada
  if (localStorage.getItem('darkMode') === "true") {
    body.classList.add('dark');
    btn.textContent = "Modo Oscuro";
  } else {
    body.classList.remove('dark');
    btn.textContent = "Modo Claro";
  }

  // Cambiar modo al hacer clic
  btn.addEventListener("click", () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    btn.textContent = isDark ? "Modo Oscuro" : "Modo Claro";
    localStorage.setItem('darkMode', isDark);
  });

  // --- Carrusel de frases ---
  const frases = ["Rafa 930", "LA MINA", "930"];
  const carouselText = document.getElementById("carousel-text");
  let i = 0;

  setInterval(() => {
    carouselText.style.opacity = 0;
    setTimeout(() => {
      i = (i + 1) % frases.length;
      carouselText.textContent = frases[i];
      carouselText.style.opacity = 1;
    }, 300);
  }, 2000);

  // --- Pestañas ---
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

  // --- Enlaces de email ---
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