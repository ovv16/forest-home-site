$(document).ready(() => {
  $('.section-2__right-slider').slick({
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: '<button type="button" class="slick-next"><svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L9 8L1 15" stroke="white" stroke-width="2"/></svg></button>',
    prevArrow: '<button type="button" class="slick-prev"><svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 1L2 8L10 15" stroke="white" stroke-width="2"/></svg></button>',
  });
  $('.section-5__right-slider').slick({
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // variableWidth: true,
    nextArrow:
      '<button type="button" class="slick-next"><svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L24 22L2 42" stroke="white" stroke-width="5"/></svg></button>',
    prevArrow:
      '<button type="button" class="slick-prev"><svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26 2L4 22L26 42" stroke="white" stroke-width="5"/></svg></button>',
    // responsive: [
    //   {
    //     breakpoint: 991,
    //     settings: {
    //       slidesToShow: 1.2,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1000) {
      $('.pageup').css('opacity', '1');
    } else {
      $('.pageup').css('opacity', '0');
    }
  });
  $('.pageup').on('click', function() {
    var el = $(this);
    var dest = el.attr('href');
    if (dest !== undefined && dest !== '') {
      $('html').animate(
        {
          scrollTop: $(dest).offset().top - 100,
        },
        1000,
      );
    }
    return false;
  });
});

// window.addEventListener('DOMContentLoaded', () => {
//   const openPopupContact = document.querySelector('#contact-popup');
//   openPopupContact.addEventListener('click', () => {
//     popup.classList.add('active');
//   });

//   locoScroll.update();
// });

window.addEventListener('load', () => {
  locoScroll.update();
});

window.addEventListener('resize', () => {
  console.log('--', locoScroll);
  locoScroll.update();
});

window.addEventListener('DOMContentLoaded', () => {
  const placeHolder = document.querySelector('.place-holder'),
    input = document.querySelector('.input-tel');
  
    placeHolder.addEventListener('click', () => {
    placeHolder.style.display = 'none';
    input.focus();
  });
});
  
// /** Стрелка переключатель в зависимости от положения на экране */
// function sideSwitchArrow(swiper, arrow, container) {
//   const mediumCordValue = document.documentElement.clientWidth / 2;
//   document.body.append(arrow);
//   container.style.cursor = 'none';
//   arrow.style.cursor = 'none';
//   arrow.style.zIndex = 1000;
//   arrow.style.position = 'fixed';
//   arrow.__proto__.hide = function() {
//     // this.style.opacity = '0';
//     gsap.to(this, { autoAlpha: 0 });
//     this.style.pointerEvents = 'none';
//   };
//   arrow.__proto__.show = function() {
//     gsap.to(this, { autoAlpha: 1 });
//     // this.style.opacity = '1';
//     // this.style.pointerEvents = 'auto';
//   };
//   arrow.dataset.side = 'leftSide';

//   container.addEventListener('mousemove', desktopNavButtonHandler);
//   container.addEventListener('mouseenter', () => {
//     arrow.show();
//   });
//   container.addEventListener('mouseleave', () => {
//     arrow.hide();
//   });
//   if (document.documentElement.clientWidth < 769) {
//     window.removeEventListener('mousemove', desktopNavButtonHandler);
//     arrow.remove();
//   }

//   /** Записывает координаты обьекта, на котором нужно скрыть стрелку переключения слайдера */
//   /** ms ---> main-screen */

//   function desktopNavButtonHandler(evt) {
//     // arrow.style.position = 'fixed';
//     arrow.style.left = `${evt.clientX - 18}px`;
//     arrow.style.top = `${evt.clientY - 18}px`;

//     getCursorSide(evt.clientX);
//     handleArrowVisibility(evt);
//   }

//   function handleArrowVisibility() {}

//   function getCursorSide(x) {
//     if (x < mediumCordValue) {
//       arrow.classList.add('left-side');
//       arrow.dataset.side = 'leftSide';
//       // switchGallerySlide('leftSide');
//     } else {
//       arrow.classList.remove('left-side');
//       arrow.dataset.side = 'rightSide';
//       // switchGallerySlide('rightSide')
//     }
//   }
//   function changeMe() {
//     switchGallerySlide(arrow.dataset.side);
//   }
//   container.addEventListener('click', changeMe);
//   if (document.documentElement.clientWidth < 576) {
//     container.removeEventListener('click', changeMe);
//   }
//   const navigate = {
//     leftSide: () => {
//       // swiper.slidePrev();
//       document.querySelector('.slick-prev').click();
//     },
//     rightSide: () => {
//       // swiper.slideNext();
//       document.querySelector('.slick-next').click();
//     },
//   };

//   function switchGallerySlide(side) {
//     navigate[side]();
//     return navigate.side;
//   }

//   // eslint-disable-next-line no-unused-vars
// }
// sideSwitchArrow({}, document.querySelector('.moving-arrow'), document.querySelector('.slider'));
// /** СТрелка переключатель в зависимости от положения на єкране END */

// document.querySelectorAll('.pageup').forEach(el => {
//   el.addEventListener('click', () => {
//     if (locoScroll !== undefined) {
//       locoScroll.scrollTo(0);
//     } else {
//       window.scrollTo(0, 0);
//     }
//   });
// });

const openMenu = document.querySelector('#header-right-button-menu'),
  // openMenuMobile = document.querySelector('#header-mobile__right-button-menu'),
  menu = document.querySelector('.menu'),
  closeMenu = document.querySelector('#menu-top-right-button-menu');
  // closeMenu320 = document.querySelector('#menu__mobile-right-close');

openMenu.addEventListener('click', () => {
  menu.classList.add('active');
});
// openMenuMobile.addEventListener('click', () => {
//   menu.classList.add('active');
// });
closeMenu.addEventListener('click', () => {
  menu.classList.remove('active');
});
// closeMenu320.addEventListener('click', () => {
//   menu.classList.remove('active');
// });