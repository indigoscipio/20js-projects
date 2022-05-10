async function getRandomUser() {
  let res = await fetch("https://randomuser.me/api/");
  let data = await res.json();
  let user = data.results[0];
  console.log(user);
}
