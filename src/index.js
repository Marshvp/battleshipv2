import './styles.css'
import initGame from './DOM/initBuild';
console.log("Hello, World")


let game
let turn = 0

function handleAttack(playerID, x, y) {
    console.log(`Attack on ${playerID} at position (${x}, ${y})`);
    const combatLogUL = document.getElementById('combatLog')
    const combatLogLI = document.createElement('li')



    const gameboardInstance = playerID === 'player1' ? game.player1Board : game.player2Board;
    const result = gameboardInstance.receiveAttack(x, y);

    let cell
    if(playerID === 'player1'){
        cell = document.getElementById(`A ${x}-${y}`)
    } else {
        cell = document.getElementById(`B ${x}-${y}`)
    }

    if (result === 'hit') {
        cell.classList.add('hit');
        combatLogLI.textContent = `Hit at ${x}-${y} by ${playerID}`;
    }
    if (result === 'miss') {
        cell.classList.add('miss');
        combatLogLI.innerHTML = `Miss at ${x}-${y} by ${playerID}`
    }
    if (result === 'again') {
        console.log(agin);
        
        return
    }

    combatLogUL.appendChild(combatLogLI)
}

document.addEventListener('DOMContentLoaded', () => {
    game = initGame(handleAttack);
    console.log(game);
    
});