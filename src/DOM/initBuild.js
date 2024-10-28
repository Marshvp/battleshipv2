import GameBoard from "../Classes/gameBoard";
import Player from "../Classes/player";
import buildGrids from "./grid";

export default function initGame(handleAttack) {
    const player1Div = document.getElementById('player1');
    const player2Div = document.getElementById('player2');

    const name1 = 'PlayerOne';
    const name2 = 'PlayerTwo';

    const player1Instance = new Player(name1)
    const player2Instance = new Player(name2);
    
    player2Instance.turn = false

    const player1Grid = buildGrids(name1, handleAttack);
    const player2Grid = buildGrids(name2, handleAttack);

    player1Div.append(player1Grid);
    player2Div.append(player2Grid);

    // Return both player boards so they can be used in `handleAttack`
    return { player1Instance, player2Instance };
}
