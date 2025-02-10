const newFirstName = document.getElementById("FirstName");
const firstNameError = document.getElementById("newFirstNameError");

const newLastName = document.getElementById("LastName");
const lastNameError = document.getElementById("newLastNameError");

const newPhone = document.getElementById("PhoneNumber");
const phoneError = document.getElementById("phoneNumberError");

const newEmail = document.getElementById("EmailAdress");
const emailError = document.getElementById("emailAddressError");

const addForm = document.getElementById("addContactForm");

function validatePhoneNumber(phoneNumber) {
    const phonePattern = /^\d+$/;
    return phonePattern.test(phoneNumber.trim());
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.trim());
}

addForm.addEventListener("submit", function(event) {

    console.log("This is the add form");
    
    let isValid = true;

    if (newFirstName.value === "") {
        newFirstName.style.border = "solid red 2px";
        firstNameError.style.display = "block";

        isValid = false;
    } else {
        firstNameError.style.display = "none";
        newFirstName.style.border = "none";
    }

    if (newLastName.value === "") {
        newLastName.style.border = "solid red 2px";
        lastNameError.style.display = "block";

        isValid = false;
    } else {
        lastNameError.style.display = "none";
        newLastName.style.border = "none";
    }

    if (!validatePhoneNumber(newPhone.value)) {
        newPhone.style.backgroundColor = "red";
        isValid = false;
    } else {
        newPhone.style.backgroundColor = "white";
    }

    if (!validateEmail(newEmail.value)) {
        newEmail.style.backgroundColor = "red";
        isValid = false;
    } else {
        newEmail.style.backgroundColor = "white";
    }

    if (!isValid) {
        event.preventDefault();
    }
});