/* global document, window */
import Ember from 'ember';
import ENV from 'radio4000/config/environment';

const {Component, $, on} = Ember;

export default Component.extend({
	tagName: 'input',
	name: 'file',
	type: 'file',
	classNames: ['cloudinary-fileupload'],
	attributeBindings: ['name', 'type'],

	// Cloudinary settings
	multiple: false,
	maxFileSize: 500000,

	enableCloudinary: on('didInsertElement', function () {
		console.log('enableCloudinary');

		// enable cloudinary on our file field
		this.$().unsigned_cloudinary_upload(ENV.CLOUDINARY_UPLOAD_PRESET, {
			cloud_name: ENV.CLOUDINARY_NAME
		}, {
			// jQuery file upload settings
			maxFileSize: this.get('maxFileSize'),
			multiple: this.get('multiple'),
			dropZone: $('#dropzone')
		});

		// https://github.com/blueimp/jQuery-File-Upload/wiki/Drop-zone-effects
		$(document).bind('dragover.r4', e => {
			const dropZone = $('#dropzone');
			const timeout = window.dropZoneTimeout;

			if (timeout) {
				clearTimeout(timeout);
			} else {
				dropZone.addClass('in');
			}

			let found = false;
			let node = e.target;

			do {
				if (node === dropZone[0]) {
					found = true;
					break;
				}

				node = node.parentNode;
			}

			while (node !== null);

			if (found) {
				dropZone.addClass('hover');
			} else {
				dropZone.removeClass('hover');
			}

			window.dropZoneTimeout = setTimeout(() => {
				window.dropZoneTimeout = null;
				dropZone.removeClass('in hover');
			}, 100);
		});
	}),

	willDestroyElement() {
		$(document).off('dragover.r4');
	}
});
