import chai from 'chai';
import { createIsLostRect } from './mars';

const expect = chai.expect;

const GRID_SIZE = 10;

describe('Given createIsLostRect function', () => {
  it('should be a function', () => {
    expect(createIsLostRect).to.be.a('function');
  });

  describe('and createIsLostRect is called with allowed parameters', () => {
    let fn: ReturnType<typeof createIsLostRect>;

    beforeEach(() => {
      fn = createIsLostRect({
        width: GRID_SIZE,
        height: GRID_SIZE,
      });
    });

    it('should return a function for evaluating coordinate', () => {
      expect(fn).to.be.a('function');
    });

    describe('and the returned function is called with a coordinate inside the grid', () => {
      let isLost: boolean;

      beforeEach(() => {
        isLost = fn({
          x: GRID_SIZE,
          y: GRID_SIZE
        })
      });

      it('should return false', () => {
        expect(isLost).to.be.false;
      });
    });

    describe('and the returned function is called with a coordinate outside the grid', () => {
      let isLost: boolean;

      beforeEach(() => {
        isLost = fn({
          x: GRID_SIZE+1,
          y: GRID_SIZE+1
        })
      });

      it('should return true', () => {
        expect(isLost).to.be.true;
      });
    });

    describe('and the returned function is called with a negative coordinate', () => {
      let isLost: boolean;

      beforeEach(() => {
        isLost = fn({
          x: -1,
          y: -1
        })
      });

      it('should return true', () => {
        expect(isLost).to.be.true;
      });
    });
  });

  describe('and createIsLost is called with negative size parameters', () => {
    it('should throw an error', () => {
      expect(createIsLostRect.bind(null, {
        width: -1,
        height: -1
      })).to.throw;
    });
  });

  describe('and createIsLost is called with size parameters that are too large', () => {
    it('should throw an error', () => {
      expect(createIsLostRect.bind(null, {
        width: 51,
        height: 51
      })).to.throw;
    });
  });
});