
const sliderScreen = document.querySelector('.slider__screen')
const sliderFilm = document.querySelector('.slider__film')
const sliderControls = document.querySelector('.slider__controls')
const sliderBtnLeft = document.querySelector('.slider-btn--left')
const sliderBtnRight = document.querySelector('.slider-btn--right')

let sliderPosition = 0
let previousWidth = window.innerWidth; // для отслеживания ширины экрана (чтобы при изменении высоты не срабатывал risize)


if (sliderControls) {
  sliderControls.addEventListener('click', sliderControlsRemote)
  window.addEventListener('resize', sliderStartPosition)
}


function sliderControlsRemote (event) {
  const sliderScreenWidth = sliderScreen.offsetWidth
  const sliderFilmWidthHidden = sliderFilm.offsetWidth - sliderScreenWidth

  const isMobile = sliderScreenWidth < 768
  const sliderStep = sliderFilmWidthHidden / (isMobile ? 6 : 3)

  const { target } = event

  if (target.closest('.slider-btn--left')) {
    sliderPosition += sliderStep
  }
  if (target.closest('.slider-btn--right')) {
    sliderPosition -= sliderStep
  }

  sliderFilm.style.transform = `translateX(${sliderPosition}px)`

  sliderBtnLeft.disabled = sliderPosition >= 0
  sliderBtnRight.disabled = Math.abs(sliderPosition) >= sliderFilmWidthHidden

}


function sliderStartPosition () {
  const currentWidth = window.innerWidth;

  if (currentWidth !== previousWidth) { // чтобы срабатывло только при изменении ширины
    sliderBtnLeft.disabled = true;
    sliderBtnRight.disabled = false;
    sliderPosition = 0
    sliderFilm.style.transform = `translateX(${sliderPosition}px)`

    previousWidth = currentWidth;
  }
}


export { sliderControls }
