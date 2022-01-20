var returnVP = function () {
  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;
  if (viewportWidth < 768) {
    // mobile
    console.log("small")
    return "s";
  } else if (viewportWidth >= 768 && viewportHeight < viewportWidth) {
    // wide
    console.log("large wide")
    return "l-wide";
  } else if (viewportWidth >= 768 && viewportHeight > viewportWidth) {
    // tall
    console.log("large tall")
    return "l-tall";
  }
}

var slideChangeTime;

/* ANCHOR Slide renderer */

function renderHTML(slide, index) {
  var html = ejs.render(
    '<div class="swiper-slide slide-containment" dynamic-slid-type="<%= slide.type %>">\r\n            <% if ((slide.type === undefined || slide.type === "image") && returnVP() === "s") { %>\r\n            <div data-image-size="small" class="img-small swiper-lazy"\r\n                style="background-image: url(<%= slide.asset.small.source %>); background-position:<%= slide.asset.small.position %>; background-size:<%= slide.asset.small.size %>">\r\n            </div>\r\n            <% } else if (slide.type === "video" && returnVP() === "s") { %>\r\n            <video onclick="toggleVideo()" data-video-size="small" loop playsinline autoplay muted\r\n                disablepictureinpicture disableremoteplayback data-src="<%= slide.asset.small.source %>"\r\n                class="swiper-lazy video">\r\n            </video>\r\n            <% } %>\r\n            <% if ((slide.type === undefined || slide.type === "image") && returnVP() === "l-wide") { %>\r\n            <div data-image-size="large" class="img-large swiper-lazy"\r\n                style="background-image: url(<%= slide.asset.large.source %>); background-position:<%= slide.asset.large.position %>; background-size:<%= slide.asset.large.size %>">\r\n            </div>\r\n            <% } else if ((slide.type === undefined || slide.type === "image") && returnVP() === "l-tall") { %>\r\n            <div data-image-size="large" class="img-large swiper-lazy"\r\n                style="background-image: url(<%= slide.asset.large.tall.source %>); background-position:<%= slide.asset.large.tall.position %>; background-size:<%= slide.asset.large.tall.size %>">\r\n            </div>\r\n            <% } else if (slide.type === "video" && returnVP().includes("l")) { %>\r\n            <video onclick="toggleVideo()" data-video-size="large" loop playsinline autoplay muted\r\n                disablepictureinpicture disableremoteplayback data-src="<%= slide.asset.large.source %>"\r\n                class="swiper-lazy video">\r\n            </video>\r\n            <% } %>\r\n            <% if (slide.card.text !== undefined) { %>\r\n            <div class="card <%= slide.card.position %>">\r\n                <% if (slide.card.subtitle !== undefined) { %>\r\n                <h2 class="subtitle"><%= slide.card.subtitle %></h2>\r\n                <% } %>\r\n                <% if (slide.card.title !== undefined) { %>\r\n                <h3 class="title"><%= slide.card.title %></h3>\r\n                <% } %>\r\n                <p class="text"><%= slide.card.text %></p>\r\n            </div>\r\n            <% } %>\r\n        <div class="desktop-only-nav">\r\n            <div class="tap-to-prev">\r\n                <div class="swiper-button-prev"></div>\r\n            </div>\r\n            <div class="tap-to-next">\r\n                <div class="swiper-button-next"></div>\r\n            </div>\r\n    </div>\r\n</div>',
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
    },
  },
};

/* ANCHOR Swiper config - page */

var pageConfig = {
  direction: "vertical",
  spaceBetween: 0,
  simulateTouch: true,
  updateOnWindowResize: true,
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