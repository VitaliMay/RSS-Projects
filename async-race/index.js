
import { svgStartInner, svgImgInner } from "./images/index-copy-10-02-Car.js";
import { generateCarName, hexaColor, idCounter } from "./app/generateCar.js";

const body = document.querySelector('body')

let idGenerator; // объявляю переменную для установления id в глобальной области видимости, 
//                 чтобы в нее нормально пришло значение из handleFetchStartData()

const carObj = {} // надо сделать объект объектов по id
let carObjAdd = {} // объект для create машинки
let carObjDelete = {} // объект для delete машинки

let totalCarsValue = 0;
let selectId = null

function newElement (tegEl = 'div', classEl = 'carBlock', appendTo = body, addTextContent = '') {
  const nameEl = document.createElement(tegEl);
  nameEl.classList.add(`${classEl}`);
  appendTo.appendChild(nameEl);
  nameEl.textContent = addTextContent;
  return nameEl
}
 /***************************************** */

const svgStart = newElement('div', 'svgStart')
svgStart.innerHTML = svgStartInner;

function addColorCar (svgImgInner, carColor, trackBlock, id) {
  const svgImg = newElement('div', 'trackBlock__carImg', trackBlock, '')
  svgImg.innerHTML = svgImgInner

  const svgImgCar = svgImg.querySelector('.svgImgCar')
  svgImgCar.setAttribute("fill", `${carColor}`)
  carObj[id].carImagesItem = svgImgCar // сохранить картинку для изменения цвета
  return svgImg
}

// addColorCar (svgStartInner, svgImgInner, hexaColor(), body)


/****************************************** */
const buttomBlock = newElement('div', 'buttomBlock')

const changeCarButtomBlock = newElement('div', 'changeCarButtomBlock', buttomBlock)
const addCarButtom = newElement('buttom', 'createCarButtom', changeCarButtomBlock, 'create Car')
const add100CarsButtom = newElement('buttom', 'create100CarsButton', changeCarButtomBlock, 'create 100 Cars')

const totalCars = newElement('div', 'create100CarsButton', changeCarButtomBlock, `Total`)

const generalCarsButtomBlock = newElement('div', 'changeCarButtomBlock', buttomBlock)
const startRaceButtom = newElement('buttom', 'allCarsStartButton', generalCarsButtomBlock, 'Start Race')
const resetRaceButtom = newElement('buttom', 'allCarsStopButton', generalCarsButtomBlock, 'Reset Race')

addCarButtom.addEventListener('click', () => {  // а так сработало
  const newId = idGenerator();
  carBlockItem(newId);
  sendPostRequestAddCar(carObjAdd);  // добавить на сервер
  // console.log(JSON.stringify(carObjAdd))
  // лучше вести количество машинок синхронно. Запросы не всегда успевают
  // fetchTotalCount() // Поменять число машинок на экране
  totalCarsValue += 1
  totalCars.textContent = `Total Cars ${totalCarsValue}` // Вывожу число машинок
});

