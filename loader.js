

const start = performance.now();
console.log('Starting image load');

const imgLoad = new imagesLoaded("body", { background: true }, onImagesLoaded);
const numImages = imgLoad.images.length;

console.log(`Number of images to load: ${numImages}`);

imgLoad.on("progress", function (instance, image) {
    var result = image.isLoaded ? "loaded" : "broken";
    console.log(`image ${instance.progressedCount} out of ${numImages} is ${result}`);

    const progress = instance.progressedCount / numImages;
    document.querySelector(".loader_number").textContent = `${Math.round(progress * 100)}%`;

    // gsap loader animation shows progress of images loading
    gsap.to(".loader_progress", {
        scaleX: progress,
    });
});

function onImagesLoaded() {
    const end = performance.now();
    console.log(`Time taken to load ${numImages} images: ${Math.round(end - start)}ms`);

    // Calculate remaining time to ensure loader is displayed for a minimum time
    const MIN_TIME = 1000;
    const duration = end - start;
    const remainingTime = Math.max(MIN_TIME - duration, 0);

    console.log(`Remaining time for loader: ${remainingTime}ms`);

    gsap.to(".loader", {
        delay: remainingTime / 1000,
        yPercent: -100,
        onComplete: () => {
            console.log('Loader animation completed');
            // re-enable scrolling
            gsap.set("body", { overflow: "auto" });
        },
    });
}