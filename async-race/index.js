const score = `Привет. Работа кривая и недоделанная(
  Сорри, за потраченное время`
console.log(score)

const body = document.querySelector('body')

let idGenerator; // объявляю переменную для установления id в глобальной области видимости, 
//                 чтобы в нее нормально пришло значение из handleFetchStartData()

const carObj = {} // надо сделать объект объектов по id
let carObjAdd = {} // объект для create машинки
let carObjDelete = {} // объект для delete машинки

const carMark = ['Toyota','Reno', 'Pegeot', 'BMW', 'Audi', 'Ford',  'Geely',' Haval','Honda', 'Hyundai', 'Kia','Lada', 'Mazda', 'Mersedes']
const carModel = ['Bombel', 'CRV', 'G8', 'Kalina', 'Daster',  'Rash','5','3', '9', 'TT','Scope', 'A5', 'CLK']

function generateCarName () {
  const carMarkIndex = Math.floor(Math.random() * (carMark.length));
  const carModelIndex = Math.floor(Math.random() * (carModel.length));
  const carName = `${carMark[carMarkIndex]} ${carModel[carModelIndex]}`
  return carName
}

function newElement (tegEl = 'div', classEl = 'carBlock', appendTo = body, addTextContent = '') {
  const nameEl = document.createElement(tegEl);
  nameEl.classList.add(`${classEl}`);
  appendTo.appendChild(nameEl);
  nameEl.textContent = addTextContent;
  return nameEl
}

const buttomBlock = newElement('div', 'buttomBlock')

const changeCarButtomBlock = newElement('div', 'changeCarButtomBlock', buttomBlock)
const addCarButtom = newElement('buttom', 'createCarButtom', changeCarButtomBlock, 'create Car')
const add100CarsButtom = newElement('buttom', 'create100CarsButton', changeCarButtomBlock, 'create 100 Cars')

const generalCarsButtomBlock = newElement('div', 'changeCarButtomBlock', buttomBlock)
const startRaceButtom = newElement('buttom', 'allCarsStartButton', generalCarsButtomBlock, 'Start Race')
const resetRaceButtom = newElement('buttom', 'allCarsStopButton', generalCarsButtomBlock, 'Reset Race')

// addCarButtom.addEventListener('click', carBlockItem) // отказывается присваивать id блоку

addCarButtom.addEventListener('click', () => {  // а так сработало
  const newId = idGenerator();
  carBlockItem(newId);
  sendPostRequestAddCar(carObjAdd);  // добавить на сервер
  // console.log(JSON.stringify(carObjAdd))
});

/********************************************************************************************************************* */
/********************************************************************************************************************* */
/**************************************** */

async function fetchStartData() {  // Получение первых данных
  try {
    const response = await fetch('http://127.0.0.1:3000/garage', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Error occurred!');
    }
    const data = await response.json();
    let carStartObj = {};
    data.forEach(item => {
      carStartObj[item.id] = item;
    });
    // console.log(`${JSON.stringify(carStartObj)}`)
    return carStartObj;
  } catch (error) {
    console.log(error);
  }
}

async function handleFetchStartData() {
  const startGarageData = await fetchStartData();

  // Нахожу максимальный ключ объекта startGarageData
  // console.log(JSON.stringify(startGarageData))
  const maxKey = Math.max(...Object.keys(startGarageData));
  // console.log(maxKey)
  // Передаю полученное значение в функцию idCounter
  idGenerator = idCounter(maxKey);

  Object.keys(startGarageData).forEach((item) => {
    carBlockItemAsync(item, startGarageData)
  })
}

handleFetchStartData()

/********************************************************************************************************************* */
/********************************************************************************************************************* */

async function fetchVelocity(id) {  // Получение скорости и дистанции данных
  try {
    const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error('Error occurred!');
    }
    const dataVelocityObj = await response.json();
    // console.log(`${JSON.stringify(dataVelocityObj)}`)
    return dataVelocityObj;
  } catch (error) {
    console.log(error);
  }
}

/********************************************************************************************************************* */
/********************************************************************************************************************* */
//  Добавляю машинку на сервер. Функция для отправки POST-запроса

