import { levelArr, levelKeyboardMap, inputText, infoArr, nextButton } from "./variables.js";
import { shuffleArray, getRandomIntegerArr } from "./elementUtils.js";
import { keysArr, logicKeyboard } from "./keyboard.js";
import { level } from "./level.js";
// import { keysArr, logicKeyboard, disableKeyboard, activeKeyboard } from "./keyboard.js";

let sequence = []
const userSequence = { value: '' }
const flagRepeatSequence = { value: true };

function createSequence (roundNum) {
  const lengthSequence = roundNum * 2;

  // Нахожу активный уровень
  const activeElement = levelArr.find(el => el.classList.contains('active'));

  // Получаю набор символов, соотв. уровню
  const levelKeyboardStr = levelKeyboardMap.get(activeElement);

  const maxIndex = levelKeyboardStr.length - 1;

  sequence = getRandomIntegerArr(0, maxIndex, lengthSequence, levelKeyboardStr)
}

/************************************** */

function isMobileDevice() {
  // console.log(navigator.userAgent)
  // console.log(/Mobi|Android/i.test(navigator.userAgent))
  return /Mobi|Android/i.test(navigator.userAgent);
}

// isMobileDevice()

/************************************** */
//  Чтобы дождаться голоса загрузки голоса

const voiceManager = {
  voices: [],
  voicesLoaded: false,
  resolveVoices: null,

  init() {
    speechSynthesis.onvoiceschanged = () => {
      this.voices = speechSynthesis.getVoices();
      this.voicesLoaded = true; // Ставлю флаг true, когда голоса загружены
      if (this.resolveVoices) {
        this.resolveVoices(); // Запускаю все функции, которые ждут загрузки голосов
      }
    };
  },

  waitForVoices() {
    // Если голоса уже загружены, сразу поехали - разрешаем промис
    if (this.voicesLoaded) {
      return Promise.resolve();
    }

    // Если голоса еще не загружены, создаем новый промис
    return new Promise((resolve) => {
      this.resolveVoices = resolve; // Сохраняем resolve в переменной для использования в onvoiceschanged
    });
  }
};

// Запускаю слушатель загрузки голосов voiceManager
// voiceManager.init();

if(!isMobileDevice()) {
  voiceManager.init();
}


/************************************** */

function speak (str) {
  window.speechSynthesis.cancel(); // На всякий случай отменяю предыдущее высказывание
  const utterance = new SpeechSynthesisUtterance(str);
  utterance.rate = 1; // скорость произнесения
  utterance.pitch = 1;
  utterance.volume = 1;
  // utterance.lang = 'en-GB'; // Устанавливаю язык

  const voices = speechSynthesis.getVoices();
  // console.log(voices)
  // Поиск первого голоса с lang: "en-GB"
  const selectedVoice = voices.find(voice => voice.lang === 'en-GB');
  if (selectedVoice) {
    utterance.voice = selectedVoice; // Устанавливаю найденный голос
  } else {
    console.warn("Voice with lang 'en-GB' not found.");
    utterance.voice = voices[0]; // Запасной голос, если нужный не найден
  }

  return new Promise((resolve) => {
    utterance.onend = resolve;
    window.speechSynthesis.speak(utterance);
  });
};


/************************************** */

