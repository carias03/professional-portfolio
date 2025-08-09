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
        toggleActions: "play none none none",
      },
    });
  });
}

function formValidation() {
  const form = document.querySelector(".js-contact-form");
  const inputs = form.querySelectorAll("input, textarea");

  const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Detectar idioma actual (usa tu variable global del switch)
  function getLang() {
    const languageToggle = document.getElementById("language-toggle");
    return languageToggle.checked ? "en" : "es";
  }

  // Mensajes de error por idioma
  const errorMessages = {
    es: {
      nameRequired: "El nombre es obligatorio.",
      nameInvalid: "El nombre solo debe contener letras y espacios.",
      emailRequired: "El correo es obligatorio.",
      emailInvalid: "El correo no tiene un formato válido.",
      messageRequired: "El mensaje es obligatorio.",
    },
    en: {
      nameRequired: "Name is required.",
      nameInvalid: "Name must contain only letters and spaces.",
      emailRequired: "Email is required.",
      emailInvalid: "Email is not valid.",
      messageRequired: "Message is required.",
    },
  };

  function validateName(value) {
    const lang = getLang();
    if (!value.trim()) return errorMessages[lang].nameRequired;
    if (!nameRegex.test(value)) return errorMessages[lang].nameInvalid;
    return null;
  }

  function validateEmail(value) {
    const lang = getLang();
    if (!value.trim()) return errorMessages[lang].emailRequired;
    if (!emailRegex.test(value)) return errorMessages[lang].emailInvalid;
    return null;
  }

  function validateMessage(value) {
    const lang = getLang();
    if (!value.trim()) return errorMessages[lang].messageRequired;
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

  // Validación en tiempo real
  inputs.forEach((input) => {
    ["input", "change", "keyup"].forEach((evt) =>
      input.addEventListener(evt, () => validateField(input))
    );
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

const translations = {
  es: {
    heroHeadline: "¡Hola! Soy Caro Arias",
    heroSubheadline0: "Desarrolladora Front-End",
    heroSubheadline1: "Diseñadora de experiencias",
    heroSubheadline2: "Creadora visual y funcional",
    heroSubheadline3: "Apasionada por el detalle",
    heroText:
      "Con una base sólida en ingeniería del software y una mirada analítica forjada en la ciencia, transformo ideas en interfaces funcionales, accesibles y visualmente atractivas. Mi enfoque combina creatividad, detalle y empatía para aportar soluciones web centradas en el usuario.",
    heroButton: "Construyamos algo juntos",
    projectsHeadline: "Lo que he creado",
    hivefitSubtitle:
      "Gestión de tu centro fitness con tecnología intuitiva y eficiente",
    hivefitFeaturesTitle: "Funcionalidades:",
    hivefitFeature0: "Gestión de clientes y pagos",
    hivefitFeature1: "Rutinas personalizadas por usuario",
    hivefitFeature2: "Calendario de clases y horarios",
    hivefitFeature3: "Control de membresías y alertas",
    cbf12Subtitle: "Videojuego de plataformas con enfoque creativo",
    cbf12FeaturesTitle: "Características:",
    cbf12Feature0: "Estética retro y colorida",
    cbf12Feature1: "Dificultad progresiva y disfrutable",
    cbf12Feature2: "Controles fluidos e intuitivos",
    cbf12Feature3: "Uso de color para guiar",
    sicaSubtitle: "Gestión inteligente de activos físicos",
    sicaFeaturesTitle: "Funcionalidades:",
    sicaFeature0: "Registro y trazabilidad de activos",
    sicaFeature1: "Gestión de traslados",
    sicaFeature2: "Reportes personalizados",
    sicaFeature3: "Roles de usuario",
    skillsHeadline: "Lo que aporto a mi equipo",
    skillsTechnical: "Habilidades Técnicas",
    skillsSoft: "Habilidades Blandas",
    skillsValues: "Valores",
    skillsTechnicalList0: "HTML5, CSS3, JavaScript",
    skillsTechnicalList1: "Node.js, Webpack",
    skillsTechnicalList2: "GSAP, SQL Server",
    skillsTechnicalList3: "Control de versiones con Git",
    skillsTechnicalList4: "Trabajo en entornos ágiles (Jira, SCRUM)",
    skillsSoftList0: "Responsabilidad y compromiso",
    skillsSoftList1: "Comunicación efectiva y empatía",
    skillsSoftList2: "Colaboración interdisciplinaria",
    skillsSoftList3: "Liderazgo y proactividad",
    skillsSoftList4: "Atención al detalle",
    skillsValuesList0:
      "<strong>Responsabilidad:</strong> Entrego lo que me comprometo, de forma ordenada y eficiente.",
    skillsValuesList1:
      "<strong>Excelencia:</strong> Me enfoco en la calidad del código y la experiencia visual.",
    skillsValuesList2:
      "<strong>Colaboración:</strong> Disfruto trabajar en equipo y comunicarme con claridad.",
    experienceHeadline: "Lo que me respalda",
    experienceSubheadline:
      "Trayectoria profesional en LTV Co desarrollando interfaces de alto impacto",
    experienceCardTitle0: "Optimización UX",
    experienceCardText0:
      "Mejora continua de la experiencia de usuario pre-paywall para aumentar conversiones.",
    experienceCardTitle1: "Desarrollo Front-End",
    experienceCardText1:
      "Implementación de interfaces y componentes reutilizables con buenas prácticas de código.",
    experienceCardTitle2: "Colaboración Ágil",
    experienceCardText2:
      "Trabajo en equipo con diseñadores, product managers y QA bajo metodologías ágiles.",
    experienceCardTitle3: "Integración de Tests",
    experienceCardText3:
      "Validación de cambios mediante pruebas A/B para medir impacto real en métricas.",
    experienceCardTitle4: "Documentación Eficiente",
    experienceCardText4:
      "Actualización de guías y procesos técnicos para facilitar el onboarding y la ejecución.",
    experienceCardTitle5: "De diseño a código",
    experienceCardText5:
      "Traducción fiel de prototipos y diseños en experiencias interactivas funcionales.",
    statsHeadline: "Lo que dicen los números",
    statsText0: "años creando soluciones digitales efectivas",
    statsText1: "implementaciones en interfaces web",
    statsText2: "tecnologías y herramientas a tu servicio",
    contactHeadline: "Tu próximo proyecto comienza aquí",
    contactLabelName: "Nombre",
    contactLabelEmail: "Correo electrónico",
    contactLabelMessage: "Mensaje",
    contactButtonSend: "Enviar",
    footerText: "Todos los derechos reservados.",
  },
  en: {
    heroHeadline: "Hi! I'm Caro Arias",
    heroSubheadline0: "Front-End Developer",
    heroSubheadline1: "Experience Designer",
    heroSubheadline2: "Visual and Functional Creator",
    heroSubheadline3: "Passionate about Detail",
    heroText:
      "With a solid foundation in software engineering and an analytical mindset forged in science, I transform ideas into functional, accessible, and visually appealing interfaces. My approach combines creativity, attention to detail, and empathy to deliver user-centered web solutions.",
    heroButton: "Let's build something together",
    projectsHeadline: "What I've created",
    hivefitSubtitle:
      "Manage your fitness center with intuitive and efficient technology",
    hivefitFeaturesTitle: "Features:",
    hivefitFeature0: "Client and payment management",
    hivefitFeature1: "Personalized routines per user",
    hivefitFeature2: "Class and schedule calendar",
    hivefitFeature3: "Membership control and alerts",
    cbf12Subtitle: "Platformer video game with a creative focus",
    cbf12FeaturesTitle: "Characteristics:",
    cbf12Feature0: "Retro and colorful aesthetics",
    cbf12Feature1: "Progressive and enjoyable difficulty",
    cbf12Feature2: "Smooth and intuitive controls",
    cbf12Feature3: "Use of color as guidance",
    sicaSubtitle: "Smart management of physical assets",
    sicaFeaturesTitle: "Features:",
    sicaFeature0: "Asset registration and traceability",
    sicaFeature1: "Transfer management",
    sicaFeature2: "Custom reports",
    sicaFeature3: "User roles",
    skillsHeadline: "What I bring to my team",
    skillsTechnical: "Technical Skills",
    skillsSoft: "Soft Skills",
    skillsValues: "Values",
    skillsTechnicalList0: "HTML5, CSS3, JavaScript",
    skillsTechnicalList1: "Node.js, Webpack",
    skillsTechnicalList2: "GSAP, SQL Server",
    skillsTechnicalList3: "Version control with Git",
    skillsTechnicalList4: "Work in agile environments (Jira, SCRUM)",
    skillsSoftList0: "Responsibility and commitment",
    skillsSoftList1: "Effective communication and empathy",
    skillsSoftList2: "Interdisciplinary collaboration",
    skillsSoftList3: "Leadership and proactivity",
    skillsSoftList4: "Attention to detail",
    skillsValuesList0:
      "<strong>Responsibility:</strong> I deliver what I commit to, in an organized and efficient way.",
    skillsValuesList1:
      "<strong>Excellence:</strong> I focus on code quality and visual experience.",
    skillsValuesList2:
      "<strong>Collaboration:</strong> I enjoy working in teams and communicating clearly.",
    experienceHeadline: "What supports me",
    experienceSubheadline:
      "Professional background at LTV Co developing high-impact interfaces",
    experienceCardTitle0: "UX Optimization",
    experienceCardText0:
      "Continuous improvement of the pre-paywall user experience to increase conversions.",
    experienceCardTitle1: "Front-End Development",
    experienceCardText1:
      "Implementation of reusable interfaces and components with best coding practices.",
    experienceCardTitle2: "Agile Collaboration",
    experienceCardText2:
      "Teamwork with designers, product managers, and QA under agile methodologies.",
    experienceCardTitle3: "Test Integration",
    experienceCardText3:
      "Validation of changes through A/B testing to measure real impact on metrics.",
    experienceCardTitle4: "Efficient Documentation",
    experienceCardText4:
      "Updating guides and technical processes to facilitate onboarding and execution.",
    experienceCardTitle5: "From Design to Code",
    experienceCardText5:
      "Faithful translation of prototypes and designs into functional interactive experiences.",
    statsHeadline: "What the numbers say",
    statsText0: "years creating effective digital solutions",
    statsText1: "implementations in web interfaces",
    statsText2: "technologies and tools at your service",
    contactHeadline: "Your next project starts here",
    contactLabelName: "Name",
    contactLabelEmail: "Email",
    contactLabelMessage: "Message",
    contactButtonSend: "Send",
    footerText: "All rights reserved.",
  },
};

function translatePage(lang = "en") {
  const langTranslations = translations[lang];
  const elements = document.querySelectorAll("[data-translate]");

  elements.forEach((el) => {
    const key = el.getAttribute("data-translate");
    let translatedText = langTranslations[key];

    if (translatedText) {
      el.innerHTML = translatedText;
    } else {
      console.warn(`Translation missing for key: ${key}`);
    }
  });
}

function translateEventListener() {
  const languageToggle = document.querySelector(".js-language-toggle");
  let currentLang = "es";

  languageToggle.addEventListener("change", () => {
    const form = document.querySelector(".js-contact-form");
    const inputs = form.querySelectorAll("input, textarea");

    currentLang = languageToggle.checked ? "en" : "es";
    translatePage(currentLang);

    inputs.forEach((input) => {
      const errorElement = input.parentElement.querySelector(".js-error");
      input.classList.remove("error");
      errorElement.textContent = "";
      errorElement.classList.add("d-none");
    });
  });
}

function scrollToContact() {
  document.querySelector(".js-hero-cta").addEventListener("click", () => {
    document.querySelector(".js-contact-section").scrollIntoView({
      behavior: "smooth",
    });
  });
}

function init() {
  translateEventListener();
  textAnimation();
  numbersAnimation();
  formValidation();
  scrollToContact();
}

document.addEventListener("DOMContentLoaded", init);
