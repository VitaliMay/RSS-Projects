class CanvasGrid {
  constructor(gridSize, squareSize, gapSize, matrix) {
    this.squareSize = squareSize; // Размер квадрата
    this.gridSize = gridSize; // Размер сетки
    this.gapSize = gapSize; // Размер промежутка между квадратиками

    this.matrix = matrix;

    this.squaresAll = []; // Для хранения информации о каждом квадрате
    this.activeRow = -1; // Текущая активная строка
    this.activeCol = -1; // Текущая активная колонка

    // Создаю canvas
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('canvas');

    document.body.append(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width =
      (this.gridSize + 1) * this.gapSize + this.squareSize * this.gridSize;
    this.canvas.height =
      (this.gridSize + 1) * this.gapSize + this.squareSize * this.gridSize;

    // заполняю squaresAll
    this.initSquaresAll();

    // Добавляю обработчики событий
    this.setupEventListeners();

    // Начальное рисование канвас (квадратики)
    this.drawSquares(); // без активного квадрата
  }

  // Первоначальное наполнение матрицы квадратов
  initSquaresAll() {
    for (let row = 0; row < this.gridSize; row += 1) {
      for (let col = 0; col < this.gridSize; col += 1) {
        const x = col * (this.squareSize + this.gapSize) + this.gapSize;
        const y = row * (this.squareSize + this.gapSize) + this.gapSize;
        // this.squaresAll.push({ x, y, row, col, clicked: false }); // Все квадраты по умолчанию розовые
        this.squaresAll.push({
          x,
          y,
          row,
          col,
          color: 'pink',
          clicked: false,
          crossed: false,
        }); // Добавил флаг для крестика
      }
    }
  }

  // Функция для рисования квадратиков
  drawSquares() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Очистка canvas перед перерисовкой

    for (let square of this.squaresAll) {
      // Устанавливаем цвет квадрата
      if (square.crossed) {
        this.ctx.fillStyle = 'grey';
      } // Цвет для перечеркнутого квадрата
      else if (square.clicked) {
        this.ctx.fillStyle = 'beige'; // Цвет при клике
      } else if (
        square.row === this.activeRow ||
        square.col === this.activeCol
      ) {
        this.ctx.fillStyle = 'lightgreen'; // Цвет для всей строки и колонки
      } else {
        this.ctx.fillStyle = 'grey'; // Остальные квадраты — серые
      }

      // Если курсор наведен на квадрат, меняю его цвет
      if (
        square.row === this.activeRow &&
        square.col === this.activeCol &&
        !square.clicked
      ) {
        this.ctx.fillStyle = 'yellowgreen'; // Цвет hover, если не кликнутый
      }

      this.ctx.fillRect(square.x, square.y, this.squareSize, this.squareSize);

      // Если квадрат перечеркнут, рисую "X"
      if (square.crossed) {
        this.drawCross(square);
      }
    }
  }

  // Метод рисования "X" на квадрате
  drawCross(square) {
    const x1 = square.x + 5; // Отступ от границы квадрата
    const y1 = square.y + 5; // Отступ от границы квадрата
    const x2 = square.x + this.squareSize - 5; // Отступ от границы квадрата
    const y2 = square.y + this.squareSize - 5; // Отступ от границы квадрата

    this.ctx.strokeStyle = 'red'; // Цвет "X"
    this.ctx.lineWidth = 5; // Ширина линии

    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.moveTo(x2, y1);
    this.ctx.lineTo(x1, y2);
    this.ctx.stroke();
  }

  // Установка обработчиков событий
  setupEventListeners() {
    // ловлю положение мыши над канвасом
    const getMousePosition = (event) => {
      const canvasRect = this.canvas.getBoundingClientRect();
      const mouseX = event.clientX - canvasRect.left;
      const mouseY = event.clientY - canvasRect.top;
      return { mouseX, mouseY };
    };

    // Нахожу квадрат, над которым курсор
    const findSquare = (mouseX, mouseY) => {
      for (const square of this.squaresAll) {
        if (
          mouseX > square.x &&
          mouseX < square.x + this.squareSize &&
          mouseY > square.y &&
          mouseY < square.y + this.squareSize
        ) {
          return square;
        }
      }
      return null; // Если квадрат не найден
    };

    // Последний активный квадрат (чтобы не рисовать при каждом движении мышью)
    let lastActiveSquare = null;

    this.canvas.addEventListener('mousemove', (event) => {
      const { mouseX, mouseY } = getMousePosition(event);
      let activeSquare = findSquare(mouseX, mouseY);

      // Проверяю, изменился ли активный квадрат
      if (activeSquare !== lastActiveSquare) {
        this.activeRow = activeSquare ? activeSquare.row : -1;
        this.activeCol = activeSquare ? activeSquare.col : -1;

        lastActiveSquare = activeSquare; // Обновляю последний активный квадрат
        this.drawSquares(); // Перерисовываю только если изменился активный квадрат
      }
    });

    this.canvas.addEventListener('mouseleave', () => {
      // Сброс активного ряда и колонки, когда мышь покидает canvas
      this.activeRow = -1;
      this.activeCol = -1;
      this.drawSquares(); // Перерисовываю квадраты без активного выделения
    });

    this.canvas.addEventListener('click', (event) => {
      const { mouseX, mouseY } = getMousePosition(event);
      let clickedSquare = findSquare(mouseX, mouseY);

      // Меняю состояние clicked
      if (clickedSquare) {
        clickedSquare.clicked = !clickedSquare.clicked;
        // Если квадрат кликнутый, то он не перечёркнутый
        clickedSquare.crossed = false;
      }

      // Имеет смысл перерисовывать только один квадрат
      this.drawSquares(); // Перерисовываю квадраты после изменения цвета
      console.log(this.squaresAll);

      // Проверка соответствие матрицы после клика
      // Имеет смысл запускать не каждый раз,
      // а только если кол-во кликнутых элементов совпадает с матрицей
      this.checkMatrix();
    });

    // Клик по правой мыши - ставит крестик
    this.canvas.addEventListener('contextmenu', (event) => {
      event.preventDefault(); // Убираю дефолтное контекстное меню

      const { mouseX, mouseY } = getMousePosition(event);
      let clickedSquare = findSquare(mouseX, mouseY);

      // Меняю состояние crossed
      if (clickedSquare) {
        clickedSquare.crossed = !clickedSquare.crossed;
        // Если квадрат перечёркнутый, то он не кликнутый
        clickedSquare.clicked = false;
      }

      // Имеет смысл перерисовывать только один квадрат
      this.drawSquares(); // Перерисовываем квадраты после изменения цвета
    });
  }

  // Метод проверки соответствия матрицы
  checkMatrix() {
    for (let row = 0; row < this.gridSize; row += 1) {
      for (let col = 0; col < this.gridSize; col += 1) {
        const expectedValue = this.matrix[row][col]; // Значение из матрицы
        const currentValue = this.squaresAll[row * this.gridSize + col].clicked
          ? 1
          : 0;
        // 1, если кликнут, иначе 0

        // Если значения не совпадают, выходим из функции
        if (expectedValue !== currentValue) {
          return;
        }
      }
    }

    // Если все значения совпадают, выводим поздравление
    console.log('Ура! Кроссфорд решен, картинка собрана!');
  }
}

export { CanvasGrid };
