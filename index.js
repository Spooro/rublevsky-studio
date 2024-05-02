let duration = 600;
let PAGESmenuShape = $(".menu_shape.pages");
let PAGESmenuShapeBG = $(".menu_shape-bg.pages");
let PAGESmenuLink = $(".menu_link.pages");
let PAGEScurrentLink = $(".menu_link.pages.w--current");
let PAGESmenuWidth = $(".menu.pages").outerWidth();

// On Click
PAGESmenuLink.on("click", function(e) {
    e.preventDefault();
    let clickedIndex = $(this).index();
    let currentIndex = PAGEScurrentLink.index();

    // menuShape move
    barba.go($(this).attr("href"), "opacity-transition");

    // menuShapeBG Stretch
    if (clickedIndex > currentIndex) {
        PAGESmenuShape.css("justify-content", "flex-end");
    } else if (clickedIndex < currentIndex) {
        PAGESmenuShape.css("justify-content", "flex-start");
    }

    if (currentIndex !== clickedIndex) {
        PAGESmenuShapeBG.css("transition", `width ${duration / 2}ms`);
        PAGESmenuShapeBG.css("width", "140%");
        setTimeout(() => {
            PAGESmenuShapeBG.css("width", PAGESmenuWidth);
        }, duration / 2);
    }

    PAGESmenuShape.css("transition", `all ${duration}ms`);
    setTimeout(() => {
        moveShape($(this));
    }, 200);
});

function moveShape(PAGEStarget) {
    let PAGESlinkWidth = PAGEStarget.innerWidth();
    let PAGESlinkOffset = PAGEStarget.offset().left;
    let PAGESmenuOffset = $(".menu.pages").offset().left;
    let PAGESleftPosition = PAGESlinkOffset - PAGESmenuOffset;
    PAGESmenuShape.css("transition", `all ${duration + 200}ms`);
    PAGESmenuShape.css("width", PAGESlinkWidth);
    PAGESmenuShape.css("left", PAGESleftPosition);
}

moveShape(PAGEScurrentLink);
$(".menu_link-bg.pages").css("opacity", "0");
PAGESmenuShape.css("opacity", "1");

// resize
window.addEventListener("resize", function() {
    PAGESmenuWidth = $(".menu.pages").outerWidth();
    moveShape(PAGEScurrentLink);
});