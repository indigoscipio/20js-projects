let btnPrev = document.querySelector(".arrow-left");
let btnNext = document.querySelector(".arrow-right");
let mainContainer = document.querySelector(".main");
let cards = document.querySelectorAll(".flip-card");
let btnClose = document.querySelector(".icon-close");
let btnAdd = document.querySelector(".button--add");
let btnSubmit = document.querySelector("#submit");
let cardSlider = document.querySelector(".card-slider");
let pagination = document.querySelector(".pagination");
let modalContainer = document.querySelector(".modal-container");
let modalEl = document.querySelector(".modal");
let taQuestion = document.querySelector("#question");
let taAnswer = document.querySelector("#answer");

//initial variables
let idx = 0;
let space = 1.6;
let cardsData = [];

// function slideRight() {
//   idx++;
//   if (idx > cards.length - 1) {
//     idx = 0;
//   }

//   console.log(idx);

//   //slide the card to the right
//   cardSlider.style.transform = `translateX(calc(${-100 * idx}% - ${
//     space * idx
//   }rem))`;

//   //Set or unflip all cards to default
//   unFlipCard();
// }

// function slideLeft() {
//   idx--;
//   if (idx < 0) {
//     idx = cards.length - 1;
//   }
//   console.log(idx);

//   //slide the card to the left
//   cardSlider.style.transform = `translateX(calc(${-100 * idx}% - ${
//     space * idx
//   }rem))`;

//   //Set or unflip all cards to default
//   unFlipCard();
// }

// function unFlipCard() {
//   let cb = document.querySelectorAll(`input[type="checkbox"]:checked`);
//   cb.forEach((el) => {
//     if (el.checked) {
//       el.checked = false;
//     }
//   });
// }

function toggleModal() {
  modalContainer.classList.toggle("active");
}

function addCard(e) {
  e.preventDefault();

  //empty trim validation
  if (!taQuestion.value.trim() || !taAnswer.value.trim()) {
    alert("Can't be emptry!");
  } else {
    toggleModal();

    let newCardData = {
      id: Date.now(),
      question: taQuestion.value,
      answer: taAnswer.value,
    };

    //push the data to card data
    cardsData.push(newCardData);
    console.log(cardsData);

    //Create card container
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
  }
}

function createSliderInfo() {
  let sliderInfo = document.createElement("div");
  sliderInfo.classList.add("slider-info");
  sliderInfo.innerHTML = `
        <button class="arrow-left">
            <i class="fa-solid fa-arrow-left"></i>
        </button>
        <p class="pagination">1/3</p>
        <button class="arrow-right">
             <i class="fa-solid fa-arrow-right"></i>
        </button>`;

  mainContainer.append(sliderInfo);
}

function deleteAllCards() {
  return true;
}

//Event Listeners
// btnNext.addEventListener("click", slideRight);
// btnPrev.addEventListener("click", slideLeft);
btnClose.addEventListener("click", toggleModal);
btnAdd.addEventListener("click", toggleModal);
modalEl.addEventListener("submit", addCard);
