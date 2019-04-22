const Settings = {
	DEFAULT_COUNTDOWN: 1
};

const Selectors = {
	STARTBUTTON: '.welcome__startbutton',
	LOADTEXT: '.welcome__loadtext',
	BACKGROUND_MUSIC: '#music-background',
	TIMERSPAN: '.counter__timer'
};

function main() {
	console.log('VR Staged Photography - Kevin Vaesen - 2019');

	const [ button, scene, loadtext ] = [
		Selectors.STARTBUTTON,
		'a-scene',
		Selectors.LOADTEXT
	].map(i => $(i)[0]);


	scene.addEventListener('loaded', () => {
		scene.pause();
		button.classList.add('welcome__startbutton--visible');
		loadtext.classList.remove('welcome__loadtext--visible');
		button.addEventListener('click', run);
	});
}

function run() {
	const [ body, audio, scene ] = [
		'body',
		Selectors.BACKGROUND_MUSIC,
		'a-scene'
	].map(i => $(i)[0]);
	const timerSpans = $(Selectors.TIMERSPAN);
	let nCountDown = Settings.DEFAULT_COUNTDOWN;

	body.classList.add('state-countdown');

	timerSpans.forEach(el => (el.innerText = nCountDown));

	const hTimer = setInterval(() => {
		--nCountDown;
		timerSpans.forEach(el => (el.innerText = nCountDown));
	}, 1000);

	setTimeout(() => {
		clearInterval(hTimer);
		body.classList.remove('state-countdown');
		body.classList.add('state-running');
		console.log('resuming scene');
		scene.pause(); // needed because object is not reset otherwise :/
		scene.play();
	}, 1000 * nCountDown);

	audio.play();
	scene.enterVR();
}
// camera does not move in webvr mode: https://stackoverflow.com/questions/47761920/programmatically-change-webvr-camera-view
// https://www.npmjs.com/package/aframe-travel-node
function $(selector) {
	return Array.from(document.querySelectorAll(selector) || []) || [];
}

document.addEventListener('DOMContentLoaded', main);
