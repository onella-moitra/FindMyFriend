const urlBase = 'http://findmyfriend.online/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";
var rowReferences = [];
const waypoints = [];
const ids = [];

const myButton = document.getElementById("logoutButton");
const searchButton = document.getElementById("searchButton");
const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const openAddContactButton=document.getElementById('openAddContactButton');
const modal = document.getElementById('confirmationModal');
const confirmButton = document.getElementById('confirmDelete');
const cancelButton = document.getElementById('cancelDelete');
const contactSearchResult = document.getElementById("contactSearchResult");
let rowToDelete, contactToDelete, rowToEdit, contactToEdit;

myButton.addEventListener('click', () => {
	console.log("Click");
    doLogout(); 
});

const addButton = document.getElementById("addButton");

addButton.addEventListener('click', (event) => {
	event.preventDefault();
	console.log("Click");
	const newFirstName = document.getElementById("FirstName");
	const firstNameError = document.getElementById("newFirstNameError");

	const newLastName = document.getElementById("LastName");
	const lastNameError = document.getElementById("newLastNameError");

	const newPhone = document.getElementById("PhoneNumber");
	const phoneError = document.getElementById("phoneNumberError");

	const newEmail = document.getElementById("EmailAddress");
	const emailError = document.getElementById("emailAddressError");

	const addForm = document.getElementById("addContactForm");

	function validatePhoneNumber(phoneNumber) {
		const phonePattern = /^\d+$/;
		return phonePattern.test(phoneNumber.trim()) && phoneNumber.trim().length === 10;
	}

	function validateEmail(email) {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email.trim());
	}
		
		let isValid = true;

		if (newFirstName.value === "") {
			newFirstName.style.border = "solid red 2px";
			firstNameError.style.display = "block";

			isValid = false;
		}

		if (newLastName.value === "") {
			newLastName.style.border = "solid red 2px";
			lastNameError.style.display = "block";

			isValid = false;
		} 

		if (!validatePhoneNumber(newPhone.value)) {
			newPhone.style.border = "solid red 2px";
			phoneError.style.display = "block";
			isValid = false;
		} 

		if (!validateEmail(newEmail.value)) {
			newEmail.style.border = "solid red 2px";
			emailError.style.display = "block";
			isValid = false;
		}

		if (!isValid) {
			return;
		}

		});

		document.getElementById("FirstName").addEventListener('input', function() {
			if(this.value.trim() !== "") {
				firstNameError.style.display = "none";
				newFirstName.style.border = "none";
			}
		  });
		  
		  document.getElementById("LastName").addEventListener('input', function() {
			if(this.value.trim() !== "") {
			  lastNameError.style.display = "none";
			  newLastName.style.border = "none";
			}
		  });

		  document.getElementById("PhoneNumber").addEventListener('input', function() {
			if(validatePhoneNumber(this.value.trim())) {
			  phoneError.style.display = "none";
			  newPhone.style.border = "none";
			}
		  
		  document.getElementById("EmailAddress").addEventListener('input', function() {
			if(validateEmail(this.value.trim())) {
			  emailError.style.display = 'none';
			  newEmail.style.border = "none";
			}
		  });  

		addContact(); 
});

searchButton.addEventListener('click', () => {
	searchContact();
});


openAddContactButton.addEventListener('click', () => {
	overlay.style.display = 'flex'; // Show the overlay and popup
});

function closePopup() {
    overlay.style.display = 'none'; // Hide the overlay and popup
 }

overlay.addEventListener('click', (event) => {
	if (event.target === overlay) { // Check if the click is on the overlay itself
		closePopup();
	}
});

confirmButton.addEventListener('click', () => {
    deleteContact(contactToDelete); 
	document.querySelector(".search-table tbody").deleteRow(rowToDelete);
    modal.style.display = "none";
    }
);

