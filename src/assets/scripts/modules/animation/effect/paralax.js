import gsap from "gsap/all";

export default function paralax(selector) {
    const paralaxImages = document.querySelectorAll(selector)
    paralaxImages.forEach((image) => {
        const wrap = document.createElement('div');
        wrap.style.overflow = 'hidden';
        const curtain = document.createElement('div');
        wrap.classList.add('image-with-curtain-in');
        curtain.classList.add('curtain');
        wrap.append(curtain);
        image.parentElement.prepend(wrap);
        gsap.set(image, { willChange: 'transform', scale: 1.1 });
        wrap.prepend(image);
        gsap.timeline({
            scrollTrigger: {
                trigger: image,
                once: true,
            }
        })
        .set(image, { autoAlpha: 0 })
        .to(curtain, { scaleY: 1 })
        .to(curtain, { scaleY: 0, transformOrigin: '50% 0%' })
        .set(image, { autoAlpha: 1 }, '<')

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