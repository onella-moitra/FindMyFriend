let passEl1 = document.getElementById('loginPassword')
let showEl1 = document.getElementById('showPassword');
let hideEl1 = document.getElementById('hidePassword');

showEl1.style.display = "none";

hideEl1.addEventListener('click', () => {
    passEl1.type = "text";
    showEl1.style.display = "block";
    hideEl1.style.display = "none";
})

showEl1.addEventListener('click', () => {
    passEl1.type = "password";
    showEl1.style.display = "none";
    hideEl1.style.display = "block";
})
