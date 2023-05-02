"use strict";

// https://jsonplaceholder.typicode.com/posts?_limit=5&_page=1

const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 3;
let page = 1;

// Fetch posts from API
const getPosts = async function () {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();

  // return a promise "data"
  return data;
};

// Show posts in DOM
const showPosts = async function () {
  const posts = await getPosts();

  // creating and inserting each post
  posts.forEach((post) => {
    const html = `
    <div class="post">
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">
      ${post.body}
      </p>
    </div>
    `;

    postsContainer.insertAdjacentHTML("beforeend", html);
  });
};

// Show loader and fetch more posts
const showLoading = function () {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      showPosts();
    }, 500);
  }, 1000);
};

// Filter posts by input
const filterPosts = function (e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();
    console.log(title);

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
};

// EVENT LISTENERS
window.addEventListener("scroll", function () {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  // scrollTop = distance in px from 0 (initial state) scrolling down
  // clientHeight = visible height of the body
  // scrollHeight = total height of the body including part not visible due to scrolling bar
  // console.log(scrollTop, clientHeight, scrollHeight);

  // standard condition
  if (scrollTop + clientHeight >= scrollHeight) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);

// INITIALIZATION
showPosts();
