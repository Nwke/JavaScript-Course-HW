const listProduct = document.querySelector('#nav');
const previewImgProduct = document.querySelector('#view');
const nameCurrentProduct = document.querySelector('h2');
// nameCurrentProduct я определил для вывода названия скейт-борда,
// Но не уверен,что это надо,но думаю не помешает
listProduct.addEventListener('click', selectedItem);

function selectedItem(e) {
	let elem = e.target;
	if (elem.tagName === 'IMG' && elem.parentNode.tagName === 'A') {
		e.preventDefault();
		let title = elem.title;
		nameCurrentProduct.innerText = `Выбран Скейт-борд под названием:${title}`;
		previewImgProduct.src = elem.src.replace(/thumb/, 'full');
		document.querySelector('.gallery-current').classList.remove('gallery-current');
		elem.parentNode.classList.add('gallery-current')
	}
}