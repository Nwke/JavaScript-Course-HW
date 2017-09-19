const video  = document.querySelector('.player');
const scrollbar = document.querySelector('.speed');
const indicatorSpeed = document.querySelector('.speed-bar');

scrollbar.addEventListener('mousemove', over);

function over(e) {
	const heightOfDocument = scrollbar.offsetTop;
	const coordCursor = e.clientY;
	const heightElement = +(getComputedStyle(scrollbar).height).replace('px', '');
	if (coordCursor - heightOfDocument  > 0) {
		const heightIndicator = ((coordCursor - heightOfDocument) / (heightElement / 100));
		const speedVideo = heightIndicator / (25);

		indicatorSpeed.style.height = heightIndicator + '%';
		updateSpeedVideo(speedVideo);
	}
}

function updateSpeedVideo(speed) {
	indicatorSpeed.innerText = speed.toFixed(2) + 'x';
	video.playbackRate = +speed;
}