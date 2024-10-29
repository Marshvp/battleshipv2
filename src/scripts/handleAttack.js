
export default function handleAttack(x, y, cell) {
    const combatLogUL = document.getElementById('combatLog')

    // checking if it is player 1's turn. if so player 1 attacks, else player 2 is attacking
    const attackingPlayer = global.game.player1Instance.turn ? global.game.player1Instance : global.game.player2Instance
    console.log('attacking player',attackingPlayer);
    const defendingPlayer = global.game.player1Instance.turn ? global.game.player2Instance : global.game.player1Instance
    console.log('defending player',defendingPlayer);

    
    const gameboardInstance = defendingPlayer.board
    

    if(attackingPlayer == global.game.player2Instance){
        console.log('hello');
        aiAttack()
        return
    } else{

        if (cell.dataset.player === attackingPlayer.name) {
            console.log("Cannot attack your own board.");
            return;
        }

        const result = gameboardInstance.receiveAttack(x, y);

        const cellId = `${defendingPlayer.name}-${x}-${y}`
        const targetCell = document.getElementById(cellId)
        const log = handleResult(result, attackingPlayer.name, x, y, targetCell)
        console.log('this is log',log);
        

        attackingPlayer.turn = false
        defendingPlayer.turn = true
        combatLogUL.appendChild(log)

        aiAttack()
    }

}

function aiAttack() {
    // call random attack (random x,y. if check board.missedAttack so no dupes)
    // return random x,y
    // feed into handleResult
    // swap turns and append.

    const combatLogUL = document.getElementById('combatLog');

    const attackingPlayer = global.game.player2Instance;
    const defendingPlayer = global.game.player1Instance;
    const gameboardInstance = defendingPlayer.board;

    let x, y
    let validAttack = false

    while (!validAttack){

        x = Math.floor(Math.random() * 10)
        y = Math.floor(Math.random() * 10)
        const coord = `${x}, ${y}`

        const alreadyMissed = gameboardInstance.missedAttack.has(coord);

        if(!alreadyMissed){
            validAttack = true
        }
    }

    const result = gameboardInstance.receiveAttack(x, y);

    const cellId = `${defendingPlayer.name}-${x}-${y}`
    const targetCell = document.getElementById(cellId)
    const log = handleResult(result, attackingPlayer.name, x, y, targetCell)
    console.log('this is log',log);
    

    attackingPlayer.turn = false
    defendingPlayer.turn = true
    combatLogUL.appendChild(log)

}

function handleResult(result, attackingName, x, y, targetCell) {
    const combatLogLI = document.createElement('li')

    if (result === 'hit') {
        targetCell.classList.add('hit');
        combatLogLI.textContent = `Hit at ${x}-${y} by ${attackingName}`;
        return combatLogLI
    }
    if (result === 'miss') {
        targetCell.classList.add('miss');
        combatLogLI.innerHTML = `Miss at ${x}-${y} by ${attackingName}`
        return combatLogLI
    }
    if (result === 'again') {
        if(attackingName == 'computer') {
            aiAttack()
            alert('ai attack again')
            return
        }
        console.log('again');
        combatLogLI.innerHTML = `${attackingName} tried to attack the same square TODO`
        return combatLogLI
    }
}
