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
const modalText = modal.querySelector('.modal-content__text');

const modalBtnArraySize = [...modal.querySelectorAll('[data-sizes]')];
const modalBtnArrayAdditives = [...modal.querySelectorAll('[data-additives]')];

const modalBtnText = [...modal.querySelectorAll('.tab-item_text')];
const modalTotalPrice = modal.querySelector('.modal-total__price');
const modalCloseBtn = modal.querySelector('.modal-btn-close');

let priceTotal = 0;
let priceBase = 0;
let priceSize = 0;
let priceAdditives = 0;


// загрузка карточек кофе (первая загрузка страницы)
let category = 'coffee'
createCard(category);

/******Ловлю карточки************************* */

/******************************************************* */
/******************************************************* */
let cardArray = [...document.querySelectorAll('.card')];

// cardArray.forEach(item => {
//   item.addEventListener('click', function() {
//     const titleContent = item.querySelector('.card-content__title').textContent;
//     const index = data.findIndex(item => item.name === titleContent);

//     modalTitle.innerHTML = data[index].name;
//     modalText.innerHTML = data[index].description;
//     modalImg.style.backgroundImage = `url(${data[index].imageUrl})`

//     modalBtnText[0].innerHTML = data[index].sizes.s.size;
//     modalBtnText[1].innerHTML = data[index].sizes.m.size;
//     modalBtnText[2].innerHTML = data[index].sizes.l.size;
//     modalBtnText[3].innerHTML = data[index].additives[0].name;
//     modalBtnText[4].innerHTML = data[index].additives[1].name;
//     modalBtnText[5].innerHTML = data[index].additives[2].name;

//     priceBase = Number(data[index].price);
//     priceTotal = priceBase;
//     modalTotalPrice.textContent = `$${priceTotal.toFixed(2)}`;

//     modalOpen()

//     let priceSize = 0;
//     let priceAdditives = 0;

//     modalBtnArraySize.forEach(btn => {
//       btn.addEventListener('click', function() {
//         if (btn.classList.contains('tab-item--active')) {return;}
//         else {
//           modalBtnArraySize.forEach(otherBtn => {
//             if (otherBtn !== btn) {
//               otherBtn.classList.remove('tab-item--active');
//             }
//           });

//           btn.classList.add('tab-item--active')
//           const sizeBtn = btn.getAttribute('data-sizes')
//           priceSize =  Number(data[index].sizes[sizeBtn]["add-price"])
//           priceTotal = priceBase + priceSize + priceAdditives;

//           modalTotalPrice.textContent = `$${priceTotal.toFixed(2)}`;

//         }
//       })
//     })


//     modalBtnArrayAdditives.forEach(btn => {
//       btn.addEventListener('click', function() {
//         btn.classList.toggle('tab-item--active');
//         btn.classList.toggle('tab-item--modal');

//         let priceAdditives = 0;

//         modalBtnArrayAdditives.forEach((otherBtn, i) => {
//           if (otherBtn.classList.contains('tab-item--active')) {
//             priceAdditives += Number(data[index].additives[i]["add-price"]);
//           }
//         });

//         priceTotal = priceBase + priceSize + priceAdditives;
//         modalTotalPrice.textContent = `$${priceTotal.toFixed(2)}`;
//       });
//     });

//     // modalBtnArrayAdditives.forEach(btn => {
//     //   btn.addEventListener('click', function() {

//     //     // logicAdditives(btn)
//     //     console.log(btn)
//     //     // console.log(`добавки Прайс = ${priceAdditives}`)
//     //     if (btn.classList.contains('tab-item--active')) {
//     //       btn.classList.remove('tab-item--active');
//     //     }
//     //     else {
//     //       btn.classList.add('tab-item--active');
//     //     }
//     //     // btn.classList.toggle('tab-item--active');
//     //     btn.classList.toggle('tab-item--modal');

//     //     priceAdditives = 0;

//     //     for (let i = 0; i < modalBtnArrayAdditives.length; i += 1) {
//     //       if (modalBtnArrayAdditives[i].classList.contains('tab-item--active')) {
//     //         priceAdditives += Number(data[index].additives[i]["add-price"]);
//     //       }
//     //     }

//     //     priceTotal = priceBase + priceSize + priceAdditives;

//     //     modalTotalPrice.textContent = `$${priceTotal.toFixed(2)}`;

//     //   })
//     // })

//   })
// })

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

cardContainer.addEventListener('click', handleCardClick)

