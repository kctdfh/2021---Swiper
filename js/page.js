/* ANCHOR Fullscreen toggle */

if (!screenfull.isEnabled) {
    document
        .querySelectorAll(".fullscreen-button")
        .forEach(function (button) {
            button.style.display = "none";
        });
}

document
    .querySelectorAll(".fullscreen-button")
    .forEach(function (button) {
        button.addEventListener("click", function () {
            if (screenfull.isEnabled && screenfull.isFullscreen) {
                screenfull.exit();
            } else if (screenfull.isEnabled) {
                screenfull.request();
            }
        });
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