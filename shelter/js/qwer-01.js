
function randomNumber () {
  return Math.floor(Math.random() * ((8 - 1) - 0 + 1))
  // return Math.floor(Math.random() * ((dataPets.length - 1) - 0 + 1))
}

/************************************************* */

function createPetsNameIndexArr (petsNameIndexArr = []) {
  while (petsNameIndexArr.length < 8) {
    const randomDigit = randomNumber()
    const randomDigitTest = (element) => element === randomDigit;

    if(petsNameIndexArr.some(randomDigitTest)) {
        createPetsNameIndexArr(petsNameIndexArr)
    } else {
        petsNameIndexArr.push(randomDigit)
    }
  }
  return petsNameIndexArr
}

/************************************************* */

// количество срабатывания шафлов
function createShuffleCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  }
}

const getShuffleCount = createShuffleCounter();
/******************************************* */

// Функция для перемешивания массива (перемешивание Фишера-Йетса)
function shuffle(previousArr, slicePre, sliceCurr) {
    let array = [...previousArr]
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    let tempArr = previousArr.slice(slicePre)
    tempArr = tempArr.concat(array.slice(0, sliceCurr))
    // tempArr = [...new Set(tempArr)]  // убираю возможные повторы
    // console.log(`tempArr = ${tempArr}`)

    const shuffleCount = getShuffleCount(); // получаем количество срабатываний шафла
    console.log(`Шафл выполнен ${shuffleCount} раз(а)`);
    
    if (tempArr.length !== [...new Set(tempArr)].length) {
      return shuffle(previousArr, slicePre, sliceCurr)
    }
    return array;
}


function createPaginationArr () {
  const paginationArr = [] // объявляю финишный массив
  // paginationArr[0] = createPetsNameIndexArr() // добавляю первый элемент (массив)

  for (let i = 0; i < 6; i += 3) {
      paginationArr[i] = createPetsNameIndexArr()
      paginationArr[i + 1] = shuffle(paginationArr[i], -2, 4)
      paginationArr[i + 2] = shuffle(paginationArr[i + 1], -4, 2)
  }
  return paginationArr
}


// function createPaginationArr () {
//   const paginationArr = [] // объявляю финишный массив
//   paginationArr[0] = createPetsNameIndexArr() // добавляю первый элемент (массив)

//   for (let i = 1; i < 6; i += 1) {
//     if (i % 2 !== 0) {
//       paginationArr.push(shuffle(paginationArr[i - 1], -2, 4))
//       console.log('Работает нечет')
//     } else {
//       paginationArr.push(shuffle(paginationArr[i - 1], -4, 2))
//     }
//   }
//   return paginationArr
// }

// function shuffle(previousArr) {
//     let array = [...previousArr]
//     for (let i = array.length - 1; i > 0; i -= 1) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     let tempArr = previousArr.slice(-2)
//     tempArr = tempArr.concat(array.slice(0, 4))
//     // tempArr = [...new Set(tempArr)]  // убираю возможные повторы
//     console.log(`tempArr = ${tempArr}`)

//     if (tempArr.length !== [...new Set(tempArr)].length) {
//       return shuffle(previousArr)
//     }
//     return array;
// }


// let arr = createPetsNameIndexArr()
// console.log(`previous = ${arr}`)

// let current = shuffle(arr, -4, 2)
// console.log(`current = ${current}`)

// let finishArr = []

// // // finishArr.push(['q', 'b', 'c'])
// finishArr.push(arr)
// finishArr.push(current)

// console.log(`finish = ${finishArr}`)
// console.log(finishArr)

let paginationArr = createPaginationArr()
console.log(paginationArr)

let paginationArrFlat = paginationArr.flat()
console.log(paginationArrFlat)


function createPaginationArrDevice (paginationArr, deviceCardNumber) {
  const paginationArrFlat = paginationArr.flat()
  const paginationArrDevice = []
  for (i = 0; i < paginationArrFlat.length; i += deviceCardNumber) {
    paginationArrDevice.push(paginationArrFlat.slice(i, i + deviceCardNumber))
    // console.log(paginationArrDevice)
  }
  return paginationArrDevice
}

const paginationArrTablet = createPaginationArrDevice (paginationArr, 6)
console.log(paginationArrTablet)
console.log(paginationArrTablet.length)

const paginationArrMobile = createPaginationArrDevice (paginationArr, 3)
console.log(paginationArrMobile)
console.log(paginationArrMobile.length)


function calculationFlagCurrentPage(paginationArrPre, paginationArrCurrent, flagCurrentPagePre) {
  const preArrLenght = paginationArrPre.length
  const currArrLenght = paginationArrCurrent.length
  const numberElementOnPrePage = paginationArrPre[0].length
  const numberElementOnCurrPage = paginationArrCurrent[0].length
  let flagCurrentPage = flagCurrentPagePre

  if (flagCurrentPagePre) {
    if (flagCurrentPagePre === preArrLenght - 1) {
       flagCurrentPage = currArrLenght - 1
    } else {
       flagCurrentPage = Math.ceil((flagCurrentPagePre * numberElementOnPrePage + 1) / numberElementOnCurrPage) - 1
       console.log(flagCurrentPagePre * numberElementOnPrePage + 1)
    }
  }

  return flagCurrentPage
}

let neFlag = calculationFlagCurrentPage(paginationArr, paginationArrTablet, 5)
// let neFlag = calculationFlagCurrentPage(paginationArrTablet, paginationArr, 0)
console.log(neFlag)

// let experimentArr = [1, 0, 4, 2, 3, 7, 1, 5, 3, 0, 2,
//   4, 6, 5, 1, 3, 4, 0, 2, 7, 6, 0,
//   1, 5, 3, 7, 4, 6, 2, 0, 1, 6, 7,
//   5, 4, 3, 2]

// let newExperimentArr = 

// console.log(8 % 2 === 0)
// console.log(1 % 2 === 0)

// let experimentArr = Array.from({length: 8}, (v, k) => k + 1);
// console.log(experimentArr)

// console.log(experimentArr.slice(-2))
// // console.log(experimentArr)
// console.log(experimentArr.slice(0, 4))
// let qwerArr = experimentArr.slice(-2)
// qwerArr = qwerArr.concat(experimentArr.slice(0, 4))

// console.log(qwerArr)

// let numberArr = [1, 6, 3, 1, 4, 5, 2]
// console.log([...new Set(numberArr)])
// console.log(numberArr)

// console.log(numberArr.slice(0, 20))