function handleCardClick (event) {
  console.log(event.target)
  // console.log(event.target.closest('.card'))
  // console.log(event.target.parentElement.closest('.card'))
  // const card = event.target.closest('.card') || event.target.parentElement.closest('.card');
  const card = event.target.closest('.card');
  if (card) {
    const titleContent = card.querySelector('.card-content__title').textContent;
    // console.log(`Ищу ${titleContent}`)
    const index = data.findIndex(item => item.name === titleContent);
    // console.log(`Index ${titleContent} = ${index} `)

    priceAdditives = 0;
    priceSize = 0
    modalContent(index)
    modalOpen()

    // // Добавляем класс "clicked" к родительскому контейнеру
    // card.parentNode.classList.add('clicked');

    // // Удаляем класс "clicked" при отмене активации элемента
    // card.addEventListener('mouseleave', () => {
    //   card.parentNode.classList.remove('clicked');
    // });

  }
}

function modalContent (index) {
  modalTitle.innerHTML = data[index].name;
  modalText.innerHTML = data[index].description;
  modalImg.style.backgroundImage = `url(${data[index].imageUrl})`

  modalBtnText[0].innerHTML = data[index].sizes.s.size;
  modalBtnText[1].innerHTML = data[index].sizes.m.size;
  modalBtnText[2].innerHTML = data[index].sizes.l.size;
  modalBtnText[3].innerHTML = data[index].additives[0].name;
  modalBtnText[4].innerHTML = data[index].additives[1].name;
  modalBtnText[5].innerHTML = data[index].additives[2].name;

  priceBase = Number(data[index].price);
  priceTotal = priceBase;
  modalTotalPrice.textContent = `$${priceTotal.toFixed(2)}`;

}

modal.addEventListener('click', handleModalButtonClick)

function handleModalButtonClick (event) {
  const btnSize = event.target.closest('.tab-item[data-sizes]');
  const btnAdditiv = event.target.closest('.tab-item[data-additives]');

  const btnClose = event.target.closest('.modal-btn-close');

  const titleContent = modalTitle.textContent;
  const index = data.findIndex(item => item.name === titleContent);
  // console.log(`Index ${titleContent} = ${index} `)

  // console.log(`In размер = ${priceSize}`);
  // console.log(`In добавки = ${priceAdditives}`);
  // console.log(`In база = ${priceBase}`);
  // console.log(`In Итого = ${priceTotal}`);

  if (btnSize) {
    // console.log(`Привет Size`)
    logicSizes (btnSize, index)
  }
  if (btnAdditiv) {
    // console.log(`Привет добавка`)
    logicAdditives (btnAdditiv, index)
  }
  if (btnClose) {
    closeMenu()
  }

  priceTotal = priceBase + priceSize + priceAdditives;
  modalTotalPrice.textContent = `$${priceTotal.toFixed(2)}`;

  // console.log(`Out размер = ${priceSize}`);
  // console.log(`Out добавки = ${priceAdditives}`);
  // console.log(`Out база = ${priceBase}`);
  // console.log(`Out Итого = ${priceTotal}`);
}

function logicSizes (btnSize, index) {
  if (btnSize.classList.contains('tab-item--active')) {return;}
  else {
    modalBtnArraySize.forEach(otherBtn => {
      if (otherBtn !== btnSize) {
        otherBtn.classList.remove('tab-item--active');
      }
    });
    btnSize.classList.add('tab-item--active')
    const sizeBtn = btnSize.getAttribute('data-sizes')
    priceSize =  Number(data[index].sizes[sizeBtn]["add-price"])

  }
  // return priceSize
}

function logicAdditives (btnAdditiv, index) {
  // btnAdditiv.classList.toggle('tab-item--modal'); // иногда глючит. Добавил в HTML
  btnAdditiv.classList.toggle('tab-item--active');

  priceAdditives = 0;
  modalBtnArrayAdditives.forEach((otherBtn, i) => {
    if (otherBtn.classList.contains('tab-item--active')) {
      priceAdditives += Number(data[index].additives[i]["add-price"]);
    }
  });

  // return priceAdditives
}

/////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////

// let cardArray = [...document.querySelectorAll('.card')];

// function handleProductClick(event) {
//   const card = event.currentTarget;
//   const titleContent = card.querySelector('.card-content__title').textContent;
//   const index = data.findIndex(item => item.name === titleContent);
//   const priceBase = Number(data[index].price);
//   let priceTotal = priceBase;
//   let priceSize = 0;
//   let priceAdditives = 0;

//   modalTitle.innerHTML = data[index].name;
//   modalText.innerHTML = data[index].description;
//   modalImg.style.backgroundImage = `url(${data[index].imageUrl})`;
//   modalBtnText[0].innerHTML = data[index].sizes.s.size;
//   modalBtnText[1].innerHTML = data[index].sizes.m.size;
//   modalBtnText[2].innerHTML = data[index].sizes.l.size;
//   modalBtnText[3].innerHTML = data[index].additives[0].name;
//   modalBtnText[4].innerHTML = data[index].additives[1].name;
//   modalBtnText[5].innerHTML = data[index].additives[2].name;
//   modalTotalPrice.textContent = `$${priceTotal.toFixed(2)}`;