add100CarsButtom.addEventListener('click', () => {  // а так сработало
  for (let i = 0; i < 100; i += 1){
    const newId = idGenerator();
    carBlockItem(newId);
    sendPostRequestAddCar(carObjAdd);  // добавить на сервер
  }
  // лучше вести количество машинок синхронно. Запросы не всегда успевают
  // fetchTotalCount() // Поменять число машинок на экране
  totalCarsValue += 100
  totalCars.textContent = `Total Cars ${totalCarsValue}` // Вывожу число машинок
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
// Количество машинок

async function fetchTotalCount() {
  try {
    const response = await fetch('http://127.0.0.1:3000/garage?_limit=7');
    const totalCount = response.headers.get('X-Total-Count'); // Получение значения из заголовка

    // console.log('Total Count:', totalCount);
    totalCars.textContent = `Total Cars ${totalCount}` // Вывожу число машинок
    totalCarsValue = Number(totalCount) // устанавливаю первоначальное значение. Дальше буду считать синхронно
    // return totalCount
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

fetchTotalCount()  // Первоначальное установление числа машинок. Дальше лучше вести синхронно. Запросы не успевают

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

async function fetchDriveStatus(id) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      const carImages = carObj[id].carImages
      carImages.style.transform = `translate(${carObj[id].currentTranslate}px, -11px) rotate(15deg)`

      // const svgImgCar = carObj[id].carImagesItem
      // svgImgCar.setAttribute("transform", `matrix(-1, -1, -1, 1, 0, 0)`)
      // svgImgCar.setAttribute("height", '40px')
      // svgImgCar.setAttribute("width", '40px')

      console.log(`Двигатель ${carObj[id].name} неожиданно вышел из строя`)
      // отправить запрос на остановку двигателя
      return false
    }
    const data = await response.json();
    // const driveStatus = await response.json();
    console.log(`${carObj[id].name} финиширует`)

    return data.success

  } catch (error) {
    console.log(`Статус ошибки ${error}`)
    return false;
  }
}

// для присвоения результата выполнения
async function resultFetchDriveStatus(id) {
  const result = await fetchDriveStatus(id); // Вызываем функцию и ждем результата
  // console.log('Результат выполнения fetchDriveStatus:', result);
  carObj[id].driveStatus = result
  if (result) {
    carObj[id].status = 'drive'
  } else {
    carObj[id].status = 'stop'
    // Переворачиваю машинку на старте
    // carImages.style.transform = `translate(${carObj[id].currentTranslate}px, -11px) rotate(15deg)`
  }
}
// async function resultFetchDriveStatus(id) {
//   const result = await fetchDriveStatus(id); // Вызываем функцию и ждем результата
//   // console.log('Результат выполнения fetchDriveStatus:', result);
//   carObj[id].driveStatus = result
// }


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

function carBlockItem(startId) {  //  переписать функцию
  const newCarBlock = newElement('div', 'newCarBlock', body)
  /*** */
  newCarBlock.id = startId;
  const carName = generateCarName()
  /*** */
  const newCarBlock__topDiv = newElement('div', 'newCarBlock__topDiv',newCarBlock)
  const newCarBlock__topDivItem01 = newElement('div', 'selectCarButtom', newCarBlock__topDiv, 'Select this car for update')
  const newCarBlock__topDivItem02 = newElement('div', 'addCarButtom', newCarBlock__topDiv, 'Update this car model')
  const newCarBlock__topDivItem03 = newElement('div', 'deleteCarButtom', newCarBlock__topDiv, 'Delete Car')
  const newCarBlock__topDivItem04 = newElement('div', 'addCarButtom-model', newCarBlock__topDiv, carName)
  /*** */
  const newCarBlock__lowDiv = newElement('div', 'newCarBlock__lowDiv',newCarBlock)
  const engineButtomBlock = newElement('div', 'engineButtomBlock', newCarBlock__lowDiv)
  const driveButtom = newElement('div', 'engineButtomDrive', engineButtomBlock, 'A')
  const stopButtom = newElement('div', 'engineButtomStop', engineButtomBlock, 'B')
  const trackBlock = newElement('div', 'trackBlock', newCarBlock__lowDiv)

 /********************************************************************************** */
 carObj[startId] = {
  name: carName,
  // color: carColor,
  // color: `#${Math.floor(Math.random()*1000000)}`,
  id: startId,
  isAnimationRunning: false,
  currentTranslate: 0,
  carDivs: trackBlock,
  // carImages: imageElement,
  carDriveButton: driveButtom,

  driveStatus: false,

  status: 'stop',
  };


 /********************************************************************************** */
      // с этому надо вернуться
  // const imageElement = newElement('img', 'trackBlock__carImg', trackBlock)
  // imageElement.src = './vehicle-01.svg';  // лучше сразу вставить SVG
  // imageElement.alt = `Vehicle model`;
  // const randomColor = Math.random() * 360
  // imageElement.style.filter = `hue-rotate(${randomColor}deg)`;  // цвет вынести в отдельную функцию

  const carColor = hexaColor();
  // addColorCar (svgImgInner, carColor, trackBlock)
  const imageElement = addColorCar (svgImgInner, carColor, trackBlock, startId)
  
  carObj[startId].carImages = imageElement // так как выше создаю объект и перезаписываю
  carObj[startId].color = carColor // так как выше создаю объект и перезаписываю
  
  // imageElement.style.transform = `translate(40px, -11px)`;
  // imageElement.style.transform = `translate(80px, -11px)`;
  // imageElement.style.marginLeft = `100px`;
  // trackBlock.style.paddingLeft = "120px"
  // const imageElement = trackBlock.querySelector('.trackBlock__carImg')
  console.log(imageElement)

  /*********************************************************************************** */

  // carObj[startId] = {
  //   name: carName,
  //   color: carColor,
  //   // color: `#${Math.floor(Math.random()*1000000)}`,
  //   id: startId,
  //   isAnimationRunning: false,
  //   currentTranslate: 0,
  //   carDivs: trackBlock,
  //   carImages: imageElement,
  //   carDriveButton: driveButtom,

  //   driveStatus: false,

  //   status: 'stop',
  // };

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
  // carObj[startId] = {
  //   name: startGarageData[startId].name,
  //   color: startGarageData[startId].color,
  //   id: startId, 
  //   isAnimationRunning: false, 
  //   currentTranslate: 0, 
  //   carDivs: trackBlock, 
  //   carImages: imageElement
  // };
  /*** */
  const newCarBlock__topDiv = newElement('div', 'newCarBlock__topDiv',newCarBlock)
  const newCarBlock__topDivItem01 = newElement('div', 'selectCarButtom', newCarBlock__topDiv, 'Update color this car')
  const newCarBlock__topDivItem02 = newElement('div', 'addCarButtom', newCarBlock__topDiv, 'Update this car model')
  const newCarBlock__topDivItem03 = newElement('div', 'deleteCarButtom', newCarBlock__topDiv, 'Delete Car')
  const newCarBlock__topDivItem04 = newElement('div', 'addCarButtom-model', newCarBlock__topDiv, `${startGarageData[startId].name}`)
  /*** */
  const newCarBlock__lowDiv = newElement('div', 'newCarBlock__lowDiv',newCarBlock)
  const engineButtomBlock = newElement('div', 'engineButtomBlock', newCarBlock__lowDiv)
  const driveButtom = newElement('div', 'engineButtomDrive', engineButtomBlock, 'A')
  const stopButtom = newElement('div', 'engineButtomStop', engineButtomBlock, 'B')
  const trackBlock = newElement('div', 'trackBlock', newCarBlock__lowDiv)
  
  /********************************************************************************** */
  carObj[startId] = {
    name: startGarageData[startId].name,
    color: startGarageData[startId].color,
    id: startId, 
    isAnimationRunning: false, 
    currentTranslate: 0, 
    carDivs: trackBlock, 
    // carImages: imageElement,
    carDriveButton: driveButtom,

    driveStatus: false,
    status: 'stop',    // start, drive
  };
  
  /********************************************************************************** */
      // с этому надо вернуться
  // const imageElement = newElement('img', 'trackBlock__carImg', trackBlock)

  // imageElement.src = './vehicle-01.svg';  // лучше сразу вставить SVG
  // imageElement.alt = `Vehicle model`;

  // const randomColor = Math.random() * 360
  // imageElement.style.filter = `hue-rotate(${randomColor}deg)`;  // цвет вынести в отдельную функцию
  const carColor = startGarageData[startId].color;
  const imageElement = addColorCar(svgImgInner, carColor, trackBlock, startId)
  // console.log(imageElement)

  carObj[startId].carImages = imageElement // так как выше создаю объект и перезаписываю
  
  /*********************************************************************************** */

  // carObj[startId] = {
  //   name: startGarageData[startId].name,
  //   color: startGarageData[startId].color,
  //   id: startId, 
  //   isAnimationRunning: false, 
  //   currentTranslate: 0, 
  //   carDivs: trackBlock, 
  //   carImages: imageElement,
  //   carDriveButton: driveButtom,

  //   driveStatus: false,
  //   status: 'stop',    // start, drive
  // };

  // console.log(`${JSON.stringify(carObj)}`)
}

/************************************************************************* */
// Игры с цветом 

// const slider = document.querySelector('.color-slider');
// const slider = document.querySelector('.color-changer');
// const preview = document.querySelector('.color-preview');

const formColorModel = newElement('form', 'formColorModel')
formColorModel.classList.add('inactive')
// formColorModel.setAttribute('action', 'http://127.0.0.1:3000/garage/10')
// formColorModel.setAttribute('metod', 'PUT')

const blockInputColor = newElement('div', 'blockInputColor', formColorModel)
const previewColorInput = newElement('input', 'color-changer', blockInputColor)
previewColorInput.setAttribute('type', 'color')
previewColorInput.setAttribute('name', 'color')

const previewCarDiv = newElement('button', 'previewCarDiv', formColorModel)
// const previewCarDiv = newElement('div', 'previewCarDiv', formColorModel)
// previewCarDiv.style.marginLeft = "300px"
previewCarDiv.innerHTML = svgImgInner
const previewCarImg = previewCarDiv.querySelector('.svgImgCar')
previewCarImg.setAttribute("width", `130px`)
previewCarImg.setAttribute("height", `130px`)
previewCarImg.setAttribute("fill", previewColorInput.value)
// previewCarImg.setAttribute("fill", `${slider.value}`)

const blockInputModel = newElement('div', 'blockInputModel', formColorModel)
const previewModelInput = newElement('input', 'model-changer', blockInputModel)
previewModelInput.setAttribute('type', 'text')
previewModelInput.setAttribute('name', 'name')

// slider.addEventListener('input', function() {
previewColorInput.addEventListener('input', function() {
    const hueValue = this.value;
    // preview.style.backgroundColor = hueValue;
    previewCarImg.setAttribute("fill", `${hueValue}`)
    // imageElement.style.filter = `hue-rotate(${hueValue}deg)`;
});
// slider.addEventListener('input', function() {
//     const hueValue = this.value;
//     preview.style.filter = `hue-rotate(${hueValue}deg)`;
//     imageElement.style.filter = `hue-rotate(${hueValue}deg)`;
// });

async function handleFormSubmit(event) {
  // Просим форму не отправлять данные самостоятельно
  event.preventDefault()
  console.log('Отправка!')
  // serializeForm(formColorModel)
  const data = serializeForm(event.target)
  const response = await sendData(data, selectId)

  // console.log(data.name)
  updateCarentCar(selectId, data)

  selectId = null
  formColorModel.classList.add('inactive')

  previewModelInput.value = ''
  previewColorInput.value = '#000000' // значение по умолчанию
  previewCarImg.setAttribute("fill", `${previewColorInput.value}`)

  // event.target.reset()  // очистить форму (не очень нравится как это делает)


}

function serializeForm(formNode) {
  const data = new FormData(formNode)
  // console.log(JSON.stringify(Object.assign({}, data)))
  console.log(Array.from(data.entries()))
  const dataArr = Array.from(data.entries())
  const result = {}
  dataArr.forEach((item) => result[item[0]] = item[1])
  console.log(result)
  console.log(JSON.stringify(result))
  return result
  // return data
}

// function cleanForm(formNode) {
//   const data = new FormData(formNode)
//   for (let key in data) {
//     data.key = ''
//   }
// }

async function sendData(data, id) {
  return await fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    // headers: { 'Content-Type': 'multipart/form-data' },
    body: JSON.stringify(data),
    // body: JSON.stringify({name: 'QWER', color: 'red'}),
  })
}

