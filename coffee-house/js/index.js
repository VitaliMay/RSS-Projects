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
import arrInfo from "./respInfo.js";

console.log(arrInfo[0])


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




