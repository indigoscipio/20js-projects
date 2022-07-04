//users can flip each card to show its back content
//useres can swipe/slide each card
//users can add a new card by clicking the add card button
// when the add card button is clicked, a modal will popup.

let btnPrev = document.querySelector(".arrow-left");
let btnNext = document.querySelector(".arrow-right");
let cards = document.querySelectorAll(".flip-card");
let cardSlider = document.querySelector(".card-slider");
let pagination = document.querySelector(".pagination");

let idx = 0;
let space = 1.6;

btnNext.addEventListener("click", slideRight);
btnPrev.addEventListener("click", slideLeft);

function slideRight() {
  idx++;
  if (idx > cards.length - 1) {
    idx = 0;
  }

  console.log(idx);

  //slide the card to the right
  cardSlider.style.transform = `translateX(calc(${-100 * idx}% - ${
    space * idx
  }rem))`;

  //Set or unflip all cards to default
  unFlipCard();
}

function slideLeft() {
  idx--;
  if (idx < 0) {
    idx = cards.length - 1;
  }
  console.log(idx);

  //slide the card to the left
  cardSlider.style.transform = `translateX(calc(${-100 * idx}% - ${
    space * idx
  }rem))`;

  //Set or unflip all cards to default
  unFlipCard();
}

function unFlipCard() {
  let cb = document.querySelectorAll(`input[type="checkbox"]:checked`);
  cb.forEach((el) => {
    if (el.checked) {
      el.checked = false;
    }
  });
}
