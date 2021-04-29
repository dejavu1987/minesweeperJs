import { Minesweeper } from '../src/index';

const ms = new Minesweeper(5);

describe(Minesweeper, () => {
  test('should return a board', () => {
    expect(ms.board).toBeDefined();
    console.log(ms.board);
  });
});
