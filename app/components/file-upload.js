import Ember from 'ember';

// export default Ember.Component.extend({
export default Ember.TextField.extend({
	type: 'file',
	accept: 'image/*',
	capture: 'camera',
	// multiple: false,

	change: function(event) {
		var file    = event.target.files[0];
		var reader  = new FileReader();

		reader.onloadend = function () {
			this.set('image', reader.result);
		}.bind(this);

		if (file) {
			reader.readAsDataURL(file);
		}
	}
});
