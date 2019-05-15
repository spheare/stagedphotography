(imagepairs => {
	const setprop = (name, value) => document.documentElement.style.setProperty(name, value);

	const nextImage = ev => {
		const { target } = ev,
			items = Array.from(document.querySelectorAll('.overlap__item')),
			index = items.indexOf(target),
			newItem = items[(index + 1) % items.length];

		target.classList.remove('overlap__item--active');
		newItem.classList.add('overlap__item--active');
	};

	document.addEventListener('mousemove', ev => {
		const { clientX, clientY } = ev,
			{ clientWidth, clientHeight } = document.body,
			fX = 2 * (clientX - clientWidth / 2) / clientWidth,
			fY = 2 * (clientY - clientHeight / 2) / clientHeight;
		setprop('--facX', `${fX}`);
		setprop('--facY', `${fY}`);
	});

	window.addEventListener('deviceorientation', ({ beta, gamma, alpha }) => {
		const fX = Math.max(-1, Math.min(1, 2 * (gamma / 90))),
			fY = Math.max(-1, Math.min(1, 2 * 2 * (beta / 180 - 0.5)));
		setprop('--facX', `${fX}`);
		setprop('--facY', `${fY}`);
	});

	document.addEventListener('DOMContentLoaded', () => {
		const parent = document.querySelector('.overlap');

		imagepairs.map((pairs, index) => {
			const overlapItem = document.createElement('div');
			parent.appendChild(overlapItem);
			overlapItem.classList.add('overlap__item');
			if (index === 0) overlapItem.classList.add('overlap__item--active');
			overlapItem.style.backgroundImage = pairs.map(url => `url(${url})`).join(',');
			overlapItem.addEventListener('click', a => nextImage(a));
			return overlapItem;
		});
	});
})([ [ 'assets/overlays/front/1.jpg', 'assets/overlays/back/1.jpg' ] ]);
