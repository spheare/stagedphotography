AFRAME.registerComponent('reset-on-click', {
	schema: {},

	init() {
		const el = this.el;

		el.addEventListener('click', () => {
			const scene = this.el.sceneEl;
			console.log('scene reset', scene, this.el);
			// scene.reset();
			document.location.reload();
		});
	}
});
