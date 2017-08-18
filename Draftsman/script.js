let canvas = document.querySelector('#draw');
let ctx  = canvas.getContext('2d');
let lineWidth = 100;
let currentHue = 0;
let paint = false;

let opts = {
	radius: 100,
	color: 'hsl(hue, 100%, 50%)'
};

window.addEventListener('resize', changeCanvasSize);

function changeCanvasSize() {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Очиста всего холста
}
changeCanvasSize();


canvas.addEventListener('mousedown', () => {
	paint  = true;
});

canvas.addEventListener('mouseup', () => {
	paint  = false;
});

canvas.addEventListener('mouseleave', () => {
	paint  = false;
});

canvas.addEventListener('mousemove', (e) => {
	let posX = e.clientX;
	let posY = e.clientY;
	if (paint) {
		if ( opts.radius === 100 ) {
			max = true;
			min = false;
		} else if (opts.radius === 0 ) {
			max = false;
			min = true;
		}

		if ( max ) {
			opts.radius--
		} else if ( min ) {
			opts.radius++;
		}


		if ( e.shiftKey ) {
			currentHue === 0 ? currentHue = 359 : currentHue--;
		} else {
			currentHue === 359 ? currentHue = 0 : currentHue++;
		}

		ctx.fillStyle = opts.color.replace('hue', currentHue);
		ctx.beginPath();
		 ctx.arc(posX+5, posY+5, opts.radius, 0, Math.PI * 2);
		ctx.lineTo(posX, posY);
		ctx.fill();
	}
});