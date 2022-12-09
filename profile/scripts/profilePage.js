// put this in bio api field
// https://en.gravatar.com/userimage/228590619/6c8d0c6fdd5e2afda399a75446c1bc1a.jpg?size=400
//set bio to path followed by (picture) | followed by bio text then split("|")

function getLoginData() {
  return JSON.parse(window.localStorage.getItem("login-data")) || {};
}


document.addEventListener("DOMContentLoaded", () => {
  const baseURL = "https://microbloglite.herokuapp.com";

  const loginData = getLoginData();
  const message = document.getElementById("createPost")
  const submit = document.getElementById("submit")
  const greet = document.getElementById("greetMsg");



  submit.addEventListener("click", () => {

      const options = {
          method: "POST",
          headers: {
              "Content-type": "application/json",
              'Authorization': `Bearer ${loginData.token}`
          },
          body: JSON.stringify({
              text: message.value,

          })
      }

      fetch(baseURL + "/api/posts", options)
          .then(response => response.json())
          .then(data => {
              console.log(data);
              // localStorage.setItem("login-data", JSON.stringify(data));
              window.location.href = "/posts/index.html";  // redirect
          });
  }); //END OF ADDEVENTLISTENER
  
  function findUser(){
    const div = document.getElementById("greetMsg");
    const message =  `Welcome <b>${loginData.username}!</b>
    <br>`;

    div.innerHTML = message;
}

fetch(baseURL + "/api/users/{username}", {
    method: "GET",
    headers: {
        "accept": "application/json",
        'Authorization': `Bearer ${loginData.token}`
    },
}).then((response)=>{
    return response.json()
}).then((data)=>{
    findUser(greet, data);
})

});//DOMCONTENTLOADED ENDING