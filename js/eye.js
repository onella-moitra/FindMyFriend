let passEl1 = document.getElementById('loginPassword')
let showEl1 = document.querySelector('.fa-eye-slash')
let hideEl1 = document.querySelector('.fa-eye')

showEl1.addEventListener('click', () => {
    passEl1.type = "text";
    //passEl2.type = "text";
    showEl1.classList.add("hide");
    hideEl1.classList.remove("hide");
})

hideEl1.addEventListener('click', () => {
    passEl1.type = "password";
    //passEl2.type = "password";
    showEl1.classList.remove("hide");
    hideEl1.classList.add("hide");
})
