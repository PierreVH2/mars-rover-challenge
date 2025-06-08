import { RoverDir, directions, RoverState, Rover, IsLostFn } from "./types";

const rotateL = (dir: RoverDir): RoverDir => {
  const newDirIdx = directions.indexOf(dir) - 1;
  return newDirIdx < 0 ? directions[directions.length-1] : directions[newDirIdx];
};

const rotateR = (dir: RoverDir): RoverDir => {
  const newDirIdx = directions.indexOf(dir) + 1;
  return newDirIdx === directions.length ? directions[0] : directions[newDirIdx];
};

const containsPreviousLost = (rover: RoverState, previous: RoverState[]): boolean => {
  return previous.some(
    (prev) => prev.dir === rover.dir && prev.x == rover.x && prev.y === rover.y && prev.isLost
  );
}

const moveForward = (rover: RoverState): RoverState => {
  const newRover = {...rover};
  switch (rover.dir) {
    case 'N':
      newRover.y += 1;
      break;
    case 'E':
      newRover.x += 1;
      break;
    case 'S':
      newRover.y -= 1;
      break;
    case 'W':
      newRover.x -= 1;
      break;
    default:
      // this should never happen
      break;
  }
  return newRover;
};

export const runRover = (rover: Rover, isLost: IsLostFn, previousRovers: RoverState[]): RoverState => {
  return rover.commands.reduce((accum: RoverState, next) => {
    if (accum.isLost) {
      return accum;
    }
    if (next === 'L') {
      return {
        ...accum,
        dir: rotateL(accum.dir)
      }
    } else if (next === 'R') {
      return {
        ...accum,
        dir: rotateR(accum.dir)
      }
    }
    if (containsPreviousLost(accum, previousRovers)) {
      return accum;
    }
    const testRover = moveForward(accum);
    if (isLost(testRover)) {
      return {
        ...accum,
        isLost: true,
      }
    }
    return testRover;
  }, rover.start);
}
