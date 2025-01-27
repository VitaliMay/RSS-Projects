import { signatureScore } from './js/score.js';
import { CanvasGrid } from './js/canvasDraw.js';
// import { drawSquares } from './js/canvasDraw.js';

/************************************************** */

signatureScore();

// // Рисую канвас без активного квадрата
// drawSquares(-1, -1);

// Создаем экземпляр класса
new CanvasGrid(5, 50, 5);
