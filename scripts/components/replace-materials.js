// urls of the images, one per half axis
const environmentMap = THREE.ImageUtils.loadTextureCube([
	'assets/images/px.png',
	'assets/images/nx.png',
	'assets/images/pz.png',
	'assets/images/nz.png',
	'assets/images/py.png',
	'assets/images/ny.png'
	// 'assets/images/Right.png',
	// 'assets/images/Left.png',
	// 'assets/images/Top.png',
	// 'assets/images/Bottom.png',
	// 'assets/images/Front.png',
	// 'assets/images/Back.png'
]);
environmentMap.format = THREE.RGBFormat;

const PATCH_MATERIALS = {
	// StoneMarbleCalacatta004_3K: {
	// 	// normaal
	// 	metalness: 0.8,
	// 	roughness: 0.5
	// },
	Marble13_3K: {
		// groen
		metalness: 1,
		roughness: 0.5
	}
	// MetalSpottyDiscoloration001_1K: {
	// 	metalness: 0.9,
	// 	roughness: 0.2
	// },
	// Plaster17_3K: {
	// 	metalness: 0.1,
	// 	roughness: 1
	// }
};

const NEW_MATERIALS = {
	wireframe: new THREE.MeshPhysicalMaterial({
		color: 0x2194ce,
		emissive: 0x7f9b9b,
		roughness: 0,
		metalness: 1,
		reflectivity: 1,
		clearCoat: 1,
		clearCoatRoughness: 0.5,
		name: 'WIREFRAME',
		wireframe: true
	}),
	translucent: new THREE.MeshPhysicalMaterial({
		color: 0x2194ce,
		emissive: 0x7f9b9b,
		roughness: 0,
		metalness: 1,
		reflectivity: 1,
		clearCoat: 1,
		clearCoatRoughness: 0.5,
		name: 'GLASS',
		transparent: true,
		opacity: 0.5
	})
};

const replaceMat = obj => {
	if (!obj) return;
	if (obj.children) obj.children.forEach(child => replaceMat(child));

	if (!obj.material) return;

	// replace original materials from blender
	Object.keys(NEW_MATERIALS).map(name => [ name, NEW_MATERIALS[name] ]).forEach(([ name, newmat ]) => {
		if ((obj.material.name || '').toLowerCase() === name.toLowerCase()) obj.material = newmat;
	});

	// set envmap anyway on everything -- this breaks all of a sudden for iOS. WHYYY????
	// if (obj.material.type === 'MeshStandardMaterial') {
	// 	obj.material.envMap = environmentMap;
	// 	obj.material.envMapIntensity = 2;
	// }

	// patch up values from blender
	if (PATCH_MATERIALS[obj.material.name]) {
		const newValues = PATCH_MATERIALS[obj.material.name];
		Object.keys(newValues).forEach(key => (obj.material[key] = newValues[key]));
		obj.material.needsUpdate = true;
		console.log('update physical material', obj.material.name);
	}
};

AFRAME.registerComponent('replace-materials', {
	init: function() {
		this.el.addEventListener('model-loaded', () => replaceMat(this.el.object3D));
	}
});
