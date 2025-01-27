const data = {
  butterfly: {
    matrix: [
      [1, 0, 0, 0, 1],
      [1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1],
      [1, 0, 0, 0, 1],
    ],
  },
};

const animal = 'butterfly';
console.log(`matrix ${animal}`, data[animal].matrix);
// console.log(data.butterfly.matrix);

export { data };
