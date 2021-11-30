// window.addEventListener('DOMContentLoaded', () => {
//   const matchTablet = window.matchMedia('(max-width: 950px)').matches;
//   console.log();
//   const openPopup = document.querySelector('#header-popup'),
//     openPopupMobile = document.querySelector('#header-popup-mobile'),
//     // openPopupMobile320 = document.querySelector('#header-mobile__right-popup320'),
//     popup = document.querySelector('#popup'),
//     closePopup = document.querySelector('#popup-close');

//   openPopup.addEventListener('click', () => {
//     popup.classList.add('active');
//   });
//   openPopupMobile.addEventListener('click', () => {
//     popup.classList.add('active');
//   });
//   // openPopupMobile320.addEventListener('click', () => {
//   //   popup.classList.add('active');
//   // });
//   closePopup.addEventListener('click', () => {
//     popup.classList.remove('active');
//   });

//   const openMenuPopup = document.querySelector('#menu-popup');
//   openMenuPopup.addEventListener('click', () => {
//     popup.classList.add('active');
//   });

//   const openMenu = document.querySelector('#header-right-button-menu'),
//     openMenuMobile = document.querySelector('#header-mobile__right-button-menu'),
//     menu = document.querySelector('.menu'),
//     closeMenu = document.querySelector('#menu__top-right-button-menu'),
//     closeMenu320 = document.querySelector('#menu__mobile-right-close');

//   openMenu.addEventListener('click', () => {

//     if (matchTablet) menu.classList.add('active');
//   });
//   openMenuMobile.addEventListener('click', () => {
//     menu.classList.add('active');
//   });
//   closeMenu.addEventListener('click', () => {
//     if (matchTablet) menu.classList.remove('active');
//   });
//   closeMenu320.addEventListener('click', () => {
//     menu.classList.remove('active');
//   });

//   const placeHolder = document.querySelector('.place-holder-pop-up');
//   const input = document.querySelector('.input-tel-pop-up');
//   placeHolder.addEventListener('click', () => {
//     placeHolder.style.display = 'none';
//     input.focus();
//   });

//   const myElement = document.querySelector('header');
//   function handleVisibilityOnScroll(elems = [], direction = 'up') {
//     elems.forEach(elem => {
//       direction === 'down' ? elem[0].classList.add(elem[1]) : elem[0].classList.remove(elem[1]);
//     });
//   }
//   locoScroll.on('scroll', position => {
//     // eslint-disable-next-line no-undef
//     ScrollTrigger.update;
//     if (position.scroll.y > document.documentElement.clientWidth) {
//       if (window.canvasEffectInterval) clearInterval(window.canvasEffectInterval);
//     }
//     if (position.scroll.y > 70) {
//       handleVisibilityOnScroll(
//         [
//           [myElement, 'headroom--not-top'],
//           [document.querySelector('.pageup'), 'not-on-top'],
//         ],
//         'down',
//       );
//     } else {
//       handleVisibilityOnScroll([
//         [myElement, 'headroom--not-top'],
//         [document.querySelector('.pageup'), 'not-on-top'],
//       ]);
//     }
//   });
// });

// /** Mobile callback popup */
// function mobPopupHandler() {
//   function close(el) {
//     // gsap.to(el, { autoAlpha: 0 });
//     gsap.fromTo(el,{ autoAlpha: 1, xPercent: 0 }, { autoAlpha: 0, xPercent: 100 });
//   }
//   function open(el) {
//     gsap.fromTo(el,{ autoAlpha: 0, xPercent: 100 }, { autoAlpha: 1, xPercent: 0 });
//   }
//   const popup = document.querySelector('[data-mobile-callback-popup]'),
//     call = document.querySelectorAll('[data-call-mobile-callback-popup]'),
//     closeEl = document.querySelector('[data-mobile-callback-close]');

//   closeEl.addEventListener('click', () => close(popup));
//   call.forEach(el => el.addEventListener('click', () => open(popup)));
//   // call.forEach(el => el.addEventListener('touchstart', () => open(popup)));

