export default function fadeInUp(selector) {
    document.querySelectorAll(selector).forEach(text => {
        // const parent = text.parentElement;
        // const wrapper = wrap();
        // parent.prepend(wrapper);
        // wrapper.append(text);
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
            { yPercent: -100, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 1.95, ease: 'power4.out' },
          );
      });
}

function wrap(el) {
    const div = document.createElement('div');
    div.style.overflow = 'hidden';
    // div.append(el);
    return div;
}