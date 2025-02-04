const myPassword = document.getElementById("loginPassword");
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");
const registerForm = document.getElementById('reg-form');
const errorMessage = document.getElementById('errorMessage-password');

var reg_label = document.getElementById('reg-loginPassword');
var signin_label = document.getElementById('signin-loginPassword');

const validationCriteria = [
  { regex: /[a-z]/g, element: letter },
  { regex: /[A-Z]/g, element: capital },
  { regex: /[0-9]/g, element: number },
  { regex: /.{8,}/, element: length }
];

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

registerForm.addEventListener('submit', (event) => {
  const isValid = validationCriteria.every(criteria => criteria.element.classList.contains("valid"));
  if (!isValid) {
    reg_label.style.color = 'white';
    errorMessage.style.display = 'block';
    event.preventDefault(); // Prevent form submission if validation fails
  } else {
    errorMessage.style.display = 'none';
  }
});
document.getElementById('loginPassword').onchange = function() {
  const isValid = validationCriteria.every(criteria => criteria.element.classList.contains("valid"));
  if (isValid) {
    reg_label.style.color = 'black';
    errorMessage.style.display = 'none';
  }
}