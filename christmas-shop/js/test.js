const dataIndex = [1, 13, 0, 2, 12, 26, 14, 25, 15, 3, 24, 27]

const dataIndex4El = dataIndex.slice(dataIndex.length-4, dataIndex.length)
// console.log(dataIndex4El)


// function getRandomIntegerArr(min, max, length) {
//   const randomArr = []

//   const getRandomInteger = () => Math.floor(Math.random() * (max - min + 1)) + min;
//   for (let i = 0; i < length; i += 1) {
//     const randomDigit = getRandomInteger()
//     if (!randomArr.includes(randomDigit)) {
//       randomArr.push(randomDigit)
//     }
//   }
//   return randomArr;
// }

function getRandomIntegerArr(min, max, length) {

  const randomArr = new Set(); // Set для уникальности

  const getRandomInteger = () => Math.floor(Math.random() * (max - min + 1)) + min;

  while (randomArr.size < length) { // Кручу, пока не достигнута нужная длина
    const randomDigit = getRandomInteger();
    randomArr.add(randomDigit); // Set не допустит дублирования
  }

  return [...randomArr]; //  Set обратно в массив
}

const randomArr = getRandomIntegerArr(0, 36, 4)

console.log(randomArr)