const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".page-section");

function showSection(sectionId) {
  sections.forEach((section) => {
    if (section.id === sectionId) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetSection = link.getAttribute("data-section");
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    showSection(targetSection);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  showSection("inicio");
});

const form = document.getElementById("visitorForm");
const visitorTable = document.getElementById("visitorTable").querySelector("tbody");

// 🟦 Contador de visitantes registrados
let count = 0;
function updateCounter() {
  document.getElementById("counter").textContent = `Visitantes registrados: ${++count}`;
}

function showError(input, message) {
  const errorSpan = document.getElementById(`${input.id}Error`);
  errorSpan.textContent = message;
  errorSpan.style.display = "block";
  input.style.borderColor = "#E53935";
}

function clearError(input) {
  const errorSpan = document.getElementById(`${input.id}Error`);
  errorSpan.textContent = "";
  errorSpan.style.display = "none";
  input.style.borderColor = "#CCCCCC";
}

function validateCedula(cedula) {
  const cedulaRegex = /^\d{3}-\d{6}-\d{4}[A-Z]$/;
  return cedulaRegex.test(cedula) && cedula.length === 16;
}

function validateForm() {
  let isValid = true;

  const cedulaInput = document.getElementById("cedula");
  if (!validateCedula(cedulaInput.value)) {
    showError(cedulaInput, "Formato de cédula inválido (999-999999-9999X).");
    isValid = false;
  } else {
    clearError(cedulaInput);
  }

  ["nombres", "apellidos", "departamento", "motivo"].forEach((fieldId) => {
    const input = document.getElementById(fieldId);
    if (!input.value.trim()) {
      showError(input, "Este campo es obligatorio.");
      isValid = false;
    } else {
      clearError(input);
    }
  });

  return isValid;
}

function addVisitorToTable(visitor) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${visitor.cedula}</td>
    <td>${visitor.nombres}</td>
    <td>${visitor.apellidos}</td>
    <td>${visitor.departamento}</td>
    <td>${visitor.motivo}</td>
  `;
  visitorTable.appendChild(row);
  updateCounter(); // 🔄 Actualiza el contador después de agregar
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (validateForm()) {
      const visitor = {
        cedula: document.getElementById("cedula").value,
        nombres: document.getElementById("nombres").value,
        apellidos: document.getElementById("apellidos").value,
        departamento: document.getElementById("departamento").value,
        motivo: document.getElementById("motivo").value,
      };

      addVisitorToTable(visitor);
      form.reset();
    }
  });
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Mensaje enviado. Nos pondremos en contacto contigo pronto.");
    contactForm.reset();
  });
}

