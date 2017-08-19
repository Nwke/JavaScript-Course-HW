/**
 * Created by Denis on 29.07.2017.
 */



const done = document.getElementsByClassName('done')[0];
const undone = document.getElementsByClassName('undone')[0];
let inputs = document.querySelectorAll('input');

for ( input of inputs ) input.addEventListener('click', move);


function move(e) {
	if ( e.target.parentNode.parentNode == undone) done.appendChild(e.target.parentNode);
	else undone.appendChild(e.target.parentNode)
}




























