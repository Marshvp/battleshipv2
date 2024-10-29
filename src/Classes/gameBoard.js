// Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.

// Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a 
// ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.

// Gameboards should keep track of missed attacks so they can display them properly.
// Gameboards should be able to report whether or not all of their ships have been sunk.

import Ship from "./shipClass";
export default class GameBoard {
    constructor() {
        this.ships = [];
        this.size = 10;
        this.missedAttack = new Set()
        this.occupiedPositions = new Set();

    }

    placeShip(initX, initY, length, orientation) {
        const newShip = new Ship(length)

        const positions = []

        for(let i = 0; i < length; i++) {
            const x = orientation === 'horizontal' ? initX + i : initX
            const y = orientation === 'vertical' ? initY + i : initY
            const coord = `${x}, ${y}`

            
            if(this.occupiedPositions.has(coord)){
                console.log("Error in occupied Possitions", coord);
                return false
            } else {
                
                positions.push(coord)
                console.log('placing:', coord);
                
            }
        }

        newShip.positions = positions
        this.ships.push(newShip)

        positions.forEach(pos => {
            this.occupiedPositions.add(pos)
        })
       return true
    }

    receiveAttack(x,y) {
        const coord =  `${x}, ${y}`

        if(this.occupiedPositions.has(coord)){
            for (const ship of this.ships){
                if(ship.positions.includes(coord)){
                    ship.recordHit();
                    console.log("ship hit");
                    if(this.allSunk()){
                        console.log("Game Over");
                        alert('Game Over')
                    }
                return "hit"           
                }
            }
        } else {
            if (!this.missedAttack.has(coord)){
                this.missedAttack.add(coord)
                console.log("miss");
                console.log(this.missedAttack);
                return "miss"
            } else {
                console.log("You have already hit this one");
                return "again"
            }
            
        }
    }

    allSunk(){
        return this.ships.every(ship => ship.isSunk())
    }
}
