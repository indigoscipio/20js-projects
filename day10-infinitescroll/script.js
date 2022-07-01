let inputFilter = document.querySelector("#filter");
let postsContainer = document.querySelector("#posts-container");
let loader = document.querySelector(".loader");

let page = 1;
let limit = 5;

async function getPosts() {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}?&_page=${page}`
  );
  let data = await res.json();
  return data;
}

async function displayPost() {
  //show the loader
  showLoader();

  setTimeout(async () => {
    let datas = await getPosts();
    console.log(datas);
    datas.forEach((data) => {
      let post = document.createElement("div");
      post.classList.add("post");
      post.innerHTML = `
      <div class="number">${data.id}</div>
      <div class="post-info">
        <h2 class="post-title">${data.title}</h2>
        <p class="post-body">
          ${data.body}
        </p>
      </div>
      `;
      postsContainer.append(post);
    });
    //hide the loader
    hideLoader();
  }, 500);
}
displayPost();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 1) {
    page++;
    console.log(page);
    displayPost();
  }
});

function showLoader() {
  loader.classList.add("active");
}

function hideLoader() {
  loader.classList.remove("active");
}

//filter post
function filterPosts(e) {
  let term = e.target.value.toUpperCase();
  let posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    let title = post.querySelector(".post-title").innerText.toUpperCase();
    let body = post.querySelector(".post-title").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
  console.log(term);
}
inputFilter.addEventListener("input", filterPosts);
