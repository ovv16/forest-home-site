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
});
