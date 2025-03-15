// import 'normalize.css';
// import './canvas.scss';

// import './global.scss';

// import { startButton, infoItem, durationItem } from './components/view/decision-picker/decision-picker';

// import { createCanvas } from './components/view/decision-picker/decision-picker';

import { createCanvas } from './decision-picker';

const MAX_VALUE_COLOR_IN_RGB_FORMAT = 16777215;

// const option = [
//     {
//         text: 'blue blue blue blue blue blue blue blue',
//         weight: 40,
//     },
//     {
//         text: 'red',
//         weight: 20,
//     },
//     {
//         text: 'green',
//         weight: 20,
//     },
//     {
//         text: 'orange',
//         weight: 40,
//     },
//     {
//         text: 'ultra',
//         weight: 20,
//     },
// ];

export class CanvasWheel {
    constructor(option, startButton, infoItem) {
        this.option = this.shuffleArray(option); // перемешиваю входной массив
        this.optionText = this.getValueArr(this.option, 'text');
        this.weightArr = this.getValueArr(this.option, 'weight');
        this.sectors = this.sumArray(this.weightArr);

        this.startButton = startButton;
        this.infoItem = infoItem;
        // constructor(weightArr, optionText) {
        //     this.optionText = optionText;
        //     this.sectors = this.sumArray(weightArr);

        this.canvas = createCanvas();
        this.ctx = this.canvas.getContext('2d');

        this.radius = 250;
        this.angle = 1.5 * Math.PI; // чтобы отрисовка начиналась с верхней точки
        // this.angle = 0; // начальный угол

        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2; // Положение круга
        // this.centerY = this.canvas.height / 2 + (this.canvas.height / 2 - this.radius); // Положение круга

        // this.isAnimate = true; // Флаг для управления анимацией

        this.startTime = null; // Время начала анимации
        this.duration = null; // Длительность анимации в миллисекундах
        this.endTime = null;
    }

    getValueArr(arrObj, key) {
        return arrObj.map((item) => (item[key] !== undefined ? item[key] : null));
    }

    shuffleArray(baseArray) {
        const array = [...baseArray];
        for (let i = array.length - 1; i > 0; i -= 1) {
            // Генерируем случайный индекс от 0 до i (включительно)
            const j = Math.floor(Math.random() * (i + 1));
            // Меняем местами элементы с индексами i и j
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
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

    drawCircle(radius, backgroundColor) {
        this.ctx.fillStyle = backgroundColor;
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawCircleWithSectors() {
        // // Заполняю круг желтым цветом (чтобы было видно как работают сектора)
        // this.ctx.fillStyle = 'yellow';
        // this.ctx.beginPath();
        // this.ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
        // this.ctx.fill();

        this.drawCircle(this.radius, 'yellow');

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

            this.#getSectorName(sector, startAngle, endAngle);

            this.ctx.save();

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
        const arrowHeight = this.radius / 4; // Высота стрелки
        // const arrowHeight = 60; // Высота стрелки
        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX - arrowHeight / 4, (this.centerY - this.radius) / 2); // Левый край стрелки
        this.ctx.lineTo(this.centerX + arrowHeight / 4, (this.centerY - this.radius) / 2); // Правый край стрелки
        // this.ctx.moveTo(this.centerX - arrowHeight / 4, 20); // Левый край стрелки
        // this.ctx.lineTo(this.centerX + arrowHeight / 4, 20); // Правый край стрелки
        // this.ctx.moveTo(this.centerX - 15, 70); // Левый край стрелки
        // this.ctx.lineTo(this.centerX + 15, 70); // Правый край стрелки
        this.ctx.lineTo(this.centerX, this.centerY - this.radius + arrowHeight / 2); // Верхушка стрелки
        this.ctx.closePath();
        this.ctx.fill();

        // Устанавливаем цвет обводки
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2; // Устанавливаем ширину обводки
        this.ctx.stroke(); // Рисуем обводку
    }

    drawCanvas() {
        this.drawCircleWithSectors(); // Рисую круг с секторами
        this.drawArrow(); // Рисую указатель

        this.drawCircle(this.radius / 8, 'white');
        this.drawCircle(this.radius / 9, 'green');
    }

    /******************************************************************* */

    #getSectorName(sector, startAngle, endAngle) {
        if (this.angle > 1.5 * Math.PI) {
            if (startAngle % (Math.PI * 2) <= Math.PI * 1.5 && endAngle % (Math.PI * 2) > Math.PI * 1.5) {
                this.infoItem.textContent = sector.name;
            }
            if (
                startAngle % (Math.PI * 2) <= Math.PI * 1.5 &&
                endAngle % (Math.PI * 2) < Math.PI * 1.5 &&
                startAngle % (Math.PI * 2) > endAngle % (Math.PI * 2)
            ) {
                this.infoItem.textContent = sector.name;
            }
        }
    }

    /******************************************************************* */
    // Функция параболы для анимации с ускорением и замедлением
    parabolicFunc(timeNorm) {
        // return (1 - Math.pow(timeNorm - 0.5, 2) * 4) * 0.1;
        return (1 - Math.pow(timeNorm - 0.5, 2) * 4) * 0.4;
    }

    // Функция для анимации
    animate(duration) {
        if (!this.duration) {
            this.duration = duration; // остановка всегда в одном месте
            // this.duration = duration + Math.floor(Math.random() * 5) * 100; // для большего рандома меняю длительность анимации от 0 до 0,4с
            this.startTime = performance.now();
            this.endTime = this.startTime + this.duration;
        }

        const currentTime = performance.now();
        const elapsed = currentTime - this.startTime;
        const timeNorm = Math.min(elapsed / this.duration, 1);

        const parabolTimeNorm = this.parabolicFunc(timeNorm);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Очищаею canvas

        this.angle += parabolTimeNorm;
        this.drawCanvas();

        if (timeNorm < 1) {
            requestAnimationFrame(() => this.animate(duration));
            this.startButton.disabled = true;
            this.startButton.title = '';
            this.infoItem.classList.remove('info-result');
        } else {
            // Сброс состояния для следующего запуска
            this.duration = null;
            this.startTime = null;
            this.endTime = null;

            this.startButton.disabled = false;
            this.startButton.title = 'Pick';

            // infoItem.style.color = 'rgb(3 241 231)';
            this.infoItem.classList.add('info-result');
            this.angle = 1.5 * Math.PI; // чтобы отрисовка начиналась с верхней точки
        }
    }
}

// const canvas = new Canvas(option);
// // const canvas = new Canvas(weightArr, optionText);

// startButton.addEventListener('click', () => {
//     if (durationItem.value >= 6) {
//         const durationRandom = durationItem.value * 1000 + Math.floor(Math.random() * 8) * 100; // для большего рандома меняю длительность анимации от 0 до 0,4с
//         canvas.animate(durationRandom);
//         // canvas.animate(durationItem.value * 1000);
//     }
//     // canvas.animate(10000);
// });

// canvas.drawCanvas();

// // wheelPage();
