export default function paralax(selector) {
    const paralaxImages = document.querySelectorAll(selector)
    paralaxImages.forEach((image) => {
        const wrap = document.createElement('div');
        wrap.style.overflow = 'hidden';
        image.parentElement.prepend(wrap);
        gsap.set(image, { willChange: 'transform', scale: 1.1 });
        wrap.prepend(image);

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