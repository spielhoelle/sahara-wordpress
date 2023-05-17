const useLS = true
const videos = [...document.querySelectorAll('.overlay')]
const container = document.querySelector('.wp-block-create-block-tmy-sequence.sequence');
let playing = 0
const siteBlocks = document.body
const alreadyPlayed = localStorage.getItem('sahara_sequence');
const alreadyPlayedTimeStamp = useLS ? Number(alreadyPlayed) : Date.now() - 80000;
container.addEventListener('click', function (e) {
	siteBlocks.classList.remove('loading');
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
if (videos[0]) {
	if (!alreadyPlayedTimeStamp || alreadyPlayedTimeStamp + 60000 < Date.now()) {
		videos[0].onloadeddata = function () {
			siteBlocks.classList.remove('loading');
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
					localStorage.setItem('sahara_sequence', Date.now());
				});
			}
		}
	} else {
		siteBlocks.classList.remove('loading');
		videos[0].classList.add('d-none');
		container.classList.add('hidden');
	}
};