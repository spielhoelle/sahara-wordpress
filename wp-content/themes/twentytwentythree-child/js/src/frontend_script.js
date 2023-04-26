const container = document.querySelector('.wp-block-create-block-tmy-sequence.sequence');
const alreadyPlayed = localStorage.getItem('sahara_sequence');
const alreadyPlayedTimeStamp = Number(alreadyPlayed)
container.addEventListener('click', function (e) {
	container.classList.add('hidden');
	localStorage.setItem('sahara_sequence', Date.now());
})
const videos = [...document.querySelectorAll('.overlay')]
if (!alreadyPlayedTimeStamp || alreadyPlayedTimeStamp + 60000 < Date.now()) {
	if (videos[0]) {
		videos[0].addEventListener("pause", function () {
			console.log('First paused, play second');
			videos[0].classList.add('d-none');
			if (videos[1]) {
				videos[1].classList.remove('d-none');
				videos[1].play();
			}
		});
	}
	if (videos[1]) {
		videos[1].addEventListener("pause", function () {
			console.log('Second paused, play last');
			videos[1].classList.add('d-none');
			if (videos[2]) {
				videos[2].classList.remove('d-none');
				videos[2].play();
			}
		});
	}
	if (videos[2]) {
		videos[2].addEventListener("pause", function () {
			console.log('Second paused, play last');
			videos[1].classList.add('d-none');
			videos[2].classList.add('d-none');
			localStorage.setItem('sahara_sequence', Date.now());
		});
	}
} else {
	videos[0].classList.add('d-none');
	container.classList.add('hidden');
}