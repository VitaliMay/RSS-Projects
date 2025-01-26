const canvas = document.createElement('canvas');
canvas.classList.add('canvas');
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

const squareSize = 50; // Размер квадрата
const gapSize = 5; // Размер промежутка между квадратиками
const gridSize = 5; // Количество квадратов по горизонтали и вертикали
const squaresAll = []; // Для хранения информации о каждом квадрате

canvas.width = (gridSize + 1) * gapSize + squareSize * gridSize;
canvas.height = (gridSize + 1) * gapSize + squareSize * gridSize;
// canvas.width = 500;
// canvas.height = 400;

// Создаю матрицу квадратов с координатами и состоянием цвета
for (let row = 0; row < gridSize; row++) {
  for (let col = 0; col < gridSize; col++) {
    const x = col * (squareSize + gapSize) + gapSize;
    const y = row * (squareSize + gapSize) + gapSize;
    squaresAll.push({ x, y, row, col, color: 'pink', clicked: false }); // Все квадраты по умолчанию розовые
  }
}

// Функция для рисования квадратиков
function drawSquares(activeRow, activeCol) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка canvas перед перерисовкой

  for (let square of squaresAll) {
    // Устанавливаю цвет квадрата
    if (square.clicked) {
      ctx.fillStyle = 'beige'; // Цвет при клике
    } else if (square.row === activeRow || square.col === activeCol) {
      ctx.fillStyle = 'lightgreen'; // Цвет для всей строки и колонки
    } else {
      ctx.fillStyle = 'pink'; // Остальные квадраты — розовые
    }

    // Если курсор наведен на квадрат, меняю его цвет
    if (
      square.row === activeRow &&
      square.col === activeCol &&
      !square.clicked
    ) {
      ctx.fillStyle = 'yellowgreen'; // Цвет hover, если не кликнутый
    }

    ctx.fillRect(square.x, square.y, squareSize, squareSize);
  }
}

// Обработка движения мыши
canvas.addEventListener('mousemove', (event) => {
  const canvasRect = canvas.getBoundingClientRect();
  // ловлю положение мыши над канвасом
  const mouseX = event.clientX - canvasRect.left;
  const mouseY = event.clientY - canvasRect.top;

  let activeRow = -1;
  let activeCol = -1;

  // Нахожу квадрат, над которым курсор
  squaresAll.forEach((square) => {
    if (
      mouseX > square.x &&
      mouseX < square.x + squareSize &&
      mouseY > square.y &&
      mouseY < square.y + squareSize
    ) {
      activeRow = square.row; // Индекс активного ряда
      activeCol = square.col; // Индекс активной колонки
    }
  });

  drawSquares(activeRow, activeCol); // Перерисовываю квадраты с учетом активного квадрата
});

// Обработка клика по квадратикам
canvas.addEventListener('click', (event) => {
  const canvasRect = canvas.getBoundingClientRect();
  // ловлю положение мыши над канвасом
  const mouseX = event.clientX - canvasRect.left;
  const mouseY = event.clientY - canvasRect.top;

  // Нахожу квадрат, по которому кликнули
  squaresAll.forEach((square) => {
    if (
      mouseX > square.x &&
      mouseX < square.x + squareSize &&
      mouseY > square.y &&
      mouseY < square.y + squareSize
    ) {
      // Меняю состояние clicked
      square.clicked = !square.clicked;
    }
  });

  drawSquares(); // Перерисовываю квадраты после изменения цвета

  console.log(squaresAll);
});

export { drawSquares };
