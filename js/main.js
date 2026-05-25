/* ============================================
   PNTECH.IN - Main JavaScript
   ============================================ */

$(document).ready(function () {
  // ---- WOW.js Init ----
  new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 100,
    mobile: true,
    live: true
  }).init();

  // ---- Header Scroll Behavior ----
  var lastScrollTop = 0;
  var headerEl = $('header');
  var hdOut = $('.hd-out');
  var phoneHeader = $('.phone-header');
  var scrollThreshold = 80;

  $(window).on('scroll', function () {
    var st = $(this).scrollTop();
    if (st > scrollThreshold) {
      hdOut.addClass('header-active');
      phoneHeader.addClass('header-active');
    } else {
      hdOut.removeClass('header-active');
      phoneHeader.removeClass('header-active');
    }

    // Toggle floating sidebar visibility on scroll
    if (st > 300) {
      $('.sc33').addClass('visible');
    } else {
      $('.sc33').removeClass('visible');
    }

    // Hide header on scroll down, show on scroll up
    if (st > lastScrollTop && st > 200) {
      headerEl.css('transform', 'translateY(-100%)');
    } else {
      headerEl.css('transform', 'translateY(0)');
    }
    lastScrollTop = st <= 0 ? 0 : st;
  });

  // ---- Desktop Multi-Level Flyout Menu (Harogic-style) ----

  // Hovering over main nav item with children shows its dropdown
  $('.hdnav-box > .menu-item-has-children').hover(function (event) {
    $('.hd-bg').fadeIn(200);
    $(this).addClass('checked');
    $(this).siblings().removeClass('checked');
    $(this).children('.sub-menu').css('display', 'block');
    $(this).siblings().children('.sub-menu').css('display', 'none');
    // Reset all nested states
    $(this).children('.sub-menu').children('.menu-item').removeClass('checked');
    $(this).children('.sub-menu').children('.menu-item').children('.sub-menu').css('display', 'none');
    event.stopPropagation();
  }, function () {});

  // Level 1 sub-menu items hover (Spectrum Analyzer, VSG, Antenna)
  $('.hdnav-box > .menu-item-has-children > .sub-menu > .menu-item').hover(function (event) {
    $(this).addClass('checked');
    $(this).siblings().removeClass('checked');
    $(this).find('> .sub-menu').css('display', 'block');
    $(this).siblings().find('> .sub-menu').css('display', 'none');
    // Reset deeper nested states
    $(this).find('> .sub-menu > .menu-item').removeClass('checked');
    $(this).find('> .sub-menu > .menu-item > .sub-menu').css('display', 'none');
    $(this).find('> .sub-menu > .menu-item > .sub-menu > .menu-item').css('display', 'none');
    event.stopPropagation();
  });

  // Level 2 sub-menu items hover (USB, Networked, Benchtop/Handheld)
  $('.hdnav-box > li > .sub-menu > .menu-item-has-children > .sub-menu > .menu-item').hover(function () {
    $(this).addClass('checked');
    $(this).siblings().removeClass('checked');
    $(this).find('> .sub-menu > .menu-item').css('display', 'block');
    $(this).siblings().find('> .sub-menu > .menu-item').css('display', 'none');
  });

  // Level 3 sub-menu items hover (individual products)
  $('.hdnav-box > li > .sub-menu > .menu-item-has-children > .sub-menu > .menu-item > .sub-menu > .menu-item').hover(function () {
    $(this).addClass('checked');
    $(this).siblings().removeClass('checked');
  });

  // Close dropdown when hovering over main content
  $('main').hover(function () {
    $('.hd-bg').fadeOut(200);
    $('.hdnav-box').children('.menu-item').removeClass('checked');
    $('.hdnav-box').children('.menu-item').children('.sub-menu').css('display', 'none');
  });

  // Close menu when hovering over the background overlay
  $('.hd-bg').hover(function () {}, function () {
    $('.hd-bg').fadeOut(200);
    $('.hdnav-box').children('.menu-item').removeClass('checked');
    $('.hdnav-box').children('.menu-item').children('.sub-menu').css('display', 'none');
  });

  // Close desktop menu when clicking a product link
  $('.hdnav-box .sub-menu a').on('click', function () {
    $('.hdnav-box > .menu-item-has-children > .sub-menu').css('display', 'none');
    $('.hdnav-box > .menu-item-has-children').removeClass('checked');
    $('.hd-bg').fadeOut(200);
  });


  // ---- Mobile Menu ----
  $('.phone-more').on('click', function () {
    $('.phone-back').fadeIn(300);
    $('body').css('overflow', 'hidden');
  });
  $('.back-more').on('click', function () {
    $('.phone-back').fadeOut(300);
    $('body').css('overflow', '');
  });

  // Mobile menu close on clicking link without children
  $('.phone-back a').on('click', function () {
    if (!$(this).parent().hasClass('menu-item-has-children')) {
      $('.phone-back').fadeOut(300);
      $('body').css('overflow', '');
    }
  });

  // Mobile accordion sub-menus
  $('.back-level1 .menu-item-has-children > a').on('click', function (e) {
    e.preventDefault();
    var $li = $(this).parent();
    var $sub = $li.find('> .sub-menu');
    if ($sub.is(':visible')) {
      $sub.slideUp(300);
    } else {
      $li.siblings().find('.sub-menu').slideUp(300);
      $sub.slideDown(300);
    }
  });

  // ---- Search Toggle ----
  $('.hd-search-img').on('click', function () {
    var $input = $(this).siblings('.hd-search-input');
    $input.toggle();
    if ($input.is(':visible')) {
      $input.find('input').focus();
    }
  });

  // ---- Contact Modal ----
  $('.sc33-zx, .contact-open-modal').on('click', function () {
    $('.sc30-out, .sc30-dbg').fadeIn(300);
    $('body').css('overflow', 'hidden');
  });
  $('.sc30-close, .sc30-dbg').on('click', function () {
    $('.sc30-out, .sc30-dbg').fadeOut(300);
    $('body').css('overflow', '');
  });

  // Custom select dropdown
  $('#request-type, .sc30-part-xia').on('click', function () {
    $('#request-select').slideToggle(200);
  });
  $('.sc30-part-select-item').on('click', function () {
    var val = $(this).find('p').text();
    $('#request-type').val(val);
    $('#request-select').slideUp(200);
  });

  // ---- Back to Top ----
  $('.sc33-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  // ---- Hero Banner Swiper ----
  if ($('.sc1').length) {
    var sc1Swiper = new Swiper('.sc1', {
      effect: 'fade',
      fadeEffect: { crossFade: true },
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      speed: 1200,
      pagination: {
        el: '.sc1-out .swiper-pagination',
        clickable: true
      },
      on: {
        slideChangeTransitionStart: function () {
          // Animate text on slide change
          var activeSlide = this.slides[this.activeIndex];
          var $wz = $(activeSlide).find('.sc1-item-wz');
          $wz.css({ opacity: 0, transform: 'translateX(-40px)' });
          setTimeout(function () {
            $wz.css({
              transition: 'all 0.8s ease',
              opacity: 1,
              transform: 'translateX(0)'
            });
          }, 200);
        }
      }
    });
  }

  // ---- Featured Products Swiper ----
  if ($('.sc3').length) {
    var sc3Swiper = new Swiper('.sc3', {
      effect: 'fade',
      fadeEffect: { crossFade: true },
      loop: true,
      speed: 800,
      pagination: {
        el: '.sc3sp .swiper-pagination',
        clickable: true
      },
      on: {
        slideChangeTransitionStart: function () {
          var activeSlide = this.slides[this.activeIndex];
          var $left = $(activeSlide).find('.sc3-item-left');
          var $right = $(activeSlide).find('.sc3-item-right');
          $left.css({ opacity: 0, transform: 'translateX(-30px)' });
          $right.css({ opacity: 0, transform: 'translateX(30px)' });
          setTimeout(function () {
            $left.css({ transition: 'all 0.8s ease', opacity: 1, transform: 'translateX(0)' });
            $right.css({ transition: 'all 0.8s ease 0.1s', opacity: 1, transform: 'translateX(0)' });
          }, 100);
        }
      }
    });
  }

  // ---- Applications Synced Swipers ----
  if ($('.sc5').length && $('.sc6').length) {
    var sc6Swiper = new Swiper('.sc6', {
      effect: 'creative',
      creativeEffect: {
        prev: { shadow: true, translate: [0, 0, -400] },
        next: { translate: ['100%', 0, 0] }
      },
      loop: true,
      speed: 800,
      allowTouchMove: false
    });

    var sc5Swiper = new Swiper('.sc5', {
      loop: true,
      speed: 800,
      pagination: {
        el: '.sc4-other .swiper-pagination',
        clickable: true
      },
      on: {
        slideChange: function () {
          sc6Swiper.slideTo(this.realIndex);
        }
      }
    });
  }



  // ---- Responsive device mode check ----
  $(window).on('resize', function () {
    var mode = window.innerWidth <= 768 ? 'mobile' : 'pc';
    if (typeof currentDeviceMode !== 'undefined' && mode !== currentDeviceMode) {
      currentDeviceMode = mode;
    }
  });

  // ---- Close menu on clicking outside ----
  $('.hd-bg').on('click', function () {
    $('.hdnav-box > .menu-item-has-children > .sub-menu').css('display', 'none');
    $('.hdnav-box > .menu-item-has-children').removeClass('checked');
    $(this).fadeOut(200);
  });

  // Theme is permanently dark mode — no toggler needed.

  // ---- Contact Forms AJAX Integration ----
  
  // Custom premium Toast Notification
  function showToast(title, message, isSuccess) {
    $('.toast-notification').remove();
    
    var iconSvg = isSuccess 
      ? '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3"/></svg>'
      : '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';
      
    var toastHtml = `
      <div class="toast-notification">
        <div class="toast-icon" style="${!isSuccess ? 'background:rgba(239,68,68,0.1);color:#ef4444;' : ''}">
          ${iconSvg}
        </div>
        <div class="toast-content">
          <div class="toast-title">${title}</div>
          <div class="toast-message">${message}</div>
        </div>
      </div>
    `;
    $('body').append(toastHtml);
    
    // Trigger CSS slide-in
    setTimeout(function() {
      $('.toast-notification').addClass('show');
    }, 10);
    
    // Auto-remove after 4 seconds
    setTimeout(function () {
      $('.toast-notification').removeClass('show');
      setTimeout(function () {
        $('.toast-notification').remove();
      }, 400);
    }, 4000);
  }

  // Footer Form Submission
  $('#git-contact-form').on('submit', function (e) {
    e.preventDefault();
    var $form = $(this);
    var $btn = $form.find('.git-submit-btn');
    var originalBtnText = $btn.text();
    
    $btn.prop('disabled', true).text('Sending...');
    
    var data = {
      name: $('#git-fullname').val(),
      email: $('#git-email').val(),
      phone: $('#git-phone').val(),
      company: $('#git-company').val(),
      message: $('#git-message').val(),
      _subject: 'New Inquiry from Website (Footer Form)'
    };
    
    $.ajax({
      url: 'https://formsubmit.co/ajax/business@pntech.in',
      method: 'POST',
      dataType: 'json',
      data: data,
      success: function (response) {
        showToast('Success', 'Your message has been sent successfully. We will get back to you shortly!', true);
        $form[0].reset();
      },
      error: function (err) {
        showToast('Error', 'Failed to send message. Please try again or email business@pntech.in directly.', false);
      },
      complete: function () {
        $btn.prop('disabled', false).text(originalBtnText);
      }
    });
  });

  // Modal Form Submission
  $('#modal-contact-form').on('submit', function (e) {
    e.preventDefault();
    var $form = $(this);
    var $btn = $form.find('input[type="submit"]');
    var originalBtnText = $btn.val();
    
    $btn.prop('disabled', true).val('Sending...');
    
    var data = {
      request_type: $('#request-type').val(),
      name: $('.sc30-part2 input').val() + ' ' + $('.sc30-part3 input').val(),
      company: $('.sc30-part4 input').val(),
      country: $('.sc30-part5 input').val(),
      email: $('.sc30-part6 input').val(),
      phone: $('.sc30-part7 input').val(),
      message: $('.sc30-part8 textarea').val(),
      _subject: 'New Inquiry from Website (Modal Form) - ' + $('#request-type').val()
    };
    
    $.ajax({
      url: 'https://formsubmit.co/ajax/business@pntech.in',
      method: 'POST',
      dataType: 'json',
      data: data,
      success: function (response) {
        showToast('Success', 'Your request has been submitted successfully. We will contact you shortly!', true);
        $form[0].reset();
        $('.sc30-out, .sc30-dbg').fadeOut(300);
        $('body').css('overflow', '');
      },
      error: function (err) {
        showToast('Error', 'Failed to send request. Please try again or email business@pntech.in directly.', false);
      },
      complete: function () {
        $btn.prop('disabled', false).val(originalBtnText);
      }
    });
  });
});
