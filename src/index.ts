import path from 'path';
import { loadFile } from './load';
import { Coordinate, RoverState } from './types';
import { runRover } from './rover';
import { createIsLostRect } from './mars';

const filePath = path.join(__dirname, '..', process.argv[2]);
const instructions = loadFile(filePath);

const isLost = createIsLostRect(instructions.grid);
const roverRests = instructions.rovers.reduce(
  (accum: RoverState[], rover) => [
    ...accum,
    runRover(rover, isLost, accum)
  ], []
);

roverRests.forEach((rover) => {
  console.log(`${rover.x} ${rover.y} ${rover.dir} ${rover.isLost ? 'LOST' :''}`)
});
