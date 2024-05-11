// Define the minimum width for considering a device as a desktop
const desktopMinWidth = 1024; // You can adjust this value as per your requirement

// Check if the window inner width is greater than or equal to the minimum desktop width
const isDesktop = window.innerWidth >= desktopMinWidth;

if (isDesktop) {
  let currentPixel = window.pageYOffset;
  const looper = function() {
    const newPixel = window.pageYOffset;
    const diff = newPixel - currentPixel;
    const speed = diff * 0.1;
    const blur = speed < 0 ? speed * -1 : speed;
    TweenMax.to("#test", .5, { attr: { stdDeviation: "0" + blur * 1 } });
    currentPixel = newPixel;
    requestAnimationFrame(looper);
  };
  looper();
} else {
  console.log("This code is intended to run only on desktop devices.");
}