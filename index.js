
//
class GameOfLifeBoard {
  constructor() {
    this.board = [...Array(10)].map((row) => Array(10));
    this.board.forEach((row) => (row += "\n"));
  }
}

const randomFillBoard = (input) => {
  console.log(input.board);

  for (let i = 0; i < input.board.length; i++) {
    for (let j = 0; j < input.board.length; j++) {
      input.board[i][j] = randomFillSquare();
    }
  }
  return input;
};

const randomFillSquare = () => (Math.floor(Math.random() * 10) >= 6 ? 1 : 0);

const illustrateBoard = (input) => {
  const visualBoard = input.board.map((row) => row.join(' ') + '\n').join('');
  console.log(visualBoard)
}

const createUpdatedBoard = (input) => {
  let newBoard = [...Array(10)].map((row) => Array(10));

  for (let i = 0; i < input.board.length; i++) {
    for (let j = 0; j < input.board.length; j++) {
      // add logic to identify if current cell has value of 1 or 0
      let count = checkEnvOfCell(input,i,j);

      if (input.board[i][j] === 1) {
        (count > 1 && count < 4) ? newBoard[i][j] = 1 : newBoard[i][j] = 0;
      } else if (input.board[i][j] === 0 && count === 3) {
        newBoard[i][j] = 1;
      } else {
        newBoard[i][j] = 0;
      }
    }
  }
  return input.board = newBoard;
}

const checkEnvOfCell = (input,i,j) => {
  let count = 0;
  const env = [
    [i, j + 1],
    [i, j - 1],
    [i - 1, j],
    [i + 1, j],
    [i - 1, j - 1],
    [i - 1, j + 1],
    [i + 1, j - 1],
    [i + 1, j + 1],
  ];

  env.forEach((x) => {
    if (!envXAxisCheck(x) && !envYAxisCheck(x)) {
    count += input.board[x[0]][x[1]];
    }
  })

  return count;
}
const envXAxisCheck = (x) => {
  if (x[0] < 0 || x[0] >= 10) return true;
}
const envYAxisCheck = (x) => {
  if  (x[1] < 0 || x[1] >= 10) return true;
}





let test = new GameOfLifeBoard();
console.log(test);

console.log(randomFillBoard(test));
illustrateBoard(test)
createUpdatedBoard(test);
illustrateBoard(test)
