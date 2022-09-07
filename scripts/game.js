export default class Game {
    
    #word = [];//Contiene la palabra a adivinar en fomra de un arreglo de caracteres.
    #row = document.getElementById("palabra");//Fila que contiene la palabra a adivinar.
    #rowFailed = document.getElementById("error");//Fila que contiene las letras incorrectas.
    #tryCount = 0;//Conteo de los intentos del usuario.
    #isOver = false;//Variable que controla si el juego ah terminado.
    static #words = ["CASCADA", "JUGUETE", "MADERA", "BUHO", "MURCIELAGO", "JAVA", "MUEBLE", "PROGRAMAR", "PLUMA", "ALURA", "ORACLE"];//Contiene las palabras a utlizar en el juego.

    constructor() {
        
        this.newGame();

        /*
            Implementa la logica para cuando se presiona una tecla:
            - Verifica si el juego ah terminado 
            - Si no ah terminado, verifica que la tecla sea una letra
            - Si es una letra, verifica que esta no se haya ingresado anteriormente, o si esta es parte de la palabra a adivinar
        */
        document.addEventListener('keydown', ((evt) => {

            if(this.#isOver) {
                evt.preventDefault();
                return;
            }

            let letter = evt.key.toUpperCase();

            if(letter.length == 1 && /^[A-Z]*$/.test(letter)) {

                if(!this.#isCorrect(letter)) this.#tryCount++;

                this.#updateGameStatus();

            }

        }));

    }
    
    newGame() {//Restablece todos los elementos y variables del juego

        this.#isOver = false;
        this.#tryCount = 0;

        //Limpia las filas de la tabla
        let newRow = document.createElement("tr");
        newRow.classList.add("palabra");
        this.#row.replaceWith(newRow);
        this.#row = newRow;
        this.#rowFailed.innerText = '';

        //Obtiene una nueva palabra de forma aleatoria
        let wordIndex = Math.floor(Math.random()*Game.#words.length);
        this.#word = Game.#words[wordIndex].split('');

        //Inicializa la fila que contiene la palabra adivinar
        for(let i = 0 ; i < this.#word.length ; i++) {
            let data = document.createElement("td");
            data.append("_");
            this.#row.append(data);
        }

    }

    //Verifica si letter corresponde a una letra de la palabra a adiviniar o si esta ya se ha ingresado anteriormente.
    #isCorrect(letter){

        let chars = this.#row.childNodes;
        let exist = false;//Variable de control para conocer si la letra ingresada existe en la palabra adivinar o se ah ingresado anteriormente.

        //Verifica si la letra ingresada existe en la palabra a adivinar.
        for(let i = 0 ; i < this.#word.length ; i++) {

            if(letter == this.#word[i]) {
                chars[i].textContent = letter;
                exist = true;
            }

        }//fin for

        if(!exist) {

            chars = this.#rowFailed.childNodes;

            //Verifica si la letra ingresada ya se ah ingresado anteriormente.
            for (let i = 0; i < chars.length; i++) {
                if(chars[i].textContent == letter) {
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

    #updateGameStatus() {

        if(this.#tryCount == 9){
            this.#isOver = true;
            return;
        } 

        let chars = this.#row.childNodes;

        for(let i = 0 ; i < chars.length ; i++) {
            if (chars[i].textContent == '_') return;
        }

        this.#isOver = true;

    }

    addWord(word) {
        Game.#words.push(word);
    }

    get isOver() {
        return this.#isOver;
    }

    get tryCount() {
        return this.#tryCount;
    }

}