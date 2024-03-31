const body = document.querySelector('body')

const carObj = {} // надо сделать объект объектов по id


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

addCarButtom.addEventListener('click', carBlockItem)

/************************************************** */
// генерирую уникальный id
function idCounter () {
  let counter = 4 // столько машинок изначально на сервере (это надо получать)
  // let counter = document.querySelectorAll('.newCarBlock').length
  return () => {
    counter += 1;
    return counter
  }
}

const idGenerator = idCounter()

/*************************************************** */

function carBlockItem() {
  const newCarBlock = newElement('div', 'newCarBlock', body)
  /*** */
  const newCarBlockId = `${idGenerator()}`; // Генерируем уникальный ID для нового блока
  newCarBlock.id = newCarBlockId;
  /*** */
  const newCarBlock__topDiv = newElement('div', 'newCarBlock__topDiv',newCarBlock)
  const newCarBlock__topDivItem01 = newElement('div', 'addCarButtom', newCarBlock__topDiv, 'Update color this car')
  const newCarBlock__topDivItem02 = newElement('div', 'addCarButtom', newCarBlock__topDiv, 'Update this car model')
  const newCarBlock__topDivItem03 = newElement('div', 'deleteCarButtom', newCarBlock__topDiv, 'Delete Car')
  const newCarBlock__topDivItem04 = newElement('div', 'addCarButtom-model', newCarBlock__topDiv, 'Car Model')
  /*** */
  const newCarBlock__lowDiv = newElement('div', 'newCarBlock__lowDiv',newCarBlock)
  const engineButtomBlock = newElement('div', 'engineButtomBlock', newCarBlock__lowDiv)
  const driveButtom = newElement('div', 'engineButtomDrive', engineButtomBlock, 'A')
  const stopButtom = newElement('div', 'engineButtomStop', engineButtomBlock, 'B')
  const trackBlock = newElement('div', 'trackBlock', newCarBlock__lowDiv)
  
  const imageElement = newElement('img', 'trackBlock__carImg', trackBlock)

  imageElement.src = './vehicle-01.svg';  // лучше сразу вставить SVG
  imageElement.alt = `Vehicle model`;

  const randomColor = Math.random() * 360
  imageElement.style.filter = `hue-rotate(${randomColor}deg)`;

  carObj[newCarBlockId] = { isAnimationRunning: false, currentTranslate: 0, carDivs: trackBlock, carImages: imageElement};
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

body.addEventListener('click', function(event) { // работа с кнопками, надо разобрать на отдельные функции

  if (event.target.closest('.deleteCarButtom')) { // удаляю машинку
    const newCarBlock = event.target.closest('.newCarBlock'); // Находим соответствующий блок машинки
    const id = newCarBlock.id
    console.log(carObj)
    newCarBlock.remove();
    delete carObj[id];
    console.log(carObj)
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

function driveAnimation(newDiv, imageElement, index) {
  let currentTranslate = carObj[index].currentTranslate; // Текущее значение отступа;
  const maxTranslate = parseInt(newDiv.offsetWidth) - parseInt(imageElement.naturalWidth + 5); // Максимальное значение отступа

  if (currentTranslate >= maxTranslate) {
    currentTranslate = 0
  }
  const translateIncrement = speedTest(velocity, distance, maxTranslate)  // шаг анимации, он же скорость движения машинки на экране
  currentTranslate += translateIncrement; 
  imageElement.style.transform = `translate(${currentTranslate}px, -11px)`;

  carObj[index].currentTranslate = currentTranslate; // сохранить измененное значение паддинга в объект

  if (currentTranslate < maxTranslate && carObj[index].isAnimationRunning) {
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


