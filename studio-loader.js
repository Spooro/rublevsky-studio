import imagesLoaded from "https://cdn.skypack.dev/imagesloaded";
import gsap from "https://cdn.skypack.dev/gsap";

const start = performance.now();
let loadTimes = [];  // Array to store the load times of images

function initLoader() {
  gsap.set("body", { overflow: "hidden" });

  const allImages = Array.from(document.querySelectorAll("img, [style*='background-image']")); // Include images and background images
  const imagesToLoad = allImages.filter(img => !img.hasAttribute('loader-exception')); // Filter out exceptions
  const numImages = imagesToLoad.length;

  console.log(`Total images to load (excluding exceptions): ${numImages}`);

  const imgLoad = imagesLoaded(imagesToLoad, { background: true }); // Load only filtered images

  imgLoad.on("progress", function (instance, image) {
    const imageElement = image.img || image.element; // Handle both img and background images
    const loadTime = performance.now() - start;

    if (imagesToLoad.includes(imageElement)) {
      loadTimes.push({ src: imageElement.src || imageElement.style.backgroundImage, loadTime });
      updateLoaderProgress(instance, numImages);
    }
  });

  imgLoad.on("done", function (instance) {
    onAllImagesLoaded(instance, numImages);
  });
}

function onAllImagesLoaded(instance, numImages) {
  const end = performance.now();
  const totalTime = Math.round(end - start);
  console.log(`All images loaded. Total time: ${totalTime}ms`);

  updateLoaderProgress(instance, numImages);

  // Sort loadTimes to find the top 10 slowest
  loadTimes.sort((a, b) => b.loadTime - a.loadTime);
  const slowestLoads = loadTimes.slice(0, 10);
  console.log("Top 10 slowest image loads:", slowestLoads);

  const MIN_DURATION = 1000;
  const remainingTime = Math.max(MIN_DURATION - totalTime, 0);

  gsap.to(".studio-loader", {
    delay: remainingTime / 1000,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => {
      gsap.set(".studio-loader", { display: "none" });
      gsap.set("body", { overflow: "auto" });
    },
  });
}

function updateLoaderProgress(instance, totalImages) {
  const progress = instance.progressedCount / totalImages;
  const progressPercentage = Math.round(progress * 100);

  gsap.to(".studio-loader_progress", {
    width: `${progressPercentage}%`,
    duration: 0.3,
    ease: "none",
  });

  const loaderNumberElement = document.querySelector("h1.loader_number");
  if (loaderNumberElement) {
    loaderNumberElement.textContent = `${progressPercentage}%`;
  }

  console.log(`Loaded ${instance.progressedCount} out of ${totalImages} images`);
}

function showLoader() {
  gsap.set("body", { overflow: "hidden" });
  gsap.set(".studio-loader", { display: "flex", opacity: 1 });
  gsap.set("h1.loader_number", { textContent: "0%" });
  gsap.set(".studio-loader_progress", { width: "0%" });
}

document.addEventListener('DOMContentLoaded', initLoader);

document.querySelectorAll('[link_block]').forEach(link => {
  link.addEventListener("click", showLoader);
});
