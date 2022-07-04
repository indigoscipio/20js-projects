let mainContainer = document.querySelector(".main");
let cards = document.querySelectorAll(".flip-card");
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
let cardsData = [];

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

    //Create card input
    let cardInput = document.createElement("input");
    cardInput.type = "checkbox";
    cardInput.id = newCardData.id;

    let cardLabel = document.createElement("label");
    cardLabel.classList.add("flip-card");
    cardLabel.htmlFor = `${newCardData.id}`;
    cardLabel.innerHTML = `
    <div class="card front">Q: ${newCardData.question}</div>
    <div class="card back">A: ${newCardData.answer}</div>
    `;

    cardSlider.append(cardInput);
    cardSlider.append(cardLabel);

    //show slider info & card container
    document.querySelector(".card-container").classList.remove("hidden");
    document.querySelector(".footer").classList.remove("hidden");
    showSliderInfo();

    taQuestion.value = "";
    taAnswer.value = "";
  }
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
  cardsData = [];
  cardSlider.innerHTML = "";
  let idx = 0;
  document.querySelector(".slider-info").classList.add("hidden");
  document.querySelector(".footer").classList.add("hidden");
}

//Event Listeners
btnClose.addEventListener("click", toggleModal);
btnAdd.addEventListener("click", toggleModal);
modalEl.addEventListener("submit", addCard);
btnDelete.addEventListener("click", deleteAllCards);
