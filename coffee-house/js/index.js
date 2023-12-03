const score = `
Привет. При проверке, если не закрыть бургер-меню 
и перейти на десктопную версию, контент не будет скролится. 
Так как по факту, ты в бургер меню)) хоть кнопки и не видно). 
Нажми в любом месте, чтобы учесть такие случаи выставил фон. 
Или просто нажми на любую ссылку, или закрой бургер-меню в мобайл. 
Такие танцы понадобились, чтобы бургер меню могло скролится, 
если не помещается на экране, например, при повороте экрана. 
Можно поиграться, если выставить, например, iPhone XR и крутить экран,
точно поймешь о чём речь, если объяснил путано)

`

console.log(score)

// подключаю модуль
// import arrInfo from "./respInfo.js";
// console.log(arrInfo[0])

import data from "./products.js";

// const category = ['coffee', 'tea', 'dessert'];

let category = 'coffee'

// data.map((item) => { if (item.category === 'coffee') console.log(item.name)})
// data.map((item) => { if (item.category === 'tea') console.log(item.name)})
// data.map((item) => { if (item.category === 'dessert') console.log(item.name)})
// data.map((item) => { if (item.category === category[1]) console.log(item.name)})
// console.log(data[0])

const cardContainer = document.querySelector('.menu-offer__card-container')
const elementsDataCategory = [...document.querySelectorAll('[data-category]')];
// console.log(elementsDataCategory)
elementsDataCategory.forEach(element => {
  element.addEventListener('click', function() {
    // console.log('Был кликнут элемент:', element);
    // console.log('Значение data-category:', element.getAttribute('data-category'));
    category = element.getAttribute('data-category')
    // console.log(category)
    cardContainer.innerHTML = '';
    let out = '';

    // let outNew = 
    // `
    // <div class="card">
		// 	<div class="card-img">
		// 		<div class="card-img__item card-img__item--01"></div>
		// 	</div>
		// 	<div class="card-content">
		// 			<h3 class="card-content__title title-3">\`${item.name}\`</h3>
		// 			<p class="card-content__text">Fragrant black coffee with Jameson Irish whiskey and whipped milk</p>
		// 			<p class="card-content__price title-3">$7.00</p>
		// 	</div>
		// </div>

    // `
    data.map((item) => { if (item.category === category) 
      {out += 
        `
    <div class="card">
			<div class="card-img">
				<div class="card-img__item" style="background-image: url('${item.imageUrl}')"></div>
			</div>
			<div class="card-content">
					<h3 class="card-content__title title-3">${item.name}</h3>
					<p class="card-content__text">${item.description}</p>
					<p class="card-content__price title-3">$${item.price}</p>
			</div>
		</div>

    `
      }});

      // arrCoverContent[i].style.backgroundImage =`url(${fotoUrl})`


    // data.map((item) => { if (item.category === category) out += item.name + '\n'});
    // data.map((item) => { if (item.category === category) console.log(item.name)});
    cardContainer.innerHTML = out;

    elementsDataCategory.forEach(el => {
      if (el === element) {
        el.classList.add('tab-item--active');
      } else {
        el.classList.remove('tab-item--active');
      }
    });
  });
});


/******************************************************** */
/*** Работа с файлом products.json ****** */

// fetch('./js/products.json')
//   .then(response => response.json())
//   .then(data => {
//     data.forEach(item => console.log(item.name))
//     // console.log(data[0].name); // Выводим значение свойства "name" первого объекта в массиве
// });

// fetch('./js/products.json')
//     .then(response => response.json())
//     .then(data => {
//       data.forEach(item => console.log(item.description))
//       // console.log(data);
//     })
//     .catch(error => {
//         console.error('Ошибка загрузки данных:', error);
//     });

// Или
/***************************************************** */

// async function fetchData() {
//   try {
//     const response = await fetch('./js/products.json');
//     const data = await response.json();
//     // console.log(data);
//     // data.forEach(item => console.log(item.price))
//     // data.forEach(item => console.log(item.name, item.description))
//     // data.forEach(item => console.log(item.name))
//     // data.forEach(item => console.log(item.description))
//     data.forEach(item => data.forEach(item => console.log(item.name + '\n' + item.description)));

//   } catch (error) {
//     console.error('Ошибка загрузки данных:', error);
//   }
// }

// // Вызываю функцию для выполнения загрузки данных
// fetchData();


/********************************************* */




