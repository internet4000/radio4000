import Ember from 'ember';
import ENV from 'radio4000/config/environment';

const {Component, observer, on, $} = Ember;

// $.getMultiScripts = function (arr, path) {
// 	var _arr = $.map(arr, function (scr) {
// 		return $.getScript((path ||'') + scr);
// 	});

// 	_arr.push($.Deferred(function (deferred) {
// 		$(deferred.resolve);
// 	}));

// 	return $.when.apply($, _arr);
// };

export default Component.extend({
	imageId: null,
	progressValue: '0',
	isUploading: false,

	// options
	showProgress: true,
	enablePreview: false,

	// Load all required scripts async
	startCloudinary: on('init', function () {
		console.log('startCloudinary');

		$.getScript('assets/scripts/image-upload-r4.js')
		// $.getMultiScripts([
		// 	'assets/scripts/jquery.iframe-transport.js',
		// 	'assets/scripts/jquery.ui.widget.js',
		// 	'assets/scripts/jquery.fileupload.js',
		// 	'assets/scripts/jquery.cloudinary.js'
		// ])
		.done(() => {
			console.log('done');
			$.cloudinary.config({cloud_name: ENV.CLOUDINARY_NAME});
			Ember.run.schedule('afterRender', () => {
				this.set('gotScripts', true);
			});
		}).fail(error => {
			// one or more scripts failed to load
			throw new Error(error);
		});
	}),

	enableEvents: on('didInsertElement', function () {
		const $input = this.$();
		const component = this;
		// here we bind to the events sent by our child cloudinary-input component
		// we could listen to these events directly on that component as well, if we like

		// indicate progress
		$input.on('fileuploadprogress', function (e, data) {
			let value = Math.round((data.loaded * 100.0) / data.total);

			// indicate we're uploading
			component.set('isUploading', true);
			component.set('progressValue', value);
		});

		// once it's uploaded
		$input.on('fileuploaddone', function (e, data) {
			component.set('imageId', data.result.public_id);

			// reset progress
			component.set('progressValue', 0);
			component.set('isUploading', false);
		});
	}),

	updatePreview: observer('imageId', function () {
		if (!this.get('enablePreview')) {
			return;
		}

		// get image from cloudinary
		const image = $.cloudinary.image(this.get('imageId'), {
			format: 'jpg',
			width: 240,
			height: 240,
			crop: 'thumb',
			gravity: 'face'
			// effect: 'saturation:50'
		});

		// insert it
		this.$('figure').append(image);
	})
});
