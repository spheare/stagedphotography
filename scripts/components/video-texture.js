const setMaterial = (obj, mat) => {
	console.log('set material', obj);
	if (!obj) return;
	if (obj.children) obj.children.forEach(child => setMaterial(child, mat));

	obj.material = mat;
	obj.material.needsUpdate = true;
	console.log('update new material', obj);
};

AFRAME.registerComponent('video-texture', {
	schema: {
		src: { type: 'selector' }
	},

	init() {
		/*/
		const material = new THREE.MeshPhysicalMaterial({
			color: 0xff0f00,

			roughness: 0,
			metalness: 1,
			reflectivity: 1,
			clearCoat: 1,
			clearCoatRoughness: 0.5,
			name: 'GLASS',
			transparent: true,
			opacity: 0.5
		});

		/*/
		this.material = new THREEx.ChromaKeyMaterial( this.data.src, 0xd432);
		/**/
		// video.play();
		// const texture = new THREE.VideoTexture( this.data.src );
		// this.material = new THREE.MeshLambertMaterial( {map: texture} );

		setMaterial(this.el.object3D, this.material);
		// this.material.startVideo();
		// this.el.object3D.material.needsUpdate = true;
		// this.el.object3D.material.startVideo();
		// this.el.object3D.material.update();
	},
	tick() {
		// console.log('component update');
		this.material.update();
	}
});
