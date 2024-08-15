import imagesLoaded from "https://cdn.skypack.dev/imagesloaded";
import gsap from "https://cdn.skypack.dev/gsap";

const start = performance.now();
const mediaLoadTimes = [];

function initLoader() {
  const allImages = document.querySelectorAll('img');
  const numImages = allImages.length;

  console.log(`Total images to load: ${numImages}`);

  showLoader();

  const imageLoad = new imagesLoaded(document.body, onAllImagesLoaded);

  imageLoad.on("progress", function (instance, image) {
    updateLoaderProgress(instance, image, numImages);
  });
}

function onAllImagesLoaded() {
  const end = performance.now();
  const totalTime = Math.round(end - start);
  console.log(`All images loaded. Total time: ${totalTime}ms`);

  displayTopSlowestMedia(5);

  const MIN_DURATION = 500;
  const duration = Math.max(totalTime, MIN_DURATION);

  fadeOutLoader(duration);
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

  if (loaderNumberElement) {
    gsap.to(loaderNumberElement, {
      duration: 0.3,
      textContent: `${Math.round(progress * 100)}%`,
      ease: "none",
      onUpdate: function () {
        loaderNumberElement.textContent = `${Math.round(gsap.getProperty(loaderNumberElement, "textContent"))}%`;
      }
    });
  }

  gsap.to(".studio-loader_progress", {
    width: `${progress * 100}%`,
    duration: 0.3,
    ease: "none",
  });
}

function fadeOutLoader(minDuration) {
  const duration = performance.now() - start;
  const remainingTime = Math.max(minDuration - duration, 0);

  gsap.to(".studio-loader", {
    delay: remainingTime / 1000,
    opacity: 0,
    duration: 0.5,
    ease: "easeOutExpo",
    onComplete: () => {
      gsap.set(".studio-loader", { display: "none" });
      gsap.set("body", { overflow: "auto" });
      resetLoaderNumber();
    },
  });

  gsap.to("h1.loader_number", {
    delay: remainingTime / 1000,
    opacity: 0,
    duration: 0.5,
    ease: "easeOutExpo",
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
  gsap.set(".studio-loader", { display: "flex", opacity: 0 });
  gsap.to(".studio-loader", {
    opacity: 1,
    duration: 0.5,
    ease: "easeOutExpo",
  });

  resetLoaderNumber();
}

function resetLoaderNumber() {
  const loaderNumberElement = document.querySelector("h1.loader_number");
  if (loaderNumberElement) {
    loaderNumberElement.textContent = "R";
    gsap.set(loaderNumberElement, { opacity: 1 });
  }
}

document.addEventListener('DOMContentLoaded', initLoader);

document.querySelectorAll('[link_block]').forEach(link => {
  link.addEventListener("click", showLoader);
});