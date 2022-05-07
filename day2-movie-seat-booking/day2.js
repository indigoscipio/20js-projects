//look the value up
let movieSelection = document.querySelector("#movie-select");
let finalSeats = document.querySelector("#final-seats");
let finalPrice = document.querySelector("#final-price");
let seatContainer = document.querySelector(".seats-selection");
let seats = document.querySelectorAll(
  ".seats-selection > .row >  .seat:not(.occupied)"
);
let ticketPrice = +movieSelection.value;

//get total seats that are selected
//combine it with the movie & current cost
//display total seats & price

seatContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }
  updateSeatsCount();
  console.log(e.target);
});

//update seats & ticket price
function updateSeatsCount() {
  //Update seats count
  let selectedSeats = document.querySelectorAll(".row > .selected");
  console.log(`Total Selected Seats: ${selectedSeats.length}`);
  finalSeats.innerText = selectedSeats.length;
  finalPrice.innerText = `$${ticketPrice * selectedSeats.length}`;
}

//update movie
movieSelection.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  console.log(ticketPrice);
  updateSeatsCount();
});

// seats.forEach((seat) => {
//   seat.addEventListener("click", () => {
//     //Update seats count
//     seat.classList.toggle("selected");
//     let selectedSeats = document.querySelectorAll(".row > .selected");
//     console.log(`Total Selected Seats: ${selectedSeats.length}`);
//     finalSeats.innerText = selectedSeats.length;
//     finalPrice.innerText = `$${ticketPrice * selectedSeats.length}`;
//   });
// });

// //Movie dropdown
// movieSelection.addEventListener("change", (e) => {
//   let moviePrice = +e.target.value;
//   finalPrice.innerText = `$${moviePrice * selectedSeats.length}`;
// });
