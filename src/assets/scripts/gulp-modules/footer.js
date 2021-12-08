window.addEventListener('DOMContentLoaded', () => {
  const year = function() {
    const date = new Date();
    const yyyy = date.getFullYear();
    return yyyy;
  };
  
  const footer = document.querySelector('.year');
    footer.innerHTML += '&copy; ' + year();

    const placeHolder = document.querySelector('.place-holder'),
    input = document.querySelector('.input-tel');
  
    placeHolder.addEventListener('click', () => {
    placeHolder.style.display = 'none';
    input.focus();
  });

  document.querySelectorAll('.pageup').forEach(el => {
    el.addEventListener('click', () => {
      if (locoScroll !== undefined) {
        locoScroll.scrollTo(0);
      } else {
        window.scrollTo(0, 0);
      }
    });
  });
});
