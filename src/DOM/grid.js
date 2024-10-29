export default function buildGrids(player, handleAttack) {
    const size = 10;
    const playerID = player.name; // Using player instance name
    const gameboard = document.createElement('div');
    gameboard.classList.add('gameboard');
    gameboard.id = `gameboard-${playerID}`;

    // Create a set of occupied positions for easy lookup
    const occupiedPositions = new Set();
    player.board.ships.forEach(ship => {
        ship.positions.forEach(pos => {
            occupiedPositions.add(pos);
        });
    });

    // Create the grid cells
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `${playerID}-${x}-${y}`;
            cell.dataset.player = playerID;

            // Check if the current cell is part of a ship and highlight it
            const coord = `${x}, ${y}`;
            if (occupiedPositions.has(coord) && playerID !== 'computer') {
                cell.classList.add('ship-cell'); // Add a CSS class to highlight the ship
            }

            // Add event listener for attacks
            cell.addEventListener('click', () => {
                handleAttack(x, y, cell);
            });

            gameboard.appendChild(cell);
        }
    }

    return gameboard;
}
