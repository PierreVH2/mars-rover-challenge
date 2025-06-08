export type Direction = 'N' | 'S' | 'E' | 'W';

export interface StartState {
  x: number;
  y: number;
  dir: Direction;
};

export type Command = 'L' | 'R' | 'F';

export interface Rover {
  start: StartState;
  commands: Command[];
}
