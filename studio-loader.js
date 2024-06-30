import imagesLoaded from "https://cdn.skypack.dev/imagesloaded";
import gsap from "https://cdn.skypack.dev/gsap";

const start = performance.now();
const imgLoad = new imagesLoaded("body", { background: true }, onImagesLoaded);
const numImages = imgLoad.images.length;

imgLoad.on("progress", function (instance, image) {
  var result = image.isLoaded ? "loaded" : "broken";

  const progress = instance.progressedCount / numImages;
  const loaderNumberElement = document.querySelector("h1.loader_number");

  // Update the loader number text
  if (loaderNumberElement) {
    loaderNumberElement.textContent = `${Math.round(progress * 100)}%`;
  }

  // gsap loader animation shows progress of images loading
  gsap.to(".studio-loader_progress", {
    width: `${progress * 100}%`, // Animate width from 0% to 100%
    duration: 0.3, // Adjust the animation duration as needed
    ease: "none", // Use a linear ease for a smooth progression
  });
});

function onImagesLoaded() {
  const end = performance.now();

  // Calculate remaining time to ensure loader is displayed for a minimum time
  const MIN_TIME = 1000;
  const duration = end - start;
  const remainingTime = Math.max(MIN_TIME - duration, 0);

  gsap.to(".studio-loader", {
    delay: remainingTime / 1000,
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      gsap.set(".studio-loader", { display: "none" });
      // re-enable scrolling
      gsap.set("body", { overflow: "auto" });
    },
  });

  gsap.to("h1.loader_number", {
    delay: remainingTime / 1000,
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      gsap.set(".studio-loader", { display: "none" });
    },
  });
}