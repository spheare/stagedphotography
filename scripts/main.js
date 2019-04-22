const Settings = {
    DEFAULT_COUNTDOWN: 5
};

const Selectors = {
	STARTBUTTON: '.welcome__startbutton',
	BACKGROUND_MUSIC: '#music-background',
	TIMERSPAN: '.counter__timer'
};

function main() {
	console.log('VR Staged Photography - Kevin Vaesen - 2019');

	const [ button ] = [ $(Selectors.STARTBUTTON)[0] ];

	button.addEventListener('click', run);
}

function run() {
    const [ body, audio ] = [ $('body'), $(Selectors.BACKGROUND_MUSIC) ].map((i) => i[0]);
	const timerSpans = $(Selectors.TIMERSPAN);
	let nCountDown = Settings.DEFAULT_COUNTDOWN;

    body.classList.add('state-countdown');
    
    timerSpans.forEach((el) => (el.innerText = nCountDown));
    
    const hTimer = setInterval(() => {
        --nCountDown;
		timerSpans.forEach((el) => (el.innerText = nCountDown));
	}, 1000);
    
    setTimeout(() => {
        clearInterval(hTimer);
		body.classList.remove('state-countdown');
		body.classList.add('state-running');
	}, 1000 * nCountDown);
    
    audio.play();
}

function $(selector) {
	return Array.from(document.querySelectorAll(selector) || []) || [];
}

document.addEventListener('DOMContentLoaded', main);
