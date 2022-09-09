export default class Game {
    
    #word = [];//Contiene la palabra a adivinar en fomra de un arreglo de caracteres.
    #row = document.getElementById("palabra");//Fila que contiene la palabra a adivinar.
    #rowFailed = document.getElementById("error");//Fila que contiene las letras incorrectas.
    #tryCount = 0;//Conteo de los intentos del usuario.
    #isOver = false;//Variable que controla si el juego ah terminado.
    #isLost = false;//Inidca si el juego se perdio (no se adivino la letra)
    static #words = ["CASCADA", "JUGUETE", "MADERA", "BUHO", "MURCIELAGO", "JAVA", "MUEBLE", "PROGRAMAR", "PLUMA", "ALURA", "ORACLE"];//Contiene las palabras a utlizar en el juego.
    

    newGame() {//Restablece todos los elementos y variables del juego

        //Inicializa el event listener para manejar la teclas presionadas por el usuario
        document.addEventListener('keydown', this.#handleKeyboard);

        this.#isOver = false;
        this.#isLost = false;
        this.#tryCount = 0;

        //Limpia las filas de la tabla.
        let newRow = document.createElement("tr");
        newRow.setAttribute('id',"palabra");
        this.#row.replaceWith(newRow);
        this.#row = newRow;
        this.#rowFailed.innerText = '';

        //Obtiene una nueva palabra de forma aleatoria.
        let wordIndex = Math.floor(Math.random()*Game.#words.length);
        this.#word = Game.#words[wordIndex].split('');

        //Inicializa la fila que contiene la palabra adivinar.
        for(let i = 0 ; i < this.#word.length ; i++) {
            let data = document.createElement("td");
            data.append("_");
            this.#row.append(data);
        }

    }

    //Elimina el manejador de las teclas presionadas por el usuario patra evitar errores y ejecutar tareas de manera innecesaria.
    endGame() {
        document.removeEventListener('keydown',this.#handleKeyboard);
    }

    //Verifica si letter existe en la palabra a adiviniar o si esta ya se ha ingresado anteriormente.
    #isCorrect(letter){

        let chars = this.#row.childNodes;
        let exist = false;//Variable de control para conocer si la letra ingresada existe en la palabra adivinar o se ah ingresado anteriormente.

        //Verifica si letter existe en la palabra a adivinar.
        for(let i = 0 ; i < this.#word.length ; i++) {

            if(letter == this.#word[i]) {
                chars[i].textContent = letter;
                exist = true;
            }

        }//fin for

        if(!exist) {

            chars = this.#rowFailed.textContent.split('');

            //Verifica si la letra ingresada ya se ah ingresado anteriormente.
            for (let i = 0; i < chars.length; i++) {
                if(chars[i] == letter) {
                    exist = true;
                    break;
                }
            }//fin for

            if(!exist){
                this.#rowFailed.append(letter);
            }//fin if

        }//fin if

        return exist;

    }

    #updateGameStatus() {//Actualiza el estado del juego

        //Si el usuario agoto sus intentos o adivino la palabra, el jugo habra terminado.

        if(this.#tryCount == 9){//Verifica los intentos
            this.#isOver = true;
            this.#isLost = true;
            return;
        } 

        let chars = this.#row.childNodes;

        for(let i = 0 ; i < chars.length ; i++) {//Verifica si el usuario adivino la palabra
            if (chars[i].textContent == '_') return;
        }

        this.#isOver = true;

    }

    #handleKeyboard = (evt) => {//Implementa la logica para el manejo de las teclas presionadas por el usuario

        let letter = evt.key.toUpperCase();

        //Verifica que la tecla presionada sea una letra
        if(/^[A-Z]$/.test(letter)) {

            if(!this.#isCorrect(letter)) this.#tryCount++;

            this.#updateGameStatus();

        }

        //Verificia si el juego aun no termina
        if(this.#isOver) {
            evt.preventDefault();
            this.endGame();
            
            Swal.fire({//Muestra mensaje de 
                title: this.#isLost ? 'Perdiste' : 'Ganaste!',

                html: this.#isLost ? 
                    'La palabrea era: '+this.#word.join('')+'<br>Intentalo de nuevo!' : 
                    'Felicidades, adivinaste la palabra: '+this.#word.join(''),

                iconHtml: this.#isLost ? '<lord-icon src="https://cdn.lordicon.com/tdrtiskw.json" delay="2000" trigger="loop" colors="primary:#545454,secondary:#e83a30" style="width: 12rem; height: 12rem;"></lord-icon>'
                : '<lord-icon src="https://cdn.lordicon.com/rcopausw.json" trigger="loop" delay="1500" colors="primary:#121331,secondary:#08a88a" style="width:250px;height: 180%"></lord-icon>',
                customClass: {
                    icon: 'no-border'
                },

                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Nuevo juego',
                cancelButtonText: 'Menu principal'
            })
            .then((result) => {
                if (result.isConfirmed) {
                    this.newGame();
                    return;
                }
                window.location.href = '#principal';
            });

            return;
        }
    }

    addWord(word) {//Añade una palabra al juego
        Game.#words.push(word);
    }

    get isLost() {
        return this.#isLost;
    }

    get isOver() {
        return this.#isOver;
    }

    get tryCount() {
        return this.#tryCount;
    }

}