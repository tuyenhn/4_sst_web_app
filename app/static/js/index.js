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
let sep = $(".mobileSep");
sep.each((i, obj) => {
  $(obj).addClass("hidden");
});

let responsiveAdj = () => {
  if (Modernizr.mq("(min-width: 1024px)")) {
    // large breakpoint
    sep.each((i, obj) => {
      if (!$(obj).hasClass("hidden")) $(obj).addClass("hidden");
    });
    $(".navTxt").each((i, obj) => {
      if ($(obj).hasClass("hidden")) $(obj).removeClass("hidden");
    });
  } else if (Modernizr.mq("(min-width: 768px)")) {
    // medium breakpoint
    sep.each((i, obj) => {
      if ($(obj).hasClass("hidden")) $(obj).removeClass("hidden");
    });
    $(".navTxt").each((i, obj) => {
      if ($(obj).hasClass("hidden")) $(obj).removeClass("hidden");
    });
  } else {
    // smaller breakpoint
    sep.each((i, obj) => {
      if ($(obj).hasClass("hidden")) $(obj).removeClass("hidden");
    });
    $(".navTxt").each((i, obj) => {
      if (!$(obj).hasClass("hidden")) $(obj).addClass("hidden");
    });
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

// prevent FUOC
$(document).ready(() => {
  $(".no-fouc").removeClass("no-fouc");
  faqCollapse();
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
