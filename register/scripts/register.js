document.addEventListener("DOMContentLoaded", ()=>{

    const register = document.getElementById("registerButton");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const fullname = document.getElementById("fullName");
    
    register.addEventListener("click", ()=>{
        console.log(username.value);
        console.log(password.value);
                         
        const baseURL = "https://microbloglite.herokuapp.com";
        const endpoint = "/api/users";
        fetch(baseURL + endpoint, {
            method: "POST",
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                fullName: fullname.value,
            }),
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json()
        }).then((data)=>{
            console.log(data);
            localStorage.loginData = data;
            alert("Registration Success. Please Login.")
            window.location.href = "/index.html"
        })
    });
});