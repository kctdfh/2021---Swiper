var returnVP = function () {
  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;
  if (viewportWidth < 768) {
    // mobile
    // console.log("small")
    return "s";
  } else if (viewportWidth >= 768 && viewportHeight < viewportWidth) {
    // wide
    // console.log("large wide")
    return "l-wide";
  } else if (viewportWidth >= 768 && viewportHeight > viewportWidth) {
    // tall
    // console.log("large tall")
    return "l-tall";
  }
}

var nextSlideRight = function (icon) {
  var parentSwiper = icon.closest(".swiper");
  console.log(parentSwiper);
  var swiper = parentSwiper.swiper;
  var currentSlide = swiper.activeIndex;
  var nextSlide = currentSlide + 1;
  if (nextSlide < swiper.slides.length) {
    swiper.slideTo(nextSlide);
  }
}

var nextSlideDown = function (icon) {
  var parentSwiper = icon.closest(".swiper-v");
  var swiper = parentSwiper.swiper;
  var currentSlide = swiper.activeIndex;
  var nextSlide = currentSlide + 1;
  if (nextSlide < swiper.slides.length) {
    swiper.slideTo(nextSlide);
  }
};

var slideChangeTime;

/* ANCHOR Slide renderer */

function renderHTML(slide, index) {
  var html = ejs.render(
    '<div class="swiper-slide slide-containment" data-hash="<%= slide.id %>" dynamic-slid-type="<%= slide.type %>">\r\n    <% if ((slide.type === undefined || slide.type === "image") && returnVP() === "s") { %>\r\n    <div data-image-size="small" class="img-small swiper-lazy"\r\n        style="background-image: url(<%= slide.asset.small.source %>); background-position:<%= slide.asset.small.position %>; background-size:<%= slide.asset.small.size %>">\r\n    </div>\r\n    <% } else if (slide.type === "video" && returnVP() === "s") { %>\r\n    <video onclick="toggleVideo()" data-video-size="small" loop playsinline autoplay muted disablepictureinpicture\r\n        disableremoteplayback data-src="<%= slide.asset.small.source %>" class="swiper-lazy video">\r\n    </video>\r\n    <% } %>\r\n    <% if ((slide.type === undefined || slide.type === "image") && returnVP() === "l-wide") { %>\r\n    <div data-image-size="large" class="img-large swiper-lazy"\r\n        style="background-image: url(<%= slide.asset.large.source %>); background-position:<%= slide.asset.large.position %>; background-size:<%= slide.asset.large.size %>">\r\n    </div>\r\n    <% } else if ((slide.type === undefined || slide.type === "image") && returnVP() === "l-tall") { %>\r\n    <div data-image-size="large" class="img-large swiper-lazy"\r\n        style="background-image: url(<%= slide.asset.large.tall.source %>); background-position:<%= slide.asset.large.tall.position %>; background-size:<%= slide.asset.large.tall.size %>">\r\n    </div>\r\n    <% } else if (slide.type === "video" && returnVP().includes("l")) { %>\r\n    <video onclick="toggleVideo()" data-video-size="large" loop playsinline autoplay muted disablepictureinpicture\r\n        disableremoteplayback data-src="<%= slide.asset.large.source %>" class="swiper-lazy video">\r\n    </video>\r\n    <% } %>\r\n    <% if (slide.card.text !== undefined) { %>\r\n    <div class="card <%= slide.card.position %>">\r\n        <% if (slide.card.subtitle !== undefined) { %>\r\n        <h2 class="subtitle"><%= slide.card.subtitle %></h2>\r\n        <% } %>\r\n        <% if (slide.card.title !== undefined) { %>\r\n        <h3 class="title"><%= slide.card.title %></h3>\r\n        <% } %>\r\n        <p class="text"><%= slide.card.text %></p>\r\n        <% if (slide.type === \'start\' && returnVP().includes("l")) { %>\r\n        <lord-icon src="https://cdn.lordicon.com/foijefmd.json" trigger="loop" colors="primary:#0000,secondary:#c73f00"\r\n            style="width:120px;height:120px;margin-top:75px">\r\n        </lord-icon>\r\n        <lord-icon onclick="nextSlideRight(this)" src="https://cdn.lordicon.com/zpcieyfp.json" trigger="loop" colors="primary:#0000,secondary:#c73f00"\r\n            style="width:75px;height:75px;margin-top:35px;padding-right:150px;cursor: pointer;">\r\n        </lord-icon>\r\n        <% } %>\r\n        <% if (slide.type === \'start\' && returnVP() === "s") { %>\r\n        <lord-icon src="https://cdn.lordicon.com/foijefmd.json" trigger="loop" colors="primary:#0000,secondary:#c73f00"\r\n            style="width:75px;height:75px;margin-top: 45px">\r\n        </lord-icon>\r\n        <lord-icon onclick="nextSlideRight(this)" src="https://cdn.lordicon.com/zpcieyfp.json" trigger="loop" colors="primary:#0000,secondary:#c73f00"\r\n            style="width:45px;height:45px;margin-top:25px;padding-right:150px">\r\n        </lord-icon>\r\n        <% } %>\r\n        <% if (slide.type === \'end\' && returnVP().includes("l")) { %>\r\n        <lord-icon onclick="nextSlideDown(this)" src="https://cdn.lordicon.com/cfupmcdg.json" trigger="loop" colors="primary:#0000,secondary:#c73f00"\r\n            style="width:120px;height:120px;margin-top:75px;cursor: pointer;">\r\n        </lord-icon>\r\n        <% } %>\r\n        <% if (slide.type === \'end\' && returnVP() === "s") { %>\r\n        <lord-icon src="https://cdn.lordicon.com/vzwibsbc.json" onclick="nextSlideDown(this)" trigger="loop" colors="primary:#0000,secondary:#c73f00"\r\n            style="width:75px;height:75px;margin-top:35px">\r\n        </lord-icon>\r\n        <% } %>\r\n    </div>\r\n    <% } %>\r\n    <div class="desktop-only-nav">\r\n        <div class="tap-to-prev">\r\n            <div class="swiper-button-prev"></div>\r\n        </div>\r\n        <div class="tap-to-next">\r\n            <div class="swiper-button-next"></div>\r\n        </div>\r\n    </div>\r\n</div>',
    {
      slide: slide,
      vp: returnVP(),
    }
  );
  return html;
}

