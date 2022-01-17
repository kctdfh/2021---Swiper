/* ANCHOR Slide renderer */

function renderHTML(slide, index) {
    var html = ejs.render(
      '<div class="swiper-slide" dynamic-slid-type="<%= slide.type %>">\
                                                <div class="swiper-slide-layout-wrapper">\
                                                <% if (slide.type === undefined || slide.type === "image") { %>\
                                                    <img data-image-size="small" data-src="<%= slide.srcS %>" class="swiper-lazy">\
                                                    <img data-image-size="large" data-src="<%= slide.srcL %>" class="swiper-lazy">\
                                                <% } else if (slide.type === "video") { %>\
                                                    <video data-image-size="small" loop playsinline autoplay muted disablepictureinpicture disableremoteplayback data-src="<%= slide.srcS %>" class="swiper-lazy">\
                                                    </video>\
                                                    <video data-image-size="large" loop playsinline autoplay muted disablepictureinpicture disableremoteplayback data-src="<%= slide.srcL %>" class="swiper-lazy">\
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
};
