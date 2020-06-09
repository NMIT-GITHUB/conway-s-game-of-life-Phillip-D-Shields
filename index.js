// // create cell class
// class Cell {
//   height = 10
//   width = 10
//     // set constructor with context and position
//   constructor(context, locX, locY) {
//     this.context = context;

//     // position
//     this.locX = locX;
//     this.locY = locY;

//     // random start
//     this.alive = Math.random() > 0.5;
//   }
    
//   draw() {
//     // draw a square, the state determines color
//     this.context.fillStyle = this.alive ? "#ff8080" : "#303030";
//     this.context.fillRect(
//       this.gridX * Cell.width,
//       this.gridY * Cell.height,
//       Cell.width,
//       Cell.height
//     );
//   }
// }

// class Game {
    
//   constructor(canvasId) {
    
//     this.canvas = document.getElementById(canvasId);
//     this.context = this.canvas.getContext("2d");
//     this.gameBoard = [];

//     this.createGrid();

//     // Request an animation frame for the first time
//     // The gameLoop() function will be called as a callback of this request
//     window.requestAnimationFrame(() => this.gameLoop());
//   }

//   static cols = 30;
//   static rows = 30;
//   createGrid() {
//     // rows
//     for (let r = 0; r < Game.rows; r++) {
//       // cols
//       for (let c = 0; c < Game.cols; c++) {
//         // create new cells and push them onto the board
//         this.gameBoard.push(new Cell(this.context, c, r));
//       }
//     }
//   }
//   isAlive(r, c) {
//     if (r < 0 || r >= Game.rows || c < 0 || c >= Game.cols) return false;

//     return this.gameBoard[this.gridIndex(r, c)].alive ? 1 : 0;
//   }

//   gridIndex(r, c) {
//     return r + c * Game.cols;
//   }

//   checkEnv() {
//     // rows
//     for (let r = 0; r < Game.rows; r++) {
//       // cols
//       for (let c = 0; c < Game.cols; c++) {
//         // gather the surrounding env count of live cells
//         let count =
//           this.isAlive(c, r + 1) +
//           this.isAlive(c, r - 1) +
//           this.isAlive(c - 1, r) +
//           this.isAlive(c + 1, r) +
//           this.isAlive(c - 1, r - 1) +
//           this.isAlive(c - 1, r + 1) +
//           this.isAlive(c + 1, r - 1) +
//           this.isAlive(c + 1, r + 1);

//         let center = this.gridIndex(r, c);

//         if (count === 2) {
//           // keep the same
//           this.gameBoard[center].nextAlive = this.gameBoard[center].alive;
//         } else if (count === 3) {
//           // rebirth!!
//           this.gameBoard[center].nextAlive = true;
//         } else {
//           // death
//           this.gameBoard[center].nextAlive = false;
//         }
//       }
//     }
//     // new state for cell
//     for (let i = 0; i < this.gameBoard.length; i++) {
//       this.gameBoard[i].alive = this.gameBoard[i].nextAlive;
//     }
//   }

//   gameLoop() {
//     // check the surroundings of each cell
//     this.checkEnv();
//     // clear the screen
//     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     // draw board
//     for (let i = 0; i < this.gameBoard.length; i++) {
//       this.gameBoard[i].draw();
//     }
//     // after the loop finishes, request new frames
//     setTimeout(() => {
//       window.requestAnimationFrame(() => this.gameLoop());
//     }, 100); // 100 = timeout timer
//   }
// }

// window.onload = () => {
//     // The page has loaded, start the game
//     let game = new Game('canvas');
//   }

class GameOfLife {
  constructor() {
    this.board = [...Array(10)].map((row) => Array(10));
    
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        this.board[i][j] = this.randomSquare()
      }     
    }

    this.board.forEach((row) => (row += '\n'));
  }

  randomSquare() {
    let random = Math.floor(Math.random() * 10);
    // console.log(random);
    return random >= 6 ? '1' : '0';
     
  }

  drawBoard() {
    return this.board.map((row) => row.join(' ') + '\n').join('');
  }
}

let test = new GameOfLife();

console.log(test.drawBoard());