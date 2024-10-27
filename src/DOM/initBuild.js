import buildGrids from "./grid";

export default function buildPage() {
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container')
    const player1Div = document.getElementById('player1')
    if (container) {
        console.log("Horray");
    }
    if(player1Div) {
        console.log("player 1 online");
    }

    player1Div.append(buildGrids())
})}