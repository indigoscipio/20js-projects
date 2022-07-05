let mainContainer = document.querySelector(".main");
let btnClose = document.querySelector(".icon-close");
let btnDelete = document.querySelector("#delete");
let btnAdd = document.querySelector(".button--add");
let btnSubmit = document.querySelector("#submit");
let sliderInfo = document.querySelector(".slider-info");
let cardSlider = document.querySelector(".card-slider");
let modalContainer = document.querySelector(".modal-container");
let modalEl = document.querySelector(".modal");
let taQuestion = document.querySelector("#question");
let taAnswer = document.querySelector("#answer");

//initial variables
let idx = 0;
let space = 1.6;
let cardsData = getCardsData();
// let cardsData = [];

function getCardsData() {
  let cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
}
createCards();
showSliderInfo();

function slideRight() {
  idx++;
  if (idx >= cardsData.length) {
    idx = 0;
  }

  console.log(idx);

  //slide the card to the right
  cardSlider.style.transform = `translateX(calc(${-100 * idx}% - ${
    space * idx
  }rem))`;

  //Set or unflip all cards to default
  handlePagination();
  unFlipCard();
}

function slideLeft() {
  idx--;
  if (idx < 0) {
    idx = cardsData.length - 1;
  }
  console.log(idx);

  //slide the card to the left
  cardSlider.style.transform = `translateX(calc(${-100 * idx}% - ${
    space * idx
  }rem))`;

  //Set or unflip all cards to default
  handlePagination();
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

function toggleModal() {
  modalContainer.classList.toggle("active");
}

function addCard(e) {
  e.preventDefault();

  if (!taQuestion.value.trim() || !taAnswer.value.trim()) {
    alert("Can't be emptry!");
  } else {
    updateCardsData();
    showSliderInfo();
    createCards();
    toggleModal();
  }
}

function updateCardsData() {
  let newCardData = {
    question: taQuestion.value,
    answer: taAnswer.value,
  };
  taQuestion.value = "";
  taAnswer.value = "";
  cardsData.push(newCardData);
  setCardsData(cardsData);
}

function createCards() {
  cardSlider.innerHTML = "";
  cardsData.forEach((data, idx) => createCard(data, idx));
}

function createCard(data, idx) {
  let card = document.createElement("div");
  card.classList.add("flip-card");
  card.innerHTML = `
  <input type="checkbox" id="${idx}"/>
  <label class="flip-card" for="${idx}">
    <div class="card front">Q: ${data.question}</div>
    <div class="card back">A: ${data.answer}</div>
  </label>
  `;
  cardSlider.append(card);
}

function showSliderInfo() {
  sliderInfo.classList.remove("hidden");
  sliderInfo.innerHTML = `
        <button class="arrow-left">
            <i class="fa-solid fa-arrow-left"></i>
        </button>
        <p class="pagination">${idx + 1}/${cardsData.length}</p>
        <button class="arrow-right">
             <i class="fa-solid fa-arrow-right"></i>
        </button>`;

  let btnPrev = document.querySelector(".arrow-left");
  let btnNext = document.querySelector(".arrow-right");
  btnNext.addEventListener("click", slideRight);
  btnPrev.addEventListener("click", slideLeft);
}

function handlePagination() {
  let pagination = document.querySelector(".pagination");
  pagination.innerText = `${idx + 1}/${cardsData.length}`;
}

function deleteAllCards() {
  localStorage.clear();
  idx = 0;
  cardSlider.innerHTML = "";
  document.querySelector(".slider-info").classList.remove("hidden");
  cardSlider.style.transform = `translateX(0)`;
  window.location.reload();
}

//Event Listeners
btnClose.addEventListener("click", toggleModal);
btnAdd.addEventListener("click", toggleModal);
modalEl.addEventListener("submit", addCard);
btnDelete.addEventListener("click", deleteAllCards);