//   modalOpen();


//   modalBtnArraySize.forEach(btn => {
//     btn.removeEventListener('click', handleSizeClick); // Удаление слушателя перед добавлением нового
//     btn.addEventListener('click', handleSizeClick);
//   });

//   modalBtnArrayAdditives.forEach(btn => {
//     btn.removeEventListener('click', handleAdditiveClick); // Удаление слушателя перед добавлением нового
//     btn.addEventListener('click', handleAdditiveClick);
//   });

//   function handleSizeClick() {
//     console.log(this);
//     if (this.classList.contains('tab-item--active')) {
//       return;
//     }
//     modalBtnArraySize.forEach(otherBtn => {
//       if (otherBtn !== this) {
//         otherBtn.classList.remove('tab-item--active');
//       }
//     });
//     this.classList.add('tab-item--active');
//     const sizeBtn = this.getAttribute('data-sizes');
//     priceSize = Number(data[index].sizes[sizeBtn]["add-price"]);
//     priceTotal = priceBase + priceSize + priceAdditives;
//     modalTotalPrice.textContent = `$${priceTotal.toFixed(2)}`;

//   }

//   // function handleAdditiveClick() {
//   //   console.log(this)
//   //   if (this.classList.contains('tab-item--active')) {
//   //     this.classList.remove('tab-item--active');
//   //   } else {
//   //     this.classList.add('tab-item--active');
//   //   }
//   //   this.classList.toggle('tab-item--modal');
//   //   priceAdditives = 0;
//   //   modalBtnArrayAdditives.forEach(addBtn => {
//   //     if (addBtn.classList.contains('tab-item--active')) {
//   //       const index = Array.from(addBtn.parentNode.children).indexOf(addBtn);
//   //       priceAdditives += Number(data[index].additives[index]["add-price"]);
//   //     }
//   //   });
//   //   priceTotal = priceBase + priceSize + priceAdditives;
//   //   modalTotalPrice.textContent = `$${priceTotal.toFixed(2)}`;
//   // }

//   function handleAdditiveClick() {
//     console.log(this);
//     if (this.classList.contains('tab-item--active')) {
//       this.classList.remove('tab-item--active');
//     } else {
//       this.classList.add('tab-item--active');
//     }
//     this.classList.toggle('tab-item--modal');
//     priceAdditives = 0;
//     modalBtnArrayAdditives.forEach(addBtn => {
//       if (addBtn.classList.contains('tab-item--active')) {
//         const addIndex = Array.from(addBtn.parentNode.children).indexOf(addBtn); // используем addIndex вместо index
//         priceAdditives += Number(data[index].additives[addIndex]["add-price"]); // используем addIndex вместо index
//       }
//     });
//     priceTotal = priceBase + priceSize + priceAdditives;
//     modalTotalPrice.textContent = `$${priceTotal.toFixed(2)}`;


//     // Разумное зерно
//     // this.removeEventListener('click', handleAdditiveClick);
//   }
// }

// // Добавление слушателя для каждого элемента cardArray
// cardArray.forEach(item => {
//   item.removeEventListener('click', handleProductClick); // Удаление слушателя перед добавлением нового
//   item.addEventListener('click', handleProductClick);
// });


// // cardArray.forEach(item => {
// //   item.removeEventListener('click', handleProductClick);
// //   item.removeEventListener('click', handleSizeClick);
// //   item.removeEventListener('click', handleAdditiveClick);

// //   item.addEventListener('click', handleProductClick);
// // }); 


/////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////

// function handleProductClick(event) {
//   const card = event.currentTarget;
//   const titleContent = card.querySelector('.card-content__title').textContent;
//   const index = data.findIndex(item => item.name === titleContent);
//   const priceBase = Number(data[index].price);
//   let priceTotal = priceBase;
//   let priceSize = 0;
//   let priceAdditives = 0;

//   modalTitle.innerHTML = data[index].name;
//   modalText.innerHTML = data[index].description;
//   modalImg.style.backgroundImage = `url(${data[index].imageUrl})`;
//   modalBtnText[0].innerHTML = data[index].sizes.s.size;
//   modalBtnText[1].innerHTML = data[index].sizes.m.size;
//   modalBtnText[2].innerHTML = data[index].sizes.l.size;
//   modalBtnText[3].innerHTML = data[index].additives[0].name;
//   modalBtnText[4].innerHTML = data[index].additives[1].name;
//   modalBtnText[5].innerHTML = data[index].additives[2].name;
//   modalTotalPrice.textContent = `$${priceTotal.toFixed(2)}`;

//   modalOpen();

