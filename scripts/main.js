const DEBUG = document.location.href.indexOf('127.0.0.1') >= 0;

const Settings = {
	DEFAULT_COUNTDOWN: DEBUG ? 0 : 10
};

const Selectors = {
	STARTBUTTON: '.welcome__startbutton',
	LOADSTATUS: '.welcome__loadstatus',
	LOADTEXT: '.welcome__loadtext',
	WELCOME: '.welcome',
	BACKGROUND_MUSIC: '#music-background',
	TIMERSPAN: '.counter__timer'
};

function main() {
	console.info('VR Staged Photography - Kevin Vaesen - 2019');
	if (DEBUG) console.log('Debug mode');

	const [ button, scene, welcome ] = [
		Selectors.STARTBUTTON,
		'a-scene',
		Selectors.WELCOME
	].map(i => $(i)[0]);

	trackPreloadAssets().then(() => {
		welcome.classList.add('welcome--load-complete');
		button.addEventListener(DEBUG ? 'mouseover' : 'click', run);
	});

	scene.addEventListener('loaded', () => {
		scene.pause();
	});
}

function trackPreloadAssets() {
	const assets = $('a-asset-item, img, audio, video'),
		status = $(Selectors.LOADSTATUS)[0];

	const assetLoadElements = assets.map(el => {
		const li = document.createElement('li');
		li.classList.add('welcome__loaditem');
		li.innerText = el.id || el.src;
		status.appendChild(li);
		return { el, li };
	});

	const promisedAssets = assetLoadElements.map(
		({ el, li }) =>
			new Promise(accept => {
				el.addEventListener(
					el.tagName === 'IMG'
						? 'load'
						: el.tagName === 'A-ASSET-ITEM'
							? 'loaded'
							: el.tagName === 'VIDEO' || el.tagName === 'AUDIO'
								? 'loadeddata'
								: 'load',
					() => accept({ el, li })
				);
				if (el.complete || el.isLoaded || el.loaded) accept({ el, li });
			})
	);

	promisedAssets.forEach((asset, index) =>
		asset.then(({ el, li }) =>
			li.classList.add('welcome__loaditem--loaded')
		)
	);

	return Promise.all(promisedAssets);
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

	if (!DEBUG) {
		audio.play();
		scene.enterVR();
	}
}
// camera does not move in webvr mode: https://stackoverflow.com/questions/47761920/programmatically-change-webvr-camera-view
// https://www.npmjs.com/package/aframe-travel-node
function $(selector) {
	return Array.from(document.querySelectorAll(selector) || []) || [];
}

document.addEventListener('DOMContentLoaded', main);
