const urlBase = 'http://findmyfriend.online/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";


const myButton = document.getElementById("registerButton");

myButton.addEventListener('click', () => {
	console.log("CLick");
   doRegister(); 
});


function doRegister()
{
	
    window.location.href = "index.html";
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}