async function sendPostRequestAddCar(data) {
  const url = 'http://127.0.0.1:3000/garage';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    // console.log(responseData); // смотрю что отправляю
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

/********************************************************************************************************************* */
/********************************************************************************************************************* */

async function sendDeleteRequest(id) {
  const url = `http://127.0.0.1:3000/garage/${id}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    // console.log(responseData); // обрабатываем данные ответа по необходимости
  } catch (error) {
    console.error('Произошла проблема с выполнением запроса:', error);
  }
}

/********************************************************************************************************************* */
/********************************************************************************************************************* */

function idCounter(maxKeyValue) {
  let counter = maxKeyValue || 0; // Начальное значение с максимальным ключом (беру из fetch начальной загрузки) или 0
  return () => {
    counter += 1;
    return counter;
  };
}


/*************************************************** */

function carBlockItem(startId) {  //  переписать функцию
  const newCarBlock = newElement('div', 'newCarBlock', body)
  /*** */
  newCarBlock.id = startId;
  const carName = generateCarName()
  /*** */
  const newCarBlock__topDiv = newElement('div', 'newCarBlock__topDiv',newCarBlock)
  const newCarBlock__topDivItem01 = newElement('div', 'addCarButtom', newCarBlock__topDiv, 'Update color this car')
  const newCarBlock__topDivItem02 = newElement('div', 'addCarButtom', newCarBlock__topDiv, 'Update this car model')
  const newCarBlock__topDivItem03 = newElement('div', 'deleteCarButtom', newCarBlock__topDiv, 'Delete Car')
  const newCarBlock__topDivItem04 = newElement('div', 'addCarButtom-model', newCarBlock__topDiv, carName)
  // const newCarBlock__topDivItem04 = newElement('div', 'addCarButtom-model', newCarBlock__topDiv, 'Car Model')
  /*** */
  const newCarBlock__lowDiv = newElement('div', 'newCarBlock__lowDiv',newCarBlock)
  const engineButtomBlock = newElement('div', 'engineButtomBlock', newCarBlock__lowDiv)
  const driveButtom = newElement('div', 'engineButtomDrive', engineButtomBlock, 'A')
  const stopButtom = newElement('div', 'engineButtomStop', engineButtomBlock, 'B')
  const trackBlock = newElement('div', 'trackBlock', newCarBlock__lowDiv)

      /********************************************************************************** */
      // с этому надо вернуться
  const imageElement = newElement('img', 'trackBlock__carImg', trackBlock)

  imageElement.src = './vehicle-01.svg';  // лучше сразу вставить SVG
  imageElement.alt = `Vehicle model`;

  const randomColor = Math.random() * 360
  imageElement.style.filter = `hue-rotate(${randomColor}deg)`;  // цвет вынести в отдельную функцию
      /*********************************************************************************** */

  carObj[startId] = {
    name: carName,
    color: `#${Math.floor(Math.random()*1000000)}`,
    id: startId,
    isAnimationRunning: false,
    currentTranslate: 0,
    carDivs: trackBlock,
    carImages: imageElement
  };

  carObjAdd = { // для добавления на сервер
    id: carObj[startId].id,
    name: carObj[startId].name,
    color: carObj[startId].color
  }
  // console.log(`${JSON.stringify(carObj)}`)
}

function carBlockItemAsync(startId, startGarageData) {  //  переписать функцию
  const newCarBlock = newElement('div', 'newCarBlock', body)
  /*** */
  newCarBlock.id = startId;
  /*** */
  const newCarBlock__topDiv = newElement('div', 'newCarBlock__topDiv',newCarBlock)
  const newCarBlock__topDivItem01 = newElement('div', 'addCarButtom', newCarBlock__topDiv, 'Update color this car')
  const newCarBlock__topDivItem02 = newElement('div', 'addCarButtom', newCarBlock__topDiv, 'Update this car model')
  const newCarBlock__topDivItem03 = newElement('div', 'deleteCarButtom', newCarBlock__topDiv, 'Delete Car')
  const newCarBlock__topDivItem04 = newElement('div', 'addCarButtom-model', newCarBlock__topDiv, `${startGarageData[startId].name}`)
  // const newCarBlock__topDivItem04 = newElement('div', 'addCarButtom-model', newCarBlock__topDiv, 'Car Model')
  /*** */
  const newCarBlock__lowDiv = newElement('div', 'newCarBlock__lowDiv',newCarBlock)
  const engineButtomBlock = newElement('div', 'engineButtomBlock', newCarBlock__lowDiv)
  const driveButtom = newElement('div', 'engineButtomDrive', engineButtomBlock, 'A')
  const stopButtom = newElement('div', 'engineButtomStop', engineButtomBlock, 'B')
  const trackBlock = newElement('div', 'trackBlock', newCarBlock__lowDiv)

      /********************************************************************************** */
      // с этому надо вернуться
  const imageElement = newElement('img', 'trackBlock__carImg', trackBlock)

  imageElement.src = './vehicle-01.svg';  // лучше сразу вставить SVG
  imageElement.alt = `Vehicle model`;

  const randomColor = Math.random() * 360
  imageElement.style.filter = `hue-rotate(${randomColor}deg)`;  // цвет вынести в отдельную функцию
      /*********************************************************************************** */

  carObj[startId] = {
    name: startGarageData[startId].name,
    color: startGarageData[startId].color,
    id: startId, 
    isAnimationRunning: false, 
    currentTranslate: 0, 
    carDivs: trackBlock, 
    carImages: imageElement
  };

  // console.log(`${JSON.stringify(carObj)}`)
}

