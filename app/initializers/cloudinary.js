import Ember from 'ember';
import ENV from '../config/environment';

export function initialize(/* container, application */) {
	// Set a global cloudinary config
	Ember.$.cloudinary.config({
		cloud_name: ENV.CLOUDINARY_NAME
	});
}

export default {
	name: 'cloudinary',
	initialize: initialize
};