function updateCarentCar(id, data) {
  carObj[id].name = data.name
  carObj[id].color = data.color
  const carBlock = document.getElementById(id)
  // const svgImgCar = carBlock.querySelector('.svgImgCar')
  const svgImgCar = carObj[id].carImagesItem
  svgImgCar.setAttribute("fill", `${carObj[id].color}`)
  
  const carModel = carBlock.querySelector('.addCarButtom-model')
  carModel.textContent = carObj[id].name

}

// async function sendData(data) {
//   return await fetch('http://127.0.0.1:3000/garage/9', {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     // headers: { 'Content-Type': 'multipart/form-data' },
//     body: JSON.stringify(data),
//   })
// }

// function serializeForm(formNode) {
//   console.log(formNode.elements)

//   const { elements } = formNode
//   const data = new FormData()

//   Array.from(elements)
//     .filter((item) => !!item.name)
//     .forEach((element) => {
//       const { name, value } = element

//       data.append(name, value)
//     })

//   // console.log(JSON.stringify(data))
//   return data

//   // const data = Array.from(elements)
//   //   .filter((item) => !!item.name)
//   //   .map((element) => {
//   //     const { name, value } = element

//   //     return { name, value }
//   //   })

//   // console.log(data)
//   // Array.from(elements)
//   //   .forEach((element) => {
//   //     const { name, value } = element
//   //     console.log({ name, value })
//   //   })
// }
formColorModel.addEventListener('submit', handleFormSubmit)

