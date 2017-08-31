let count = 0;

function swapPic() {
	const listImg = ['airmax-jump.png', 'airmax-on-foot.png', 'airmax-playground.png', 'airmax-top-view.png', 'airmax.png'];
	let slider = document.querySelector('#slider');
	let str = slider.src;
	let lastOccur = str.lastIndexOf('/');
	let lastSrc = str.slice(lastOccur + 1);
	slider.src = str.replace(lastSrc, listImg[count % listImg.length]);
	count++;
}
swapPic();

setInterval(swapPic, 5000);