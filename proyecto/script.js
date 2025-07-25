// --- productDemos.js ---
// Assumes gsap and ScrollTrigger are loaded globally
const DISTANCE_PER_ELEMENT = 800;
function getDemoElements() {
  return {
    possibleOwnerScrollableText: window.gsap.utils.toArray(
      document.querySelector(".js-possible-owner-scroll").children
    ),
    fraudScanScrollableText: window.gsap.utils.toArray(
      document.querySelector(".js-fraud-scan-scroll").children
    ),
    demos: document.querySelector(".js-demos"),
  };
}
function __initSectionScrollTrigger(animation, elementsLength) {
  window.ScrollTrigger.create({
    animation: animation,
    trigger: ".js-demos",
    pin: ".js-demos",
    start: "center center",
    end: `+=${DISTANCE_PER_ELEMENT * elementsLength}px`,
    scrub: true,
    snap: 1 / (elementsLength - 1),
    anticipatePin: 1,
  });
}
function __animationScrollTrigger(animation, distance, demos) {
  window.ScrollTrigger.create({
    trigger: demos,
    animation: animation,
    start: "top center",
    end: `+=${distance}px`,
    toggleActions: "play pause restart reset",
  });
}

function __generateStepsAnimation(timeline, items) {
  items.forEach((container, i) => {
    if (items[i - 1]) {
      timeline.to(items[i - 1], { yPercent: `-=100`, opacity: 0 });
      timeline.to(container, { yPercent: -100 * i, opacity: 1 }, "<");
    }
  });
}
function __initSectionScrollAnimation() {
  const demosContainer = document.querySelector(".js-demos-container");
  const possibleDemo = document.querySelector(".js-possible-owner-demo");
  const fraudScanDemo = document.querySelector(".js-fraud-scan-demo");
  const elements = getDemoElements();
  const elementsLength =
    elements.possibleOwnerScrollableText.length +
    elements.fraudScanScrollableText.length;
  const timeline = window.gsap.timeline();
  timeline.set(demosContainer, { height: "auto" });
  __generateStepsAnimation(timeline, elements.possibleOwnerScrollableText);
  timeline
    .to(demosContainer, {
      height: () => {
        return possibleDemo.clientHeight;
      },
    })
    .to(
      possibleDemo,
      {
        position: "absolute",
        left: 0,
        top: 0,
        opacity: 0,
        display: "none",
        y: -100,
        x: 0,
      },
      "<"
    )
    .to(
      fraudScanDemo,
      { display: "flex", opacity: 1, position: "static", y: 0, x: 0 },
      "<"
    )
    .to(demosContainer, { height: "auto" }, "<");
  __generateStepsAnimation(timeline, elements.fraudScanScrollableText);
  __initSectionScrollTrigger(timeline, elementsLength);
}
function initProductDemos() {
  __initSectionScrollAnimation();
}

// --- Main init function ---
function initAll() {
  initProductDemos();
}

document.addEventListener("DOMContentLoaded", initAll);
