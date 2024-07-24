import imagesLoaded from "https://cdn.skypack.dev/imagesloaded";
import gsap from "https://cdn.skypack.dev/gsap";

const start = performance.now();
const imageLoadTimes = [];

// Explicitly select elements with the 'loader' attribute
const elementsToLoad = document.querySelectorAll('[loader]');
const numSelectedImages = elementsToLoad.length;

console.log(`Selected images to load: ${numSelectedImages}`);

// Create a new imagesLoaded instance with only the selected elements
const imgLoad = new imagesLoaded(elementsToLoad, { background: true }, onSelectedImagesLoaded);

imgLoad.on("progress", function (instance, image) {
  updateLoaderProgress(instance, image);
});

function onSelectedImagesLoaded() {
  const end = performance.now();
  const totalTime = Math.round(end - start);
  console.log(`All selected images loaded. Total time: ${totalTime}ms`);

  // Display top 5 slowest-loading selected images
  displayTopSlowestImages(5);

  // Fade out loader
  fadeOutLoader();
}

function updateLoaderProgress(instance, image) {
  const currentTime = performance.now();
  const result = image.isLoaded ? "loaded" : "broken";
  const imageUrl = image.img ? image.img.src : getBackgroundImageUrl(image.element);
  const loadTime = currentTime - start;

  console.log(`[${loadTime.toFixed(2)}ms] Image ${instance.progressedCount}/${numSelectedImages} (${result}): ${imageUrl}`);

  if (image.isLoaded) {
    imageLoadTimes.push({ url: imageUrl, time: loadTime });
  } else {
    console.warn(`Failed to load image: ${imageUrl}`);
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

  // gsap loader animation shows progress of images loading
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

function getBackgroundImageUrl(element) {
  const style = window.getComputedStyle(element);
  const backgroundImage = style.backgroundImage;
  return backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
}

function displayTopSlowestImages(count) {
  const sortedImages = imageLoadTimes.sort((a, b) => b.time - a.time);
  const topSlowest = sortedImages.slice(0, Math.min(count, sortedImages.length));

  console.log(`Top ${topSlowest.length} slowest-loading images:`);
  topSlowest.forEach((image, index) => {
    console.log(`${index + 1}. ${image.url} - ${image.time.toFixed(2)}ms`);
  });
}