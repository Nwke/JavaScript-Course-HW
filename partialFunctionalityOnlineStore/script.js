// Отправляем запрос на получение данных,парсим данные,затем передаем в функцию
fetch('https://neto-api.herokuapp.com/cart/colors')
.then((response) => {
	return response.json()
})
.then(analysisDataColorRepsonse);

fetch('https://neto-api.herokuapp.com/cart/sizes')
.then((response) => {
	return response.json();
})
.then(analysisDataSizeRepsonse);

fetch('https://neto-api.herokuapp.com/cart')
.then((response) => {
	return response.json();
})
.then(analysisDataCartRepsonse);
// ----------------------------------------------

function analysisDataColorRepsonse(dataColor) { // функция "наполняет" каждый сниппет и передает его функции
	let typeElements = 'colorSwatch';
	dataColor.forEach(function (item, i) {
		let snippet = `<div data-value="${dataColor[i].code}" class="swatch-element color ${dataColor[i].code}">
        <div class="tooltip">${dataColor[i].title}</div>
        <input quickbeam="color" id="swatch-1-${dataColor[i].code}" type="radio" name="color" value="${dataColor[i].code}">
        <label for="swatch-1-${dataColor[i].code}" style="border-color: red;">
          <span style="background-color: ${dataColor[i].code};"></span>
          <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
        </label>
      </div>`;
		addElements(snippet, typeElements, dataColor[i].isAvailable)
	});
}

function analysisDataSizeRepsonse(dataSize) { // тоже самое,что и функция выше
	let typeElements = 'sizeSwatch';
	dataSize.forEach(function (item, i) {
		let snippet = `<div data-value="${dataSize[i].type}" class="swatch-element plain ${dataSize[i].type}">
       <input id="swatch-0-${dataSize[i].type}" type="radio" name="size" value="${dataSize[i].type}">
       <label for="swatch-0-${dataSize[i].type}">
         ${dataSize[i].title}
         <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
       </label>
     </div>`;
		addElements(snippet, typeElements, dataSize[i].isAvailable)
	});
}

function addElements(newHtmlText, typeElements, isAvailable) { // финальные найстроки  сниппетов и вставка их в нужное место
	let colorSwatch = document.querySelector(`#${typeElements}`);
	colorSwatch.innerHTML += newHtmlText;
	if (isAvailable) {
		colorSwatch.lastElementChild.classList.add('available');
	} else {
		colorSwatch.lastElementChild.classList.add('soldout');
		colorSwatch.lastElementChild.querySelector('input').setAttribute('disabled', 'disabled')
	}
	// Выбираем элементы,которые будет запоминать наш LocalStorage
	let selectionColorButtons = document.querySelectorAll('#colorSwatch .swatch-element input');
	let selectionSizeButtons = document.querySelectorAll('#sizeSwatch .swatch-element input');
	[...selectionColorButtons, ...selectionSizeButtons].forEach((element) => {
		element.addEventListener('click', storageSelectButtons)
	});
}



// БЛОК РАБОТЫ С  LOCALSTORAGE  ---------------------------------------

function storageSelectButtons(e) { // заполняет localStorage
	let selecter = e.target;
	localStorage.setItem(`${selecter.name}Swatch`, selecter.id);


	// let elementSelected = e.currentTarget.parentElement;
	// if ( [...elementSelected.classList].findIndex( (el) => el === 'color' ) !== -1 ) {
	// 	let selectedInput = elementSelected.querySelector('input');
	// 	localStorage.setItem('lastSelectedColor', selectedInput.id)
	// } else if ( [...elementSelected.classList].findIndex( (el) => el === 'plain' ) !== -1 ) {
	// 	let selectedInput = elementSelected.querySelector('input');
	// 	localStorage.setItem('lastSelectedSize', selectedInput.id)
	// }

	// A safer option for the future
}

