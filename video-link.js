// Select all elements with the "click-redirect" attribute set to "bfloor"
const beautyfloorElements = document.querySelectorAll('[click-redirect="bfloor"]');

// Add click event listener to each element
beautyfloorElements.forEach(function(element) {
  element.addEventListener("click", function() {
    window.location.href = "https://bfloor.ru/";
  });
});

// Select all elements with the "click-redirect" attribute set to "inksoul"
const inksoulElements = document.querySelectorAll('[click-redirect="inksoul"]');

// Add click event listener to each element
inksoulElements.forEach(function(element) {
  element.addEventListener("click", function() {
    window.location.href = "https://inksoul.webflow.io/";
  });
});

// Select all elements with the "click-redirect" attribute set to "aps"
const apsElements = document.querySelectorAll('[click-redirect="aps"]');

// Add click event listener to each element
apsElements.forEach(function(element) {
  element.addEventListener("click", function() {
    window.location.href = "https://www.africapowersupply.com/";
  });
});