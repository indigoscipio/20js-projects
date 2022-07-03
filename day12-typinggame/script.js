let currentWordEl = document.querySelector("#current-word");
let inputWord = document.querySelector("#input-word");
let scoreEl = document.querySelector(".score");
let timeEl = document.querySelector(".time");
let difficultiesEl = document.querySelectorAll(".input-difficulty");
let mainCard = document.querySelector(".card");

//Init Variables & States
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? +localStorage.getItem("difficulty")
    : 1;
var radioCheckedEl = localStorage.getItem("radioCheckedEl");
let radios = document.getElementsByName("difficulty");
for (var i = 0; i < radios.length; i++) {
  if (radios[i].dataset.level == radioCheckedEl) {
    radios[i].checked = true;
  }
}
let time = 60;
let words = ["drumsticks", "chuckaboo", "damfino", "dollymop", "rovolveress"];
let score = 0;
let interval = 0;
let gameOver = false;
let currentWord = words[randomize()];
currentWordEl.innerText = currentWord;
console.log(currentWord);

async function getRandomWords() {
  let res = await fetch(
    `https://random-word-api.herokuapp.com/word?number=100`
  );
  let data = await res.json();
  return data;
}
getRandomWords();

async function setRandomWords() {
  words = await getRandomWords();
}
setRandomWords();

function setDifficulty() {
  difficultiesEl.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.checked) {
        difficulty = +element.dataset.level;

        //set difficulty to local storage
        localStorage.setItem("difficulty", difficulty);

        //set button checked state to local storage
        let radioCheckedEl = document.querySelector(
          `input[type="radio"]:checked`
        );
        localStorage.setItem("radioCheckedEl", +radioCheckedEl.dataset.level);
      }
    });
  });
}
setDifficulty();

function checkGameOver() {
  gameOver = true;
  if (gameOver) {
    mainCard.innerHTML = `
    <h2>Halt! For thy game has now ended!!</h2>
    <p>Thou final score is: ${score}</p>
    <button class="button play-again">Tryeth Again?</button>
    `;
    let btnPlayAgain = document.querySelector(".play-again");
    btnPlayAgain.addEventListener("click", restartGame);
  }
}

function restartGame() {
  location.reload();
}

let timer = setInterval(() => {
  time--;
  timeEl.innerText = `Time Left: ${time}`;
  console.log(time);

  if (time == 0) {
    alert("Game Over!");
    //disable the input
    checkGameOver();
    inputWord.disabled = true;

    //display total score
    clearInterval(timer);
  }
}, 1000);

function randomize() {
  return Math.floor(Math.random() * words.length);
}

function addExtraTime(difficulty) {
  if (difficulty === 1) {
    interval = 5;
    time += interval;
    createExtraTimerElement(interval);
  } else if (difficulty === 2) {
    interval = 3;
    time += interval;
    createExtraTimerElement(interval);
  } else {
    interval = 1;
    time += interval;
    createExtraTimerElement(interval);
  }
}

function createExtraTimerElement(interval) {
  let extraTime = document.createElement("span");
  extraTime.classList.add("extra-time");
  extraTime.style.display = "inline-block";
  extraTime.innerText = `+${interval}`;
  timeEl.append(extraTime);
  setTimeout(() => {
    extraTime.remove();
  }, 500);
}

//check if input is correct or not
function checkInput() {
  console.log(inputWord.value);

  if (inputWord.value === currentWord) {
    //randomize again, pick a new word than the used one
    console.log("correct!");
    currentWord = words[randomize()];
    console.log(currentWord);

    //update the score
    score++;
    scoreEl.innerText = `Score: ${score}`;
    console.log(score);

    //add time based on difficulty
    addExtraTime(difficulty);

    //update the current word DOM element
    currentWordEl.innerText = currentWord;

    //add green border if it's correct
    inputWord.classList.remove("incorrect");
    inputWord.classList.add("correct");

    //reset the input value
    inputWord.value = "";
  } else {
    inputWord.classList.add("incorrect");
    inputWord.classList.remove("correct");
    //if the typed word is different, add a red border
  }
}

inputWord.addEventListener("input", checkInput);
