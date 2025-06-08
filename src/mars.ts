import { Coordinate, Grid } from "./types";

const isLostRect = (coord: Coordinate, size: Grid): boolean => {
  return coord.x < 0 || coord.x > size.width || coord.y < 0 || coord.y > size.height;
};

export const createIsLostRect = (size: Grid) => (coord: Coordinate) => isLostRect(coord, size);
