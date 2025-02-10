const usernameInput = document.getElementById("loginName");
const usernameLabel = document.getElementById("signinUser");
const usernameError = document.getElementById("usernameError");
const loginForm = document.getElementById("signin-form");

loginForm.addEventListener("submit", function(event) {
    let isValid = true;

    if (usernameInput.value === "") {
        usernameLabel.style.color = "white";
        usernameError.style.display = "block";

        isValid = false;
    } else {
        usernameLabel.style.color = "black";
        usernameError.style.display = "none";
    }

    if (!isValid) {
        event.preventDefault();
        return false;
    }
});