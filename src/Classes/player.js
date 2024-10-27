// Create a Player class/factory.
// There will be two types of players in the game, ‘real’ players and ‘computer’ players.
// Each player object should contain its own gameboard.

import { GameBoard } from "./gameBoard"


class Player {
    constructor(name) {
        this.name = name
        this.board = new GameBoard
    }
}

class Computer {
    constructor(){
        this.board = new GameBoard
    }

    
}