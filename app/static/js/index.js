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
let sep = $("#settingsSep");
sep.addClass("hidden");
let responsiveAdj = () => {
  if (Modernizr.mq("(min-width: 1024px)")) {
    // large breakpoint
    if (!sep.hasClass("hidden")) sep.addClass("hidden");
    $(".navTxt").each((i, obj) => {
      if ($(obj).hasClass("hidden")) $(obj).removeClass("hidden");
    });
    $("#svg4").height($(window).height() - 80);
  } else {
    // smaller than large breakpoint
    if (sep.hasClass("hidden")) sep.removeClass("hidden");
    $(".navTxt").each((i, obj) => {
      if (!$(obj).hasClass("hidden")) $(obj).addClass("hidden");
    });
    $("#svg4").width($(window).width() - 25);
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

// prevent FUOC
$(document).ready(() => {
  $(".no-fouc").removeClass("no-fouc");
  faqCollapse();
});

$(window).ready(() => {
  $("#slider-2").hide();

  responsiveAdj();
  loopSlider();
});

$(window).resize(responsiveAdj);
