import Ember from 'ember';
import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
	channel: belongsTo('channel'),
	src: attr('string'),

	// returns a cropped thumb with facial detection
	thumb: Ember.computed('src', function() {
		const src = this.get('src');

		if (!src) { return ''; }

		// let isGif = !src.match(/\.(jpg|jpeg|png|gif)$/);

		return `http://res.cloudinary.com/radio4000/image/upload/c_thumb,h_200,w_200/v1428245306/${src}`;
	})
});
