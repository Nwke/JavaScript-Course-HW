let canvas = document.querySelector('#wall');
let ctx = canvas.getContext('2d');
let arrayCross = [];
let arrayRing = [];
let width = window.innerWidth;
let height = window.innerHeight;
let nextPoint;

canvas.width = width;
canvas.height = height;


function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}




function reselectFunc() {
	if ( +getRandomArbitrary(0,1).toFixed(0) % 2 === 0 ) {
		nextPoint = function nextPoint(x, y, time) {
			return {
				x: x + Math.sin((x + (time / 10)) / 100) * 5,
				y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
			}
		};
	} else {
		nextPoint = function nextPoint(x, y, time) {
			return {
				x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
				y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
			}
		};
	}
}




function prepareFacilities() {
	let count = getRandomArbitrary(50, 150).toFixed(0);
	for (let i = 0; i < +count ; i++) {
		let angle = getRandomArbitrary(0, 360);
		let size = getRandomArbitrary(0.1, 0.6).toFixed(1);
		let radiusCircle = 12 * size;
		let sideCross = 20 * size;
		let lineWidth =  5 * size;

		let coordX = getRandomArbitrary(0, canvas.width);
		let coordY = getRandomArbitrary(0, canvas.height);


		reselectFunc();
		arrayCross.push({
			x: coordX,
			y: coordY,
			size : sideCross,
			angle,
			nextPoint,
			lineWidth
		});

		reselectFunc();
		arrayRing.push({
			x: coordX,
			y: coordY,
			size: radiusCircle,
			nextPoint,
			lineWidth
		});
	}
}

function drawCross(x, y, sideCross, angle, lineWidth) {
	let diff = nextPoint(x, y, Date.now());
	let dx = diff.x;
	let dy = diff.y;

	angle = angle * ( Math.PI / 180 );
	ctx.save();
	ctx.translate(dx, dy);
	ctx.rotate(angle);
	ctx.translate(-dx, -dy);

	ctx.beginPath();
	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = 'white';
	ctx.moveTo(x - sideCross/2, y );
	ctx.lineTo(x + sideCross/2, y );
	ctx.moveTo(x, y - sideCross/2);
	ctx.lineTo(x, y + sideCross/2);
	ctx.stroke();
	ctx.restore();
}

function drawRing(x, y, circleRadius, lineWidth) {
	ctx.lineWidth = lineWidth;
	ctx.beginPath();
	ctx.strokeStyle = 'white';
	ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
	ctx.stroke();
}

setInterval(() => {
	ctx.clearRect(0, 0, width, height);

	arrayCross.forEach(element => {
		drawCross(element.x, element.y, element.size, element.angle, element.lineWidth);
		// let coords = element.nextPoint(element.x, element.y, Date.now());
		// element.x = coords.x;
		// element.y = coords.y;
		element.angle += +getRandomArbitrary(-0.2, 0.2).toFixed(2);
	});

	arrayRing.forEach(element => {
		drawRing(element.x, element.y, element.size, element.lineWidth);
		let coords = element.nextPoint(element.x, element.y, Date.now());
		element.x = coords.x;
		element.y = coords.y;
	});

},1000/20);
prepareFacilities();


















