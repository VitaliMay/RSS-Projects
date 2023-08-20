
// let menu = document.querySelector(".menu__list")
// let body = document.querySelector('body')
// const burgerButton = document.getElementById('burger-button')
// let fon = document.querySelector('.fon')


// burgerButton.addEventListener("click", function(event) {
//     menu.classList.toggle("open")
//     burgerButton.classList.toggle("rotade")
//     body.classList.toggle('lock')
//     fon.classList.toggle('work')
// })



// function closeMenu() {
//     menu.classList.remove('open');
//     burgerButton.classList.remove('rotade');
//     body.classList.remove('lock');
//     fon.classList.remove('work');

// }

// const menuLink = document.querySelectorAll('.menu__list-item');
// menuLink.forEach(link => link.addEventListener('click', closeMenu));


// fon.addEventListener('click', closeMenu);

/*********************************************** */
/*********************************************** */
/*********************************************** */

const menu = document.querySelector(".menu__list");
const body = document.querySelector('body');
const burgerButton = document.getElementById('burger-button');
const fon = document.querySelector('.fon');



// делегирование событий
// Вместо назначения обработчика кликов на каждый элемент меню
menu.addEventListener('click', function(event) {
//   if (event.target.matches('.menu__list-link')) { // срабатывает только при клике именно на ссылку
//   if (event.target.classList.contains('.menu__list-link')) {
    

    if (event.target.closest('.menu__list-item')) { // срабатывает при клике на любой дочерний элемент


    closeMenu();
  }
});

burgerButton.addEventListener("click", function(event) {
    menu.classList.toggle("open");
    burgerButton.classList.toggle("rotade");
    body.classList.toggle('lock');
    fon.classList.toggle('work');
});

fon.addEventListener('click', closeMenu);

function closeMenu() {
    menu.classList.remove('open');
    burgerButton.classList.remove('rotade');
    body.classList.remove('lock');
    fon.classList.remove('work');

}

/*****Убираю меню при клике на профиль*********************** */
const profile = document.querySelector('.profile');

profile.addEventListener("click", function(event) {
  closeMenu()
});
/**************************** */



/*************************************************** */
/***********Рабочий вариант*************************************** */

// const sliderPg = document.querySelector(".slider-pg");
// let sliderPgItem = document.getElementsByClassName('slider-pg_item');


// sliderPg.addEventListener('click', function(event) {
//   if (event.target.closest('.slider-pg_container')) { // срабатывает при клике на любой дочерний элемент
//     // Удаляю 'slider-pg_item--active' у всех 'slider-pg_item' 
//     for (let item of sliderPgItem) {
//       item.classList.remove('slider-pg_item--active');
//     }

//     // Добавляю 'slider-pg_item--active'  к тому 'slider-pg_item' на который кликнул
//     event.target.closest('.slider-pg_container').querySelector('.slider-pg_item').classList.add('slider-pg_item--active');
//   }
// });

/*************************************************** */
/*************************************************** */
/*****Меняю цвет кнопок пагинации при клике*********************** */

const sliderPg = document.querySelector(".slider-pg");
const sliderPgItems = document.querySelectorAll('.slider-pg_item');

const sliderPgContainersArr = document.querySelectorAll('.slider-pg_container'); //для получения индекса кнопки

sliderPg.addEventListener('click', function(event) {
  const clickedSliderPgContainer = event.target.closest('.slider-pg_container');

  if (clickedSliderPgContainer) {
    const clickedSliderPgItem = clickedSliderPgContainer.querySelector('.slider-pg_item');

    sliderPgItems.forEach(item => {
      item.classList.remove('slider-pg_item--active');
    });

    clickedSliderPgItem.classList.add('slider-pg_item--active');

    console.log(Array.from(sliderPgContainersArr).indexOf(clickedSliderPgContainer)); // получение индекса кнопки
  }
});


/*********************************************************** */
/*********************************************************** */
/*********************************************************** */
/*********************************************************** */


// const sliderInner = document.querySelector(".slider-inner");
// const sliderInnerItems = document.querySelectorAll('.slider-inner_item');
// const visibleWidth = 450; // Visible width in pixels
// let currentIndex = 0; // Track the index of the currently visible item

// sliderInner.addEventListener('click', function(event) {
//   const clickedItem = event.target.closest('.slider-inner_item');
//   console.log (sliderInnerItems)
//   if (clickedItem) {
//     const newIndex = Array.from(sliderInnerItems).indexOf(clickedItem);
//     const translateAmount = -newIndex * visibleWidth;
    
//     sliderInner.style.transform = `translateX(${translateAmount}px)`;
//     sliderInnerItems[currentIndex].classList.remove('slider-inner_item--active');
//     clickedItem.classList.add('slider-inner_item--active');
//     currentIndex = newIndex;
//   }
// });



/************************************************************ */
/************************************************************ */
/************************************************************ */
/************************************************************ */

