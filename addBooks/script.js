/**
 * Created by Denis on 29.07.2017.
 */

document.addEventListener('DOMContentLoaded',ready);
//===============
//Объявляем переменные,которые прослеживаются во всем коде
let arrayObj;
let blockContent;
let xhr;
//============

function ready() {
	xhr = new XMLHttpRequest();
	blockContent = document.querySelector('#content');

	xhr.open('GET', 'https://netology-fbb-store-api.herokuapp.com/book/');
	xhr.send();
	xhr.addEventListener('load', onLoad);

}
function onLoad() {
	if (xhr.status !== 200) {
		console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);


	} else {
		arrayObj = JSON.parse(xhr.responseText);

		for (let i = 0; i < arrayObj.length; i++) {

			let tmpLi = document.createElement('li');
			blockContent.appendChild(tmpLi);
			const { title, author, info, price, cover } = arrayObj[i];


			tmpLi.setAttribute('data-title', title);
			tmpLi.setAttribute('data-author', author.name);
			tmpLi.setAttribute('data-info',info);
			tmpLi.setAttribute('data-price', price);
			let tmpImg = document.createElement('img');
			tmpLi.appendChild(tmpImg);
			tmpImg.src =cover.small;
		}
	}

}



























