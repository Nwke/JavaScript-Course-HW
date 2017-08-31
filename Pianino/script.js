const lowerModeMelody = [
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/first.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/second.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/third.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fourth.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fifth.mp3'
];
const middleMelodyMode = [
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/first.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/second.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/third.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fourth.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fifth.mp3'
];
const highMelodyMode = [
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/first.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/second.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/third.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fourth.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fifth.mp3'
];
const pianino = document.querySelector('ul.set');

pianino.addEventListener('click', pianinoPlaying);
document.addEventListener('keydown', switchPlayrMode);
document.addEventListener('keyup', switchPlayrMode);

function switchPlayrMode(e) {
	pianino.classList.remove('lower', 'higher', 'middle');
	if (e.shiftKey) {
		pianino.classList.add('lower');
	}
	else if (e.altKey) {
		pianino.classList.add('higher');
	}
	else if (!e.shiftKey && !e.altKey) {
		pianino.classList.add('middle');
	}
}

function addPlayerLinks(arrayLinks) {
	const listPlayers = document.querySelectorAll('audio');
	listPlayers.forEach((item, index) => {
		item.src = arrayLinks[index]
	});
}


function pianinoPlaying(e) {
	if (e.shiftKey && e.target.tagName === 'LI') {
		addPlayerLinks(lowerModeMelody)
	} else if (e.altKey && e.target.tagName === 'LI') {
		addPlayerLinks(highMelodyMode)
	} else if (!e.shiftKey && e.altKey && e.target.tagName === 'LI') {
		addPlayerLinks(middleMelodyMode)
	}
	if (e.target.querySelector('audio')) {
		e.target.querySelector('audio').play();
	}
}
addPlayerLinks(middleMelodyMode);