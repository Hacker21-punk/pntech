/* ============================================
   PNTECH.IN - Main JavaScript
   ============================================ */

// ---- Theme Initialization (Run immediately to avoid flash) ----
if (localStorage.getItem("theme") === "light") {
  document.documentElement.classList.add("light-theme");
} else {
  document.documentElement.classList.remove("light-theme");
}

$(document).ready(function () {
  // ---- Dynamic Mobile Menu Injection ----
  var downArrowSvg =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==";
  var closeSvg =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGxpbmUgeDE9IjE4IiB5MT0iNiIgeDI9IjYiIHkyPSIxOCI+PC9saW5lPjxsaW5lIHgxPSI2IiB5MT0iNiIgeDI9IjE4IiB5Mj0iMTgiPjwvbGluZT48L3N2Zz4=";

  var mobileMenuHtml = `
    <div class="phone-back">
      <div class="back-desc">
        <div class="back-logo">
          <a href="index.html" style="display: flex; align-items: center; gap: 10px;">
            <img src="images/logo.png" alt="PNTECH" style="height: 35px; width: auto;" />
            <span class="logo-text" style="color: var(--white); font-size: 20px; font-weight: 700; letter-spacing: 1px;">PN Technologies</span>
          </a>
        </div>
        <div class="back-more">
          <img src="${closeSvg}" alt="Close Menu" />
        </div>
      </div>
      <div class="back-title">
        <ul class="back-level1">
          <li><a href="index.html">Home</a></li>
          <li class="menu-item-has-children">
            <a href="products.html">Product</a>
            <img class="back-booton" src="${downArrowSvg}" alt="Dropdown" />
            <ul class="sub-menu">
              <li class="menu-item-has-children">
                <a href="product-spectrum-analyzer.html">Spectrum Analyzer</a>
                <img class="back-booton" src="${downArrowSvg}" alt="Dropdown" />
                <ul class="sub-menu">
                  <li><a href="product-new-san.html">New SAN Series</a></li>
                  <li><a href="product-san400.html">SAN Series</a></li>
                  <li><a href="product-sa.html">SA Series</a></li>
                  <li><a href="product-nxn.html">NXN Series</a></li>
                  <li><a href="product-nxe.html">NXE Series</a></li>
                  <li><a href="product-px-standard.html">PX Series Standard</a></li>
                  <li><a href="product-px-geek.html">PX Series Geek</a></li>
                  <li><a href="product-px-rugged.html">PX Series Rugged</a></li>
                </ul>
              </li>
              <li class="menu-item-has-children">
                <a href="product-vector-signal-generator.html">Vector Signal Generator</a>
                <img class="back-booton" src="${downArrowSvg}" alt="Dropdown" />
                <ul class="sub-menu">
                  <li><a href="product-sga.html">New SGA-60</a></li>
                </ul>
              </li>
              <li class="menu-item-has-children">
                <a href="product-hda.html">Antenna</a>
                <img class="back-booton" src="${downArrowSvg}" alt="Dropdown" />
                <ul class="sub-menu">
                  <li><a href="product-hda.html">HDA-100</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li><a href="application.html">Application</a></li>
          <li><a href="news.html">Latest News</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </div>
    </div>
  `;

  if ($(".phone-back").length === 0) {
    $("body").append(mobileMenuHtml);
  }

  // ---- WOW.js Init ----
  if (typeof WOW !== "undefined") {
    new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 100,
      mobile: true,
      live: true,
    }).init();
  }

  // ---- Header Scroll Behavior ----
  var lastScrollTop = 0;
  var headerEl = $("header");
  var hdOut = $(".hd-out");
  var phoneHeader = $(".phone-header");
  var scrollThreshold = 80;

  $(window).on("scroll", function () {
    var st = $(this).scrollTop();
    if (st > scrollThreshold) {
      hdOut.addClass("header-active");
      phoneHeader.addClass("header-active");
    } else {
      hdOut.removeClass("header-active");
      phoneHeader.removeClass("header-active");
    }

    // Toggle floating sidebar visibility on scroll
    if (st > 300) {
      $(".sc33").addClass("visible");
    } else {
      $(".sc33").removeClass("visible");
    }

    // Hide header on scroll down, show on scroll up
    if (st > lastScrollTop && st > 200) {
      headerEl.css("transform", "translateY(-100%)");
    } else {
      headerEl.css("transform", "translateY(0)");
    }
    lastScrollTop = st <= 0 ? 0 : st;
  });

  // ---- Desktop Tree Accordion Dropdown Menu ----
  var hoverTimeout;

  // Hovering over main nav item with children (Product) shows Level 1 sub-menu
  $(".hdnav-box > .menu-item-has-children").hover(
    function (event) {
      clearTimeout(hoverTimeout);
      $(".hd-bg").stop(true, true).fadeIn(200);
      $(this).addClass("checked");
      $(this).siblings().removeClass("checked");
      $(this).children(".sub-menu").stop(true, true).slideDown(250);
      $(this).siblings().children(".sub-menu").stop(true, true).slideUp(200);
      event.stopPropagation();
    },
    function () {
      var $this = $(this);
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(function () {
        $(".hd-bg").stop(true, true).fadeOut(200);
        $this.removeClass("checked");
        $this.children(".sub-menu").stop(true, true).slideUp(200);
        $(".hdnav-box .menu-item").removeClass("checked");
        $(".hdnav-box .sub-menu .sub-menu").stop(true, true).slideUp(150);
      }, 150);
    },
  );

  // Level 1 sub-menu items hover (Spectrum Analyzer, VSG, Antenna)
  $(".hdnav-box > .menu-item-has-children > .sub-menu > .menu-item").hover(
    function (event) {
      $(this).addClass("checked");
      $(this).siblings().removeClass("checked");
      $(this).find("> .sub-menu").stop(true, true).slideDown(200);
      $(this).siblings().find("> .sub-menu").stop(true, true).slideUp(150);
      // Reset nested submenus inside collapsed siblings
      $(this).siblings().find(".menu-item").removeClass("checked");
      $(this).siblings().find(".sub-menu").stop(true, true).slideUp(150);
      event.stopPropagation();
    },
  );

  // Level 2 sub-menu items hover (USB, Networked, Benchtop/Handheld)
  $(
    ".hdnav-box > li > .sub-menu > .menu-item-has-children > .sub-menu > .menu-item",
  ).hover(function (event) {
    $(this).addClass("checked");
    $(this).siblings().removeClass("checked");
    $(this).find("> .sub-menu").stop(true, true).slideDown(200);
    $(this).find("> .sub-menu > li").css("display", "block");
    $(this).siblings().find("> .sub-menu").stop(true, true).slideUp(150);
    $(this).siblings().find(".menu-item").removeClass("checked");
    $(this).siblings().find(".sub-menu").stop(true, true).slideUp(150);
    event.stopPropagation();
  });

  // Level 3 sub-menu items hover (individual products)
  $(
    ".hdnav-box > li > .sub-menu > .menu-item-has-children > .sub-menu > .menu-item > .sub-menu > li",
  ).hover(function (event) {
    $(this).addClass("checked");
    $(this).siblings().removeClass("checked");
    event.stopPropagation();
  });

  // Close dropdown when hovering over main nav items without children
  $(".hdnav-box > .menu-item:not(.menu-item-has-children)").hover(function () {
    clearTimeout(hoverTimeout);
    $(".hd-bg").stop(true, true).fadeOut(200);
    $(".hdnav-box").children(".menu-item").removeClass("checked");
    $(".hdnav-box")
      .children(".menu-item")
      .children(".sub-menu")
      .stop(true, true)
      .slideUp(200);
    // Reset all sub-checked states
    $(".hdnav-box .menu-item").removeClass("checked");
    $(".hdnav-box .sub-menu .sub-menu").stop(true, true).slideUp(150);
  });

  // Close desktop menu when clicking a product link
  $(".hdnav-box .sub-menu a").on("click", function () {
    $(".hdnav-box > .menu-item-has-children > .sub-menu")
      .stop(true, true)
      .slideUp(200);
    $(".hdnav-box > .menu-item-has-children").removeClass("checked");
    $(".hdnav-box .menu-item").removeClass("checked");
    $(".hdnav-box .sub-menu .sub-menu").stop(true, true).slideUp(150);
    $(".hd-bg").fadeOut(200);
  });

  // ---- Mobile Menu ----
  $(".phone-more").on("click", function () {
    $(".phone-back").fadeIn(300);
    $("body").css("overflow", "hidden");
  });
  $(".back-more").on("click", function () {
    $(".phone-back").fadeOut(300);
    $("body").css("overflow", "");
  });

  // Mobile menu close on clicking link without children
  $(".phone-back a").on("click", function () {
    if (!$(this).parent().hasClass("menu-item-has-children")) {
      $(".phone-back").fadeOut(300);
      $("body").css("overflow", "");
    }
  });

  // Mobile accordion sub-menus
  $(
    ".back-level1 .menu-item-has-children > a, .back-level1 .menu-item-has-children > .back-booton",
  ).on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var $parent = $(this).closest("li");
    var $sub = $parent.find("> .sub-menu");
    var $btn = $parent.find("> .back-booton");

    if ($sub.is(":visible")) {
      $sub.slideUp(300);
      $btn.removeClass("open");
    } else {
      // Collapse sibling sub-menus at the same hierarchy level
      $parent.siblings().find("> .sub-menu").slideUp(300);
      $parent.siblings().find("> .back-booton").removeClass("open");

      $sub.slideDown(300);
      $btn.addClass("open");
    }
  });

  // ---- Premium Live Search Implementation ----

  var searchProducts = [
    {
      name: "New SGA-60",
      url: "product-sga.html",
      category: "Vector Signal Generator",
      keywords: "sga60 sga-60 vector signal generator vsg",
    },
    {
      name: "New SAN Series",
      url: "product-new-san.html",
      category: "Spectrum Analyzer",
      keywords: "san new san usb spectrum analyzer 9ghz 6ghz",
    },
    {
      name: "SAN Series (SAN-400)",
      url: "product-san400.html",
      category: "Spectrum Analyzer",
      keywords: "san400 san-400 usb spectrum analyzer 40ghz",
    },
    {
      name: "SAE Series",
      url: "product-sa.html",
      category: "Spectrum Analyzer",
      keywords: "sae sa usb spectrum analyzer 9ghz 6.3ghz",
    },
    {
      name: "NXN Series",
      url: "product-nxn.html",
      category: "Networked Spectrum Analyzer",
      keywords: "nxn networked spectrum analyzer network 40ghz",
    },
    {
      name: "NXE Series",
      url: "product-nxe.html",
      category: "Networked Spectrum Analyzer",
      keywords: "nxe networked spectrum analyzer network 9ghz",
    },
    {
      name: "PX Series Standard",
      url: "product-px-standard.html",
      category: "Benchtop/Handheld Spectrum Analyzer",
      keywords: "px standard benchtop handheld spectrum analyzer 40ghz",
    },
    {
      name: "PX Series Geek",
      url: "product-px-geek.html",
      category: "Benchtop/Handheld Spectrum Analyzer",
      keywords: "px geek benchtop handheld spectrum analyzer 40ghz",
    },
    {
      name: "PXR Series (Rugged)",
      url: "product-px-rugged.html",
      category: "Rugged Spectrum Analyzer",
      keywords: "pxr rugged spectrum analyzer military 40ghz",
    },
    {
      name: "New PXN Series",
      url: "product-pxn.html",
      category: "Benchtop/Handheld Spectrum Analyzer",
      keywords: "pxn new pxn benchtop handheld spectrum analyzer 40ghz",
    },
    {
      name: "HDA-100 Active Antenna",
      url: "product-hda.html",
      category: "Antenna",
      keywords: "hda100 hda-100 active antenna directional automatic",
    },
  ];

  // Inject search results dropdown container dynamically on page load
  $(".hd-search").each(function () {
    if ($(this).find(".hd-search-results").length === 0) {
      $(this).append('<div class="hd-search-results"></div>');
    }
  });

  // Track search typing to provide real-time suggestions
  $(".hd-search-input input").on("input", function () {
    var query = $(this).val().toLowerCase().trim();
    var $results = $(this).closest(".hd-search").find(".hd-search-results");

    if (query.length === 0) {
      $results.hide().empty();
      return;
    }

    var matches = searchProducts.filter(function (product) {
      return (
        product.name.toLowerCase().indexOf(query) !== -1 ||
        product.category.toLowerCase().indexOf(query) !== -1 ||
        product.keywords.toLowerCase().indexOf(query) !== -1
      );
    });

    $results.empty();
    if (matches.length > 0) {
      matches.forEach(function (product) {
        var itemHtml = `
          <div class="hd-search-result-item" data-url="${product.url}">
            <div class="hd-search-result-title">${product.name}</div>
            <div class="hd-search-result-category">${product.category}</div>
          </div>
        `;
        $results.append(itemHtml);
      });
    } else {
      $results.append(
        '<div class="hd-search-no-results">No products found</div>',
      );
    }
    $results.show();
  });

  // Click on search result item navigates directly to product page
  $(document).on("click", ".hd-search-result-item", function () {
    var url = $(this).data("url");
    window.location.href = url;
  });

  // Search button click logic (Toggles box, or submits query if input is open and filled)
  $(".hd-search-img").on("click", function (e) {
    e.preventDefault();
    var $searchContainer = $(this).closest(".hd-search");
    var $inputContainer = $(this).siblings(".hd-search-input");
    var $input = $inputContainer.find("input");

    if ($inputContainer.is(":visible")) {
      var query = $input.val().toLowerCase().trim();
      if (query.length > 0) {
        // Run search query and redirect to first matching item
        var matches = searchProducts.filter(function (product) {
          return (
            product.name.toLowerCase().indexOf(query) !== -1 ||
            product.category.toLowerCase().indexOf(query) !== -1 ||
            product.keywords.toLowerCase().indexOf(query) !== -1
          );
        });
        if (matches.length > 0) {
          window.location.href = matches[0].url;
        } else {
          showToast("Search", "No matching products found.", false);
        }
      } else {
        // Toggle close
        $inputContainer.hide();
        $searchContainer.find(".hd-search-results").hide().empty();
      }
    } else {
      // Toggle open
      $inputContainer.show();
      $input.focus();
    }
  });

  // Handle enter key press inside search box to submit
  $(".hd-search-input input").on("keypress", function (e) {
    if (e.which === 13) {
      // Enter key
      e.preventDefault();
      var query = $(this).val().toLowerCase().trim();
      if (query.length > 0) {
        var matches = searchProducts.filter(function (product) {
          return (
            product.name.toLowerCase().indexOf(query) !== -1 ||
            product.category.toLowerCase().indexOf(query) !== -1 ||
            product.keywords.toLowerCase().indexOf(query) !== -1
          );
        });
        if (matches.length > 0) {
          window.location.href = matches[0].url;
        } else {
          showToast("Search", "No matching products found.", false);
        }
      }
    }
  });

  // Close search results dropdown on clicking outside
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".hd-search").length) {
      $(".hd-search-results").hide().empty();
    }
  });

  // ---- Contact Modal ----
  $(".sc33-zx, .contact-open-modal").on("click", function () {
    $(".sc30-out, .sc30-dbg").fadeIn(300);
    $("body").css("overflow", "hidden");
  });
  $(".sc30-close, .sc30-dbg").on("click", function () {
    $(".sc30-out, .sc30-dbg").fadeOut(300);
    $("body").css("overflow", "");
  });

  // Custom select dropdown
  $("#request-type, .sc30-part-xia").on("click", function () {
    $("#request-select").slideToggle(200);
  });
  $(".sc30-part-select-item").on("click", function () {
    var val = $(this).find("p").text();
    $("#request-type").val(val);
    $("#request-select").slideUp(200);
  });

  // ---- Back to Top ----
  $(".sc33-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

  // ---- Hero Banner Swiper ----
  if ($(".sc1").length) {
    var sc1Swiper = new Swiper(".sc1", {
      effect: "fade",
      fadeEffect: { crossFade: true },
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      speed: 1200,
      pagination: {
        el: ".sc1-out .swiper-pagination",
        clickable: true,
      },
      on: {
        slideChangeTransitionStart: function () {
          // Animate text on slide change
          var activeSlide = this.slides[this.activeIndex];
          var $wz = $(activeSlide).find(".sc1-item-wz");
          $wz.css({ opacity: 0, transform: "translateX(-40px)" });
          setTimeout(function () {
            $wz.css({
              transition: "all 0.8s ease",
              opacity: 1,
              transform: "translateX(0)",
            });
          }, 200);
        },
      },
    });
  }

  // ---- Featured Products Swiper ----
  if ($(".sc3").length) {
    var sc3Swiper = new Swiper(".sc3", {
      effect: "fade",
      fadeEffect: { crossFade: true },
      loop: true,
      speed: 800,
      pagination: {
        el: ".sc3sp .swiper-pagination",
        clickable: true,
      },
      on: {
        slideChangeTransitionStart: function () {
          var activeSlide = this.slides[this.activeIndex];
          var $left = $(activeSlide).find(".sc3-item-left");
          var $right = $(activeSlide).find(".sc3-item-right");
          $left.css({ opacity: 0, transform: "translateX(-30px)" });
          $right.css({ opacity: 0, transform: "translateX(30px)" });
          setTimeout(function () {
            $left.css({
              transition: "all 0.8s ease",
              opacity: 1,
              transform: "translateX(0)",
            });
            $right.css({
              transition: "all 0.8s ease 0.1s",
              opacity: 1,
              transform: "translateX(0)",
            });
          }, 100);
        },
      },
    });
  }

  // ---- Applications Synced Swipers ----
  if ($(".sc5").length && $(".sc6").length) {
    var sc6Swiper = new Swiper(".sc6", {
      effect: "creative",
      creativeEffect: {
        prev: { shadow: true, translate: [0, 0, -400] },
        next: { translate: ["100%", 0, 0] },
      },
      loop: true,
      speed: 800,
      allowTouchMove: false,
    });

    var sc5Swiper = new Swiper(".sc5", {
      loop: true,
      speed: 800,
      pagination: {
        el: ".sc4-other .swiper-pagination",
        clickable: true,
      },
      on: {
        slideChange: function () {
          sc6Swiper.slideTo(this.realIndex);
        },
      },
    });
  }

  // ---- News Synced Swipers ----
  if ($(".sc7-1").length) {
    var sc72Swiper = null;
    if ($(".sc7-2").length && window.innerWidth > 768) {
      sc72Swiper = new Swiper(".sc7-2", {
        loop: true,
        direction: "vertical",
        spaceBetween: 10,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
      });
    }

    var sc71Swiper = new Swiper(".sc7-1", {
      effect: "fade",
      fadeEffect: { crossFade: true },
      loop: true,
      speed: 1500,
      spaceBetween: 10,
      thumbs: sc72Swiper ? { swiper: sc72Swiper } : undefined,
      pagination: {
        el: ".sc7-out .swiper-pagination",
        clickable: true,
      },
    });
  }

  // ---- Responsive device mode check ----
  $(window).on("resize", function () {
    var mode = window.innerWidth <= 768 ? "mobile" : "pc";
    if (
      typeof currentDeviceMode !== "undefined" &&
      mode !== currentDeviceMode
    ) {
      currentDeviceMode = mode;
    }
  });

  // ---- Close menu on clicking outside ----
  $(".hd-bg").on("click", function () {
    $(".hdnav-box > .menu-item-has-children > .sub-menu").css(
      "display",
      "none",
    );
    $(".hdnav-box > .menu-item-has-children").removeClass("checked");
    $(this).fadeOut(200);
  });

  // Theme is permanently dark mode — no toggler needed.

  // ---- Contact Forms AJAX Integration & Hardening ----

  // 1. Dynamic injection of honeypot & autocomplete attributes for bot/spam protection and WCAG compliance
  $("form#git-contact-form, form#modal-contact-form").each(function () {
    // Append a hidden honeypot input field. Bots will autofill this field, but standard humans will not.
    if ($(this).find('input[name="website"]').length === 0) {
      $(this).append(
        '<input type="text" name="website" tabindex="-1" autocomplete="off" style="display:none !important" aria-hidden="true">',
      );
    }
  });

  // Inject autocomplete tags on footer contact form
  $("#git-fullname").attr("autocomplete", "name");
  $("#git-email").attr("autocomplete", "email");
  $("#git-phone").attr("autocomplete", "tel");
  $("#git-company").attr("autocomplete", "organization");

  // Inject autocomplete tags on modal contact form
  $(".sc30-part2 input").attr("autocomplete", "given-name");
  $(".sc30-part3 input").attr("autocomplete", "family-name");
  $(".sc30-part4 input").attr("autocomplete", "organization");
  $(".sc30-part5 input").attr("autocomplete", "country-name");
  $(".sc30-part6 input").attr("autocomplete", "email");
  $(".sc30-part7 input").attr("autocomplete", "tel");

  // Custom premium Toast Notification
  function showToast(title, message, isSuccess) {
    $(".toast-notification").remove();

    // HTML entity escaping helper to mitigate client-side XSS sinks
    function escapeHtml(text) {
      if (typeof text !== "string") return "";
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    var safeTitle = escapeHtml(title);
    var safeMessage = escapeHtml(message);

    var iconSvg = isSuccess
      ? '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3"/></svg>'
      : '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';

    var toastHtml = `
      <div class="toast-notification">
        <div class="toast-icon" style="${!isSuccess ? "background:rgba(239,68,68,0.1);color:#ef4444;" : ""}">
          ${iconSvg}
        </div>
        <div class="toast-content">
          <div class="toast-title">${safeTitle}</div>
          <div class="toast-message">${safeMessage}</div>
        </div>
      </div>
    `;
    $("body").append(toastHtml);

    // Trigger CSS slide-in
    setTimeout(function () {
      $(".toast-notification").addClass("show");
    }, 10);

    // Auto-remove after 4 seconds
    setTimeout(function () {
      $(".toast-notification").removeClass("show");
      setTimeout(function () {
        $(".toast-notification").remove();
      }, 400);
    }, 4000);
  }

  // Footer Form Submission
  $("#git-contact-form").on("submit", function (e) {
    e.preventDefault();
    var $form = $(this);
    var $btn = $form.find(".git-submit-btn");
    var originalBtnText = $btn.text();

    $btn.prop("disabled", true).text("Sending...");

    var data = {
      name: $form.find("#git-fullname").val(),
      email: $form.find("#git-email").val(),
      phone: $form.find("#git-phone").val(),
      company: $form.find("#git-company").val(),
      message: $form.find("#git-message").val(),
      website: $form.find('input[name="website"]').val(), // Honeypot field!
      _subject: "New Inquiry from Website (Footer Form)",
    };

    $.ajax({
      url: "/api/send-email",
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        showToast(
          "Success",
          "Your message has been sent successfully. We will get back to you shortly!",
          true,
        );
        $form[0].reset();
      },
      error: function (xhr) {
        var errorMsg =
          xhr.responseJSON && xhr.responseJSON.error
            ? xhr.responseJSON.error
            : "Failed to send message. Please try again or email business@pntech.in directly.";
        showToast("Error", errorMsg, false);
      },
      complete: function () {
        $btn.prop("disabled", false).text(originalBtnText);
      },
    });
  });

  // Modal Form Submission
  $("#modal-contact-form").on("submit", function (e) {
    e.preventDefault();
    var $form = $(this);
    var $btn = $form.find('input[type="submit"]');
    var originalBtnText = $btn.val();

    $btn.prop("disabled", true).val("Sending...");

    var userName =
      $form.find(".sc30-part2 input").val() +
      " " +
      $form.find(".sc30-part3 input").val();
    var userEmail = $form.find(".sc30-part6 input").val();
    var requestType = $form.find("#request-type").val();

    var data = {
      request_type: requestType,
      name: userName,
      company: $form.find(".sc30-part4 input").val(),
      country: $form.find(".sc30-part5 input").val(),
      email: userEmail,
      phone: $form.find(".sc30-part7 input").val(),
      message: $form.find(".sc30-part8 textarea").val(),
      website: $form.find('input[name="website"]').val(), // Honeypot field!
      _subject: "New Inquiry from Website (Modal Form) - " + requestType,
    };

    $.ajax({
      url: "/api/send-email",
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        showToast(
          "Success",
          "Your request has been submitted successfully. We will contact you shortly!",
          true,
        );
        $form[0].reset();
        $(".sc30-out, .sc30-dbg").fadeOut(300);
        $("body").css("overflow", "");
      },
      error: function (xhr) {
        var errorMsg =
          xhr.responseJSON && xhr.responseJSON.error
            ? xhr.responseJSON.error
            : "Failed to send request. Please try again or email business@pntech.in directly.";
        showToast("Error", errorMsg, false);
      },
      complete: function () {
        $btn.prop("disabled", false).val(originalBtnText);
      },
    });
  });

  // ---- Light/Dark Theme Toggle ----
  function toggleTheme() {
    if ($("html").hasClass("light-theme")) {
      $("html").removeClass("light-theme");
      localStorage.setItem("theme", "dark");
    } else {
      $("html").addClass("light-theme");
      localStorage.setItem("theme", "light");
    }
  }

  // Handle both desktop and mobile buttons
  $(document).on("click", "#theme-toggle, #theme-toggle-mobile", function (e) {
    e.preventDefault();
    toggleTheme();
  });

  // ---- Hero Inline Product Slider (Fade) ----
  function initHeroProductSliders() {
    document
      .querySelectorAll(".hero-product-slider")
      .forEach(function (slider) {
        var imgs = slider.querySelectorAll("img");
        if (imgs.length <= 1) return;
        var current = 0;
        setInterval(function () {
          imgs[current].style.opacity = "0";
          current = (current + 1) % imgs.length;
          imgs[current].style.opacity = "1";
        }, 2400);
      });
  }
  initHeroProductSliders();

  // ---- Scroll-Triggered Reveal Animations ----
  function initRevealAnimations() {
    var revealEls = document.querySelectorAll(
      ".reveal-up, .reveal-left, .reveal-scale",
    );
    if (!revealEls.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }
  initRevealAnimations();

  // ---- Animated Counter ----
  function initCounters() {
    var counters = document.querySelectorAll(".counter");
    if (!counters.length) return;
    var counted = false;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !counted) {
            counted = true;
            counters.forEach(function (counter) {
              var target = parseInt(counter.getAttribute("data-target"));
              var duration = target > 100 ? 2000 : 1500;
              var startTime = null;

              function easeOutCubic(t) {
                return 1 - Math.pow(1 - t, 3);
              }

              function animate(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var easedProgress = easeOutCubic(progress);
                var current = Math.round(easedProgress * target);
                counter.textContent = current.toLocaleString();
                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              }
              requestAnimationFrame(animate);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    // Observe the stats section container
    var statsSection = document.querySelector(".stats-section");
    if (statsSection) observer.observe(statsSection);
  }
  initCounters();

  // ---- 3D Tilt Effect on Cards ----
  function initTiltCards() {
    var cards = document.querySelectorAll(".tilt-card");
    cards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = ((y - centerY) / centerY) * -5;
        var rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform =
          "perspective(800px) rotateX(" +
          rotateX +
          "deg) rotateY(" +
          rotateY +
          "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform =
          "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
      });
    });
  }
  initTiltCards();

  // ---- Magnetic Button Effect ----
  function initMagneticButtons() {
    var buttons = document.querySelectorAll(".magnetic-btn");
    buttons.forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform =
          "translate(" + x * 0.15 + "px, " + y * 0.15 + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "translate(0, 0)";
      });
    });
  }
  initMagneticButtons();

  // ---- Parallax on Who We Are Image ----
  function initParallax() {
    var parallaxImg = document.querySelector(".whoweare-img img");
    if (!parallaxImg) return;

    window.addEventListener("scroll", function () {
      var rect = parallaxImg.parentElement.getBoundingClientRect();
      var windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        var scrollProgress =
          (windowHeight - rect.top) / (windowHeight + rect.height);
        var translateY = (scrollProgress - 0.5) * -20;
        parallaxImg.style.transform =
          "translateY(" + translateY + "px) scale(1.05)";
      }
    });
  }
  initParallax();

  // ---- Capability Cards — Staggered Reveal ----
  function initCapCardReveal() {
    var cards = document.querySelectorAll(".cap-card");
    if (!cards.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var cards = entry.target.querySelectorAll(".cap-card");
            cards.forEach(function (card, i) {
              setTimeout(function () {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    var grid = document.querySelector(".cap-grid");
    if (grid) {
      // Set initial state
      cards.forEach(function (card) {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      });
      observer.observe(grid);
    }
  }
  // Only init if WOW hasn't handled them
  if (typeof WOW === "undefined") {
    initCapCardReveal();
  }

  // ---- Automatic Image Background Removal (Key out White Background) ----
  function removeWhiteBackground(img) {
    if (img.dataset.bgRemoved === "true") return;

    // Only process local images to avoid CORS taint errors
    var src = img.getAttribute("src");
    if (!src) return;

    if (src.startsWith("data:")) {
      img.dataset.bgRemoved = "true";
      return;
    }

    // Skip logo, icon, or loader images
    var srcLower = src.toLowerCase();
    if (
      srcLower.includes("logo") ||
      srcLower.includes("icon") ||
      srcLower.includes("loader") ||
      srcLower.includes("arrow") ||
      srcLower.includes("bg")
    ) {
      return;
    }

    // Only process local relative paths or absolute path matching current origin
    var isLocal =
      !src.includes("://") || src.startsWith(window.location.origin);
    if (!isLocal) return;

    // Create a temporary image to read pixel data same-origin
    var tempImg = new Image();
    tempImg.crossOrigin = "anonymous";
    tempImg.src = src;

    tempImg.onload = function () {
      try {
        var canvas = document.createElement("canvas");
        canvas.width = tempImg.naturalWidth;
        canvas.height = tempImg.naturalHeight;

        // If image is zero-size, return
        if (canvas.width === 0 || canvas.height === 0) return;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(tempImg, 0, 0);

        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        var width = imgData.width;
        var height = imgData.height;

        // Use BFS flood-fill from all 4 corners to find contiguous white background pixels.
        var queue = [];
        var visited = new Uint8Array(width * height);

        function getPixelIndex(x, y) {
          return (y * width + x) * 4;
        }

        function isWhite(x, y) {
          var idx = getPixelIndex(x, y);
          var r = data[idx];
          var g = data[idx + 1];
          var b = data[idx + 2];
          var a = data[idx + 3];
          // Check if pixel is near-white (all channels > 240) and opaque
          return a > 50 && r > 240 && g > 240 && b > 240;
        }

        function enqueue(x, y) {
          var vIdx = y * width + x;
          if (!visited[vIdx]) {
            visited[vIdx] = 1;
            queue.push(x, y);
          }
        }

        // Enqueue all boundary pixels that are near-white
        for (var x = 0; x < width; x++) {
          if (isWhite(x, 0)) enqueue(x, 0);
          if (isWhite(x, height - 1)) enqueue(x, height - 1);
        }
        for (var y = 0; y < height; y++) {
          if (isWhite(0, y)) enqueue(0, y);
          if (isWhite(width - 1, y)) enqueue(width - 1, y);
        }

        // BFS Flood-fill
        var head = 0;
        var modified = false;
        while (head < queue.length) {
          var cx = queue[head++];
          var cy = queue[head++];

          var idx = getPixelIndex(cx, cy);
          if (data[idx + 3] !== 0) {
            data[idx + 3] = 0;
            modified = true;
          }

          // Check neighbors
          var neighbors = [cx - 1, cy, cx + 1, cy, cx, cy - 1, cx, cy + 1];
          for (var i = 0; i < neighbors.length; i += 2) {
            var nx = neighbors[i];
            var ny = neighbors[i + 1];
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              if (isWhite(nx, ny)) {
                enqueue(nx, ny);
              }
            }
          }
        }

        img.dataset.bgRemoved = "true";
        if (modified) {
          ctx.putImageData(imgData, 0, 0);
          img.src = canvas.toDataURL("image/png");
        }
      } catch (err) {
        console.warn("Failed to remove background for image:", img.src, err);
      }
    };
  }

  function observeAndProcessImages() {
    // Process existing images
    $("img").each(function () {
      var img = this;
      if (img.complete) {
        removeWhiteBackground(img);
      } else {
        $(img).on("load", function () {
          removeWhiteBackground(img);
        });
      }
    });

    // Set up a MutationObserver to watch for newly added images or src attribute modifications
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "src"
        ) {
          var img = mutation.target;
          var newSrc = img.getAttribute("src");
          if (newSrc && !newSrc.startsWith("data:")) {
            // Reset dataset state for new source image and process it
            delete img.dataset.bgRemoved;
            removeWhiteBackground(img);
          }
        } else if (mutation.type === "childList") {
          mutation.addedNodes.forEach(function (node) {
            if (node.tagName === "IMG") {
              var img = node;
              if (img.complete) {
                removeWhiteBackground(img);
              } else {
                $(img).on("load", function () {
                  removeWhiteBackground(img);
                });
              }
            } else if (node.querySelectorAll) {
              node.querySelectorAll("img").forEach(function (img) {
                if (img.complete) {
                  removeWhiteBackground(img);
                } else {
                  $(img).on("load", function () {
                    removeWhiteBackground(img);
                  });
                }
              });
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src"],
    });
  }

  observeAndProcessImages();
});
