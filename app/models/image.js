import Ember from 'ember';
import DS from 'ember-data';

const {computed} = Ember;
const {Model, attr, belongsTo} = DS;

export default Model.extend({
	channel: belongsTo('channel'),
	src: attr('string'),

	// returns a cropped thumb with facial detection
	thumb: Ember.computed('src', function () {
		const src = this.get('src');

		if (!src) {
			return '';
		}

		return `//res.cloudinary.com/radio4000/image/upload/c_thumb,h_240,w_240/v1428245306/${src}`;
	})
});

// let isGif = !src.match(/\.(jpg|jpeg|png|gif)$/);
