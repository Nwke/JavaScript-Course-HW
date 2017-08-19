/**
 * Created by Denis on 29.07.2017.
 */

const smolIMG = ['https://netology-code.github.io/hj-homeworks/event-object/skateboard-gallery/images/thumb/01.jpg','https://netology-code.github.io/hj-homeworks/event-object/skateboard-gallery/images/thumb/02.jpg','https://netology-code.github.io/hj-homeworks/event-object/skateboard-gallery/images/thumb/03.jpg','https://netology-code.github.io/hj-homeworks/event-object/skateboard-gallery/images/thumb/04.jpg','https://netology-code.github.io/hj-homeworks/event-object/skateboard-gallery/images/thumb/05.jpg','https://netology-code.github.io/hj-homeworks/event-object/skateboard-gallery/images/thumb/05.jpg','https://netology-code.github.io/hj-homeworks/event-object/skateboard-gallery/images/thumb/06.jpg','https://netology-code.github.io/hj-homeworks/event-object/skateboard-gallery/images/thumb/07.jpg'];
const bigIMG = ['https://netology-code.github.io/hj-homeworks/event-object/skateboard-gallery/images/full/01.jpg','https://netology-code.github.io/hj-homeworks/event-object/skateboard-gallery/images/full/02.jpg','https://netology-code.github.io/hj-homeworks/event-object/skateboard-gallery/images/full/03.jpg','https://netology-code.github.io/hj-homeworks/event-object/skateboard-gallery/images/full/04.jpg','https://netology-code.github.io/hj-homeworks/event-object/skateboard-gallery/images/full/05.jpg','https://netology-code.github.io/hj-homeworks/event-object/skateboard-gallery/images/full/06.jpg','https://netology-code.github.io/hj-homeworks/event-object/skateboard-gallery/images/full/07.jpg'];
var AllLinks = document.getElementsByTagName('a');
const nameItem = document.querySelector('#title');
var SuperiorIMG = document.getElementById('view');

for (var tagA of AllLinks) {
	tagA.addEventListener('click', current);
	tagA.addEventListener('click', function(e) {
		e.preventDefault();
	});
}

function current(e) {
	var elem =  e.target;
	for (var oneLink of AllLinks) {
		oneLink.classList.remove('gallery-current');
	}

	var nameSelected = elem.getAttribute('title');
	nameItem.innerHTML = nameSelected;
	elem.parentNode.classList.add('gallery-current');
	var bestSrc = elem.parentNode.getAttribute('href');
	SuperiorIMG.src = bestSrc;
}






