// Есть такой  код
// 	<div class="slider">
// 							<div class="slider-block">

// 								<button class="slider-btn">&lt;</button>
// 								<div class="slider-inner">
// 									<div class="slider-inner_item slider-inner_item--01"></div>
// 									<div class="slider-inner_item slider-inner_item--02"></div>
// 									<div class="slider-inner_item slider-inner_item--03"></div>
// 									<div class="slider-inner_item slider-inner_item--04"></div>
// 									<div class="slider-inner_item slider-inner_item--05"></div>
// 								</div>
// 								<button class="slider-btn">&gt;</button>
// 							</div>

// 							<div class="slider-pg slider-pg--position">
// 								<div class="slider-pg_container">
// 									<div class="slider-pg_item slider-pg_item--active"></div>
// 								</div>
// 								<div class="slider-pg_container">
// 									<div class="slider-pg_item"></div>
// 								</div>
// 								<div class="slider-pg_container">
// 									<div class="slider-pg_item"></div>
// 								</div>

// 								<div class="slider-pg_container slider-pg_container--04">
// 									<div class="slider-pg_item slider-pg_item--04"></div>
// 								</div>
// 								<div class="slider-pg_container slider-pg_container--05">
// 									<div class="slider-pg_item slider-pg_item--05"></div>
// 								</div>

// 							</div>
// 						</div>
// const sliderPg = document.querySelector(".slider-pg");
// const sliderPgItems = document.querySelectorAll('.slider-pg_item');

// const sliderPgContainersArr = document.querySelectorAll('.slider-pg_container'); //для получения индекса кнопки

// sliderPg.addEventListener('click', function(event) {
//   const clickedSliderPgContainer = event.target.closest('.slider-pg_container');

//   if (clickedSliderPgContainer) {
//     const clickedSliderPgItem = clickedSliderPgContainer.querySelector('.slider-pg_item');

//     sliderPgItems.forEach(item => {
//       item.classList.remove('slider-pg_item--active');
//     });

//     clickedSliderPgItem.classList.add('slider-pg_item--active');

//     console.log(Array.from(sliderPgContainersArr).indexOf(clickedSliderPgContainer)); // получение индекса кнопки
//   }
// });
// .slider-inner {
//   display: flex;
//   column-gap: 2.5rem;
// max-width: 140rem;
//   overflow: hidden;

//   @media screen and (max-width: 1439.8px) {
//     max-width: 92.5rem;
//     // max-width: 45rem;
//   }
//   @media screen and (max-width: 1024px) {
//     // max-width: 92.5rem;
//     max-width: 45rem;
//   }

// }

// .slider-inner_item {
//   width: 45rem;
//   height: 56rem;
//   flex-shrink: 0; // чтобы картинка не сжималась
//   //background-color: cadetblue;
//   background-size: cover;
//   background-repeat: no-repeat;

// }

// .slider-inner_item--01 {
//   background-image: url(../assets/img/image-01.png);
// }

// .slider-inner_item--02 {
//   background-image: url(../assets/img/image-02.png);
// }

// .slider-inner_item--03 {
//   background-image: url(../assets/img/image-03.png);
// }

// .slider-inner_item--04 {
//   background-image: url(../assets/img/image-04.png);
// }

// .slider-inner_item--05 {
//   background-image: url(../assets/img/image-05.png);
// }


// .slider-pg {

//   display: flex;

//   &--position {
//     margin-top: 35px;

//     @media screen and (max-width: 1439.8px) {
//       margin-top: 20px;
//     }
//   }

//   &_container {
//     width: 26px;
//     height: 26px;
//     //margin: 0 auto;
//     // background-color: aquamarine;
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     cursor: pointer;

//     //padding: 50px 0;

//     &--04 {

//       display: none;

//       @media screen and (max-width: 1439.8px) {
//         display: flex;
//       }
//     }
//     &--05 {

//       display: none;

//       @media screen and (max-width: 1024px) {
//         display: flex;
//       }
//     }
//   }

//   &_item {
//     width: 16px;
//     height: 16px;
//     background-color: #0C0C0E;
//     border-radius: 50%;
//   }

//   &_item--active {
//     background-color: #BB945F;
//   }
// Надо сделать слайдер, используя анимацию и JS, чтобы при клике на clickedSliderPgContainer показывались (и прятались) соотв. картинки



/*************************************** */


// Понимаю, возможно я неправильно понял ваш запрос. Чтобы обратиться к родительскому элементу "slider-pg_container", содержащему элемент с классом "slider-pg_item--active", вам необходимо использовать JavaScript, а не CSS.

// Вот пример JavaScript-кода, который позволит вам получить родительский элемент "slider-pg_container", содержащий :


// var activeItem = document.querySelector(".slider-pg_item--active");
// var parentContainer = activeItem.closest(".slider-pg_container");

/************************************************* */

