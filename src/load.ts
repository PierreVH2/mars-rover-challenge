import { readFileSync } from 'fs';
import { RoverDir, RoverState, Command, Rover, Grid, Instructions } from './types';


const processGrid = (line: string): Grid => {
  if (!line || !/^\d+\s+\d+$/.test(line)) {
    throw new Error('Invalid grid size.');
  }
  const [width, height] = line.split(/\s/).map((c) => +c);

  return {
    width,
    height
  };
};

const processStartLine = (line: string): RoverState => {
  if (!/^\d+\s+\d+\s+(N|S|E|W)$/.test(line)) {
    throw new Error(`Invalid rover start line: ${line}`);
  }
  const cols = line.split(/\s/);

  return {
    x: +cols[0],
    y: +cols[1],
    // I generally strongly discourage the use of `as` in Typescript, but in this
    // case it's safe due to the previous `if` condition's Regex
    dir: cols[2] as RoverDir,
    isLost: false,
  }
}

const processCommandsLine = (line: string): Command[] => {
  if (!/^(L|R|F)+$/.test(line)) {
    throw new Error(`Invalid rover commands line: ${line}`);
  }
  // Same comment regarding the use of `as`
  return line.split('') as Command[];
}

export const loadFile = (filePath: string): Instructions => {

  const data = readFileSync(filePath, 'utf-8');
  const lines = data.split(/\r\n|\n/).filter((l) => !!l);
  const grid = processGrid(lines.shift() ?? '');

  const rovers = lines.reduce((accum: Rover[], line, index) => {
    if (index % 2 === 0) {
      return [
        ...accum,
        {
          start: processStartLine(line),
          commands: []
        }
      ];
    }
    const lastRover = accum[accum.length - 1];
    lastRover.commands = processCommandsLine(line);
    return accum;
  }, []);

  return {
    grid,
    rovers
  };
}
