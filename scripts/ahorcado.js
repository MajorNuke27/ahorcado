import Game from "./game.js";

let game = new Game();

document.getElementById("init").onclick = () => {
    window.location.href= '#game';
    game = new Game();
};

document.getElementById("new-game").addEventListener("click", evt => game.newGame());

document.getElementById("end").onclick = () => {
    window.location.href= '#principal';
    game.newGame();
};

/*

Pruebas

row = document.getElementById("palabra");

for(let i = 0 ; i < 10 ; i++){
    let data = document.createElement("td");
    data.append("- ");
    row.append(data);
}

let letras = row.childNodes;

letras.forEach(letra => {
    letra.textContent = "a";
});

let rowA = document.createElement("tr");

row.replaceWith(rowA);

for(let i = 0 ; i < 10 ; i++){
    let data = document.createElement("td");
    data.append("- ");
    rowA.append(data);
}

console.log(row);
*/