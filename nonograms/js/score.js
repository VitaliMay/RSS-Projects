const score = `
Привет. Вроде всё по ТЗ, но
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
