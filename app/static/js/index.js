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

// Caps-lock warning
let text = $("#capsWarning");
text.addClass("text-transparent");

$(window).keyup((event) => {
  if (event.originalEvent.getModifierState("CapsLock")) {
    text.removeClass("text-transparent");
  } else {
    text.addClass("text-transparent");
  }
});

// Password visibility
let pwd = $("#password");
let eye = $("#eye");
$(() => {
  $("#eyeBtn").click(() => {
    if (eye.hasClass("fa-eye-slash")) {
      eye.removeClass("fa-eye-slash");
      eye.addClass("fa-eye");
      pwd.attr("type", "text");
    } else {
      eye.removeClass("fa-eye");
      eye.addClass("fa-eye-slash");
      pwd.attr("type", "password");
    }
  });
});

// Brightness slider
let slider = $("#brRange");
let brText = $("#brLabel");
brText.html(slider.val() + "%");
slider.on("input", () => {
  brText.html(slider.val() + "%");
});

// Navigation bar for mobile
let mobileSep = $(".mobileSep");
mobileSep.addClass("hidden");
let navTxt = $(".navTxt");
let responsiveAdj = () => {
  if (matchMedia("(min-width: 1024px)").matches) {
    // large breakpoint
    if (!mobileSep.hasClass("hidden")) mobileSep.addClass("hidden");
    if (navTxt.hasClass("hidden")) navTxt.removeClass("hidden");
  } else if (matchMedia("(min-width: 1024px)").matches) {
    // medium breakpoint
    if (mobileSep.hasClass("hidden")) mobileSep.removeClass("hidden");
    if (navTxt.hasClass("hidden")) navTxt.removeClass("hidden");
  } else {
    // smaller breakpoint
    if (mobileSep.hasClass("hidden")) mobileSep.removeClass("hidden");
    if (!navTxt.hasClass("hidden")) navTxt.addClass("hidden");
  }
};

let resizeSvg = () => {
  let svg = $("#svg4");
  if ($(window).height() > $(window).width()) {
    svg.width($(window).width() - 25);
    svg.height("auto");
  } else {
    svg.width("auto");
    svg.height($(window).height() - 80);
  }
};

// FAQ collapse
let faqCollapse = () => {
  $(".content").hide();
  $(".show_hide").on("click", (e) => {
    $(e.currentTarget)
      .children("div")
      .children("i")
      .toggleClass("fa-chevron-down fa-chevron-up");
    $(e.currentTarget).children(".content").slideToggle(200);
    $(".content:visible")
      .not($(e.currentTarget).children(".content"))
      .slideToggle(200);
  });
};

// DRAWING!
let pickedColor = "#bfdbfe";
const pickerContainer = $("#pickerContainer")[0];
const colorPicker = new Picker({
  parent: pickerContainer,
  alpha: false,
  onDone: function (color) {
    pickerContainer.style.background = color.hex.slice(0, 7);
    pickedColor = color.hex.slice(0, 7);
  },
  color: "#bfdbfe",
  popup: false,
});

colorPicker.movePopup($("#newPickerContainer")[0], true);

let mouseDown = false;
$(".ledPxl").on({
  mouseover: function () {
    if (mouseDown) {
      $(this).css("stroke", pickedColor);
      $(this).find("input").val(pickedColor);
    }
  },
  tap: function () {
    $(this).css("stroke", pickedColor);
    $(this).find("input").val(pickedColor);
  },
});

// Clear button
$("#clearBtn").click(() => {
  $(".ledPxl").css("stroke", "#000000");
});

// service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then((registration) => {
      console.log("Service Worker Registered!");
      return registration;
    })
    .catch((err) => {
      console.error("Unable to register service worker.", err);
    });
}

// prevent FUOC
$(document).ready(() => {
  $(".no-fouc").removeClass("no-fouc");
  faqCollapse();
});

$(document).mousedown(() => {
  mouseDown = true;
});

$(document).mouseup(() => {
  mouseDown = false;
});

$(window).ready(() => {
  $("#slider-2").hide();

  responsiveAdj();
  resizeSvg();
  loopSlider();
});

$(window).resize(() => {
  responsiveAdj();
  resizeSvg();
});
