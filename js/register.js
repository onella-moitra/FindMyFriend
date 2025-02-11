const urlBase = 'http://findmyfriend.online/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('registerButton');
    const firstNameInput = document.getElementById("firstName");

    const firstNameError = document.getElementById("firstNameError");
    const firstNameLabel = document.getElementById("firstNameLabel");

    const lastNameInput = document.getElementById("lastName");
    const lastNameError = document.getElementById('lastNameError');
    const lastNameLabel = document.getElementById("lastNameLabel");

    const email = document.getElementById("loginEmail");
    const emailError = document.getElementById("loginEmailErrorMessage");
    const emailLabel = document.getElementById("loginEmailLabel");

    const username = document.getElementById("loginName");
    const usernameError = document.getElementById("loginNameErrorMessage");
    const usernameLabel = document.getElementById("loginNameLabel");

    const myPassword = document.getElementById("loginPassword");
    const letter = document.getElementById("letter");
    const capital = document.getElementById("capital");
    const number = document.getElementById("number");
    const length = document.getElementById("length");
    const errorMessage = document.getElementById('errorMessage-password');
    const passwordLabel = document.getElementById('reg-loginPassword');

    const registerForm = document.getElementById('reg-form');
    var checkbox = document.getElementById('termsCheckbox');

    // Get the modal
    var modal = document.getElementById("termsModal");

    // Get the link that opens the modal
    var link = document.getElementById("termsLink");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    const validationCriteria = [
        { regex: /[a-z]/g, element: letter },
        { regex: /[A-Z]/g, element: capital },
        { regex: /[0-9]/g, element: number },
        { regex: /.{8,}/, element: length }
        ];

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email.trim());
    }

    myPassword.addEventListener('focus', () => {
        document.getElementById("password-message").style.display = "block";
      });
      
      myPassword.addEventListener('blur', () => {
        document.getElementById("password-message").style.display = "none";
      });
      
      myPassword.addEventListener('keyup', () => {
        validationCriteria.forEach(criteria => {
          if (myPassword.value.match(criteria.regex)) {
            criteria.element.classList.remove("invalid");
            criteria.element.classList.add("valid");
          } else {
            criteria.element.classList.remove("valid");
            criteria.element.classList.add("invalid");
          }
        });
    });

    registerButton.addEventListener('click', function(event) {

        event.preventDefault();

        let isValid = true;

        if (firstNameInput.value === "") {
            firstNameLabel.style.color = 'white';
            firstNameError.style.display = "block";
            isValid = false;
        }

        if (lastNameInput.value === "") {
            lastNameLabel.style.color = 'white';
            lastNameError.style.display = "block";
            isValid = false;
        }
        if (!validateEmail(email.value)) {
            emailLabel.style.color = "white";
            emailError.style.display = 'block';
            isValid = false;
        }

        if (username.value === "") {
            usernameLabel.style.color = 'white';
            usernameError.style.display = "block";
            isValid = false;
        }

        const passwordValid = validationCriteria.every(criteria => criteria.element.classList.contains("valid"));
        if (!passwordValid) {
            passwordLabel.style.color = 'white';
            errorMessage.style.display = 'block';
            isValid = false;
        } 

        if (!checkbox.checked) {
            isValid = false;
            document.getElementById('terms-error').style.display = 'block';
            event.preventDefault();
        }

    console.log("Passed Checkbox");

        if (!isValid) {return;}
        else {doRegister(firstNameInput.value, lastNameInput.value, loginEmail.value, loginName.value, loginPassword.value);}
    });

    document.getElementById("firstName").addEventListener('input', function() {
        if(this.value.trim() !== "") {
          firstNameLabel.style.color = 'black';
          firstNameError.style.display = 'none';
        }
      });
      
      document.getElementById("lastName").addEventListener('input', function() {
        if(this.value.trim() !== "") {
          lastNameLabel.style.color = 'black';
          lastNameError.style.display = 'none';
        }
      });
      
      document.getElementById("loginEmail").addEventListener('input', function() {
        if(validateEmail(this.value)) {
          emailLabel.style.color = 'black';
          emailError.style.display = 'none';
        }
      });
      
      document.getElementById("loginName").addEventListener('input', function() {
        if(this.value.trim() !== "") {
          usernameLabel.style.color = 'black';
          usernameError.style.display = 'none';
        }
      });
      
      document.getElementById('loginPassword').onchange = function() {
        const passwordValid = validationCriteria.every(criteria => criteria.element.classList.contains("valid"));
        if (passwordValid) {
          passwordLabel.style.color = 'black';
          errorMessage.style.display = 'none';
        }
      }

      // When the user clicks the link, open the modal 
      link.onclick = function(event) {
          event.preventDefault(); // Prevent the default link behavior
          fetch('terms.txt')
              .then(response => response.text())
              .then(data => {
                  document.getElementById('termsText').textContent = data;
                  modal.style.display = "block";
              });
      }
      
      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
          modal.style.display = "none";
      }
      
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }
      
      // Hide error message when checkbox is checked
      document.getElementById('termsCheckbox').onchange = function() {
          var checkbox = document.getElementById('termsCheckbox');
          var errorMessage = document.getElementById('errorMessage');
          if (checkbox.checked) {
              document.getElementById('terms-error').style.display = 'none';
          }
      }
});

function doRegister(firstName, lastName, loginEmail, loginName, loginPassword) {
    const jsonPayload = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        loginEmail: loginEmail,
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

