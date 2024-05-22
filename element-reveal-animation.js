// Function to update the time paragraph's content
function updateTime() {
  const timeVersion1 = { timeZone: "America/Toronto", hour12: false, hour: "2-digit", minute: "2-digit" };
  const timeParagraph = document.querySelector("[time-display]");
  const timeChars = timeParagraph.querySelectorAll(".char");

  // Update the time paragraph's content
  timeParagraph.textContent = new Date().toLocaleTimeString('en-US', timeVersion1);

  // Split the updated time into individual characters
  const chars = Array.from(timeParagraph.textContent.trim().split(''));
  timeParagraph.innerHTML = '';
  chars.forEach((char) => {
    const charSpan = document.createElement('span');
    charSpan.textContent = char;
    charSpan.classList.add('char');
    timeParagraph.appendChild(charSpan);
  });

  // Reset the time paragraph's reveal animation
  gsap.set(timeChars, { opacity: 0 });
}

gsap.registerPlugin(ScrollTrigger);

// Give the scrollable content a variable
const scrollContent = document.querySelector("#scrollContent");

// Function to create scroll trigger for letter fade-in animation
function createScrollTrigger(element, timeline) {
  ScrollTrigger.create({
    trigger: element,
    scroller: scrollContent,
    end: "top bottom", // Use 'end' instead of 'start'
    once: true,
    onEnter: () => timeline.play(),
    onLeaveBack: () => timeline.pause(),
    toggleActions: "play none none reverse" // This will ensure the animation completes even if the scroll direction changes
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
  tl.from(letters, { opacity: 0, duration: 0.2, ease: "power1.out", stagger: { amount: 0.8 } });
  createScrollTrigger(element, tl);
});

// Select all elements with the letters-fade-in-fast class and animate them
document.querySelectorAll("[letters-fade-in-fast]").forEach((element) => {
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
  tl.from(letters, { opacity: 0, duration: 0.08, ease: "power1.out", stagger: { amount: 0.45 } });
  createScrollTrigger(element, tl);
});

// Select all elements with the letters-fade-in-slow class and animate them
document.querySelectorAll("[letters-fade-in-slow]").forEach((element) => {
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
  tl.from(letters, { opacity: 0, duration: 0.4, ease: "power1.out", stagger: { amount: 0.8 } });
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

// Update the time paragraph's content and reset the reveal animation before triggering animations
updateTime();

// Call the startHomeAnimations function after the .trigger click
$(".trigger").click(function() {
  setTimeout(startHomeAnimations, 1500); // Delay of 2 seconds (2000 milliseconds)
});