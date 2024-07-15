import imagesLoaded from "https://cdn.skypack.dev/imagesloaded";
import gsap from "https://cdn.skypack.dev/gsap";

const start = performance.now();

// Select all images except those with the "loader-ignore" attribute
const imagesToLoad = "img:not([loader-ignore]), div[style*='background-image']:not([loader-ignore])";

const imgLoad = new imagesLoaded(imagesToLoad, { background: true }, onImagesLoaded);
const numImages = imgLoad.images.length;

console.log(`Total images to load: ${numImages}`);

imgLoad.on("progress", function (instance, image) {
  const result = image.isLoaded ? "loaded" : "broken";
  const imageElement = image.img;
  const imageUrl = image.img.src || getBackgroundImageUrl(image.element);
  const currentTime = performance.now() - start;

  console.log(`[${currentTime.toFixed(2)}ms] Image ${instance.progressedCount}/${numImages} (${result}):`, imageUrl);

  if (!image.isLoaded) {
    console.warn(`Failed to load image:`, imageUrl);
  }

  const progress = instance.progressedCount / numImages;

  document.querySelector(".loader_number").textContent = `${Math.round(progress * 100)}%`;

  // gsap loader animation shows progress of images loading
  gsap.to(".loader_progress", {
    width: `${progress * 100}%`,
    ease: "power2.out",
    duration: 0.5
  });
});

function onImagesLoaded() {
  const end = performance.now();
  const totalTime = Math.round(end - start);
  console.log(`All images loaded. Total time: ${totalTime}ms`);

  // Calculate remaining time to ensure loader is displayed for a minimum time
  const MIN_TIME = 1000;
  const remainingTime = Math.max(MIN_TIME - totalTime, 0);

  gsap.to(".loader", {
    delay: remainingTime / 1000,
    yPercent: -100,
    onComplete: () => {
      // re-enable scrolling
      gsap.set("body", { overflow: "auto" });
      loadIgnoredImages();
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