let wordsContainer = document.querySelector("#words-container");
let letter = document.querySelectorAll(".letter");

let finalGuessArr = ["ninja", "nibba"];
let randomNum = Math.floor(Math.random() * finalGuessArr.length);
let finalGuess = finalGuessArr[randomNum];
let correctLetters = [];
let wrongLetters = [];

console.log(finalGuess);
function displayWord() {
  wordsContainer.innerHTML = `${finalGuess
    .split("")
    .map((letter) => {
      return `<div class="letter">${
        correctLetters.includes(letter) ? letter : ""
      }</div>`;
    })
    .join("")}`;
  let innerWord = wordsContainer.innerText.replace(/\n/g, "");
  console.log(innerWord);
  if (innerWord === finalGuess) {
    console.log("Word Matches!!!!!");
  }
}
displayWord();

//push alphabets only, to lowercase
document.addEventListener("keydown", (e) => {
  let { keyCode } = e;
  if (keyCode >= 65 && keyCode <= 90) {
    let letter = e.key;
    if (finalGuess.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
      } else {
        showNotification();
      }
    }
  }
});

//if the user enters the right word
//display the correct word and update the dom
