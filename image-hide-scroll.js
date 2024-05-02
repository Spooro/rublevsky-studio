// GSAP image hide

if (window.innerWidth <= 991) {
    //emmanuel
    let scrollTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".work_visual.emm",
        start: "top 25%",
        end: "bottom bottom",
        //markers: true, // Remove this line if you don't need debug markers
        scrub: true,
      },
    });
  
    scrollTL.to(".work_image.remove_on_hover.emm", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }
  
  if (window.innerWidth <= 991) {
    //emmanuel
    let scrollTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".work_visual.design",
        start: "top 25%",
        end: "bottom bottom",
        //markers: true, // Remove this line if you don't need debug markers
        scrub: true,
      },
    });
  
    scrollTL.to(".work_image.remove_on_hover.design", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }  