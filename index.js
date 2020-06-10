// class GameOfLife {
//   constructor() {
//     this.board = [...Array(10)].map((row) => Array(10));

//     this.board.forEach((row) => (row += "\n"));
//   }

//   buildBoard() {
//     for (let i = 0; i < this.board.length; i++) {
//       for (let j = 0; j < this.board.length; j++) {
//         this.board[i][j] = this.randomSquare();
//       }
//     }
//     return this.board;
//   }

//   randomSquare() {
//     let random = Math.floor(Math.random() * 10);
//     return random >= 6 ? 1 : 0;
//   }

//   drawBoard() {
//     const drawnBoard = this.board.map((row) => row.join(" ") + "\n").join("");
//     console.log(drawnBoard);
//   }

//   updateBoard() {
//     let nextBoard = [...Array(10)].map((row) => Array(10));

//     for (let i = 0; i < this.board.length; i++) {
//       for (let j = 0; j < this.board.length; j++) {
//         let count = 0;

//         const env = [
//           [i, j + 1],
//           [i, j - 1],
//           [i - 1, j],
//           [i + 1, j],
//           [i - 1, j - 1],
//           [i - 1, j + 1],
//           [i + 1, j - 1],
//           [i + 1, j + 1],
//         ];

//         env.forEach((x) => {
//           if (x[0] < 0 || x[0] >= 10 || x[1] < 0 || x[1] >= 10) return false;

//           count += this.board[x[0]][x[1]];
//         });

//         // if (count === 2) {
//         //   nextBoard[i][j] = 2;
//         // } else if (count === 3) {
//         //   nextBoard[i][j] = 3;
//         // } else if (count === 4) {
//         //   nextBoard[i][j] = 4;
//         // } else {
//         //   nextBoard[i][j] = 0;
//         // }
//         // show count in each square to make sure env is calculated correctly
//         nextBoard[i][j] = count;
//       }
//     }
//     return (this.board = nextBoard);
//   }
// }

// let test = new GameOfLife();
// console.log(test);

// console.log(test.buildBoard());
// test.drawBoard()
// test.updateBoard();
// test.drawBoard();

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
      newBoard[i][j] = checkEnvOfCell(input,i,j);
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





// let test = new GameOfLifeBoard();
// console.log(test);

// console.log(randomFillBoard(test));
// illustrateBoard(test)
// createUpdatedBoard(test);
// illustrateBoard(test)
