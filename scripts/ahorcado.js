import Game from "./game.js";

let game = new Game();

const principal = document.getElementById('principal');
const sectionGame = document.getElementById('game');
const palabra = document.getElementById('nueva-palabra');

document.getElementById("init").onclick = () => {
    window.location.href= '#game';
    sectionGame.className = 'display-container'
    sectionGame.childNodes.forEach(element => {
        element.className = 'display-children';
    });
    game.newGame();
};

document.getElementById("new-game").onclick = () => game.newGame();

document.getElementById("end").onclick = () => {
    window.location.href= '#principal';
    sectionGame.className = 'container'
    sectionGame.childNodes.forEach(element => {
        element.className = 'container-children';
    });
    game.endGame();
};