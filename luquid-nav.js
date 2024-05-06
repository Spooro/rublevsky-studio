let duration = 400;

let PAGESmenuShape = $(".menu\_shape.pages");

let PAGESmenuShapeBG = $(".menu\_shape-bg.pages");

let PAGESmenuLink = $(".menu\_link.pages");

let PAGEScurrentLink = $(".menu\_link.pages.w--current");

// On Click

PAGESmenuLink.on("click", function (e) {

e.preventDefault();

let clickedIndex = $(this).index();

let currentIndex = PAGEScurrentLink.index();

// menuShape move

setTimeout(() => {

window.location = $(this).attr("href");

}, duration);

// menuShapeBG Stretch

if (clickedIndex > currentIndex) {

PAGESmenuShape.css("justify-content", "flex-end");

} else {

PAGESmenuShape.css("justify-content", "flex-start");

}

if (currentIndex !== clickedIndex) {

PAGESmenuShapeBG.css("transition", `width ${duration / 2}ms`);

PAGESmenuShapeBG.css("width", "140%");

setTimeout(() => {

PAGESmenuShapeBG.css("width", "100%");

}, duration / 2);

}

PAGESmenuShape.css("transition", `all ${duration}ms`);

moveShape($(this));

});

function moveShape(PAGEStarget) {

let PAGESlinkWidth = PAGEStarget.innerWidth();

let PAGESlinkOffset = PAGEStarget.offset().left;

let PAGESmenuOffset = $(".menu.pages").offset().left;

let PAGESleftPosition = PAGESlinkOffset - PAGESmenuOffset;

PAGESmenuShape.css("width", PAGESlinkWidth);

PAGESmenuShape.css("left", PAGESleftPosition);

}

moveShape(PAGEScurrentLink);

$(".menu\_link-bg.pages").css("opacity", "0");

PAGESmenuShape.css("opacity", "1");

// resize

window.addEventListener("resize", function () {

moveShape(PAGEScurrentLink);

});