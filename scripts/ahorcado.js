import Game from "./game.js";

let game = new Game();

const toggleContainer = document.getElementById('toggle-teclado');
const toggle = document.getElementById('toggle');
const sectionGame = document.getElementById('game');
const keyboard = document.getElementById('teclado-virtual');
const keys = document.getElementsByClassName('key');
const sectionPalabra = document.getElementById('nueva-palabra');
const inputPalabra = document.getElementsByName('palabra')[0];


//Valida que los valores ingresados en la pantalla de "Agregar palabra" 
inputPalabra.addEventListener('keydown', (evt) => {
    
    //Permite el uso de las teclas de Home, End y las flechas de navegacion
    if(evt.key == 'Backspace' || 
    evt.key.includes('Arrow') || 
    evt.key == 'End' || 
    evt.key == 'Home') return;
    
    //Si la tecla no es una letra, termina el evento
    if(!/^[a-zA-Z]$/.test(evt.key)){
        evt.preventDefault();
        return;
    }

    //En caso de que la longitud de la palabra ingresada halla llegado al limite, se mostrara una animacion
    if(inputPalabra.value.length == 8){
        document.getElementById('max').animate({color : ['black', 'red'], offset: [0, .1], easing : 'ease-out'},2000);
    }

});


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
    
    let toast = Swal.mixin({//Creacion de alerta info de teclado virtual
        toast: true,
        position: 'top-start',
        showConfirmButton: false,
        timer: 8000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseover', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    
    toggleContainer.style.display = 'flex';//Muestra el boton en pantalla

    if(!toggle.checked){//Si el boton no esta seleccionado, muestra la alerta de info
        toast.fire({
            icon: 'info',
            html: 'Puedes utilizar tu teclado fisico o el teclado virtual para jugar.<br><br>Para habilitar el teclado virtual, solo haz click en el boton de la esquina superior derecha &#128512',
            showCloseButton: true
        });
    }

    sectionGame.className = 'display-container';//Muestra la pantalla de juego

    sectionGame.childNodes.forEach(element => {//Muestra los hijos de la pantall de juego
        element.className = 'display-children';
    });

    game.newGame();

};


//Establece la funcion del boton "Anhadir palabra"
document.getElementById('new-word').onclick = () => {
    
    sectionPalabra.className = 'display-container';

    sectionPalabra.childNodes.forEach(element => {
        element.className = 'display-children';
    });

};


//Establece la funcion del boton "Agregar y empezar"
document.getElementById('push-word').onclick = () => {
    let input = inputPalabra.value.toUpperCase();//Obtiene la palabra ingresada
    
    //Si el usuario escribio algun dato, lo añada a la lista de palabras del juego y muestra la pantalla de juego
    if(input!=''){
        game.addWord(input);
        inputPalabra.value = '';
        document.getElementById('cancel').onclick();
        document.getElementById("init").onclick();
        return;
    }

    //En caso de no haber ingresado nada, le mostrara una animacion al usuario
    inputPalabra.animate({borderColor : ['black', 'red'], offset: [0, .1], easing : 'ease-out'},2000);

};


//Establece la funcion del boton "Cancelar" en la pantalla de "Anhadir palabra"
document.getElementById('cancel').onclick = () => {
    sectionPalabra.className = 'container';//Muestra la pantalla

    sectionPalabra.childNodes.forEach(element => {//Muestra los hijos de la pantalla
        element.className = 'container-children';
    });
};


//Establece la funcion del boton "Nuevo juego"
document.getElementById("new-game").onclick = () => game.newGame();


//Establece la funcion del boton "Finalizar partida"
document.getElementById("end").onclick = () => {
    
    //Oculta la pantalla de juego, a sus hijos y al toggle de "Teclado en pantalla"
    sectionGame.className = 'container';
    toggleContainer.style.display = 'none';
    
    sectionGame.childNodes.forEach(element => {
        element.className = 'container-children';
    });
    
    game.endGame();//Finaliza el juego

};