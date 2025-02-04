const winnersArr = [
  { matrixName: 'butterfly', gridSize: 5, timer: 13 },
  { matrixName: 'sun', gridSize: 5, timer: 8 },
];

winnersArr.sort((a, b) => a.timer - b.timer);

console.log(winnersArr);

const modalWinnersElement = createEl({
  classes: ['winners-item'],
  parent: modalWinnersBlock,
});

createEl({
  classes: ['winners-item__el', 'winners-item__el_index'],
  parent: modalWinnersElement,
  text: index,
});

createEl({
  classes: ['winners-item__el', 'winners-item__el_name'],
  parent: modalWinnersElement,
  text: matrixName,
});

createEl({
  classes: ['winners-item__el', 'winners-item__el_size'],
  parent: modalWinnersElement,
  text: gridSize,
});

createEl({
  classes: ['winners-item__el', 'winners-item__el_time'],
  parent: modalWinnersElement,
  text: timer,
});
