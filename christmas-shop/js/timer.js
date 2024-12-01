
// Пробую реализовать универсальный таймер нового года
// чтобы сайт не был одноразовым

const daysDoc = document.querySelector('.timer__item--day')
const hoursDoc = document.querySelector('.timer__item--hour')
const minutesDoc = document.querySelector('.timer__item--minute')
const secondsDoc = document.querySelector('.timer__item--second')

const titleArrDoc = [...document.querySelectorAll('.timer__date')]

const currentYear = new Date().getFullYear();
const newNextYear = new Date(Date.UTC(currentYear + 1, 0, 1, 0, 0, 0, 0)) // По ТЗ в UTC+0
// newNextYear.setHours(newNextYear.getHours() - 3); // Минское время UTC+3
// const newNextYear = new Date(currentYear + 1, 0, 1, 0, 0, 0, 0)

// console.log(newNextYear)
// console.log(newNextYear.toString()); // Вывод в локальном часовом поясе
// console.log(newNextYear.toLocaleString()); // Вывод в более удобном формате

/************************************************** */


const timerTitleWriter = (days, hours, minutes, seconds) => {

  const timeItem = [
    { single: 'day', plural: 'days', value: days },
    { single: 'hour', plural: 'hours', value: hours },
    { single: 'minute', plural: 'minutes', value: minutes },
    { single: 'second', plural: 'seconds', value: seconds }
  ];

  timeItem.forEach((item, index) => {
    titleArrDoc[index].textContent = item.value === 1 ? item.single : item.plural;
  });
}


/************************************************** */

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
  if (!daysDoc) return;  // если нет переменных функция не работает
  daysDoc.textContent = `${days}`
  hoursDoc.textContent = `${hours}`
  minutesDoc.textContent = `${minutes}`
  secondsDoc.textContent = `${seconds}`

  // if (seconds === 1) {
  //   titleArrDoc[3].textContent = 'second'
  // } else { titleArrDoc[3].textContent = 'seconds' }

  // titleArrDoc[0].textContent = (days === 1) ? 'day' : 'days'
  // titleArrDoc[1].textContent = (hours === 1) ? 'hour' : 'hours'
  // titleArrDoc[2].textContent = (minutes === 1) ? 'minute' : 'minutes'
  // titleArrDoc[3].textContent = (seconds === 1) ? 'second' : 'seconds'

  // По ТЗ не надо
  // timerTitleWriter(days, hours, minutes, seconds)

}

function timerInit () {
  timerContentWriter() // чтобы сразу сработало
  setInterval(timerContentWriter, 1000);
}

export { timerInit }