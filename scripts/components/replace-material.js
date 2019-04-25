const wireframe = new THREE.MeshPhysicalMaterial({
	color: 0x2194ce,
	emissive: 0x7f9b9b,
	roughness: 0,
	metalness: 1,
	reflectivity: 1,
	clearCoat: 1,
	clearCoatRoughness: 0.5,

	wireframe: true
});

const translucent = new THREE.MeshPhysicalMaterial({
	color: 0x2194ce,
	emissive: 0x7f9b9b,
	roughness: 0,
	metalness: 1,
	reflectivity: 1,
	clearCoat: 1,
	clearCoatRoughness: 0.5,

	transparent: true,
	opacity: 0.5
});

const MATERIALS = { wireframe, translucent };

console.log('replace material loaded.');

AFRAME.registerComponent('replace-materials', {
	init: function() {},
	update: function() {
		const replaceMat = (obj, name, newmat) => {
			if (!obj) return;
			if (obj.children)
				obj.children.forEach(child => replaceMat(child, name, newmat));
			if (
				obj.material &&
				(obj.material.name || '').toLowerCase() === name.toLowerCase()
			)
				obj.material = newmat;
		};

		this.el.addEventListener('model-loaded', () =>
			Object.keys(MATERIALS)
				.map(key => [ key, MATERIALS[key] ])
				.forEach(([ key, material ]) =>
					replaceMat(this.el.object3D, key, material)
				)
		);
	}
});
