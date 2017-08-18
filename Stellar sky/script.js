
let canvas = document.querySelector('#starfield');
let context  = canvas.getContext('2d');
let arrayColor = ['#ffffff', '#ffe9c4', '#d4fbff'];

canvas.style.backgroundColor = 'black';

canvas.addEventListener('click', fillSky);

function fillSky() {
	context.clearRect(0, 0, canvas.width, canvas.height); // Очиста всего холста
	let randomCount = Math.floor(Math.random() * (400 - 200 + 1)) + 200;
	for ( let i = 0; i < randomCount; i++) {
		let randomSizeStar = +(Math.random() * (1 + 1)).toFixed(2);
		let randomAlphaStar = +(Math.random() * (1 - 0.8 + 1)+ 0.8).toFixed(2);
		let randomColorStar = arrayColor[parseInt(Math.random() * (2 + 1))];
		while ( +randomAlphaStar > 1 || +randomAlphaStar < 0.8 ) randomAlphaStar = +(Math.random() * (1 - 0.8 + 1) + 0.8).toFixed(2);
		while ( +randomSizeStar > 1.1 || +randomSizeStar < 0 ) randomSizeStar = (Math.random() * (1  + 1)).toFixed(2);
		let coordX = Math.floor(Math.random() * (400  + 1));
		let coordY = Math.floor(Math.random() * (800  + 1));
		context.globalAlpha = randomAlphaStar;

		context.fillStyle = randomColorStar;
		context.fillRect(coordX, coordY, randomSizeStar, randomSizeStar);
	}
}




















