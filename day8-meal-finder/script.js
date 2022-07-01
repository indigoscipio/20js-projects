let btnSearch = document.querySelector("button.search");
let searchInput = document.querySelector("#search");
let btnRandom = document.querySelector("button.random");
let resultHeading = document.getElementById("result-heading");
let mealsEl = document.getElementById("meals");
let single_mealEl = document.getElementById("single-meal");

// Seach by letters: https://www.themealdb.com/api/json/v1/1/search.php?f=a

function searchMeal(e) {
  e.preventDefault();
  single_mealEl.innerHTML = "";
  let term = searchInput.value;

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        resultHeading.innerHTML = `<h2>Showing results for ${term}: `;
        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>No such meals found. Please try again! `;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class="meal">
          <img src="${meal.strMealThumb}"></img>
          <div class="meal-info" data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
          </div>
        </div>`
            )
            .join("");
        }
      });
    searchInput.value = "";
  } else {
    alert("Can't be empty, yo!");
  }
}

function getRandomMeal() {
  single_mealEl.innerHTML = "";
  mealsEl.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then((res) =>
    res.json().then((data) => {
      let meal = data.meals[0];
      addMealToDom(meal);
      console.log(data);
    })
  );
}

function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`).then(
    (res) =>
      res.json().then((data) => {
        let meal = data.meals[0];
        addMealToDom(meal);
      })
  );
}

function addMealToDom(meal) {
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  single_mealEl.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}"></img>
    <div class="single-meal-info">
      <p>${meal.strCategory}</p>
      <p>${meal.strArea}</p>
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
      ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
      </ul>
    </div>
  </div>
  `;
  console.log(ingredients);
}

//Event Listeners
btnRandom.addEventListener("click", getRandomMeal);
btnSearch.addEventListener("click", searchMeal);
mealsEl.addEventListener("click", (e) => {
  let mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      false;
    }
  });
  if (mealInfo) {
    let mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});
