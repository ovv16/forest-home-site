import gsap from "gsap/all";

export default function menuLinksEffect() {
    const canvas = document.createElement('img');
    canvas.setAttribute('data-menu-canvas', '');
    const images = [
        './assets/images/menu/Rectangle 3678.jpg',
        './assets/images/menu/Rectangle 3685.jpg',
        './assets/images/menu/Rectangle 3686.jpg',
        './assets/images/menu/Rectangle 4.jpg',
        './assets/images/menu/Rectangle 4.jpg',
    ];
    const menu = document.querySelector('.menu');
    menu.append(canvas);
    const links = document.querySelectorAll('.menu-main__left-list:nth-child(-n+5)');
    console.log(links);
    links.forEach((link, index) => {
        link.addEventListener('mouseenter',function(evt){
            gsap.to(link, { x: 20 });
            gsap.to(canvas, { duration: 1.65, xPercent: 0, ease: 'power4.out' });
            
            canvas.src = images[index];
        });
        link.addEventListener('mouseleave',function(evt){
            gsap.to(link, { x: 0 })
            gsap.to(canvas, { duration: 1.65, xPercent: 100, ease: 'power4.out' });
        });
    })
}