
export default class Elevator {
  constructor() {
    this.currentFloor = 0
    this.motionStatus = 'idle'
    this.requests = []
    this.riders = []
    this.floorsTraversed = 0
    this.totalStops = 0
  }

  goToFloor(user) {
    this.motionStatus = 'idle'
    this.pickupRider(user)
    this.motionStatus = 'idle'
    this.dropOffRider(user)
    this.motionStatus = 'idle'
    this.totalFloorsTraversed(user)
  }

  pickupRider(user) {
    this.motionStatus = 'moving'
    this.requests.push(user)
    this.totalStops++
    this.currentFloor = user.currentFloor
    this.riders.push(user)
  }

  dropOffRider(user) {
    this.motionStatus = 'moving'
    this.totalStops++
    this.currentFloor = user.dropOffFloor
    this.riders.shift()
  }

  pickUpTraverse(user) {
    let ride = this.currentFloor + Math.abs(user.dropOffFloor)

  }

  getStops() {
    return this.requests.reduce((acc, currentRider) => {
      this.pickUpTraverse(currentRider)
      acc.push(currentRider.currentFloor, currentRider.dropOffFloor)
      return acc
    }, [])
  }

  reset() {
    this.currentFloor = 0
    this.motionStatus = 'idle'
    this.requests = []
    this.riders = []
    this.floorsTraversed = 0
    this.totalStops = 0
  }
}
