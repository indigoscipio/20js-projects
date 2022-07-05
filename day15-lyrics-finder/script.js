let inputSearch = document.querySelector("#input-search");
let btnSearch = document.querySelector("#button-search");
let form = document.querySelector("#form");
let mainContainer = document.querySelector(".main .container");
let moreContainer = document.querySelector(".more .container");
let apiURL = "https://api.lyrics.ovh";

async function getLyrics(term) {
  mainContainer.innerHTML = ``;
  moreContainer.innerHTML = ``;
  let loader = document.createElement("div");
  loader.classList.add("loader");
  mainContainer.append(loader);

  let response = await fetch(`${apiURL}/suggest/${term}`);
  let data = await response.json();

  loader.remove();
  return data;
}

async function getMoreSongs(url) {
  let response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  let data = await response.json();
  updateDOM(data);
  console.log(data);
}

async function searchLyrics(e) {
  e.preventDefault();

  //trim validation
  if (!inputSearch.value) {
    alert("Input can't be empty!");
  } else {
    let term = inputSearch.value;
    let data = await getLyrics(term);
    updateDOM(data);
  }
}

async function updateDOM(data) {
  //clear main container
  mainContainer.innerHTML = "";

  //create UL element
  let lyricsList = document.createElement("ul");
  lyricsList.classList.add("lyrics-list");
  mainContainer.append(lyricsList);

  //create LI for each data and push it to DOM
  data.data.forEach((element) => {
    let listItem = document.createElement("li");
    listItem.classList.add("list-item");
    listItem.dataset.artist = element.artist.name;
    listItem.dataset.songTitle = element.title;
    listItem.innerHTML = `
    <p><b>${element.artist.name}</b> - ${element.title}</p>
    <button class="button button--get-lyrics">Get Lyrics</button>
    `;
    lyricsList.append(listItem);
  });

  //show pagination
  if (data.prev || data.next) {
    moreContainer.innerHTML = `
    ${
      data.prev
        ? `<button class="button button--previous" onclick="getMoreSongs('${data.prev}')">Previous</button>`
        : ""
    }
    ${
      data.next
        ? `<button class="button button--next" onclick="getMoreSongs('${data.next}')">Next</button>`
        : ""
    }
    `;
  } else {
    moreContainer.innerHTML = ``;
  }
}

form.addEventListener("submit", searchLyrics);

async function getLyricsDetail(artist, songTitle) {
  mainContainer.innerHTML = ``;
  moreContainer.innerHTML = ``;

  let loader = document.createElement("div");
  loader.classList.add("loader");
  mainContainer.append(loader);

  let response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  let data = await response.json();

  let lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, `<br>`);
  mainContainer.innerHTML = `
  <h2>${songTitle} — ${artist}</h2>
  <div>${lyrics}</div>
  `;

  loader.remove();
  moreContainer.innerHTML = ``;
}

mainContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("button--get-lyrics")) {
    let artist = e.target.parentElement.getAttribute("data-artist");
    let songTitle = e.target.parentElement.getAttribute("data-song-title");
    getLyricsDetail(artist, songTitle);
    console.log(artist, songTitle);
  }
});
//   let pagination = document.createElement("div");
//   pagination.classList.add("pagination");
//   pagination.innerHTML = `
//   <button class="button button--previous">Previous</button>
//   <button class="button button--previous">Next</button>
//   `;
//   mainContainer.append(pagination);
