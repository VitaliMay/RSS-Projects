const score = `
Привет. Если будет возможность, пересмотри работу в последний день кросс-чека, плиз.
Не закончил и
Откровенно стыдно, за ересь, которую отправил в сабмит(
`;

function signatureScore() {
  console.log(score);
  console.log(
    '%c   /\\     /\\  \n  //\\\\___//\\\\\n  \\\\       //\n   \\\\o _ \o//    \n    \\ /=\\ /  \n       \' ',
    'color: orange; font-weight: bold; font-size: 12px;',
  );
}

export { signatureScore };
