let balance = document.querySelector("#balance");
let money_plus = document.querySelector("#money-plus");
let money_minus = document.querySelector("#money-minus");
let list = document.querySelector("#list");
let form = document.querySelector("#form");
let text = document.querySelector("#text");
let amount = document.querySelector("#amount");

// let dummyTranscactions = [
//   {
//     id: 1,
//     text: "Flower",
//     amount: -20,
//   },
//   {
//     id: 2,
//     text: "Bakery",
//     amount: 100,
//   },
//   {
//     id: 3,
//     text: "Stuff",
//     amount: -70,
//   },
//   {
//     id: 4,
//     text: "Computer",
//     amount: 400,
//   },
// ];

//update local storage transactions

let localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addTransactionToDOM(transaction) {
  // get sign
  let sign = transaction.amount < 0 ? "-" : "+";
  console.log(sign);

  //create a new li and assign class based on sign
  let item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
  ${transaction.text} <span>${sign}$${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
`;

  list.append(item);
}

//init app
function init() {
  list.innerHTML = "";
  transactions.forEach((transaction) => addTransactionToDOM(transaction));
  updateValues();
  updateLocalStorage();
}
init();

//remove transaction by id
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id != id);
  updateLocalStorage();
  init();
}

//update balance, income, and expense
function updateValues() {
  let amounts = transactions.map((transaction) => transaction.amount);
  console.log(amounts);
  let total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  let income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  let expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
  console.log(expense);
}

form.addEventListener("submit", addTransaction);
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() == "" || amount.value.trim() == "") {
    alert("add real stuff please");
  } else {
    let transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionToDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//generate random ID
function generateID() {
  return Date.now();
}
