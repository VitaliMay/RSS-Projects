
/******* Создаю класс для работы с Local Storage ***************************** */
/******* Создаю класс для работы с Local Storage ***************************** */

class MemoryStore {

  constructor() {
    this.localKey = 'VitaliMay_Snake_scoreTable'
  }

  getScore() {
    const localScoreTable  = localStorage.getItem(this.localKey)   // узнаю,что хранится в Local Storage

    if (isObjectEmpty(localScoreTable)) { // если что-то есть
      return JSON.parse(localScoreTable)
    }
    else {
      return {}
    }
  }

  putScore(gameSpeed, gameScore) {
    let memoryLocal = this.getScore()
    if (isObjectEmpty(memoryLocal)) {
      if (gameSpeed in memoryLocal) {
      // if (memoryLocal.hasOwnProperty(gameSpeed)) {
        let gameSpeedMemoryLength = memoryLocal[gameSpeed].length
        if (gameSpeedMemoryLength < 10) {
          memoryLocal[gameSpeed].push(gameScore)
          memoryLocal[gameSpeed] = memoryLocal[gameSpeed].sort((a, b) => b - a);
        }
        else {
          if (gameScore > memoryLocal[gameSpeed][gameSpeedMemoryLength-1]) {
            memoryLocal[gameSpeed].pop()
            memoryLocal[gameSpeed].push(gameScore)
            memoryLocal[gameSpeed] = memoryLocal[gameSpeed].sort((a, b) => b - a);
          }
        }
      }
      else {
        memoryLocal[gameSpeed] = [gameScore]
      }
    }
    else  {
      memoryLocal[gameSpeed] = [gameScore]
    }

    localStorage.setItem(this.localKey, JSON.stringify(memoryLocal))
  }
}

// const memoryLocalTest = new MemoryStore()


/************************************ */
/************************************ */

function isObjectEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return true; // Если есть хотя бы один ключ, объект считается не пустым
    }
  }
  return false; // Если нет ни одного ключа, объект считается пустым
}

// function isObjectEmpty(obj) {
//   return Object.keys(obj).length === 0;
// }

export { MemoryStore }