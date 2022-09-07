export default class Game {
    
    #word = [];//Obtiene la palabra a adivinar
    #row = document.getElementById("palabra");//Fila que contiene la palabra a adivinar
    #rowFailed = document.getElementById("error");//Fila que contiene las letras incorrectas
    #tryCount = 0;//Conteot de los intentos del usuario
    #isOver = false;//Variable que controla si el juego ah terminado
    static #words = ["CASCADA", "JUGUETE", "MADERA", "BUHO", "MURCIELAGO", "JAVA", "MUEBLE", "PROGRAMAR", "PLUMA", "ALURA", "ORACLE"];//Contiene las palabras a utlizar en el juego

    constructor() {
        
        this.newGame();

        /*
            Implementa la logica del juego:
            - Verifica si el juego ah terminado 
            - Si no ah terminado, verifica que la tecla sea una letra
            - Si es una letra, verifica que esta no se haya ingresado anteriormente, o, que esta sea parte de la palabra a adivinar
        */
        document.addEventListener('keydown', ((evt) => {

            if(this.#isOver) {
                evt.preventDefault();
                return;
            }

            let letter = evt.key.toUpperCase();

            if(letter.length == 1 && /^[A-Z]*$/.test(letter)) {
                
                if(this.#isErroneous(letter)) this.#addTry();

            }

        }));

    }
    
    newGame() {//Restablece todos los elementos y variables del juego

        this.#isOver = false;
        this.#tryCount = 0;

        //Limpia las filas de la tabla
        let newRow = document.createElement("tr");

        this.#row.replaceWith(newRow);
        this.#row = newRow;

        newRow = document.createElement("tr");

        this.#rowFailed.replaceWith(newRow);
        this.#rowFailed = newRow;

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

    //Verifica si letter existe en this.#word o #this.rowFailed y actualiza segun corresponda.
    #isErroneous(letter){

        let chars = this.#row.childNodes;
        let exist = false;//Variable de control para cocnocer si la letra ingresada existe en this.#word o #this.rowFailed

        //Verifica si la letra ingresada existe en this.#word
        for(let i = 0 ; i < this.#word.length ; i++) {
            
            if(letter == this.#word[i]) {
                chars[i].textContent = letter;
                exist = true;
            }

        }//fin for

        if(!exist) {

            chars = this.#rowFailed.childNodes;

            //Verifica si la letra ingresada existe en #this.rowFailed
            for (let i = 0; i < chars.length; i++) {
                if(chars[i].textContent == letter) {
                    exist = true;
                    break;
                }
            }//fin for

            if(!exist){
                let data = document.createElement("td");
                data.append(letter);
                this.#rowFailed.append(data);
            }//fin if

        }//fin if

        //Regresa la negacion de exist, ya que si tiene el valor true, significa que la letra existe en algun de las filas,
        //por lo que significa que no es erronea (false). Y viceversa.
        return !exist;

    }

    addWord(word){
        Game.#words.push(word);
    }

    #addTry(){//Anhade un intento al conteo y verifica si el usuario ah agotado sus intentos
        this.#tryCount++;
        if(this.#tryCount == 9) this.#isOver = true;
    }

    get isOver(){
        return this.#isOver;
    }

}