AFRAME.registerComponent('model-load-event', {
	schema: {},

	init() {
		this.el.addEventListener('model-loaded', ()=>{
			console.info('IT LOADED');
		})
	}
});
