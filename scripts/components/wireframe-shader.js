/* global AFRAME */
AFRAME.registerShader('wireframe', {
	schema: {
		cameraPosition: {
			type: 'vec3',
			default: {x:0,y:0,z:0},
			is: 'uniform'
		},
		time: {
			type: 'float',
			default: 1.0,
			is: 'uniform'
		}
	},

	vertexShader:`
	/**
	 * Example Vertex Shader
	 * Sets the position of the vertex by setting gl_Position
	 */

	 // Set the precision for data types used in this shader
	 precision highp float;
	 precision highp int;

	 // Default THREE.js uniforms available to both fragment and vertex shader


	 // Default uniforms provided by ShaderFrog.
	 uniform float time;

	 // Default attributes provided by THREE.js. Attributes are only available in the
	 // vertex shader. You can pass them to the fragment shader using varyings
	 attribute vec2 uv2;

	 // Examples of variables passed from vertex to fragment shader
	 varying vec3 vPosition;
	 varying vec3 vNormal;
	 varying vec2 vUv;
	 varying vec2 vUv2;

	 void main() {

		 // To pass variables to the fragment shader, you assign them here in the
		 // main function. Traditionally you name the varying with vAttributeName
		 vNormal = normal;
		 vUv = uv;
		 vUv2 = uv2;
		 vPosition = position;

		 // This sets the position of the vertex in 3d space. The correct math is
		 // provided below to take into account camera and object data.
		 gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

	 }	`,

	fragmentShader: `
	/**
	 * Example Fragment Shader
	 * Sets the color and alpha of the pixel by setting gl_FragColor
	 */

	 // Set the precision for data types used in this shader
	 precision highp float;
	 precision highp int;

	 // Default THREE.js uniforms available to both fragment and vertex shader
	 uniform mat4 modelMatrix;


	 // Default uniforms provided by ShaderFrog.
	 uniform float time;

	 // A uniform unique to this shader. You can modify it to the using the form
	 // below the shader preview. Any uniform you add is automatically given a form
	 uniform vec3 color;
	 uniform vec3 lightPosition;
	 uniform sampler2D texture;
	 uniform sampler2D mynormal;
	 uniform sampler2D mynormal2;

	 // Example varyings passed from the vertex shader
	 varying vec3 vPosition;
	 varying vec3 vNormal;
	 varying vec2 vUv;
	 varying vec2 vUv2;

	 void main() {

		 vec4 tcolor=texture2D(texture, vUv);
		 vec4 ncolor=texture2D(mynormal, vUv + vec2(time)-1000000000000.0,0.0);
		 vec4 ncolor2=texture2D(mynormal2, vUv + vec2(time)*1000000.0,0.0);

		 // Calculate the real position of this pixel in 3d space, taking into account
		 // the rotation and scale of the model. It's a useful formula for some effects.
		 // This could also be done in the vertex shader
		 vec3 worldPosition = ( modelMatrix * vec4( vPosition, 1.0 )).xyz;

		 // Calculate the normal including the model rotation and scale
		 vec3 worldNormal = normalize( vec3( modelMatrix * vec4( vNormal, 0.0 ) ) );

		 vec3 worldnormalmap= normalize(vec3(modelMatrix*ncolor+ncolor2));

		 vec3 lightVector = normalize( lightPosition + worldPosition );

		 vec3 viewDirectionW = normalize(cameraPosition + vPosition);

		 vec3 lightPositionW = normalize(lightPosition-worldPosition);

		 vec3 angleW = normalize (viewDirectionW + lightPositionW);




		 float balanco1= cos((10000000000.0*(time)+(vUv.y*10000000000.0))/6000000000000.0);
		 float balanco2= cos((100000000000000.0*(time)+(vUv.y*100000000000000.0))/6000000000000.0);


		 // An example simple lighting effect, taking the dot product of the normal
		 // (which way this pixel is pointing) and a user generated light position
		 float brightness = dot( worldNormal+worldnormalmap, lightVector );

		 float diff = dot(normalize(lightPosition+angleW),worldNormal);

		 float specComp = max(0.0,dot(worldNormal,angleW));



		 // Fragment shaders set the gl_FragColor, which is a vector4 of
		 // ( red, green, blue, alpha ).
		 gl_FragColor = vec4( (color-tcolor.xyz/ncolor.xyz-balanco1+balanco2) * specComp, 1.0 );

	 }	`
});

// AFRAME.registerComponent('sun-position-setter', {
// 	schema: {
// 		sunSrc: { type: 'string' }
// 	},

// 	init() {
// 		var skyEl = this.el;
// 		var orbitEl = this.el.sceneEl.querySelector(this.data.sunSrc);
// 		if( !orbitEl) throw new Error('Cannot find orbiting sun element. Set sunSrc prop');

// 		orbitEl.addEventListener('componentchanged', function changeSun(evt) {
// 			var sunPosition;
// 			var phi;
// 			var theta;
// 			if (evt.detail.name !== 'rotation') {
// 				return;
// 			}
// 			sunPosition = orbitEl.getAttribute('rotation');
// 			if (sunPosition === null) {
// 				return;
// 			}
// 			theta = Math.PI * -0.5;
// 			phi = 2 * Math.PI * (sunPosition.y / 360 - 0.5);
// 			skyEl.setAttribute('material', 'sunPosition', {
// 				x: Math.cos(phi),
// 				y: Math.sin(phi) * Math.sin(theta),
// 				z: -1
// 			});
// 		});
// 	}
// });
