function textAnimation() {
  gsap.registerPlugin(TextPlugin);
  const contentElements = document.querySelectorAll(".js-hero-subheadline");
  const durationPerLetter = 0.07;
  const pauseAfterWrite = 2;
  const pauseAfterErase = 0.2;
  const timeline = gsap.timeline({ repeat: -1 });

  contentElements.forEach((el) => {
    const fullText = el.innerHTML.trim();
    el.innerHTML = "";

    const writeDuration = Math.max(fullText.length * durationPerLetter, 0.5);
    const eraseDuration = Math.max(
      fullText.length * durationPerLetter * 0.8,
      0.3
    );

    timeline.call(
      () => {
        contentElements.forEach((e) => e.classList.remove("typing"));
        el.classList.add("typing");
      },
      null,
      "+=0"
    );

    // Animación de escritura
    timeline.to(el, {
      text: fullText,
      duration: writeDuration,
      ease: "none",
    });

    // Pausa después de escribir
    timeline.to({}, { duration: pauseAfterWrite });

    // Animación de borrado que simula backspace
    timeline.to(
      { progress: 1 },
      {
        progress: 0,
        duration: eraseDuration,
        ease: "none",
        onUpdate: function () {
          const p = this.targets()[0].progress;
          const charsToShow = Math.floor(fullText.length * p);
          el.innerHTML = fullText.slice(0, charsToShow);
        },
      }
    );

    // Pausa después de borrar
    timeline.to({}, { duration: pauseAfterErase });
  });
}

function numbersAnimation() {
  gsap.registerPlugin(ScrollTrigger);
  const numberElements = document.querySelectorAll(".js-stats-number");

  numberElements.forEach((numberEl) => {
    const finalValue = parseInt(numberEl.textContent, 10);
    let valor = { val: 0 };

    gsap.to(valor, {
      val: finalValue,
      duration: 2,
      ease: "power1.out",
      onUpdate: () => {
        numberEl.textContent = Math.floor(valor.val);
      },

      scrollTrigger: {
        trigger: ".js-stat-cards",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    });
  });
}

function formValidation() {
  const form = document.querySelector(".js-contact-form");
  const inputs = form.querySelectorAll("input, textarea");

  const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateName(value) {
    if (!value.trim()) return "El nombre es obligatorio.";
    if (!nameRegex.test(value))
      return "El nombre solo debe contener letras y espacios.";
    return null;
  }

  function validateEmail(value) {
    if (!value.trim()) return "El correo es obligatorio.";
    if (!emailRegex.test(value)) return "El correo no tiene un formato válido.";
    return null;
  }

  function validateMessage(value) {
    if (!value.trim()) return "El mensaje es obligatorio.";
    return null;
  }

  function validateField(input) {
    const value = input.value;
    let error = null;

    switch (input.name) {
      case "contact-name":
        error = validateName(value);
        break;
      case "contact-email":
        error = validateEmail(value);
        break;
      case "contact-message":
        error = validateMessage(value);
        break;
    }

    const errorElement = input.parentElement.querySelector(".js-error");

    if (error) {
      input.classList.add("error");
      errorElement.textContent = error;
      errorElement.classList.remove("d-none");
    } else {
      input.classList.remove("error");
      errorElement.textContent = "";
      errorElement.classList.add("d-none");
    }

    return !error;
  }

  function validateForm() {
    let isValid = true;
    inputs.forEach((input) => {
      const valid = validateField(input);
      if (!valid) isValid = false;
    });
    return isValid;
  }

  // Validación en tiempo real por input
  inputs.forEach((input) => {
    input.addEventListener("input", () => validateField(input));
    input.addEventListener("change", () => validateField(input));
    input.addEventListener("keyup", () => validateField(input));
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      form.reset();
      inputs.forEach((input) => {
        const errorElement = input.parentElement.querySelector(".js-error");
        input.classList.remove("error");
        errorElement.textContent = "";
        errorElement.classList.add("d-none");
      });
    } else {
      validateForm();
    }
  });
}

function init() {
  textAnimation();
  numbersAnimation();
  formValidation();
}

document.addEventListener("DOMContentLoaded", init);
