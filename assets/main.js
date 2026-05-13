// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }),
  { threshold: 0.1 },
);
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

const diagnosticoUrl = "https://form.jotform.com/261315654088056";
const diagnosticoModal = document.querySelector("#diagnostico-modal");
const diagnosticoButtons = document.querySelectorAll("[data-diagnostico-cta]");
const modalCloseButtons =
  diagnosticoModal?.querySelectorAll("[data-modal-close]");
const modalConfirmButton = diagnosticoModal?.querySelector(
  ".redirect-modal__confirm",
);
let lastFocusedElement = null;

const openDiagnosticoModal = () => {
  if (!diagnosticoModal) return;

  lastFocusedElement = document.activeElement;
  diagnosticoModal.hidden = false;
  document.body.classList.add("modal-open");
  modalConfirmButton?.focus();
};

const closeDiagnosticoModal = () => {
  if (!diagnosticoModal) return;

  diagnosticoModal.hidden = true;
  document.body.classList.remove("modal-open");

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
};

diagnosticoButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openDiagnosticoModal();
  });
});

modalCloseButtons?.forEach((button) => {
  button.addEventListener("click", closeDiagnosticoModal);
});

modalConfirmButton?.addEventListener("click", () => {
  window.location.href = diagnosticoUrl;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && diagnosticoModal && !diagnosticoModal.hidden) {
    closeDiagnosticoModal();
  }
});
