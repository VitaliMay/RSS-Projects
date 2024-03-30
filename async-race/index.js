const body = document.querySelector('body')

let carDivs = [];
let carImages = [];

const carObj = {} // надо сделать объект объектов


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
// const updateCarBottom = newElement('buttom', 'addCarButtom', changeCarButtomBlock, 'update Car')
const add100CarsButtom = newElement('buttom', 'create100CarsButton', changeCarButtomBlock, 'create 100 Cars')

const generalCarsButtomBlock = newElement('div', 'changeCarButtomBlock', buttomBlock)
// const add100CarsButtom = newElement('buttom', 'create100CarsButton', generalCarsButtomBlock, 'create 100 Cars')
const startRaceButtom = newElement('buttom', 'allCarsStartButton', generalCarsButtomBlock, 'Start Race')
const resetRaceButtom = newElement('buttom', 'allCarsStopButton', generalCarsButtomBlock, 'Reset Race')

addCarButtom.addEventListener('click', carBlockItem)


function carBlockItem() {
  const newCarBlock = newElement('div', 'newCarBlock', body)
  /*** */
  const newCarBlockId = `${carDivs.length}`; // Генерируем уникальный ID для нового блока
  newCarBlock.id = newCarBlockId;
  /*** */
  const newCarBlock__topDiv = newElement('div', 'newCarBlock__topDiv',newCarBlock)
  const newCarBlock__topDivItem01 = newElement('div', 'addCarButtom', newCarBlock__topDiv, 'Update color this car')
  // const newCarBlock__topDivItem01 = newElement('div', 'addCarButtom', newCarBlock__topDiv, 'Select this car for update')
  const newCarBlock__topDivItem02 = newElement('div', 'addCarButtom', newCarBlock__topDiv, 'Update this car model')
  const newCarBlock__topDivItem03 = newElement('div', 'addCarButtom', newCarBlock__topDiv, 'Delete Car')
  const newCarBlock__topDivItem04 = newElement('div', 'addCarButtom-model', newCarBlock__topDiv, 'Car Model')
  /*** */
  const newCarBlock__lowDiv = newElement('div', 'newCarBlock__lowDiv',newCarBlock)
  const engineButtomBlock = newElement('div', 'engineButtomBlock', newCarBlock__lowDiv)
  const driveButtom = newElement('div', 'engineButtomDrive', engineButtomBlock, 'A')
  const stopButtom = newElement('div', 'engineButtomStop', engineButtomBlock, 'B')
  const trackBlock = newElement('div', 'trackBlock', newCarBlock__lowDiv)
  // trackBlock.style.paddingLeft = '5px'
  carObj[newCarBlockId] = { isAnimationRunning: false, currentPadding: 5 };
  // carObj[carDivs.length] = { isAnimationRunning: false, currentPadding: 5 };

  const imageElement = newElement('img', 'carBlock__carImg', trackBlock)

  imageElement.src = './vehicle-01.svg';
  imageElement.alt = `Vehicle model`;

  const randomColor = Math.random() * 360
  imageElement.style.filter = `hue-rotate(${randomColor}deg)`;

  /******************************** */ 
  // Надо добавлять не в массивы, а в объект carObj
  carDivs.push(trackBlock); // Добавить новый div в массив
  carImages.push(imageElement); // Добавить новый img в массив
}

carBlockItem()
carBlockItem()

/************************************************************************* */
// Игры с цветом 

const slider = document.querySelector('.color-slider');
const preview = document.querySelector('.color-preview');

slider.addEventListener('input', function() {
    const hueValue = this.value;
    preview.style.filter = `hue-rotate(${hueValue}deg)`;
    imageElement.style.filter = `hue-rotate(${hueValue}deg)`;
});
/************************************************************************* */

// Расчёт скорости (буду получать с сервера)
const velocity = 50
const distance = 500000

function speedTest(velocity, distance, maxPadding) {
  const timeRace = distance / velocity;
  const coefficient = 100/4   
  return maxPadding/timeRace * coefficient
}

body.addEventListener('click', function(event) {

  if (event.target.closest('.engineButtomDrive')) { // запускаю машинку
    const newCarBlock = event.target.closest('.newCarBlock'); // Находим соответствующий блок машинки
    const id = newCarBlock.id
    console.log (id);
    drive(carDivs[id], carImages[id], id); // Запускаем анимацию для соответствующей машинки
  }

  if (event.target.closest('.engineButtomStop')) {  // останавливаю-возвращаю машинку
    // console.log('Stop')
    const newCarBlock = event.target.closest('.newCarBlock'); // Находим соответствующий блок машинки
    console.log (newCarBlock.id); // Находим соответствующий блок машинки
    const id = newCarBlock.id
    carObj[id].isAnimationRunning = false; // Останавливаем анимацию для соответствующей машинки
    carObj[id].currentPadding = 5 ;
    // возвращяю машинку, если она уже доехала и перестала обращаться к объекту
    newCarBlock.querySelector('.trackBlock').style.paddingLeft = `${carObj[id].currentPadding}px`;
  }

  if (event.target.closest('.allCarsStartButton')) { // запускаю все машинки
    carDivs.forEach((item, index) => {drive(item, carImages[index], index)})
  }

  if (event.target.closest('.allCarsStopButton')) { // останавливаю все машинки
    const trackBlockArr = Array.from(body.querySelectorAll('.trackBlock'))
    for (id in carObj) {

      carObj[id].isAnimationRunning = false; // Останавливаем анимацию для соответствующей машинки
      carObj[id].currentPadding = 5;
      trackBlockArr[id].style.paddingLeft = `${carObj[id].currentPadding}px`;
    }
    // const trackBlockArr = Array.from(body.querySelectorAll('.trackBlock'))
    // trackBlockArr.forEach((item, id) => item.style.paddingLeft = `${carObj[id].currentPadding}px`)
  }
});

function driveAnimation(newDiv, imageElement, index) {
  let currentPadding = carObj[index].currentPadding; // Текущее значение отступа;
  // let currentPadding = parseFloat(newDiv.style.paddingLeft); // Текущее значение отступа
  const maxPadding = parseInt(newDiv.offsetWidth) - parseInt(imageElement.naturalWidth + 5); // Максимальное значение отступа

  if (currentPadding >= maxPadding) {
    currentPadding = 5
  }
  const paddingIncrement = speedTest(velocity, distance, maxPadding)  // шаг анимации, он же скорость движения машинки на экране
  currentPadding += paddingIncrement; 

  newDiv.style.paddingLeft = `${currentPadding}px`;

  carObj[index].currentPadding = currentPadding; // сохранить измененное значение паддинга в объект

  if (currentPadding < maxPadding && carObj[index].isAnimationRunning) {
    requestAnimationFrame(() => driveAnimation(newDiv, imageElement, index))
  } else {
    carObj[index].isAnimationRunning = false; // Сброс флага после завершения анимации
  }
}

function drive(newDiv, imageElement, index) {
  if (!carObj[index].isAnimationRunning) { // Проверка, запущена ли анимация для данной машинки
    carObj[index].isAnimationRunning = true; // Устанавливаю флаг запуска анимации
    driveAnimation(newDiv, imageElement, index); // Запускаем анимацию
  }
}