cancelButton.addEventListener('click', () => {
    modal.style.display = "none"; // Hide the modal
    rowToDelete = 0; // Reset
	contactToDelete = 0;
});

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Welcome, " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addContact()
{
	let firstName = document.getElementById("FirstName").value;
	let lastName = document.getElementById("LastName").value;
	let phoneNumber = document.getElementById("PhoneNumber").value;
	let emailAddress = document.getElementById("EmailAddress").value;

	//Easter Egg
	if(firstName.localeCompare("Rick") == 0 && lastName.localeCompare("Leinecker")==0){
		closePopup();
		console.log("DANGER");
		const body = document.body;
    	const soverlay = document.getElementById('soverlay');
    	const logoutMessage = document.getElementById('logout-message');

		body.classList.add('glitch');
        soverlay.classList.add('active');
        body.classList.add('flash');
		logoutMessage.style.display = 'block';

        setTimeout(() => {
            body.classList.remove('glitch');
            soverlay.classList.remove('active');
            body.classList.remove('flash');
            setTimeout(() => {
                doLogout();
            }, 3000);

        }, 5000); 
		return;
	}

	document.getElementById("contactAddResult").innerHTML = "";

	let tmp = {firstName:firstName,lastName:lastName,phoneNumber:phoneNumber,emailAddress:emailAddress,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddContacts.' + extension;

	let xhr = new XMLHttpRequest();

	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
				searchContact();
			}
		};

		xhr.send(jsonPayload);

	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
}

//load the contact
function searchContact()
{
	let srch = document.getElementById("searchInput").value;

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
			//document.getElementById("contactSearchResult").innerHTML = "Contacts have been retrieved";
				let jsonObject = JSON.parse( xhr.responseText ).results;
								//Display search on table
				let tableBody = document.querySelector(".search-table tbody"); // Select the table body
				rowReferences=[];
				// Clear existing rows
				tableBody.innerHTML = "";
				clearWaypoints();
				
				// Loop through jsonObject and add rows

				jsonObject.forEach((contact) => {

					let row = document.createElement("tr");
					rowReferences.push(row);
					// Assuming jsonObject contains objects like { name: "John", email: "john@example.com", phone: "1234567890" }
					
					const cellData = [
						contact.FirstName,
						contact.LastName,
						contact.Phone,
						contact.Email,
					];
					
					// 2. Loop through the data and create/append cells:
					cellData.forEach(dataItem => {
						const cell = document.createElement("td");
						// cell.id = `${dataItem} + ${i}`
						cell.textContent = dataItem;
						row.appendChild(cell);
					});

					// Add delete button to each row
					const actionCell = row.insertCell(); // Create a new cell for the button
					actionCell.classList.add(actionCell);
					const buttonContainer = document.createElement("div");
					
					const deleteButton = document.createElement("button");
					deleteButton.classList.add("deleteButton");
					deleteButton.style.color="red";
					deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
					// Attach event listener to the delete button (using a closure)

					//Attach references
					deleteButton.addEventListener("click", function(event) {
						event.preventDefault();
						rowToDelete = rowReferences.indexOf(row);
						contactToDelete = contact.ID;
						modal.style.display= "block";
					})

					//Create edit Button
					const editButton = document.createElement("button");
					editButton.classList.add("editButton");
					editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
					editButton.addEventListener("click", function() {

						contactToDelete = contact.ID;

						row.querySelector(".editButton").style.display = "none";
						row.querySelector(".saveButton").style.display = "inline-block";

						editRow(row);
					});

					//Create saveButton
					const saveButton = document.createElement("button")
					saveButton.classList.add("saveButton");
					saveButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
					saveButton.style.display = "none";
					saveButton.addEventListener("click", function() {
						
						row.querySelector(".editButton").style.display = "inline-block";
						row.querySelector(".saveButton").style.display = "none";
						saveRow(contact.ID, row);
					});

					console.log("created action cell");

					buttonContainer.appendChild(deleteButton);
					buttonContainer.appendChild(editButton);
					buttonContainer.appendChild(saveButton);

					actionCell.appendChild(buttonContainer);
					tableBody.appendChild(row);
				});

				const map = document.getElementById('map');
			
				jsonObject.forEach(contact => {
					const waypoint = document.createElement('button'); // Create a <button> element
					waypoint.classList.add('waypoint');
					waypoint.style.left = getRandomNumber(0, 750) + 'px';
					waypoint.style.top = getRandomNumber(0, 750) + 'px';
					waypoint.addEventListener('click', () => {
						window.location.href = '#contact-info';
					}); 
			
					const initials = (contact.FirstName.charAt(0) + contact.LastName.charAt(0)).toUpperCase();
					waypoint.textContent = initials;
			
					const tooltip = document.createElement('div');
						tooltip.classList.add('tooltip');
						tooltip.textContent = `${contact.FirstName} ${contact.LastName}`; // Tooltip text
			
					waypoint.appendChild(tooltip); // Add tooltip to the button
			
					map.appendChild(waypoint);
					waypoints.push(waypoint)
				});
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}

