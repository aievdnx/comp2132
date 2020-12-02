//grabbing all elements...
let buttons = document.getElementsByClassName('guessButton');
let result = document.getElementById('message');
let image = document.getElementById("ham");
let word_display = document.getElementById('word');
let description = document.getElementById('definition');

//list of words
let words = ['HAMSTER', 'UNIVERSITY', 'CHOCOLATE', 'COOKIE', 'COSTUME',
    'GARDENING', 'CROCHET', 'SPIDER', 'TOOTHBRUSH', 'CHRISTMAS'];

//definitions for all words
let definitions = ['Hint: Type of rodent', 'Hint: Post secondary institution',
    'Hint: Made of cocoa', 'Hint: You put this in the oven',
    'Hint: What people wear during Halloween', 'Hint: The act of planting flowers, fruits or vegetables',
    'Hint: Using a hook and yarn to create a garment', 'Hint: Has eight legs',
    'Hint: You use this to brush your teeth', 'Hint: A holiday in December'];

//alphabet
let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', "G", "H", "I", "J", "K", "L", "M", 
                "N", "O", 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

//creating the game...
function gameMaker() {  
    let chooseWord = Math.floor(Math.random() * words.length);
    this.word = words[chooseWord];
    this.definition = definitions[chooseWord];
    this.numWrongGuess = 6;
    this.numRightGuess = 0;
    this.guessedLetters = [];
}

//creating the letter buttons
function generateButton() {
    for (let i = 0; i < alphabet.length; i++) {
        let newButton = document.createElement('button');
        newButton.className = 'guessButton';
        newButton.id = alphabet[i];
        newButton.innerText = alphabet[i];
        document.getElementById('clickableButtons').append(newButton);
        newButton.onclick = checkGuess(alphabet[i]);
    }
}

//disabling letter buttons
function disableButtons() {  
    for (let i = 0; i < buttons.length; i++) { 
        buttons[i].disabled = true; 
    }
}

//enabling letter buttons
function enableButtons() {
    let buttons = document.getElementsByClassName('guessButton');
    for (let i = 0; i < buttons.length; i++) { 
        buttons[i].disabled = false; 
    }
}

//displaying the letters
function displayWord() {
    word_display.innerText = "";
    for (let i = 0; i < hangman.word.length; i++) {
        word_display.innerHTML += "&nbsp";  
        if (hangman.guessedLetters.includes(hangman.word[i])) {
            word_display.innerText += hangman.word[i]; 
        } else {
            word_display.innerText += "_";
        }
    }
}

//displaying the definition of word
function displayDefinition() {
    description.innerText = hangman.definition;
}

//reset button
function playAgain() { 
    disableButtons();
    hangman = new gameMaker();
    displayWord();
    displayDefinition();
    result.innerText = "";
	image.src = 'images/ham7.png';
    enableButtons();
}

//checking if button that user clicked on is correct
function checkGuess(buttonID) {
    return function () {
        let button = document.getElementById(buttonID);
        button.disabled = true;  
        if (hangman.word.includes(buttonID)) {
            rightGuess(buttonID);
        } else {
            wrongGuess();
        }
    }
}

//what happens if the guess is correct
function rightGuess(letter) {
    hangman.guessedLetters.push(letter);
    displayWord(); 
    let numberOfRightChar = (hangman.word.split(letter).length - 1);
    hangman.numRightGuess += numberOfRightChar;
    if (hangman.numRightGuess == hangman.word.length) {
        result.innerText = `Hooray you win! Click 'Reset' to play again.`;
        disableButtons();
        document.getElementById('resetbutton').onclick = playAgain;
    }
}

//fading function because I'm not using JQuery...
function fadeIn() {
    let fading = 0;
    image.style.opacity = fading;
    var timer = setInterval(function () {
      if (fading >= 1){
        clearInterval(timer);
      }
      image.style.opacity = fading;
      fading = fading + 0.1;
    }, 50);
}

//what happens when the guess is wrong
function wrongGuess() {
    hangman.numWrongGuess--;
    if (hangman.numWrongGuess > 0) {
        result.innerText = `Wrong! You have ${hangman.numWrongGuess} guesses left.`;
        image.src = `images/ham${hangman.numWrongGuess}.png`;
        fadeIn(image.src);
    } else if (hangman.numWrongGuess == 0) {
        document.getElementById('resetbutton').onclick = playAgain;
        result.innerText = `You lose! Click 'Reset' to start again.`; 
        image.src = `images/ham0.png`;
        disableButtons();
    }
}

//calling functions
let hangman = new gameMaker();
generateButton();
displayWord();
displayDefinition();