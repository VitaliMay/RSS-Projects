import { signatureScore } from './js/score.js';
import { CanvasGrid } from './js/canvasDraw.js';
import { data } from './js/data.js';

/************************************************** */

signatureScore();

new CanvasGrid(10, 50, 5, data.prayer.matrix);
// new CanvasGrid(10, 50, 5, data.cup.matrix);
// new CanvasGrid(10, 50, 5, data.kat.matrix);
// new CanvasGrid(10, 50, 5, data.snowman.matrix);
// new CanvasGrid(10, 50, 5, data.spider.matrix);
// new CanvasGrid(5, 50, 5, data.butterfly.matrix);
