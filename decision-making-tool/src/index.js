// import App from './components/app/app';

import 'normalize.css';
import './canvas.scss';

// import './mixins.scss';
import './global.scss';
import { startButton } from './components/view/Decision-Picker/decision-picker';

// import { createEl } from './components/utils/elementUtils';

import { createCanvas } from './components/view/Decision-Picker/decision-picker';

const weightArr = [35, 4, 80, 27, 15];
const optionText = ['blue blue blue blue blue blue blue blue', 'red', 'green', 'orange', 'ultra'];
const MAX_VALUE_COLOR_IN_RGB_FORMAT = 16777215;

// function sumArray(arr) {
//   return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// }

class Canvas {
    constructor(weightArr, optionText) {
        this.optionText = optionText;

        this.sectors = this.sumArray(weightArr);

        // Создаею canvas
        // this.canvas = document.createElement('canvas');
        // this.canvas.classList.add('canvas');
        // this.canvas.width = 600;
        // this.canvas.height = 600;
        // document.body.appendChild(this.canvas);

        // this.canvas = createEl({
        //     tag: 'canvas',
        //     classes: ['canvas'],
        //     attributes: {
        //         width: 600,
        //         height: 600,
        //     },
        //     // parent: document.body,
        // });

        this.canvas = createCanvas();
        this.ctx = this.canvas.getContext('2d');

        this.radius = 250;
        this.angle = 1.5 * Math.PI; // чтобы отрисовка начиналась с верхней точки
        // this.angle = 0; // начальный угол

        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2 + (this.canvas.height / 2 - this.radius); // Положение круга

        // this.isAnimate = true; // Флаг для управления анимацией

        this.startTime = null; // Время начала анимации
        this.duration = null; // Длительность анимации в миллисекундах
        this.endTime = null;
    }

    sumArray(arr) {
        const sumArr = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const percentArr = arr.map((el, index) => {
            return {
                color: this.getRandomColor(),
                percent: el / sumArr,
                name: this.optionText[index],
            };
        });
        return percentArr;
    }

    getRandomColor() {
        const randomColor = Math.floor(Math.random() * MAX_VALUE_COLOR_IN_RGB_FORMAT).toString(16);
        return `#${randomColor.padStart(6, '0')}`;
    }

    drawCircleWithSectors() {
        // Заполняю круг желтым цветом (чтобы было видно как работают сектора)
        this.ctx.fillStyle = 'yellow';
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
        this.ctx.fill();

        let startAngle = this.angle; // Начальный угол с учетом вращения
        this.sectors.forEach((sector) => {
            const endAngle = startAngle + Math.PI * 2 * sector.percent;
            this.ctx.fillStyle = sector.color;
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX, this.centerY);
            this.ctx.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle);
            this.ctx.lineTo(this.centerX, this.centerY);
            this.ctx.fill();

            // Рисую белую линию по краям сектора
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = 'white';
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX, this.centerY);
            this.ctx.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle);
            this.ctx.lineTo(this.centerX, this.centerY);
            this.ctx.stroke();

            // Добавляею текст с наименованием сектора
            const textAngle = startAngle + (endAngle - startAngle + 0.1) / 2; // угол для размещения текста

            // 0,1 это коэфф для размещения текста ближе к центру сектора (текст 16 => середина 8,
            // при радиусе начала примерно 80 this.radius / 3, нужен сдвиг для центровки в 0.1 радиан
            // или так ((16/2) / this.radius / 3))

            // Сохраняю состояние контекста
            this.ctx.save();

            // контекст к центру круга
            this.ctx.translate(this.centerX, this.centerY);
            // Поворачиваю контекст на нужный угол
            this.ctx.rotate(textAngle);

            this.ctx.fillStyle = 'black';
            this.ctx.font = '16px Arial';
            this.ctx.textAlign = 'left';
            // this.ctx.textAlign = 'center';
            // Рисую текст, смещая его от центра

            // Надо ограничить длину строки, чтобы текст не выходил за круг
            let nameSector = sector.name;
            if (nameSector.length > 16) {
                nameSector = nameSector.slice(0, 17) + '...';
            }

            this.ctx.fillText(nameSector, this.radius / 3, 0);
            // this.ctx.fillText(sector.name, this.radius / 3, 0);

            // Возвращаю состояние контекста
            this.ctx.restore();

            startAngle = endAngle; // Обновляю начальный угол для следующего сектора
        });
    }

    drawArrow() {
        const arrowHeight = 60; // Высота стрелки
        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX - 15, 70); // Левый край стрелки
        this.ctx.lineTo(this.centerX + 15, 70); // Правый край стрелки
        this.ctx.lineTo(this.centerX, this.centerY - this.radius + arrowHeight / 2); // Верхушка стрелки
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawCanvas() {
        this.drawCircleWithSectors(); // Рисую круг с секторами
        this.drawArrow(); // Рисую указатель
    }

    /******************************************************************* */
    /******************************************************************* */
    // Функция параболы для анимации с ускорением и замедлением
    parabolicFunc(timeNorm) {
        return (1 - Math.pow(timeNorm - 0.5, 2) * 4) * 0.4;
    }

    // Функция для анимации
    animate(duration) {
        if (!this.duration) {
            // this.duration = duration; // остановка всегда в одном месте
            this.duration = duration + Math.floor(Math.random() * 5) * 100; // для большего рандома меняю длительность анимации от 0 до 0,4с
            this.startTime = performance.now();
            this.endTime = this.startTime + this.duration;
        }

        const currentTime = performance.now();
        const elapsed = currentTime - this.startTime;
        const timeNorm = Math.min(elapsed / this.duration, 1);

        const parabolTimeNorm = this.parabolicFunc(timeNorm);
        // console.log(easingT, `t= ${t}`);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Очищаею canvas

        this.angle += parabolTimeNorm;
        // this.angle += easingT * 0.4;
        this.drawCanvas();

        if (timeNorm < 1) {
            requestAnimationFrame(() => this.animate(duration));
            startButton.disabled = true;
            startButton.title = '';
        } else {
            // Сброс состояния для следующего запуска
            this.duration = null;
            this.startTime = null;
            this.endTime = null;

            startButton.disabled = false;
            startButton.title = 'Pick';

            this.angle = 1.5 * Math.PI; // чтобы отрисовка начиналась с верхней точки
        }
    }
}

const canvas = new Canvas(weightArr, optionText);

startButton.addEventListener('click', () => {
    canvas.animate(10000);
});

// canvas.animate(10000);

canvas.drawCanvas();
