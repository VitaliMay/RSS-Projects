const score = `
Привет! Вроде как всё по ТЗ.
В коде, конечно, полно мусора и дублирования выше крыши.

Адаптации пока нет()
Мелкие баги имеются и, думаю, ты их найдешь :)
И я что-то из них устранял, а потом вернул, т.к. змейка становилась более тупой ))

Ну, а дизайн - вот такой из меня дизайнер((
В общем и целом, думаю, максимальный балл я заработал ))
P.S. На код лучше не смотри, там очень коряво

`

function signatureScore () {
  console.log(score)
  console.log(
    '%c   /\\     /\\  \n  //\\\\___//\\\\\n  \\\\       //\n   \\\\o _ \o//    \n    \\ /=\\ /  \n       \' ',
    'color: orange; font-weight: bold; font-size: 12px;'
  );
}

export { signatureScore };

