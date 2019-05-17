const setMaterial = (obj, mat) => {
	if (!obj) return;
	if (obj.children) obj.children.forEach(child => setMaterial(child, mat));
	obj.material = mat;
	obj.material.needsUpdate = true;
};

AFRAME.registerComponent('video-texture', {
	schema: {
		src: { type: 'selector' },
		colorkey: { type: 'string', default: '0xd432' }
	},

	init() {
		// MAKE SURE TO PLAY THE VIDEO VIA A USERINTERACTION
		const colorKey = parseInt(this.data.colorkey || '0x00');
		console.log('colorKeyMaterial: color key is #' + colorKey.toString(16), this.data.colorkey);
		this.material = new THREEx.ChromaKeyMaterial(this.data.src, colorKey);
		setMaterial(this.el.object3D, this.material);
	},
	tick() {
		this.material.update();
	}
});
