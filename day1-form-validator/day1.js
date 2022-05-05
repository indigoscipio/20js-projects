let usernameInput = document.querySelector("input#username");
let emailInput = document.querySelector("input#email");
let pwInput = document.querySelector("input#password");
let pwConfirmInput = document.querySelector("input#password-confirmation");
let btnSubmit = document.querySelector("button#submit");

let usernameNotification = document.querySelector("#username-notification");
let emailNotification = document.querySelector("#email-notification");
let pwNotification = document.querySelector("#password-notification");
let pwConfirmNotification = document.querySelector(
  "#password-confirmation-notification"
);
let validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let loggedIn = false;

btnSubmit.addEventListener("click", checkAnswer);

function checkAnswer() {
  //username has to contain more than 5 characters.
  console.log("submitted!");
  if (usernameInput.value.length < 5) {
    usernameNotification.classList.remove("hidden");
    usernameInput.classList = "invalid";
    usernameNotification.innerText = "Must be more than 5 characters long!";
  } else {
    usernameInput.classList = "valid";
    usernameNotification.classList.add("hidden");
  }

  //email has to follow email format
  if (emailInput.value.match(validRegex)) {
    emailInput.classList = "valid";
    emailNotification.classList.add("hidden");
  } else {
    emailNotification.classList.remove("hidden");
    emailInput.classList = "invalid";
    emailNotification.innerText = "Email is invalid!";
  }

  //password check
  if (pwInput.value.length < 6) {
    pwNotification.classList.remove("hidden");
    pwInput.classList = "invalid";
    pwNotification.innerText = "Must be more than 6 characters long!";
  } else {
    pwInput.classList = "valid";
    pwNotification.classList.add("hidden");
  }

  //password confirmation
  if (pwInput.classList == "valid" && pwInput.value == pwConfirmInput.value) {
    pwConfirmInput.classList = "valid";
    pwConfirmNotification.classList.add("hidden");
  } else {
    pwConfirmNotification.classList.remove("hidden");
    pwConfirmInput.classList = "invalid";
    pwConfirmNotification.innerText = "Password do not match!";
  }

  //Put some kind of modal here
}
