const score = `
Привет. Начинаем Nonograms
`;

function signatureScore() {
  console.log(score);
  console.log(
    '%c   /\\     /\\  \n  //\\\\___//\\\\\n  \\\\       //\n   \\\\o _ \o//    \n    \\ /=\\ /  \n       \' ',
    'color: orange; font-weight: bold; font-size: 12px;',
  );
}

export { signatureScore };
