export const soundObj = {
    isSoundOn: true,
    succesSound: new Audio('./assets/audio/winner-03.mp3'),
    // clickSound: new Audio('./assets/audio/click-02.mp3'),
    // noClickSound: new Audio('./assets/audio/click-03.mp3'),
    // crossSound: new Audio('./assets/audio/crossed-02.mp3'),
    // noCrossSound: new Audio('./assets/audio/crossed-01.mp3'),
};

export function playSound(sound) {
    if (soundObj.isSoundOn) {
        sound.currentTime = 0;
        sound.play(); // Проигрываем звук, если он включен
    }
}

/******************************************************************* */

// Проверяю локальное хранилище на наличие сохраненной темы
const savedSound = localStorage.getItem('VitaliMay_DMT_sound_ON');

// По умолчанию 'true', если сохраненное значение не найдено

if (savedSound === null) {
    soundObj.isSoundOn = true; // Устанавливаем значение по умолчанию
    localStorage.setItem('VitaliMay_DMT_sound_ON', 'true');
} else {
    soundObj.isSoundOn = savedSound === 'true';
}
