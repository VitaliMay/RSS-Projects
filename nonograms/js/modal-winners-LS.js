class MemoryStore {
  constructor() {
    this.localKey = 'VitaliMay_Nono_scoreTable';
    this.loadWinners();
  }

  // Метод для загрузки существующих победителей из Local Storage
  loadWinners() {
    const savedWinners = localStorage.getItem(this.localKey);
    this.winners = savedWinners ? JSON.parse(savedWinners) : [];
  }

  // Метод для добавления нового победителя
  addWinner(matrixName, gridSize, timer) {
    const gameWinner = {
      matrixName: matrixName,
      gridSize: gridSize,
      timer: timer,
    };

    // Добавление нового объекта в массив
    this.winners.push(gameWinner);

    // Если длина массива превышает 5, удаляем самый старый элемент (первый)
    if (this.winners.length > 5) {
      this.winners.shift();
    }

    // Сохранение обновленного массива в Local Storage
    localStorage.setItem(this.localKey, JSON.stringify(this.winners));
  }

  // Метод для получения текущих выигравших
  getWinners() {
    return this.winners;
  }
}

const gameWinnersStorage = new MemoryStore();

// console.log('Привет локальные победители');

export { gameWinnersStorage };