function editRow(row){

	let firstName = row.children[0];
	let lastName = row.children[1];
	let phone = row.children[2];
	let email = row.children[3];

	firstName.innerHTML = `<input type="text" value="${firstName.textContent}">`;
	lastName.innerHTML = `<input type="text" value="${lastName.textContent}">`;
	phone.innerHTML = `<input type="text" value="${phone.textContent}">`;
	email.innerHTML = `<input type="text" value="${email.textContent}">`;
}

function saveRow(ID, row){

	console.log("saving the row now");
	console.log(ID, row);

	let newFirstName = row.children[0].querySelector("input").value;
	let newLastName = row.children[1].querySelector("input").value;
	let newPhone = row.children[2].querySelector("input").value;
	let newEmail = row.children[3].querySelector("input").value;

	//If contact is valid
	// if(!validateFields(newFirstName, newLastName, newPhone, newEmail)){
	// 	console.log("invalid fields");
	// 	contactSearchResult.style.color = "red";
	// 	contactSearchResult.innerHTML = "Invalid fields!";
	// 	return;
	// }

	//rendering value to the textbox
	row.children[0].innerHTML = newFirstName;
	row.children[1].innerHTML = newLastName;
	row.children[2].innerHTML = newPhone;
	row.children[3].innerHTML = newEmail;

	//API call

	let tmp = { newFirstName:newFirstName, newLastName:newLastName, phoneNumber:newPhone, emailAddress:newEmail, contactId:ID};
    jsonPayload = JSON.stringify( tmp );
	console.log(jsonPayload);

    let url = urlBase + '/UpdateContacts.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST",url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200)
			{
				contactSearchResult.style.color = "white";
				contactSearchResult.innerHTML = "Contacts updated successfully!";
			}
		};
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("contactSearchResult").innerHTML = err.message;
    }
}

function deleteContact(ID)
{
	let tmp = {userId:userId,contactId:ID,};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/DeleteContacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				contactSearchResult.style.color = "green";
				document.getElementById("contactSearchResult").innerHTML = "Contacts have been deleted successfully!";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function clearWaypoints() {
    waypoints.forEach(waypoint => {
        map.removeChild(waypoint);
    });
    waypoints.length = 0; // Clear the array
}

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
        rowToDelete = 0;
		contactToDelete = 0;
    }
})

function validateFields(newFirstName,newLastName,newPhone,newEmail){

	function validateEmail(email) {
		var re = /\S+@\S+\.\S+/;
		return re.test(email.strip());
	}

	return ((newFirstName != "") || (newLastName != "") || (newPhone.length == 10 && !isNaN(newPhone)) || (validateEmail(newEmail)))
}

function checkExists(){

	let srch = document.getElementById("searchInput").value;
	
	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				xhr.send(jsonPayload);
				return true;
			}
		}
	}	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}		
