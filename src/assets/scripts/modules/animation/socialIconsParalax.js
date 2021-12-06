export default function socialIconsParalax(selector, scroller) {
    let scrollerOffset = 0;
    if (scroller) {
        scroller.on('scroll', (e) => {
            scrollerOffset = e.scroll.y;
        })
    }
    const $links = document.querySelectorAll(selector);
    $links.forEach(link => {
        const {width, height} =  link.getBoundingClientRect();
        link.addEventListener('mousemove',function(evt){
            const linkPosY = link.getBoundingClientRect().top;
            const linkPosX = link.getBoundingClientRect().left;
            const fromCenterOfEl = (linkPosX - evt.clientX) + (width / 2);
            const fromCenterOfElY = (linkPosY - evt.clientY) + (height / 2);
            gsap.to(link.querySelector('svg'), { y: fromCenterOfElY  - scrollerOffset, x: fromCenterOfEl, duration: 1/60 })
        });
        link.addEventListener('mouseleave',function(evt){
            gsap.to(link.querySelector('svg'), {
                x: 0, y: 0
            })
        });
    })
}