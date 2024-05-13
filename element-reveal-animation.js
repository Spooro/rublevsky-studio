gsap.registerPlugin(ScrollTrigger);

// Give the scrollable content a variable
const scrollContent = document.querySelector("#scrollContent");

// Function to create scroll trigger for letter fade-in animation
function createScrollTrigger(element, timeline) {
  ScrollTrigger.create({
    trigger: element,
    scroller: scrollContent, // Use custom scroll container
    start: "top bottom", // Start when element enters the viewport
    once: true, // Play the animation only once
    onEnter: () => timeline.play(),
    onLeaveBack: () => timeline.pause(), // Pause instead of reversing
  });
}

// Split text into spans
let typeSplit = new SplitType("[text-split]", {
  types: "words, chars",
  tagName: "span"
});

// Select all elements with the letters-fade-in class and animate them
document.querySelectorAll("[letters-fade-in]").forEach((element) => {
  const chars = Array.from(element.textContent.trim().split(''));
  element.innerHTML = '';
  chars.forEach((char) => {
    const charSpan = document.createElement('span');
    charSpan.textContent = char;
    charSpan.classList.add('char');
    element.appendChild(charSpan);
  });

  const letters = element.querySelectorAll('.char');
  const tl = gsap.timeline({ paused: true });
  const duration = element.classList.contains('letters-fade-in-slow') ? 0.4 :
                   element.classList.contains('letters-fade-in-fast') ? 0.1 : 0.2;
  tl.from(letters, { opacity: 0, duration, ease: "power1.out", stagger: { amount: 0.8 } });

  createScrollTrigger(element, tl);
});

// Sync GSAP with Lenis
window.addEventListener("scroll", (e) => {
  ScrollTrigger.update();
});

// Avoid flash of unstyled content
gsap.set("[text-split]", { opacity: 1 });

function startHomeAnimations() {
  
  let homeHeading = gsap.timeline();
  homeHeading.from("[home-reveal] .char", { opacity: 0, duration: 0.2, ease: "power1.out", stagger: { amount: 0.8 } });

  let intro = gsap.timeline({ delay: 0.5 }); // Delay of 0.5 seconds
  intro.add(homeHeading, 0);
  intro.from("[dot-reveal]", 0.8, { opacity: 0, transformOrigin: "center", ease: Power2.out }, ">-0.2"); // Animate .dot-reveal after .home-reveal
  intro.from("[nav-bar]", 1, { opacity: 0, ease: "power3.inOut" }, ">-0.7"); // Animate [nav-bar] after [image]
  intro.from("[link_block]", 0.5, { opacity: 0, ease: "power1.out", stagger: 0.3 }, ">-0.2");
  intro.from("[link_bg]", 1, { opacity: 0, ease: "power2.inOut" }, ">-0.5");
}

// Call the startHomeAnimations function after the .trigger click
$(".trigger").click(function() {
  setTimeout(startHomeAnimations, 1500); // Delay of 2 seconds (2000 milliseconds)
});