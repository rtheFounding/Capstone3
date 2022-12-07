// put this in bio api field
// https://en.gravatar.com/userimage/228590619/6c8d0c6fdd5e2afda399a75446c1bc1a.jpg?size=400
//set bio to path followed by (picture) | followed by bio text then split("|")

function getLoginData() {
    return JSON.parse(window.localStorage.getItem("login-data")) || {};
}


document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "https://microbloglite.herokuapp.com";

    const loginData = getLoginData();
    const message = document.getElementById("msgArea")
    const submit = document.getElementById("messageBtn")



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

});//DOMCONTENTLOADED ENDING