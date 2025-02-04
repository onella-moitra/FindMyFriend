// Get the modal
var modal = document.getElementById("termsModal");

// Get the link that opens the modal
var link = document.getElementById("termsLink");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

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

// Form submission check
document.getElementById('reg-form').onsubmit = function(event) {
    var checkbox = document.getElementById('termsCheckbox');
    if (!checkbox.checked) {
        document.getElementById('terms-error').style.display = 'block';
        event.preventDefault(); // Prevent form submission
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


