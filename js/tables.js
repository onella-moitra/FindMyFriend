const urlBase = 'http://findmyfriend.online/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";
const rowReferences = [];
const waypoints = [];

const myButton = document.getElementById("logoutButton");
const searchButton = document.getElementById("searchButton");
const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const openAddContactButton=document.getElementById('openAddContactButton');
const modal = document.getElementById('confirmationModal');
const confirmButton = document.getElementById('confirmDelete');
const cancelButton = document.getElementById('cancelDelete');
let rowToDelete, contactToDelete;

myButton.addEventListener('click', () => {
	console.log("Click");
    doLogout(); 
});

const addButton = document.getElementById("addButton");

addButton.addEventListener('click', (event) => {
	event.preventDefault();
	console.log("Click");
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
				/*
				const tableBody = document.querySelector(".search-table tbody"); // Or get the table by ID
				const row = document.createElement("tr");
				const cellData = [
					firstName,
					lastName,
					phoneNumber,
					emailAddress
				  ];
				  
				  // 2. Loop through the data and create/append cells:
				  cellData.forEach(dataItem => {
					const cell = document.createElement("td");
					cell.textContent = dataItem;
					row.appendChild(cell);
				  });

				  // Add delete button to each row
				  const deleteCell = row.insertCell(); // Create a new cell for the button
				  const deleteButton = document.createElement("button");
				  deleteButton.className = "fa-solid fa-trash-can deleteButton";
				  deleteCell.appendChild(deleteButton);
				  // Attach event listener to the delete button (using a closure)
				  deleteButton.addEventListener("click", function(event) {
					event.preventDefault();
					rowToDelete = rowReferences.indexOf(row);
					contactToDelete = cell.ID;
					modal.style.display= "block";
				  });

				  tableBody.appendChild(row);
				  */


			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
}

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

				// Clear existing rows
				tableBody.innerHTML = "";
				clearWaypoints();
				
				// Loop through jsonObject and add rows
						jsonObject.forEach(contact => {
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
							cell.textContent = dataItem;
							row.appendChild(cell);
						  });

						// Add delete button to each row
						const deleteCell = row.insertCell(); // Create a new cell for the button
						const deleteButton = document.createElement("button");
						deleteButton.className = "fa-solid fa-trash-can deleteButton";
						deleteCell.appendChild(deleteButton);
						// Attach event listener to the delete button (using a closure)
						deleteButton.addEventListener("click", function(event) {
						  event.preventDefault();
						  rowToDelete = rowReferences.indexOf(row);
						  contactToDelete = contact.ID;
						  modal.style.display= "block";
						});
	  
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