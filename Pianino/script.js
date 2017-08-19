/**
 * Created by Denis on 29.07.2017.
 */

const ArrSrcLower = ["https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/first.mp3","https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/second.mp3","https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/third.mp3","https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fourth.mp3","https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fifth.mp3"];
const ArrSrcMiddle = ["https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/first.mp3","https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/second.mp3","https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/third.mp3","https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fourth.mp3","https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fifth.mp3"];
const ArrSrcHigh = ["https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/first.mp3","https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/second.mp3","https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/third.mp3","https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fourth.mp3","https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fifth.mp3"];
const audiAll = document.getElementsByTagName("audio");
const liAll = document.getElementsByTagName("li");
var high = 0;
var low = 0;
var ul = document.getElementsByClassName("set")[0];
for (var butt of liAll) {
	butt.addEventListener('click',ready);
	document.addEventListener('keyup',ready);
}

document.addEventListener('keydown',sws);



function sws(e) {
	if (e.altKey) {
		ul.classList.remove("middle");
		ul.classList.remove("lower");
		ul.classList.add("higher");

	}
	else if (e.shiftKey) {
		ul.classList.remove("middle");
		ul.classList.remove("higher");
		ul.classList.add("lower");

	}
	else if ((!e.shiftKey) && (!e.altKey)) {
		ul.classList.remove("higher");
		ul.classList.remove(("lower"));
		ul.classList.add("middle");

	}
}

function ready(event) {
	if (event.altKey) {
		ul.classList.remove("middle");
		ul.classList.remove("lower");
		ul.classList.add("higher");
		for (let i = 0; i < audiAll.length; i++) {
			audiAll[i].src = ArrSrcHigh[i];
		}
	}
	else if (event.shiftKey) {
		ul.classList.remove("middle");
		ul.classList.remove("higher");
		ul.classList.add("lower");
		for (let i = 0; i < audiAll.length; i++) {
			audiAll[i].src = ArrSrcLower[i];
		}
	}
	else if ((!event.shiftKey) && (!event.altKey)) {
		ul.classList.remove("higher");
		ul.classList.remove("lower");
		ul.classList.add("middle");
		for (let i = 0; i < audiAll.length; i++) {
			audiAll[i].src = ArrSrcMiddle[i];
		}
	}
	event.target.lastElementChild.play();
}






























