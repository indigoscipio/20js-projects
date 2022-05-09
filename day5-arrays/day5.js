function getRandomUser() {
  fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results[0]);
    });
}