//   modalBtnArraySize.forEach(btn => {
//     btn.removeEventListener('click', handleSizeClick);
//     btn.addEventListener('click', handleSizeClick);
//   });

//   modalBtnArrayAdditives.forEach(btn => {
//     btn.removeEventListener('click', handleAdditiveClick);
//     btn.addEventListener('click', handleAdditiveClick);
//   });

//   function handleSizeClick() {
//     if (this.classList.contains('tab-item--active')) {
//       return;
//     }
//     modalBtnArraySize.forEach(otherBtn => {
//       if (otherBtn !== this) {
//         otherBtn.classList.remove('tab-item--active');
//       }
//     });
//     this.classList.add('tab-item--active');
//     const sizeBtn = this.getAttribute('data-sizes');
//     priceSize = Number(data[index].sizes[sizeBtn]["add-price"]);
//     priceTotal = priceBase + priceSize + priceAdditives;
//     modalTotalPrice.textContent = `$${priceTotal.toFixed(2)}`;

//   }

//   function handleAdditiveClick() {
//     if (this.classList.contains('tab-item--active')) {
//       this.classList.remove('tab-item--active');
//     } else {
//       this.classList.add('tab-item--active');
//     }
//     this.classList.toggle('tab-item--modal');
//     priceAdditives = 0;
//     modalBtnArrayAdditives.forEach(addBtn => {
//       if (addBtn.classList.contains('tab-item--active')) {
//         const addIndex = Array.from(addBtn.parentNode.children).indexOf(addBtn);
//         priceAdditives += Number(data[index].additives[addIndex]["add-price"]);
//       }
//     });
//     priceTotal = priceBase + priceSize + priceAdditives;
//     modalTotalPrice.textContent = `$${priceTotal.toFixed(2)}`;
//   }
// }

// // Обработчик для всех элементов .card
// function handleCardClick(event) {
//   const card = event.target.closest('.card');
//   if (!card) {
//     return;
//   }
//   handleProductClick(card);
// }

// // Добавление одного слушателя для всех элементов .card
// document.addEventListener('click', handleCardClick);



/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////




// function handleAdditiveClick() {

//   modalBtnArrayAdditives.forEach(btn => {
//     btn.addEventListener('click', function() {
//       btn.classList.toggle('tab-item--active');
//       btn.classList.toggle('tab-item--modal');
  
//       let priceAdditives = 0;
  
//       modalBtnArrayAdditives.forEach((otherBtn, i) => {
//         if (otherBtn.classList.contains('tab-item--active')) {
//           priceAdditives += Number(data[index].additives[i]["add-price"]);
//         }
//       });
  
//       priceTotal = priceBase + priceSize + priceAdditives;
//       modalTotalPrice.textContent = `$${priceTotal.toFixed(2)}`;
//     });
//   });

// }

// function logicAdditives(btn) {
//   console.log(btn)
//   if (btn.classList.contains('tab-item--active')) {
//     btn.classList.remove('tab-item--active');
//   }
//   else {
//     btn.classList.add('tab-item--active');
//   }
//   btn.classList.toggle('tab-item--modal');

//   let priceAdditives = 0;

//   for (let i = 0; i < modalBtnArrayAdditives.length; i += 1) {
//     if (modalBtnArrayAdditives[i].classList.contains('tab-item--active')) {
//       priceAdditives += Number(data[index].additives[i]["add-price"]);
//     }
//   }

//   priceTotal = priceBase + priceSize + priceAdditives;

//   modalTotalPrice.textContent = `$${priceTotal.toFixed(2)}`;

  
// }


/************************************* */

// modalBtnArray.forEach(btn => {
//   btn.addEventListener('click', function() {
//     console.log(btn)
//   })


// modalBtnArraySize.forEach(btn => {
//   btn.addEventListener('click', function() {
//     console.log(btn)
//     // priceTotal 
//   })

// })
/*********************************** */

// modalCloseBtn.addEventListener('click', closeMenu)

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
    // cardArray = [...document.querySelectorAll('.card')]
    // console.log(cardArray);

    // cardArray.forEach(item => {
    //   item.addEventListener('click', function() {
    //     const titleContent = item.querySelector('.card-content__title').textContent;
    //     console.log(titleContent)
    //     // console.log('Data index', data.map(el => el.name.indexOf(titleContent)))
    //     const index = data.findIndex(item => item.name === titleContent);
    //     console.log(`index = ${index}`)

    //     fon.classList.add('work');
    //   })
    // })
/**************************************** */
  });
});


/**************************************************** */

// cardArray.forEach(item => {
//   item.addEventListener('click', function() {
//     const titleContent = item.querySelector('.card-content__title').textContent;
//     console.log(titleContent)

//     fon.classList.add('work');
//   })
// })

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


// let myVariable = "Hello!";
// export { myVariable };