// Находим все элементы input с типом radio
// let radioButtons = document.querySelectorAll('input[type="radio"]');
let radioButtons = document.querySelectorAll('.seasons_option');
const seasonArr = document.querySelectorAll('.favorites-items');
let indexSeason = 0 // индекс сезона выбранного по умолчанию
// Добавляем обработчик события для каждого элемента
radioButtons.forEach(function(item) {
  item.addEventListener('change', function() {
    // let label = this.parentElement; //родительский label не нужен, и так сработает
    let selectedValue = this.value;
    let selectedIndexSeason = Array.from(radioButtons).indexOf(item);
    console.log(selectedIndexSeason);
    console.log(seasonArr[selectedIndexSeason])
    seasonArr[indexSeason].classList.remove('favorites-items--active')
    seasonArr[indexSeason].classList.add('favorites-items--hidden')
    seasonArr[selectedIndexSeason].classList.remove('favorites-items--hidden')
    seasonArr[selectedIndexSeason].classList.add('favorites-items--active')
    indexSeason = selectedIndexSeason
    // console.log(selectedValue);
    // console.log(seasonArr[0]);
    // console.log(this);
  });
});


/************************************************************ */
/************************************************************ */
/************************************************************ */

// function elementFromTop(elem, classToAdd, DistanceFromTop, unit) {
//   var winY = window.innerHeight || document.documentElement.clientHeight,
//       distTop = elem.getBoundingClientRect().top,
//       distPercent = Math.round((distTop / winY) * 100),
//       distPixels = Math.round(distTop),
//       distUnit;
//   distUnit = единица == 'процент'? distPercent : distPixels;
//   if (distUnit <= DistanceFromTop) {
//       if (! hasClass(elem, classToAdd) ) { addClass(elem, classToAdd) ; }
//       } else {
//       delClass(elem, classToAdd) ;
//       }
//   }
// параметры: идентификатор элемента, добавляемый класс, расстояние от вершины, единица измерения («проценты» или «пиксели»)

// const stickyEl = document.querySelector('.favorites-form--position')
// console.log (`sticky = ${stickyEl}`)
// console.log (`stickyClass = ${stickyEl.className.includes('element-from-top')}`)
// console.log(stickyEl.getBoundingClientRect().top)

// window.addEventListener('scroll', function() {
//   console.log(stickyEl.getBoundingClientRect().top)
//   if (stickyEl.getBoundingClientRect().top <= 0 && stickyEl.getBoundingClientRect().top > -127) {
//     stickyEl.classList.add('favorites-form--position-sticky')
//   } else {
//     stickyEl.classList.remove('favorites-form--position-sticky')
//   }
// // }, false);
// });


/************************************************* */
/************************************************* */
/************************************************* */
// меняю цвет фона для элемента sticky элемента
// как только элемент скролится до позиции top = 0

(function(){
  const stickyEl = document.querySelector('.favorites-form--position')
  console.log (`sticky = ${stickyEl}`)
  console.log (`stickyClass = ${stickyEl.className.includes('element-from-top')}`)
  console.log(stickyEl.getBoundingClientRect().top)

  window.addEventListener('scroll', function() {
    console.log(stickyEl.getBoundingClientRect().top)
    if (stickyEl.getBoundingClientRect().top <= 0 && stickyEl.getBoundingClientRect().top > -127) {
      stickyEl.classList.add('favorites-form--position-sticky')
    } else {
      stickyEl.classList.remove('favorites-form--position-sticky')
    }
// }, false);
  });
})();


/*

(function(){
	// function hasClass(el, cls) {
	// 	if (el.className.match('(?:^|\\s)'+cls+'(?!\\S)')) { return true; } 
	// 	}
	// function addClass(el, cls) {
	// 	if (!el.className.match('(?:^|\\s)'+cls+'(?!\\S)')){ el.className += ' '+cls; } 
	// 	}
	// function delClass(el, cls) {
	// 	el.className = el.className.replace(new RegExp('(?:^|\\s)'+cls+'(?!\\S)'),'');
	// 	}

  
	function elementFromTop(elem, classToAdd, distanceFromTop, unit) {
		var winY = window.innerHeight || document.documentElement.clientHeight,
		    distTop = elem.getBoundingClientRect().top,
		    distPercent = Math.round((distTop / winY) * 100),
		    distPixels = Math.round(distTop),
		    distUnit;
		distUnit = unit == 'percent' ? distPercent : distPixels;
		if (distUnit <= distanceFromTop) {
			if (stickyEl.className.includes('element-from-top')) { 
        stickyEl.classList.remove('element-from-top') 
      }
			} else {
        stickyEl.classList.add('element-from-top') 
			}
		}
	// params: element id, class to add, distance from top, unit ('percent' or 'pixels')

	window.addEventListener('scroll', function() {
		elementFromTop(document.querySelector('favorites-form--position'), 'element-from-top', 0, 'pixels');
		}, false);
	
})();
*/