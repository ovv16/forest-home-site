import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import splitToLinesAndFadeUp from './effect/splitToLinesAndFadeUp';
import paralax from './effect/paralax.js';
import {throttle, debounce} from '../helpers/helpers';
import paralaxNoOverflow from './effect/paralaxNoOverflow';
import clipPathEntry from './effect/clipPathEntry';
import menuLinksEffect from './menu';

export default function animation(scroller) {
    gsap.registerPlugin(ScrollTrigger);
    scroller.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector(".page__inner").style.transform ? "transform" : "fixed"
    });
    ScrollTrigger.addEventListener('refresh', () => window.locoScroll.update());
    ScrollTrigger.refresh();

    menuLinksEffect();
    splitToLinesAndFadeUp('.section-1__text, .title, .section-4__right .text');
    splitToLinesAndFadeUp('.section-7__item a');
    splitToLinesAndFadeUp('.italic-title i, .big-text');
    
    function loaderAnimation() {
        if (sessionStorage.getItem('loader') !== null) {
            return undefined;
        }
        const loader = document.querySelector('.loader-wrap');
        const headerLogo = document.querySelector('.header__logo img');
        const loaderText = loader.querySelector('.loader-wrap__text');
        const headerScaleCoef = loaderText.getBoundingClientRect().width / headerLogo.getBoundingClientRect().width;
        return gsap.timeline()
            .set(headerLogo, { scale: headerScaleCoef, autoAlpha: 0 })
            .to(loader.querySelector('img'), {
                clipPath: 'polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%)',
                ease: 'power4.out',
                duration: 1.85
            })
            .to(loader, { yPercent: -100 })
            .to('.loader-wrap img', { autoAlpha: 0, duration:0.1 }, '<')
            .to('.header__logo img', { autoAlpha: 1, duration:0.1 }, '<')
            .add(() => {
                sessionStorage.setItem('loader', true);
            }, '<')

    }
    // loaderAnimation();
    if (sessionStorage.getItem('loader') === null) {
        window.ttl1 = gsap.timeline({
            defaults: {
                ease: 'power3.out',
                duration : 2.5
            }
        })
            .add(loaderAnimation())
            
            .fromTo('.header__left>*', { 
                xPercent: -100,autoAlpha:0
            }, {
                xPercent: 0,
                autoAlpha: 1
            },"<75%")
            .fromTo('.header__right>*', { 
                xPercent: 100,autoAlpha:0
            }, {
                xPercent: 0,
                autoAlpha: 1
            },'<')
            .fromTo('.section-1__text', { 
                xPercent: -100,autoAlpha:0
            }, {
                xPercent: 0,
                autoAlpha: 1
            },'<')
            .fromTo('.header__logo img', { 
                yPercent: 300,
                // autoAlpha:0
            }, {
                yPercent: 0,
                scale: 1,
                // autoAlpha: 1
            },'<');
    } else {
        document.querySelector('.loader-wrap') && document.querySelector('.loader-wrap').remove();
    }

    const images = [
        './assets/images/home/screen1/1920/2.jpg',
        './assets/images/home/screen1/1920/3.jpg',
        './assets/images/home/screen1/1920/4.jpg',
        './assets/images/home/screen1/1920/6.jpg',
    ];

    function screen1ChangeSlider() {
        const section1 = document.querySelector('.section-1');
        if (section1 === null) return;
        const sec1Canvases = {
            prev: document.createElement('img'),
            next: document.createElement('img'),
            active: undefined,
            innactive: undefined,
        };
        sec1Canvases.prev.setAttribute('data-screen-canvas', '');
        sec1Canvases.next.setAttribute('data-screen-canvas', '');
        sec1Canvases.active = sec1Canvases.prev;
        sec1Canvases.innactive = sec1Canvases.next;
        sec1Canvases.prev.src = images[0];
        sec1Canvases.next.src = images[0];
        section1.append(sec1Canvases.prev);
        section1.append(sec1Canvases.next);
        const frameDurationScreen1 = 4.5 ;
        function screen1Transition(index){
            const elToAnim = sec1Canvases.active;
            const innactiveEl = sec1Canvases.innactive;
            // console.log(elToAnim ===  innactiveEl);
            window.screen1Tl = gsap.timeline()
                .add(() => {
                    elToAnim.src = images[index];
                })
                .to(elToAnim, {scale: 1, autoAlpha: 1, duration: 1.5 })
                .fromTo(innactiveEl, {autoAlpha: 1,}, { autoAlpha: 0, duration: 1.5 }, '<')
                .fromTo(elToAnim, { scale: 1 }, { scale: 1.1, duration: frameDurationScreen1 },'<')
                .fromTo(elToAnim, { scale: 1.1 }, { scale: 1, duration: frameDurationScreen1 })
                .add(() => {
                    const nextIndex = index === images.length - 1 ? 0 : index+1;
                    screen1Transition(nextIndex);
                    sec1Canvases.active = sec1Canvases.active === sec1Canvases.next ? sec1Canvases.prev : sec1Canvases.next;
                    sec1Canvases.innactive = sec1Canvases.active === sec1Canvases.next ? sec1Canvases.prev : sec1Canvases.next;
                    // section1.classList.remove('switching')
                })
        }
        screen1Transition(0);
        ScrollTrigger.create({
            trigger: '.section-1',
            onToggle: ({isActive}) => {
                // console.log(window.screen1Tl);
                (isActive) ? 
                window.screen1Tl !== undefined && window.screen1Tl.play() :
                window.screen1Tl !== undefined && window.screen1Tl.pause();
            }
        })
    }
    screen1ChangeSlider();

    function buttonMenuEffect(selector) {
        const button = document.querySelector(selector);
        const parent = button.parentElement;
        let scaleCoef = parent.getBoundingClientRect().width / button.getBoundingClientRect().width;
        if (isNaN(scaleCoef)) scaleCoef = 3.25;
        // console.log(scaleCoef);
        button.addEventListener('mouseenter', () => {
            gsap.timeline({
                defaults: {
                    ease: 'power4.out'
                }
            })
            .to(button.querySelector('svg'), {
                scaleX: 0.4,
                duration: 0.1
            })
            .to(button, {
                borderRadius: 0,
                scaleX: scaleCoef,
            },'<')
        })
        button.addEventListener('mouseleave', () => {
            gsap.timeline({
                defaults: {
                    ease: 'power4.out'
                }
            })
            .to(button.querySelector('svg'), {
                scaleX: 1,
                duration: 0.1
            })
            .to(button, {
                borderRadius: '50%',
                scaleX: 1,
            },'<')
        })

    }
    buttonMenuEffect('.header__right-burg');
    buttonMenuEffect('.menu-top__right-burg');

    gsap.timeline({
        scrollTrigger: {
            trigger: '.section-4__left',
            scrub: true,
        }
    })
    .from('.section-4__left-img', {
        yPercent: 100
    })
    gsap.timeline({
        scrollTrigger: {
            trigger: '.section-3__right',
            scrub: true,
        }
    })
    .from('.section-3__right-img', {
        yPercent: 100
    });


    document.querySelector('.section-3') && gsap.timeline({
        scrollTrigger: {
            trigger: '.section-3',
            scrub: true,
            start: '20% bottom',
            end: '50% bottom',
        }
    })
        .fromTo(
            '.section-3 .title span, .section-3 .subtitle', 
            {   color: '#26262C'     },
            { color: '#fff' }
        )
    
    document.querySelector('.section-6') && gsap.timeline({
        scrollTrigger: {
            trigger: '.section-6',
            onToggle: ({isActive}) => {
                isActive ? 
                    document.querySelector('.section-6').classList.add('in-view') :
                    document.querySelector('.section-6').classList.remove('in-view') ;
                isActive ? 
                    gsap.to('.section-6 .title', { color: '#26262C', delay: 0.5 }) :
                    gsap.to('.section-6 .title', { color: '#fff', delay: 0.5 }) ;
            },
            onEnter: () => {

            }
        },
        
    });
    paralax('.section-4__left-bg, .section-3__right-bg');
    paralax('.section-4__left-bg, .section-3__right-bg');
    paralax('.complex-1__item img, .complex-2__item img, .complex-3__item img, .complex-4__item img, .complex-5__item img');
    paralax('.complex-1__img, .complex-2__img, .complex-3__img, .complex-4__img, .complex-5__img');
    
    const section7HoverImage = function() {
        const images = [
            './assets/images/home/screen7/1.jpg',
            './assets/images/home/screen7/2.jpg',
            './assets/images/home/screen7/3.jpg',
            './assets/images/home/screen7/4.jpg',
            './assets/images/home/screen7/5.jpg',
            './assets/images/home/screen7/6.jpg',
        ];
        const section = document.querySelector('.section-7');
        if (section === null) return;
        const canvas = getSvgForFilter(images);
        document.body.insertAdjacentHTML('beforeend', canvas);
        const svg = document.querySelector('.distort');
        const svgYCorrectionValue = svg.getBoundingClientRect().height / 2;
        const svgXCorrectionValue = 30;
        const elements = document.querySelectorAll('.section-7__item a');
        section.addEventListener('mousemove',function(evt){
            gsap.to(svg, {
                duration: 1 / 60,
                x: evt.clientX + svgXCorrectionValue,
                y: evt.clientY - svgYCorrectionValue
            })
        });
        elements.forEach((el, index) => {
            const imageToEdit = document.querySelectorAll('.distort image')[index];
            el.addEventListener('mouseenter', () => {
                gsap.to(imageToEdit, { opacity: 1 });
                gsap.to(el, { zIndex: 3 })
            })
            el.addEventListener('mouseleave', () => {
                gsap.to(imageToEdit, { opacity: 0 })
                gsap.to(el, { zIndex: 0 })
            })
        })
    }

    function getSvgForFilter(images){
        return `
            <svg xmlns="http://www.w3.org/2000/svg" class="distort" width="300" height="320" viewBox="0 0 300 320" style="transform: translateX(339.5px) translateY(103.2px);">
                <filter id="distortionFilter">
                    <feTurbulence type="turbulence" baseFrequency="0.01 0.01" numOctaves="0" seed="0" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="noise"></feTurbulence>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="5.13585e-13" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse"></feDisplacementMap>
                </filter>
                <g filter="url(#distortionFilter)">
                    ${(function(){
                        const acc = [];
                        images.forEach(el => {
                            acc.push(`<image y="50" class="distort__img" xlink:href="${el}" width="300" height="220" style="opacity: 0;"></image>`)
                        });
                        return acc.join('');
                    })()}
                </g>
            </svg>
        `;
    }
    section7HoverImage();


    gsap.timeline({
        scrollTrigger: {
            trigger: '.section-3',
            scrub: true,
            start: '20% bottom',
            end: '75% bottom'
        }
    })
    .from('.section-3', {
        backgroundColor: '#fff'
    })


    function handleHeader(e) {
        const direction = scroller.lastDeltaY > e.delta.y ? -1 : 1;
        // console.log(scroller.lastDeltaY, e.delta.y);
        if (scroller.lastDeltaY === e.delta.y) return;
        if (e.delta.y < 150)  {
            showHeader();
            return;
        };
        direction>0 ? hideHeader() : showHeader();
        scroller.lastDeltaY = e.delta.y;
    };
    function hideHeader() {
        gsap.to('.header', { yPercent: -100 })
    }
    function showHeader() {
        gsap.to('.header', { yPercent: 0 })
    }
    const throttleTime = 1000;
    const handleHeaderDeounced = throttle(handleHeader, throttleTime);
    scroller.on('scroll', handleHeaderDeounced);

    /**Menu Anim */
    function menuHandler(){
        const call = document.querySelector('.header__right-button-menu');
        const close = document.querySelector('.menu-top__right-button-menu');
        const menu = document.querySelector('.menu');
        const links = menu.querySelectorAll('.menu-main__left-links a');
        const rightBlocks = menu.querySelectorAll('.menu-main__right-item');
        // const heightofRightBlocks 
        call.addEventListener('click', openMenu);
        close.addEventListener('click', closeMenu);
        function openMenu() {
            gsap.timeline({
                defaults: {
                    ease: 'power4.out',
                    duration: 1.75,
                }
            })
                .fromTo(menu, 
                    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
                    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
                )
                .fromTo(rightBlocks, { skewX: 5, yPercent: -100, }, { skewX: 0, yPercent: 0, stagger: 0.1 }, '<')
                .fromTo(links, { skewX: 5, yPercent: -100, }, { skewX: 0, yPercent: 0, stagger: 0.1 }, '<')
        }
        function closeMenu() {
            gsap.timeline()
                .add(() => menu.classList.add('active'))
                .fromTo(menu, 
                    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
                    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
                )
                .fromTo(rightBlocks, 
                    { skewX: 0, yPercent: 0, }, 
                    {  skewX: 5, yPercent: -100,stagger: 0.1 }, 
                    '<'
                    )
                .fromTo(links, 
                    { skewX: 0, yPercent: 0, }, 
                    { skewX: 5, yPercent: -100, stagger: 0.1 }, 
                    '<'
                    )
        }
        
    }
    menuHandler();
    /**Menu Anim END */
    /**Complex blocksAnim */
    function blockComplexAnim(wrapper, trigger, elemToAnim) {
        // const block2 = document.querySelector('.complex-2');
        const block2 = document.querySelector(wrapper);
        gsap.timeline({
            scrollTrigger: {
                // trigger: '.complex-2__img',
                trigger: trigger,
                scrub: true,
                end: '50% 50%'
            }
        })
        // .from('.complex-2__wrapper', { yPercent: -50 })
        .from(elemToAnim, { y: -100 })
    }
    blockComplexAnim('.complex-2','.complex-2__img','.complex-2__wrapper');
    blockComplexAnim('.complex-3','.complex-3__img','.complex-3__wrapper');
    blockComplexAnim('.complex-4','.complex-4__img','.complex-4__wrapper');
    blockComplexAnim('.complex-5','.complex-5__img','.complex-5__wrapper');
    clipPathEntry('.complex-2__item img, .complex-5__img, complex-3__item img, complex-4__item img, complex-5__item img');
    paralaxNoOverflow('.complex-5-bg, .complex-1-bg, .complex-2-bg, .complex-3-bg, .complex-4-bg');
    function socialIconsParalax(selector) {
        const $links = document.querySelectorAll(selector);
        $links.forEach(link => {
            const linkPosY = link.getBoundingClientRect().top;
            const linkPosX = link.getBoundingClientRect().left;
            const {width, height} =  link.getBoundingClientRect();
            link.addEventListener('mousemove',function(evt){
                const fromCenterOfEl = (linkPosX - evt.clientX) + (width / 2);
                const fromCenterOfElY = (linkPosY - evt.clientY) + (height / 2);
                gsap.to(link.querySelector('svg'), { y: fromCenterOfElY, x: fromCenterOfEl, duration: 1/60 })
            });
            link.addEventListener('mouseleave',function(evt){
                gsap.to(link.querySelector('svg'), {
                    x: 0, y: 0
                })
            });
        })
    }
    socialIconsParalax('.section-1__social a');



    function footerColorEffect(){
        const footer = document.querySelector('.footer-contacts')
        ScrollTrigger.create({
            trigger: footer,
            start: '20% bottom',
            onEnter: () => {
                gsap.fromTo(footer, { backgroundColor: 'rgba(255,255,255,1)' }, { ease: 'power4.out', duration: 1.75, backgroundColor: 'rgba(255,255,255,0)' })
            },
            onLeaveBack: () => {
                gsap.fromTo(footer, { backgroundColor: 'rgba(255,255,255,0)' }, { ease: 'power4.out', duration: 1.75, backgroundColor: 'rgba(255,255,255,1)' })
            }
        })
    }
    footerColorEffect();
    

    const section1 = document.querySelector('.section-1__scroll');
    section1 && section1
        .addEventListener('click', () => {
            scroller.scrollTo(section1.closest('section').nextElementSibling)
        })
    function scrollInnertia(scroller) {
        if (document.querySelector('.section-7__item') === null) return;
        let some = 0;
        const maxSkewValue = -15;
        const resetSome = function() {
            some = 0;
            gsap.to('.section-7__item', { skewX: some * 0.15, duration: 0.5, ease: 'power4.out' })
        }
        const someDeb = debounce(resetSome, 500);
        scroller.on('scroll', () => {
            gsap.set('.section-7__item', { skewX: Math.max(some * -0.1, maxSkewValue) })
            some += 1;
            someDeb();
        })
    }
    scrollInnertia(scroller)
}