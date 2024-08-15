import imagesLoaded from "https://cdn.skypack.dev/imagesLoaded";
import gsap from "https://cdn.skypack.dev/gsap";

const start = performance.now();
const mediaLoadTimes = [];

function initLoader() {
  gsap.set("body", { overflow: "hidden" });
  
  const imgLoad = new imagesLoaded("body", { background: true }, onAllImagesLoaded);
  const numImages = imgLoad.images.length;

  console.log(`Total images to load: ${numImages}`);

  imgLoad.on("progress", function (instance, image) {
    updateLoaderProgress(instance, image, numImages);
  });
}

function onAllImagesLoaded() {
  const end = performance.now();
  const totalTime = Math.round(end - start);
  console.log(`All images loaded. Total time: ${totalTime}ms`);

  displayTopSlowestMedia(5);

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

function updateLoaderProgress(instance, image, totalImages) {
  const currentTime = performance.now();
  const result = image.isLoaded ? "loaded" : "broken";
  const loadTime = currentTime - start;

  console.log(`[${loadTime.toFixed(2)}ms] IMG ${instance.progressedCount}/${totalImages} (${result}): ${image.img.src}`);

  if (image.isLoaded) {
    mediaLoadTimes.push({ type: "IMG", url: image.img.src, time: loadTime });
  } else {
    console.warn(`Failed to load IMG: ${image.img.src}`);
  }

  const progress = instance.progressedCount / totalImages;
  updateLoaderUI(progress);
}

function updateLoaderUI(progress) {
  const loaderNumberElement = document.querySelector("h1.loader_number");
  const progressPercentage = Math.round(progress * 100);

  if (loaderNumberElement) {
    gsap.to(loaderNumberElement, {
      duration: 0.3,
      textContent: `${progressPercentage}%`,
      ease: "none",
      onUpdate: function () {
        loaderNumberElement.textContent = `${Math.round(gsap.getProperty(loaderNumberElement, "textContent"))}%`;
      }
    });
  }

  gsap.to(".studio-loader_progress", {
    width: `${progressPercentage}%`,
    duration: 0.3,
    ease: "none",
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