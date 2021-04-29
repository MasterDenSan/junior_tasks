
const headerMenuBtn = document.querySelector('.header__menu-btn');
const menuBlock = document.querySelector('.menu');


headerMenuBtn.addEventListener('click', function () {
    if (menuBlock.style.display === "block") {
        headerMenuBtn.classList.toggle('header__menu-btn_active')
        menuBlock.style.display = "none"
    } else {
        menuBlock.style.display = "block"
        if (window.innerWidth < 1200) {
            window.removeEventListener('resize', closeResize);
        }
    }
})


const closeResize = () => {
    if (window.innerWidth < 1200) {
        headerMenuBtn.classList.toggle('header__menu-btn_active')
        menuBlock.style.display = "none"
        window.addEventListener('resize', closeResize);
    }
}
window.addEventListener('resize', closeResize);


const repeatedCloseResize = () => {
    if (window.innerWidth > 1200) {
        return window.addEventListener('resize', closeResize);
    }
}
window.addEventListener('resize', repeatedCloseResize);
