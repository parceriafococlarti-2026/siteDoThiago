(function () {
  var diagnosticoUrl = "https://form.jotform.com/261315654088056";
  var diagnosticoModal = document.getElementById("diagnostico-modal");
  var diagnosticoButtons = document.querySelectorAll("[data-diagnostico-cta]");
  var modalCloseButtons = diagnosticoModal
    ? diagnosticoModal.querySelectorAll("[data-modal-close]")
    : [];
  var modalConfirmButton = diagnosticoModal
    ? diagnosticoModal.querySelector(".redirect-modal__confirm")
    : null;
  var lastFocusedElement = null;

  function initFadeIn() {
    var fadeElements = document.querySelectorAll(".fade-in");

    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(fadeElements, function (element) {
        element.classList.add("visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 },
    );

    Array.prototype.forEach.call(fadeElements, function (element) {
      observer.observe(element);
    });
  }

  function openDiagnosticoModal() {
    if (!diagnosticoModal) return;

    lastFocusedElement = document.activeElement;
    diagnosticoModal.hidden = false;
    document.body.classList.add("modal-open");

    if (modalConfirmButton) {
      modalConfirmButton.focus();
    }
  }

  function closeDiagnosticoModal() {
    if (!diagnosticoModal) return;

    diagnosticoModal.hidden = true;
    document.body.classList.remove("modal-open");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  function initDiagnosticoModal() {
    Array.prototype.forEach.call(diagnosticoButtons, function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        openDiagnosticoModal();
      });
    });

    Array.prototype.forEach.call(modalCloseButtons, function (button) {
      button.addEventListener("click", closeDiagnosticoModal);
    });

    if (modalConfirmButton) {
      modalConfirmButton.addEventListener("click", function () {
        window.location.href = diagnosticoUrl;
      });
    }

    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        diagnosticoModal &&
        !diagnosticoModal.hidden
      ) {
        closeDiagnosticoModal();
      }
    });
  }

  initFadeIn();
  initDiagnosticoModal();
})();
