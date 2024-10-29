import GameBoard from "../Classes/gameBoard";
import Player from "../Classes/player";
import createShips from "../scripts/createShips";
import buildGrids from "./grid";

export default function initGame(handleAttack) {
    const player1Div = document.getElementById('player1');
    const player2Div = document.getElementById('player2');

    const name1 = prompt('Add your name');
    const name2 = 'computer';

    

    const player1Instance = new Player(name1)
    const player2Instance = new Player(name2);
    
    player2Instance.turn = false

    const player1Ships = createShips()
    const player2Ships = createShips()

    player1Ships.forEach(ship => {
        const { initX, initY, length, orientation } = ship
        player1Instance.board.placeShip(initX, initY, length, orientation)
    })
    console.log(`post placement: ${player1Instance.board}`);

    player2Ships.forEach(ship => {
        const { initX, initY, length, orientation } = ship
        player2Instance.board.placeShip(initX, initY, length, orientation)
    })
    
    
    const player1Grid = buildGrids(player1Instance, handleAttack);
    const player2Grid = buildGrids(player2Instance, handleAttack);

    player1Div.append(player1Grid);
    player2Div.append(player2Grid);

    // Return both player boards so they can be used in `handleAttack`
    return { player1Instance, player2Instance };
}
