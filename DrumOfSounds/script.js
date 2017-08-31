// Ссылка,которая в аттрибуте src у тега audio элемента с классом key-openhat невалидная,поэтому заменил.
document.querySelector('.key-openhat').querySelector('audio').src = 'https://netology-code.github.io/hj-homeworks/html-element-collection/drum-machine/wav/openhat.wav';
document.querySelector('.drum-kit').addEventListener('click', (e) => {
	if (e.target.querySelector('audio')) {
		e.target.querySelector('audio').play();
	}
});