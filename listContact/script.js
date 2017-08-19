/**
 * Created by Denis on 29.07.2017.
 */

var contactUl = document.querySelectorAll(".contacts-list")[0];
var data = JSON.parse(loadContacts());

function MyFunc (str,obj) {
	var mail = obj.email;
	var phone = obj.phone;
	var name = obj.name;
	str += `<li data-email=${mail} data-phone=${phone.split(" ").join('&nbsp')} ><strong>${name}</strong></li>`;
	return str

}


contactUl.innerHTML = contactUl.innerHTML = data.reduce(MyFunc,"");






























