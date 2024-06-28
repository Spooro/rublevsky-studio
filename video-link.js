// Select all elements with the "click-redirect" attribute set to "bfloor"
const beautyfloorElements = document.querySelectorAll('[click-redirect="bfloor"]');

// Add click event listener to each element
beautyfloorElements.forEach(function(element) {
  element.addEventListener("click", function() {
    window.open("https://bfloor.ru/", "_blank");
  });
});

// Select all elements with the "click-redirect" attribute set to "inksoul"
const inksoulElements = document.querySelectorAll('[click-redirect="inksoul"]');

// Add click event listener to each element
inksoulElements.forEach(function(element) {
  element.addEventListener("click", function() {
    window.open("https://inksoul.webflow.io/", "_blank");
  });
});

// Select all elements with the "click-redirect" attribute set to "aps"
const apsElements = document.querySelectorAll('[click-redirect="aps"]');

// Add click event listener to each element
apsElements.forEach(function(element) {
  element.addEventListener("click", function() {
    window.open("https://www.africapowersupply.com/", "_blank");
  });
});

// Select all elements with the "click-redirect" attribute set to "store"
const store = document.querySelectorAll('[click-redirect="store"]');

// Add click event listener to each element
store.forEach(function(element) {
  element.addEventListener("click", function() {
    window.open("https://rublevsky-studio.webflow.io/store/shop", "_blank");
  });
});


// Select all elements with the "click-redirect" attribute set to "32karata"
const karat = document.querySelectorAll('[click-redirect="32karata"]');

// Add click event listener to each element
karat.forEach(function(element) {
  element.addEventListener("click", function() {
    window.open("https://www.rublevsky.studio/32karata/home", "_blank");
  });
});
