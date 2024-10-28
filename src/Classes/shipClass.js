// Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.

export default class Ship {
    constructor(length){
        this.length = length;
        this.hits = 0;
        this.positions = []
    }

    recordHit() {
        this.hits++
        return this.hits
    }

    isSunk() {
        return this.hits >= this.length 
    }
}