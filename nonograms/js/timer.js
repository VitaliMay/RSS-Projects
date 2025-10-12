import { createEl } from './elementUtils.js';
// import { canvasContainer } from './interface.js';

class Timer {
  constructor(canvasContainer) {
    this.timerBox = createEl({
      classes: ['timer-box'],
      parent: canvasContainer,
    });
    this.minutesDoc = createEl({
      classes: ['timer-box__item'],
      // text: '00',
      parent: this.timerBox,
    });
    createEl({
      classes: ['timer-box__separator'],
      text: ':',
      parent: this.timerBox,
    });
    this.secondsDoc = createEl({
      classes: ['timer-box__item'],
      // text: '00',
      parent: this.timerBox,
    });

    this.currentTimeSec = 0;
    this.timerInterval = 1000;
    this.intervalId = null; // чтобы ловить запущенный таймер

    // this.init();
    this.timerContentWriter();
  }

  timer() {
    if (this.intervalId) {
      this.currentTimeSec += 1;
    }
    const minutes = Math.floor(this.currentTimeSec / 60);
    // .toString()
    // .padStart(2, '0');
    const seconds = this.currentTimeSec % 60;
    // const seconds = (this.currentTimeSec % 60).toString().padStart(2, '0');

    return { seconds, minutes };
  }

  totalTime() {
    return this.currentTimeSec;
  }

  timerContentWriter() {
    const { seconds, minutes } = this.timer();
    this.minutesDoc.textContent = minutes.toString().padStart(2, '0');
    this.secondsDoc.textContent = seconds.toString().padStart(2, '0');
  }

  init() {
    if (!this.intervalId) {
      // this.timerContentWriter(); // чтобы сразу сработало
      this.intervalId = setInterval(
        () => this.timerContentWriter(),
        this.timerInterval,
      );
    }
  }

  // При победе лучше останавливать время
  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  reset() {
    clearInterval(this.intervalId);
    this.intervalId = null; // Сбрасываю ID интервала
    this.currentTimeSec = 0;
    this.timerContentWriter(); // Обнуляю табло
  }

  // Метод для установки значения currentTimeSec
  // (для корректног отображения сохранённой игры)
  setTime(seconds) {
    this.currentTimeSec = seconds;
    this.timerContentWriter(); // Обновляю отображение таймера
  }

  // Метод для удаления таймера из разметки
  removeTimer() {
    this.stop();
    if (this.timerBox) {
      this.timerBox.remove();
    }
  }
}

// const timer = new Timer(canvasContainer);
// timer.init();

/*************************************************************** */
/*************************************************************** */

// const timerBox = createEl({ classes: ['timer-box'], parent: canvasContainer });

// const minutesDoc = createEl({ classes: ['timer-box__item'], parent: timerBox });
// createEl({ classes: ['timer-box__separator'], text: ':', parent: timerBox });
// const secondsDoc = createEl({ classes: ['timer-box__item'], parent: timerBox });

// const timerInterval = 1000;
// let curretTimeSec = 0;

// function timer() {
//   curretTimeSec += 1;
//   const minutes = Math.floor(curretTimeSec / 60)
//     .toString()
//     .padStart(2, '0');
//   const seconds = (curretTimeSec % 60).toString().padStart(2, '0');

//   return { seconds, minutes };
// }

// function timerContentWriter() {
//   const { seconds, minutes } = timer();
//   minutesDoc.textContent = `${minutes}`;
//   secondsDoc.textContent = `${seconds}`;
// }

// function timerInit() {
//   timerContentWriter(); // чтобы сразу сработало
//   setInterval(timerContentWriter, timerInterval);
// }

// // timerInit();

// console.log('Привет таймер');

export { Timer };
// export { timerInit };
