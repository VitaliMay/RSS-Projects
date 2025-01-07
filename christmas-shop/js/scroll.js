
const scrollBtn = document.querySelector('.scroll-btn')

if (scrollBtn) {
  scrollBtn.addEventListener('click', scrollUp)

  window.addEventListener('scroll', scrollBtnVisible);
  window.addEventListener('resize', scrollBtnVisible);
}

function scrollUp () {
  window.scrollTo({
    top: 0,
  })
}

function scrollBtnVisible (event) {
  if (window.innerWidth <= 768) { // Проверка ширину окна
    if (document.documentElement.scrollTop > 300) { // По ТЗ
    // if (document.documentElement.scrollTop > 64) { // Как только скрылось меню
        scrollBtn.classList.add('scroll-btn--visible');
    } else {
        scrollBtn.classList.remove('scroll-btn--visible');
    }
  } else {
    scrollBtn.classList.remove('scroll-btn--visible'); // По ТЗ надо скрыть
}
}

export { scrollBtn }

