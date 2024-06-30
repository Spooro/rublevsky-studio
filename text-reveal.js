
  gsap.registerPlugin(ScrollTrigger);

  // Function for reveal-type animation by words instead of characters
  function animateRevealTypeByWords(element) {
    const text = new SplitType(element, { types: ['words'] });
    gsap.from(text.words, {
      scrollTrigger: {
        trigger: element,
        start: 'top 50%',
        end: 'top 30%',
        scrub: true,
        markers: false
      },
      opacity: 0.2,
      stagger: 0.1, // Adjusted for word staggering
    });
  }

  // Function for reveal-points animation
  function animateRevealPoints(container) {
    const points = container.querySelectorAll('[reveal-point]');
    const pointDuration = 0.3;
    const pointGap = 0.1;
    const totalDuration = points.length * (pointDuration + pointGap);

    gsap.set(points, { clipPath: 'inset(0 100% 0 0)' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        end: `+=${totalDuration * 23}%`,
        scrub: 1,
        markers: false
      }
    });

    points.forEach((point, index) => {
      tl.to(point, {
        clipPath: 'inset(0 0% 0 0)',
        duration: pointDuration,
        ease: 'power2.inOut'
      }, index * (pointDuration + pointGap));
    });
  }

  // Function to hide elements with [heading-hide] attribute
  function hideHeadingElements() {
    const headingElements = document.querySelectorAll('[heading-hide]');
    headingElements.forEach(element => {
      gsap.fromTo(element, 
        { opacity: 1 }, 
        { 
          opacity: 0,
          scrollTrigger: {
            trigger: element,
            start: 'top 15%',
            end: 'top 5%',
            scrub: true,
            markers: false
          }
        }
      );
    });
  }

  // Animate reveal-type elements by words
  document.querySelectorAll('[reveal-type]').forEach(animateRevealTypeByWords);

  // Animate reveal-points containers
  document.querySelectorAll('[reveal-points]').forEach(animateRevealPoints);

  // Hide heading-hide elements
  hideHeadingElements();
