
export default function createShips() {
    const orientations = ['horizontal', 'vertical'];
    const boardSize = 10;

    const ships = [
        { length: 5 },
        { length: 4 },
        { length: 3 },
        { length: 3 },
        { length: 3 },
        { length: 3 }
    ].map(ship => {
        // Generate random `initX`, `initY` coordinates within the board limits
        const initX = Math.floor(Math.random() * boardSize);
        const initY = Math.floor(Math.random() * boardSize);
        const orientation = orientations[Math.floor(Math.random() * orientations.length)];

        const result = { initX, initY, length: ship.length, orientation };
        
        console.log(result);
        return result
    });

    return ships;
}