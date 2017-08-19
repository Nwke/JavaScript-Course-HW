/**
 * Created by Denis on 29.07.2017.
 */

document.addEventListener('DOMContentLoaded', readSlider);
const placePic = document.querySelector('#slider');
let count = 0;
function readSlider() {
	const arrPic = ["https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-jump.png",
		"https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-on-foot.png",
		"https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-playground.png",
		"https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-top-view.png",
		"https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax.png"];
	placePic.src = arrPic[count];
	count++;
	if(count === arrPic.length) count = 0;
}

setInterval(readSlider, 5000);


































