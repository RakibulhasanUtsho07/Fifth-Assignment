console.log("hi ia am js")

const singInBtn = document.getElementById("sing-in-btn");
const userName = document.getElementById("user-name");
const userPassword = document.getElementById("user-password");


singInBtn.addEventListener("click", function(){
    if(userName.value === "admin" && userPassword.value === "admin123"){
        window.location.assign("/home.html");
        // alert("Sing in successfully");
    }
    else{
        alert("User name or User password are not matched")
    }


})