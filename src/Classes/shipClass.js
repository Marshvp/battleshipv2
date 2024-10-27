// Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.

export default class Ship {
    constructor(id, length){
        this.id = id;
        this.length = length;
        this.hit = 0;
        this.positions = []
    }

    hit() {
        this.hit++
        return this.hit
    }

    isSunk() {
        if (this.hit == this.length) {
            // ship is sunk
            return true
        }
        else {
            return false
        }
    }
}