function restoreUserSelection() { // "Вспоминает" последний выбор юзера на сайте
	if ( localStorage.getItem('sizeSwatch') !== null ) {
		let timerLocalFirst = setInterval(restoreUserSelection, 300);
		let idLastSelected = localStorage.getItem('sizeSwatch');
		let lastSelect = document.querySelector(`#${idLastSelected}`);
		if ( lastSelect !== null ) {
			clearInterval(timerLocalFirst);
			lastSelect.setAttribute('checked', 'checked')
		}
	}
	if ( localStorage.getItem('colorSwatch') !== null ) {
		let timerLocalSecond = setInterval(restoreUserSelection, 300);
		let idLastSelected = localStorage.getItem('colorSwatch');
		let lastSelect = document.querySelector(`#${idLastSelected}`);
		if ( lastSelect !== null ) {
			clearInterval(timerLocalSecond);
			lastSelect.setAttribute('checked', 'checked')
		}
	}
}

restoreUserSelection();

// БЛОК РАБОТЫ С ФОРМОЙ ---------------------------------------
let submitBtn = document.querySelector('#AddToCart');
submitBtn.addEventListener('click', sendFormData);

function sendFormData(e) { // отправляем форму на сервер
	e.preventDefault();
	let formForCart = document.querySelector('#AddToCartForm');
	let dataForm = new FormData(formForCart);
	dataForm.append('productId', formForCart.dataset.productId);
	let fetchData = {
		method: 'POST',
		body: dataForm,
	};
	fetch('https://neto-api.herokuapp.com/cart', fetchData)
	.then((response) =>{
		return response.json();
	})
	.then(analysisDataCartRepsonse)
}

// БЛОК РАБОТЫ С  КОРЗИНОЙ САЙТА   ---------------------------------------
function analysisDataCartRepsonse(dataResponse) { // в зависимости от ответа формируем html корзины
	let htmlCart = '';
	let finalyPrice = 0;

	dataResponse.forEach(function (item, i) {
		let snippet = `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${dataResponse[i].id}" style="opacity: 1;">
        <div class="quick-cart-product-wrap">
          <img src="${dataResponse[i].pic}" title="${dataResponse[i].title}">
          <span class="s1" style="background-color: #000; opacity: .5">$${dataResponse[i].price}.00</span>
          <span class="s2"></span>
        </div>
        <span class="count hide fadeUp" id="quick-cart-product-count-${dataResponse[i].id}">${dataResponse[i].quantity}</span>
        <span class="quick-cart-product-remove remove" data-id="${dataResponse[i].id}"></span>
      </div>`;

		finalyPrice += dataResponse[i].price === undefined ? 0 : dataResponse[i].price * dataResponse[i].quantity ;
		htmlCart += snippet;
	});
	let snippetCart = `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
        <span>
          <strong class="quick-cart-text">Оформить заказ<br></strong>
          <span id="quick-cart-price">$${finalyPrice}</span>
        </span>
      </a>`;
	htmlCart += snippetCart;
	addHtmlCart(htmlCart)
}

function addHtmlCart(htmlCode) { // функция выполняет финальное заполнение html корзины
	let cart = document.querySelector('#quick-cart');
	cart.innerHTML = htmlCode;
	if ( cart.children.length === 1 ) { // Проверяем,есть ли товары в корзине
		document.querySelector('#quick-cart-pay').classList.remove('open');
	}

	let buttonsDeleteItem = cart.querySelectorAll('.remove'); // вешаем обработчики,чтобы чистить товары корзины
	for ( button of buttonsDeleteItem ) {
		button.addEventListener('click', (e) => {
			removeItemCart(e, cart, 'https://neto-api.herokuapp.com/cart/remove');
		})
	}
}

function removeItemCart(e, cart, url) { // отправляем запрос с id-товара,который хотим удалить
	let dataForm = new FormData();
	dataForm.append('productId', e.target.dataset.id);
	let fetchData = {
		method: 'POST',
		body: dataForm,
	};
	fetch(url, fetchData)
	.then(() => {
		return fetch('https://neto-api.herokuapp.com/cart')
	})
	.then((response) => {
		return response.json();
	})
	.then(analysisDataCartRepsonse)
}