

export default function buildGrids(playerID, handleAttack){
    const size = 10;
    const playerName = playerID
    const gameboard = document.createElement('div')
    gameboard.classList = `gameboard`
    gameboard.id = `gameboard-${playerID}`
    

    for (let y = 0; y < size; y++){
        for (let x = 0; x < size; x++){
            const cell = document.createElement('div')
            cell.classList = 'cell'
            cell.id = `${playerID}-${x}-${y}`
            cell.dataset.player = playerID

            cell.addEventListener('click', () =>{
                handleAttack(x, y, cell)
            })
            gameboard.appendChild(cell)
        }
    }


    return gameboard
}