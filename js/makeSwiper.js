var returnVP = function() {
    viewportWidth = window.innerWidth;
    if (viewportWidth < 768) {
        return "s";
    } else {
        return "l";
    }
}

var slideChangeTime;

/* ANCHOR Slide renderer */

function renderHTML(slide, index) {
  var html = ejs.render(
    '<div class="swiper-slide" dynamic-slid-type="<%= slide.type %>">\
                                                <div class="swiper-slide-layout-wrapper">\
                                                <% if ((slide.type === undefined || slide.type === "image")&& returnVP() === "s") { %>\
                                                    <img data-image-size="small" data-src="<%= slide.srcS %>" class="swiper-lazy">\
                                                <% } else if (slide.type === "video" && returnVP() === "s") { %>\
                                                    <video onclick="toggleVideo()" data-image-size="small" loop playsinline autoplay muted disablepictureinpicture disableremoteplayback data-src="<%= slide.srcS %>" class="swiper-lazy">\
                                                    </video>\
                                                <% } %>\
                                                <% if ((slide.type === undefined || slide.type === "image")&& returnVP() === "l") { %>\
                                                    <img data-image-size="large" data-src="<%= slide.srcL %>" class="swiper-lazy">\
                                                <% } else if (slide.type === "video" && returnVP() === "l") { %>\
                                                    <video onclick="toggleVideo()" data-image-size="large" loop playsinline autoplay muted disablepictureinpicture disableremoteplayback data-src="<%= slide.srcL %>" class="swiper-lazy">\
                                                    </video>\
                                                <% } %>\
                                                <div class="desktop-only-nav">\
                                                    <div class="tap-to-prev">\
                                                        <div class="swiper-button-prev"></div>\
                                                    </div>\
                                                    <div class="tap-to-next">\
                                                        <div class="swiper-button-next"></div>\
                                                    </div>\
                                                </div>\
                                                <% if (slide.link !== undefined) { %>\
                                                    <a class="slide-link-a" href="<%= slide.link %>"><%= slide.linkText %></a>\
                                                <% } %>\
                                            </div>',
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
  on: {
    slideChange: function () {
      slideChangeTime = new Date().getTime();
      var currentSlide = this.realIndex;
      var slideType = this.virtual.slides[currentSlide].type;
      if (slideType === "video") {
        this.slides[currentSlide].querySelector("video").pause();
        this.slides[currentSlide].querySelector("video").currentTime = 0;
        this.slides[currentSlide].querySelector("video").play();
      }
    },
  }
  /* on: {
      resize: function (swiper) {
        var newParams = swiper.params;
        var currentSlide = swiper.activeIndex;
        newParams.initialSlide = currentSlide;
        swiper.virtual.removeAllSlides();
        newSwiper = new Swiper(swiper.$el, newParams);
        newSwiper.slideTo(currentSlide, 0, false);
    } */
  };

/* ANCHOR Swiper config - page */

var pageConfig = {
  direction: "vertical",
  spaceBetween: 0,
  simulateTouch: true,
  updateOnWindowResize: true,
  lazy: {
    loadPrevNext: true,
    loadPrevNextAmount: 4,
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