// workaround voor een aframe 0.9 bug (fixed in 0.9.1 - maar die heeft issues met VR mode op iOS) die niet toelaat om op vec3 te animeren
AFRAME.registerComponent('fixanimation', {
	schema: {
		component: { type: 'string'},
		property: {  type: 'string'},
		value: { type: 'number', value: 0}
	},
		  multiple: true,

	init() {

	},
	update: function() {
		if( this.data.component && this.data.property )
		{
			if( this.data.property.indexOf('.') >= 0 )
			{
				// as object.
				const [prop,key] = this.data.property.split('.');
				const oldValue = this.el.getAttribute( this.data.component )[ prop ]||{};

				const newValue = {
					...oldValue,
					[key] : this.data.value
				};
				this.el.setAttribute( this.data.component, prop, newValue );
			}
			else
				this.el.setAttribute( this.data.component, this.data.property, this.data.value )
		}
	}
});