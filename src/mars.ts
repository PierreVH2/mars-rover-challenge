import { Coordinate, Grid, IsLostFn } from "./types";

const MAX_GRID_HEIGHT = 50;
const MAX_GRID_WIDTH = 50;

const isLostRect = (coord: Coordinate, size: Grid): boolean => {
  return coord.x < 0 || coord.x > size.width || coord.y < 0 || coord.y > size.height;
};

export const createIsLostRect = (size: Grid): IsLostFn => {
  if (size.width < 0 || size.width > MAX_GRID_WIDTH || size.height < 0 || size.height > MAX_GRID_HEIGHT) {
    throw new Error('Invalid grid parameters');
  }

  return (coord: Coordinate) => isLostRect(coord, size);
}
