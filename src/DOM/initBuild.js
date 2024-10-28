import GameBoard from "../Classes/gameBoard";
import buildGrids from "./grid";

export default function initGame(handleAttack) {
    const player1Div = document.getElementById('player1');
    const player2Div = document.getElementById('player2');

    const player1Board = new GameBoard();
    const player2Board = new GameBoard();

    const player1Grid = buildGrids('player1', handleAttack);
    const player2Grid = buildGrids('player2', handleAttack);

    player1Div.append(player1Grid);
    player2Div.append(player2Grid);

    // Return both player boards so they can be used in `handleAttack`
    return { player1Board, player2Board };
}
