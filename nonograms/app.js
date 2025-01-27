import { signatureScore } from './js/score.js';
import { CanvasGrid } from './js/canvasDraw.js';
import { data } from './js/data.js';

/************************************************** */

signatureScore();

new CanvasGrid(5, 50, 5, data.butterfly.matrix);
