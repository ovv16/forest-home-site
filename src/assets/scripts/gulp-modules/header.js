window.addEventListener('DOMContentLoaded', () => {
  const openMenu = document.querySelector('#header-right-button-menu'),
    openMenuMobile = document.querySelector('#header-mobile__menu'),
    menu = document.querySelector('.menu'),
    closeMenu = document.querySelector('#menu-top-right-button-menu'),
    closeMenuMobile = document.querySelector('#header-mobile__menu');
  
    openMenu.addEventListener('click', () => {
      menu.classList.add('active');
    });

    openMenuMobile.addEventListener('click', () => {
      menu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
      menu.classList.remove('active');
    });

    closeMenuMobile.addEventListener('click', () => {
      menu.classList.remove('active');
    });
});