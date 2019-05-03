//<a-entity gltf-model="..." ao-map="src: my-ao.png"></a-entity>

AFRAME.registerComponent('ao-map', {
	schema: {
	  src: {default: ''}
	},
	init: function () {
	  var aoMap = new THREE.TextureLoader().load(this.data.src);
	  aoMap.flipY = false;
	  this.el.addEventListener('model-loaded', function(e) {
		e.detail.model.traverse((o) => {
		  if (o.isMesh) {
			o.material.aoMap = aoMap;
			if (o.geometry.attributes.uv2 === undefined &&
				o.geometry.attributes.uv !== undefined) {
			  o.geometry.addAttribute( 'uv2', new THREE.BufferAttribute( o.geometry.attributes.uv.array, 2 ) );
			}
		  }
		});
	  });
	}
  });