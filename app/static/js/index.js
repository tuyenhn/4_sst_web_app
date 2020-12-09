let cont = 0;
let xx;

let switchSlide = (slider1, slider2, button1, button2) => {
  $(slider1).fadeOut(400);
  $(slider2).delay(400).fadeIn(400);
  $(button1).removeClass("bg-purple-800");
  $(button2).addClass("bg-purple-800");
};

let loopSlider = () => {
  xx = setInterval(() => {
    switch (cont) {
      case 0: {
        switchSlide("#slider-1", "#slider-2", "#sButton1", "#sButton2");
        cont = 1;

        break;
      }
      case 1: {
        switchSlide("#slider-2", "#slider-1", "#sButton2", "#sButton1");
        cont = 0;

        break;
      }
    }
  }, 8000);
};

let reinitLoop = (time) => {
  clearInterval(xx);
  setTimeout(loopSlider(), time);
};

$(window).ready(() => {
  $("#slider-2").hide();
  $("#sButton1").addClass("bg-purple-800");

  loopSlider();
});
