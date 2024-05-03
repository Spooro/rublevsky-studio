//liquid menu animation

let duration = 600;
let PAGESmenuShape = $(".menu_shape.pages");
let PAGESmenuShapeBG = $(".menu_shape-bg.pages");
let PAGESmenuLink = $(".menu_link.pages");
let PAGEScurrentLink = $(".menu_link.pages.w--current");
let PAGESmenuWidth = $(".menu.pages").outerWidth();
let PAGESmenuOffset = $(".menu.pages").offset().left;

// On Click
PAGESmenuLink.on("click", function(e) {
    e.preventDefault();
    let clickedIndex = $(this).index();
    let currentIndex = PAGEScurrentLink.index();
    let lastIndex = PAGESmenuLink.length - 1;
    let firstIndex = 0;

    // menuShape move
    barba.go($(this).attr("href"), "opacity-transition");

    // menuShapeBG Stretch
    if (clickedIndex > currentIndex && clickedIndex !== lastIndex) {
        PAGESmenuShape.css("justify-content", "flex-end");
    } else if (clickedIndex < currentIndex && currentIndex !== lastIndex && clickedIndex !== firstIndex) {
        PAGESmenuShape.css("justify-content", "flex-start");
    } else {
        PAGESmenuShape.css("justify-content", "center");
    }

    if (currentIndex !== clickedIndex) {
        if (clickedIndex !== lastIndex && currentIndex !== firstIndex) {
            PAGESmenuShapeBG.css("transition", `width ${duration / 2}ms`);
            PAGESmenuShapeBG.css("width", "140%");
            setTimeout(() => {
                PAGESmenuShapeBG.css("width", "100%");
            }, duration / 2);
        }
    }

    PAGESmenuShape.css("transition", `all ${duration}ms`);
    setTimeout(() => {
        moveShape($(this));
    }, 200);
});

function moveShape(PAGEStarget) {
    let PAGESlinkWidth = PAGEStarget.innerWidth();
    let PAGESlinkOffset = PAGEStarget.offset().left;
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
    PAGESmenuOffset = $(".menu.pages").offset().left;
    moveShape(PAGEScurrentLink);
});



//hiding menu wrap on scroll down animation


const menuWrap = document.querySelector('.menu-wrap');

let lastScrollTop = 0;

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scroll down
    moveMenuWrapDown();
  } else {
    // Scroll up
    moveMenuWrapUp();
  }

  lastScrollTop = scrollTop;
});

function moveMenuWrapDown() {
  const newPosition = `calc(100% + 4rem)`;
  const easing = 'cubic-bezier(0.68, -0.55, 0.27, 1.55)'; // You can adjust easing as needed

  menuWrap.style.transition = `transform 0.5s ${easing}`;
  menuWrap.style.transform = `translateY(${newPosition})`;
}

function moveMenuWrapUp() {
  menuWrap.style.transition = 'transform 0.5s ease'; // Default easing for scrolling up
  menuWrap.style.transform = 'translateY(0)';
}