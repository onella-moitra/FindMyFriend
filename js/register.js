const urlBase = 'http://findmyfriend.online/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('registerButton');
    const loginResult = document.getElementById('loginResult');

    registerButton.addEventListener('click', function() {
        firstName = document.getElementById('firstName').value;
        lastName = document.getElementById('lastName').value;
        const loginName = document.getElementById('loginName').value;
        const loginPassword = document.getElementById('loginPassword').value;

        if (firstName && lastName && loginName && loginPassword) {
            doRegister(firstName, lastName, loginName, loginPassword);
        } else {
            loginResult.textContent = 'Please fill in all fields.';
            loginResult.style.color = 'red';
        }
    });
});

function doRegister(firstName, lastName, loginName, loginPassword) {
    const jsonPayload = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        login: loginName,
        password: loginPassword
    });

    const url = `${urlBase}/Register.${extension}`;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                const jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;

                saveCookie();

                document.getElementById("registerResult").innerHTML = "Account created for ${firstName} ${lastName} with loginName ${loginName}.";
                document.getElementById('loginResult').style.color = 'green';

                window.location.href = "tables.html";
            }

            if(this.status===409){
                document.getElementById("registerResult").innerHTML = "Username is already taken.";
                document.getElementById('loginResult').style.color = 'red';

            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        document.getElementById("registerResult").innerHTML = err.message;
        document.getElementById('loginResult').style.color = 'red';
    }
}

function saveCookie() {
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = `firstName=${firstName},lastName=${lastName},userId=${userId};expires=${date.toGMTString()}`;
}
