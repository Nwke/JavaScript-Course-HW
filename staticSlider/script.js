let listImg = ['https://netology-code.github.io/hj-homeworks/browser/gallery/i/breuer-building.jpg',
	'https://netology-code.github.io/hj-homeworks/browser/gallery/i/guggenheim-museum.jpg',
	'https://netology-code.github.io/hj-homeworks/browser/gallery/i/headquarters.jpg',
	'https://netology-code.github.io/hj-homeworks/browser/gallery/i/IAC.jpg',
	'https://netology-code.github.io/hj-homeworks/browser/gallery/i/new-museum.jpg'];

let nextPhoto = document.querySelector('#nextPhoto');
let prevPhoto = document.querySelector('#prevPhoto');
let currentPhoto = document.querySelector('#currentPhoto');
let count = 0;

nextPhoto.addEventListener('click', nextImg);
prevPhoto.addEventListener('click', prevImg);

function nextImg() {
	count = count + 1 === listImg.length ? 0 : count + 1;
	currentPhoto.src =  listImg[count];
}

function prevImg() {
	count = count - 1 === -1 ? listImg.length - 1 : count - 1;
	currentPhoto.src = listImg[count];
}