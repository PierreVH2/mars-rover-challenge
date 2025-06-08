import fs, { readFileSync } from 'fs';
import { Direction, StartState, Command, Rover } from './types';

const processStartLine = (line: string): StartState => {
  if (!/^\d+\s+\d+\s+(N|S|E|W)$/.test(line)) {
    throw new Error(`Invalid rover start line: ${line}`);
  }
  const cols = line.split(/\s/);

  return {
    x: +cols[0],
    y: +cols[1],
    // I generally strongly discourage the use of `as` in Typescript, but in this
    // case it's safe due to the previous `if` condition's Regex
    dir: cols[2] as Direction
  }
}

const processCommandsLine = (line: string): Command[] => {
  if (!/^(L|R|F)+$/.test(line)) {
    throw new Error(`Invalid rover commands line: ${line}`);
  }
  // Same comment regarding the use of `as`
  return line.split('') as Command[];
}

export const loadFile = (filePath: string): Rover[] => {

  const data = readFileSync(filePath, 'utf-8');
  const lines = data.split(/\r\n|\n/).filter((l) => !!l);
  const grid = lines.shift();

  if (!grid || !/^\d+\s+\d+$/.test(grid)) {
    throw new Error('Invalid grid size.');
  }

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

  return rovers;
}
