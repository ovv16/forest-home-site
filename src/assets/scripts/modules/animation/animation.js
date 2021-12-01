import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import splitToLinesAndFadeUp from './effect/splitToLinesAndFadeUp';

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
            gsap.timeline()
                
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
        screen1Transition(0);


        function buttonMenuEffect(selector) {
        //     border-radius: 15px;
        // transform: scaleX(2.8);
            
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
}