import 'normalize.css';
import './canvas.scss';
import './global.scss';

import { option } from './components/view/sources/option';
import { createWheelPage } from './components/view/wheel-page';

createWheelPage(option);