/************************************************************************* */

function speedTest(velocity, distance, maxPadding) {
  const timeRace = distance / velocity;
  const coefficient = 100/8   // замедлил гонку, чтобы успевать обработать ответ сервера
  // const coefficient = 100/4   
  return maxPadding/timeRace * coefficient
}

/************************************************************************** */
/************************************************************************** */
// Управление

body.addEventListener('click', async function (event) { // работа с кнопками, надо разобрать на отдельные функции

  if (event.target.closest('.deleteCarButtom')) { // удаляю машинку
    const newCarBlock = event.target.closest('.newCarBlock'); // Находим соответствующий блок машинки
    const id = newCarBlock.id
    // console.log(carObj)
    newCarBlock.remove(); // удаление из разметки

    delete carObj[id]; // удаление из массива машинок
    // console.log(carObj)

    sendDeleteRequest(id) // удаление с сайта

    // лучше вести количество машинок синхронно. Запросы не всегда успевают
    // fetchTotalCount() // Поменять число машинок на экране
    totalCarsValue -= 1
    totalCars.textContent = `Total Cars ${totalCarsValue}` // Вывожу число машинок
  }

  if (event.target.closest('.selectCarButtom')) {
    const newCarBlock = event.target.closest('.newCarBlock'); // Находим соответствующий блок машинки
    const id = newCarBlock.id

    previewColorInput.value = carObj[id].color
    previewModelInput.value = carObj[id].name
    previewCarImg.setAttribute("fill", `${carObj[id].color}`)

    selectId = id
    formColorModel.classList.remove('inactive')

    // updateCarentCar(id)
  }

  if (event.target.closest('.engineButtomDrive')) { // запускаю машинку
    const newCarBlock = event.target.closest('.newCarBlock'); // Находим соответствующий блок машинки
    const id = newCarBlock.id
    carObj[id].carDriveButton.classList.add('engineAnimation')

    try {
      const { velocity, distance } = await fetchVelocity(id); // Ждем получения данных о скорости и дистанции

      // Удалить класс анимации сразу после получения ответа
      carObj[id].carDriveButton.classList.remove('engineAnimation');

      // Запускаем анимацию для соответствующей машинки
      drive(carObj[id].carDivs, carObj[id].carImages, id, velocity, distance);

      // Вызываем функцию для driveStatus для остановки посреди дороги
      resultFetchDriveStatus(id);
    } catch (error) {
      console.error('Error occurred while fetching velocity:', error);
    }

  }

  if (event.target.closest('.allCarsStartButton')) { // запускаю все машинки
    const fetchPromises = [];  // Создаем массив для хранения промисов от fetchVelocity
    const idArr = [] // Массив на соотстветствие id индексу в fetchPromises
    // const statusArr = []
    for (let id in carObj) {
      carObj[id].carDriveButton.classList.add('engineAnimation')

      fetchPromises.push(fetchVelocity(id)); // Вызываем функцию fetchVelocity для каждой машинки и добавляем промис в массив
      idArr.push(id)
      carObj[id].status = 'start'
      resultFetchDriveStatus(id)  // меняет статус (возможно ответ придёт быстро)
    }
    const dataVelocityArray = await Promise.all(fetchPromises);  // Ждем получения всех данных о скорости и дистанции
    for (let i = 0; i < dataVelocityArray.length; i++) {
      let { velocity, distance } = dataVelocityArray[i];
      const id = idArr[i];
      if (carObj[id].status === 'stop') {
        velocity = 0
      }
      carObj[id].carDriveButton.classList.remove('engineAnimation'); // убираю анимацию кнопки
      drive(carObj[id].carDivs, carObj[id].carImages, id, velocity, distance); // После получения всех данных запускаем функцию drive для каждой машинки
    }

  }

  if (event.target.closest('.engineButtomStop')) {  // останавливаю-возвращаю машинку
    const newCarBlock = event.target.closest('.newCarBlock'); // Находим соответствующий блок машинки
    const id = newCarBlock.id
    carObj[id].isAnimationRunning = false; // Останавливаем анимацию для соответствующей машинки
    carObj[id].currentTranslate = 0 ;
    // возвращяю машинку, если она уже доехала и перестала обращаться к объекту
    newCarBlock.querySelector('.trackBlock__carImg').style.transform = `translate(${carObj[id].currentTranslate}px, -11px)`;
    carObj[id].status === 'stop'
  }

  if (event.target.closest('.allCarsStopButton')) { // останавливаю все машинки
    for (let id in carObj) {

      carObj[id].isAnimationRunning = false; // Останавливаем анимацию для соответствующей машинки
      carObj[id].currentTranslate = 0;
      carObj[id].carImages.style.transform = `translate(${carObj[id].currentTranslate}px, -11px)`;

      carObj[id].status === 'stop'
    }
  }
});

