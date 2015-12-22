import Ember from 'ember';
import DS from 'ember-data';

const {computed} = Ember;
const {Model, attr, belongsTo} = DS;

export default Model.extend({
	channel: belongsTo('channel'),
	src: attr('string'),

	// Returns a cropped thumb optimized for gifs
	thumbnail: computed('src', function () {
		const src = this.get('src');

		if (!src) {
			return '';
		}

		return `//res.cloudinary.com/radio4000/image/upload/c_thumb,h_240,w_240,c_fill,fl_lossy,q_60/v1428245306/${src}`;
	})
});

// let isGif = !src.match(/\.(jpg|jpeg|png|gif)$/);
