// Список песен:
// 1. LA Chill Tour,
// https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Chill%20Tour.mp3

// 2. This is it band,
// https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This%20is%20it%20band.mp3

// 3. LA Fusion Jam,
// https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Fusion%20Jam.mp3


const listTitleMelodies = ['LA Chill Tour', 'This is it band ', 'LA Fusion Jam'];
const listMelodies = [
	'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Chill%20Tour.mp3',
	'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This%20is%20it%20band.mp3',
	'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Fusion%20Jam.mp3'
];
const wrapperPlayer = document.querySelector('.mediaplayer');
const titleMusics = document.querySelector('.title');
const player = document.querySelector('audio');
const changePlayerMode = document.querySelector('.playstate');
const stop = document.querySelector('.stop');
const next = document.querySelector('.next');
const back = document.querySelector('.back');
let countMusic = 0;


changePlayerMode.addEventListener('click', changeMode);
stop.addEventListener('click', stopPlaying);
next.addEventListener('click', nextMelody);
back.addEventListener('click', prevMelody);

function changeMode() {
	if (wrapperPlayer.classList.contains('play')) {
		onPause()
	} else {
		onPlay();
	}
}

function changeTitleMelodies() {
	titleMusics.title = listTitleMelodies[countMusic];
}

function onPlay() {
	changeTitleMelodies();
	player.play();
	wrapperPlayer.classList.add('play');
}

function onPause() {
	changeTitleMelodies();
	player.pause();
	wrapperPlayer.classList.remove('play');
}

function stopPlaying() {
	onPause();
	player.currentTime = 0;
}

function nextMelody() {
	let instReproduce = false;
	if (wrapperPlayer.classList.contains('play')) instReproduce = true;
	countMusic = countMusic === 2 ? 0 : countMusic + 1;
	stopPlaying();
	changeTitleMelodies();
	player.src = listMelodies[countMusic];
	if ( instReproduce) onPlay();
}

function prevMelody() {
	let instReproduce = false;
	if (wrapperPlayer.classList.contains('play')) instReproduce = true;
	countMusic = countMusic === 0 ? 2 : countMusic - 1;
	stopPlaying();
	changeTitleMelodies();
	player.src = listMelodies[countMusic];
	if ( instReproduce) onPlay();
}

function showKey(event) { if (event.repeat) { console.log(`Повторное нажатие ${event.code}`); } else { console.log(`Нажата ${event.code}`); } }
document.addEventListener('keydown', showKey);