/* ANCHOR Swiper config - sections */

var sectionsConfig = {
  virtual: {
    addSlidesAfter: 5,
    addSlidesBefore: 5,
    slides: cometSlides,
    renderSlide: function (slide, index) {
      return renderHTML(slide, index);
    },
  },
  hashNavigation: {
    replaceState: true,
  },
  spaceBetween: 0,
  simulateTouch: true,
  updateOnWindowResize: true,
  lazy: {
    loadPrevNext: true,
    loadPrevNextAmount: 5,
  },
  keyboard: {
    enabled: true,
  },
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  navigation: {
    nextEl: ".tap-to-next",
    prevEl: ".tap-to-prev",
  },
  mousewheel: {
    forceToAxis: true,
  },
  resizeObserver: true,
  on: {
    slideChange: function () {
      slideChangeTime = new Date().getTime();
      var currentSlide = this.realIndex;
      var slideType = this.virtual.slides[currentSlide].type;
      if (slideType === "video") {
        this.slides[currentSlide].querySelector("video").pause();
        this.slides[currentSlide].querySelector("video").currentTime = 0;
        this.slides[currentSlide].querySelector("video").play();
      };
      currentSlide = Number(this.realIndex) + 1;
      totalSlides = this.virtual.slides.length;
      document.getElementById("slide-number").innerHTML = "<span>" + currentSlide + " / " + totalSlides + "</span>";
    },
    resize: function (swiper) {
      swiper.virtual.cache = {};
      swiper.virtual.update(true);
      swiper.slideTo(swiper.realIndex, 0);
    },
  },
};

/* ANCHOR Swiper config - page */

var pageConfig = {
  direction: "vertical",
  spaceBetween: 0,
  simulateTouch: true,
  updateOnWindowResize: true,
  hashNavigation: {
    replaceState: true,
  },
  lazy: {
    loadPrevNext: false
  },
  keyboard: {
    enabled: true,
  },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  mousewheel: {
    forceToAxis: true,
  },
  on: {
    slideChange: function () {
      slideChangeTime = new Date().getTime();
    },
  }
};