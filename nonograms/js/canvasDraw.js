import { data } from './data.js';
import { initModal, canvasContainer } from './modal.js';

class CanvasGrid {
  constructor(gridSize, squareSize, gapSize, matrix) {
    this.squareSize = squareSize; // Размер квадрата
    this.gridSize = gridSize; // Размер сетки
    this.gapSize = gapSize; // Размер промежутка между квадратиками

    this.matrix = matrix;

    this.isMouseEventsFlag = true; // Флаг для управления обработкой событий

    this.squaresAll = []; // Для хранения информации о каждом квадрате
    this.activeRow = -1; // Текущая активная строка
    this.activeCol = -1; // Текущая активная колонка

    // Определяю стартовые позиции для рисования поля игры
    this.helpInfo = this.isHelp(matrix);
    this.leftMaxLength = this.helpInfo.leftMaxLength;
    this.topMaxLength = this.helpInfo.topMaxLength;

    // Создаю canvas
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('canvas');

    // добавляю базовый размер поля, чтобы меньше дублировать
    const baseSize =
      (this.gridSize + 1) * this.gapSize +
      this.squareSize * this.gridSize +
      this.gapSize * 6; // для разделительных линий
    this.canvas.width = baseSize + this.squareSize * this.leftMaxLength;
    this.canvas.height = baseSize + this.squareSize * this.topMaxLength;

    canvasContainer.append(this.canvas);
    // document.body.append(this.canvas);
    this.ctx = this.canvas.getContext('2d', { alpha: false }); // пробую улучшить производительность

    // заполняю squaresAll
    this.initSquaresAll();

    // Добавляю обработчики событий
    this.setupEventListeners();

    // Начальное рисование канвас (квадратики)
    this.drawSquaresAll(); // без активного квадрата
  }

  // Метод удаления из разметки
  removeCanvas() {
    if (this.canvas) {
      this.canvas.remove(); // удаление элемента из DOM
      this.canvas = null; // обнуляю ссылку на элемент
    }
  }

