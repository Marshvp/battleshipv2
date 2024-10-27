import './styles.css'
import initGame from './DOM/initBuild';
console.log("Hello, World")


let game

function handleAttack(playerID, x, y) {
    console.log(`Attack on ${playerID} at position (${x}, ${y})`);

    const gameboardInstance = playerID === 'player1' ? game.player1Board : game.player2Board;
    const result = gameboardInstance.receiveAttack(x, y);


    if(playerID === 'player1'){

        const cell = document.getElementById(`A ${x}-${y}`);
        if (result === 'hit') {
            cell.classList.add('hit');
        } else if (result === 'miss') {
            cell.classList.add('miss');
        }
    } else {

        const cell = document.getElementById(`B ${x}-${y}`);
        if (result === 'hit') {
            cell.classList.add('hit');
        } else if (result === 'miss') {
            cell.classList.add('miss');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    game = initGame(handleAttack);
    console.log(game);
    
});