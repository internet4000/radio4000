import Ember from 'ember';

export default Ember.Component.extend({
	filter: '',

	// Returns either all tracks or the filtered tracks by hashtag
	filtered: Ember.computed('filter', 'model', function() {
		let filter = this.get('filter');
		let model = this.get('model');

		if (filter) {
			return model.filter(function(track) {
				let hashtags = track.get('hashtags');

				if (!hashtags) { return false; }

				return hashtags.contains(filter);
			});
		} else {
			return model;
		}
	}),

	// not sure how to set up SortableMixin
	sortedandfiltered: Ember.computed('filtered', function() {
		return Ember.ArrayController.create({
			content: this.get('filtered'),

			// Newest on top
			sortProperties: ['created'],
			sortAscending: false
		});
	}),

	// Returns the unique tags from all models
	tags: Ember.computed('model.@each.hashtags', function() {
		let model = this.get('model');
		let tags = model.getEach('hashtags');

		// Remove tracks without hashtags
		tags = tags.compact();

		// Flatten the array
		tags = (tags.join(',')).split(','); // js version
		// tags = _.flatten(tags); // lodash version

		// Only keep uniques
		tags = tags.uniq();

		// Remove more empty ones (todo: shouldn't be necessary)
		// tags = tags.reject(function(tag) {
		// 	return tag === '';
		// });

		return tags;
	}),

	// Keep track of which track we're currently editing
	currentTrackComponent: null
});
