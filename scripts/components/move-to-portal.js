AFRAME.registerComponent('move-to-portal', {
	schema: {
		portalId: { type: 'string' },
		cameraId: { type: 'string' }
	},

	init() {
		
		const el = this.el;

el.addEventListener('click', () => {
			const el = this.el,
				scene = this.el.sceneEl;
			const {portalId, cameraId} = this.data;

			const portal = scene.querySelector(portalId),
				camera = scene.querySelector(cameraId);

			if (!portal) throw `portal ${portalId} not found`;
			if (!camera) throw `camera ${cameraId} not found`;

			const [ oldpos, newpos, newrot ] = [ 
				camera.object3D.getWorldPosition(),
					portal.object3D.getWorldPosition(), 
					portal.object3D.getWorldRotation() ];
			camera.object3D.position.set(newpos.x, oldpos.y, newpos.z);
			// camera.object3D.rotation.set(newrot.x, newrot.y, newrot.z);

			console.log('warp to portal', portalId, newpos);
		});
	}

	// ,tick: function(time, timeDelta) {
	// 	if (!this.aPortals || !this.aPortals.length) return;

	// 	if (!this.nPrevTime || time - this.nPrevTime > 1000) {
	// 		const newpos = this.aPortals[++this.nCurrPortal % this.aPortals.length].object3D.position;
	// 		this.el.object3D.position.set(newpos.x, newpos.y, newpos.z);
	// 		this.nPrevTime = time;
	// 	}
	// }
});
