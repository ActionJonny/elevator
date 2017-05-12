require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const locus = require('locus');

const assert = require('assert')

const Elevator = require('../elevator').default;

describe('Elevator', function() {
  let elevator = new Elevator();

  afterEach(function() {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 }
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 5)
    assert.equal(elevator.totalStops, 2)
    assert.deepEqual(elevator.getStops(), [2, 5])
    assert.equal(elevator.motionStatus, 'idle')
    assert.equal(elevator.floorsTraversed, 5)
  });

  it('should bring a rider to a floor below their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 3)
    assert.equal(elevator.totalStops, 2)
    assert.deepEqual(elevator.getStops(), [8, 3])
    assert.equal(elevator.motionStatus, 'idle')
    assert.equal(elevator.floorsTraversed, 13)
  });

  it('should have a goToFloor method', () => {
    let mockUser = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };
    elevator.goToFloor(mockUser)

    assert.equal(elevator.motionStatus, 'idle')
    assert.equal(elevator.requests.length, 1)
    assert.equal(elevator.riders.length, 0)
  })

  it('should have a pickupRider method', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };
    elevator.pickupRider(mockUser)

    assert.equal(elevator.motionStatus, 'moving')
    assert.equal(elevator.requests.length, 1)
    assert.equal(elevator.totalStops, 1)
    assert.equal(elevator.currentFloor, 2)
    assert.equal(elevator.riders.length, 1)
  })

  it('should have a dropOffRider method', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };
    elevator.dropOffRider(mockUser)

    assert.equal(elevator.motionStatus, 'moving')
    assert.equal(elevator.totalStops, 1)
    assert.equal(elevator.currentFloor, 5)
    assert.equal(elevator.riders.length, 0)
  })

  it('should be able to calculate floors traversed', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };
    let mockUser2 = { name: "Brittany", currentFloor: 4, dropOffFloor: 8 };
    let mockUser3 = { name: "Brittany", currentFloor: 10, dropOffFloor: 3 };
    elevator.goToFloor(mockUser)
    elevator.goToFloor(mockUser2)
    elevator.goToFloor(mockUser3)

    assert.equal(elevator.floorsTraversed, 17)
  })

  it('should have a getStops method', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };
    elevator.goToFloor(mockUser)
    elevator.getStops()

    assert.equal(elevator.requests.length, 1)
    assert.equal(elevator.currentFloor, 5)
  })

  it('should have a reset method', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 5)
    assert.equal(elevator.totalStops, 2)
    assert.deepEqual(elevator.getStops(), [2, 5])
    assert.equal(elevator.motionStatus, 'idle')
    assert.equal(elevator.floorsTraversed, 5)

    elevator.reset()

    assert.equal(elevator.currentFloor, 0)
    assert.equal(elevator.motionStatus, 'idle')
    assert.equal(elevator.requests.length, 0)
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.floorsTraversed, 0)
    assert.equal(elevator.totalStops, 0)
  })

  it('should drop people two people going up', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };
    let mockUser2 = { name: "Brittany", currentFloor: 4, dropOffFloor: 9 };
    elevator.goToFloor(mockUser)
    elevator.goToFloor(mockUser2)

    assert.equal(elevator.currentFloor, 9)
    assert.equal(elevator.totalStops, 4)
    assert.deepEqual(elevator.getStops(), [2, 5, 4, 9])
    assert.equal(elevator.motionStatus, 'idle')
    assert.equal(elevator.floorsTraversed, 9)
  })

  it('should drop person A going up and person B going down', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };
    let mockUser2 = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };
    elevator.goToFloor(mockUser)
    elevator.goToFloor(mockUser2)

    assert.equal(elevator.currentFloor, 3)
    assert.equal(elevator.totalStops, 4)
    assert.deepEqual(elevator.getStops(), [2, 5, 8, 3])
    assert.equal(elevator.motionStatus, 'idle')
    assert.equal(elevator.floorsTraversed, 13)
  })

  it('should drop person A going down and person B going up', () => {
    let mockUser = { name: "Brittany", currentFloor: 5, dropOffFloor: 2 };
    let mockUser2 = { name: "Brittany", currentFloor: 3, dropOffFloor: 7 };
    elevator.goToFloor(mockUser)

    assert.equal(elevator.currentFloor, 2)
    assert.equal(elevator.totalStops, 2)
    // assert.deepEqual(elevator.getStops(), [5, 2])
    assert.equal(elevator.motionStatus, 'idle')
    assert.equal(elevator.floorsTraversed, 8)

    elevator.goToFloor(mockUser2)

    assert.equal(elevator.currentFloor, 7)
    assert.equal(elevator.totalStops, 4)
    // assert.deepEqual(elevator.getStops(), [5, 2, 3, 7])
    assert.equal(elevator.motionStatus, 'idle')
    assert.equal(elevator.floorsTraversed, 7)
  })

  it.skip('should drop person A going down and person B going down', () => {
    let mockUser = { name: "Brittany", currentFloor: 5, dropOffFloor: 2 };
    let mockUser2 = { name: "Brittany", currentFloor: 8, dropOffFloor: 5 };
    elevator.goToFloor(mockUser)
    elevator.goToFloor(mockUser2)

    assert.equal(elevator.currentFloor, 5)
    assert.equal(elevator.totalStops, 4)
    assert.deepEqual(elevator.getStops(), [5, 2, 8, 5])
    assert.equal(elevator.motionStatus, 'idle')
    assert.equal(elevator.floorsTraversed, 17)
  })
});
