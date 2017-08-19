/**
 * Created by Denis on 29.07.2017.
 */

let listAudio = document.querySelectorAll('.drum-kit__drum');

for (let i = 0; i < listAudio.length; i++){
	listAudio[i].addEventListener('click', activedSound)
}
function activedSound(e) {
	let sound =  e.target.lastChild;
	sound.play();
}































