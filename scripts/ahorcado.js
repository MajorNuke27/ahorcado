import Game from "./game.js";

let game = new Game();

const toggleContainer = document.getElementById('toggle-teclado');
const toggle = document.getElementById('toggle');
const sectionGame = document.getElementById('game');
const keyboard = document.getElementById('teclado-virtual');
const keys = document.getElementsByClassName('key');
const palabra = document.getElementById('nueva-palabra');

//Establece la funcion que ejecutara cada una de las teclas del teclado virtual
for (let i = 0; i < keys.length; i++) {
    const element = keys[i];
    element.onclick = () => {
        document.dispatchEvent(new KeyboardEvent('keydown', {'key' : element.innerText}));
    }
}

//Establece la funcion para mostrar o no el teclado virtual
toggle.onclick = () => {
    if(toggle.checked) {
        keyboard.style.display = 'flex';
        return;
    }

    keyboard.style.display = 'none';
};

//Establece la funcion del boton "Iniciar partida"
document.getElementById("init").onclick = () => {
    Swal.mixin({
        toast: true,
        position: 'top-start',
        showConfirmButton: false,
        timer: 10000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseover', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    .fire({
        icon: 'info',
        html: 'Puedes utilizar tu teclado fisico o el teclado virtual para jugar.<br><br>Para habilitar el teclado virtual, solo haz click en el boton de la esquina superior derecha &#128512',
        showCloseButton: true
    });
    toggleContainer.style.display = 'flex';
    toggle.checked = false;
    keyboard.style.display = 'none';
    sectionGame.className = 'display-container'
    sectionGame.childNodes.forEach(element => {
        element.className = 'display-children';
    });
    game.newGame();
};

//Establece la funcion del boton "Nuevo juego"
document.getElementById("new-game").onclick = () => game.newGame();

//Establece la funcion del boton "Finalizar partida"
document.getElementById("end").onclick = () => {
    sectionGame.className = 'container';
    toggleContainer.style.display = 'none';
    sectionGame.childNodes.forEach(element => {
        element.className = 'container-children';
    });
    game.endGame();
};