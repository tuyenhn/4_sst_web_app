// carousel
let cont = 0;

let switchSlide = (slider1, slider2) => {
  $(slider1).fadeOut(400);
  $(slider2).delay(400).fadeIn(400);
};

let loopSlider = () => {
  setInterval(() => {
    switch (cont) {
      case 0: {
        switchSlide("#slider-1", "#slider-2");
        cont = 1;

        break;
      }
      case 1: {
        switchSlide("#slider-2", "#slider-1");
        cont = 0;

        break;
      }
    }
  }, 3000);
};

$(document).ready(() => {
  $(".no-fouc").removeClass('no-fouc');
})

$(window).ready(() => {
  $("#slider-2").hide();

  loopSlider();
});
