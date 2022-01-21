/* ANCHOR Fullscreen toggle */

if (!screenfull.isEnabled) {
    document
        .querySelectorAll(".fullscreen-button")
        .forEach(function (button) {
            button.style.display = "none";
        });
    document.querySelector(".fullscreen-card").style.display = "none";
}

document
  .querySelectorAll(".fullscreen-button, .fullscreen-card")
  .forEach(function (button) {
    button.addEventListener("click", function () {
      if (screenfull.isEnabled && screenfull.isFullscreen) {
        screenfull.exit();
        refreshSlider(this);
      } else if (screenfull.isEnabled) {
        screenfull.request();
        refreshSlider(this);
      }
    });
  });

var refreshSlider = function (button) {
  var currentSlide = document.querySelector(".swiper-slide-active");
  var currentSwiper = currentSlide.closest(".swiper");
  currentSwiper.swiper.update();
};

/* ANCHOR Video interaction icons */

var toggleVideo = function (event) {
    var video = document.querySelector(".swiper-slide-active video");
    if (video.paused) {
        video.play();
        document.querySelector(".video-play").classList.add("active");
        document.querySelector(".video-pause").classList.remove("active");
        setTimeout(function () {
            document.querySelector(".video-play").classList.remove("active");
        }, 500);
    } else {
        video.pause();
        document.querySelector(".video-pause").classList.add("active");
        document.querySelector(".video-play").classList.remove("active");
        setTimeout(function () {
            document.querySelector(".video-pause").classList.remove("active");
        }, 500);
    }
};

/* ANCHOR Radial menu */

var menuItems = [
    {
        id: 'nav',
        title: "Navigate...",
        icon: "#nav",
        items: [
            {
                id: 'home',
                title: "Home",
                icon: "#home"
            },
            {
                id: 'projects',
                title: "Projects",
                icon: "#projects"
            },
        ],
    },
    {
        id: 'screen',
        title: "Fullscreen",
        icon: "#full",
    },
    {
        id: 'first',
        title: "First slide",
        icon: "#first",
    },
    {
        id: 'top',
        title: "Go to top",
        icon: "#top",
    }
]

var radialMenu = new RadialMenu({
  menuItems: menuItems,
  parent: document.querySelector(".menu-wrapper"),
  size: 320,
  closeOnClick: true,
  onClick: function (item) {
    if (item.id === "screen") {
      if (screenfull.isEnabled && screenfull.isFullscreen) {
        screenfull.exit();
      } else if (screenfull.isEnabled) {
        screenfull.request();
      }
    } else if (item.id === "first") {
      // first find the visible slider instance and go to the first slide
      var swiper = document
        .querySelector(".swiper-slide-visible")
        .closest(".swiper").swiper;
      swiper.slideTo(0);
    } else if (item.id === "top") {
      var swiper = document.querySelector(".swiper").swiper;
      swiper.slideTo(0);
    } else if (item.id === "home") {
      alert("Home");
    } else if (item.id === "projects") {
      alert("Projects");
    }
  },
});

/* ANCHOR Double click/tap Radial Menu */

var timeout;
var lastTap = 0;

document.body.addEventListener("dblclick", function (e) {
  var currentTime = new Date().getTime();
  var sinceSlideChange = currentTime - slideChangeTime;
  if (sinceSlideChange > 300) {
    radialMenu.open();
  }
});

document.addEventListener("touchend", function (event) {
  // if the event target is not tap-to-next or tap-to-prev, continue
  var currentTime = new Date().getTime();
  var sinceSlideChange = currentTime - slideChangeTime;
  var tapLength = currentTime - lastTap;
  clearTimeout(timeout);
  if (tapLength < 300 && tapLength > 0 && sinceSlideChange > 300) {
    radialMenu.open();
    event.preventDefault();
  } else {
    timeout = setTimeout(function () {
      clearTimeout(timeout);
    }, 300);
  }
  lastTap = currentTime;
});

/* ANCHOR Table of content test */

/* var contentTable;
var contentTableData = [];
document
  .querySelectorAll(".sections-swiper > .swiper-wrapper > .swiper-slide")
  .forEach(function (section, index) {
    var sectionName = section.getAttribute("data-section-name");
    var sectionType = section.getAttribute("data-section-type");
    contentTableData.push({
      sectionName: sectionName,
      sectionIndex: index,
    });
    if (sectionType === "static") {
      contentTableData[index].sectionSwiper = null;
      contentTableData[index].totalSlides = 1;
    } else if (sectionType === "swiper") {
      contentTableData[index].sectionSwiper = sectionName + "Swiper";
    }
  });
console.log(contentTableData); */