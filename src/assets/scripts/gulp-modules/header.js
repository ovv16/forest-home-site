window.addEventListener('DOMContentLoaded', () => {
  const openMenu = document.querySelector('#header-right-button-menu'),
    menu = document.querySelector('.menu'),
    closeMenu = document.querySelector('#menu-top-right-button-menu');
  
    openMenu.addEventListener('click', () => {
      menu.classList.add('active');
    });
    closeMenu.addEventListener('click', () => {
      menu.classList.remove('active');
  });
});