import Brick from '../src/brick';

export function buildLevel(game, level) {
  let bricks = [];
  let type = 0;

  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if(brick === 1) {

        let position = {
          x: 64 * brickIndex,
          y: 50 + 25 * rowIndex,
        }

          let type = 1;
          let maxLife = 1;
          let damage = 0;


        bricks.push(new Brick(game, position, type, maxLife, damage))
      }else if(brick === 2) {
        let position = {
          x: 64 * brickIndex,
          y: 50 + 25 * rowIndex,
        }

         let type = 2;
         let maxLife = 2;
         let damage = 0;

        bricks.push(new Brick(game, position, type, maxLife, damage))
      }
    });
  });

  return bricks;
}

export const level1 = [
//  [0,1,0,1,0,1,0,1,0,1],
//  [0,1,0,1,0,1,0,1,0,1],
//  [0,1,1,1,0,1,0,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];
export const level2 = [
//[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
//[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];