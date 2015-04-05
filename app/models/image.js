import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	channel: DS.belongsTo('channel'),
	src: DS.attr('string'),

	// returns a 300x300 cropped thumb with facial detection
	thumb: Ember.computed('src', function() {
		var src = this.get('src');

		if (!src) { return ''; }

		return 'http://res.cloudinary.com/radio4000/image/upload/c_thumb,h_300,w_300/v1428245306/'+
		 src +'.jpg';
	})
});
