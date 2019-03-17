AFRAME.registerComponent('automove', {
	schema: { type: 'string' },

	init() {
		this.nPrevTime = 0;
		this.nCurrPortal = 0;
		this.aPortals = Array.from(document.querySelectorAll('.portal'));
	},

	tick: function(time, timeDelta) {
		if (!this.aPortals || !this.aPortals.length) return;

		if (!this.nPrevTime || time - this.nPrevTime > 1000) {
			const newpos = this.aPortals[++this.nCurrPortal % this.aPortals.length].object3D.position;
			this.el.object3D.position.set(newpos.x, newpos.y, newpos.z);
			this.nPrevTime = time;
		}
	}
});
