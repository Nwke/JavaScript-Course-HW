/**
 * Created by Denis on 29.07.2017.
 */

document.addEventListener('keydown',ready);
document.addEventListener('keydown',openSecret);
function ready(e) {
	const nav = document.getElementsByTagName('nav')[0];
	if ((e.ctrlKey) && (e.altKey) && (e.keyCode === 84)) {
		nav.classList.toggle("visible");
	}
}
const code = [89,84,78,74,75,74,85,66,90];
var i =0;
var win = false;
function openSecret(e) {
	if ( e.keyCode === code[i] ) {
		i++;
		if (i === code.length) {
			var secret = document.getElementsByClassName("secret")[0];
			secret.classList.add("visible");
		}
	}
	else {
		i= 0;
	}
}






























