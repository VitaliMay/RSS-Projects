class CanvasGrid {
  constructor(gridSize, squareSize, gapSize) {
    this.squareSize = squareSize; // Размер квадрата
    this.gridSize = gridSize; // Размер сетки
    this.gapSize = gapSize; // Размер промежутка между квадратиками

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
        this.squaresAll.push({ x, y, row, col, color: 'pink', clicked: false }); // Все квадраты по умолчанию розовые
      }
    }
  }

  // Функция для рисования квадратиков
  drawSquares() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Очистка canvas перед перерисовкой

    for (let square of this.squaresAll) {
      // Устанавливаем цвет квадрата
      if (square.clicked) {
        this.ctx.fillStyle = 'beige'; // Цвет при клике
      } else if (
        square.row === this.activeRow ||
        square.col === this.activeCol
      ) {
        this.ctx.fillStyle = 'lightgreen'; // Цвет для всей строки и колонки
      } else {
        this.ctx.fillStyle = 'pink'; // Остальные квадраты — розовые
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
    }
  }

  // Установка обработчиков событий
  setupEventListeners() {
    this.canvas.addEventListener('mousemove', (event) => {
      const canvasRect = this.canvas.getBoundingClientRect();
      // ловлю положение мыши над канвасом
      const mouseX = event.clientX - canvasRect.left;
      const mouseY = event.clientY - canvasRect.top;

      this.activeRow = -1; // Сброс активного ряда и колонки
      this.activeCol = -1;

      // Нахожу квадрат, над которым курсор
      this.squaresAll.forEach((square) => {
        if (
          mouseX > square.x &&
          mouseX < square.x + this.squareSize &&
          mouseY > square.y &&
          mouseY < square.y + this.squareSize
        ) {
          this.activeRow = square.row; // Индекс активного ряда
          this.activeCol = square.col; // Индекс активной колонки
        }
      });

      this.drawSquares(); // Перерисовываю квадраты с учетом активного квадрата
    });

    this.canvas.addEventListener('click', (event) => {
      const canvasRect = this.canvas.getBoundingClientRect();
      // ловлю положение мыши над канвасом
      const mouseX = event.clientX - canvasRect.left;
      const mouseY = event.clientY - canvasRect.top;

      /// Нахожу квадрат, по которому кликнули
      this.squaresAll.forEach((square) => {
        if (
          mouseX > square.x &&
          mouseX < square.x + this.squareSize &&
          mouseY > square.y &&
          mouseY < square.y + this.squareSize
        ) {
          // Меняю состояние clicked
          square.clicked = !square.clicked;
        }
      });

      this.drawSquares(); // Перерисовываю квадраты после изменения цвета
      console.log(this.squaresAll);
    });
  }
}

export { CanvasGrid };
