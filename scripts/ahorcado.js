import Game from "./game.js";

let game = new Game();

document.getElementById("init").onclick = () => {
    window.location.href= '#game';
    game.newGame();
};

document.getElementById("new-game").onclick = () => game.newGame();

document.getElementById("end").onclick = () => {
    window.location.href= '#principal';
    game.endGame();
};