let synth = window.speechSynthesis;
let text = "";
let gridContainer = document.querySelector(".grid-container");
let gridItems = document.querySelectorAll(".grid-item");
let modal = document.querySelector(".modal");
let btnToggle = document.querySelector(".button--toggle");
let btnRead = document.querySelector(".button--read");
let btnCloseModal = document.querySelector(".icon-close");
let textarea = document.querySelector("#textarea");
let voiceSelect = document.querySelector(".select-input");
let voices = [];

gridItems.forEach((item) => item.addEventListener("click", readGridItem));

function readGridItem() {
  synth.cancel();

  text = this.children[1].innerText;

  let utterThis = new SpeechSynthesisUtterance(text);
  var selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");

  for (i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }

  synth.speak(utterThis);
}

//add a click event on each card

//toggle the modal
btnToggle.addEventListener("click", toggleModal);
btnCloseModal.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("active");
}

//Populate voice
function populateVoiceList() {
  voices = speechSynthesis.getVoices();

  let selectedIndex =
    voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = "";

  for (let i = 0; i < voices.length; i++) {
    let option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }

  //   voiceSelect.selectedIndex = selectedIndex;
}
populateVoiceList();
if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

//update the voice based on selection
btnRead.addEventListener("click", readTextArea);
function readTextArea() {
  var utterThis = new SpeechSynthesisUtterance(textarea.value);
  var selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");

  for (i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }

  synth.speak(utterThis);
}
