import Game from "./game.js";

const game = new Game();

document.getElementById("newgame").addEventListener("click", evt => game.newGame());

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