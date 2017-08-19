/**
 * Created by Denis on 29.07.2017.
 */

const sliderContent = document.querySelector('#currentPhoto');

const arr = ["https://netology-code.github.io/hj-homeworks/browser/gallery/i/breuer-building.jpg",
							"https://netology-code.github.io/hj-homeworks/browser/gallery/i/guggenheim-museum.jpg",
							"https://netology-code.github.io/hj-homeworks/browser/gallery/i/headquarters.jpg",
							"https://netology-code.github.io/hj-homeworks/browser/gallery/i/IAC.jpg",
							"https://netology-code.github.io/hj-homeworks/browser/gallery/i/new-museum.jpg"];
let i = 0;

const btnNext = document.querySelector('#nextPhoto');
const btnPrev = document.querySelector('#prevPhoto');

btnNext.addEventListener('click', updateImgSlider);
btnPrev.addEventListener('click', updateImgSlider);

function updateImgSlider(e) {
	if (e.target === btnNext) {
		if (i === arr.length-1) {
			i = 0;
			sliderContent.src = arr[i];
		}
		else {
			i++;
			sliderContent.src = arr[i];
		}
	}
	else if (e.target === btnPrev) {
		if (i === 0) {
			i = 4;
			sliderContent.src = arr[i];
		}
		else {
			i--;
			sliderContent.src = arr[i];
		}
	}
}
