/************************************************************************* */
// Игры с цветом 

// const slider = document.querySelector('.color-slider');
// const preview = document.querySelector('.color-preview');

// slider.addEventListener('input', function() {
//     const hueValue = this.value;
//     preview.style.filter = `hue-rotate(${hueValue}deg)`;
//     imageElement.style.filter = `hue-rotate(${hueValue}deg)`;
// });
/************************************************************************* */

// Расчёт скорости (буду получать с сервера)
// const velocity = 50
// const distance = 500000

function speedTest(velocity, distance, maxPadding) {
  const timeRace = distance / velocity;
  const coefficient = 100/4   
  return maxPadding/timeRace * coefficient
}

body.addEventListener('click', function(event) { // работа с кнопками, надо разобрать на отдельные функции

  if (event.target.closest('.deleteCarButtom')) { // удаляю машинку
    const newCarBlock = event.target.closest('.newCarBlock'); // Находим соответствующий блок машинки
    const id = newCarBlock.id
    // console.log(carObj)
    newCarBlock.remove(); // удаление из разметки

    delete carObj[id]; // удаление из массива машинок
    // console.log(carObj)

    sendDeleteRequest(id) // удаление с сайта
  }

  if (event.target.closest('.engineButtomDrive')) { // запускаю машинку
    const newCarBlock = event.target.closest('.newCarBlock'); // Находим соответствующий блок машинки
    const id = newCarBlock.id
    drive(carObj[id].carDivs, carObj[id].carImages, id); // Запускаем анимацию для соответствующей машинки
  }

  if (event.target.closest('.engineButtomStop')) {  // останавливаю-возвращаю машинку
    const newCarBlock = event.target.closest('.newCarBlock'); // Находим соответствующий блок машинки
    const id = newCarBlock.id
    carObj[id].isAnimationRunning = false; // Останавливаем анимацию для соответствующей машинки
    carObj[id].currentTranslate = 0 ;
    // возвращяю машинку, если она уже доехала и перестала обращаться к объекту
    newCarBlock.querySelector('.trackBlock__carImg').style.transform = `translate(${carObj[id].currentTranslate}px, -11px)`;
  }

  if (event.target.closest('.allCarsStartButton')) { // запускаю все машинки
    for (id in carObj) {
      drive(carObj[id].carDivs, carObj[id].carImages, id)
    }
  }

  if (event.target.closest('.allCarsStopButton')) { // останавливаю все машинки
    for (id in carObj) {

      carObj[id].isAnimationRunning = false; // Останавливаем анимацию для соответствующей машинки
      carObj[id].currentTranslate = 0;
      carObj[id].carImages.style.transform = `translate(${carObj[id].currentTranslate}px, -11px)`;
    }
  }
});

async function driveAnimation(newDiv, imageElement, id, velocity, distance) {
  try {
  let currentTranslate = carObj[id].currentTranslate; // Текущее значение отступа;
  const maxTranslate = parseInt(newDiv.offsetWidth) - parseInt(imageElement.naturalWidth + 5); // Максимальное значение отступа

  if (currentTranslate >= maxTranslate) {
    currentTranslate = 0
  }

  const translateIncrement = speedTest(velocity, distance, maxTranslate)  // шаг анимации, он же скорость движения машинки на экране
  

  currentTranslate += translateIncrement; 
  imageElement.style.transform = `translate(${currentTranslate}px, -11px)`;

  carObj[id].currentTranslate = currentTranslate; // сохранить измененное значение паддинга в объект

  if (currentTranslate < maxTranslate && carObj[id].isAnimationRunning) {
    requestAnimationFrame(() => driveAnimation(newDiv, imageElement, id, velocity, distance))
  } else {
    carObj[id].isAnimationRunning = false; // Сброс флага после завершения анимации
  }
} catch (error) {
  console.log(error);
  // Обработка ошибки
}
}

async function drive(newDiv, imageElement, id) {
  if (!carObj[id].isAnimationRunning) { // Проверка, запущена ли анимация для данной машинки
    carObj[id].isAnimationRunning = true; // Устанавливаю флаг запуска анимации

    const dataVelocityObj = await fetchVelocity(id) // получаю данные о скорости с сервера

    driveAnimation(newDiv, imageElement, id, dataVelocityObj.velocity, dataVelocityObj.distance); // Запускаем анимацию
  }
}


