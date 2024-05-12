window.addEventListener("DOMContentLoaded", (event) => {
  let animationsPlayed = false; 

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
    $("[letters-fade-in]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".char"), { opacity: 0, duration: 0.2, ease: "power1.out", stagger: { amount: 0.8 } });
      createScrollTrigger($(this), tl);
    });
    
    $("[letters-fade-in-fast]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".char"), { opacity: 0, duration: 0.1, ease: "power1.out", stagger: { amount: 0.4 } });
      createScrollTrigger($(this), tl);
    });

    $("[letters-fade-in-slow]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".char"), { opacity: 0, duration: 0.35, ease: "power1.out", stagger: { amount: 1.3 } });
      createScrollTrigger($(this), tl);
    });
  
    $("[letters-fade-in-random]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".char"), { opacity: 0, duration: 0.05, ease: "power1.out", stagger: { amount: 0.4, from: "random" } });
      createScrollTrigger($(this), tl);
    });

  
    // Avoid flash of unstyled content
    gsap.set("[text-split]", { opacity: 1 });
  
    function startHomeAnimations() {
      if (!animationsPlayed) { // Check if animations haven't been played yet
          let homeHeading = gsap.timeline();
          homeHeading.from("[home-reveal] .char", { opacity: 0, duration: 0.2, ease: "power1.out", stagger: { amount: 0.8 } });
  
          let intro = gsap.timeline({ delay: 0.5 }); // Delay of 0.5 seconds
          intro.add(homeHeading, 0);
          intro.from("[dot-reveal]", 0.8, { opacity: 0, transformOrigin: "center", ease: Power2.out }, ">-0.2"); // Animate .dot-reveal after .home-reveal
          intro.from("[nav-bar]", 1, { opacity: 0, ease: "power3.inOut" }, ">-0.7"); // Animate [nav-bar] after [image]
          intro.from("[link_block]", 0.5, { opacity: 0, ease: "power1.out", stagger: 0.3 }, ">-0.2");
          intro.from("[link_bg]", 1, { opacity: 0, ease: "power2.inOut" }, ">-0.5");
  
          animationsPlayed = true; // Set the flag to true after playing the animations
      }
  }

    // Call the startHomeAnimations function after the .trigger click
    $(".trigger").click(function() {
      setTimeout(startHomeAnimations, 1500); // Delay of 2 seconds (2000 milliseconds)
    });
});