function activateKey(seqEl) {
  return new Promise((resolve) => {
    const tile = keysArr.find(el => el.getAttribute('data-key') === seqEl);

    tile.classList.add('active-seq');

    // Динамически устанавливаю длительность анимации
    const animationDuration = '1s';
    tile.style.animationDuration = animationDuration; 

    const numericDuration = parseFloat(animationDuration); 
    // Получаю длительность анимации, что бы корректно установить разделитель между одинаковыми клавишами
    const durationSeparator = numericDuration * 1000 + 300; // Разделяю в 300мл

    // Запускаем произнесение текста
    // const speechPromise = speak(inputText.placeholder);
    // const speechPromise = speak(`Finished activating key: ${seqEl}`);
    
    // const speechPromise = speak(seqEl);
    // let speechPromise = null
    // if(!isMobileDevice()) {
    //   speechPromise = speak(seqEl)
    // }

    // const speechPromise = !isMobileDevice() ? speak(seqEl).catch(err => {
    //   console.error('Speech synthesis error:', err);
    // }) : null;
    // даёт зависание на одинаковых клавишах лучше разрешать (resolve Промис)

    const speechPromise = !isMobileDevice() ? speak(seqEl).catch(err => {
      console.error('Speech synthesis error:', err);
    // }) : Promise.resolve(); // Возвращаем промис при мобильных устройствах (потом их разделю settimeout)
    }) : new Promise(resolve => setTimeout(resolve, durationSeparator)); // Разделяю одинаковые задержкой в 300ms



    // Слушаем событие завершения анимации
    const animationPromise = new Promise((animResolve) => {
      tile.addEventListener('animationend', () => {
          tile.classList.remove('active-seq');
          animResolve();
      }, { once: true }); // обработчик будет вызван только один раз
    });

    // Ждем, пока завершатся оба процесса
    const promises = [animationPromise]; // изменил формирование массива промисов чтобы исключить null
    // if (speechPromise) {
    //   promises.push(speechPromise);
    // }
    promises.push(speechPromise); // добавляем speakPromise, который стоит Promise.resolve (setTimeout) для мобильных устройств


    Promise.all(promises).then(() => {
      resolve();
    }).catch(err => {
      console.error('Error during activation:', err);
      resolve(); // Завершаем даже в случае ошибки
    });

    // Promise.all([speechPromise, animationPromise]).then(() => {
    //   // console.log(`Finished activating key: ${seqEl}`);
    //   resolve();
    // }).catch(err => {
    //   console.error('Error during activation:', err);
    //   resolve(); // Завершаем даже в случае ошибки
    // });
  });
}

/******************** */

async function playSequence(index = 0) {
  infoArr.forEach((el, index) => {
    if (index !== 0) { // пропускаю round
      el.classList.add('disabled')
    }
  });

  document.removeEventListener('keydown', logicKeyboard);

  inputText.placeholder = 'remember the sequence';

  // останавливаю работу клавы пока играет последовательность
  if (index < sequence.length) {
    await activateKey(sequence[index]); // Активирую текущую клавишу и жду, пока завершится
    playSequence(index + 1); // Рекурсивно вызываю функцию для следующего индекса
  } else { // когда доиграет всё включаю
    keysArr.forEach(el => {
      el.classList.remove('disabled');
    });

    document.addEventListener('keydown', logicKeyboard);

    infoArr.forEach((el) => {
      el.classList.remove('disabled');
    });

    inputText.placeholder = 'type the sequence';

    if (!flagRepeatSequence.value) infoArr[2].classList.add('disabled');
  }
}

/*************************** */

function repeatSequence () {
  if (!flagRepeatSequence) return;

  inputText.placeholder = 'remember the sequence'
  inputText.value = ''

  keysArr.forEach(el => {
    el.classList.add('disabled')
  })

  setTimeout(() => {
    playSequence();
  }, 1000);

  flagRepeatSequence.value = false;
  // infoArr[2].classList.add('disabled')
}

/****************************************** */

function checkUserSequence() {
  const {value} = userSequence;
  const currentIndex = value.length - 1;

  // Сравниваю инпут с последовательностью
  if (value[currentIndex].toLowerCase() !== sequence[currentIndex].toLowerCase()) {

    if (!flagRepeatSequence.value) {

      inputText.value = `Lose. Game over`
      document.removeEventListener('keydown', logicKeyboard);

      keysArr.forEach(el => {
        el.classList.add('disabled')
      })

      infoArr[2].classList.add('visually-hidden')
      return
    } else {
      inputText.value = `Error. Try again`
      document.removeEventListener('keydown', logicKeyboard);

      keysArr.forEach(el => {
        el.classList.add('disabled')
      })
    }
    return
  }

  // Проверяю, завершена ли последовательность
  if (value.length === sequence.length) {

    nextButton.classList.remove('visually-hidden')
    // infoArr[2].classList.add('disabled')
    infoArr[2].classList.add('visually-hidden')

    keysArr.forEach(el => {
      el.classList.add('disabled')
    })

    // ограничение на количество раундов
    if (level.value === 5) {
      level.value = 1;
      inputText.value = `You win! Hooray!`
      document.removeEventListener('keydown', logicKeyboard);

      infoArr[0].textContent = '';  // убираю текст записи раундов
      infoArr[0].classList.add('visually-hidden')
      nextButton.classList.add('visually-hidden')
      return
    }

    inputText.value = `win. Next round ${level.value + 1}`
    document.removeEventListener('keydown', logicKeyboard);
  }

}

/****************************************** */


export { createSequence, sequence, playSequence, repeatSequence, flagRepeatSequence, userSequence, checkUserSequence, voiceManager, isMobileDevice }
