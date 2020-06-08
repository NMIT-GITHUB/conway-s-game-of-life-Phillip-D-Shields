// create cell class
class Cell {
  // set constructor with context and position
  constructor(context, locX, locY) {
    this.height = 10;
    this.width = 10;
    this.context = context;

    // position
    this.locX = locX;
    this.locY = locY;

    // random start
    this.alive = Math.random() > 0.5;
  }

  draw() {
    // draw a square, the state determines color
    this.context.fillStyle = this.alive ? "#ff8080" : "#303030";
    this.context.fillRect(
      this.gridX * this.width,
      this.gridY * this.height,
      this.width,
      this.height
    );
  }
}

class Game {
  constructor(canvasId) {
    this.cols = 30;
    this.rows = 30;
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    this.gameBoard = [];

    this.createGrid();

    // Request an animation frame for the first time
    // The gameLoop() function will be called as a callback of this request
    window.requestAnimationFrame(() => this.gameLoop());
  }

  createGrid() {
    // rows
    for (let r = 0; r < this.rows; r++) {
      // cols
      for (let c = 0; c < this.cols; c++) {
        // create new cells and push them onto the board
        this.gameBoard.push(new Cell(this.context, c, r));
      }
    }
  }
  isAlive(r, c) {
    if (r < 0 || r >= this.rows || c < 0 || c >= this.cols) return false;

    return this.gameBoard[this.gridIndex(r, c)].alive ? 1 : 0;
  }

  gridIndex(r, c) {
    return r + c * this.cols;
  }

  checkEnv() {
    // rows
    for (let r = 0; r < this.rows; r++) {
      // cols
      for (let c = 0; c < this.cols; c++) {
        // gather the surrounding env count of live cells
        let count =
          this.isAlive(c, r + 1) +
          this.isAlive(c, r - 1) +
          this.isAlive(c - 1, r) +
          this.isAlive(c + 1, r) +
          this.isAlive(c - 1, r - 1) +
          this.isAlive(c - 1, r + 1) +
          this.isAlive(c + 1, r - 1) +
          this.isAlive(c + 1, r + 1);

        let center = this.gridIndex(r, c);

        if (count === 2) {
          // keep the same
          this.gameBoard[center].nextAlive = this.gameBoard[center].alive;
        } else if (count === 3) {
          // rebirth!!
          this.gameBoard[center].nextAlive = true;
        } else {
          // death
          this.gameBoard[center].nextAlive = false;
        }
      }
    }
    // new state for cell
    for (let i = 0; i < this.gameBoard.length; i++) {
      this.gameBoard[i].alive = this.gameBoard[i].nextAlive;
    }
  }

  gameLoop() {
    // check the surroundings of each cell
    this.checkEnv();
    // clear the screen
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw board
    for (let i = 0; i < this.gameBoard.length; i++) {
      this.gameBoard[i].draw();
    }
    // after the loop finishes, request new frames
    setTimeout(() => {
      window.requestAnimationFrame(() => this.gameLoop());
    }, 100); // 100 = timeout timer
  }
}

window.onload = () => {
    // The page has loaded, start the game
    let gameWorld = new GameWorld('canvas');
  }
