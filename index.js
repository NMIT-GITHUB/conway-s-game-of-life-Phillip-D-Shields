function GameOfLifeBoard() {
    this.board = [...Array(10)].map((row) => Array(10));
    this.board.forEach((row) => (row += "\n"));
}

const randomFillBoard = (input) => {
  for (let i = 0; i < input.board.length; i++) {
    for (let j = 0; j < input.board.length; j++) {
      input.board[i][j] = randomFillSquare();
    }
  }
  return input;
};

const randomFillSquare = () => (Math.floor(Math.random() * 10) >= 6 ? 1 : 0);

const illustrateBoard = (input) => {
  const visualBoard = input.board.map((row) => row.join(" ") + "\n").join("");
  return console.log(visualBoard);
};

const createUpdatedBoard = (input) => {
  let newBoard = [...Array(10)].map((row) => Array(10));

  for (let i = 0; i < input.board.length; i++) {
    for (let j = 0; j < input.board.length; j++) {
      let count = checkEnvOfCell(input, i, j);
      // if (isAlive(input, i, j)) newBoard[i][j] = fillSquare(count);
      // else if (isRebirth(input,i,j,count)) newBoard[i][j] = 1;
      // else newBoard[i][j] = 0;
      newBoard = fillNewBoard(count,input,newBoard,i,j);
    }
  }
  return (input.board = newBoard);
};

const fillNewBoard = (count, input, newBoard, i, j) => {
  if (input.board[i][j] === 1) {
    newBoard[i][j] = fillSquare(count);
  } else if (input.board[i][j] === 0 && count === 3) {
    newBoard[i][j] = 1;
  } else {
    newBoard[i][j] = 0;
  }
  return newBoard;
};

// const isAlive = (input,i,j) => (input.board[i][j] === 1); 
// const isRebirth = (input,i,j,count) => (input.board[i][j] === 0 && count === 3);
const fillSquare = (count) => {
  return count > 1 && count < 4 ? 1 : 0;
};
const checkEnvOfCell = (input, i, j) => {
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
  });

  return count;
};
const envXAxisCheck = (x) => {
  if (x[0] < 0 || x[0] >= 10) return true;
};
const envYAxisCheck = (x) => {
  if (x[1] < 0 || x[1] >= 10) return true;
};

let test = new GameOfLifeBoard();
console.log(test);

randomFillBoard(test);
illustrateBoard(test);
createUpdatedBoard(test);
illustrateBoard(test);
