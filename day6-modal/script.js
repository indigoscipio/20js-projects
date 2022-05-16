let btnMenu = document.querySelector(".menu-icon");
let sidebar = document.querySelector(".sidebar");
let mainContainer = document.querySelector(".main-container");

btnMenu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  btnMenu.classList.toggle("active");
  mainContainer.classList.toggle("active");
});