  // Первоначальное наполнение матрицы квадратов
  initSquaresAll() {
    // стартовые позиции с учётом max кол-ва подсказок
    const startX = this.leftMaxLength * this.squareSize + this.gapSize * 4;
    const startY = this.topMaxLength * this.squareSize + this.gapSize * 4;

    for (let row = 0; row < this.gridSize; row += 1) {
      for (let col = 0; col < this.gridSize; col += 1) {
        const baseSizeSquare = this.squareSize + this.gapSize;
        const x =
          startX + col * baseSizeSquare + Math.floor(col / 5) * this.gapSize;
        const y =
          startY + row * baseSizeSquare + Math.floor(row / 5) * this.gapSize;

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
    console.log(this.squaresAll);
  }

  // Функция для рисования квадратиков
  drawSquaresAll() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Очистка canvas перед перерисовкой

    // Изменяю цвет канвас
    // this.ctx.fillStyle = 'rgb(63, 95, 225)';
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    /********Блок закрашивания квадратов******************************** */
    for (let square of this.squaresAll) {
      // Устанавливаем цвет квадрата
      if (square.crossed) {
        this.ctx.fillStyle = 'rgb(128, 128, 128)';
        // this.ctx.fillStyle = 'grey';
      } // Цвет для перечеркнутого квадрата
      else if (square.clicked) {
        this.ctx.fillStyle = 'beige'; // Цвет при клике
      } else if (
        square.row === this.activeRow ||
        square.col === this.activeCol
      ) {
        this.ctx.fillStyle = 'rgb(107, 107, 107)'; // Цвет для всей строки и колонки
        // this.ctx.fillStyle = 'rgb(156, 156, 156)'; // Цвет для всей строки и колонки
        // this.ctx.fillStyle = 'lightgreen'; // Цвет для всей строки и колонки
      } else {
        this.ctx.fillStyle = 'rgb(128, 128, 128)'; // Остальные квадраты — серые
        // this.ctx.fillStyle = 'grey'; // Остальные квадраты — серые
      }

      // Если курсор наведен на квадрат, меняю его цвет
      if (
        square.row === this.activeRow &&
        square.col === this.activeCol &&
        !square.clicked
      ) {
        this.ctx.fillStyle = 'rgb(88, 88, 88)'; // Цвет hover, если не кликнутый
        // this.ctx.fillStyle = 'yellowgreen'; // Цвет hover, если не кликнутый
      }

      this.ctx.fillRect(square.x, square.y, this.squareSize, this.squareSize);

      // Если квадрат перечеркнут, рисую "X"
      if (square.crossed) {
        this.drawCross(square);
      }
    }

    /********Блок подсказок *************************/
    this.ctx.fillStyle = 'white'; // Цвет текста
    this.ctx.textAlign = 'center'; // Центрируем текст
    this.ctx.font = `${this.squareSize / 2}px Lato`; // ставлю шрифт

    // this.ctx.fillText('O', 0, 10);

    // Подсказки слева
    for (let row = 0; row < this.helpInfo.left.length; row += 1) {
      const hintY =
        this.squaresAll[row * this.gridSize].y + (this.squareSize / 4) * 3;
      this.helpInfo.left[row].forEach((value, index) => {
        const hintX =
          this.squaresAll[0].x -
          this.gapSize -
          this.squareSize / 2 -
          index * this.squareSize -
          2 * this.gapSize;

        this.ctx.fillText(value, hintX, hintY);
      });
    }

    // Подсказки сверху
    for (let col = 0; col < this.helpInfo.top.length; col++) {
      const hintX = this.squaresAll[col].x + this.squareSize / 2;
      // const hintX = (col + this.leftMaxLength) * (this.squareSize + this.gapSize) + (this.squareSize / 2);
      this.helpInfo.top[col].forEach((value, index) => {
        const hintY =
          this.squaresAll[0].y -
          // this.squaresAll[col].y -
          // this.gapSize -
          this.squareSize / 2 -
          index * this.squareSize -
          2 * this.gapSize;
        // const hintY = (this.topMaxLength * (this.squareSize + this.gapSize * 2)) - (this.gapSize + (this.squareSize) + (index * this.squareSize)) ;
        // const hintY = (this.topMaxLength * (this.squareSize + this.gapSize * 2)) - (this.gapSize + (this.squareSize / 2) + (index * this.squareSize)) ;
        this.ctx.fillText(value, hintX, hintY);
        // this.ctx.fillText(value, hintX, hintY + (index * this.gapSize));
      });
    }

    /********Блок разделительных линий *************************/
    this.ctx.strokeStyle = 'red'; // Цвет линии
    this.ctx.lineWidth = this.gapSize * 2; // Ширину линии

    // Разделительных линии по горизонтали (top)
    // Перебираю строки с границей через 5 квадратов
    for (let row = 1; row <= this.gridSize; row += 5) {
      const previousSquare = this.squaresAll[row * this.gridSize]; // Квадрат в первой колонке текущей строки
      const lineY = previousSquare.y - this.squareSize - 2 * this.gapSize; //  Y для линии

      this.ctx.beginPath();
      this.ctx.moveTo(this.gapSize * 2, lineY); // Начало линии (слева)
      // this.ctx.moveTo(0, lineY); // Начало линии (слева)

      this.ctx.lineTo(previousSquare.x - this.gapSize * 4, lineY); // Конец линии (справа)
      if (row === 1) {
        this.ctx.moveTo(previousSquare.x - this.gapSize * 2, lineY); // Начало линии (слева)
        this.ctx.lineTo(
          this.squaresAll[this.gridSize - 1].x + this.squareSize,
          lineY,
        ); // Конец линии (справа)
        // this.ctx.lineTo(this.squares[this.gridSize - 1].x + this.squareSize, lineY); // Конец линии (справа)
      }
      // this.ctx.lineTo(this.canvas.width, lineY); // Конец линии (справа)
      this.ctx.stroke();
    }

    // Разделительные линии по вертикали (left)
    // Перебираю колонки с границей через 5 квадратов
    for (let col = 1; col <= this.gridSize; col += 5) {
      const previousSquare = this.squaresAll[col - 1]; // Квадрат в первой колонке текущей строки
      const lineX = previousSquare.x - this.gapSize; // X для линии
      // const lineY = previousSquare.y + this.squareSize + this.gapSize;

      this.ctx.beginPath();
      this.ctx.moveTo(lineX, this.gapSize * 2); // Начало линии
      // this.ctx.moveTo(lineX, this.gapSize * 2 ); // Начало линии

      this.ctx.lineTo(lineX, previousSquare.y - this.gapSize * 4); // Конец линии
      // this.ctx.lineTo(lineX, previousSquare.y); // Конец линии
      if (col === 1) {
        this.ctx.moveTo(lineX, previousSquare.y - this.gapSize * 2); // Начало линии
        this.ctx.lineTo(
          lineX,
          this.squaresAll[this.squaresAll.length - this.gridSize].y +
            this.squareSize,
        ); // Конец линии (справа)
      }
      // this.ctx.lineTo(this.canvas.width, lineY); // Конец линии (справа)
      this.ctx.stroke();
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
      if (!this.isMouseEventsFlag) return; // Проверяем флаг перед обработкой клика

      const { mouseX, mouseY } = getMousePosition(event);
      let activeSquare = findSquare(mouseX, mouseY);

      // Проверяю, изменился ли активный квадрат
      if (activeSquare !== lastActiveSquare) {
        this.activeRow = activeSquare ? activeSquare.row : -1;
        this.activeCol = activeSquare ? activeSquare.col : -1;

        lastActiveSquare = activeSquare; // Обновляю последний активный квадрат
        this.drawSquaresAll(); // Перерисовываю только если изменился активный квадрат
      }
    });

    this.canvas.addEventListener('mouseleave', () => {
      // Сброс активного ряда и колонки, когда мышь покидает canvas
      this.activeRow = -1;
      this.activeCol = -1;
      this.drawSquaresAll(); // Перерисовываю квадраты без активного выделения
    });

    this.canvas.addEventListener('click', (event) => {
      if (!this.isMouseEventsFlag) return; // Проверяем флаг перед обработкой клика

      const { mouseX, mouseY } = getMousePosition(event);
      let clickedSquare = findSquare(mouseX, mouseY);

      // Меняю состояние clicked
      if (clickedSquare) {
        clickedSquare.clicked = !clickedSquare.clicked;
        // Если квадрат кликнутый, то он не перечёркнутый
        clickedSquare.crossed = false;
      }

      // Имеет смысл перерисовывать только один квадрат
      this.drawSquaresAll(); // Перерисовываю квадраты после изменения цвета
      // console.log(this.squaresAll);

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
      this.drawSquaresAll(); // Перерисовываем квадраты после изменения цвета
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

    this.showSolution();

    initModal();
    // Если все значения совпадают, выводим поздравление
    console.log('Ура! Кроссфорд решен, картинка собрана!');
    // return;
  }

  // Метод для сброса clicked и crossed
  resetGame() {
    for (let square of this.squaresAll) {
      square.clicked = false;
      square.crossed = false;
    }
    // Перерисовываем квадраты
    this.drawSquaresAll();

    this.enableMouseEvents();
  }

  /**************************************** */
  /**************************************** */
  showSolution() {
    for (let row = 0; row < this.gridSize; row += 1) {
      for (let col = 0; col < this.gridSize; col += 1) {
        // Ставлю clicked если в матрице стоит 1
        this.squaresAll[row * this.gridSize + col].clicked =
          this.matrix[row][col] === 1;
      }
    }

    // Перерисовываю канвас
    this.drawSquaresAll();

    // Отключаю события
    this.disableMouseEvents();
  }

  // Отключение событий
  disableMouseEvents() {
    this.isMouseEventsFlag = false;
  }

  // Включение событий
  enableMouseEvents() {
    this.isMouseEventsFlag = true;
  }

  /********************************** */
  /********************************** */

  // Метод для расчёта (формрования) подсказок
  isHelp(matrix) {
    const result = {
      left: [],
      top: [],
      leftMaxLength: 0,
      topMaxLength: 0,
    };

    const numRows = matrix.length;
    const numCols = matrix[0].length;

    // Обработка рядов (строк)
    for (let i = 0; i < numRows; i += 1) {
      const row = matrix[i];
      let count = 0;
      const temp = [];

      for (let j = 0; j < numCols; j += 1) {
        if (row[j] === 1) {
          count += 1;
        } else {
          if (count > 0) {
            temp.push(count);
            count = 0;
          }
        }
      }

      // В конце строки могут быть единицы
      if (count > 0) {
        temp.push(count);
      }

      // Расчитываю максимальное кол-во подсказок,
      // для позиционирования игрового поля
      if (temp.length > result.leftMaxLength) {
        result.leftMaxLength = temp.length;
      }

      // Формирую результаты для left
      if (temp.length === 0) {
        result.left.push([]);
      } else {
        result.left.push(temp.reverse());
      }
    }

    // Обработка колонок
    for (let j = 0; j < numCols; j += 1) {
      let count = 0;
      const temp = [];

      for (let i = 0; i < numRows; i += 1) {
        if (matrix[i][j] === 1) {
          count += 1;
        } else {
          if (count > 0) {
            temp.push(count);
            count = 0;
          }
        }
      }

      // В конце колонки могут быть единицы
      if (count > 0) {
        temp.push(count);
      }

      // Расчитываю максимальное кол-во подсказок,
      // для позиционирования игрового поля
      if (temp.length > result.topMaxLength) {
        result.topMaxLength = temp.length;
      }

      // Формирую результаты для top
      if (temp.length === 0) {
        result.top.push([]);
      } else {
        result.top.push(temp.reverse());
      }
    }

    console.log('Подсказки', result);
    return result;
  }
}

// const canvasGame = new CanvasGrid(5, 40, 2, data.butterfly.matrix);
// const canvasGame = new CanvasGrid(10, 40, 2, data.kat.matrix);

const canvasGame = {
  currentGame: new CanvasGrid(5, 40, 2, data.butterfly.matrix),
};

// export { CanvasGrid };
export { CanvasGrid, canvasGame };
