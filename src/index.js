import './styles.css'
import initGame from './DOM/initBuild';
import handleAttack from './scripts/handleAttack';



document.addEventListener('DOMContentLoaded', () => {
    global.game = initGame(handleAttack);
    console.log(game);
    
});

function computerAttack(){

}