
// Пробую реализовать универсальный таймер нового года
// чтобы сайт не был одноразовым

const daysDoc = document.querySelector('.timer__item--day')
const hoursDoc = document.querySelector('.timer__item--hour')
const minutesDoc = document.querySelector('.timer__item--minute')
const secondsDoc = document.querySelector('.timer__item--second')

const currentYear = new Date().getFullYear();
const newNextYear = new Date(currentYear + 1, 0, 1, 0, 0, 0, 0)

// console.log(newNextYear)
// console.log(newNextYear.toString()); // Вывод в локальном часовом поясе
// console.log(newNextYear.toLocaleString()); // Вывод в более удобном формате


function timerNewYear(newNextYear) {
  const currentTime = Date.now();
  const totalMilliseconds = newNextYear - currentTime;

  const seconds = Math.floor(totalMilliseconds / 1000 % 60)
  const minutes = Math.floor(totalMilliseconds / 1000 / 60 % 60)
  const hours = Math.floor(totalMilliseconds / 1000 / 60 / 60 % 24)
  const days = Math.floor(totalMilliseconds / 1000 / 60 / 60 / 24)

  return { seconds, minutes, hours, days }
}

const timerNewYearInterval = () => timerNewYear(newNextYear)

function timerContentWriter () {
  const { seconds, minutes, hours, days } = timerNewYearInterval ();
  daysDoc.textContent = `${days}`
  hoursDoc.textContent = `${hours}`
  minutesDoc.textContent = `${minutes}`
  secondsDoc.textContent = `${seconds}`
}

function timerInit () {
  setInterval(timerContentWriter, 1000);
}

export { timerInit }