let personWealth = document.querySelector(".person-wealth");
let btnAddUser = document.querySelector("#add-user");
let btnDoubleMoney = document.querySelector("#double-money");
let btnSortRichest = document.querySelector("#sort-richest");
let btnShowMillionaires = document.querySelector("#show-millionaires");
let btnCalculateWealth = document.querySelector("#calculate-wealth");
let dataTable = document.querySelector(".table");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  let res = await fetch("https://randomuser.me/api/");
  let data = await res.json();
  let user = data.results[0];
  let newUser = {
    firstName: user.name.first,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

//add new obj to data array
function addData(obj) {
  data.push(obj);
  console.log(data);
  updateDOM();
}

function updateDOM(providedData = data) {
  dataTable.innerHTML = `
  <div class="table-title">
    <h2><strong>Person</strong>Wealth</h2>
  </div><div class="line"></div>
  `;
  providedData.forEach((item) => {
    let newItem = document.createElement("div");
    newItem.innerHTML = `<h3><strong>${item.firstName}</strong>${formatMoney(
      item.money
    )}</h3>`;
    dataTable.appendChild(newItem);
  });
}

function formatMoney(money) {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(money);
}

//Add New User Function
function addNewUser() {
  getRandomUser();
}

//Double Money function
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

//sort by wealth
function sortRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

//show Millionaires
function showMillionaires() {
  data = data.filter(function (user) {
    if (user.money > 1000000) {
      return user;
    }
  });
  updateDOM();
}

//calculate wealth
function calculateWealth() {
  let wealth = data.reduce((acc, user) => (acc += user.money), 0);

  let wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: ${formatMoney(wealth)}</h3>`;
  dataTable.appendChild(wealthEl);
}

//button events
btnAddUser.addEventListener("click", addNewUser);
btnDoubleMoney.addEventListener("click", doubleMoney);
btnSortRichest.addEventListener("click", sortRichest);
btnShowMillionaires.addEventListener("click", showMillionaires);
btnCalculateWealth.addEventListener("click", calculateWealth);
