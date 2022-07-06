let textInfo = document.querySelector(".info");
let circleContainer = document.querySelector(".circle-container");
let totalDuration = 8000;
let breatheTime = (totalDuration / 5) * 2;
let holdTime = totalDuration / 5;

circleContainer.classname = `circle-container`;

breathAnimation();
function breathAnimation() {
  textInfo.innerText = `Breathe In...`;
  circleContainer.classList.add("grow");

  setTimeout(() => {
    textInfo.innerText = `Hold...`;

    setTimeout(() => {
      textInfo.innerText = `Breathe out...`;
      circleContainer.classList.remove("grow");
    }, holdTime);
  }, breatheTime);
}

setInterval(breathAnimation, totalDuration);

// let textInfo = document.querySelector(".info");
// let circleContainer = document.querySelector(".circle-container");
// let duration = 8;
// let currentTime = 0;

// function relaxerApp() {
//   let interval = setInterval(() => {
//     if (currentTime === duration) {
//       currentTime = 0;
//     }
//     console.log(currentTime);
//     currentTime++;

//     if (currentTime < 3) {
//       circleContainer.style.transform = `scale(1.3)`;
//       textInfo.innerText = "Breathe In...";
//     }
//     if (currentTime > 3 && currentTime < 5) {
//       textInfo.innerText = "Hold";
//     }
//     if (currentTime > 5) {
//       textInfo.innerText = "Breathe Out...";
//       circleContainer.style.transform = `scale(1)`;
//     }
//   }, 1000);
// }
// relaxerApp();
