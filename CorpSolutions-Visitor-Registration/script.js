// --------- Navegación entre secciones --------- //
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.page-section');

// Función para quitar clase "active" de todos los enlaces
function clearActiveLinks() {
  navLinks.forEach(link => link.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetSection = event.target.getAttribute('data-section');
    // Oculta todas las secciones con animación
    sections.forEach(section => {
      section.style.display = 'none';
      section.classList.remove('fade-in');
    });
    // Muestra la sección seleccionada con efecto
    const activeSection = document.getElementById(targetSection);
    activeSection.style.display = 'block';
    setTimeout(() => activeSection.classList.add('fade-in'), 50);
    clearActiveLinks();
    event.target.classList.add('active');
  });
});

// --------- Registro de Visitantes --------- //
// Form and Table Elements
const form = document.getElementById('visitorForm');
const visitorTable = document.getElementById('visitorTable').querySelector('tbody');

// Función para mostrar mensaje de error
function showError(input, message) {
  const errorSpan = document.getElementById(`${input.id}Error`);
  errorSpan.textContent = message;
  errorSpan.style.display = 'block';
  input.style.borderColor = '#E53935';
}

// Función para limpiar mensaje de error
function clearError(input) {
  const errorSpan = document.getElementById(`${input.id}Error`);
  errorSpan.textContent = '';
  errorSpan.style.display = 'none';
  input.style.borderColor = '#CCCCCC';
}

// Valida formato de cédula
function validateCedula(cedula) {
  const cedulaRegex = /^\d{3}-\d{6}-\d{4}[A-Z]$/;
  return cedulaRegex.test(cedula);
}

// Valida el formulario
function validateForm() {
  let isValid = true;

  // Validación de cédula
  const cedulaInput = document.getElementById('cedula');
  if (!validateCedula(cedulaInput.value)) {
    showError(cedulaInput, 'Formato de cédula inválido (999-999999-9999X).');
    isValid = false;
  } else {
    clearError(cedulaInput);
  }

  // Validación de los demás campos
  ['nombres', 'apellidos', 'departamento', 'motivo'].forEach((fieldId) => {
    const input = document.getElementById(fieldId);
    if (!input.value.trim()) {
      showError(input, 'Este campo es obligatorio.');
      isValid = false;
    } else {
      clearError(input);
    }
  });

  return isValid;
}

// Agrega el visitante a la tabla
function addVisitorToTable(visitor) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${visitor.cedula}</td>
    <td>${visitor.nombres}</td>
    <td>${visitor.apellidos}</td>
    <td>${visitor.departamento}</td>
    <td>${visitor.motivo}</td>
  `;
  visitorTable.appendChild(row);
}

// Maneja el envío del formulario de registro
if(form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateForm()) {
      const visitor = {
        cedula: document.getElementById('cedula').value,
        nombres: document.getElementById('nombres').value,
        apellidos: document.getElementById('apellidos').value,
        departamento: document.getElementById('departamento').value,
        motivo: document.getElementById('motivo').value,
      };

      addVisitorToTable(visitor);
      form.reset();
    }
  });
}

// --------- (Opcional) Manejo del formulario de Contáctanos --------- //
const contactForm = document.getElementById('contactForm');
if(contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Mensaje enviado. Nos pondremos en contacto contigo pronto.');
    contactForm.reset();
  });
}