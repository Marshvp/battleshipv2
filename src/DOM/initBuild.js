import GameBoard from "../Classes/gameBoard";
import Player from "../Classes/player";
import buildGrids from "./grid";

export default function initGame(handleAttack) {
    const player1Div = document.getElementById('player1');
    const player2Div = document.getElementById('player2');

    const name1 = 'PlayerOne';
    const name2 = 'PlayerTwo';

    const shipPlacements = [
        { initX: 0, initY: 0, length: 3, orientation: 'horizontal' }, // Ship 1: Horizontal at (0, 0)
        // { initX: 4, initY: 4, length: 4, orientation: 'vertical' },   // Ship 2: Vertical at (4, 4)
        // { initX: 7, initY: 1, length: 2, orientation: 'horizontal' }, // Ship 3: Horizontal at (7, 1)
        // { initX: 3, initY: 6, length: 5, orientation: 'vertical' },   // Ship 4: Vertical at (3, 6)
    ];

    const player1Instance = new Player(name1)
    const player2Instance = new Player(name2);
    
    player2Instance.turn = false

    shipPlacements.forEach(ship => {
        const { initX, initY, length, orientation } = ship
        player1Instance.board.placeShip(initX, initY, length, orientation )
    })
    console.log(`post placement: ${player1Instance.board}`);
    
    
    const player1Grid = buildGrids(name1, handleAttack);
    const player2Grid = buildGrids(name2, handleAttack);

    player1Div.append(player1Grid);
    player2Div.append(player2Grid);

    // Return both player boards so they can be used in `handleAttack`
    return { player1Instance, player2Instance };
}
