export interface Coordinate {
  x: number;
  y: number;
}

export const directions = ['N', 'E', 'S', 'W'];

export type RoverDir = typeof directions[number];

export interface RoverState extends Coordinate {
  dir: RoverDir;
  isLost: boolean;
};

export type Command = 'L' | 'R' | 'F';

export interface Rover {
  start: RoverState;
  commands: Command[];
}

export interface Grid {
  width: number;
  height: number;
}

export interface Instructions {
  grid: Grid;
  rovers: Rover[];
}

export type IsLostFn = (coord: Coordinate) => boolean;
