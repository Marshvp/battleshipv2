

export default function buildGrids(playerID){
    const size = 10;
    const gameboard = document.createElement('div')
    gameboard.classList = `gameboard - ${playerID}`
    

    for (let y = 0; y < size; y++){
        for (let x = 0; x < size; x++){
            const cell = document.createElement('div')
            cell.classList = 'cell'
            cell.id = `${x} - ${y}`
            gameboard.appendChild(cell)
        }
    }


    return gameboard
}