let canvas = document.querySelector('#draw');
let ctx  = canvas.getContext('2d');
let lineWidth = 100;
let currentHue = 0;

let opts = {
	lineWidth: 100,
	color: 'hsl(hue, 100%, 50%)'
};

window.addEventListener('resize', changeCanvasSize);

canvas.addEventListener('mousedown', () => {
	canvas.addEventListener('mousemove', startDraw)
});

canvas.addEventListener('mouseup', () => {
	canvas.removeEventListener('mousemove', startDraw);
});

canvas.addEventListener('mouseleave', () => {
	canvas.removeEventListener('mousemove', startDraw);
});

function changeCanvasSize() {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Очиста всего холста
}
changeCanvasSize();

function startDraw(e) {
	CalculateLineParametrs(e);
	draw(e);
}


function CalculateLineParametrs(e) {
	if ( opts.lineWidth === 100 ) {
		max = true;
		min = false;
	} else if (opts.lineWidth === 5 ) {
		max = false;
		min = true;
	}

	if ( max ) {
		opts.lineWidth--
	} else if ( min ) {
		opts.lineWidth++;
	}

	if ( e.shiftKey ) {
		currentHue === 0 ? currentHue = 359 : currentHue--;
	} else {
		currentHue === 359 ? currentHue = 0 : currentHue++;
	}
}

function draw(e) {
	let coordX = e.clientX;
	let coordY = e.clientY;
	ctx.beginPath();
	ctx.strokeStyle = opts.color.replace('hue', currentHue);
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	ctx.lineTo(coordX, coordY);
	ctx.lineWidth = opts.lineWidth;
	ctx.stroke();
}
