let listMain = document.querySelector("#list-main");
let btnCheck = document.querySelector(".button--check");

let dragStartIndex;
let dragEndIndex;
let listData = [
  "Name 1",
  "Name 2",
  "Name 3",
  "Name 4",
  "Name 5",
  "Name 6",
  "Name 7",
  "Name 8",
  "Name 9",
  "Name 10",
];

let listDOMs = [];

// create list
function createList() {
  listData
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((item, idx) => {
      let listItem = document.createElement("li");
      listItem.classList.add("list-item");
      listItem.dataset.index = idx + 1;
      listItem.innerHTML = `
    <div class="number">${idx + 1}</div>
    <div class="draggable" draggable="true">
      <p class="name">${item}</p>
      <i class="fa-solid fa-grip-lines"></i>
    </div>
    `;
      listDOMs.push(listItem);
      listMain.append(listItem);
    });

  let draggableItems = document.querySelectorAll(".draggable");
  draggableItems.forEach((item) => {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragover", handleDragOver);
    item.addEventListener("dragenter", handleDragEnter);
    item.addEventListener("dragleave", handleDragLeave);
    item.addEventListener("dragend", handleDragEnd);
    item.addEventListener("drop", handleDrop);
  });
}
createList();

function handleDragStart(e) {
  // console.log(e);
  this.style.opacity = 0.4;
  this.style.backgroundColor = `lightgray`;
  dragStartIndex = +this.parentElement.getAttribute("data-index");
}

function handleDragEnd(e) {
  // console.log(e);
  this.style.opacity = 1;
  this.style.backgroundColor = `transparent`;

  let draggableItems = document.querySelectorAll(".draggable");
  draggableItems.forEach((item) => {
    item.classList.remove("dragover");
  });
}

function handleDragOver(e) {
  e.preventDefault();
  return false;
}

function handleDragEnter(e) {
  this.classList.add("dragover");
}

function handleDragLeave(e) {
  this.classList.remove("dragover");
}

function handleDrop(e) {
  e.stopPropagation();

  dragEndIndex = +this.parentElement.getAttribute("data-index");

  swapItems(dragStartIndex, dragEndIndex);

  return false;
}

function swapItems(fromIdx, toIdx) {
  console.log(dragStartIndex, dragEndIndex);
  let itemOne = listDOMs[fromIdx - 1].querySelector(".draggable");
  let itemTwo = listDOMs[toIdx - 1].querySelector(".draggable");

  listDOMs[fromIdx - 1].appendChild(itemTwo);
  listDOMs[toIdx - 1].appendChild(itemOne);
}

//Check for order
btnCheck.addEventListener("click", check);
function check() {
  let currentDataArr = [];
  listDOMs.forEach((item, idx) => {
    let currentData = item.querySelector(".draggable").innerText.trim();

    currentDataArr.push(currentData);
    if (currentData == listData[idx]) {
      item.querySelector(".draggable").classList.remove("incorrect");
      item.querySelector(".draggable").classList.add("correct");
    } else {
      item.querySelector(".draggable").classList.add("incorrect");
    }
  });

  if (areEqual(currentDataArr, listData)) {
    alert("Congrats!! You've won the game :)");
  }
}

function areEqual(array1, array2) {
  if (array1.length === array2.length) {
    return array1.every((element, index) => {
      if (element === array2[index]) {
        return true;
      }
      return false;
    });
  }
  return false;
}
