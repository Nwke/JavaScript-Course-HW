/**
 * Created by Denis on 29.07.2017.
 */

// Получаем список статей и их дата-атрибуты
let prevButton = document.querySelector("[data-action='prev']");
let firstButton = document.querySelector("[data-action='first']");
let nextButton =  document.querySelector("[data-action='next']");
let lastButton = document.querySelector("[data-action='last']");
let button;

let isCount = 0;
const slideList = document.querySelectorAll('.slide');
let elementCurrent = slideList[isCount];
elementCurrent.classList.add('slide-current');

const buttons = document.querySelectorAll('a');
for ( button of buttons ) {
	button.addEventListener('click', used)
}

function used(e) {
	if ( e.target.dataset.action ) {
		universal(e);
		scanState ();
	}
}

function scanState () {
	if ( elementCurrent != slideList[0] && elementCurrent != slideList[6] ) {
		prevButton.classList.remove('disabled');
		firstButton.classList.remove('disabled');
		nextButton.classList.remove('disabled');
		lastButton.classList.remove('disabled');
	}
	if ( elementCurrent == slideList[0] ) {
		prevButton.classList.add('disabled');
		firstButton.classList.add('disabled');
		nextButton.classList.remove('disabled');
		lastButton.classList.remove('disabled');
	}
	else if  ( elementCurrent == slideList[6] ) {
		nextButton.classList.add('disabled');
		lastButton.classList.add('disabled');
		prevButton.classList.remove('disabled');
		firstButton.classList.remove('disabled');
	}
}


function universal (e) {
	let elem = e.target;
	elementCurrent.classList.remove('slide-current');


	if ( elem.dataset.action == 'first' ) isCount = 0;

	else if ( elem.dataset.action == 'last' ) isCount = slideList.length - 1;

	else if ( ( elem.dataset.action == 'prev' ) && ( isCount - 1 >= 0) ) isCount -= 1;

	else if ( ( elem.dataset.action == 'next' ) && ( isCount + 1 <= slideList.length - 1) ) isCount += 1;

	elementCurrent = slideList[isCount];
	elementCurrent.classList.add('slide-current');

}
scanState ();




























