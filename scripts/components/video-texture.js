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
		// MAKE SURE TO PLAY THE VIDEO VIA A USERINTERACTION
		this.material = new THREEx.ChromaKeyMaterial( this.data.src, 0xd432);
		/**/
		// video.play();
		// const texture = new THREE.VideoTexture( this.data.src );
		// this.material = new THREE.MeshLambertMaterial( {map: texture} );

		setMaterial(this.el.object3D, this.material);
	},
	tick() {
		this.material.update();
	}
});
