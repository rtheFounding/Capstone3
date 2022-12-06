// put this in bio api field
// https://en.gravatar.com/userimage/229159858/31c2b6318e1744ce4be1c1cefaa173ad.jpg?size=400

"use strict";

const $ = document;
let menu = $.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 30) {
    menu.classList.add("scroll");
  } else {
    menu.classList.remove("scroll");
  }
});

const api = "https://microbloglite.herokuapp.com";
const time = when.toLocaleTimeString();
const message = docment.getElementById("createPost");
const submit = document.getElementById("submit");

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: localStorage.username,
    message: message.value,
    timestamp: time,
  }),
};

submit.addEventListener("click", () => {
  fetch(api + "/api/posts", options)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .finally(() => {
      // We're using `finally()` so that we will continue with the
      // browser side of logging out (below) even if there is an
      // error with the fetch request above.

      window.localStorage.removeItem("login-data"); // remove login data from LocalStorage
      window.location.assign("/posts"); // redirect to landing page
    });
}); // end of add eventlistener

// LOGOUT
function isLoggedIn() {
  const loginData = getLoginData();
  return Boolean(loginData.token);
}

function getLoginData() {
  return JSON.parse(window.localStorage.getItem("login-data")) || {};
}

const logoutBtn = document.getElementById("logout");
// This is the `logout()` function you will use for any logout button
// which you may include in various pages in your app. Again, READ this
// function and you will probably want to re-use parts of it for other
// `fetch()` requests you may need to write.
logoutBtn.addEventListener("click", () => {
  const loginData = getLoginData();

  // GET /auth/logout
  const options = {
    method: "GET",
    headers: {
      // This header is how we authenticate our user with the
      // server for any API requests which require the user
      // to be logged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(api + "/auth/logout", options)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .finally(() => {
      // We're using `finally()` so that we will continue with the
      // browser side of logging out (below) even if there is an
      // error with the fetch request above.

      window.localStorage.removeItem("login-data"); // remove login data from LocalStorage
      window.location.assign("/"); // redirect to landing page
    });
});

// this could be for ayomide
/*
document.getElementById("enter").addEventListener("click", () => {
    localStorage.userName = document.getElementById("userName").value;
    localStorage.kind = document.forms[0].elements["kind"].value;
  
    // localStorage.setItem("userName", document.getElementById("userName").value);
    // localStorage.setItem("kind",  document.forms[0].elements['kind'].value);
    // self.location = "information.html";
    // location.href = "information.html";
    location = "information.html";
  });

*/

/*
const welcomeMessage = document.getElementById("welcomeMessage");

const userName = localStorage.userName;

document.welcomeMessage.innerHTML = `
        <h1>
            Welcome
            ${userName}!
        </h1>
    `;
*/

/*
function isLoggedIn () {
    const loginData = getLoginData();
    return Boolean(loginData.token);
} */
