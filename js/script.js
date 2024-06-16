const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText= document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--; // decrementa maxTime en -1
             return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Tiempo! ${correctWord.toUpperCase()} era la palabra correcta`)
        initGame(); //Llama a la función initGame, para que el juego pueda reiniciarse
    }, 1000);
}


const initGame = () => {
    initTimer(30); // Llamado a la función initTimer pasándole 30 como el valor máximo para maxTime
    let randomObj = words[Math.floor(Math.random() * words.length)]; //Toma el objeto random de palabras
    let wordArray = randomObj.word.split(""); //Splitea cada letra de la palabra random
    for(let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); //Toma el numero random, hace shuffle de las letras
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join(""); //Pasa la palabra mezclada a texto
    hintText.innerText = randomObj.hint; //Pasa la pista como texto
    correctWord = randomObj.word.toLocaleLowerCase(); //Pasa la palabra random a correctWord
    inputField.value = "";
    inputField.setAttribute("maxlenght", correctWord.length); // Setea el valor del input del atributo maxlenght al largo de la palbra
}
initGame();

const checkWord= () => {
    let userWord = inputField.value.toLocaleLowerCase(); //Toma el valor ingresado por el usuario
    if(!userWord) return alert("Por favor, ingrese una palabra"); //Si el usuario no ingresa nada
    if(userWord !== correctWord) return alert(`Ups! ${userWord} no es una palabra correcta`); // Si el user ingresa una palabra incorrecta
    alert(`Felicitaciones! ${userWord.toUpperCase()} es la palabra correcta!!`) //Si el user ingresa la palabra correcta
    initGame();
}   

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);