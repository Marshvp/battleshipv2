import './styles.css'
import initGame from './DOM/initBuild';


export default function handleAttack(x, y, cell) {
    const combatLogUL = document.getElementById('combatLog')
    const combatLogLI = document.createElement('li')

    // checking if it is player 1's turn. if so player 1 attacks, else player 2 is attacking
    const attackingPlayer = global.game.player1Instance.turn ? global.game.player1Instance : global.game.player2Instance
    console.log('attacking player',attackingPlayer);
    const defendingPlayer = global.game.player1Instance.turn ? global.game.player2Instance : global.game.player1Instance
    console.log('defending player',defendingPlayer);


    if (cell.dataset.player === attackingPlayer.name) {
        console.log("Cannot attack your own board.");
        return;
    }

    const gameboardInstance = defendingPlayer.board
    const result = gameboardInstance.receiveAttack(x, y);

    const cellId = `${defendingPlayer.name}-${x}-${y}`
    const targetCell = document.getElementById(cellId)

    if (result === 'hit') {
        targetCell.classList.add('hit');
        combatLogLI.textContent = `Hit at ${x}-${y} by ${attackingPlayer.name}`;
    }
    if (result === 'miss') {
        targetCell.classList.add('miss');
        combatLogLI.innerHTML = `Miss at ${x}-${y} by ${attackingPlayer.name}`
    }
    if (result === 'again') {
        console.log('again');
        return
    }

    attackingPlayer.turn = false
    defendingPlayer.turn = true
    combatLogUL.appendChild(combatLogLI)
}

document.addEventListener('DOMContentLoaded', () => {
    global.game = initGame(handleAttack);
    console.log(game);
    
});