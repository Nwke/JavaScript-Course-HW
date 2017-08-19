/**
 * Created by Denis on 29.07.2017.
 */

function getPriceFormatted(value) {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
const countBasket = document.querySelector('#cart-count');
const allItemPrice = document.querySelector('#cart-total-price');
const addItem = document.querySelectorAll('.add');
for (button of addItem){
	button.addEventListener('click',addInBasket)
}
var priceAll =0;
var countItem=0;
function addInBasket(e) {
	countItem++;
	let elem = e.target;
	let priceItem = +elem.getAttribute('data-price');
	priceAll +=priceItem;
	countBasket.innerHTML =+countItem;
	allItemPrice.innerHTML=priceAll;
}





























