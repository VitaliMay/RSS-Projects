
const score = `
Привет. Вроде как всё по ТЗ и всё работает)
Проверка подключения:
- правила игры
- настройки

Merry Christmas!
`

function signatureScore () {
  console.log(score)
  console.log(
    '%c   /\\     /\\  \n  //\\\\___//\\\\\n  \\\\       //\n   \\\\o _ \o//    \n    \\ /=\\ /  \n       \' ',
    'color: orange; font-weight: bold; font-size: 12px;'
  );
}

export { signatureScore }