const newsCards = document.querySelectorAll('.promotions-news__item');
const tabs = document.querySelectorAll('.promotions-news__tab');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        document
            .querySelector('.promotions-news__tab.promotions-news-active')
            .classList.remove('promotions-news-active');
        tab.classList.add('promotions-news-active');
    })
})