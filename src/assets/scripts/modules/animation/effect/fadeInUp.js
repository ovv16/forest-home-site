export default function fadeInUp(selector) {
    document.querySelectorAll(selector).forEach(text => {
        let tl = gsap
          .timeline({
            // paused: true,
            scrollTrigger: {
              trigger: text,
              once: true,
            },
          })
          .fromTo(
            text,
            { y: -50, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.95, ease: 'power4.out' },
          );
      });
}