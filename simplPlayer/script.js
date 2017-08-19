/**
 * Created by Denis on 29.07.2017.
 */

const ArrSRC = ['https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Chill%20Tour.mp3',
	'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This%20is%20it%20band.mp3',
	'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Fusion%20Jam.mp3'];
const ArrName = ['LA Chill Tour',
	'This is it band',
	'LA Fusion Jam'];
let audioIndex = 0;
let butPlay = document.getElementsByClassName('playstate')[0];
let audioS = document.getElementsByTagName('audio')[0];
let textMusic = document.getElementsByClassName('title')[0];
let mediaPlayer = document.getElementsByClassName('mediaplayer')[0];
let isPaused = false;
butPlay.onclick = function () {

	if (mediaPlayer.classList.contains('play')){
		audioS.pause();
		mediaPlayer.classList.remove('play');
		isPaused = true;
	}
	else {
		mediaPlayer.classList.add('play');
		if (!isPaused) {
			audioS.src = ArrSRC[audioIndex];
			textMusic.title = ArrName[audioIndex];
		}
		audioS.play();
		isPaused = false;
	}
};
var stop = document.getElementsByClassName('stop')[0];
stop.onclick = function stopS() {
	mediaPlayer.classList.remove('play');
	textMusic.title = 'OFF';
	audioS.pause();
	audioS.currentTime = 0;
	isPaused = false;
};
var back = document.getElementsByClassName('back')[0];
back.onclick = function () {
	if ( audioIndex >= 1){
		audioS.pause();
		audioIndex -=1;
		mediaPlayer.classList.add('play');
		audioS.src = ArrSRC[audioIndex];
		textMusic.title = ArrName[audioIndex];
		audioS.play();
	}
	else {
		audioIndex = 2;
		mediaPlayer.classList.add('play');
		audioS.pause();
		audioS.src = ArrSRC[audioIndex];
		textMusic.title = ArrName[audioIndex];
		audioS.play();
	}
};
var next = document.getElementsByClassName('next')[0];
next.onclick = function () {
	if( audioIndex === 2 ){
		audioS.pause();
		audioIndex = 0;
		mediaPlayer.classList.add('play');
		audioS.src = ArrSRC[audioIndex];
		textMusic.title = ArrName[audioIndex];
		audioS.play();

	}
	else {
		mediaPlayer.classList.add('play');
		audioS.pause();
		audioIndex +=1;
		audioS.src = ArrSRC[audioIndex];
		textMusic.title = ArrName[audioIndex];
		audioS.play();

	}
};































