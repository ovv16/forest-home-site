import {ScrollTrigger} from 'gsap/ScrollTrigger';
export default function screen1ChangeSlider() {
    const images = getImages();
    function getImages() {
        return  [
            './assets/images/home/screen1/1920/2.jpg',
            './assets/images/home/screen1/1920/3.jpg',
            './assets/images/home/screen1/1920/4.jpg',
            './assets/images/home/screen1/1920/6.jpg',
        ];
    }
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
    sec1Canvases.prev.src = images[1];
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
            .to(innactiveEl, { autoAlpha: 0, duration: 1.5 }, '<')
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