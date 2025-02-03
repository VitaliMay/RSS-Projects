import { settingSound } from './interface.js';

const soundObj = {
  isSoundOn: true,
  succesSound: new Audio('./assets/audio/winner-03.mp3'),
  clickSound: new Audio('./assets/audio/click-02.mp3'),
  crossSound: new Audio('./assets/audio/crossed-01.mp3'),
};

function playSound(sound) {
  if (soundObj.isSoundOn) {
    sound.play(); // Проигрываем звук, если он включен
  }
}
// console.log('Привет звук');

settingSound.addEventListener('click', toggleSound);

function toggleSound() {
  soundObj.isSoundOn = !soundObj.isSoundOn; // Переключаем состояние звука
  const soundState = soundObj.isSoundOn ? 'Sound ON' : 'Sound OFF';
  settingSound.textContent = soundState;
}

export { soundObj, playSound };
