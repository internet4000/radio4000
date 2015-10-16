import Ember from 'ember';

export default Ember.TextField.extend({
	type: 'file',
	accept: 'image/*',

	change(event) {
		const reader = new FileReader();
		let file = event.target.files[0];

		// limit images to 500kb
		if ((file.size / 1000) >= 500) {
			alert('Sorry, too big! For now please use an image below 500kb');
			return false;
		}

		// Once image has loaded, set it to the model
		// we can do this because image is passed to this component
		reader.onloadend = function () {
			this.set('image', reader.result);
		}.bind(this);

		// this turns the image into a data url
		if (file) {
			reader.readAsDataURL(file);
		}
	}
});
