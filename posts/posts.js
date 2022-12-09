/* Posts Page JavaScript */
"use strict";

function getLoginData() {
    return JSON.parse(window.localStorage.getItem("login-data")) || {};
}


document.addEventListener("DOMContentLoaded", () => {

    const loginData = getLoginData();
    const postArea = document.getElementById("postArea");
    const baseURL = "https://microbloglite.herokuapp.com";
    const endpoint = "/api/posts?limit=10000&offset=0";

    function buildCard(section, post) {
        //created the card
        const div = document.createElement("div");
        div.className = "card";
        //put inside the document or card section which is a div being used
        section.appendChild(div);
    
        let cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerText = `${post.username}`;
    
        let desc = document.createElement("p");
        desc.innerText = `${post.text}`;
    
        let timeStamp = document.createElement("p");
        timeStamp.innerText = `${post.createdAt}`;
    
        const divBody = document.createElement("div");
        divBody.className = "card-body";
        div.appendChild(divBody);
        divBody.append(cardTitle, desc, timeStamp);
    
    
    }

    fetch(baseURL + endpoint, {
        method: "GET",
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${loginData.token}` // use the token we stored on the client browser disk for later use on the index.html with main.js code
        }
    }).then((response) => {
        return response.json()
    }).then((data) => {
        data.forEach(post => {
            //postArea.innerHTML += `<div class="card shadow p-3 mb-5">${post.text}</div>`;
            buildCard(postArea, post)
        });
    })
});
