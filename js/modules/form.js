import { showToast } from '../core/utils.js';
export function initForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;
  const successDiv = document.getElementById('formSuccess');
  const errorDiv = document.getElementById('formError');
  const inputs = document.querySelectorAll('.form-control[required], .form-select[required]');
  function validarCampo(input) {
    if (!input.value.trim()) {
      input.classList.add('invalid'); input.classList.remove('valid');
      return false;
    }
    if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        input.classList.add('invalid'); input.classList.remove('valid');
        return false;
      }
    }
    if (input.id === 'phone') {
      const phoneRegex = /^[+]?[\d\s]{7,15}$/;
      if (!phoneRegex.test(input.value.trim())) {
        input.classList.add('invalid'); input.classList.remove('valid');
        return false;
      }
    }
    input.classList.remove('invalid'); input.classList.add('valid');
    return true;
  }
  inputs.forEach(input => {
    input.addEventListener('blur', () => validarCampo(input));
    input.addEventListener('input', () => { if (input.classList.contains('invalid')) validarCampo(input); });
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let todoValido = true;
    inputs.forEach(input => { if (!validarCampo(input)) todoValido = false; });
    const privacy = document.getElementById('privacy');
    if (privacy && !privacy.checked) {
      privacy.parentElement.style.animation = 'shake 0.5s ease';
      setTimeout(() => { if (privacy.parentElement) privacy.parentElement.style.animation = ''; }, 500);
      todoValido = false;
    }
    if (!todoValido) {
      showToast('❌ Revisa los campos marcados en rojo', 'error');
      return;
    }
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn?.innerHTML || 'Enviar';
    if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'; btn.disabled = true; }
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
      if (response.ok) {
        if (successDiv) successDiv.style.display = 'block';
        if (errorDiv) errorDiv.style.display = 'none';
        form.reset();
        inputs.forEach(input => input.classList.remove('valid', 'invalid'));
        showToast('✅ Consulta enviada con éxito');
        setTimeout(() => { if (successDiv) successDiv.style.display = 'none'; }, 5000);
      } else throw new Error('Error');
    } catch (error) {
      if (errorDiv) errorDiv.style.display = 'block';
      showToast('❌ Error al enviar, intenta de nuevo', 'error');
      setTimeout(() => { if (errorDiv) errorDiv.style.display = 'none'; }, 5000);
    } finally {
      if (btn) { btn.innerHTML = originalText; btn.disabled = false; }
    }
  });
}