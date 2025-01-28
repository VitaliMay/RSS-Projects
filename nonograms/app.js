import { signatureScore } from './js/score.js';
import { CanvasGrid } from './js/canvasDraw.js';
import { data } from './js/data.js';

/************************************************** */

signatureScore();

// new CanvasGrid(10, 50, 5, data.prayer.matrix);
// new CanvasGrid(10, 50, 5, data.cup.matrix);
// new CanvasGrid(15, 40, 2, data.dogLarge.matrix);
// new CanvasGrid(10, 40, 4, data.kat.matrix);
new CanvasGrid(10, 40, 2, data.kat.matrix);
// new CanvasGrid(10, 50, 5, data.snowman.matrix);
// new CanvasGrid(10, 50, 5, data.spider.matrix);
// new CanvasGrid(5, 50, 5, data.butterfly.matrix);