//   popup.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('mobile-callback-popup') ) {
//       close(popup)
//     }
//   })

// }

// document.querySelector('[data-call-form-popup]').addEventListener('click', () => {
//   popup.classList.add('active');
// });
// mobPopupHandler();


// function svgForMenu(containerToAppend) {
//   var svgNS = "http://www.w3.org/2000/svg";  
//   var path = document.createElementNS(svgNS,"path");
//   const { clientWidth: width , clientHeight: height } = document.documentElement;
//   const morph1 = `M 0 0 C 0 0 ${width} 0 ${width} 0`;
//   const morph2 = `M -200 0 C 0 ${height*2.75} ${width} ${height*2.75} ${width+200} 0`
//   const menuSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

//   menuSvg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
//   const gradient = getGradient();

//   path.setAttributeNS(null,"d",morph1);
//   menuSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
//   menuSvg.append(path);
//   menuSvg.append(gradient);
//   window.addEventListener('resize',function(evt){
//     console.log('aaa');
//   });
//   document.querySelector(containerToAppend).append(menuSvg);
//   gsap.set(path, { fill: `url(#${gradient.getAttribute('id')})` })
//   gsap.set(menuSvg, {
//     position: 'absolute',
//     left: '0',
//     top: '0',
//     width: '100vw',
//     height: '100vh',
//     zIndex: '-2',
//     pointerEvents: 'none'
//   })
//   const tl = gsap.timeline({
//   });
//   tl.to(menuSvg.querySelector('path'), { attr: { d: morph2 }, duration: 1.5, ease: 'power4.inOut' });
//   return tl;
// }

// const matchMobile = window.matchMedia('(max-width: 950px)').matches;
// function handleMenuAnimation() {
//   const anim = svgForMenu('#menu');
//   const menu = document.querySelector('#menu');
//   gsap.set(menu, { background: 'none' })
//   gsap.set('.menu [class*="inner-pages"]', { transformOrigin: 'top' })
//   const introTl = gsap.timeline({ paused: true });
//   introTl
//     // .set(menu, { background: 'none' })
//     .add(() => {
//       // console.log('i here');
//       if (menu.classList.contains('active')) {
//         menu.classList.remove('active');
//       } else {
//         menu.classList.add('active');
//       }
//     })
//     .add(anim, '<')
//     .fromTo('.menu__wrapper', { autoAlpha: 0 }, { autoAlpha: 1 }, '<+0.75')
//     .fromTo(
//       '.menu [class*="inner-pages"]', 
//       { webkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }, 
//       { webkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 100vh, 0% 100vh)',clipPath: 'polygon(0% 0%, 100% 0%, 100% 100vh, 0% 100vh)',ease: 'power4.inOut', duration: 1.5 }, 
//       '<-0.75'
//     )
//     .from('.menu', { borderColor: 'rgba(0,0,0,0)' }, '<')
//     .fromTo('.menu__top', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.5 }, '<')
//     .fromTo('.menu__links-left li', { yPercent: -100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: 0.05,ease: 'power4.inOut', duration: 1.5 }, '<')
//     .fromTo('.menu__links-right li', { yPercent: -100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: 0.05,ease: 'power4.inOut', duration: 1.5 }, '<')
//     // .to(menu, { background: '' });
//     document.querySelector('#header-right-button-menu').addEventListener('click',function(evt){
//       introTl.timeScale(1).play();
//     });
//     document.querySelector('#menu__top-right-button-menu').addEventListener('click',function(evt){
//       introTl.timeScale(1.5).reverse();

//     });
// }

// if (!matchMobile) handleMenuAnimation();
// function getGradient() {
//   var svgNS = "http://www.w3.org/2000/svg";  
//   var path = document.createElementNS(svgNS,"linearGradient");
//   path.setAttribute('id', 'menuGrad')
//   path.innerHTML = `
//   <stop offset="50%" stop-color="#ede8d6"></stop>
//   <stop offset="50%" stop-color="#232b3e"></stop>`;
//       return path;
// }


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
