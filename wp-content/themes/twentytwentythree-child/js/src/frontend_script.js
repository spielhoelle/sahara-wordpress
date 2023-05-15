const container = document.querySelector('.wp-block-create-block-tmy-sequence.sequence');
const useLS = false
const alreadyPlayed = localStorage.getItem('sahara_sequence');
const alreadyPlayedTimeStamp = Number(alreadyPlayed)
const videos = [...document.querySelectorAll('.overlay')]
let playing = 0

container.addEventListener('click', function (e) {
	if (e.shiftKey) {
		videos[playing].pause();
		if (videos[playing + 1]) {
			videos[playing + 1].classList.remove('d-none');
			videos[playing + 1].play();
		}
	} else {
		container.classList.add('hidden');
	}
	if (useLS) {
		localStorage.setItem('sahara_sequence', Date.now());
	}
})
// if (!alreadyPlayedTimeStamp || alreadyPlayedTimeStamp + 60000 < Date.now()) {
if (videos[0]) {
	videos[0].addEventListener("pause", function () {
		playing++
		videos[0].pause();
		videos[0].classList.add('d-none');
		if (videos[1]) {
			console.log('First paused, play second');
			videos[1].classList.remove('d-none');
			videos[1].play();
		}
	});
}
if (videos[1]) {
	videos[1].addEventListener("pause", function () {
		playing++
		videos[1].classList.add('d-none');
		if (videos[2]) {
			console.log('Second paused, play last');
			videos[2].classList.remove('d-none');
			videos[2].play();
		}
	});
}
if (videos[2]) {
	videos[2].addEventListener("pause", function () {
		playing++
		console.log('All videos played, hide container');
		videos[1].classList.add('d-none');
		videos[2].classList.add('d-none');
		// localStorage.setItem('sahara_sequence', Date.now());
	});
}
// } else {
// 	videos[0].classList.add('d-none');
// 	container.classList.add('hidden');
// }