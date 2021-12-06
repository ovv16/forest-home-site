import gsap from "gsap/all";

export default function paralax(selector) {
    const paralaxImages = document.querySelectorAll(selector)
    paralaxImages.forEach((image) => {

        const wrap = document.createElement('div');
        const complexInnerTitle = image.parentElement.querySelector('.title-inner-page');
        wrap.style.overflow = 'hidden';
        const curtain = document.createElement('div');
        wrap.classList.add('image-with-curtain-in');
        gsap.set(wrap, { 
            position: 'relative',
            // width: image.getBoundingClientRect().width,
        })
        curtain.classList.add('curtain');
        wrap.append(curtain);
        const imageMarginLeft = getComputedStyle(image).marginLeft;
        const imageMarginTop = getComputedStyle(image).marginTop;

        console.log(imageMarginLeft);
        if (complexInnerTitle === null) {
            image.parentElement.prepend(wrap);
        } else {
            complexInnerTitle.insertAdjacentElement('afterend', wrap);
        }
        gsap.set(image, { scale: 1.1 });
        gsap.set(curtain, { marginTop: imageMarginTop })
        wrap.prepend(image);
        gsap.set(wrap, { marginLeft: imageMarginLeft, willChange: 'transform' });
        gsap.set(image, { marginLeft: 0, autoAlpha: 0 })
        gsap.timeline({
            scrollTrigger: {
                trigger: image,
                start: '20% bottom',
                once: true,
            }
        })
        .to(curtain, { scaleY: 1 })
        .to(curtain, { scaleY: 0, transformOrigin: '50% 0%' })
        .to(image, { autoAlpha: 1 }, '<')
        .add(() => curtain.remove())
        gsap.timeline({
            ease: 'none',
            scrollTrigger: {
            trigger: wrap,
            scrub: 0.5,
            // markers: true,
            },
        })
            .fromTo(image, {
            y: 35,
            }, {
            y: -35,
            ease: 'linear',
            });
        });
}