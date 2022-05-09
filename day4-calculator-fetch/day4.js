let currencyInput1 = document.getElementById("currency-one");
let currencyInput2 = document.getElementById("currency-two");
let amountInput1 = document.getElementById("amount-one");
let amountInput2 = document.getElementById("amount-two");
let swapButton = document.getElementById("swap");
let rateNotification = document.getElementById("#rate");

function calculate() {
  let currency1 = currencyInput1.value;
  let currency2 = currencyInput2.value;
  console.log(`${currency1} + ${currency2}`);

  fetch(
    `https://v6.exchangerate-api.com/v6/bc91bb97ebaa87c2ac47f317/latest/${currency1}`
  )
    .then((res) => res.json())
    .then((data) => {
      let rate = data.conversion_rates.currency1;
      console.log(rate);
    });
}

currencyInput1.addEventListener("change", calculate);
currencyInput2.addEventListener("change", calculate);
amountInput1.addEventListener("input", calculate);
amountInput2.addEventListener("input", calculate);
