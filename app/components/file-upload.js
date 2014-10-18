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

		// limit images to 500kb
		if ((file.size/1000) >= 500) {
			alert('Sorry, too big! For now please use an image below 500kb');
			return false;
		}

		reader.onloadend = function () {
			this.set('image', reader.result);
		}.bind(this);

		if (file) {
			reader.readAsDataURL(file);
		}
	}
});
