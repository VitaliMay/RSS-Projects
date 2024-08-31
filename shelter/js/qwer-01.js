
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
    console.log(`tempArr = ${tempArr}`)
    
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

console.log(createPaginationArr())

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