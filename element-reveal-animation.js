window.addEventListener("DOMContentLoaded", (event) => {
    // Split text into spans
    let typeSplit = new SplitType("[text-split]", {
      types: "words, chars",
      tagName: "span"
    });
  
    // Link timelines to scroll position for other elements
    function createScrollTrigger(triggerElement, timeline) {
      // Reset tl when scroll out of view past bottom of screen
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top bottom",
        onLeaveBack: () => {
          timeline.progress(0);
          timeline.pause();
        }
      });
      // Play tl when scrolled into view
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 85%",
        onEnter: () => timeline.play()
      });
    }
  
    // Apply animations to elements
    $("[words-slide-up]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".word"), { opacity: 0, yPercent: 100, duration: 0.5, ease: "back.out(2)", stagger: { amount: 0.5 } });
      createScrollTrigger($(this), tl);
    }); 
    $("[words-slide-from-right]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".word"), { opacity: 0, x: "1em", duration: 0.6, ease: "power2.out", stagger: { amount: 0.2 } });
      createScrollTrigger($(this), tl);
    });
  
    $("[letters-slide-up]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".char"), { yPercent: 100, duration: 0.2, ease: "power1.out", stagger: { amount: 0.6 } });
      createScrollTrigger($(this), tl);
    });
  
    $("[letters-slide-down]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".char"), { yPercent: -120, duration: 0.3, ease: "power1.out", stagger: { amount: 0.7 } });
      createScrollTrigger($(this), tl);
    });
  
    $("[letters-fade-in]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".char"), { opacity: 0, duration: 0.2, ease: "power1.out", stagger: { amount: 0.8 } });
      createScrollTrigger($(this), tl);
    });
  
    $("[letters-fade-in-random]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".char"), { opacity: 0, duration: 0.05, ease: "power1.out", stagger: { amount: 0.4, from: "random" } });
      createScrollTrigger($(this), tl);
    });
  
    $("[letters-from-top-color]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      // Set the color to white before animation (same as external code)
      tl.set($(this).find(".char"), { color: '#c6d8b7' });  
      tl.from($(this).find(".char"), {
        y: "-100%",
        opacity: 0,
        stagger: {
          each: 0.06,
          from: "start",
          ease: "power1.in",
          onComplete: function () {
            // Change it to green when it completes (same as external code)
            gsap.to($(this.targets()[0]), { color: "#6dae2b" });
          }
        },
        duration: 0.4,
        ease: "power4.out"
      });
      createScrollTrigger($(this), tl);
    });
  
    $("[scrub-each-word]").each(function (index) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: "top 90%",
          end: "top center",
          scrub: true
        }
      });
      tl.from($(this).find(".word"), { opacity: 0.2, duration: 0.2, ease: "power1.out", stagger: { each: 0.4 } });
    });
  
    // Avoid flash of unstyled content
    gsap.set("[text-split]", { opacity: 1 });
  
    function startHomeAnimations() {
      let homeHeading = gsap.timeline();
      homeHeading.from("[home-reveal] .char", { opacity: 0, duration: 0.2, ease: "power1.out", stagger: { amount: 0.8 } });

      let intro = gsap.timeline({ delay: 0.5 }); // Delay of 0.5 seconds
      intro.add(homeHeading, 0);
      intro.from("[intro-paragraph] .char", { opacity: 0, duration: 0.4, ease: "power1.out", stagger: { amount: 0.8 } }, 0);
      intro.from("[dot-reveal]", 0.8, {opacity: 0, transformOrigin: "center", ease: Power2.out }, ">-0.2"); // Animate .dot-reveal after .home-reveal
      intro.from("[nav-bar]", 1, { opacity: 0, ease: "power3.inOut"}, ">-0.7"); // Animate [nav-bar] after [image]
      intro.from("[link_block]", 0.5, { opacity: 0, ease: "power1.out", stagger: 0.3 }, ">-0.2");
      intro.from("[link_bg]", 1, { opacity: 0, ease: "power2.inOut" }, ">-0.5");
    }

    // Call the startHomeAnimations function after the .trigger click
    $(".trigger").click(function() {
      setTimeout(startHomeAnimations, 1500); // Delay of 2 seconds (2000 milliseconds)
    });
});