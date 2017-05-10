require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('assert')

const Elevator = require('../elevator').default;

describe('Elevator', function() {
  let elevator = new Elevator();

  afterEach(function() {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 5)
    assert.equal(elevator.totalStops, 2)
    assert.deepEqual(elevator.getStops(), [2, 5])
    assert.equal(elevator.motionStatus, 'idle')
    assert.equal(elevator.floorsTraversed, 10)
  });

  it('should bring a rider to a floor below their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 3)
    assert.equal(elevator.totalStops, 2)
    assert.deepEqual(elevator.getStops(), [8, 3])
    assert.equal(elevator.motionStatus, 'idle')
    assert.equal(elevator.floorsTraversed, 16)
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

  it.only('should have a totalFloorsTraversed method', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };
    let mockUser2 = { name: "Brittany", currentFloor: 2, dropOffFloor: 8 };
    elevator.pickUpTraverse(mockUser)
    elevator.pickUpTraverse(mockUser2)

    assert.equal(elevator.floorsTraversed, 16)
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
    assert.equal(elevator.floorsTraversed, 3)

    elevator.reset()

    assert.equal(elevator.currentFloor, 0)
    assert.equal(elevator.motionStatus, 'idle')
    assert.equal(elevator.requests.length, 0)
    assert.equal(elevator.riders.length, 0)
    assert.equal(elevator.floorsTraversed, 0)
    assert.equal(elevator.totalStops, 0)
  })
});
