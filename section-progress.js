document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const sections = document.querySelectorAll(`[wb-section]`);
  sections.forEach((section) => {
    const sectionName = section.getAttribute("wb-section");
    const link = document.querySelector(`[wb-nav-link="${sectionName}"]`);
    if (!link) {
      console.log("No link found for section:", sectionName);
      return;
    }

    const bg = link.querySelector(".menu_button-anchor-bg");

    // Initial State off to the left
    gsap.set(bg, { xPercent: -101 });

    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const xTranslation = progress * 100 - 101;
        gsap.set(bg, { xPercent: xTranslation });
      },
      onLeave: () => {
        // End state animate off to right
        gsap.to(bg, { xPercent: 101, duration: 0.3, ease: "Power3.inOut" });
      },
    });
  });
});