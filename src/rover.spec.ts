import sinon from "sinon";
import chai from 'chai';
import { runRover } from "./rover";
import { Command, IsLostFn, RoverState } from "./types";
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

const expect = chai.expect;

describe('Given runRover function', () => {

  let isLostFn: IsLostFn;

  beforeEach(() => {
    isLostFn = sinon.spy((coord) => coord.x < 0 || coord.y < 0);
  });

  describe('and function is called with no previous rovers', () => {
    const previousRovers: RoverState[] = [];
    describe('and rover is lost', () => {
      const rover: RoverState = {
        x: 0,
        y: 0,
        dir: 'N',
        isLost: true,
      };

      describe('and rover is commanded to turn left', () => {
        const commands: Command[] = ['L'];

        let after: RoverState;

        beforeEach(() => {
          after = runRover({
            start: rover,
            commands
          }, isLostFn, previousRovers);
        });

        it('should NOT turn the rover left', () => {
          expect(after.dir).to.eq('N');
        });

        it('should not move the rover', () => {
          expect(after.x).to.eq(rover.x);
          expect(after.y).to.eq(rover.y);
        });

        it('should not check if rover was lost', () => {
          expect(isLostFn).to.not.have.been.called;
        });
      });

      describe('and rover is commanded to turn right', () => {
        const commands: Command[] = ['R'];

        let after: RoverState;

        beforeEach(() => {
          after = runRover({
            start: rover,
            commands
          }, isLostFn, previousRovers);
        });

        it('should NOT turn the rover right', () => {
          expect(after.dir).to.eq('N');
        });

        it('should not move the rover', () => {
          expect(after.x).to.eq(rover.x);
          expect(after.y).to.eq(rover.y);
        });

        it('should not check if rover was lost', () => {
          expect(isLostFn).to.not.have.been.called;
        });
      });

      describe('and rover is commanded to move forward', () => {
        const commands: Command[] = ['F'];

        let after: RoverState;

        beforeEach(() => {
          after = runRover({
            start: rover,
            commands
          }, isLostFn, previousRovers);
        });

        it('should NOT turn the rover right', () => {
          expect(after.dir).to.eq('N');
        });

        it('should not move the rover', () => {
          expect(after.x).to.eq(rover.x);
          expect(after.y).to.eq(rover.y);
        });

        it('should not check if rover was lost', () => {
          expect(isLostFn).to.not.have.been.called;
        });
      });
    });

    describe('and rover is not lost', () => {
      const rover: RoverState = {
        x: 0,
        y: 0,
        dir: 'N',
        isLost: false,
      };

      describe('and rover is commanded to turn left', () => {
        const commands: Command[] = ['L'];

        let after: RoverState;

        beforeEach(() => {
          after = runRover({
            start: rover,
            commands
          }, isLostFn, previousRovers);
        });

        it('should turn the rover left', () => {
          expect(after.dir).to.eq('W');
        });

        it('should not move the rover', () => {
          expect(after.x).to.eq(rover.x);
          expect(after.y).to.eq(rover.y);
        });

        it('should not check if rover was lost', () => {
          expect(isLostFn).to.not.have.been.called;
        });
      });

      describe('and rover is commanded to turn right', () => {
        const commands: Command[] = ['R'];

        let after: RoverState;

        beforeEach(() => {
          after = runRover({
            start: rover,
            commands
          }, isLostFn, previousRovers);
        });

        it('should turn the rover right', () => {
          expect(after.dir).to.eq('E');
        });

        it('should not move the rover', () => {
          expect(after.x).to.eq(rover.x);
          expect(after.y).to.eq(rover.y);
        });

        it('should not check if rover was lost', () => {
          expect(isLostFn).to.not.have.been.called;
        });
      });

      describe('and rover is commanded to move forward', () => {
        const commands: Command[] = ['F'];

        let after: RoverState;

        beforeEach(() => {
          after = runRover({
            start: rover,
            commands
          }, isLostFn, previousRovers);
        });

        it('should not turn the rover', () => {
          expect(after.dir).to.eq(rover.dir);
        });

        it('should move the rover', () => {
          expect(after.x).to.eq(rover.x);
          expect(after.y).to.eq(rover.y + 1);
        });

        it('shoud check if rover was lost', () => {
          expect(isLostFn).to.have.been.calledWith(sinon.match({
            x: rover.x,
            y: rover.y + 1
          }));
        });

        describe('and rover was lost', () => {
          beforeEach(() => {
            after = runRover({
              start: rover,
              commands
            }, () => true, previousRovers);
          });

          it('should mark the rover as lost', () => {
            expect(after.isLost).to.be.true;
          });
        });

        describe('and rover was not lost', () => {
          beforeEach(() => {
            after = runRover({
              start: rover,
              commands
            }, () => false, previousRovers);
          });

          it('should mark the rover as not lost', () => {
            expect(after.isLost).to.be.false;
          });
        });
      });
    });
  });

  describe('and function is called with a previous rover that was lost', () => {
    const previousRovers: RoverState[] = [{
      x: 0,
      y: 0,
      dir: 'S',
      isLost: true
    }];

    describe('and rover is at location where previous rover was lost', () => {
      const rover: RoverState = {
        x: 0,
        y: 0,
        dir: 'S',
        isLost: false,
      };

      describe('and rover is commanded to move in the same direction as lost rover', () => {
        const commands: Command[] = ['F'];

        let after: RoverState;

        beforeEach(() => {
          after = runRover({
            start: rover,
            commands
          }, isLostFn, previousRovers);
        });

        it('should not turn the rover', () => {
          expect(after.dir).to.eq(rover.dir);
        });

        it('should ignore command to move forward', () => {
          expect(after.x).to.eq(rover.x);
          expect(after.y).to.eq(rover.y);
        });

        it('should check if rover was lost', () => {
          expect(isLostFn).to.not.have.been.called;
        });
      });
    });
  });

  describe('and function is called with a previous rover that was not lost', () => {
    const previousRovers: RoverState[] = [{
      x: 0,
      y: 0,
      dir: 'N',
      isLost: false
    }];

    describe('and rover is at the edge of the grid', () => {
      const rover: RoverState = {
        x: 0,
        y: 0,
        dir: 'S',
        isLost: false,
      };

      describe('and rover is commanded to move off the grid', () => {
        const commands: Command[] = ['F'];

        let after: RoverState;

        beforeEach(() => {
          after = runRover({
            start: rover,
            commands
          }, isLostFn, previousRovers);
        });

        it('should move forward', () => {
          expect(after.x).to.eq(rover.x);
          expect(after.y).to.eq(rover.y);
        });

        it('should mark the rover as lost', () => {
          expect(after.isLost).to.be.true;
        });
      });
    });
  });
});