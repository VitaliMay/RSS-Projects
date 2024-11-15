
const sliderSection = document.querySelector('.slider-section')
const sliderScreen = document.querySelector('.slider__screen')
const sliderFilm = document.querySelector('.slider__film')
const sliderControls = document.querySelector('.slider__controls')
const sliderBtnLeft = document.querySelector('.slider-btn--left')
const sliderBtnRight = document.querySelector('.slider-btn--right')

let sliderPosition = 0

let previousWidth = window.innerWidth; // для отслеживания ширины экрана (чтобы при изменении высоты не срабатывал risize)



if (sliderControls) {
  sliderSection.addEventListener('click', sliderControlsRemote)
  window.addEventListener('resize', sliderStartPosition)
}


function sliderControlsRemote (event) {
  // const sliderSectionWidth = sliderSection.offsetWidth
  const sliderScreenWidth = sliderScreen.offsetWidth

  // const positionStartEnd = (sliderSectionWidth - sliderScreenWidth)

  const sliderFilmWidthHidden = sliderFilm.offsetWidth - sliderScreenWidth

  // console.log('section', sliderSectionWidth)
  // console.log('screen', sliderScreenWidth)
  // console.log('padding', positionStartEnd)

  let sliderStep = sliderFilmWidthHidden / 3

  if (sliderScreenWidth < 768) {
    sliderStep = sliderFilmWidthHidden / 6
  }

  // console.log('step', sliderStep)

  const { target } = event
  // console.log(target)
  // let sliderBtn


  // const sliderBtn = target.closest('.slider-btn')
  // if (sliderBtn) {
    // isSliderMoving = true;
    // sliderBtnLeft.disabled = true;
    // sliderBtnRight.disabled = true;

    // }



    if (target.closest('.slider-btn--left')) {
      sliderPosition += sliderStep
      // console.log('step', sliderStep)
      // console.log('кнопка')
    }
    if (target.closest('.slider-btn--right')) {
      sliderPosition -= sliderStep
    }
    sliderFilm.style.transform = `translateX(${sliderPosition}px)`

    // const 

    if (Math.abs(sliderPosition) >= sliderFilmWidthHidden) {
      sliderBtnRight.disabled = true;
    }
    if (sliderPosition >= 0) {
      sliderBtnLeft.disabled = true;
    }
    if (sliderPosition < 0 ) {
      sliderBtnLeft.disabled = false;
      // sliderBtnRight.disabled = false;
    }
    if (Math.abs(sliderPosition) < sliderFilmWidthHidden) {
      // sliderBtnLeft.disabled = false;
      sliderBtnRight.disabled = false;
    }

    console.log('sliderPosition', sliderPosition)
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


/* пробую решить задав право на ошибку в 2px     */

// function isDifferenceInRange(value1, value2) {
//   return Math.abs(value1 - value2) <= 2;
// }


export { sliderControls }
