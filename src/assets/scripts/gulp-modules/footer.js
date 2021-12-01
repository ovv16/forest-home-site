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
});