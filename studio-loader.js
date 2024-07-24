import imagesLoaded from "https://cdn.skypack.dev/imagesloaded";
import gsap from "https://cdn.skypack.dev/gsap";

const start = performance.now();
const mediaLoadTimes = [];

// Defer loading of non-priority images
function deferNonPriorityMedia() {
  const nonPriorityImages = document.querySelectorAll('img:not([loader])');
  nonPriorityImages.forEach(img => {
    img.dataset.src = img.src;
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  });
}

// Restore non-priority images
function restoreNonPriorityMedia() {
  const nonPriorityImages = document.querySelectorAll('img[data-src]');
  nonPriorityImages.forEach(img => {
    img.src = img.dataset.src;
  });
}

// Explicitly select images with the 'loader' attribute
const imagesToLoad = document.querySelectorAll('img[loader]');
const numSelectedImages = imagesToLoad.length;

console.log(`Selected images to load: ${numSelectedImages}`);

// Defer loading of non-priority images
deferNonPriorityMedia();

// Create a new imagesLoaded instance with only the selected images
const imageLoad = new imagesLoaded(imagesToLoad, onSelectedImagesLoaded);

imageLoad.on("progress", function (instance, image) {
  updateLoaderProgress(instance, image);
});

function onSelectedImagesLoaded() {
  const end = performance.now();
  const totalTime = Math.round(end - start);
  console.log(`All selected images loaded. Total time: ${totalTime}ms`);

  // Display top 5 slowest-loading selected images
  displayTopSlowestMedia(5);

  // Fade out loader
  fadeOutLoader();

  // Restore non-priority images
  restoreNonPriorityMedia();
}

function updateLoaderProgress(instance, image) {
  const currentTime = performance.now();
  const result = image.isLoaded ? "loaded" : "broken";
  const loadTime = currentTime - start;

  console.log(`[${loadTime.toFixed(2)}ms] IMG ${instance.progressedCount}/${numSelectedImages} (${result}): ${image.img.src}`);

  if (image.isLoaded) {
    mediaLoadTimes.push({ type: "IMG", url: image.img.src, time: loadTime });
  } else {
    console.warn(`Failed to load IMG: ${image.img.src}`);
  }

  const progress = instance.progressedCount / numSelectedImages;
  updateLoaderUI(progress);
}

function updateLoaderUI(progress) {
  const loaderNumberElement = document.querySelector("h1.loader_number");

  // Update the loader number text
  if (loaderNumberElement) {
    loaderNumberElement.textContent = `${Math.round(progress * 100)}%`;
  }

  // gsap loader animation shows progress of image loading
  gsap.to(".studio-loader_progress", {
    width: `${progress * 100}%`,
    duration: 0.3,
    ease: "none",
  });
}

function fadeOutLoader() {
  const MIN_TIME = 1000;
  const duration = performance.now() - start;
  const remainingTime = Math.max(MIN_TIME - duration, 0);

  gsap.to(".studio-loader", {
    delay: remainingTime / 1000,
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      gsap.set(".studio-loader", { display: "none" });
      gsap.set("body", { overflow: "auto" });
    },
  });

  gsap.to("h1.loader_number", {
    delay: remainingTime / 1000,
    opacity: 0,
    duration: 0.5,
  });
}

function displayTopSlowestMedia(count) {
  const sortedMedia = mediaLoadTimes.sort((a, b) => b.time - a.time);
  const topSlowest = sortedMedia.slice(0, Math.min(count, sortedMedia.length));

  console.log(`Top ${topSlowest.length} slowest-loading images:`);
  topSlowest.forEach((media, index) => {
    console.log(`${index + 1}. ${media.url} - ${media.time.toFixed(2)}ms`);
  });
}