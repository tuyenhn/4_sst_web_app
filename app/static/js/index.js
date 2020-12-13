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
let mobileNav = () => {
  if (!Modernizr.mq("(min-width: 1024px)")) {
    $(".navTxt").each((i, obj) => {
      $(obj).toggleClass("hidden");
    });
  } else {
    $("#settingsSep").toggleClass("hidden");
  }
};

// show/hide content
$(document).ready(function () {
  $(".targetDiv").hide();
});
var clickCount;
$(function () {
  clickCount = 0;
  $(".showSingle").click(function (e) {
    clickCount = clickCount == 2 ? 0 : clickCount;
    if (clickCount == 0) {
      $(".targetDiv").hide(".cnt");
      $("#content-" + $(this).attr("target")).slideToggle();
    } else if (clickCount == 1) {
      $("#content-" + $(this).attr("target")).hide(1000);
    }
    clickCount++;
  });
});

$(".change-active").click(function (e) {
  // Select all list items
  clickCount = 0;
  let listItems = $(".change-active");

  // Remove 'active' tag for all list items
  for (let i = 0; i < listItems.length; i++) {
    listItems[i].classList.remove("active");
  }
  // Add 'active' tag for currently selected item
  this.classList.add("active");
});

// prevent FUOC
$(document).ready(() => {
  $(".no-fouc").removeClass("no-fouc");
});

$(window).ready(() => {
  $("#slider-2").hide();

  // SVG height adjustment
  $("#svg4").height($(window).height() - 80);

  loopSlider();
  mobileNav();
});
