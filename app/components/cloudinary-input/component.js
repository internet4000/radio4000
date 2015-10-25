/* global document window */
import Ember from 'ember';
import ENV from '../../config/environment';

const {$, Component, on} = Ember;

export default Component.extend({
	tagName: 'input',
	name: 'file',
	type: 'file',
	classNames: ['cloudinary_fileupload'],
	attributeBindings: ['name', 'type'],

	// Cloudinary settings
	multiple: false,
	maxFileSize: 500000,

	enableCloudinary: on('didInsertElement', function () {
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
		$(document).bind('dragover', function (e) {
			let dropZone = $('#dropzone');
			let timeout = window.dropZoneTimeout;

			if (!timeout) {
				dropZone.addClass('in');
			} else {
				clearTimeout(timeout);
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

			window.dropZoneTimeout = setTimeout(function () {
				window.dropZoneTimeout = null;
				dropZone.removeClass('in hover');
			}, 100);
		});
	})
});
