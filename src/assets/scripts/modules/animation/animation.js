import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import splitToLinesAndFadeUp from './effect/splitToLinesAndFadeUp';
import paralax from './effect/paralax.js';

export default function animation(scroller) {
    console.log(scroller);
    gsap.registerPlugin(ScrollTrigger);
    scroller.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".page__inner").style.transform ? "transform" : "fixed"
    });
    ScrollTrigger.addEventListener('refresh', () => window.locoScroll.update());
    ScrollTrigger.refresh();
    splitToLinesAndFadeUp('.section-1__text, .title, .section-4__right .text');
    splitToLinesAndFadeUp('.section-7__item a');

    
    window.ttl1 = gsap.timeline({
        defaults: {
            ease: 'power3.out',
            duration : 2.5
        }
    })
        .fromTo('.header__left>*', { 
            xPercent: -100,autoAlpha:0
        }, {
            xPercent: 0,
            autoAlpha: 1
        })
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
        .fromTo('.header__logo svg', { 
            yPercent: 300,
            // autoAlpha:0
        }, {
            yPercent: 0,
            // autoAlpha: 1
        },'<');

        const images = [
            './assets/images/home/screen1/1920/2.jpg',
            './assets/images/home/screen1/1920/3.jpg',
            './assets/images/home/screen1/1920/4.jpg',
            './assets/images/home/screen1/1920/6.jpg',
        ];
        const section1 = document.querySelector('.section-1');


        function screen1Transition(index){
            window.screen1Tl = gsap.timeline()
                .fromTo(section1, {
                    backgroundSize: '100% 100%'
                }, {
                    backgroundSize: '110% 110%',
                    transformOrigin: '50% 50%',
                    duration: 5,
                })
                .fromTo(section1, {backgroundColor: '#fff'}, {backgroundColor: '#fff'})
                .add(() => {
                    section1.classList.add('switching')
                })
                .set(section1, { background: `url(${images[index]})`}, '<+0.3')
                .add(() => {
                    const nextIndex = index === images.length - 1 ? 0 : index+1;
                    screen1Transition(nextIndex);
                    section1.classList.remove('switching')
                }, '<+0.5')
        }

        ScrollTrigger.create({
            trigger: '.section-1',
            onToggle: ({isActive}) => {
                console.log(window.screen1Tl);
                (isActive) ? 
                window.screen1Tl !== undefined && window.screen1Tl.play() :
                window.screen1Tl !== undefined && window.screen1Tl.pause();
            }
        })
        screen1Transition(0);


        function buttonMenuEffect(selector) {
            const button = document.querySelector(selector);
            const parent = button.parentElement;
            let scaleCoef = parent.getBoundingClientRect().width / button.getBoundingClientRect().width;
            if (isNaN(scaleCoef)) scaleCoef = 3.25;
            console.log(scaleCoef);
            button.addEventListener('mouseenter', () => {
                gsap.timeline()
                .to(button.querySelector('svg'), {
                    scaleX: 0.4,
                    duration: 0.2
                })
                .to(button, {
                    borderRadius: 0,
                    scaleX: scaleCoef,
                },'<')
            })
            button.addEventListener('mouseleave', () => {
                gsap.timeline()
                .to(button.querySelector('svg'), {
                    scaleX: 1,
                    duration: 0.2
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
        })
        gsap.timeline({
            scrollTrigger: {
                trigger: '.section-6',
                onToggle: ({isActive}) => {
                    isActive ? 
                        document.querySelector('.section-6').classList.add('in-view') :
                        document.querySelector('.section-6').classList.remove('in-view') ;
                },
                onEnter: () => {

                }
            },
            
        });
        paralax('.section-4__left-bg, .section-3__right-bg');
        
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
                    gsap.to(imageToEdit, { opacity: 1 })
                })
                el.addEventListener('mouseleave', () => {
                    gsap.to(imageToEdit, { opacity: 0 })
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
}