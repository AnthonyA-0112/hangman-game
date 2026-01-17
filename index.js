const wordContainer = document.querySelector("#wordContainer");
const themeLbl = document.querySelector("#themeLbl");
const hangman = document.getElementById("hangman");
const keyboard = document.querySelectorAll(".keyboard");
const instructionLbl = document.getElementById("instructionLbl");
const restartBtn = document.getElementById("restartBtn");
const hangmanWords = [
    {
        theme: "Food",
        words: [
            "apple", "banana", "carrot", "doughnut", "eggplant", 
            "fig", "grape", "hamburger", "icecream", "jalapeno",
            "kiwi", "lemon", "mango", "nectarine", "orange",
            "papaya", "quinoa", "raspberry", "spinach", "tomato"
        ]
    },
    {
        theme: "Animals",
        words: [
            "alligator", "butterfly", "cat", "dolphin", "elephant", 
            "flamingo", "giraffe", "hippopotamus", "iguana", "jaguar",
            "kangaroo", "lemur", "moose", "narwhal", "octopus",
            "penguin", "quail", "rhinoceros", "squirrel", "tiger"
        ]
    },
    {
        theme: "Countries",
        words: [
            "argentina", "brazil", "canada", "denmark", "egypt", 
            "france", "germany", "hungary", "india", "japan",
            "kenya", "italy", "mexico", "netherlands", "oman",
            "portugal", "greece", "russia", "spain", "thailand"
        ]
    },
    {
        theme: "Colors",
        words: [
            "amber", "black", "crimson", "denim", "emerald", 
            "fuchsia", "gold", "hazel", "indigo", "jade",
            "khaki", "lavender", "magenta", "navy", "olive",
            "peach", "quartz", "rose", "silver", "turquoise"
        ]
    },
    {
        theme: "Sports",
        words: [
            "archery", "baseball", "cricket", "diving", "equestrian", 
            "fencing", "golf", "hockey", "soccer", "judo",
            "kayaking", "lacrosse", "snooker", "netball", "basketball",
            "polo", "quidditch", "rowing", "sailing", "tennis"
        ]
    }
];

let theme = Math.floor(Math.random() * 5);
let word = Math.floor(Math.random() * 20);

let secretWord = hangmanWords[theme].words[word].toUpperCase();
let secretTheme = hangmanWords

let turn = 0;

themeLbl.textContent = `Theme: ${hangmanWords[theme].theme}`;
hangman.src = `Hangman PNGs/0.png`;

for(let i = 0; i < secretWord.length; i++){
    let animation = (i % 2 === 0 ) ? "up" : "down";
    wordContainer.innerHTML += `<div class="letter ${animation}"></div>`
}

const letters = document.querySelectorAll(".letter");
document.addEventListener('keypress', handleKeyPress);

keyboard.forEach(key => key.addEventListener("click", () => {
    handleGuess(key)
    key.style.pointerEvents = "none";
}));

restartBtn.addEventListener("click", () =>{
    const btn = document.getElementById("restartBtn");
    if(btn.style.visibility == "visible"){
        location.reload();
    }
})

function handleKeyPress(event) {
    const key = document.querySelector(`[data-key="${event.key.toUpperCase()}"]`);
      
    if (key) {
        if(key.style.pointerEvents != "none"){
            key.click();
        }
    }
}

function handleGuess(key){
    if(checkGuess(key.textContent)){
        correctGuess(key.textContent);
        instructionLbl.textContent = `${key.textContent} is Correct!`;
        key.classList.add("correct");
    } else{
        incorrectGuess();
        instructionLbl.textContent = `${key.textContent} is Incorrect!`;
        key.classList.add("incorrect");
    }

    if(checkWin()){
        
        keyboard.forEach(key => {
            key.style.pointerEvents = "none";
        });

        instructionLbl.textContent = ("You Win!");
        restartBtn.style.visibility = "visible";

    } else if (checkLose()){

        keyboard.forEach(key => {
            key.style.pointerEvents = "none";
        });

        instructionLbl.textContent = (`You Lose! Answer Was ${secretWord}`);
        restartBtn.style.visibility = "visible";
    }
}

function checkGuess(guess){
    for(let i = 0; i < secretWord.length; i++){
        if(guess === secretWord.charAt(i)){
            return true;
        }
    }

    return false;
}

function incorrectGuess(){
    turn++;
    hangman.src = `Hangman PNGs/${turn}.png`;
}

function correctGuess(guess){
    for(let i = 0; i < secretWord.length; i++){
        if(guess === secretWord.charAt(i)){
            letters[i].textContent = guess.toUpperCase();
        }
    }
}

function checkWin(){
    for(let i = 0; i < secretWord.length; i++){
        if(!letters[i].textContent){
            return false;
        }
    }

    return true;
}
  
function checkLose(){
    return turn == 6 ? true : false;
}

