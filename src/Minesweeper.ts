/**
 * @package Minesweeper
 *
 * Generate Minesweeper board
 */

/**
 * Board matrix
 * @beta
 */
export type board = number[][];

/**
 * Minesweeper Class let you build a minesweeper board
 *
 * @public
 */
export class Minesweeper {
  readonly MINE: number = 9;

  boardMax: number;

  mines: string[];

  board: board;

  /**
   * Creates an instance of Minesweeper.
   * @param {number} level - Higher level -> bigger board -> more mines
   */
  constructor(level: number) {
    this.boardMax = 5 + level * 2;
    this.mines = [];

    while (this.mines.length < level * level + 5) {
      const newMine = `${this.randomMax(this.boardMax)},${this.randomMax(
        this.boardMax
      )}`;
      if (!this.mines.includes(newMine)) this.mines.push(newMine);
    }
    this.board = new Array(this.boardMax)
      .fill('')
      .map(() => new Array(this.boardMax).fill(0));
    this.fillTheBoard();
  }

  /**
   * Fill the Board
   *
   */
  private fillTheBoard(): void {
    this.mines.forEach((mine) => {
      const [x, y] = mine.split(',').map((c) => parseInt(c, 10));
      this.addMine(x, y);
    });
  }

  /**
   * Add a mine to the board
   *
   * @param {number} x - x coordinate
   * @param {number} y - y coordinate
   *
   *  @beta
   */
  addMine(x: number, y: number) {
    this.board[x][y] = 9;
    if (x > 0) {
      if (y > 0) {
        const nw = this.board[x - 1][y - 1];
        if (nw !== this.MINE) {
          this.board[x - 1][y - 1] = nw + 1;
        }
      }
      if (y < this.boardMax - 1) {
        const ne = this.board[x - 1][y + 1];
        if (ne !== this.MINE) {
          this.board[x - 1][y + 1] = ne + 1;
        }
      }
      const n = this.board[x - 1][y];
      if (n !== this.MINE) {
        this.board[x - 1][y] = n + 1;
      }
    }
    if (x < this.boardMax - 1) {
      if (y > 0) {
        const sw = this.board[x + 1][y - 1];
        if (sw !== this.MINE) {
          this.board[x + 1][y - 1] = sw + 1;
        }
      }
      if (y < this.boardMax - 1) {
        const se = this.board[x + 1][y + 1];
        if (se !== this.MINE) {
          this.board[x + 1][y + 1] = se + 1;
        }
      }
      const s = this.board[x + 1][y];
      if (s !== this.MINE) {
        this.board[x + 1][y] = s + 1;
      }
    }
    if (y > 0) {
      const w = this.board[x][y - 1];
      if (w !== this.MINE) {
        this.board[x][y - 1] = w + 1;
      }
    }
    if (y < this.boardMax - 1) {
      const e = this.board[x][y + 1];
      if (e !== this.MINE) {
        this.board[x][y + 1] = e + 1;
      }
    }
  }

  /**
   *
   * @param max
   */
  private randomMax(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
