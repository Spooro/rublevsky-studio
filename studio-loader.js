import imagesLoaded from "https://cdn.skypack.dev/imagesloaded";
import gsap from "https://cdn.skypack.dev/gsap";

const start = performance.now();
const imageLoadTimes = [];

const imgLoad = new imagesLoaded("body", { 
  background: true,
  ignore: "[loader-ignore]" // Ignore elements with loader-ignore attribute
}, onImagesLoaded);
const numImages = imgLoad.images.length;

console.log(`Total images to load: ${numImages}`);

imgLoad.on("progress", function (instance, image) {
  const currentTime = performance.now();
  const result = image.isLoaded ? "loaded" : "broken";
  const imageUrl = image.img.src || getBackgroundImageUrl(image.element);
  const loadTime = currentTime - start;

  console.log(`[${loadTime.toFixed(2)}ms] Image ${instance.progressedCount}/${numImages} (${result}):`, imageUrl);

  if (image.isLoaded) {
    imageLoadTimes.push({ url: imageUrl, time: loadTime });
  } else {
    console.warn(`Failed to load image:`, imageUrl);
  }

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
  const totalTime = Math.round(end - start);
  console.log(`All images loaded. Total time: ${totalTime}ms`);

  // Display top 10 slowest-loading images
  displayTopSlowestImages(10);

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
      loadIgnoredImages();
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

function loadIgnoredImages() {
  console.log("Loading ignored images...");
  const ignoredImages = new imagesLoaded("[loader-ignore]", { background: true });
  
  ignoredImages.on("progress", function(instance, image) {
    const result = image.isLoaded ? "loaded" : "broken";
    const imageUrl = image.img.src || getBackgroundImageUrl(image.element);
    console.log(`Ignored image ${instance.progressedCount}/${ignoredImages.images.length} (${result}):`, imageUrl);
  });

  ignoredImages.on("done", function(instance) {
    console.log(`All ignored images loaded. Count: ${instance.images.length}`);
  });
}

function getBackgroundImageUrl(element) {
  const style = window.getComputedStyle(element);
  const backgroundImage = style.backgroundImage;
  return backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
}

function displayTopSlowestImages(count) {
  const sortedImages = imageLoadTimes.sort((a, b) => b.time - a.time);
  const topSlowest = sortedImages.slice(0, count);

  console.log(`Top ${count} slowest-loading images:`);
  topSlowest.forEach((image, index) => {
    console.log(`${index + 1}. ${image.url} - ${image.time.toFixed(2)}ms`);
  });
}