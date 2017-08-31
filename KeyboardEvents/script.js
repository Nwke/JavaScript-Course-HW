(function () {
	document.addEventListener('keydown', openHiddenMenu);
	document.addEventListener('keydown', openSecretBlock);
	let countSecretCode = 0;

	function openHiddenMenu(e) {
		if (e.ctrlKey && e.altKey && e.keyCode === 84) {
			document.querySelector('nav').classList.toggle('visible');
		}
	}

	function openSecretBlock(e) {
		const secretCode = [89, 84, 78, 74, 75, 74, 85, 66, 90];
		if (e.keyCode === secretCode[countSecretCode]) {
			countSecretCode++;
			if (countSecretCode === secretCode.length ) {
				document.querySelector('.secret').classList.add('visible');
			}
		} else {
			countSecretCode = 0;
		}
	}
})();