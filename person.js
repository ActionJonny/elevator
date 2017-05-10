export default class Person {
  constructor({ name, currentFloor, dropOffFloor }) {
    this.name = name
    this.currentFloor = currentFloor
    this.dropOffFloor = dropOffFloor
  }

  reset() {
    this.name = ''
    this.currentFloor = null
    this.dropOffFloor = null
  }
}
