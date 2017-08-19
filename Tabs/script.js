/**
 * Created by Denis on 29.07.2017.
 */



	// Получаем список статей и их дата-атрибуты и делаем нужные манипуляции
let arrayArticl = document.querySelectorAll("[data-tab-title");
let articl;
let isTrigger;

for ( articl of arrayArticl ) articl.classList.add('hidden');
arrayArticl[0].classList.remove('hidden');

// Создаем меню табов
const navTab = document.querySelector('.tabs-nav');
let demoTab = navTab.firstElementChild;

addTab();
navTab.removeChild(demoTab);

// Когда я писал дальнейшик код,то я предполагал,что количество табов = количество статей.

function Swirl(e) {
	let elem = e.target;

	function hack() {
		document.querySelector('.ui-tabs-active').classList.remove('ui-tabs-active');
		elem.parentNode.classList.add('ui-tabs-active');
		for ( articl of arrayArticl) articl.classList.add('hidden');
		for ( let i = 0; i < navTab.children.length; i++ ) if (navTab.children[i].classList.contains('ui-tabs-active')) isTrigger = i;
		arrayArticl[isTrigger].classList.remove('hidden');
	}

	if ( elem.parentNode.parentNode == navTab ) {
		hack();
	}
}

function addTab() {

	for ( let count = 0; count < arrayArticl.length; count++ ) {
		let tab1 = demoTab.cloneNode(true);
		tab1.firstElementChild.classList.add( arrayArticl[count].dataset.tabIcon );
		tab1.firstElementChild.innerHTML = arrayArticl[count].dataset.tabTitle;
		navTab.appendChild(tab1);
		tab1.addEventListener('click', Swirl);
		if ( count === 0) tab1.classList.add('ui-tabs-active');
	}
}




