/************************************************************************************************** */
/************************************************************************************************** */

async function driveAnimation(newDiv, imageElement, id, velocity, distance) {
  try {
  let currentTranslate = carObj[id].currentTranslate; // Текущее значение отступа;
  const maxTranslate = parseInt(newDiv.offsetWidth) - parseInt(imageElement.offsetWidth + 5) // сработал, т.к. imageElement не имеет конкретной ширины
  // const maxTranslate = parseInt(newDiv.offsetWidth) - parseInt(imageElement.clientWidth + 5); // Максимальное значение отступа
  // const maxTranslate = parseInt(newDiv.offsetWidth); // Максимальное значение отступа
  // const maxTranslate = parseInt(newDiv.offsetWidth) - parseInt(imageElement.naturalWidth + 5); // Максимальное значение отступа

  // console.log(`currentTranslate= ${currentTranslate}  maxTranslate=${maxTranslate}`)
  if (currentTranslate >= maxTranslate ) {
    currentTranslate = 0
    return  // чтобы остановить цикл рекурсии
  }

  // установка скорости или остановка на трассе
  let translateIncrement;
  if (carObj[id].driveStatus){
    translateIncrement = speedTest(velocity, distance, maxTranslate)  // шаг анимации, он же скорость движения машинки на экране
  } else {
    translateIncrement = 0
    return // чтобы остановить цикл рекурсии
  }

  // const translateIncrement = speedTest(velocity, distance, maxTranslate)  // шаг анимации, он же скорость движения машинки на экране

  currentTranslate += translateIncrement; 
  imageElement.style.transform = `translate(${currentTranslate}px, -11px)`;

  // console.log(`Привет ${JSON.stringify(imageElement)}`)

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

async function drive(newDiv, imageElement, id, velocity, distance) {
  if (!carObj[id].isAnimationRunning) { // Проверка, запущена ли анимация для данной машинки
    carObj[id].isAnimationRunning = true; // Устанавливаю флаг запуска анимации
    if (carObj[id].status === 'start'){
      carObj[id].driveStatus = true;
    }
    // carObj[id].driveStatus = true;
    console.log(`${carObj[id].name} статус ${carObj[id].driveStatus}`);
    driveAnimation(newDiv, imageElement, id, velocity, distance); // Запускаем анимацию с передачей данных о скорости и дистанции
  }
}

