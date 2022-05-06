//look the value up
let movieSelection = document.querySelector("#movie-select");
let finalSeats = document.querySelector("#final-seats");
let finalPrice = document.querySelector("#final-price");
let seats = document.querySelectorAll(".seats-selection > .row >  .seat");

//get total seats that are selected
//combine it with the movie & current cost
//display total seats & price

seats.forEach((seat) => {
  seat.addEventListener("click", () => {
    //count & show the total price
    movieSelection.addEventListener("change", (e) => {
      let moviePrice = e.target.value;
      finalPrice.innerText = `$${moviePrice * selectedSeats.length}`;
    });

    if (seat.classList.contains("occupied") == true) {
      console.log("this seat is occupied!");
    }

    //count & update selected seats
    seat.classList.toggle("selected");
    let selectedSeats = document.querySelectorAll(".row > .selected");
    console.log(`Total Selected Seats: ${selectedSeats.length}`);
    finalSeats.innerText = selectedSeats.length;
  });
});
