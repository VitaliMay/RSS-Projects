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
import data from "./products.js";

// const category = ['coffee', 'tea', 'dessert'];


const cardContainer = document.querySelector('.menu-offer__card-container');
const elementsDataCategory = [...document.querySelectorAll('[data-category]')];

const loadMore = document.querySelector('.slider-btn--menu-refresh');

const modal = document.querySelector('.modal');
const modalTitle = modal.querySelector('.modal-content__title');
const modalImg = modal.querySelector('.modal-img__item');
// const modalTitle = document.querySelector('.modal-content__title');
// const modalImg = document.querySelector('.modal-img__item');
const modalText = modal.querySelector('.modal-content__text');

const modalBtnArray = [...modal.querySelectorAll('.tab-item')];
const modalBtnText = [...modal.querySelectorAll('.tab-item_text')];
// console.log(modalBtnText);
const modalTotalPrice = modal.querySelector('.modal-total__price');
const modalCloseBtn = modal.querySelector('.modal-btn-close');



// загрузка карточек кофе
let category = 'coffee'
createCard(category);

/******Ловлю карточки************************* */
let cardArray = [...document.querySelectorAll('.card')];
console.log(cardArray);

cardArray.forEach(item => {
  item.addEventListener('click', function() {
    const titleContent = item.querySelector('.card-content__title').textContent;
    console.log(titleContent)
    // console.log('Data index', data.map(el => el.name.indexOf(titleContent)))
    const index = data.findIndex(item => item.name === titleContent);
    console.log(`index = ${index}`)

    modalTitle.innerHTML = data[index].name;
    modalText.innerHTML = data[index].description;
    modalImg.style.backgroundImage = `url(${data[index].imageUrl})`

    modalBtnText[0].innerHTML = data[index].sizes.s.size;
    modalBtnText[1].innerHTML = data[index].sizes.m.size;
    modalBtnText[2].innerHTML = data[index].sizes.l.size;
    modalBtnText[3].innerHTML = data[index].additives[0].name;
    modalBtnText[4].innerHTML = data[index].additives[1].name;
    modalBtnText[5].innerHTML = data[index].additives[0].name;
    // modalBtnText[5].innerHTML = data[index].additives[0]["name"];
    // modalBtnText[5].innerHTML = data[index].additives[2]["add-price"];
    modalTotalPrice.textContent = `$${data[index].price}`;



    // modalBtnText[4].innerHTML = data[index].additives.name.size;
    // data[0].additives[0].name

    // style="background-image: url('${item.imageUrl}
    // arrCoverContent[i].style.backgroundImage =`url(${fotoUrl})`

    // modal.classList.add('modal--active');

    // fon.classList.add('work');
    modalOpen()
  })
})

/************************************* */

modalBtnArray.forEach(btn => {
  btn.addEventListener('click', function() {
    console.log(btn)
    // console.log(data[index].)
  })

})
/*********************************** */

modalCloseBtn.addEventListener('click', closeMenu)

/********************************** */

elementsDataCategory.forEach(element => {
  element.addEventListener('click', function() {
    category = element.getAttribute('data-category')

    createCard(category);

    elementsDataCategory.forEach(el => {
      if (el === element) {
        el.classList.add('tab-item--active');
      } else {
        el.classList.remove('tab-item--active');
        hiddenMoreCard()
      }
    });

    if (category === 'tea') {
      loadMore.classList.add('close')
    };
/*********Ловлю карточки******************************* */
    cardArray = [...document.querySelectorAll('.card')]
    console.log(cardArray);

    cardArray.forEach(item => {
      item.addEventListener('click', function() {
        const titleContent = item.querySelector('.card-content__title').textContent;
        console.log(titleContent)
        // console.log('Data index', data.map(el => el.name.indexOf(titleContent)))
        const index = data.findIndex(item => item.name === titleContent);
        console.log(`index = ${index}`)

        fon.classList.add('work');
      })
    })
/**************************************** */
  });
});

// console.log(data[1].name)


/**************************************************** */

cardArray.forEach(item => {
  item.addEventListener('click', function() {
    const titleContent = item.querySelector('.card-content__title').textContent;
    console.log(titleContent)

    fon.classList.add('work');
  })
})

/**************************************************** */

loadMore.addEventListener('click', loadMoreCard);

function loadMoreCard() {
  console.log(`Кнопка рефреш`)
  cardContainer.classList.add('open')
  loadMore.classList.add('close')
}

function hiddenMoreCard() {
  cardContainer.classList.remove('open')
  loadMore.classList.remove('close')
}

/************************************************* */

function createCard (category) {
  cardContainer.innerHTML = '';
    let out = '';
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

    cardContainer.innerHTML = out;
}


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




